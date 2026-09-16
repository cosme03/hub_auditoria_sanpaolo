// test_hub_auditoria.js - Testes de lógica e regras de negócio para o Hub Auditoria San Paolo 3.0

const fs = require('fs');
const path = require('path');

// Carrega o código do app.js simulando o ambiente do browser
const appJsPath = path.join(__dirname, 'app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf8');

// Cria ambiente de mock para document, window, localStorage, sessionStorage, Chart, etc.
const storageMock = {};
const globalMock = {
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  parseInt: parseInt,
  Math: Math,
  Date: Date,
  JSON: JSON,
  Object: Object,
  Array: Array,
  String: String,
  btoa: (str) => Buffer.from(str).toString('base64'),
  localStorage: {
    getItem: (k) => storageMock[k] || null,
    setItem: (k, v) => { storageMock[k] = String(v); },
    removeItem: (k) => { delete storageMock[k]; },
    clear: () => { Object.keys(storageMock).forEach(k => delete storageMock[k]); }
  },
  sessionStorage: {
    getItem: (k) => storageMock['sess_' + k] || null,
    setItem: (k, v) => { storageMock['sess_' + k] = String(v); },
    removeItem: (k) => { delete storageMock['sess_' + k]; },
    clear: () => { Object.keys(storageMock).forEach(k => { if (k.startsWith('sess_')) delete storageMock[k]; }); }
  },
  document: {
    addEventListener: () => {},
    getElementById: (id) => ({
      value: '',
      textContent: '',
      innerHTML: '',
      classList: {
        add: () => {},
        remove: () => {},
        toggle: () => {}
      },
      style: {},
      appendChild: () => {}
    }),
    querySelectorAll: () => [],
    createElement: (tag) => ({
      tagName: tag,
      className: '',
      innerHTML: '',
      style: {},
      classList: { add: () => {}, remove: () => {}, toggle: () => {} },
      setAttribute: () => {},
      getAttribute: () => '',
      appendChild: () => {},
      addEventListener: () => {},
      remove: () => {}
    }),
    documentElement: {
      getAttribute: () => 'light',
      setAttribute: () => {}
    }
  },
  window: {},
  Chart: class { static register() {} constructor() {} destroy() {} },
  ChartDataLabels: {}
};

// Executa o script dentro do contexto mockado
const vm = require('vm');
const context = vm.createContext(globalMock);
vm.runInContext(appJsCode, context);
context.state = context.window.state;

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

console.log("\n========================================================");
console.log("🧪 INICIANDO TESTES DO HUB AUDITORIA SAN PAOLO 3.0");
console.log("========================================================\n");

// ----------------------------------------------------
// 1. TESTES DE CÁLCULO DINÂMICO DE STATUS NO PLANEJAMENTO
// ----------------------------------------------------
console.log("1️⃣ Testando Cálculo Dinâmico de Status no Planejamento:");

// Caso A: Loja com auditoria SIM em Setembro/2026 -> CONCLUIDA
context.state.mapeamento = [
  {
    id: 'm1',
    lojaNome: 'SPBA - AEROPORTO LOJA',
    data: '2026-09-05',
    realizada: 'SIM',
    motivo: 'Auditoria Concluída'
  }
];

const itemA = {
  id: 'PLAN_4',
  lojaNome: 'SPBA - AEROPORTO LOJA',
  ultimaData: '2026-08-17',
  proximaPrevista: '2026-09-17',
  auditor: 'Bruna Costa'
};
const statusA = context.getStatusLojaPlanejamento(itemA, '2026-09');
assert(statusA === 'CONCLUIDA', 'Loja com visita SIM em Setembro deve retornar status CONCLUIDA');

// Caso B: Loja agendada para 17/09/2026, sem visita em Setembro, hoje sendo 11/09/2026 -> PENDENTE
context.state.mapeamento = [
  {
    id: 'm_antiga',
    lojaNome: 'SPBA - AEROPORTO LOJA',
    data: '2026-08-17',
    realizada: 'SIM',
    motivo: 'Auditoria Concluída'
  }
];
const itemB = {
  id: 'PLAN_4',
  lojaNome: 'SPBA - AEROPORTO LOJA',
  ultimaData: '2026-08-17',
  proximaPrevista: '2026-09-17',
  auditor: 'Bruna Costa'
};
const statusB = context.getStatusLojaPlanejamento(itemB, '2026-09');
assert(statusB === 'PENDENTE', 'Loja com data futura em Setembro (17/09 > hoje) e sem visita em Setembro deve retornar PENDENTE (não CONCLUIDA de agosto)');

