# Workflows

Os quatro fluxos do projeto: rodar local, publicar, mexer em dados e publicar
regras. Todos partem de uma máquina Windows com apenas git e Python.

---

## 1. Desenvolvimento local

O site é estático: não há dev server, build nem watch. Basta servir `public/`.

```
python -m http.server 8777 --bind 127.0.0.1
```

Abra `http://127.0.0.1:8777/index.html`.

**Pré-requisito:** `public/js/firebase-config.js` precisa existir localmente.
Ele é gerado no build da Vercel e está no `.gitignore`, então não vem do
clone. Para criar a cópia local, extraia os valores do app de origem ou do
console do Firebase e escreva no formato que `js/firebase-init.js` espera:

```js
(function (global) {
  "use strict";
  var cfg = { apiKey: "...", authDomain: "...", projectId: "san-paolo-auditoria",
              storageBucket: "...", messagingSenderId: "...", appId: "..." };
  global.firebaseConfig = Object.freeze(cfg);
})(typeof globalThis !== "undefined" ? globalThis : window);
```

Sem ele, `firebase-init.js` aborta com mensagem no console e nada carrega.

### Testar sem login

O login precisa de senha real, que não deve circular. Para exercitar uma tela,
injete o estado pelo console do navegador e chame a função de render direto:

```js
state.planejamento = [ /* registros de teste */ ];
state.mapeamento   = [ /* eventos de teste */ ];
state.usuarios     = [{id:'u1', displayName:'Fulano', email:'f@x.y', ativo:true}];
normalizarUsuarios();
renderPlanejamentoTable();
```

Para testar escrita sem tocar no banco, substitua `window.db` por um objeto
que registra as chamadas:

```js
window.__escritas = [];
window.db = { collection: (c) => ({ doc: (d) => ({
  set:    async (v) => window.__escritas.push(['set', c, d, v]),
  update: async (v) => window.__escritas.push(['update', c, d, v]),
  delete: async ()  => window.__escritas.push(['delete', c, d])
})})};
```

Foi assim que cada correção de render e cada funcionalidade nova foi validada.

---

## 2. Publicar

```
git add -A
git commit -m "mensagem"
git push origin main
```

O push dispara o deploy. A Vercel roda `node tools/build.js`, que gera
`public/js/firebase-config.js` a partir das variáveis de ambiente, e publica
`public/`.

O build **aborta de propósito** se faltar variável, com mensagem dizendo qual.
As seis: `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`,
`FIREBASE_STORAGE_BUCKET`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID`.
Cadastradas em Vercel → Settings → Environment Variables, nos três ambientes.

Mudar variável de ambiente **não** redeploya sozinho: use Redeploy no painel.

### Conferir o que está no ar

```
curl -sI https://hub-auditoria-sanpaolo.vercel.app/
curl -s  https://hub-auditoria-sanpaolo.vercel.app/js/firebase-config.js
```

E que os dados operacionais continuam fora do ar (tem de dar 404):

```
curl -s -o /dev/null -w "%{http_code}" https://hub-auditoria-sanpaolo.vercel.app/data/backup_geral_2026-08-29.json
```

---

## 3. Carga e manutenção de dados

Sempre em duas etapas. Nunca pule a simulação.

```
python D:/SP-AUDITORIA/projeto-hub_auditoria/hub_auditoria_sanpaolo/tools/<script>.py
python D:/SP-AUDITORIA/projeto-hub_auditoria/hub_auditoria_sanpaolo/tools/<script>.py --apply
```

Caminho absoluto sempre: os scripts se localizam sozinhos, mas o terminal
costuma estar em outra pasta.

| Script | O que faz |
|---|---|
| `carregar_planejamento.py` | Carrega um planejamento mensal consolidado |
| `restaurar_backup.py` | Merge do backup histórico, com tradução de esquema |
| `completar_planejamento.py` | Completa as 72 lojas e deriva `ultimaData` do histórico |
| `gerar_mapa_lojas.py` | Regera `data/mapa_lojas_backup.json` (não escreve no banco) |

O que revisar na simulação, antes de autorizar:

- A conferência de integridade fecha? (destinos distintos, soma bate)
- Quantos são criação e quantos são atualização — e **quais campos** mudam nas
  atualizações
- Os avisos: duplicata na origem, valor preservado, registro já idêntico

Cada `--apply` grava um dump do estado anterior em
`D:\SP-AUDITORIA\projeto-hub_auditoria\backups-firestore\`.

---

## 4. Publicar regras do Firestore

Não há CLI. O caminho é o console web:

Firebase Console → `san-paolo-auditoria` → Firestore Database → aba **Regras**
→ colar o conteúdo de `firestore.rules` → **Publicar**.

Antes de publicar, use o **Simulador** da mesma aba. Os testes que importam:

| Tipo | Caminho | Autenticado | Esperado |
|---|---|---|---|
| `get` | `/auditoria_mapeamento/x` | desligado | negado |
| `get` | `/auditoria_mapeamento/x` | uid com perfil ativo | permitido |
| `get` | `/auditoria_mapeamento/x` | uid inventado | **negado** |
| `list` | `/users` | uid superadmin | permitido |
| `list` | `/users` | uid comum | negado |
| `update` | `/users/<uid comum>` | esse mesmo uid, com `role: "superadmin"` | **negado** |

O terceiro e o sexto são os que importam mais. O auto-cadastro do Firebase
Auth não pode ser desligado e a apiKey é pública: qualquer pessoa cria conta
válida no projeto. Por isso a regra exige `exists(users/{uid})` com
`ativo == true`, e não apenas `request.auth != null`.

Verificar de fora que o banco está fechado (tem de dar 403):

```
curl -s -o /dev/null -w "%{http_code}" "https://firestore.googleapis.com/v1/projects/san-paolo-auditoria/databases/(default)/documents/users?key=<API_KEY>&pageSize=1"
```
