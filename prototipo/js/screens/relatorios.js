/* Relatórios: catálogo de 36 relatórios, configuração de relatório e Análises (extrato de conta e painel de vendas). */
(function () {
  var R = 'referencias/', F = 'referencias/ContabilSemdados/MaisDoFinanceiro/';

  var AREAS = {
    vendas: { label: 'Vendas', icon: 'receipt', tone: '' },
    estoque: { label: 'Produtos e estoque', icon: 'box', tone: 't-neutral' },
    operacoes: { label: 'Acompanhamento de operações', icon: 'history', tone: 't-neutral' },
    financeiro: { label: 'Financeiro', icon: 'chart', tone: 't-receive' }
  };
  var REL = [
    ['vendas', 'Evolução das vendas', 'Compare as vendas de cada dia com o período anterior.'],
    ['vendas', 'Vendas por origem · ERP e PDV', 'Separe os resultados das vendas no ERP e no PDV.'],
    ['vendas', 'Vendas por horário · BRT', 'Identifique os horários com mais vendas.'],
    ['vendas', 'Produtos vendidos', 'Consulte quantidades e valores vendidos por produto.'],
    ['vendas', 'Serviços vendidos', 'Veja os serviços vendidos e a receita registrada.'],
    ['vendas', 'Curva ABC de produtos', 'Encontre os produtos com maior participação nas vendas.'],
    ['vendas', 'Vendas por categoria', 'Compare as vendas entre categorias de produtos.'],
    ['vendas', 'Vendas e estornos', 'Consulte vendas registradas e estornadas.'],
    ['vendas', 'Devoluções por item', 'Confira os itens devolvidos e seus valores.'],
    ['estoque', 'Estoque e reposição', 'Identifique estoque baixo e necessidade de reposição.'],
    ['estoque', 'Inventário atual', 'Confira os saldos atuais de cada produto.'],
    ['estoque', 'Posição e avaliação do estoque', 'Reconstrua saldos e compare métodos de avaliação do estoque.'],
    ['estoque', 'Entregas pendentes', 'Consulte produtos vendidos que aguardam entrega.'],
    ['operacoes', 'Histórico de operações', 'Acompanhe orçamentos, pedidos de compra, importações de XML, contagens e produção.'],
    ['operacoes', 'Conferência de caixas', 'Confira abertura, fechamento e diferenças dos caixas.'],
    ['operacoes', 'Entradas e saídas do caixa', 'Consulte entradas e saídas da gaveta do caixa.'],
    ['operacoes', 'Despesas avulsas', 'Consulte as despesas avulsas registradas.'],
    ['financeiro', 'DRE gerencial', 'Receitas, custos e despesas pela competência.'],
    ['financeiro', 'EBITDA / LAJIDA', 'Reconcilie a DRE, depreciação e amortização para apurar o EBITDA gerencial.'],
    ['financeiro', 'EBIT / LAJIR', 'Reconcilie a DRE com o lucro antes de juros e tributos sobre o resultado.'],
    ['financeiro', 'DFC gerencial', 'Entradas e saídas de dinheiro por atividade.'],
    ['financeiro', 'Plano de operações financeiras', 'Consulte as operações ativas, agrupadas por receita e despesa, e as classificações da DRE e DFC.'],
    ['financeiro', 'Movimentos registrados', 'Confira os movimentos registrados e o saldo das contas.'],
    ['financeiro', 'Extrato geral e conciliação', 'Reúna todas as contas, baixas do ERP e linhas do banco.'],
    ['financeiro', 'Extrato importado e conciliação', 'Consulte movimentos importados e sua conciliação.'],
    ['financeiro', 'Patrimônio e contratos', 'Consulte imóveis, veículos, empréstimos, aplicações, consórcios e contratos autorizados.'],
    ['financeiro', 'Extrato de conta', 'Saldo anterior, movimentos e saldo acumulado da conta.'],
    ['financeiro', 'Movimentação financeira', 'Detalhe ou agrupe as entradas e saídas registradas.'],
    ['financeiro', 'Fluxo previsto e realizado', 'Compare os valores realizados com os vencimentos previstos.'],
    ['financeiro', 'Valores por operação financeira', 'Compare os valores por operação financeira.'],
    ['financeiro', 'Valores por centro de custo', 'Analise receitas e despesas por centro de custo.'],
    ['financeiro', 'Contas a receber', 'Confira parcelas a receber, vencimentos e baixas.'],
    ['financeiro', 'Contas a pagar', 'Confira parcelas a pagar, vencimentos e baixas.'],
    ['financeiro', 'Pagamentos por fornecedor', 'Saiba quanto foi pago a cada fornecedor.'],
    ['financeiro', 'Vendas por operação financeira', 'Veja as vendas pelo rateio financeiro dos produtos.'],
    ['financeiro', 'Valores por atraso', 'Identifique valores abertos por faixa de atraso.']
  ];

  function reportModal(i) {
    var r = REL[i] || REL[5];
    return UI.modal({
      title: r[1], size: 'lg',
      body: '<div class="report-config">' +
        '<div class="form-grid">' +
          UI.field({ label: 'Empresa', type: 'select', options: ['João Pertile'] }) +
          UI.field({ label: 'De', type: 'date', value: '2026-11-01', span: 6 }) + UI.field({ label: 'Até', type: 'date', value: '2026-11-20', span: 6 }) +
          '<div style="grid-column: span 12">' + UI.formSection({ title: 'Colunas do relatório', collapsible: true, fields: [UI.field({ type: 'checkbox', label: 'Todas as colunas', checked: true })] }) + '</div>' +
          UI.field({ type: 'checkbox', label: 'Salvar como meu modelo' }) + UI.field({ type: 'checkbox', label: 'Guardar esta fotografia no histórico' }) +
          UI.field({ label: 'Arquivo', type: 'select', options: ['PDF', 'Planilha (XLSX)', 'CSV'], span: 6 }) + UI.field({ label: 'Página do PDF', type: 'select', options: ['Horizontal', 'Vertical'], span: 6 }) +
        '</div>' +
        '<aside class="report-preview"><p class="block-sub">' + icon('chart', 13) + ' SEU DOCUMENTO</p>' +
          ['Indicadores', 'Gráfico', 'Tabela detalhada', 'Critérios e filtros'].map(function (s, k) {
            return '<div class="section-toggle"><label class="check"><input type="checkbox" checked/><span>' + s + '</span></label><span class="spacer"></span>' +
              UI.btn({ label: '↑', size: 'sm', aria: 'Mover para cima', disabled: k === 0 }) + UI.btn({ label: '↓', size: 'sm', aria: 'Mover para baixo', disabled: k === 3 }) + '</div>';
          }).join('') +
          '<div class="report-doc"><p class="block-sub">João Pertile</p><p class="form-section-title">' + esc(r[1]) + '</p><p class="block-sub num">01/11/2026 — 20/11/2026</p>' +
            '<div class="grid-2" style="margin-top:8px">' + [['Receita líquida', brl(0)], ['Custo histórico', brl(0)], ['Margem bruta', brl(0)], ['Margem sobre a receita', '—']].map(function (k) {
              return '<div class="mini-kpi"><small>' + k[0] + '</small><strong class="num">' + k[1] + '</strong></div>';
            }).join('') + '</div></div>' +
        '</aside></div>',
      footLeft: '<span class="block-sub num">0 registros · prévia pronta</span>',
      right: UI.btn({ label: 'Abrir análise', href: '#/relatorios/analises' }) + UI.btn({ label: 'Baixar relatório', icon: 'download', variant: 'primary' })
    });
  }

  screen('#/relatorios', {
    title: 'Relatórios',
    render: function (q) {
      var area = q.area || 'todas';
      var list = REL.map(function (r, i) { return { r: r, i: i }; }).filter(function (x) { return area === 'todas' || x.r[0] === area; });
      var html = UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Relatórios' }], title: 'Relatórios', sub: 'Biblioteca com ' + REL.length + ' relatórios prontos para baixar ou analisar.', actions: [
          UI.btn({ label: 'Análises', icon: 'chart', href: '#/relatorios/analises' }), UI.btn({ label: 'Histórico', icon: 'history' }),
          UI.btn({ label: 'Criar relatório', icon: 'plus', variant: 'primary' })
        ] }) +
        '<div class="card filter-bar"><div class="filter-row"><div class="filter-search">' + UI.field({ type: 'search', placeholder: 'Buscar DRE, extrato, fornecedor…' }) + '</div>' +
          '<div class="tabs is-pills">' + [['todas', 'Todas as áreas']].concat(Object.keys(AREAS).map(function (k) { return [k, AREAS[k].label]; })).map(function (a) {
            return '<a class="tab' + (a[0] === area ? ' is-active' : '') + '" href="#/relatorios' + (a[0] === 'todas' ? '' : '?area=' + a[0]) + '">' + a[1] + '</a>';
          }).join('') + '</div></div></div>' +
        '<p class="block-sub num">' + list.length + ' relatórios</p>' +
        '<div class="report-grid">' + list.map(function (x) {
          var a = AREAS[x.r[0]];
          return '<a class="card report-card" href="' + UI.href({ modal: 'relatorio', id: x.i }) + '">' +
            '<div class="row"><span class="sc-icon ' + a.tone + '">' + icon(a.icon, 14) + '</span><span class="block-sub">' + a.label + '</span><span class="spacer"></span>' + icon('arrowRight', 14, 'muted') + '</div>' +
            '<strong>' + esc(x.r[1]) + '</strong><span class="block-sub">' + esc(x.r[2]) + '</span></a>';
        }).join('') + '</div>');
      if (q.modal === 'relatorio') html += reportModal(+q.id);
      return html;
    }
  });
  print(F + 'Avante_BibliotecaDeRelatorios.png', '#/relatorios', 'Relatórios');
  print(F + 'Avante_BibliotecaDerelatorios02.png', '#/relatorios?area=financeiro', 'Relatórios · financeiros');
  print(F + 'Avante_BibliotecaDeRelarios_OqApareceQuandoClicoEmCadaUmDosBlocosAli.png', '#/relatorios?modal=relatorio&id=5', 'Configurar relatório');

  /* ---------- Análises ---------- */
  function extrato() {
    var labels = ChartDays(2026, 11, 20, 30);
    return '<div class="card filter-bar"><div class="filter-row">' +
        UI.filter('O que analisar', ['Extrato de conta', 'DRE gerencial', 'Fluxo previsto e realizado']) +
        UI.filter('Período', ['Personalizado', 'Últimos 30 dias', 'Este mês']) + UI.filter('Conta', ['test']) +
        '<label class="filter-field"><span>De</span><input class="input" type="date" value="2026-10-22"/></label>' +
        '<label class="filter-field"><span>Até</span><input class="input" type="date" value="2026-11-20"/></label></div>' +
        '<p class="filter-note">Escolha a conta para consultar saldo anterior, movimentos e saldo acumulado.</p></div>' +
      '<div class="row"><div><p class="form-section-title">Extrato de conta</p><p class="block-sub num">22/10/2026 a 20/11/2026 · Conta: test · João Pertile</p></div><span class="spacer"></span>' +
        '<span class="block-sub num">Atualizado em 20/11/2026, 12:22:05 BRT · BRL</span>' + UI.btn({ label: 'Colunas', icon: 'sliders' }) + UI.btn({ label: 'Preparar arquivo', icon: 'download', variant: 'primary' }) + '</div>' +
      UI.kpis([
        { label: 'Saldo anterior', value: brl(0) }, { label: 'Entradas no período', value: brl(1000), raw: 1000, tone: 'success' },
        { label: 'Saídas no período', value: brl(0), tone: 'error' }, { label: 'Saldo ao final', value: brl(1100), raw: 1100, tone: 'highlight' }
      ]) +
      '<div class="info">' + icon('alert', 15) + 'O saldo inicial informado aparece dentro deste período como ajuste identificado, sem compor entradas ou saídas.</div>' +
      UI.card({ title: 'Saldo registrado ao final de cada dia', body: LineChart({ labels: labels, aria: 'Saldo registrado por dia', series: [{ name: 'Saldo registrado', cls: 'c-base-line', values: labels.map(function (l) { return l === '20/11' ? 1100 : 0; }) }] }) +
        '<p class="block-sub num" style="margin-top:6px">20/11/2026 · Saldo registrado: ' + brl(1100) + '</p><p class="help">Dias sem movimento mantêm o último saldo registrado. Inclui ajustes iniciais e transferências; não é saldo conciliado com o banco.</p>' }) +
      UI.section('Detalhamento', UI.dataTable({ columns: [
        { label: 'Data', key: 'd', num: true }, { label: 'Documento', key: 'doc' }, { label: 'Histórico', key: 'h' }, { label: 'Categoria', key: 'c' }, { label: 'Centro de custo', key: 'cc' },
        { label: 'Entradas', align: 'right', num: true, render: function (r) { return brl(r.e); } }, { label: 'Saídas', align: 'right', num: true, render: function () { return brl(0); } },
        { label: 'Saldo registrado', align: 'right', num: true, render: function (r) { return '<strong>' + brl(r.s) + '</strong>'; } },
        { label: 'Conciliação', render: function () { return '—'; } }, { label: 'Linha do banco', render: function () { return '—'; } }
      ], rows: [
        { d: '20/11/2026', doc: '', h: 'Saldo inicial informado', c: 'Saldo inicial', cc: 'Sem centro', e: 0, s: 100 },
        { d: '20/11/2026', doc: 'Movimento #31', h: 'Recebimento · teste', c: 'Teste · Receita', cc: 'Sem centro', e: 1000, s: 1100 }
      ] }), { sub: '2 linhas · 50 por página' }) +
      '<details class="card disclosure"><summary class="card-head"><span class="card-title">Como calculamos</span>' + icon('chevDown', 15, 'chev') + '</summary><div class="card-body"><p class="block-sub">Saldo anterior + entradas − saídas no período, considerando ajustes de saldo informados.</p></div></details>';
  }

  function salesPanel() {
    var labels = ChartDays(2026, 11, 20, 30);
    var zero = labels.map(function () { return 0; });
    return '<p class="block-sub">Gráficos que estavam no painel antigo da loja. Período: últimos 30 dias.</p>' +
      '<div class="split">' +
        UI.card({ title: 'Vendas ao longo do tempo', actions: [UI.tabs([{ id: 'r', label: 'Receita', href: '#/relatorios/analises?tab=vendas' }, { id: 'v', label: 'Vendas', href: '#/relatorios/analises?tab=vendas' }, { id: 't', label: 'Ticket médio', href: '#/relatorios/analises?tab=vendas' }], 'r', { pills: true }), UI.btn({ label: 'Abrir relatório', icon: 'arrowRight', size: 'sm', href: '#/relatorios?modal=relatorio&id=0' })],
          body: LineChart({ labels: labels, aria: 'Receita por dia', series: [{ name: 'Receita (BRL)', cls: 'c-primary', values: zero }, { name: 'Período anterior', cls: 'c-base-line', values: zero }] }) }) +
        UI.card({ title: 'Produtos mais vendidos', actions: [UI.tabs([{ id: 'q', label: 'Quantidade', href: '#/relatorios/analises?tab=vendas' }, { id: 'r', label: 'Receita', href: '#/relatorios/analises?tab=vendas' }], 'q', { pills: true })], body: '<p class="empty-text">Sem vendas neste período.</p>' }) +
      '</div>' +
      '<div class="grid-2">' +
        UI.card({ title: 'Origem das vendas', body: ChartEmpty() }) +
        UI.card({ title: 'Contas bancárias', actions: [UI.btn({ label: 'Ver contas bancárias', size: 'sm', href: '#/financeiro/contas-bancarias' })], body: '<p class="empty-text">Nenhuma conta bancária ativa.</p>' }) +
      '</div>' +
      UI.section('Pedidos recentes', UI.dataTable({ columns: [{ label: 'Pedido' }, { label: 'Cliente' }, { label: 'Situação' }, { label: 'Total', align: 'right' }], rows: [], empty: { icon: 'receipt', title: 'Nenhum pedido no período.', compact: true } }), { actions: [UI.btn({ label: 'Ver pedidos', size: 'sm', href: '#/vendas' })] }) +
      '<div class="grid-2">' +
        UI.card({ title: 'Categorias mais vendidas', actions: [UI.btn({ label: 'Analisar vendas', size: 'sm', href: '#/relatorios?modal=relatorio&id=6' })], body: '<p class="empty-text">Sem vendas neste período.</p>' }) +
        UI.card({ title: 'Clientes novos e recorrentes', body: ChartEmpty() }) +
      '</div>' +
      UI.card({ title: 'Segmentos de clientes', body: '<p class="empty-text">Ainda não há clientes identificados com vendas.</p>' }) +
      '<div class="grid-2">' +
        UI.card({ title: 'Estoque baixo', actions: [UI.btn({ label: 'Ver produtos', size: 'sm', href: '#/catalogo/produtos' })], body: '<p class="block-sub num" style="margin-bottom:8px">0 em estoque baixo · 1 produto ativo · 20 unidades</p>' +
          UI.dataTable({ footer: false, columns: [{ label: 'Produto' }, { label: 'SKU' }, { label: 'Restante', align: 'right' }], rows: [], empty: { title: 'Nenhum produto abaixo do mínimo.', compact: true, icon: 'check' } }) }) +
        UI.card({ title: 'Valor histórico por cliente', actions: [UI.btn({ label: 'Ver clientes', size: 'sm', href: '#/clientes' })], body:
          UI.dataTable({ footer: false, columns: [{ label: 'Indicador', key: 'i' }, { label: 'Valor', align: 'right', num: true, key: 'v' }], rows: [
            { i: 'Clientes com compras', v: '0' }, { i: 'Clientes recorrentes', v: '0' }, { i: 'Receita acumulada', v: brl(0) }, { i: 'Maior receita por cliente', v: '—' }] }) }) +
      '</div>' +
      UI.card({ title: 'Devoluções de itens', actions: [UI.btn({ label: 'Ver vendas', size: 'sm', href: '#/vendas' })], body: UI.dl([['Devoluções', '0', true], ['Valor devolvido', brl(0), true]]) + '<p class="empty-text" style="margin-top:8px">Nenhuma devolução de itens registrada neste período.</p>' }) +
      UI.section('Caixa, operadores e despesas', '<div class="grid-2">' +
        UI.card({ title: 'Situação das vendas', body: ChartEmpty() }) +
        UI.card({ title: 'Despesas avulsas', actions: [UI.btn({ label: 'Ver despesas', size: 'sm', href: '#/financeiro/despesas-avulsas' }), UI.btn({ label: 'Registrar despesa', size: 'sm', href: '#/financeiro/despesas-avulsas?modal=novo' })],
          body: UI.dataTable({ footer: false, columns: [{ label: 'Despesa' }, { label: 'Data' }, { label: 'Valor', align: 'right' }], rows: [], empty: { title: 'Nenhuma despesa no período.', compact: true, icon: 'minusCircle' } }) }) + '</div>');
  }

  screen('#/relatorios/analises', {
    title: 'Análises',
    render: function (q) {
      var tab = q.tab || 'extrato';
      return UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Relatórios', href: '#/relatorios' }, { label: 'Análises' }], title: 'Análises', actions: [UI.btn({ label: 'Todos os relatórios', icon: 'chevRight', href: '#/relatorios' }), UI.btn({ label: 'Trocar modelo ou área', icon: 'chevDown' })] }) +
        UI.tabs([{ id: 'extrato', label: 'Extrato de conta', icon: 'bank' }, { id: 'vendas', label: 'Painel de vendas', icon: 'chart' }], tab) +
        (tab === 'vendas' ? salesPanel() : extrato()));
    }
  });
  print(F + 'avanteAnaliseGrafica.png', '#/relatorios/analises', 'Análises · extrato de conta');
  print(F + 'Avante_analiseGrafica_02.png', '#/relatorios/analises', 'Análises · detalhamento');
  ['Avante_VisaoDaLoja03.png', 'Avante_VisaoDaLoja04.png', 'Avante_VisaoDaLoja05.png', 'Avante_visaoDaLoja06.png', 'Avante_VisaoDaLoja07.png'].forEach(function (f) {
    print(R + f, '#/relatorios/analises?tab=vendas', 'Análises · painel de vendas (vindo do painel antigo)');
  });
})();
