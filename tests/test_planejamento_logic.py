# -*- coding: utf-8 -*-
"""
tests/test_planejamento_logic.py
Testes unitarios automatizados da logica de filtros de planejamento,
gestao de auditores e calculo dinamico de status por mes.
"""

def get_lista_auditores_unificada(state, target_month=None):
    s = set()
    # 1. Usuários ativos cadastrados no Firestore (state.usuarios)
    for u in state.get('usuarios', []):
        nome = (u.get('nome') or u.get('displayName') or '').strip()
        if nome and u.get('ativo') is not False and nome != 'Colaborador':
            s.add(nome)
            
    # 2. Auditores que já aparecem no planejamento
    for p in state.get('planejamento', []):
        nome = (p.get('auditor') or p.get('responsavel') or '').strip()
        if nome and nome not in ('Sem auditor', 'undefined'):
            s.add(nome)
            
    # 3. Mapeamento histórico: se target_month for passado, apenas quem tem atividade naquele mês
    if target_month:
        for m in state.get('mapeamento', []):
            if m.get('data', '').startswith(target_month):
                nome = (m.get('auditor') or m.get('autor') or '').strip()
                if nome and nome not in ('Sem auditor', 'undefined'):
                    s.add(nome)
                    
    return sorted(list(s))


def get_status_loja_planejamento(item, target_month, state, hoje='2026-09-21'):
    # 0. Se a loja está desativada na rede
    if item.get('ativa') is False:
        return 'INATIVA'
        
    active_month = target_month or hoje[:7]
    
    # 1. Se a loja possui suspensão/obra no mês ativo
    if item.get('excecoesMes', {}).get(active_month):
        return 'SUSPENSA'
    
    # 2. Concluida no mes
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
            match_status = (current_status != 'CONCLUIDA' and current_status != 'SUSPENSA' and current_status != 'INATIVA')
        elif filter_status == 'ATRASADAS':
            match_status = (current_status == 'ATRASADA')
        elif filter_status == 'PENDENTE_TOTAL':
            match_status = (current_status == 'PENDENTE')
        elif filter_status == 'SUSPENSAS':
            match_status = (current_status == 'SUSPENSA')
            
        if match_search and match_reg and match_aud and match_status:
            filtrados.append(item)
    return filtrados


def calcular_produtividade_equipe(state, target_month):
    candidatos = get_lista_auditores_unificada(state, target_month)
    eventos_mes = [m for m in state.get('mapeamento', []) if m.get('data', '').startswith(target_month)]
    
    res = {}
    for nome in candidatos:
        nome_norm = nome.strip().lower()
        lojas_auditor = [p for p in state.get('planejamento', []) if (p.get('auditor') or '').strip().lower() == nome_norm and p.get('ativa') is not False]
        # Lojas em obra/suspensas não contam como obrigação no mês
        lojas_no_escopo = [p for p in lojas_auditor if get_status_loja_planejamento(p, target_month, state) != 'SUSPENSA']
        planejadas = len(lojas_no_escopo)
        
        concluidas_plan = sum(1 for p in lojas_auditor if get_status_loja_planejamento(p, target_month, state) == 'CONCLUIDA')
        concluidas_map = sum(1 for m in eventos_mes if (m.get('auditor') or '').strip().lower() == nome_norm and m.get('realizada') in ('SIM', 'Sim'))
        realizadas = max(concluidas_plan, concluidas_map)
        
        tentativas = sum(1 for m in eventos_mes if (m.get('auditor') or '').strip().lower() == nome_norm and m.get('realizada') in ('NÃO', 'NAO'))
        
        # Se o auditor não tem lojas planejadas nem atividade no mês, NÃO polui o dashboard
        if planejadas == 0 and realizadas == 0 and tentativas == 0:
            continue
            
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
    
    # Lojas restantes no mês (descontando concluídas, suspensas e inativas)
    restantes = sum(1 for p in state.get('planejamento', []) if p.get('ativa') is not False and get_status_loja_planejamento(p, target_month, state) not in ('CONCLUIDA', 'SUSPENSA', 'INATIVA'))
    
    labels = list(auditores_list)
    data = list(counts)
    
    if restantes > 0:
        labels.append('Lojas Restantes')
        data.append(restantes)
        
    return labels, data


