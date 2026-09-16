# -*- coding: utf-8 -*-
"""
tools/restaurar_backup.py

Restaura o historico de auditorias do backup de 2026-08-29 no Firestore,
por MERGE. Nunca sobrescreve nem limpa a colecao.

POR QUE MERGE, E NAO RESTAURACAO
--------------------------------
Backup e banco NAO se contem. Verificado:

    backup : 08/04 a 28/08/2026, 515 registros de mapeamento
    banco  : 07/08 a 11/09/2026 (setembro nao esta no backup)

Uma restauracao classica - limpar e recarregar - apagaria setembro.

TRADUCAO DE ESQUEMA
-------------------
O backup fala outro dialeto:

    backup                        sistema
    ----------------------------  -----------------------
    lojaId -> mapa_lojas_backup   lojaNome  ("SPRN - MIDWAY")
    nomeLoja ("MIDWAY")           (descartado: nome curto)
    dataTentativa                 data
    justificativa                 motivo
    autor / auditor               auditor
    (calculado a partir da data)  semana

O lojaId do backup NAO e a posicao no cadastro oficial: ele aponta para a
lista do app de origem. Ver tools/gerar_mapa_lojas.py, que produz a tabela
e valida a traducao (586/586 registros).

Campos sem equivalente no sistema (horario, notas, sla, estado) sao
preservados no documento quando trazem valor: o app os ignora, e jogar fora
informacao de auditoria seria pior.

REGRAS DE MERGE
---------------
  1. A identidade de uma auditoria e (lojaNome, data) - nunca o id do
     documento, que varia conforme quem gravou.
  2. Valor vazio nunca sobrescreve campo preenchido.
  3. ultimaData do planejamento so avanca.
  4. proximaPrevista do backup (agosto) NAO e aplicada: o planejamento de
     setembro ja carregado e mais recente. Regredir seria perda.

USO
---
    python tools/restaurar_backup.py             # simula
    python tools/restaurar_backup.py --apply     # grava
"""

import argparse
import getpass
import io
import json
import os
import re
import sys
import unicodedata
from datetime import datetime, timezone

try:
    import requests
except ImportError:
    sys.exit("Falta o pacote 'requests'. Instale com:  pip install requests")

PROJETO = "san-paolo-auditoria"
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR_BACKUP = os.path.join(os.path.dirname(RAIZ), "backups-firestore")
BASE = "https://firestore.googleapis.com/v1/projects/%s/databases/(default)/documents" % PROJETO
SIGNIN = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"

# Campos do backup sem equivalente no sistema, preservados quando trazem valor.
EXTRAS = ["horario", "notas", "sla", "estado"]


def para_valor(v):
    if v is None:
        return {"nullValue": None}
    if isinstance(v, bool):
        return {"booleanValue": v}
    if isinstance(v, int):
        return {"integerValue": str(v)}
    if isinstance(v, float):
        return {"doubleValue": v}
    if isinstance(v, list):
        return {"arrayValue": {"values": [para_valor(x) for x in v]}}
    if isinstance(v, dict):
        return {"mapValue": {"fields": {k: para_valor(x) for k, x in v.items()}}}
    return {"stringValue": str(v)}


def de_valor(v):
    for chave_tipo, conv in (("stringValue", str), ("integerValue", int),
                             ("doubleValue", float), ("booleanValue", bool),
                             ("timestampValue", str)):
        if chave_tipo in v:
            return conv(v[chave_tipo])
    if "nullValue" in v:
        return None
    if "arrayValue" in v:
        return [de_valor(x) for x in v["arrayValue"].get("values", [])]
    if "mapValue" in v:
        return {k: de_valor(x) for k, x in v["mapValue"].get("fields", {}).items()}
    return None


def chave(s):
    s = unicodedata.normalize("NFD", str(s or ""))
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^A-Z0-9]", "", s.upper())


