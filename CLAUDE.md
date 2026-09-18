@AGENTS.md

## Claude Code

O conteúdo acima é compartilhado com outras IDEs. O que segue é específico
desta ferramenta.

### Contexto

`docs/` não é importado de propósito. Import `@` carrega no lançamento e não
economiza contexto — quem economiza é ler sob demanda. Leia o arquivo de
`docs/` que a tarefa pedir, não os três.

As regras em `.claude/rules/` têm `paths:` e carregam sozinhas quando você
abre os arquivos correspondentes. Não precisa lê-las por conta.

### Trabalho com dados

Escrita no Firestore é irreversível e o banco é de produção. Rode sempre a
simulação primeiro e **mostre a saída ao usuário antes de gravar** — foi
revisando simulação que pegamos, em execuções distintas, 26 registros que
seriam perdidos e 2 justificativas que seriam apagadas.

Quem executa os scripts é o usuário: eles pedem senha por `getpass`.

### Verificação

O app não tem testes. A verificação que funciona aqui é servir `public/` em
`127.0.0.1:8777` e exercitar a função no navegador com estado injetado —
`state.planejamento`, `state.mapeamento`, `state.usuarios` e um `db` simulado.
Foi assim que validamos cada correção de render sem precisar de login.

Não afirme que uma tela funciona sem ter renderizado ela.
