---
paths:
  - "public/app.js"
  - "public/index.html"
---

# Editando o monolito

`app.js` tem ~8.700 linhas em escopo global, sem módulos, sem testes, servido
estaticamente. `index.html` tem ~760 linhas com handlers `onclick` inline.

## Armadilhas que já quebraram o sistema

**Exceção em render mata a tela inteira.** Um `.filter()` ou `.map()` que
lança aborta a função antes do `innerHTML`, e o `<tbody>` fica vazio — sem
erro visível na tela, sem nem a mensagem de "nenhum resultado". Aconteceu com
`item.lojaNome.toLowerCase()` num documento que não tinha `lojaNome`. Sempre
guarde: `(item.campo || '').toLowerCase()`.

**Função redefinida vence por ordem de carga.** Arquivos clássicos
compartilham escopo global; a última definição ganha. Antes de criar
`window.algumaCoisa`, confira com grep se já existe.

**`innerHTML` sem escape.** São 58 pontos interpolando dado do Firestore
direto em HTML. Existe `window.escapeHtml` em `js/services/CoreUI.js` — use.

**CDNs sem versão fixada.** Tailwind, Chart.js, Phosphor e Toastify carregam
de CDN sem pin. Uma major release quebra produção sem nenhum commit.

## Estado e sessão

`window.currentUser` é o `displayName` do perfil, e é a **string que liga a
pessoa aos registros** (campo `auditor`). Não é o uid, não é o e-mail.

Nunca declare `let currentUser` local: cria binding que não acompanha o
`window.currentUser` e sobrescreve a sessão já carregada.

Não existe estado de login em `localStorage`. Quem persiste sessão é o
Firebase Auth. As chaves `sp_hub_token` e `sp_hub_user` foram removidas —
eram forjáveis pelo console do navegador.

## Métricas

Produtividade conta **auditorias realizadas** (de `state.mapeamento`), não
lojas atribuídas no planejamento. Metade das lojas não tem responsável, então
contar carteira deixa trabalho real sem dono. Não existe meta cadastrada em
lugar nenhum do sistema: o percentual é participação no total do mês.