def run_tests():
    print("--- Executando Testes Unitarios de Planejamento, Exceções e Gestão de Lojas ---")
    
    state = {
        'usuarios': [
            {'id': 'u1', 'displayName': 'Matheus Cosme', 'ativo': True},
            {'id': 'u2', 'displayName': 'Ana Raquel', 'ativo': True},
            {'id': 'u3', 'displayName': 'Bruna Costa', 'ativo': True},
            {'id': 'u4', 'displayName': 'Usuario Desativado', 'ativo': False}
        ],
        'planejamento': [
            {'id': 'p1', 'lojaNome': 'Loja 1', 'auditor': 'Bruna Costa', 'proximaPrevista': '2026-09-25', 'ativa': True},
            {'id': 'p2', 'lojaNome': 'Loja 2', 'auditor': '', 'proximaPrevista': '', 'ativa': True},
            {'id': 'p3', 'lojaNome': 'Loja 3', 'auditor': 'Matheus Cosme', 'proximaPrevista': '2026-09-10', 'ativa': True},
            {'id': 'p4', 'lojaNome': 'Loja 4', 'auditor': 'Matheus Cosme', 'proximaPrevista': '2026-09-15', 'ativa': True},
            {'id': 'p5', 'lojaNome': 'Loja 5', 'auditor': 'Matheus Cosme', 'proximaPrevista': '2026-09-20', 'ativa': True, 'excecoesMes': {'2026-09': 'Loja em Reforma Geral'}},
            {'id': 'p6', 'lojaNome': 'Loja 6', 'auditor': 'Matheus Cosme', 'proximaPrevista': '2026-09-28', 'ativa': True},
            {'id': 'p7', 'lojaNome': 'Loja Fechada', 'auditor': 'Bruna Costa', 'proximaPrevista': '', 'ativa': False}
        ],
        'mapeamento': [
            {'id': 'm1', 'lojaNome': 'Loja 3', 'auditor': 'Matheus Cosme', 'realizada': 'SIM', 'data': '2026-09-10'},
            {'id': 'm0', 'lojaNome': 'Loja Antiga', 'auditor': 'Fernanda Teles', 'realizada': 'SIM', 'data': '2025-01-15'}
        ]
    }
    
    # Teste 1: Lista dinâmica sem mock fixo
    auditores = get_lista_auditores_unificada(state)
    assert 'Bruna Costa' in auditores
    assert 'Matheus Cosme' in auditores
    assert 'Ana Raquel' in auditores
    assert 'Usuario Desativado' not in auditores
    assert 'Fernanda Teles' not in auditores
    print("OK - Teste 1 Passou: Lista unificada é 100% dinâmica do banco e exclui usuários inativos/desativados.")
    
    # Teste 2: Filtro por Bruna Costa (exclui loja inativa de contagens ativas)
    res_bruna = filtrar_planejamento(state, auditor='Bruna Costa')
    assert len(res_bruna) == 2, f"Esperado 2 lojas para Bruna, deu {len(res_bruna)}"
    print("OK - Teste 2 Passou: Filtro de Bruna Costa retorna as lojas atribuídas.")
    
    # Teste 3: Status de Loja Suspensa / Em Obra
    status_loja5_set = get_status_loja_planejamento(state['planejamento'][4], '2026-09', state, '2026-09-21')
    assert status_loja5_set == 'SUSPENSA', f"FALHA: Loja 5 em setembro deve ser SUSPENSA, deu {status_loja5_set}"
    
    # Em outubro, a suspensão de setembro não afeta outubro -> vira PENDENTE
    status_loja5_out = get_status_loja_planejamento(state['planejamento'][4], '2026-10', state, '2026-09-21')
    assert status_loja5_out == 'PENDENTE', f"FALHA: Loja 5 em outubro deve ser PENDENTE, deu {status_loja5_out}"
    print("OK - Teste 3 Passou: Loja 5 é SUSPENSA em setembro e volta a ser PENDENTE em outubro.")
    
    # Teste 4: Status de Loja Desativada (Inativa)
    status_loja7 = get_status_loja_planejamento(state['planejamento'][6], '2026-09', state, '2026-09-21')
    assert status_loja7 == 'INATIVA', f"FALHA: Loja 7 deve ser INATIVA, deu {status_loja7}"
    print("OK - Teste 4 Passou: Loja desativada na rede retorna status INATIVA.")
    
    # Teste 5: Filtro Restantes em Setembro (Desconta concluídas, suspensas e inativas)
    # Total ativas: Loja 1 (Pendente), Loja 2 (Pendente), Loja 3 (Concluída), Loja 4 (Atrasada), Loja 5 (Suspensa), Loja 6 (Pendente)
    # Restantes no escopo: Loja 1, Loja 2, Loja 4, Loja 6 -> 4 lojas
    restantes_set = filtrar_planejamento(state, month_val='2026-09', filter_status='RESTANTES')
    assert len(restantes_set) == 4, f"FALHA: 4 lojas devem ser restantes no mes, retornou {len(restantes_set)}"
    print("OK - Teste 5 Passou: Filtro de Restantes exclui corretamente lojas concluídas, suspensas e inativas.")
    
    # Teste 6: Filtro de Suspensas / Em Obra
    suspensas_set = filtrar_planejamento(state, month_val='2026-09', filter_status='SUSPENSAS')
    assert len(suspensas_set) == 1 and suspensas_set[0]['lojaNome'] == 'Loja 5'
    print("OK - Teste 6 Passou: Filtro de Suspensas retorna apenas a Loja 5 em reforma.")
    
    # Teste 7: Produtividade do Auditor com Loja em Obra
    # Matheus Cosme tem 4 lojas ativas: Lojas 3, 4, 5, 6.
    # Como a Loja 5 está SUSPENSA em setembro, seu escopo no mês é de 3 lojas (Lojas 3, 4, 6).
    # Realizou 1 (Loja 3) -> 1 de 3 = 33% (e a loja em obra não o penaliza como atrasada!)
    prod_set = calcular_produtividade_equipe(state, '2026-09')
    assert prod_set['Matheus Cosme']['planejadas'] == 3, f"Esperado 3 planejadas para Matheus, deu {prod_set['Matheus Cosme']['planejadas']}"
    assert prod_set['Matheus Cosme']['realizadas'] == 1
    assert prod_set['Matheus Cosme']['pct'] == 33, f"Esperado 33% para Matheus, deu {prod_set['Matheus Cosme']['pct']}%"
    print("OK - Teste 7 Passou: Produtividade de Matheus calcula 33% (1 de 3) descontando a loja em obra do escopo.")
    
    # Teste 8: Gráfico de Rosca com Lojas Restantes
    labels, data = calcular_dados_rosca_auditor(state, '2026-09')
    assert 'Matheus Cosme' in labels and 'Lojas Restantes' in labels
    assert data[labels.index('Matheus Cosme')] == 1
    assert data[labels.index('Lojas Restantes')] == 4
    print("OK - Teste 8 Passou: Grafico de rosca calcula 4 lojas restantes descontando as suspensas.")
    
    print("\nTODOS OS TESTES PASSARAM COM SUCESSO!")

if __name__ == '__main__':
    run_tests()