// Caso C: Loja com data que já passou (09/09/2026 < hoje 11/09/2026) sem visita em Setembro -> ATRASADA
const itemC = {
  id: 'PLAN_1',
  lojaNome: 'SPAL - PARQUE SHOPPING MACEIO',
  ultimaData: '2026-08-17',
  proximaPrevista: '2026-09-09',
  auditor: 'Ana Raquel'
};
const statusC = context.getStatusLojaPlanejamento(itemC, '2026-09');
assert(statusC === 'ATRASADA', 'Loja com data passada em Setembro (09/09 < hoje) e sem visita deve retornar ATRASADA');

// ----------------------------------------------------
// 2. TESTES DE LOJAS CRÍTICAS NO MAPEAMENTO (REGRA ESTRITA)
// ----------------------------------------------------
console.log("\n2️⃣ Testando Regra de Lojas Críticas (Mapeamento):");

// Caso A: Lojas que tiveram tentativas NÃO mas foram CONCLUÍDAS com SIM no ciclo ('SPRN - MIDWAY', 'SPCE 2 - ICARAI DE AMONTADA', 'SPPA - UMARIZAL')
context.state.mapeamento = [
  // SPRN - MIDWAY: 1 NÃO e 1 SIM em Agosto
  { lojaNome: 'SPRN - MIDWAY', data: '2026-08-26', realizada: 'NÃO', motivo: 'ENCARREGADO NÃO ESTAVA' },
  { lojaNome: 'SPRN - MIDWAY', data: '2026-08-28', realizada: 'SIM', motivo: 'Auditoria Concluída' },
  // SPCE 2 - ICARAI DE AMONTADA: Concluída com SIM
  { lojaNome: 'SPCE 2 - ICARAI DE AMONTADA', data: '2026-08-28', realizada: 'SIM', motivo: 'Auditoria Concluída' },
  // SPPA - UMARIZAL: 1 NÃO e 1 SIM
  { lojaNome: 'SPPA - UMARIZAL', data: '2026-08-27', realizada: 'NÃO', motivo: 'LOJA NÃO ATENDEU' },
  { lojaNome: 'SPPA - UMARIZAL', data: '2026-08-28', realizada: 'SIM', motivo: 'Auditoria Concluída' },
  // LOJA_FALHA: 2 NÃO e NENHUM SIM
  { lojaNome: 'LOJA_FALHA', data: '2026-08-10', realizada: 'NÃO', motivo: 'LOJA NÃO ATENDEU' },
  { lojaNome: 'LOJA_FALHA', data: '2026-08-15', realizada: 'NÃO', motivo: 'LOJA EM OBRA' }
];

const criticasAgosto = context.getLojasCriticas('2026-08');
const criticasNomes = criticasAgosto.map(c => c.lojaNome);

assert(!criticasNomes.includes('SPRN - MIDWAY'), 'SPRN - MIDWAY concluída com SIM não deve ser crítica');
assert(!criticasNomes.includes('SPCE 2 - ICARAI DE AMONTADA'), 'SPCE 2 - ICARAI DE AMONTADA com SIM não deve ser crítica');
assert(!criticasNomes.includes('SPPA - UMARIZAL'), 'SPPA - UMARIZAL concluída com SIM não deve ser crítica');
assert(criticasNomes.includes('LOJA_FALHA'), 'LOJA_FALHA com 2 NÃO e sem SIM deve ser marcada como CRÍTICA');
assert(criticasAgosto.length === 1, 'Apenas 1 loja deve ser identificada como crítica');

// ----------------------------------------------------
// 3. TESTES DE SINCRONIZAÇÃO EM TEMPO REAL COM O FIRESTORE
// ----------------------------------------------------
console.log("\n3️⃣ Testando Estrutura de Sincronização em Tempo Real (Firestore Multi-device):");

assert(typeof context.setupRealtimeCloudSync === 'function', 'setupRealtimeCloudSync deve estar definida globalmente');

// Mock do Firestore para testar listener dispatch
let listenersAttached = [];
let snapshotCallbacks = {};
const mockFirestore = {
  collection: (name) => ({
    onSnapshot: (callback, errCallback) => {
      listenersAttached.push(name);
      snapshotCallbacks[name] = callback;
      return () => {};
    },
    doc: (id) => ({
      set: async (data) => data,
      update: async (data) => data,
      delete: async () => true
    })
  }),
  batch: () => ({
    set: () => {},
    commit: async () => {}
  })
};

