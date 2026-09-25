# -*- coding: utf-8 -*-
"""
tests/test_planejamento_logic.py
Testes unitarios automatizados da logica de filtros de planejamento,
gestao de auditores e calculo dinamico de status por mes.
"""

def get_lista_auditores_unificada(state, equipe_base):
    s = set(equipe_base)
    for u in state.get('usuarios', []):
        nome = (u.get('nome') or u.get('displayName') or '').strip()
        if nome and u.get('ativo') is not False:
            s.add(nome)
    for p in state.get('planejamento', []):
        nome = (p.get('auditor') or p.get('responsavel') or '').strip()
        if nome and nome not in ('Sem auditor', 'undefined'):
            s.add(nome)
    for m in state.get('mapeamento', []):
        nome = (m.get('auditor') or m.get('autor') or '').strip()
        if nome and nome not in ('Sem auditor', 'undefined'):
            s.add(nome)
    return sorted(list(s))


def get_status_loja_planejamento(item, target_month, state, hoje='2026-09-21'):
    active_month = target_month or hoje[:7]
    
    # 1. Concluida no mes
    teve_auditoria = any(
        m.get('lojaNome') == item.get('lojaNome') and
        m.get('realizada') in ('SIM', 'Sim') and
        m.get('data', '').startswith(active_month)
        for m in state.get('mapeamento', [])
    ) or (item.get('ultimaData', '').startswith(active_month) and item.get('status') in ('CONCLUIDA', 'Realizada'))
    
    if teve_auditoria:
        return 'CONCLUIDA'
    
    prox = item.get('proximaPrevista', '')
    if prox and prox.startswith(active_month):
        if prox < hoje:
            return 'ATRASADA'
        return 'PENDENTE'
    
    return 'PENDENTE'


def filtrar_planejamento(state, search='', regional='', auditor='', month_val='', filter_status='TODOS', hoje='2026-09-21'):
    filtrados = []
    for item in state.get('planejamento', []):
        match_search = not search or (search.lower() in item.get('lojaNome', '').lower()) or (search.lower() in item.get('regional', '').lower())
        match_reg = not regional or item.get('regional') == regional
        
        if auditor == '__SEM_AUDITOR__':
            match_aud = not item.get('auditor') or item.get('auditor') in ('', 'Sem auditor')
        elif auditor:
            match_aud = auditor.lower() in (item.get('auditor') or '').lower()
        else:
            match_aud = True
        
        current_status = get_status_loja_planejamento(item, month_val, state, hoje)
        
        match_status = True
        if filter_status == 'REALIZADAS':
            match_status = (current_status == 'CONCLUIDA')
        elif filter_status == 'RESTANTES':
            match_status = (current_status != 'CONCLUIDA')
        elif filter_status == 'ATRASADAS':
            match_status = (current_status == 'ATRASADA')
        elif filter_status == 'PENDENTE_TOTAL':
            match_status = (current_status == 'PENDENTE')
            
        if match_search and match_reg and match_aud and match_status:
            filtrados.append(item)
    return filtrados


def calcular_produtividade_equipe(state, target_month, equipe_base):
    auditores = get_lista_auditores_unificada(state, equipe_base)
    eventos_mes = [m for m in state.get('mapeamento', []) if m.get('data', '').startswith(target_month)]
    
    res = {}
    for nome in auditores:
        nome_norm = nome.strip().lower()
        lojas_auditor = [p for p in state.get('planejamento', []) if (p.get('auditor') or '').strip().lower() == nome_norm]
        planejadas = len(lojas_auditor)
        
        concluidas_plan = sum(1 for p in lojas_auditor if get_status_loja_planejamento(p, target_month, state) == 'CONCLUIDA')
        concluidas_map = sum(1 for m in eventos_mes if (m.get('auditor') or '').strip().lower() == nome_norm and m.get('realizada') in ('SIM', 'Sim'))
        realizadas = max(concluidas_plan, concluidas_map)
        
        tentativas = sum(1 for m in eventos_mes if (m.get('auditor') or '').strip().lower() == nome_norm and m.get('realizada') in ('NÃO', 'NAO'))
        
        pct = 0
        if planejadas > 0:
            pct = min(100, round((realizadas / planejadas) * 100))
        elif realizadas > 0:
            pct = 100
            
        res[nome] = {
            'planejadas': planejadas,
            'realizadas': realizadas,
            'tentativas': tentativas,
            'pct': pct
        }
    return res


