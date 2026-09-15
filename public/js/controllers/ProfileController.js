// js/controllers/ProfileController.js
// Responsável pelo perfil do usuário logado (Alterar Senha e Informações)

window.abrirModalPerfil = async function () {
    const el = document.getElementById('modalPerfil');
    if (!el) return;
    el.style.display = 'flex';

    document.getElementById('perfilUserName').textContent = window.currentUser || '...';

    // Carregar setores do usuário
    try {
        const sectors = (window.userProfile && window.userProfile.setores_permitidos) || [];
        const sectorNames = {};
        window.appConfig.sectors.forEach(s => sectorNames[s.id] = s.title);
        
        const nomes = sectors.map(s => sectorNames[s] || s);
        document.getElementById('perfilUserSetores').textContent = nomes.length > 3
            ? nomes.slice(0, 3).join(', ') + ` (+${nomes.length - 3})`
            : nomes.join(', ') || 'Nenhum setor';
    } catch (e) {
        document.getElementById('perfilUserSetores').textContent = '';
    }

    // Limpar campos
    document.getElementById('perfilSenhaAtual').value = '';
    document.getElementById('perfilNovaSenha').value = '';
    document.getElementById('perfilConfirmarSenha').value = '';
}

window.fecharModalPerfil = function () {
    const el = document.getElementById('modalPerfil');
    if (!el) return;
    el.style.display = 'none';
}

window.salvarNovaSenha = async function () {
    const senhaAtual = document.getElementById('perfilSenhaAtual').value.trim();
    const novaSenha = document.getElementById('perfilNovaSenha').value.trim();
    const confirmar = document.getElementById('perfilConfirmarSenha').value.trim();

    if (!senhaAtual) return showToast("Digite sua senha atual", "error");
    if (!novaSenha) return showToast("Digite a nova senha", "error");
    // O minimo do Firebase Auth e 6; validar aqui evita ida perdida ao servidor.
    if (novaSenha.length < 6) return showToast("A nova senha deve ter no mínimo 6 caracteres", "error");
    if (novaSenha !== confirmar) return showToast("As senhas não conferem", "error");

    // A senha vive no Firebase Auth, em hash, e nunca no Firestore.
    // updatePassword exige login recente: por isso o reauthenticate antes.
    try {
        const user = window.auth.currentUser;
        if (!user) return showToast("Sessão expirada. Entre novamente.", "error");

        const cred = firebase.auth.EmailAuthProvider.credential(user.email, senhaAtual);
        await user.reauthenticateWithCredential(cred);
        await user.updatePassword(novaSenha);

        showToast("Senha alterada com sucesso!");
        window.fecharModalPerfil();
    } catch (e) {
        console.error(e);
        const codigo = e && e.code;
        const msg = (codigo === 'auth/wrong-password' || codigo === 'auth/invalid-credential')
            ? "Senha atual incorreta"
            : (codigo === 'auth/weak-password' ? "A nova senha é muito fraca"
            : (codigo === 'auth/too-many-requests' ? "Muitas tentativas. Aguarde alguns minutos."
            : "Erro ao alterar senha"));
        showToast(msg, "error");
    }
}
