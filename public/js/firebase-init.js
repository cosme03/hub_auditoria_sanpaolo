// ==========================================================================
// js/firebase-init.js
//
// Substitui o antigo firebase-config.js da raiz. Duas diferencas em relacao
// a ele, e as duas sao de proposito:
//
//  1. A configuracao NAO fica escrita aqui. Ela vem de js/firebase-config.js,
//     gerado no build da Vercel a partir das variaveis de ambiente
//     (tools/build.js). Este arquivo e versionado no git; credencial fixa
//     dentro dele viraria historico permanente.
//
//  2. initFirebase() NAO chama mais setupRealtimeCloudSync(). Antes, a
//     sincronizacao subia junto com a pagina, ANTES de qualquer login, e cada
//     listener semeava a colecao correspondente quando a encontrava vazia.
//     Isso repovoava o banco com os dados embutidos no app.js - inclusive o
//     mapeamento truncado em 100 dos 515 registros (app.js, slice(0, 100)).
//     Agora quem chama a sincronizacao e o guarda de sessao, depois de
//     confirmar a identidade.
// ==========================================================================
(function () {
    'use strict';

    function initFirebase() {
        var cfg = window.firebaseConfig;
        if (!cfg || !cfg.projectId) {
            console.error('[Firebase] js/firebase-config.js nao carregou. ' +
                'Confira a ordem das tags <script> e o log do build na Vercel.');
            return;
        }

        try {
            if (typeof firebase === 'undefined' || !firebase.initializeApp) {
                console.error('[Firebase] SDK nao carregou.');
                return;
            }
            if (!firebase.apps.length) {
                firebase.initializeApp(cfg);
                console.log('[Firebase] Inicializado no projeto ' + cfg.projectId + '.');
            }

            // db e auth ficam em window: app.js le `db` pelo escopo global.
            window.db = firebase.firestore();
            window.auth = firebase.auth();
        } catch (err) {
            console.error('[Firebase] Falha na inicializacao:', err);
        }
    }

    window.initFirebase = initFirebase;

    // Inicializa imediatamente: o guarda de sessao precisa de window.auth
    // assim que a pagina carrega.
    initFirebase();
})();
