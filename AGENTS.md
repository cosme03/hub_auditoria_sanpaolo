# Hub Auditoria San Paolo

Sistema interno de controle de auditoria das 72 lojas San Paolo Gelato.
Site estático (HTML + JS clássico, sem bundler) na Vercel, com Firestore e
Firebase Authentication.

Produção: https://hub-auditoria-sanpaolo.vercel.app/

## Ambiente — leia antes de sugerir qualquer comando

A máquina de desenvolvimento é **Windows com PowerShell** e tem apenas
**git 2.54** e **Python 3.13** (com `requests`).

**Não existem aqui:** Node.js, npm, npx, `firebase` (firebase-tools),
`vercel`, `gh`. Qualquer receita que dependa deles é inviável — e a maior
parte da documentação de Firebase e Vercel assume que existem.

No PowerShell desta máquina, `&&` **não** encadeia comandos (erro de parser).
Use um comando por linha.

## Contas e deploy

| | |
|---|---|
| Repositório | `github.com/cosme03/hub_auditoria_sanpaolo` |
| Firebase | projeto `san-paolo-auditoria` |
| Vercel | projeto `hub-auditoria-sanpaolo` |

**O deploy é automático no push para `main`.** Não há CLI envolvida: a Vercel
builda na nuvem dela, onde Node existe. Todo `git push` publica.

## Estrutura

```
public/    <-- outputDirectory: a ÚNICA pasta publicada na web
data/      backup e cadastro de lojas — nunca vão ao ar, nunca ao git
tools/     scripts Python de carga e manutenção de dados
tests/     teste do runner nativo do Node (não roda nesta máquina)
```

Tudo fora de `public/` é inalcançável pela internet. Essa é a garantia forte;
o `.vercelignore` é defesa em profundidade, não a proteção principal.

`public/js/firebase-config.js` é **gerado no build** por `tools/build.js` a
partir das variáveis de ambiente da Vercel. Não existe no repositório e não
deve ser criado à mão — exceto a cópia local para testes, que está no
`.gitignore`.

## Comandos

Rodar o site localmente (precisa do `public/js/firebase-config.js` local):

```
python -m http.server 8777 --bind 127.0.0.1
```

Scripts de dados — **todos rodam em simulação por padrão**, e só gravam com
`--apply`. Use sempre o caminho absoluto: eles se localizam sozinhos, mas o
terminal raramente está na pasta do projeto.

```
python D:/SP-AUDITORIA/projeto-hub_auditoria/hub_auditoria_sanpaolo/tools/<script>.py
python D:/SP-AUDITORIA/projeto-hub_auditoria/hub_auditoria_sanpaolo/tools/<script>.py --apply
```

Os scripts pedem e-mail e senha por `getpass` e autenticam via REST. **Nunca
peça, receba ou escreva a senha do usuário** — quem executa é ele.

Publicar regras do Firestore: **só pelo console web**. Sem firebase-tools,
não há deploy por CLI. `firebase.json` e `firestore.rules` são fonte
versionada, não aplicáveis automaticamente.

## Regras que não podem ser quebradas

Cada uma destas custou um incidente ou quase-incidente. Ver
`docs/DECISOES.md` para o caso concreto de cada uma.

1. **`SEED_INICIAL_HABILITADO` fica `false`.** Religar repovoa o Firestore com
   os dados embutidos no `app.js` — mapeamento truncado em 100 de 515
   registros e planejamento sintético.

2. **A identidade de uma auditoria é `(lojaNome, data, nTentativa)`**, nunca o
   id do documento. Ids variam conforme quem gravou. Usar só `(loja, data)`
   colapsa tentativas distintas do mesmo dia — são ligações diferentes, não
   duplicatas.

3. **Valor vazio nunca sobrescreve campo preenchido.** Carga sem coluna de
   observação apagaria justificativas escritas pelo sistema.

4. **`ultimaData` só avança**, nunca retrocede.

5. **Escrita no Firestore sempre com `updateMask`.** PATCH sem máscara apaga
   todos os campos fora do payload.

6. **Backup e banco não se contêm.** Restauração é sempre merge com diff,
   nunca sobrescrita nem "limpa e recarrega".

7. **`data/` nunca entra no git.** Contém nomes de funcionários e notas
   internas. O que entra no histórico não sai.

8. **`users/{uid}`: o id do documento É o uid do Firebase Auth.** As regras
   resolvem o perfil por caminho literal, nunca por consulta. Documento com id
   diferente do uid não é lido por ninguém.

## Ao mexer no app.js

`public/app.js` tem ~8.700 linhas em escopo global, sem módulos e sem testes.
Antes de editar, leia `.claude/rules/` — as regras com `paths:` carregam
sozinhas quando você abre os arquivos correspondentes.

Armadilha recorrente: **uma exceção dentro de um `.map()` ou `.filter()` de
render aborta a função inteira antes do `innerHTML`**, e a tela fica vazia sem
mensagem de erro visível. Já aconteceu duas vezes. Sempre guarde acesso a
campo que pode não existir: `(item.campo || '')`.

## Referência sob demanda

Estes arquivos **não** são carregados automaticamente. Leia quando a tarefa
pedir:

- `docs/WORKFLOWS.md` — desenvolvimento local, deploy, carga de dados,
  publicação de regras, verificação de produção
- `docs/DADOS.md` — esquema das 4 coleções, tradução do backup, contagens
  conhecidas
- `docs/DECISOES.md` — por que cada regra acima existe, com o incidente que a
  originou
