# -*- coding: utf-8 -*-
"""
tools/completar_planejamento.py

Deixa `auditoria_planejamento` com uma linha por loja do cadastro (72), e
preenche a ultima auditoria de cada uma a partir do historico ja restaurado.

O QUE FAZ
---------
  1. Conserta registros incompletos. O PLAN_4 tem apenas
     {id, proximaPrevista, status} - sem lojaNome nem regional. Era ele que
     derrubava a tabela de Planejamento inteira (o codigo ja foi blindado,
     mas o dado continua torto e a linha aparece vazia na tela).
  2. Cria o registro das lojas do cadastro que ainda nao tem planejamento.
  3. Deriva `ultimaData` de cada loja a partir de auditoria_mapeamento: a
     maior `data` com realizada == "SIM". E mais confiavel que o campo do
     backup, que parou em agosto.

REGRAS (as mesmas dos outros scripts deste projeto)
---------------------------------------------------
  * Dry-run por padrao; so grava com --apply.
  * Dump do estado atual antes de qualquer escrita.
  * `ultimaData` so avanca, nunca retrocede.
  * `proximaPrevista` e `auditor` de quem ja tem registro NAO sao tocados:
     o planejamento de setembro e mais recente que qualquer coisa derivada
     do historico.
  * PATCH com updateMask: nenhum campo fora da lista e apagado.

USO
---
    python tools/completar_planejamento.py             # simula
    python tools/completar_planejamento.py --apply     # grava
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

# Campos que definem a identidade de uma loja no planejamento. Se algum
# faltar, a linha aparece quebrada na tela.
CAMPOS_IDENTIDADE = ["lojaId", "lojaNome", "nomeBi", "regional", "uf"]


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
    for tipo, conv in (("stringValue", str), ("integerValue", int),
                       ("doubleValue", float), ("booleanValue", bool),
                       ("timestampValue", str)):
        if tipo in v:
            return conv(v[tipo])
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
    ap = argparse.ArgumentParser(description="Completa o planejamento das 72 lojas.")
    ap.add_argument("--apply", action="store_true", help="grava de verdade")
    args = ap.parse_args()

    cfg = os.path.join(RAIZ, "public", "js", "firebase-config.js")
    if not os.path.exists(cfg):
        sys.exit("Nao achei public/js/firebase-config.js.")
    m = re.search(r'"apiKey"\s*:\s*"([^"]+)"', io.open(cfg, encoding="utf-8").read())
    if not m:
        sys.exit("Nao consegui ler a apiKey.")
    api_key = m.group(1)

    mestre = json.load(io.open(os.path.join(RAIZ, "data", "lojas_ka_official.json"),
                               encoding="utf-8"))
    # lojaId e a posicao no cadastro + 1; o documento e PLAN_<lojaId>.
    por_chave_mestre = {chave(x["nome"]): (str(i + 1), x) for i, x in enumerate(mestre)}

    print("=" * 74)
    print(" Completar o planejamento - %s"
          % ("GRAVACAO" if args.apply else "SIMULACAO (nada sera escrito)"))
    print("=" * 74)

    token = entrar(api_key)

    print("\nLendo o estado atual...")
    plan = listar("auditoria_planejamento", token)
    mapa = listar("auditoria_mapeamento", token)
    print("  auditoria_planejamento: %d de %d lojas" % (len(plan), len(mestre)))
    print("  auditoria_mapeamento:   %d eventos" % len(mapa))

    # ultima auditoria REALIZADA por loja, direto do historico
    ultima = {}
    for d in mapa.values():
        if str(d.get("realizada", "")).upper() not in ("SIM", "S"):
            continue
        k = chave(d.get("lojaNome", ""))
        data = d.get("data") or ""
        if k and data > ultima.get(k, ""):
            ultima[k] = data
    print("  lojas com auditoria realizada no historico: %d" % len(ultima))

    plan_por_loja = {}
    for did, d in plan.items():
        k = chave(d.get("lojaNome", ""))
        if k:
            plan_por_loja[k] = (did, d)

    criar, consertar, avancar = [], [], []

    for i, loja in enumerate(mestre):
        k = chave(loja["nome"])
        loja_id = str(i + 1)
        did = "PLAN_%s" % loja_id
        atual = plan.get(did)
        u = ultima.get(k, "")

        if atual is None and k not in plan_por_loja:
            criar.append((did, {
                "id": did,
                "lojaId": loja_id,
                "lojaNome": loja["nome"],
                "nomeBi": loja.get("nomeBi", ""),
                "regional": loja.get("regional", ""),
                "uf": loja.get("uf", ""),
                "ultimaData": u,
                "proximaPrevista": "",
                "auditor": "",
                "status": "PENDENTE",
            }))
            continue

        if atual is None:
            did, atual = plan_por_loja[k]

        # 1. campos de identidade ausentes (o caso do PLAN_4)
        faltando = {c: (loja_id if c == "lojaId"
                        else loja["nome"] if c == "lojaNome"
                        else loja.get("nomeBi", "") if c == "nomeBi"
                        else loja.get(c, ""))
                    for c in CAMPOS_IDENTIDADE if not atual.get(c)}
        if faltando:
            consertar.append((did, loja["nome"], faltando))

        # 2. ultimaData so avanca
        if u and u > (atual.get("ultimaData") or ""):
            avancar.append((did, loja["nome"],
                            "%s -> %s" % (atual.get("ultimaData") or "vazio", u), u))

    print("\n" + "=" * 74)
    print("PLANO")
    print("=" * 74)

    print("\nRegistros INCOMPLETOS a consertar: %d" % len(consertar))
    for did, nome, faltando in consertar:
        print("  %-10s %-32s campos ausentes: %s" % (did, nome[:32], ", ".join(sorted(faltando))))

    print("\nLojas SEM planejamento, a criar: %d" % len(criar))
    for did, novo in criar[:15]:
        print("  %-10s %-32s ultima=%s" % (did, novo["lojaNome"][:32], novo["ultimaData"] or "sem historico"))
    if len(criar) > 15:
        print("  ... e mais %d" % (len(criar) - 15))

    print("\nultimaData a avancar: %d" % len(avancar))
    for did, nome, desc, _ in avancar[:15]:
        print("  %-32s %s" % (nome[:32], desc))
    if len(avancar) > 15:
        print("  ... e mais %d" % (len(avancar) - 15))

    total_final = len(plan) + len(criar)
    print("\n" + "-" * 74)
    print("Planejamento depois desta carga: %d de %d lojas do cadastro"
          % (total_final, len(mestre)))
    sem_hist = sum(1 for _, n in criar if not n["ultimaData"])
    if sem_hist:
        print("  (%d das novas ficam sem ultimaData: nao ha auditoria realizada "
              "no historico para essas lojas)" % sem_hist)
    print("-" * 74)

    if not args.apply:
        print("\nSIMULACAO - nada foi escrito.")
        print("Para gravar:  python tools/completar_planejamento.py --apply")
        return

    os.makedirs(DIR_BACKUP, exist_ok=True)
    carimbo = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    destino = os.path.join(DIR_BACKUP, "pre-completar_%s.json" % carimbo)
    with io.open(destino, "w", encoding="utf-8") as f:
        json.dump({"auditoria_planejamento": plan}, f, ensure_ascii=False, indent=2)
    print("\nBackup do estado atual: %s" % destino)

    print("\nGravando...")
    erros = feitas = 0
    for did, novo in criar:
        try:
            gravar("auditoria_planejamento", did, novo, token)
            feitas += 1
        except Exception as e:
            erros += 1
            print("  ERRO %s" % e)
    for did, nome, campos in consertar:
        try:
            gravar("auditoria_planejamento", did, campos, token)
            feitas += 1
            print("  ok  %s consertado (%s)" % (did, nome))
        except Exception as e:
            erros += 1
            print("  ERRO %s" % e)
    for did, nome, _, u in avancar:
        try:
            gravar("auditoria_planejamento", did, {"ultimaData": u}, token)
            feitas += 1
        except Exception as e:
            erros += 1
            print("  ERRO %s" % e)

    print("\nConcluido. %d escritas, %d erros." % (feitas, erros))
    if erros:
        print("O backup em %s tem o estado anterior." % destino)


if __name__ == "__main__":
    main()
