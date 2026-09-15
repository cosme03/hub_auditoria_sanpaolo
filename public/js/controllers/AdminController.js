// js/controllers/AdminController.js
// Responsável pela interface do Super Admin (Gerenciar Usuários e Permissões)

let allUsersCache = [];

window.abrirModalAdmin = async function () {
    const el = document.getElementById('modalAdminUsers');
    if (!el) return;
    el.style.display = 'flex';
    setTimeout(() => { el.classList.add('show'); }, 10);
    window.carregarUsuariosAdmin();
}

window.fecharModalAdmin = function () {
    const el = document.getElementById('modalAdminUsers');
    if (!el) return;
    el.classList.remove('show');
    setTimeout(() => { el.style.display = 'none'; }, 200);
}

window.carregarUsuariosAdmin = async function () {
    const listHtml = document.getElementById('adminUsersList');
    if (!listHtml) return;
    listHtml.innerHTML = '<p style="padding:20px; text-align:center;">Carregando usuários...</p>';

    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        allUsersCache = [];
        querySnapshot.forEach(doc => {
            allUsersCache.push({ id: doc.id, ...doc.data() });
        });

        // superadmins primeiro, depois ordem alfabetica por nome de exibicao
        allUsersCache.sort((a, b) => {
            const sa = a.role === 'superadmin', sb = b.role === 'superadmin';
            if (sa !== sb) return sa ? -1 : 1;
            return (a.displayName || '').localeCompare(b.displayName || '');
        });

        window.renderAdminUsersList();
    } catch (e) {
        console.error(e);
        listHtml.innerHTML = '<p style="padding:20px; color:var(--danger); text-align:center;">Erro ao carregar usuários do Firebase.</p>';
    }
}

window.renderAdminUsersList = function () {
    const listHtml = document.getElementById('adminUsersList');
    if (!listHtml) return;
    listHtml.innerHTML = '';

    const termo = document.getElementById('buscaUsuarioAdmin') ? document.getElementById('buscaUsuarioAdmin').value.toLowerCase().trim() : '';

    let usuariosFiltrados = allUsersCache.filter(u => (u.displayName || '').toLowerCase().includes(termo));

    if (usuariosFiltrados.length === 0) {
        listHtml.innerHTML = '<p class="text-center text-mutedText p-4">Nenhum usuário encontrado.</p>';
        return;
    }

    usuariosFiltrados.forEach(u => {
        const currentPerms = Array.isArray(u.setores_permitidos) ? u.setores_permitidos : ["Auditoria"];

        let checksHtml = window.appConfig.sectors.map(sec => {
            const isChecked = currentPerms.includes(sec.id);
            const isAdminStr = '';
            return `
                <label class="inline-flex items-center gap-2 text-sm p-2 bg-gray-50 border border-gray-200 rounded cursor-pointer hover:bg-gray-100 transition-colors">
                    <input type="checkbox" value="${sec.id}" class="chk-sector-${u.id} rounded text-brandOrange focus:ring-brandOrange" ${isChecked ? 'checked' : ''} ${isAdminStr}> 
                    <span class="text-mainText">${sec.id}</span>
                </label>
            `;
        }).join('');

        const d = document.createElement('div');
        d.className = 'border border-gray-200 p-4 mb-4 rounded-lg bg-white shadow-sm';

        const ehSuper = u.role === 'superadmin';
        const ativo = u.ativo !== false;
        const adminBadge = (ehSuper ? '<span class="bg-brandOrange text-white text-xs px-2 py-1 rounded">Super Admin</span>' : '')
            + (ativo ? '' : '<span class="bg-mutedText text-white text-xs px-2 py-1 rounded ml-2">Desativado</span>');
        // Ninguem rebaixa nem desativa a propria conta: evita ficar sem administrador.
        const isSelf = u.id === window.userUid;
        
        const superAdminToggle = !isSelf ? `
            <label class="inline-flex items-center gap-2 mb-4 p-3 bg-brandOrange/10 border border-brandOrange/20 rounded-lg cursor-pointer w-full">
                <input type="checkbox" id="superAdmin-${u.id}" class="rounded text-brandOrange focus:ring-brandOrange" ${ehSuper ? 'checked' : ''}> 
                <span class="text-sm font-bold text-brandOrange">Conceder Acesso Total (Super Admin)</span>
            </label>
        ` : '';

        // So o id vai para o onClick. O nome e resolvido dentro da funcao, a
        // partir de allUsersCache: nome com aspas ou barra invertida quebraria
        // a string JS montada dentro do atributo HTML.
        const btnEditNome = Button({ text: "Editar", icon: "<i class='ph ph-pencil-simple mr-1'></i>", variant: "outline", onClick: `window.editarNomeUsuario('${u.id}')` });
        const btnAlterarSenha = Button({ text: "Redefinir senha", icon: "<i class='ph ph-key mr-1'></i>", variant: "outline", onClick: `window.alterarSenhaUsuario('${u.id}')` });
        const btnDelete = !isSelf ? Button({ text: ativo ? "Desativar" : "Reativar", icon: "<i class='ph ph-prohibit mr-1'></i>", variant: "outline", onClick: `window.alternarAtivoUsuario('${u.id}', ${ativo ? 'false' : 'true'})` }) : '';
        const btnSave = !isSelf ? Button({ text: "Salvar Permissões", icon: "<i class='ph ph-floppy-disk mr-1'></i>", variant: "primary", onClick: `window.salvarPermissoesUsuario('${u.id}')` }) : '<p class="text-xs text-mutedText italic">Permissões de administrador raiz não podem ser alteradas.</p>';

        d.innerHTML = `
            <div class="flex justify-between items-center mb-4 gap-4 flex-wrap sm:flex-nowrap">
                <div class="flex items-center gap-2 text-lg font-bold text-mainText">
                    <i class="ph ph-user"></i> ${window.escapeHtml(u.displayName)}
                    <span class="text-xs font-normal text-mutedText">${window.escapeHtml(u.email || '')}</span>
                    ${adminBadge}
                </div>
                <div class="flex flex-wrap gap-2 relative z-10 sm:justify-end">
                    ${btnEditNome}
                    ${btnAlterarSenha}
                    ${btnDelete}
                </div>
            </div>
            ${superAdminToggle}
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                ${checksHtml}
            </div>
            <div class="mt-4 relative z-10">
                ${btnSave}
            </div>
        `;
        listHtml.appendChild(d);
    });
}

