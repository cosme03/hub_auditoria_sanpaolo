// js/app.js — Entry point do setor Auditoria
// Ordem de carregamento: firebase-init.js → data.js → controllers → app.js
// Controllers: AppController, AuditoriaOnlineController, DashboardController,
//              PlanejamentoController, TarefasController, ChartCMVController

// Sem disparo proprio. Quem chama initApp() e o auth-guard.js, depois de
// confirmar a sessao e carregar o perfil. Era a ausencia de um ramo 'else'
// aqui que deixava esta pagina abrir sem login.
