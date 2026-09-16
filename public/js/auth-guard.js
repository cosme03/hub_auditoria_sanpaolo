// ==================================================================
// auth-guard.js
// Portao de sessao. Carregado LOGO APOS firebase-init.js nas duas
// paginas. Cada pagina declara window.__LOGIN_URL inline ANTES desta
// tag, porque a profundidade relativa difere entre / e /setores/X/.
// ==================================================================
(function () {
  'use strict';

  var LOGIN_URL = window.__LOGIN_URL || './index.html';
  var NA_TELA_DE_LOGIN = !!window.__IS_LOGIN_PAGE;

  function irParaLogin() {
    if (NA_TELA_DE_LOGIN) return;      // evita loop de redirect
    window.location.href = LOGIN_URL;
  }

  window.auth.onAuthStateChanged(async function (user) {
    if (!user) {
      window.currentUser = null;
      window.userProfile = null;
      if (typeof window.atualizarHeaderSessao === 'function') {
        window.atualizarHeaderSessao(null);
      }
      if (typeof window.mostrarTelaLogin === 'function') window.mostrarTelaLogin();
      else irParaLogin();
      return;
    }

    var perfil = null;
    try {
      var snap = await window.db.collection('users').doc(user.uid).get();
      if (snap.exists) perfil = snap.data();
    } catch (e) {
      // Com as regras publicadas, uma conta sem doc de perfil pode receber
      // permission-denied em vez de "nao encontrado". Tratar como sem perfil.
      console.warn('[auth-guard] leitura de perfil falhou:', e && e.code);
    }

    if (!perfil || perfil.ativo !== true) {
      await window.auth.signOut();
      if (typeof window.showToast === 'function') {
        window.showToast('Conta sem acesso liberado. Procure o administrador.', 'error');
      }
      irParaLogin();
      return;
    }

    window.userEmail   = user.email;
    window.userUid     = user.uid;
    window.userProfile = perfil;
    window.currentUser = perfil.displayName;   // chave de juncao dos dados

    // O cabecalho da marca existe nas duas paginas e e independente da tela.
    if (typeof window.atualizarHeaderSessao === 'function') {
        window.atualizarHeaderSessao(window.currentUser);
    }

    if (typeof window.initApp === 'function') window.initApp();
    if (window.NotificationService && typeof window.NotificationService.init === 'function') {
      window.NotificationService.init();
    }
  });
})();