window.salvarPermissoesUsuario = async function (userId) {
    const checkboxes = document.querySelectorAll('.chk-sector-' + userId);
    let novasPermissoes = [];
    checkboxes.forEach(chk => {
        if (chk.checked) novasPermissoes.push(chk.value);
    });

    if (novasPermissoes.length === 0) return showToast("Selecione pelo menos um setor", "error");

    const isSuper = document.getElementById('superAdmin-' + userId)?.checked || false;

    try {
        await updateDoc(doc(db, "users", userId), {
            setores_permitidos: novasPermissoes,
            role: isSuper ? 'superadmin' : 'user'
        });
        showToast("Permissões atualizadas com sucesso!");
        window.carregarUsuariosAdmin();
    } catch (e) {
        console.error(e);
        showToast("Erro ao atualizar permissões", "error");
    }
}

// Desativar em vez de excluir: remover a conta do Firebase Auth exige o
// Admin SDK, que nao roda no navegador. Apagar so o documento de perfil
// deixaria uma conta do Auth orfa, ainda capaz de autenticar.
// Com ativo:false o auth-guard desloga a pessoa e as regras negam tudo.
window.alternarAtivoUsuario = async function (userId, novoAtivo) {
    const acao = novoAtivo ? 'reativar' : 'desativar';
    if (!confirm(`Deseja ${acao} este usuário?`)) return;

    try {
        await updateDoc(doc(db, "users", userId), { ativo: !!novoAtivo });
        showToast(novoAtivo ? "Usuário reativado" : "Usuário desativado");
        window.carregarUsuariosAdmin();
    } catch (e) {
        console.error(e);
        showToast("Erro ao alterar o status do usuário", "error");
    }
}

// Cria a conta no Firebase Auth E o perfil em users/{uid}.
// O truque do app secundario: createUserWithEmailAndPassword troca a sessao
// corrente pela do usuario recem-criado. Criando por uma segunda instancia do
// Firebase, a sessao do admin nesta aba nao e tocada.
window.criarUsuarioAdmin = async function () {
    const email = document.getElementById('novoUsuarioAdmin').value.trim();
    const nome = document.getElementById('novoNomeAdmin').value.trim();
    const senha = document.getElementById('novaSenhaAdmin').value;

    if (!email || !nome) return showToast("Preencha e-mail e nome de exibição", "error");
    if (senha.length < 6) return showToast("A senha inicial precisa de no mínimo 6 caracteres", "error");
    if (allUsersCache.some(u => (u.displayName || '').toLowerCase() === nome.toLowerCase())) {
        return showToast("Já existe um usuário com esse nome de exibição", "error");
    }

    let secundario = null;
    try {
        secundario = firebase.initializeApp(window.firebaseConfig, 'criarUsuario-' + Date.now());
        const cred = await secundario.auth().createUserWithEmailAndPassword(email, senha);
        const uid = cred.user.uid;
        await secundario.auth().signOut();

        // O id do documento TEM de ser o uid: as regras resolvem o perfil por
        // caminho literal users/$(request.auth.uid), nunca por consulta.
        await setDoc(doc(db, "users", uid), {
            displayName: nome,
            email: email,
            role: 'user',
            ativo: true,
            setores_permitidos: ["Auditoria"]
        });

        showToast("Usuário criado com sucesso!");
        document.getElementById('novoUsuarioAdmin').value = '';
        document.getElementById('novoNomeAdmin').value = '';
        document.getElementById('novaSenhaAdmin').value = '';
        window.carregarUsuariosAdmin();
    } catch (e) {
        console.error(e);
        const m = e && e.code === 'auth/email-already-in-use' ? "Já existe uma conta com esse e-mail"
            : (e && e.code === 'auth/invalid-email' ? "E-mail inválido" : "Erro ao criar usuário");
        showToast(m, "error");
    } finally {
        if (secundario) { try { await secundario.delete(); } catch (err) { console.error(err); } }
    }
}