def semana_do_mes(data_iso):
    return "Semana %d" % (((int(data_iso.split("-")[2]) - 1) // 7) + 1)


def entrar(api_key):
    email = input("E-mail corporativo: ").strip()
    senha = getpass.getpass("Senha (nao aparece na tela): ")
    r = requests.post(SIGNIN, params={"key": api_key}, timeout=30,
                      json={"email": email, "password": senha, "returnSecureToken": True})
    if r.status_code != 200:
        sys.exit("Falha no login: %s" % r.json().get("error", {}).get("message", r.text))
    d = r.json()
    print("  autenticado como %s" % d["email"])
    return d["idToken"]


def listar(colecao, token):
    docs, pagina = {}, None
    while True:
        p = {"pageSize": 300}
        if pagina:
            p["pageToken"] = pagina
        r = requests.get("%s/%s" % (BASE, colecao), params=p, timeout=60,
                         headers={"Authorization": "Bearer " + token})
        if r.status_code == 403:
            sys.exit("Permissao negada em '%s'. Confira as regras e se o seu "
                     "perfil em users/{uid} tem ativo:true." % colecao)
        r.raise_for_status()
        j = r.json()
        for d in j.get("documents", []):
            docs[d["name"].rsplit("/", 1)[-1]] = {k: de_valor(v) for k, v in d.get("fields", {}).items()}
        pagina = j.get("nextPageToken")
        if not pagina:
            break
    return docs


def gravar(colecao, doc_id, campos, token):
    params = [("updateMask.fieldPaths", k) for k in campos]
    r = requests.patch("%s/%s/%s" % (BASE, colecao, doc_id), params=params, timeout=30,
                       headers={"Authorization": "Bearer " + token},
                       json={"fields": {k: para_valor(v) for k, v in campos.items()}})
    if r.status_code != 200:
        raise RuntimeError("%s/%s -> %s %s" % (colecao, doc_id, r.status_code, r.text[:200]))


def main():
    ap = argparse.ArgumentParser(description="Restaura o historico do backup por merge.")
    ap.add_argument("--apply", action="store_true", help="grava de verdade")
    args = ap.parse_args()

    cfg = os.path.join(RAIZ, "public", "js", "firebase-config.js")
    if not os.path.exists(cfg):
        sys.exit("Nao achei public/js/firebase-config.js.")
    m = re.search(r'"apiKey"\s*:\s*"([^"]+)"', io.open(cfg, encoding="utf-8").read())
    if not m:
        sys.exit("Nao consegui ler a apiKey.")
    api_key = m.group(1)

    caminho_mapa = os.path.join(RAIZ, "data", "mapa_lojas_backup.json")
    if not os.path.exists(caminho_mapa):
        sys.exit("Falta data/mapa_lojas_backup.json. Rode antes:\n"
                 "    python tools/gerar_mapa_lojas.py")
    mapa_lojas = json.load(io.open(caminho_mapa, encoding="utf-8"))
    backup = json.load(io.open(os.path.join(RAIZ, "data", "backup_geral_2026-08-29.json"),
                               encoding="utf-8"))

    print("=" * 74)
    print(" Restauracao do backup de 2026-08-29 - %s"
          % ("GRAVACAO" if args.apply else "SIMULACAO (nada sera escrito)"))
    print("=" * 74)

    token = entrar(api_key)

    print("\nLendo o estado atual...")
    vivo_map = listar("auditoria_mapeamento", token)
    vivo_plan = listar("auditoria_planejamento", token)
    print("  auditoria_mapeamento:   %d" % len(vivo_map))
    print("  auditoria_planejamento: %d" % len(vivo_plan))

    # identidade de uma auditoria: (loja, data)
    por_loja_data = {}
    for did, d in vivo_map.items():
        por_loja_data.setdefault((chave(d.get("lojaNome", "")), d.get("data", "")), []).append((did, d))

    criar, atualizar, iguais, semtraducao = [], [], 0, []

    for r in backup["auditoria_mapeamento"]:
        lid = str(r.get("lojaId"))
        if lid not in mapa_lojas:
            semtraducao.append(lid)
            continue
        loja = mapa_lojas[lid]
        data = r.get("dataTentativa") or ""
        if not data:
            continue

        campos = {
            "lojaNome": loja,
            "data": data,
            "auditor": r.get("auditor") or r.get("autor") or "",
            "realizada": r.get("realizada") or "",
            "nTentativa": r.get("nTentativa") or 1,
            "semana": semana_do_mes(data),
            "motivo": r.get("justificativa") or "",
        }
        for e in EXTRAS:
            if r.get(e) not in (None, "", False):
                campos[e] = r[e]

        gemeos = por_loja_data.get((chave(loja), data), [])
        if gemeos:
            did, antes = gemeos[0]
            # vazio nunca sobrescreve conteudo existente
            campos = {c: v for c, v in campos.items()
                      if not (v in ("", None) and antes.get(c) not in (None, ""))}
            difs = {c for c, v in campos.items() if antes.get(c) != v}
            if not difs:
                iguais += 1
                continue
            atualizar.append((did, loja, data, campos, sorted(difs)))
        else:
            did = r.get("id") or ("MAP_%s_%s" % (data.replace("-", ""), chave(loja)[:28]))
            campos["id"] = did
            criar.append((did, loja, data, campos))

    # ultimaData do planejamento, derivada das auditorias REALIZADAS.
    # Mais confiavel que o campo do backup, que e de agosto.
    ultima = {}
    for _, loja, data, campos in criar:
        if campos.get("realizada") in ("SIM", "Sim") and data > ultima.get(loja, ""):
            ultima[loja] = data
    for _, loja, data, campos, _ in atualizar:
        if campos.get("realizada") in ("SIM", "Sim") and data > ultima.get(loja, ""):
            ultima[loja] = data

    plan_por_loja = {chave(d.get("lojaNome", "")): (did, d) for did, d in vivo_plan.items()}
    plan_upd = []
    for loja, data in sorted(ultima.items()):
        alvo = plan_por_loja.get(chave(loja))
        if not alvo:
            continue  # loja sem registro de planejamento: nao inventa
        did, atual = alvo
        if (atual.get("ultimaData") or "") < data:   # so avanca
            plan_upd.append((did, loja, {"ultimaData": data},
                             "%s -> %s" % (atual.get("ultimaData") or "vazio", data)))

    print("\n" + "=" * 74)
    print("PLANO")
    print("=" * 74)
    print("\nEventos NOVOS em auditoria_mapeamento: %d" % len(criar))
    for did, loja, data, c in criar[:12]:
        print("  %s  %-30s realizada=%-4s %s" % (data, loja[:30], c["realizada"],
                                                 ("motivo: " + c["motivo"][:28]) if c.get("motivo") else ""))
    if len(criar) > 12:
        print("  ... e mais %d" % (len(criar) - 12))

    print("\nEventos a ATUALIZAR (mesma loja e data, conteudo diferente): %d" % len(atualizar))
    for did, loja, data, c, difs in atualizar[:12]:
        print("  %s  %-30s campos: %s" % (data, loja[:30], ", ".join(difs)))
    if len(atualizar) > 12:
        print("  ... e mais %d" % (len(atualizar) - 12))

    print("\nJa identicos no banco (nada a fazer): %d" % iguais)

    print("\nultimaData a avancar em auditoria_planejamento: %d" % len(plan_upd))
    for did, loja, campos, desc in plan_upd[:12]:
        print("  %-30s %s" % (loja[:30], desc))
    if len(plan_upd) > 12:
        print("  ... e mais %d" % (len(plan_upd) - 12))

    if semtraducao:
        print("\nSEM TRADUCAO de lojaId (registros ignorados): %s" % sorted(set(semtraducao)))

    print("\nNAO restaurado de proposito:")
    print("  proximaPrevista do backup: e de agosto e regrediria o planejamento")
    print("  de setembro que ja foi carregado.")
    for col in ["auditoria_projetos", "protocolos_suporte", "links_Auditoria",
                "auditoria_equipe", "auditoria_notas"]:
        n = len(backup.get(col, []))
        if n:
            print("  %-22s %3d registros - o app nao tem tela nem regra para esta colecao" % (col, n))

    print("-" * 74)

    if not args.apply:
        print("\nSIMULACAO - nada foi escrito.")
        print("Para gravar:  python tools/restaurar_backup.py --apply")
        return

    os.makedirs(DIR_BACKUP, exist_ok=True)
    carimbo = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    destino = os.path.join(DIR_BACKUP, "pre-restauracao_%s.json" % carimbo)
    with io.open(destino, "w", encoding="utf-8") as f:
        json.dump({"auditoria_mapeamento": vivo_map, "auditoria_planejamento": vivo_plan},
                  f, ensure_ascii=False, indent=2)
    print("\nBackup do estado atual: %s" % destino)

    print("\nGravando...")
    erros = feitas = 0
    for did, loja, data, campos in criar:
        try:
            gravar("auditoria_mapeamento", did, campos, token)
            feitas += 1
            if feitas % 50 == 0:
                print("  ... %d escritas" % feitas)
        except Exception as e:
            erros += 1
            print("  ERRO %s" % e)
    for did, loja, data, campos, _ in atualizar:
        try:
            gravar("auditoria_mapeamento", did, campos, token)
            feitas += 1
        except Exception as e:
            erros += 1
            print("  ERRO %s" % e)
    for did, loja, campos, _ in plan_upd:
        try:
            gravar("auditoria_planejamento", did, campos, token)
            feitas += 1
        except Exception as e:
            erros += 1
            print("  ERRO %s" % e)

    print("\nConcluido. %d escritas, %d erros." % (feitas, erros))
    if erros:
        print("O backup em %s tem o estado anterior." % destino)


if __name__ == "__main__":
    main()
