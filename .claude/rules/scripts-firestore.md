---
paths:
  - "tools/**/*.py"
---

# Scripts que escrevem no Firestore

Os scripts em `tools/` gravam no banco de **produção** pela API REST. Não há
ambiente de teste. Todo script novo segue o mesmo molde dos existentes —
`carregar_planejamento.py` é o mais completo.

## Obrigatório em qualquer script de escrita

1. **Dry-run por padrão.** Grava só com `--apply`. A simulação imprime o plano
   completo e é revisada pelo usuário antes.
2. **Dump antes de escrever.** Estado atual das coleções afetadas em
   `../backups-firestore/pre-<acao>_<carimbo>.json`, fora do repositório.
3. **Conferência de integridade que aborta.** Antes de gravar: nenhum
   documento de destino pode aparecer duas vezes no plano, e a soma
   (criar + atualizar + iguais) tem de bater com o total de origem. Se não
   fechar, `sys.exit(1)`.
4. **`updateMask` em todo PATCH.** Sem máscara, o PATCH apaga os campos que
   não estão no payload.
5. **Senha por `getpass`**, nunca em arquivo, argumento ou variável.
6. **Dica final com caminho absoluto.** O usuário roda de `C:\WINDOWS\system32`;
   caminho relativo na mensagem dá "No such file or directory".

## Regras de merge

- Identidade de auditoria: `(lojaNome, data, nTentativa)`.
- Um documento vivo só pode ser reivindicado por **um** registro de origem —
  senão duas escritas caem no mesmo lugar e a segunda apaga a primeira.
- Valor vazio nunca sobrescreve campo preenchido.
- `ultimaData` só avança.
- Ambiguidade que sobra (duplicata na origem) se **preserva e reporta**, não
  se resolve por conta própria.

## Reaproveite

`tools/restaurar_backup.py` tem as funções que todo script precisa:
`para_valor()` e `de_valor()` para os tipos do Firestore REST, `chave()` para
normalizar nome de loja, `listar()` com paginação e `gravar()` com máscara.

`data/mapa_lojas_backup.json` traduz o `lojaId` do backup para o nome oficial.
Gerado por `tools/gerar_mapa_lojas.py` — não edite à mão.
