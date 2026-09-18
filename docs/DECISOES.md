# Decisões e o que as originou

Cada regra do `AGENTS.md` saiu de um incidente concreto. Este arquivo guarda o
caso, para a regra não parecer arbitrária e não ser revertida por engano.

---

## Por que o site é este código, e não o outro

Existe uma segunda base de código, modular e mais rica — 8 telas contra 6,
export/import XLSX, protocolos, links, auditoria online. Ela pertence a outro
desenvolvedor, não está no ar, e o projeto Firebase dela é inacessível.

A decisão foi usar o código do próprio usuário. **Não proponha migrar para a
outra base sem ele pedir.** O repositório antigo também não serve: o `.git`
dele tem 423 MB e carrega um perfil Chrome completo e um token de API no
histórico.

---

## Por que o seed fica desligado

`setupRealtimeCloudSync()` instalava listeners que, ao encontrar uma coleção
vazia, a repovoavam com os dados embutidos no `app.js`. Rodava no
`DOMContentLoaded`, **antes de qualquer login**.

O problema: o mapeamento embutido tem `slice(0, 100)` — 100 dos 515 registros
reais — e o planejamento embutido é sintético, com ids `PLAN_1..PLAN_72` sem
interseção com os docIds verdadeiros. Rodar contra o banco restaurado apagaria
415 registros e passaria a tratar a versão truncada como verdade.

Daí `SEED_INICIAL_HABILITADO = false`. Só ligue contra um projeto Firebase
vazio e descartável.

---

## Por que a identidade inclui `nTentativa`

A restauração começou com identidade `(loja, data)`. A simulação mostrou 25
pares loja+dia com mais de um registro, e olhando o conteúdo ficou claro que
não eram duplicatas:

```
SPBA - SHOPPING DA BAHIA, 28/08
  tentativa 1 · 14:45 · NÃO · "LOJA NÃO ATENDEU A LIGAÇÃO"
  tentativa 2 · 15:31 · SIM
```

É a sequência real do trabalho. Com a chave curta, os dois gravariam no mesmo
documento e o segundo apagaria o primeiro: **26 registros perdidos**, e
justamente o histórico de tentativas que o sistema existe para medir.

Sobraram 3 pares que nem `nTentativa` distingue — duplicatas de lançamento de
verdade (mesmo horário, gravados com 17 segundos de diferença). Foram
preservados sob ids próprios e reportados, em vez de escolhidos por conta
própria.

---

## Por que vazio não sobrescreve

Duas auditorias já existiam no banco quando a carga de setembro rodou. A
planilha consolidada não tinha coluna de observação, então o `motivo` saía
vazio — e o PATCH gravaria esse vazio por cima da justificativa que alguém
escreveu pelo sistema.

A simulação mostrou `[atualiza: motivo]` nessas duas linhas, e foi só olhando
o diff campo a campo que apareceu.

---

## Por que a restauração é merge, nunca sobrescrita

Durante quase todo o diagnóstico a premissa foi "o banco só tem o seed
truncado, o backup é o superconjunto". **Era falsa.**

| | período | registros |
|---|---|---|
| Backup de 29/08 | 08/04 a 28/08 | 515 |
| Banco | 07/08 a **11/09** | 101 |

O banco tinha setembro que o backup não tinha. "Limpa e recarrega" teria
apagado trabalho real.

---

## Por que `users/{uid}` e não outro id

As regras do Firestore **não executam consulta** — só `get()` de caminho
literal. Com `addDoc` e id aleatório é impossível descobrir o papel de quem
está pedindo dentro da regra. Por isso o id do documento tem de ser o uid.

Foi um erro nessa correspondência que fez o sistema logar o usuário com o nome
de outra pessoa: o documento do uid dele tinha o `displayName` de uma colega.
Desde então o guarda de sessão compara o `email` do perfil com o da conta
autenticada e **recusa a sessão** se divergirem — auditoria assinada com nome
errado é pior que login que falha.

---

## Por que a regra não é `request.auth != null`

No Firebase Auth padrão **não há como desligar o auto-cadastro** mantendo
login por e-mail/senha, e a apiKey Web é pública no bundle por construção.
Qualquer pessoa na internet cria uma conta válida no projeto.

`request.auth != null` deixaria essa pessoa ler tudo. O portão real é
`exists(users/{uid})` com `ativo == true`: alguém precisa ter liberado.

---

## Por que a apiKey no código não era o problema

A chave Web do Firebase **não é segredo**. Ela é identificador de projeto e vai
no bundle de todo app Firebase. Movê-la para variável de ambiente trouxe
higiene — trocar de projeto sem reescrever arquivo, separar preview de
produção — **não segurança**.

O risco real estava nas Security Rules, que tinham `allow read, write: if true`
em quatro coleções. Combinado com a chave pública, qualquer pessoa lia e
escrevia o banco inteiro via REST.

Tratar a apiKey como vazamento crítico e as regras abertas como detalhe é
inverter a gravidade.

---

## Por que a produtividade mede trabalho feito

Os cards contavam linhas do planejamento atribuídas à pessoa. Quem realizava
uma auditoria numa loja sem responsável — ou na loja de outro — não era
contabilizado. E metade das lojas está sem responsável desde que o cadastro
foi completado.

Passou a contar do mapeamento: quem executou recebe o crédito. O percentual é
participação no total do mês, porque **não existe meta cadastrada em lugar
nenhum do sistema** — qualquer outro denominador seria inventado.

O gráfico de rosca mudou junto, de "Distribuição de Lojas por Auditor" para
"Auditorias Realizadas por Auditor": com metade das lojas sem dono, o título
antigo sugeria que a operação inteira estava dividida entre duas pessoas.

---

## Por que o registro rápido grava ao escolher a causa

O atalho do Planejamento preenche tudo o que dá para deduzir e deixa um passo:
escolher a causa. Escolher fecha o registro.

Gravar no `onchange` de um select é perigoso se valer sempre — um clique errado
viraria registro de auditoria. Então o atalho **arma um flag** que a escolha
consome; no uso normal do formulário, escolher a causa não grava nada. Sair da
aba desarma, para um atalho abandonado pela metade não gravar depois.

E isso só ficou aceitável porque a remoção de mapeamento entrou junto: o
registro em um clique é seguro quando dá para desfazer.
