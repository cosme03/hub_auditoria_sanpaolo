# Hub Auditoria San Paolo

Site estatico multipagina (sem bundler, sem framework) servido pela Vercel,
com Firestore + Firebase Authentication no projeto `san-paolo-auditoria`.

## Arvore

    tools/     scripts de build e de restauracao (nao vao ao ar)
    tests/     testes com o runner nativo do Node
    data/      backup e masters de dados (NUNCA servidos)
    public/    <-- outputDirectory: e a unica pasta publicada

Tudo o que estiver fora de `public/` e inalcancavel pela internet. Esta e a
garantia forte: *"Only the contents of this Output Directory will be served
statically by Vercel."* O `.vercelignore` e defesa em profundidade, nao a
protecao principal.

## Variaveis de ambiente

Seis variaveis, cadastradas em
**Vercel > Settings > Environment Variables**, marcando Production, Preview e
Development:

    FIREBASE_API_KEY
    FIREBASE_AUTH_DOMAIN
    FIREBASE_PROJECT_ID
    FIREBASE_STORAGE_BUCKET
    FIREBASE_MESSAGING_SENDER_ID
    FIREBASE_APP_ID

Nenhuma delas e secreta: todas sao entregues ao navegador dentro de
`/js/firebase-config.js`. A protecao real e o `firestore.rules` + o Firebase
Auth. Ver `.env.example`.

Mudar uma env var **nao** dispara redeploy: Deployments > (...) > Redeploy.

## Build

O unico passo de build e `node tools/build.js`, que le as env vars e escreve
`public/js/firebase-config.js`. Roda **apenas no container da Vercel**. Sem
dependencias, sem lockfile, sem `npm install` (`installCommand` vazio).

## Rodar localmente (sem Node)

    python -m http.server 8080 --directory public

Criar `public/js/firebase-config.js` a mao uma unica vez com os valores reais
(o arquivo esta no `.gitignore` e nunca sera commitado):

    window.firebaseConfig = { apiKey: "...", authDomain: "...", projectId: "...",
      storageBucket: "...", messagingSenderId: "...", appId: "..." };

## Regras do Firestore

`firestore.rules` e `firestore.indexes.json` sao fonte de verdade versionada,
mas **nao ha deploy automatico**: sem Node/firebase-tools na maquina, a
publicacao e manual em

    Firebase Console > san-paolo-auditoria > Firestore Database > Regras > Publicar

Testar antes no **Simulador** da propria aba Regras (nao precisa instalar nada;
o emulador local exigiria npm + Java).

`firestore.indexes.json` nasce vazio porque nenhuma query do projeto combina
`where` com `orderBy` - nenhum indice composto e necessario.

## Autenticacao

Firebase Auth E-mail/Senha. O perfil vive em `users/{uid}`, com o id do
documento igual ao UID do Auth - obrigatorio, porque as regras do Firestore
nao executam query, so `get()` de caminho literal.

Campos: `displayName`, `email`, `role` (`superadmin` | `user`),
`setores_permitidos` (array), `ativo` (boolean). **Nunca** um campo de senha.

`displayName` e a chave de juncao de todos os registros historicos (campos
`autor`, `auditor`, `responsavel`, `responsaveis[]`, `membroResponsavel`,
`demandante`). Uma divergencia de acento ou sobrenome faz filtros retornarem
vazio **sem erro nenhum**. Conferir caractere a caractere ao criar contas.

Criar usuario pelo SDK do navegador troca a sessao do admin pela do novo
usuario. Usar uma instancia secundaria (`firebase.initializeApp(cfg,
'secondary')`) ou criar no Console. Trocar a senha de outra pessoa e
impossivel pelo cliente: usar `sendPasswordResetEmail`. Excluir conta de outra
pessoa exige Admin SDK: preferir `ativo: false`.

## Colecoes do Firestore

    users                  perfis (id = uid do Auth)
    auditoria_planejamento planejamento de visitas
    auditoria_mapeamento   historico de tentativas   <-- nome canonico
    auditoria_projetos     tarefas / projetos
    auditoria_notas        notas da auditoria online
    auditoria_equipe       membros
    protocolos_suporte     chamados
    notifications          notificacoes por usuario
    links_<Setor>          links uteis (nome dinamico, hoje so links_Auditoria)

`mapeamento_auditoria`, `atas`, `logs` e `tarefas_equipe` **nao** fazem parte
deste sistema e nao tem regra.

## Testes

    node --test tests/

## Restauracao de dados

`tools/restore_backup.py` (Python 3.13 + requests, sem Node) autentica via
`identitytoolkit` e escreve via REST do Firestore. Idempotente: os 619
documentos ja tem id proprio. Sempre rodar o dump pre-restauracao antes, e
gravar os dumps **fora de qualquer repositorio git**.