// Ninguem, nem o admin, define a senha de outra pessoa: o Firebase Auth guarda
// hash e nao aceita escrita de senha pelo cliente. O caminho correto e o e-mail
// de redefinicao, que so o dono da caixa de entrada consegue usar.
window.alterarSenhaUsuario = async function (userId) {
    const alvo = allUsersCache.find(u => u.id === userId);
    if (!alvo || !alvo.email) return showToast("Usuário sem e-mail cadastrado", "error");
    if (!confirm(`Enviar e-mail de redefinição de senha para ${alvo.email}?`)) return;

    try {
        await window.auth.sendPasswordResetEmail(alvo.email);
        showToast("E-mail de redefinição enviado para " + alvo.email);
    } catch (e) {
        console.error(e);
        showToast("Erro ao enviar o e-mail de redefinição", "error");
    }
}

window.editarNomeUsuario = async function (userId) {
    const alvo = allUsersCache.find(u => u.id === userId);
    if (!alvo) return showToast("Usuário não encontrado", "error");
    const oldUserName = alvo.displayName || '';

    const newName = prompt(`Digite o novo nome para o usuário '${oldUserName}':\n\nIsso atualizará o nome deste usuário em todas as equipes, tarefas, protocolos e registros de auditoria do Hub.`, oldUserName);

    if (newName === null) return;
    if (!newName.trim() || newName.trim() === oldUserName) return;

    try {
        const qCheck = query(collection(db, "users"), where("displayName", "==", newName.trim()));
        const snapCheck = await getDocs(qCheck);
        if (!snapCheck.empty) return showToast("Este nome de usuário já está em uso por outra conta.", "error");

        showToast("Sincronizando atualização, por favor aguarde...", "warning");

        await updateDoc(doc(db, "users", userId), { displayName: newName.trim() });

        // 2. Collections de Equipes (Dinâmico via config)
        for (let sec of window.appConfig.sectors) {
            if (!sec.equipeCol) continue;
            const q = query(collection(db, sec.equipeCol), where("nome", "==", oldUserName));
            const snaps = await getDocs(q);
            snaps.forEach(async (d) => {
                await updateDoc(doc(db, sec.equipeCol, d.id), { nome: newName.trim() });
            });
        }

        // 3. Collections genéricas
        // 'atas' e 'logs' sairam: nunca existiram no banco e, com as regras
        // novas, consultar colecao sem regra devolve permission-denied.
        // auditoria_mapeamento/_planejamento/_notas entraram porque concentram
        // 586+ registros assinados por nome, que o rename ignorava em silencio.
        const genericCollections = [
            "auditoria_projetos", "protocolos_suporte", "notifications",
            "auditoria_mapeamento", "auditoria_planejamento", "auditoria_notas"
        ];

        for (let col of genericCollections) {
            const fields = ["autor", "responsavel", "membroResponsavel", "user", "auditor", "demandante"];
            for (let f of fields) {
                const q = query(collection(db, col), where(f, "==", oldUserName));
                const s = await getDocs(q);
                s.forEach(async (d) => {
                    const updateObj = {};
                    updateObj[f] = newName.trim();
                    await updateDoc(doc(db, col, d.id), updateObj);
                });
            }

            const qArray = query(collection(db, col), where("responsaveis", "array-contains", oldUserName));
            const sArray = await getDocs(qArray);
            sArray.forEach(async (d) => { 
                const data = d.data();
                if(data.responsaveis) {
                    const newArr = data.responsaveis.map(r => r === oldUserName ? newName.trim() : r);
                    await updateDoc(doc(db, col, d.id), { responsaveis: newArr });
                }
            });
        }

        if (window.currentUser === oldUserName) {
            // A sessao e do Firebase Auth. O nome exibido vem de users/{uid}.displayName;
            // isto aqui so reflete o rename na aba aberta, ate o proximo reload.
            window.currentUser = newName.trim();
        }

        showToast("Usuário atualizado com sucesso em todos os registros!");
        window.carregarUsuariosAdmin(); 

    } catch (e) {
        console.error(e);
        showToast("Erro durante a atualização em cascata", "error");
    }
}
