// js/main.js
// Hub Central de Controle - San Paolo
// Gerencia Autenticação, Escolha de Setores e Inicialização do App

// Configuração Global de Setores (Auditoria Exclusivo)
window.appConfig = Object.assign({}, window.appConfig, {
    sectors: [
        { id: "Auditoria", title: "Auditoria", icon: "ph-fill ph-magnifying-glass", color: false, equipeCol: "auditoria_equipe" }
    ]
});

// A sessao e do Firebase Auth. Nao ha estado de login em localStorage:
// 'loggedUser', 'userSectors' e 'isSuperAdmin' eram duplicados e falsificaveis
// pelo proprio usuario. Quem popula window.currentUser/userProfile e o
// auth-guard.js, a partir do documento users/{uid}.

// showToast vive so em js/services/CoreUI.js, carregado antes deste arquivo.

// =================== AUTENTICAÇÃO ===================
window.handleAuth = async function () {
    const email = document.getElementById('userInput').value.trim();
    const pass = document.getElementById('passInput').value.trim();

    if (!email || !pass) return showToast("Preencha todos os campos", "error");

    try {
        await window.auth.signInWithEmailAndPassword(email, pass);
        // Sucesso: o auth-guard assume daqui (carrega o perfil e chama initApp).
    } catch (e) {
        console.error('[auth]', e && e.code);
        showToast("E-mail ou senha inválidos", "error");
    }
}

// atualizarHeaderSessao vive em js/services/CoreUI.js: o cabecalho existe nas
// duas paginas e este arquivo so carrega na raiz.

// Chamado pelo auth-guard quando nao ha sessao (ou apos signOut).
window.mostrarTelaLogin = function () {
    const loginContainer = document.getElementById('login-container');
    const hubContainer = document.getElementById('hub-container');
    if (loginContainer) loginContainer.style.display = '';
    if (hubContainer) hubContainer.style.display = 'none';
    const passInput = document.getElementById('passInput');
    if (passInput) passInput.value = '';
    window.atualizarHeaderSessao(null);
}

window.logout = function () {
    window.auth.signOut().then(function () {
        window.location.href = './index.html';
    });
}

// =================== HUB DE SETORES ===================
window.initApp = function () {
    const loginContainer = document.getElementById('login-container');
    const hubContainer = document.getElementById('hub-container');
    
    if (loginContainer) loginContainer.style.display = 'none';
    if (hubContainer) hubContainer.style.display = 'block';

    window.atualizarHeaderSessao(window.currentUser);

    // Sem perfil carregado, nenhum card e renderizado. O fallback silencioso
    // para ["Auditoria"] que existia aqui dava acesso a quem nao tinha perfil.
    const sectors = (window.userProfile && window.userProfile.setores_permitidos) || [];

    const urlParams = new URLSearchParams(window.location.search);
    const forceHub = urlParams.get('hub') === '1';

    if (sectors.length === 1 && !forceHub) {
        window.goToSector(sectors[0]);
        return;
    }

    // Isto e so UI. A decisao real de permissao esta no firestore.rules.
    const isSuperAdmin = !!(window.userProfile && window.userProfile.role === 'superadmin');
    const hubGrid = document.getElementById('hub-grid');
    
    if (hubGrid) {
        let gridHTML = '';
        window.appConfig.sectors.forEach(sec => {
            const isActive = sectors.includes(sec.id) || isSuperAdmin;
            if (isActive) {
                gridHTML += SectorCard({
                    id: sec.id,
                    title: sec.title,
                    icon: sec.icon,
                    active: true,
                    brandColor: sec.color,
                    onClickDir: `window.goToSector('${sec.id}')`
                });
            }
        });
        hubGrid.innerHTML = gridHTML;
    }

    const adminBtn = document.getElementById('adminPanelBtn');
    if (adminBtn) adminBtn.style.display = isSuperAdmin ? 'inline-flex' : 'none';
}

window.goToSector = function (sector) {
    window.location.href = `./setores/${sector}/index.html`;
}

// Sem auto-init. Quem chama window.initApp() e o auth-guard.js, e so depois
// de confirmar a sessao no Firebase Auth e carregar o perfil de users/{uid}.