def calcular_dados_rosca_auditor(state, target_month):
    eventos_concluidos = [
        m for m in state.get('mapeamento', [])
        if m.get('data', '').startswith(target_month) and m.get('realizada') in ('SIM', 'Sim')
    ]
    
    por_auditor = {}
    for m in eventos_concluidos:
        nome = m.get('auditor') or 'Sem auditor'
        por_auditor[nome] = por_auditor.get(nome, 0) + 1
        
    auditores_list = sorted(por_auditor.keys(), key=lambda a: (-por_auditor[a], a))
    counts = [por_auditor[a] for a in auditores_list]
    
    # Lojas restantes no mês
    restantes = sum(1 for p in state.get('planejamento', []) if get_status_loja_planejamento(p, target_month, state) != 'CONCLUIDA')
    
    labels = list(auditores_list)
    data = list(counts)
    
    if restantes > 0:
        labels.append('Lojas Restantes')
        data.append(restantes)
        
    return labels, data


def run_tests():
    print("--- Executando Testes Unitarios de Planejamento e Dashboard ---")
    
    equipe_base = ['Ana Raquel', 'Bruna Costa', 'Matheus Cosme']
    
    # Teste 1: Preservacao de Bruna Costa e auditores do banco
    state = {
        'usuarios': [
            {'id': 'u1', 'displayName': 'Matheus Cosme', 'ativo': True},
            {'id': 'u2', 'displayName': 'Ana Raquel', 'ativo': True}
        ],
        'planejamento': [
            {'id': 'p1', 'lojaNome': 'Loja 1', 'auditor': 'Bruna Costa', 'proximaPrevista': '2026-09-25'},
            {'id': 'p2', 'lojaNome': 'Loja 2', 'auditor': '', 'proximaPrevista': ''},
            {'id': 'p3', 'lojaNome': 'Loja 3', 'auditor': 'Matheus Cosme', 'proximaPrevista': '2026-09-10'},
            {'id': 'p4', 'lojaNome': 'Loja 4', 'auditor': 'Matheus Cosme', 'proximaPrevista': '2026-09-15'},
            {'id': 'p5', 'lojaNome': 'Loja 5', 'auditor': 'Matheus Cosme', 'proximaPrevista': '2026-09-20'},
            {'id': 'p6', 'lojaNome': 'Loja 6', 'auditor': 'Matheus Cosme', 'proximaPrevista': '2026-09-28'}
        ],
        'mapeamento': [
            {'id': 'm1', 'lojaNome': 'Loja 3', 'auditor': 'Matheus Cosme', 'realizada': 'SIM', 'data': '2026-09-10'}
        ]
    }
    
    auditores = get_lista_auditores_unificada(state, equipe_base)
    assert 'Bruna Costa' in auditores, "FALHA: Bruna Costa deve estar na lista unificada de auditores!"
    assert 'Matheus Cosme' in auditores, "FALHA: Matheus Cosme deve estar na lista!"
    assert 'Gabriel Pimentel' not in auditores, "FALHA: Gabriel Pimentel não deve estar na lista se não estiver no banco!"
    assert 'Paulo Victor' not in auditores, "FALHA: Paulo Victor não deve estar na lista se não estiver no banco!"
    print("OK - Teste 1 Passou: Lista unificada preserva auditores do banco e não inclui Gabriel/Paulo.")
    
    # Teste 2: Filtro por Bruna Costa
    res_bruna = filtrar_planejamento(state, auditor='Bruna Costa')
    assert len(res_bruna) == 1 and res_bruna[0]['lojaNome'] == 'Loja 1', "FALHA: Filtro de Bruna Costa deve retornar Loja 1"
    print("OK - Teste 2 Passou: Filtro de Bruna Costa retorna as lojas atribuidas.")
    
    # Teste 3: Filtro por Lojas Sem Auditor
    res_sem_aud = filtrar_planejamento(state, auditor='__SEM_AUDITOR__')
    assert len(res_sem_aud) == 1 and res_sem_aud[0]['lojaNome'] == 'Loja 2', "FALHA: Filtro __SEM_AUDITOR__ deve retornar Loja 2"
    print("OK - Teste 3 Passou: Filtro de lojas sem auditor retorna lojas disponiveis para atribuicao.")
    
    # Teste 4: Status no Mes Atual (Setembro) vs Mes Futuro (Outubro)
    # Loja 4: proximaPrevista em 2026-09-15 (passado em relacao a 2026-09-21 e sem visita SIM)
    status_set = get_status_loja_planejamento(state['planejamento'][3], '2026-09', state, '2026-09-21')
    assert status_set == 'ATRASADA', f"FALHA: Loja 4 em setembro deve ser ATRASADA, deu {status_set}"
    
    # Em Outubro, como a data e de setembro (mes anterior), para Outubro ela e PENDENTE
    status_out = get_status_loja_planejamento(state['planejamento'][3], '2026-10', state, '2026-09-21')
    assert status_out == 'PENDENTE', f"FALHA: Loja 4 em outubro deve ser PENDENTE, deu {status_out}"
    print("OK - Teste 4 Passou: Status de loja atrasada em setembro vira pendente de agendamento em outubro.")
    
    # Teste 5: Filtro Restantes em Setembro
    # Loja 1 (Pendente), Loja 2 (Pendente), Loja 4 (Atrasada), Loja 5 (Atrasada), Loja 6 (Pendente) -> 5 restantes (Loja 3 é CONCLUIDA)
    restantes_set = filtrar_planejamento(state, month_val='2026-09', filter_status='RESTANTES')
    assert len(restantes_set) == 5, f"FALHA: 5 lojas devem ser restantes no mes, retornou {len(restantes_set)}"
    print("OK - Teste 5 Passou: Filtro de Restantes lista todas as lojas que faltam realizar no mes.")
    
    # Teste 6: Produtividade da Equipe calculada com base nas lojas atribuídas
    prod = calcular_produtividade_equipe(state, '2026-09', equipe_base)
    # Matheus Cosme: 4 planejadas (Lojas 3, 4, 5, 6), 1 realizada (Loja 3) -> 1/4 = 25% (e NÃO 100%)
    assert prod['Matheus Cosme']['planejadas'] == 4, f"Esperado 4 planejadas para Matheus, deu {prod['Matheus Cosme']['planejadas']}"
    assert prod['Matheus Cosme']['realizadas'] == 1, f"Esperado 1 realizada para Matheus, deu {prod['Matheus Cosme']['realizadas']}"
    assert prod['Matheus Cosme']['pct'] == 25, f"Esperado 25% para Matheus, deu {prod['Matheus Cosme']['pct']}%"
    
    # Bruna Costa: 1 planejada, 0 realizadas -> 0%
    assert prod['Bruna Costa']['planejadas'] == 1
    assert prod['Bruna Costa']['realizadas'] == 0
    assert prod['Bruna Costa']['pct'] == 0
    print("OK - Teste 6 Passou: Produtividade de Matheus Cosme calculada corretamente em 25% (1 de 4) e Bruna Costa em 0%.")
    
    # Teste 7: Gráfico de Rosca com Lojas Restantes
    labels, data = calcular_dados_rosca_auditor(state, '2026-09')
    assert 'Matheus Cosme' in labels and 'Lojas Restantes' in labels
    assert data[labels.index('Matheus Cosme')] == 1
    assert data[labels.index('Lojas Restantes')] == 5
    print("OK - Teste 7 Passou: Grafico de rosca inclui a fatia de 'Lojas Restantes' (5 lojas) ao lado de Matheus Cosme (1 loja).")
    
    print("\nTODOS OS TESTES PASSARAM COM SUCESSO!")

if __name__ == '__main__':
    run_tests()

