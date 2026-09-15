#!/usr/bin/env node
/**
 * tools/build.js
 *
 * Gera public/js/firebase-config.js a partir das variaveis de ambiente.
 * Roda no container de build da Vercel (la existe Node). Zero dependencias.
 *
 * Contrato:
 *  - Aborta o build (exit 1) com mensagem acionavel se faltar variavel.
 *  - NUNCA imprime o valor de nenhuma variavel, nem parcialmente.
 *  - Gera SCRIPT CLASSICO (window.firebaseConfig). Nao e ESM.
 *  - NAO inicializa o Firebase. Quem inicializa e public/js/firebase-init.js.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const REQUIRED = [
  ['FIREBASE_API_KEY',             'apiKey'],
  ['FIREBASE_AUTH_DOMAIN',         'authDomain'],
  ['FIREBASE_PROJECT_ID',          'projectId'],
  ['FIREBASE_STORAGE_BUCKET',      'storageBucket'],
  ['FIREBASE_MESSAGING_SENDER_ID', 'messagingSenderId'],
  ['FIREBASE_APP_ID',              'appId'],
];

const OPTIONAL = [
  ['FIREBASE_MEASUREMENT_ID', 'measurementId'],
];

const OUT_FILE = path.join(__dirname, '..', 'public', 'js', 'firebase-config.js');

function abort(titulo, linhas) {
  console.error('');
  console.error('================================================================');
  console.error(' BUILD ABORTADO - ' + titulo);
  console.error('================================================================');
  for (const l of linhas) console.error('  ' + l);
  console.error('');
  console.error(' Como corrigir:');
  console.error('   1) Vercel > hub-auditoria-sanpaolo > Settings > Environment Variables');
  console.error('   2) Cadastre marcando Production, Preview e Development');
  console.error('   3) Deployments > o deploy que falhou > (...) > Redeploy');
  console.error('      (mudar env var NAO redeploya sozinho)');
  console.error('');
  console.error(' Onde achar os valores:');
  console.error('   Firebase Console > Configuracoes do projeto > Seus apps >');
  console.error('   App da Web > Configuracao do SDK > Config');
  console.error('');
  process.exit(1);
}

// -------------------------------------------------- 1. presenca
const ausentes = [];
const vazias = [];
for (const [env] of REQUIRED) {
  const raw = process.env[env];
  if (raw === undefined || raw === null) ausentes.push(env);
  else if (String(raw).trim() === '') vazias.push(env);
}
if (ausentes.length > 0 || vazias.length > 0) {
  const linhas = [];
  if (ausentes.length > 0) {
    linhas.push('Variaveis NAO DEFINIDAS (' + ausentes.length + '):');
    for (const n of ausentes) linhas.push('   - ' + n);
  }
  if (vazias.length > 0) {
    if (linhas.length > 0) linhas.push('');
    linhas.push('Variaveis DEFINIDAS MAS VAZIAS (' + vazias.length + '):');
    for (const n of vazias) linhas.push('   - ' + n);
  }
  abort('faltam variaveis de ambiente do Firebase', linhas);
}

// -------------------------------------------------- 2. formato
const erros = [];
function exigir(env, ok, esperado) {
  if (!ok) erros.push(env + ': formato inesperado. Esperado ' + esperado + '.');
}

const apiKey     = process.env.FIREBASE_API_KEY.trim();
const authDomain = process.env.FIREBASE_AUTH_DOMAIN.trim();
const projectId  = process.env.FIREBASE_PROJECT_ID.trim();
const bucket     = process.env.FIREBASE_STORAGE_BUCKET.trim();
const senderId   = process.env.FIREBASE_MESSAGING_SENDER_ID.trim();
const appId      = process.env.FIREBASE_APP_ID.trim();

exigir('FIREBASE_API_KEY',
  /^AIza[0-9A-Za-z_-]{35}$/.test(apiKey),
  'chave Web do Firebase: comeca com "AIza" e tem 39 caracteres');

exigir('FIREBASE_AUTH_DOMAIN',
  /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(authDomain),
  'um dominio, ex. <projeto>.firebaseapp.com');

exigir('FIREBASE_PROJECT_ID',
  /^[a-z0-9][a-z0-9-]{3,61}[a-z0-9]$/.test(projectId),
  'id do projeto em minusculas, ex. san-paolo-auditoria');

exigir('FIREBASE_STORAGE_BUCKET',
  /^[a-z0-9][a-z0-9._-]{2,221}[a-z0-9]$/.test(bucket),
  'nome do bucket, ex. <projeto>.firebasestorage.app');

exigir('FIREBASE_MESSAGING_SENDER_ID',
  /^[0-9]{6,20}$/.test(senderId),
  'somente digitos');

exigir('FIREBASE_APP_ID',
  /^[0-9]+:[0-9]+:web:[0-9a-fA-F]+$/.test(appId),
  'o formato 1:<numero>:web:<hexadecimal>');

if (erros.length > 0) {
  abort('variaveis presentes, mas com formato invalido', erros);
}

// coerencia entre variaveis (aviso, nao erro)
if (!authDomain.startsWith(projectId + '.')) {
  console.warn('[aviso] FIREBASE_AUTH_DOMAIN nao comeca com FIREBASE_PROJECT_ID.');
}
if (!bucket.startsWith(projectId + '.')) {
  console.warn('[aviso] FIREBASE_STORAGE_BUCKET nao comeca com FIREBASE_PROJECT_ID.');
}
if (appId.split(':')[1] !== senderId) {
  console.warn('[aviso] o numero dentro de FIREBASE_APP_ID nao bate com ' +
               'FIREBASE_MESSAGING_SENDER_ID. Provavel mistura de projetos.');
}

// -------------------------------------------------- 3. montar
const config = {};
for (const [env, chave] of REQUIRED) {
  config[chave] = String(process.env[env]).trim();
}
for (const [env, chave] of OPTIONAL) {
  const raw = process.env[env];
  if (raw !== undefined && String(raw).trim() !== '') {
    config[chave] = String(raw).trim();
  }
}

// JSON seguro para embutir em .js. As quatro substituicoes emitem SEQUENCIAS
// de escape (barra invertida + u + codigo), por isso a barra dupla no fonte.
const json = JSON.stringify(config, null, 2)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/\u2028/g, '\\u2028')
  .replace(/\u2029/g, '\\u2029');

const conteudo = [
  '// ==================================================================',
  '// ARQUIVO GERADO AUTOMATICAMENTE - NAO EDITE, NAO COMMITE',
  '// Origem: tools/build.js (build da Vercel)',
  '// Gerado em: ' + new Date().toISOString(),
  '//',
  '// Estes valores sao PUBLICOS por natureza: o navegador de qualquer',
  '// visitante os recebe. A protecao real dos dados vem das Firestore',
  '// Security Rules + Firebase Auth, nunca de esconder esta config.',
  '// ==================================================================',
  '(function (global) {',
  '  "use strict";',
  '  var cfg = ' + json + ';',
  '  global.firebaseConfig = Object.freeze(cfg);',
  '})(typeof globalThis !== "undefined" ? globalThis : window);',
  '',
].join('\n');

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, conteudo, 'utf8');

// -------------------------------------------------- 4. relatorio
// SO nomes e contagem de caracteres. Nenhum byte de valor vai para o log.
console.log('[build] OK -> public/js/firebase-config.js (' +
            Buffer.byteLength(conteudo, 'utf8') + ' bytes)');
for (const [env, chave] of REQUIRED) {
  console.log('  ' + chave.padEnd(18) + ' <- ' + env.padEnd(30) +
              ' definida (' + config[chave].length + ' chars)');
}
for (const [env, chave] of OPTIONAL) {
  const tem = Object.prototype.hasOwnProperty.call(config, chave);
  console.log('  ' + chave.padEnd(18) + ' <- ' + env.padEnd(30) +
              (tem ? ' definida (' + config[chave].length + ' chars)'
                   : ' ausente (opcional)'));
}