globalMock.db = mockFirestore;
context.db = mockFirestore;
context.setupRealtimeCloudSync();

assert(listenersAttached.includes('auditoria_planejamento'), 'Listener de auditoria_planejamento configurado');
assert(listenersAttached.includes('auditoria_mapeamento'), 'Listener de auditoria_mapeamento configurado');
assert(listenersAttached.includes('tarefas_equipe'), 'Listener de tarefas_equipe configurado');
assert(listenersAttached.includes('users'), 'Listener de users configurado');

// ----------------------------------------------------
// 4. TESTES DE TAREFAS DA EQUIPE & KANBAN (CLICKUP STYLE)
// ----------------------------------------------------
console.log("\n4️⃣ Testando Tarefas da Equipe & Gestão Kanban:");

context.state.tarefas = [
  { id: 'T1', titulo: 'Tarefa 1', status: 'PENDENTE', responsavel: 'Matheus Cosme', subtarefas: [{ texto: 'Sub 1', concluida: true }, { texto: 'Sub 2', concluida: false }] },
  { id: 'T2', titulo: 'Tarefa 2', status: 'CONCLUIDO', responsavel: 'Ana Raquel', subtarefas: [] }
];

assert(context.state.tarefas.length === 2, 'Tarefas carregadas corretamente');
assert(context.state.tarefas[0].subtarefas.length === 2, 'Sub-tarefas da tarefa 1 carregadas');

// Teste de alteração de status
context.state.activeDemandaId = 'T1';
context.alterarStatusDemandaDetalhe('CONCLUIDO');
assert(context.state.tarefas.find(t => t.id === 'T1').status === 'CONCLUIDO', 'Status da tarefa T1 atualizado para CONCLUIDO');

// ----------------------------------------------------
// 5. TESTES DE TRANSIÇÃO DINÂMICA DE LOJAS CRÍTICAS AO SALVAR SIM
// ----------------------------------------------------
console.log("\n5️⃣ Testando Transição de Loja Crítica ao Registrar Sucesso (SIM):");

// A LOJA_FALHA era crítica (2 NÃO). Agora registra uma visita com SIM:
context.state.mapeamento.unshift({
  id: 'm_fix',
  lojaNome: 'LOJA_FALHA',
  data: '2026-08-20',
  realizada: 'SIM',
  motivo: 'Auditoria Concluída'
});

const criticasAposSim = context.getLojasCriticas('2026-08');
assert(!criticasAposSim.some(c => c.lojaNome === 'LOJA_FALHA'), 'LOJA_FALHA deve deixar de ser crítica após registrar SIM no ciclo');
assert(criticasAposSim.length === 0, 'Nenhuma loja deve ser crítica após resolução');

// ----------------------------------------------------
// 6. TESTES DE SINCRONIZAÇÃO DE SNAPSHOT FIRESTORE
// ----------------------------------------------------
console.log("\n6️⃣ Testando Recebimento de Snapshots Firestore (Multi-device):");

// Simula callback de snapshot para tarefas_equipe vindo de outro dispositivo (ex: Raquel)
const fakeDocs = [
  { id: 'T_REMOTE', data: () => ({ titulo: 'Auditoria Fortaleza Remota', status: 'EM_ANDAMENTO', demandante: 'Ana Raquel', responsavel: 'Ana Raquel', prazo: '2026-09-20' }) }
];
const fakeSnap = {
  empty: false,
  forEach: (fn) => fakeDocs.forEach(fn)
};

if (snapshotCallbacks['tarefas_equipe']) {
  snapshotCallbacks['tarefas_equipe'](fakeSnap);
}
assert(context.state.tarefas.some(t => t.id === 'T_REMOTE'), 'Snapshot do Firestore atualizou state.tarefas em tempo real');


// ----------------------------------------------------
// RESULTADOS
// ----------------------------------------------------
console.log("\n========================================================");
console.log(`📊 RESULTADO FINAL: ${passed} PASSOU | ${failed} FALHOU`);
console.log("========================================================\n");
if (failed > 0) {
  process.exit(1);
} else {
  console.log("🌟 TODOS OS TESTES PASSARAM COM 100% DE SUCESSO!");
}

