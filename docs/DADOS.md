# Dados

Quatro coleções no Firestore do projeto `san-paolo-auditoria`. Qualquer outra
que apareça em código é resquício: as regras negam tudo que não está aqui.

---

## `auditoria_planejamento` — uma linha por loja

Documento por loja, id `PLAN_<lojaId>`, onde `lojaId` é a posição da loja em
`data/lojas_ka_official.json` + 1. São 72.

```json
{ "id": "PLAN_2", "lojaId": "2", "lojaNome": "SPAM - PONTA NEGRA",
  "nomeBi": "Ponta Negra", "regional": "SPAM", "uf": "AM",
  "ultimaData": "2026-09-10", "proximaPrevista": "", "auditor": "Ana Raquel",
  "status": "CONCLUIDA" }
```

**`status` é calculado, não é fonte de verdade.** `getStatusLojaPlanejamento()`
deriva CONCLUIDA / ATRASADA / PENDENTE do mapeamento do mês. Gravar um status
fixo aqui briga com esse cálculo.

O filtro de período casa por `proximaPrevista` **ou** `ultimaData`. Auditoria
já realizada tem a data em `ultimaData` e `proximaPrevista` vazia — olhar só
uma das duas esconde metade das linhas.

Registro sem `lojaNome` ou `regional` quebra a renderização da tabela inteira.

---

## `auditoria_mapeamento` — os eventos

Cada documento é uma tentativa de auditoria. É a coleção que mais cresce.

```json
{ "id": "MAP_20260910_SPAMPONTANEGRA", "lojaNome": "SPAM - PONTA NEGRA",
  "data": "2026-09-10", "realizada": "SIM", "motivo": "", "auditor": "Ana Raquel",
  "nTentativa": 1, "semana": "Semana 2" }
```

- `realizada`: `"SIM"` ou `"NÃO"` (com til).
- `motivo`: preenchido quando `NÃO`. As 15 causas válidas estão no
  `<select id="map-select-motivo">` do `index.html`.
- `semana`: `"Semana N"`, com N = `((dia - 1) // 7) + 1`.
- `nTentativa`: **várias tentativas no mesmo dia são normais** — ligou às
  14:45 e não atenderam, ligou às 15:31 e conseguiu. São dois documentos.

Os ids têm três formatos convivendo, todos válidos: `MAP_<timestamp>` (criado
pela interface), `MAP_<AAAAMMDD>_<LOJA>` (criado por script) e ids
alfanuméricos de 20 caracteres (originais do Firestore, vindos do backup).
**Por isso a identidade lógica é `(lojaNome, data, nTentativa)`, nunca o id.**

---

## `users` — perfis de acesso

**O id do documento É o uid do Firebase Auth.** As regras resolvem o perfil
por caminho literal `users/$(request.auth.uid)`; documento com outro id não é
lido por ninguém e a pessoa não entra.

```json
{ "displayName": "Matheus Cosme", "email": "...", "role": "superadmin",
  "ativo": true, "setores_permitidos": ["Auditoria"] }
```

- `ativo` tem de ser **booleano**. Como string `"true"` nega tudo, em silêncio.
- `displayName` é a chave de junção com o campo `auditor` dos registros —
  precisa bater exatamente com o nome usado nos dados.
- **Nunca** um campo `pass`. As regras rejeitam.

Esta coleção já significou "membros da equipe" (com campos `nome`, `cargo`,
`meta`). Não significa mais. Código que lê `u.nome` daqui está lendo o
esquema antigo.

Remover acesso é `ativo: false`, não `delete`. Apagar o perfil não apaga a
conta do Auth — isso exige Admin SDK — e deixaria uma conta órfã capaz de
autenticar sem perfil.

---

## `tarefas_equipe` — quadro Kanban

Usada em 10 pontos do `app.js`. Não está no backup de 2026-08-29.

---

## O backup histórico

`data/backup_geral_2026-08-29.json`, 619 registros em 7 coleções. **Fora do
git** — contém nomes de funcionários e notas internas.

**Backup e banco não se contêm.** O backup vai de 08/04 a 28/08; o banco tem
setembro, que o backup não tem. Restauração é sempre merge com diff.

### Tradução de esquema

O backup fala outro dialeto:

| backup | sistema |
|---|---|
| `lojaId` → `data/mapa_lojas_backup.json` | `lojaNome` (`"SPRN - MIDWAY"`) |
| `nomeLoja` (`"MIDWAY"`, nome curto) | descartado |
| `dataTentativa` | `data` |
| `justificativa` | `motivo` |
| `autor` / `auditor` | `auditor` |
| — | `semana` (calculado da data) |

O `lojaId` do backup **não** é a posição no cadastro oficial: só 10 de 515
registros bateriam por essa hipótese. Ele aponta para a lista de lojas do app
de origem. `tools/gerar_mapa_lojas.py` monta a tradução e valida — 586/586
registros traduzem.

Campos sem equivalente (`horario`, `notas`, `sla`, `estado`) são preservados
no documento quando trazem valor. O app ignora; descartar seria pior.

As 3 coleções órfãs do backup — `auditoria_projetos` (12),
`protocolos_suporte` (15), `links_Auditoria` (1) e `auditoria_equipe` (5) —
não têm tela no app nem regra no Firestore. Continuam só no arquivo.

---

## Contagens conhecidas

Referência para detectar perda de dados. Estado em 2026-09-17:

| | |
|---|---|
| `auditoria_planejamento` | 72 (uma por loja do cadastro) |
| `auditoria_mapeamento` | ~532, de abril a setembro |
| `users` | 3 perfis |
| Cadastro oficial de lojas | 72 |

Auditores que aparecem nos dados: Bruna Costa, Fernanda Teles, Matheus Cosme,
Ana Raquel, Paulo Victor. **Fernanda Teles responde por 139 registros e não
tem conta** — é ex-colaboradora. Por isso as métricas derivam dos dados, e não
do cadastro de acesso: senão o trabalho dela some do histórico.

### Pendências conhecidas

- 3 duplicatas de lançamento na origem, preservadas e listadas na restauração:
  RIVERSIDE 09/07, AQUIRAZ e EUSEBIO 24/06.
- ~35 lojas sem `auditor` no planejamento — foram criadas a partir do cadastro,
  sem informação de responsável.
- Divergência de 1 registro entre a contagem esperada (532) e a lida (531),
  nunca investigada.
