# -*- coding: utf-8 -*-
"""
tools/carregar_planejamento.py

Carrega o planejamento consolidado de setembro no Firestore, pela API REST.
Nao precisa de Node, firebase-tools nem da interface do sistema.

COMO O DADO E DISTRIBUIDO
-------------------------
O sistema guarda duas coisas diferentes em duas colecoes:

  auditoria_planejamento : UM registro por loja (72 no total), com ultimaData
                           e proximaPrevista. O status NAO e gravado - e
                           calculado por getStatusLojaPlanejamento() a partir
                           do mapeamento do mes.

  auditoria_mapeamento   : os EVENTOS de auditoria (data, realizada SIM/NAO,
                           motivo, nTentativa, semana, auditor).

Por isso as linhas consolidadas se dividem:

  REALIZADA / NAO REALIZADA -> evento em auditoria_mapeamento
                               + atualiza ultimaData no planejamento (so quando
                                 realizada e a data e mais recente que a atual)
  PENDENTE                  -> so agendamento: atualiza proximaPrevista e
                               auditor no planejamento. Nao cria evento.

SEGURANCA E REVERSIBILIDADE
---------------------------
  * Roda em DRY-RUN por padrao. Nada e escrito sem --apply.
  * Antes de qualquer escrita, grava um dump do estado atual das duas
    colecoes em backups-firestore/, FORA do repositorio git.
  * Os ids dos eventos sao deterministicos (MAP_<AAAAMMDD>_<LOJA>), entao
    rodar duas vezes atualiza o mesmo documento em vez de duplicar.
  * A senha e pedida na hora, por getpass. Nunca fica em arquivo nem no
    historico do shell.
  * Escreve com updateMask: toca SOMENTE os campos listados. Um PATCH sem
    mascara apagaria todos os outros campos do documento.

USO
---
    python tools/carregar_planejamento.py                 # simula, nao escreve
    python tools/carregar_planejamento.py --apply         # grava

Requer: Python 3 e o pacote requests.
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

# --------------------------------------------------------------------------
#  O planejamento consolidado. Loja | data ISO | status | responsavel
#  Nomes ja conferidos contra data/lojas_ka_official.json.
# --------------------------------------------------------------------------
CONSOLIDADO = [
    ("SPAM - PONTA NEGRA",             "2026-09-10", "REALIZADA",     "Ana Raquel"),
    ("SPPA - SHOPPING GRAO PARA",      "2026-09-10", "REALIZADA",     "Ana Raquel"),
    ("SPCE - FLORES",                  "2026-09-11", "REALIZADA",     "Ana Raquel"),
    ("SPMA - SHOPPING SAO LUIS",       "2026-09-11", "REALIZADA",     "Ana Raquel"),
    ("SPPE - SHOPPING RECIFE",         "2026-09-11", "REALIZADA",     "Bruna Costa"),
    ("SPPE - SHOPPING TACARUNA",       "2026-09-11", "REALIZADA",     "Ana Raquel"),
    ("SPSP - SHOPPING ELDORADO",       "2026-09-11", "REALIZADA",     "Bruna Costa"),
    ("SPPE - BOA VIAGEM",              "2026-09-12", "REALIZADA",     "Bruna Costa"),
    ("SPCE 2 - JERICOACOARA",          "2026-09-14", "NAO REALIZADA", "Ana Raquel"),
    ("SPPB - SHOPPING MANAIRA",        "2026-09-14", "REALIZADA",     "Bruna Costa"),
    ("SPPE - RUA AMELIA",              "2026-09-14", "REALIZADA",     "Bruna Costa"),
    ("SPRN - MIDWAY",                  "2026-09-14", "PENDENTE",      "Ana Raquel"),
    ("SPAL - PARQUE SHOPPING MACEIO",  "2026-09-15", "REALIZADA",     "Ana Raquel"),
    ("SPCE - AEROPORTO LOJA",          "2026-09-15", "REALIZADA",     "Bruna Costa"),
    ("SPCE - SHOPPING IGUATEMI",       "2026-09-15", "PENDENTE",      "Ana Raquel"),
    ("SPCE 2 - PREA",                  "2026-09-15", "REALIZADA",     "Ana Raquel"),
    ("SPCE 3 - DABLIO MALL",           "2026-09-15", "REALIZADA",     "Bruna Costa"),
    ("SPMT - SHOPPING PANTANAL",       "2026-09-15", "REALIZADA",     "Ana Raquel"),
    ("SPCE - RIO MAR FORTALEZA",       "2026-09-16", "PENDENTE",      "Ana Raquel"),
    ("SPPA - PARQUE SHOPPING",         "2026-09-16", "PENDENTE",      "Ana Raquel"),
    ("SPCE - ANA BILHAR",              "2026-09-17", "PENDENTE",      "Ana Raquel"),
    ("SPPB - CAMPINA GRANDE",          "2026-09-17", "PENDENTE",      "Ana Raquel"),
    ("SPAM - VIEIRALVES",              "2026-09-18", "PENDENTE",      "Ana Raquel"),
    ("SPCE - BEIRA MAR LOJA",          "2026-09-18", "PENDENTE",      "Ana Raquel"),
    ("SPPI - SHOPPING RIVERSIDE",      "2026-09-18", "PENDENTE",      "Ana Raquel"),
    ("SPCE - DESEMBARGADOR MOREIRA",   "2026-09-21", "PENDENTE",      "Ana Raquel"),
    ("SPCE 2 - SOBRAL",                "2026-09-21", "PENDENTE",      "Ana Raquel"),
    ("SPMT - ESTACAO CUIABA",          "2026-09-22", "PENDENTE",      "Ana Raquel"),
    ("SPPB - ORIGENS",                 "2026-09-23", "PENDENTE",      "Ana Raquel"),
    ("SPPE - ORIGENS",                 "2026-09-23", "PENDENTE",      "Ana Raquel"),
    ("SPPB - PARTAGE CAMPINA GRANDE",  "2026-09-28", "PENDENTE",      "Ana Raquel"),
    ("SPPE - MAURICIO DE NASSAU",      "2026-09-28", "PENDENTE",      "Ana Raquel"),
    ("SPPE - RIO MAR RECIFE",          "2026-09-29", "PENDENTE",      "Ana Raquel"),
    ("SPPI - DIRCEU",                  "2026-09-29", "PENDENTE",      "Ana Raquel"),
    ("SPCE - LOJA SUL",                "2026-09-30", "PENDENTE",      "Ana Raquel"),
    ("SPPE - SHOPPING GUARARAPES",     "2026-09-30", "PENDENTE",      "Ana Raquel"),
]

# Justificativas de tentativas nao realizadas (vao para o campo 'motivo').
MOTIVOS = {
    ("SPCE 2 - JERICOACOARA", "2026-09-14"): "SOZINHO EM LOJA",
}


# ------------------------- Firestore REST: tipos --------------------------
def para_valor(v):
    """Converte um valor Python no formato tipado do Firestore REST."""
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
    """Inverso de para_valor, para leitura."""
    if "stringValue" in v:
        return v["stringValue"]
    if "integerValue" in v:
        return int(v["integerValue"])
    if "doubleValue" in v:
        return float(v["doubleValue"])
    if "booleanValue" in v:
        return v["booleanValue"]
    if "nullValue" in v:
        return None
    if "timestampValue" in v:
        return v["timestampValue"]
    if "arrayValue" in v:
        return [de_valor(x) for x in v["arrayValue"].get("values", [])]
    if "mapValue" in v:
        return {k: de_valor(x) for k, x in v["mapValue"].get("fields", {}).items()}
    return None


def chave(s):
    """Normaliza nome de loja para comparacao: sem acento, so alfanumerico."""
    s = unicodedata.normalize("NFD", s or "")
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^A-Z0-9]", "", s.upper())


def semana_do_mes(data_iso):
    """'2026-09-17' -> 'Semana 3'. Mesma convencao dos registros existentes."""
    dia = int(data_iso.split("-")[2])
    return "Semana %d" % (((dia - 1) // 7) + 1)


def id_evento(loja, data_iso):
    """Id deterministico: reexecutar atualiza, nunca duplica."""
    return "MAP_%s_%s" % (data_iso.replace("-", ""), chave(loja)[:28])


# ----------------------------- API ---------------------------------------
def entrar(api_key):
    email = input("E-mail corporativo: ").strip()
    senha = getpass.getpass("Senha (nao aparece na tela): ")
    r = requests.post(SIGNIN, params={"key": api_key}, timeout=30,
                      json={"email": email, "password": senha, "returnSecureToken": True})
    if r.status_code != 200:
        msg = r.json().get("error", {}).get("message", r.text)
        sys.exit("Falha no login: %s" % msg)
    d = r.json()
    print("  autenticado como %s" % d["email"])
    return d["idToken"], d["localId"]


def listar(colecao, token):
    """Le a colecao inteira, seguindo a paginacao."""
    docs, pagina = {}, None
    while True:
        p = {"pageSize": 300}
        if pagina:
            p["pageToken"] = pagina
        r = requests.get("%s/%s" % (BASE, colecao), params=p, timeout=60,
                         headers={"Authorization": "Bearer " + token})
        if r.status_code == 403:
            sys.exit("Permissao negada em '%s'. Confira as regras do Firestore "
                     "e se o seu perfil em users/{uid} tem ativo:true." % colecao)
        r.raise_for_status()
        j = r.json()
        for d in j.get("documents", []):
            did = d["name"].rsplit("/", 1)[-1]
            docs[did] = {k: de_valor(v) for k, v in d.get("fields", {}).items()}
        pagina = j.get("nextPageToken")
        if not pagina:
            break
    return docs


def gravar(colecao, doc_id, campos, token):
    """PATCH com updateMask: toca so os campos informados."""
    params = [("updateMask.fieldPaths", k) for k in campos]
    r = requests.patch("%s/%s/%s" % (BASE, colecao, doc_id), params=params, timeout=30,
                       headers={"Authorization": "Bearer " + token},
                       json={"fields": {k: para_valor(v) for k, v in campos.items()}})
    if r.status_code != 200:
        raise RuntimeError("%s/%s -> %s %s" % (colecao, doc_id, r.status_code, r.text[:200]))


# ----------------------------- principal ----------------------------------
def main():
    ap = argparse.ArgumentParser(description="Carrega o planejamento de setembro no Firestore.")
    ap.add_argument("--apply", action="store_true",
                    help="grava de verdade. Sem esta opcao, apenas simula.")
    args = ap.parse_args()

    cfg_path = os.path.join(RAIZ, "public", "js", "firebase-config.js")
    if not os.path.exists(cfg_path):
        sys.exit("Nao achei public/js/firebase-config.js. Ele e gerado no build; "
                 "para rodar localmente, gere-o antes.")
    m = re.search(r'"apiKey"\s*:\s*"([^"]+)"', io.open(cfg_path, encoding="utf-8").read())
    if not m:
        sys.exit("Nao consegui ler a apiKey de public/js/firebase-config.js.")
    api_key = m.group(1)

    modo = "GRAVACAO" if args.apply else "SIMULACAO (nada sera escrito)"
    print("=" * 74)
    print(" Carga do planejamento de setembro - %s" % modo)
    print(" Projeto: %s" % PROJETO)
    print("=" * 74)

    token, uid = entrar(api_key)

    print("\nLendo o estado atual...")
    plan = listar("auditoria_planejamento", token)
    mapa = listar("auditoria_mapeamento", token)
    print("  auditoria_planejamento: %d registros" % len(plan))
    print("  auditoria_mapeamento:   %d registros" % len(mapa))

    # ---- diagnostico do que ja existe -----------------------------------
    print("\n" + "-" * 74)
    print("O QUE JA EXISTE NO BANCO")
    print("-" * 74)

    if plan:
        print("\nRegistros de planejamento (%d):" % len(plan))
        for did, d in list(plan.items())[:5]:
            print("  %s -> %s" % (did, json.dumps(d, ensure_ascii=False)[:150]))

    if mapa:
        datas = sorted(d.get("data", "") for d in mapa.values() if d.get("data"))
        auditores = {}
        lojas_mapa = set()
        for d in mapa.values():
            auditores[d.get("auditor") or "(vazio)"] = auditores.get(d.get("auditor") or "(vazio)", 0) + 1
            if d.get("lojaNome"):
                lojas_mapa.add(chave(d["lojaNome"]))
        print("\nEventos de mapeamento (%d):" % len(mapa))
        if datas:
            print("  periodo: %s ate %s" % (datas[0], datas[-1]))
        print("  lojas distintas: %d" % len(lojas_mapa))
        print("  por auditor: %s" % json.dumps(auditores, ensure_ascii=False))
        campos = sorted({k for d in mapa.values() for k in d.keys()})
        print("  campos usados: %s" % ", ".join(campos))
        alvo_set = {chave(l) for l, _, s, _ in CONSOLIDADO if s != "PENDENTE"}
        print("  dos %d eventos que vou gravar, ja existem %d lojas em comum"
              % (len(alvo_set), len(alvo_set & lojas_mapa)))

    # ---- cadastro oficial: define lojaId e o id PLAN_<n> -----------------
    caminho_mestre = os.path.join(RAIZ, "data", "lojas_ka_official.json")
    if not os.path.exists(caminho_mestre):
        sys.exit("Nao achei data/lojas_ka_official.json, necessario para criar "
                 "registros de planejamento novos.")
    mestre = json.load(io.open(caminho_mestre, encoding="utf-8"))
    # lojaId e a posicao no cadastro + 1, e o documento e PLAN_<lojaId>.
    # E a convencao que os registros existentes ja usam.
    por_nome_mestre = {chave(x["nome"]): (str(i + 1), x) for i, x in enumerate(mestre)}

    # indice do planejamento por nome normalizado de loja
    por_loja = {}
    for did, d in plan.items():
        k = chave(d.get("lojaNome") or d.get("loja") or "")
        if k:
            por_loja[k] = (did, d)

    eventos, agendamentos, criacoes, avisos = [], [], [], []

    for loja, data_iso, status, auditor in CONSOLIDADO:
        k = chave(loja)
        alvo = por_loja.get(k)

        if not alvo:
            # Nao existe registro de planejamento para esta loja: cria a partir
            # do cadastro oficial, com os mesmos campos dos registros atuais.
            if k not in por_nome_mestre:
                avisos.append("'%s' nao esta no cadastro oficial - linha ignorada" % loja)
                continue
            loja_id, reg = por_nome_mestre[k]
            novo = {
                "id": "PLAN_%s" % loja_id,
                "lojaId": loja_id,
                "lojaNome": reg["nome"],
                "nomeBi": reg.get("nomeBi", ""),
                "regional": reg.get("regional", ""),
                "uf": reg.get("uf", ""),
                "ultimaData": data_iso if status == "REALIZADA" else "",
                "proximaPrevista": data_iso if status != "REALIZADA" else "",
                "auditor": auditor,
                "status": "CONCLUIDA" if status == "REALIZADA" else "PENDENTE",
            }
            criacoes.append(("PLAN_%s" % loja_id, loja, novo))
            # segue para gerar o evento de mapeamento, se houver
            atual, did = novo, "PLAN_%s" % loja_id
        else:
            did, atual = alvo

        if status in ("REALIZADA", "NAO REALIZADA"):
            realizada = "SIM" if status == "REALIZADA" else "NÃO"
            ev_id = id_evento(loja, data_iso)
            campos = {
                "id": ev_id,
                "lojaNome": atual.get("lojaNome") or loja,
                "data": data_iso,
                "auditor": auditor,
                "realizada": realizada,
                "nTentativa": 1,
                "semana": semana_do_mes(data_iso),
                "motivo": MOTIVOS.get((loja, data_iso), ""),
            }
            ja = mapa.get(ev_id)
            eventos.append((ev_id, campos, "atualiza" if ja else "cria"))

            # ultimaData so avanca; nunca retrocede.
            if status == "REALIZADA":
                if (atual.get("ultimaData") or "") < data_iso:
                    agendamentos.append((did, loja, {"ultimaData": data_iso, "auditor": auditor},
                                         "ultimaData %s -> %s" % (atual.get("ultimaData") or "vazio", data_iso)))
        else:  # PENDENTE = agendamento
            if (atual.get("proximaPrevista") or "") != data_iso or (atual.get("auditor") or "") != auditor:
                agendamentos.append((did, loja, {"proximaPrevista": data_iso, "auditor": auditor},
                                     "proximaPrevista %s -> %s | auditor: %s" % (
                                         atual.get("proximaPrevista") or "vazio", data_iso, auditor)))

    print("\n" + "=" * 74)
    print("O QUE SERA GRAVADO")
    print("=" * 74)

    print("\nREGISTROS NOVOS em auditoria_planejamento: %d" % len(criacoes))
    for did, loja, novo in criacoes:
        print("  %-10s %-32s ultima=%-10s proxima=%-10s %s" % (
            did, loja[:32], novo["ultimaData"] or "-",
            novo["proximaPrevista"] or "-", novo["auditor"]))

    print("\nEVENTOS em auditoria_mapeamento: %d" % len(eventos))
    for ev_id, c, acao in eventos:
        print("  [%-8s] %-32s %s  realizada=%-4s %s" % (
            acao, c["lojaNome"][:32], c["data"], c["realizada"],
            ("motivo: " + c["motivo"]) if c["motivo"] else ""))

    print("\nATUALIZACOES em auditoria_planejamento: %d" % len(agendamentos))
    for did, loja, campos, desc in agendamentos:
        print("  %-32s %s" % (loja[:32], desc))

    if avisos:
        print("\nAVISOS (%d):" % len(avisos))
        for a in avisos:
            print("  ! %s" % a)

    print("-" * 74)

    if not args.apply:
        print("\nSIMULACAO - nada foi escrito.")
        print("Revise a lista acima. Para gravar:")
        print("    python tools/carregar_planejamento.py --apply")
        return

    # backup do estado atual antes de tocar em qualquer coisa
    os.makedirs(DIR_BACKUP, exist_ok=True)
    carimbo = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    destino = os.path.join(DIR_BACKUP, "pre-carga_%s.json" % carimbo)
    with io.open(destino, "w", encoding="utf-8") as f:
        json.dump({"auditoria_planejamento": plan, "auditoria_mapeamento": mapa},
                  f, ensure_ascii=False, indent=2)
    print("\nBackup do estado atual: %s" % destino)

    print("\nGravando...")
    erros = 0
    for did, loja, novo in criacoes:
        try:
            gravar("auditoria_planejamento", did, novo, token)
            print("  ok  planejamento/%s criado (%s)" % (did, loja))
        except Exception as e:
            erros += 1
            print("  ERRO %s" % e)
    for ev_id, campos, _ in eventos:
        try:
            gravar("auditoria_mapeamento", ev_id, campos, token)
            print("  ok  mapeamento/%s" % ev_id)
        except Exception as e:
            erros += 1
            print("  ERRO %s" % e)
    for did, loja, campos, _ in agendamentos:
        try:
            gravar("auditoria_planejamento", did, campos, token)
            print("  ok  planejamento/%s (%s)" % (did, loja))
        except Exception as e:
            erros += 1
            print("  ERRO %s" % e)

    total = len(criacoes) + len(eventos) + len(agendamentos)
    print("\nConcluido. %d escritas, %d erros." % (total, erros))
    if erros:
        print("Houve erros. O backup em %s tem o estado anterior." % destino)


if __name__ == "__main__":
    main()
