# -*- coding: utf-8 -*-
"""
tools/gerar_mapa_lojas.py

Gera data/mapa_lojas_backup.json: a tabela que traduz o lojaId do backup de
2026-08-29 para o nome oficial de loja usado pelo sistema.

POR QUE ISTO E PRECISO
----------------------
O backup guarda 'lojaId' e um nome CURTO ("MIDWAY", "AQUIRAZ"). O sistema
usa o nome COMPLETO ("SPRN - MIDWAY"). E o lojaId NAO e a posicao no cadastro
oficial: verificado, so 10 de 515 registros bateriam por essa hipotese.

O lojaId aponta para a lista de lojas do app de origem (js/data.js da pasta
hubsanpaolo), com 72 entradas. Verificado: 515/515 registros de mapeamento e
71/71 de planejamento casam nome curto + lojaId nessa lista.

A ponte final - nome curto + UF -> nome oficial - resolve sozinha para 55 das
72 lojas. As 17 restantes estao em CORRECOES, cada uma conferida a mao.
"""

import io
import json
import os
import re
import unicodedata

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_JS = r"D:\SP-AUDITORIA\projeto-hub_auditoria\hubsanpaolo\hubsanpaolo\js\data.js"
MESTRE = os.path.join(RAIZ, "data", "lojas_ka_official.json")
SAIDA = os.path.join(RAIZ, "data", "mapa_lojas_backup.json")

# Nome curto do backup -> nome oficial. Cada linha foi conferida contra o
# cadastro; o comentario explica o caso quando nao e obvio.
CORRECOES = {
    "IGUATEMI FORTALEZA":                          "SPCE - SHOPPING IGUATEMI",
    # data.js tem 12 "BEIRA MAR FORTALEZA" e 17 "BEIRA MAR QUIOSQUE";
    # por eliminacao a 12 e a loja.
    "BEIRA MAR FORTALEZA":                         "SPCE - BEIRA MAR LOJA",
    "BEIRA MAR QUIOSQUE":                          "SPCE - BEIRA MAR QUIOSQUE",
    "EMBARQUE INTERNACIONAL / AEROPORTO QUIOSQUE": "SPCE - AEROPORTO QUIOSQUE",
    "CAUCAIA/OUTLET":                              "SPCE - OUTLET FORTALEZA",
    "AMONTADA/ICARAI":                             "SPCE 2 - ICARAI DE AMONTADA",
    "SALVADOR SHOPPING":                           "SPBA - SHOPPING SALVADOR",
    "AEROPORTO LOJA SALVADOR":                     "SPBA - AEROPORTO LOJA",
    "AEROPORTO QUIOSQUE SALVADOR":                 "SPBA - AEROPORTO QUIOSQUE",
    "SAO LUIS SHOPPING":                           "SPMA - SHOPPING SAO LUIS",
    "CASA FORTE/ORIGENS":                          "SPPE - ORIGENS",
    "VIERALVES":                                   "SPAM - VIEIRALVES",   # grafia sem o 'i'
    "RIOMAR ARACAJU":                              "SPSE - ARACAJU",
    "PANTANAL SHOPPING / CUIABA":                  "SPMT - SHOPPING PANTANAL",
    "SHOPPING ESTAÇÃO CUIABA":                     "SPMT - ESTACAO CUIABA",
    "WORK CAFE SANTANDER":                         "SPCE - WORK CAFE",
    "PARTAGE SHOPPING":                            "SPPB - PARTAGE CAMPINA GRANDE",
}

# Entradas do data.js sem loja correspondente no cadastro oficial.
# 'CSC' e um registro administrativo (UF 'RRPART') e nao tem nenhum
# registro no backup - ignorar e correto, nao perde dado.
SEM_CORRESPONDENCIA = {"CSC"}


def chave(s):
    s = unicodedata.normalize("NFD", str(s or ""))
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^A-Z0-9]", "", s.upper())


def main():
    texto = io.open(DATA_JS, encoding="utf-8").read()
    curtas = {}
    for m in re.finditer(r"id:\s*(\d+),\s*estado:\s*'([^']*)',\s*nome:\s*'([^']*)'", texto):
        curtas[m.group(1)] = {"uf": m.group(2), "nome": m.group(3)}
    if not curtas:
        raise SystemExit("Nao consegui ler as lojas de %s" % DATA_JS)

    mestre = json.load(io.open(MESTRE, encoding="utf-8"))

    mapa, pendentes = {}, []
    for lid, info in sorted(curtas.items(), key=lambda x: int(x[0])):
        curto, uf = info["nome"], info["uf"]

        if curto in SEM_CORRESPONDENCIA:
            continue
        if curto in CORRECOES:
            mapa[lid] = CORRECOES[curto]
            continue

        cands = [m for m in mestre if m["uf"] == uf and chave(curto) in chave(m["nome"])]
        if len(cands) == 1:
            mapa[lid] = cands[0]["nome"]
            continue
        exatos = [m for m in cands if chave(m["nome"].split("-", 1)[-1]) == chave(curto)]
        if len(exatos) == 1:
            mapa[lid] = exatos[0]["nome"]
        else:
            pendentes.append((lid, uf, curto, [m["nome"] for m in cands]))

    if pendentes:
        print("PENDENTES - resolva em CORRECOES antes de usar o mapa:")
        for lid, uf, curto, c in pendentes:
            print("  id=%-3s %-4s %-30s candidatos=%s" % (lid, uf, curto, c or "nenhum"))
        raise SystemExit(1)

    # nenhuma loja oficial pode receber dois lojaId diferentes
    invertido = {}
    for lid, nome in mapa.items():
        invertido.setdefault(nome, []).append(lid)
    colisoes = {n: ids for n, ids in invertido.items() if len(ids) > 1}
    if colisoes:
        print("COLISAO - a mesma loja oficial recebeu mais de um lojaId:")
        for n, ids in colisoes.items():
            print("  %s <- %s" % (n, ids))
        raise SystemExit(1)

    with io.open(SAIDA, "w", encoding="utf-8") as f:
        json.dump(mapa, f, ensure_ascii=False, indent=2, sort_keys=True)

    nomes_oficiais = {m["nome"] for m in mestre}
    invalidos = sorted(set(mapa.values()) - nomes_oficiais)
    print("mapa gravado: data/mapa_lojas_backup.json")
    print("  %d lojaId traduzidos (de %d no data.js)" % (len(mapa), len(curtas)))
    print("  ignorados de proposito: %s" % ", ".join(sorted(SEM_CORRESPONDENCIA)))
    print("  nomes fora do cadastro oficial: %s" % (invalidos or "nenhum"))
    print("  lojas oficiais sem lojaId: %d de %d" % (len(nomes_oficiais - set(mapa.values())), len(nomes_oficiais)))


if __name__ == "__main__":
    main()
