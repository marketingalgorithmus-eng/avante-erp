/* Financeiro — Dia a dia: Resumo financeiro, Contas a pagar, Contas a receber, Movimentações,
   Fluxo de caixa, Despesas avulsas. Inclui gráficos reutilizáveis (LineChart, BarList). */
(function () {
  var F = 'referencias/ContabilSemdados/MaisDoFinanceiro/';
  var D = window.DATA;

  /* ---------- Gráficos ---------- */
  function days(endY, endM, endD, n) {
    var out = [], end = new Date(endY, endM - 1, endD);
    for (var i = n - 1; i >= 0; i--) { var d = new Date(end); d.setDate(end.getDate() - i); out.push(('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2)); }
    return out;
  }
  window.ChartDays = days;

  window.LineChart = function (o) {
    var W = 640, H = 200, L = 64, B = 22, T = 10;
    var all = [].concat.apply([], o.series.map(function (s) { return s.values; }));
    var max = Math.max.apply(null, all.concat([1]));
    var n = o.labels.length;
    var x = function (i) { return L + (i * (W - L - 8)) / Math.max(1, n - 1); };
    var y = function (v) { return H - B - (v / max) * (H - B - T); };
    var ticks = [0, max / 3, (2 * max) / 3, max];
    var svg = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.aria || 'Gráfico') + '">';
    svg += '<g class="grid">' + ticks.map(function (t) { return '<line x1="' + L + '" x2="' + W + '" y1="' + y(t) + '" y2="' + y(t) + '"/>'; }).join('') + '</g>';
    svg += '<g class="axis">' + ticks.map(function (t) { return '<text x="' + (L - 6) + '" y="' + (y(t) + 3) + '" text-anchor="end">' + brl(t) + '</text>'; }).join('');
    [0, Math.floor((n - 1) / 2), n - 1].forEach(function (i) { svg += '<text x="' + x(i) + '" y="' + (H - 5) + '" text-anchor="middle">' + o.labels[i] + '</text>'; });
    svg += '</g>';
    o.series.forEach(function (s) {
      var pts = s.values.map(function (v, i) { return x(i) + ',' + y(v); }).join(' ');
      svg += '<polyline class="line ' + s.cls + '" points="' + pts + '"/>';
    });
    svg += '</svg>';
    var legend = '<div class="legend">' + o.series.map(function (s) { return '<span><i class="' + s.cls + '"></i>' + s.name + '</span>'; }).join('') + '</div>';
    return legend + svg;
  };

  window.BarList = function (rows, emptyText) {
    if (!rows.length) return '<div class="chart-empty">' + (emptyText || 'Nenhum valor neste conjunto.') + '</div>';
    var max = Math.max.apply(null, rows.map(function (r) { return r.value; }));
    return '<div class="bar-list">' + rows.map(function (r) {
      return '<div class="bar-row"><div class="total-line"><span>' + esc(r.label) + '</span><strong class="num">' + brl(r.value) + '</strong></div>' +
        '<span class="bar-track"><span class="bar-fill ' + (r.cls || 'c-in') + '" style="width:' + (100 * r.value / max) + '%"></span></span></div>';
    }).join('') + '</div>';
  };

  window.ChartEmpty = function (t) { return '<div class="chart-empty">' + (t || 'Nenhum valor neste conjunto.') + '</div>'; };

  /* ---------- Formulário de título (pagar/receber) ---------- */
  function companyChip() { return '<span class="chip company-chip">' + icon('building', 14) + '<span><small>Empresa</small>' + esc(D.empresa.nome) + '</span></span>'; }
  window.CompanyChip = companyChip;

  function titleForm(kind, v) {
    v = v || {};
    var pagar = kind === 'pagar';
    var opLink = '<a class="btn btn-link" href="' + UI.href({ modal: 'operacao' }) + '">Nova operação</a>';
    return companyChip() +
      UI.formSection({ fields: [
        UI.field({ label: 'Descrição', value: v.descricao, required: true, help: pagar ? 'Ex.: Conta de luz de novembro.' : 'Ex.: Parcela do contrato de manutenção.' }),
        '<div class="field" style="grid-column: span 12"><div class="row"><label class="label">Operação financeira</label><span class="spacer"></span>' + opLink + '</div>' +
          '<select class="input"><option>' + (v.operacao || 'Teste') + '</option><option>Água e saneamento</option></select><p class="help">Classifica o título no plano de contas.</p></div>',
        UI.field({ label: pagar ? 'Fornecedor' : 'Cliente', type: 'search', optional: true, placeholder: (pagar ? 'Buscar fornecedor' : 'Buscar cliente') + ' por nome, documento ou e-mail' }),
        UI.field({ label: 'Valor total', type: 'money', required: true, span: 6 }),
        UI.field({ label: 'Data de competência', type: 'date', value: '2026-11-20', span: 6, help: 'Mês a que o valor pertence no resultado.' }),
        UI.field({ label: 'Vencimento', type: 'date', value: '2026-11-20', span: 6 }),
        UI.field({ label: 'Centro de custo', type: 'select', options: pagar ? ['Selecione um centro'] : ['Sem centro'], required: pagar, optional: !pagar, span: 6 })
      ].concat(pagar ? [UI.field({ label: 'Forma de pagamento', type: 'select', options: [v.forma || 'Dinheiro', 'A definir', 'Pix', 'Boleto', 'Cartão de crédito', 'Transferência'] })] : [])
       .concat([UI.field({ label: 'Contrato', type: 'select', options: ['Sem vínculo'], optional: true, span: 6 })]) }) +
      UI.formSection({ title: 'Parcelar valor', collapsible: true, fields: [
        UI.field({ label: 'Número de parcelas', type: 'number', value: '1', span: 6, num: true, align: 'right' }),
        UI.field({ label: 'Intervalo entre parcelas', type: 'select', options: ['Mensal', 'Quinzenal', 'Semanal'], span: 6 })
      ] }) +
      UI.formSection({ title: 'Documento', desc: 'Opcional', collapsible: true, fields: [
        UI.field({ label: 'Número do documento', span: 6 }), UI.field({ label: 'Data de emissão', type: 'date', span: 6 })
      ] }) +
      UI.formSection({ fields: [UI.field({ type: 'checkbox', label: 'Abrir anexos depois de salvar' })] });
  }

  function operationModal(kind) {
    return UI.modal({ title: 'Cadastrar operação financeira', size: 'sm', closeHref: UI.href({ modal: 'novo' }),
      body: '<div class="form-grid">' +
        UI.field({ label: 'Operação fixa ou variável', type: 'select', options: kind === 'pagar' ? ['Fixa', 'Variável'] : ['Variável', 'Fixa'], help: 'Fixa: se repete todo mês (aluguel). Variável: muda conforme o uso.' }) +
        UI.field({ label: 'Nome da operação', value: 'Teste', required: true, help: kind === 'pagar' ? 'Para contas a pagar.' : 'Para valores a receber.' }) + '</div>',
      primary: 'Salvar' });
  }

  /* ---------- Contas a pagar / a receber ---------- */
  function titlesPage(kind, q) {
    var pagar = kind === 'pagar';
    var label = pagar ? 'Contas a pagar' : 'Contas a receber';
    var add = pagar ? 'Adicionar conta a pagar' : 'Adicionar conta a receber';
    var html = UI.page(
      UI.pageHeader({ crumbs: [{ label: 'Financeiro' }, { label: label }], title: label, actions: [
        UI.btn({ label: 'Relatório por período', icon: 'chart', href: '#/relatorios' }),
        UI.btn({ label: add, icon: 'plus', variant: 'primary', href: UI.href({ modal: 'novo' }) })
      ] }) +
      '<div class="card filter-bar"><div class="filter-row">' +
        UI.filter('Situação', ['Pendentes', 'Quitadas', 'Vencidas', 'Canceladas', 'Todas']) +
        UI.filter('Data de referência', ['Vencimento', 'Competência', 'Pagamento']) +
        UI.filter('Período', ['Todas as datas', 'Este mês', 'Próximos 30 dias', 'Personalizado']) +
        '<div class="filter-search">' + UI.field({ type: 'search', placeholder: 'Descrição ou documento' }) + '</div>' +
        UI.btn({ label: 'Filtrar', variant: 'secondary' }) + '</div>' +
        UI.formSection({ title: 'Mais filtros: categoria, centro e conta', collapsible: true, fields: [
          UI.field({ label: 'Plano de contas', type: 'select', options: ['Todas'], span: 4 }),
          UI.field({ label: 'Centro de custo', type: 'select', options: ['Todos'], span: 4 }),
          UI.field({ label: 'Conta', type: 'select', options: ['Todas'], span: 4 })
        ] }) + '</div>' +
      '<p class="block-sub">Parcelas selecionadas pela data indicada. Quitado e em aberto mostram a posição atual, somando todo o filtro.</p>' +
      UI.kpis([
        { label: 'Valor das parcelas', value: brl(0) },
        { label: 'Em aberto', value: brl(0), help: 'Principal ainda não quitado.' },
        { label: 'Principal quitado', value: brl(0) },
        { label: 'Vencido', value: brl(0), tone: 'error' }
      ]) +
      UI.card({ title: 'Principal das parcelas selecionadas', body: '<p class="block-sub">Principal quitado inclui descontos. O dinheiro efetivamente movimentado aparece na consulta por pagamento ou recebimento. Canceladas são excluídas.</p>' + ChartEmpty() }) +
      UI.dataTable({
        columns: [{ label: 'Descrição' }, { label: 'Operação' }, { label: 'Vencimento' }, { label: 'Valor das parcelas', align: 'right' }, { label: 'Em aberto', align: 'right' }, { label: 'Situação' }],
        rows: [], actions: function () { return ''; },
        empty: { icon: pagar ? 'arrowOut' : 'arrowIn', title: pagar ? 'Nenhuma conta a pagar neste filtro.' : 'Nenhuma conta a receber neste filtro.', text: 'Cadastre os compromissos para acompanhar vencimentos no Painel.', actions: [UI.btn({ label: add, icon: 'plus', variant: 'primary', size: 'sm', href: UI.href({ modal: 'novo' }) })] }
      }));
    if (q.modal === 'novo' || q.modal === 'operacao') html += UI.modal({ title: add, size: 'sheet', body: titleForm(kind, q.exemplo ? { operacao: 'Água e saneamento', forma: 'A definir' } : {}), primary: 'Salvar' });
    if (q.modal === 'operacao') html += operationModal(kind);
    return html;
  }

  screen('#/financeiro/contas-a-pagar', { title: 'Contas a pagar', render: function (q) { return titlesPage('pagar', q); } });
  print(F + 'Avante_DinheiroDaEmpresa_ContasAPagar.png', '#/financeiro/contas-a-pagar', 'Contas a pagar');
  print(F + 'Avante_DinheiroDaEmpresa_ContasAPagar_AdicionarContaAPagar.png', '#/financeiro/contas-a-pagar?modal=novo', 'Contas a pagar · adicionar');
  print(F + 'Avante_exemplodeComoEstaAMaioriaDosCamposAPreencher.png', '#/financeiro/contas-a-pagar?modal=novo&exemplo=1', 'Contas a pagar · formulário reorganizado');
  print(F + 'Avante_DinheiroDaEmpresa_ContasAPagar_CadastrodeConta.png', '#/financeiro/contas-a-pagar?modal=operacao', 'Cadastrar operação financeira (pagar)');

  screen('#/financeiro/contas-a-receber', { title: 'Contas a receber', render: function (q) { return titlesPage('receber', q); } });
  print(F + 'Avante_DinehiroDaEmpresa_ValoresAReceber.png', '#/financeiro/contas-a-receber', 'Contas a receber');
  print(F + 'Avante_DinheiroDaEmpresa_ValoresAReceber_AdicionarValorAReceber.png', '#/financeiro/contas-a-receber?modal=novo', 'Contas a receber · adicionar');
  print(F + 'Avante_DinheiroDaEmpresa_ValoresAReceber_AdicionarValor.png', '#/financeiro/contas-a-receber?modal=operacao', 'Cadastrar operação financeira (receber)');

  /* ---------- Movimentações ---------- */
  function movementForm(tipo) {
    var entrada = tipo === 'entrada';
    return companyChip() + UI.formSection({ fields: [
      UI.field({ label: 'Descrição', optional: true }),
      UI.field({ label: 'Valor', type: 'money', required: true, span: 6 }),
      UI.field({ label: 'Data do movimento', type: 'date', value: '2026-11-20', span: 6, help: 'Dia em que o dinheiro entrou ou saiu da conta.' }),
      UI.field({ label: entrada ? 'Conta de recebimento' : 'Conta de pagamento', type: 'select', options: ['test'], span: 6 }),
      UI.field({ label: 'Operação', type: 'select', options: ['Teste'], span: 6, help: 'Classificação no plano de contas.' }),
      UI.field({ label: 'Contrato', type: 'select', options: ['Sem vínculo'], optional: true })
    ] }) + UI.formSection({ title: 'Competência e identificação', desc: 'Opcional', collapsible: true, fields: [
      UI.field({ label: 'Data de competência', type: 'date', span: 6 }), UI.field({ label: 'Centro de custo', type: 'select', options: ['Sem centro'], span: 6 }),
      UI.field({ label: 'Documento', span: 6 })
    ] });
  }

  screen('#/financeiro/movimentacoes', {
    title: 'Movimentações',
    render: function (q) {
      var vazio = q.estado === 'vazio';
      var f = vazio ? { ini: 0, ent: 0, sai: 0, fim: 100 } : { ini: 0, ent: 1000, sai: 0, fim: 1100 };
      var mov = vazio ? [] : [{ titulo: 'teste', sub: 'test · Teste', valor: 1000 }];
      var html = UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Financeiro' }, { label: 'Movimentações' }], title: 'Movimentações', sub: 'O que entrou e saiu das contas da empresa.', actions: [
          UI.btn({ label: 'Registrar saída', icon: 'arrowOut', variant: 'danger-outline', href: UI.href({ modal: 'saida' }) }),
          UI.btn({ label: 'Registrar entrada', icon: 'arrowIn', variant: 'primary', href: UI.href({ modal: 'entrada' }) })
        ] }) +
        '<div class="row"><button type="button" class="chip">' + icon('sliders', 14) + 'Filtros<span class="muted">Este mês</span>' + icon('plus', 13) + '</button><span class="spacer"></span>' + UI.btn({ label: 'Relatório deste período', icon: 'chart', size: 'sm', href: '#/relatorios' }) + '</div>' +
        UI.kpis([
          { label: 'Saldo ao final', value: brl(f.fim), raw: f.fim, tone: 'highlight', icon: 'bank' },
          { label: 'Saldo inicial', value: brl(f.ini), raw: f.ini },
          { label: 'Entradas', value: brl(f.ent), raw: f.ent, tone: 'success' },
          { label: 'Saídas', value: brl(f.sai), raw: f.sai, tone: 'error' }
        ]) +
        '<div class="info is-success">' + icon('history', 15) + '<span class="num">Ajuste de saldo no período · ' + brl(100) + '</span></div>' +
        UI.section('Extrato de movimentações', mov.length
          ? '<p class="block-sub" style="margin-bottom:6px"><strong class="num">Hoje · 20/11/2026</strong></p><div class="card">' + mov.map(function (m) {
              return '<a class="ledger-row" href="' + UI.href({ modal: 'ver' }) + '"><span class="sc-icon t-receive">' + icon('bank', 15) + '</span><span class="spacer"><span class="cell-main">' + esc(m.titulo) + '</span><span class="cell-sub">' + esc(m.sub) + '</span></span>' +
                '<span class="r"><strong class="num text-success">+ ' + brl(m.valor) + '</strong><span class="cell-sub">Entrada</span></span>' + icon('chevRight', 16, 'muted') + '</a>';
            }).join('') + '<div class="table-foot"><span class="num">1 registro</span>' + UI.pager() + '</div></div>'
          : UI.card({ body: UI.emptyState({ icon: 'bank', title: 'Nenhuma movimentação neste filtro', text: 'Entradas e saídas registradas aqui ou pelo PDV aparecem no extrato.', actions: [UI.btn({ label: 'Registrar entrada', icon: 'arrowIn', variant: 'primary', size: 'sm', href: UI.href({ modal: 'entrada' }) })] }) }),
          { sub: '<span class="num">' + mov.length + ' registros</span>' }));
      if (q.modal === 'entrada') html += UI.modal({ title: 'Registrar entrada', size: 'md', body: movementForm('entrada'), primary: 'Registrar entrada' });
      if (q.modal === 'saida') html += UI.modal({ title: 'Registrar saída', size: 'md', body: movementForm('saida'), primary: 'Registrar saída' });
      if (q.modal === 'ver') html += UI.modal({
        title: 'teste', size: 'lg', footer: false,
        body: UI.kpis([
          { label: 'Valor total', value: brl(1000), raw: 1000 }, { label: 'Em aberto', value: brl(0) },
          { label: 'Data de competência', value: '20/11/2026', raw: 1 }, { label: 'Operação financeira', value: 'Teste', raw: 1 }
        ], 4) +
          '<p class="block-sub" style="margin:8px 0 12px">Centro de custo: Não informado · Emissão: 20/11/2026</p>' +
          UI.section('Parcelas', UI.dataTable({ footer: false, columns: [
            { label: 'Parcela', key: 'p', num: true }, { label: 'Vencimento', key: 'v', num: true },
            { label: 'Valor', align: 'right', num: true, render: function () { return brl(1000); } }, { label: 'Em aberto', align: 'right', num: true, render: function () { return brl(0); } }
          ], rows: [{ p: 1, v: '20/11/2026' }], actions: function () { return UI.btn({ label: 'Ver cobrança', icon: 'link', size: 'sm' }); } })) +
          UI.formSection({ title: 'Documentos do título', desc: 'Nenhum documento anexado.', fields: [UI.field({ type: 'file', button: 'Anexar PDF ou foto' })] }) +
          UI.section('Pagamentos e estornos', UI.dataTable({ columns: [
            { label: 'Conta', key: 'c' }, { label: 'Principal', align: 'right', num: true, render: function () { return brl(1000); } },
            { label: 'Desconto', align: 'right', num: true, render: function () { return brl(0); } }, { label: 'Juros', align: 'right', num: true, render: function () { return brl(0); } },
            { label: 'Multa', align: 'right', num: true, render: function () { return brl(0); } }, { label: 'Taxa da operadora / banco', align: 'right', num: true, render: function () { return brl(0); } },
            { label: 'Valor líquido', align: 'right', num: true, render: function () { return '<strong>' + brl(1000) + '</strong>'; } },
            { label: 'Situação', render: function () { return UI.badge('success', 'Registrado'); } }
          ], rows: [{ c: 'test' }] }))
      });
      return html;
    }
  });
  print(F + 'Avante_MaisDoFinaceiro_OqEntrouESaiu.png', '#/financeiro/movimentacoes?estado=vazio', 'Movimentações · sem lançamentos');
  print(F + 'Avante_MaisDoFinanCeiro_OqEntrouESaiu_ComDados.png', '#/financeiro/movimentacoes', 'Movimentações · com lançamento');
  print(F + 'Avante_MaisDoFinanceiro_Comdados.png', '#/financeiro/movimentacoes', 'Movimentações · com lançamento (menu)');
  print(F + 'Avante_MaisDoFinanceiro_OqEntrouEOqSaiu_VisualizacaoDeEbtrada.png', '#/financeiro/movimentacoes?modal=ver', 'Movimentação · detalhe da entrada');
  print(F + 'Avante_MaisDoFinanceiro_OqentrouESaiu_RegistarEntrada.png', '#/financeiro/movimentacoes?estado=vazio&modal=entrada', 'Registrar entrada');

  /* ---------- Fluxo de caixa ---------- */
  function prazoCards() {
    return '<div class="grid-2">' +
      UI.card({ title: 'Contas a receber por prazo', body: '<p class="block-sub">Participação no principal atualmente em aberto. A vencer inclui hoje.</p>' + ChartEmpty() }) +
      UI.card({ title: 'Contas a pagar por prazo', body: '<p class="block-sub">Participação no principal atualmente em aberto. A vencer inclui hoje.</p>' + ChartEmpty() }) + '</div>';
  }
  window.PrazoCards = prazoCards;
  function areaCard() {
    return UI.card({ title: 'Entradas e saídas por área', body: '<p class="block-sub">Oito maiores combinações de centro e natureza no período. Valor nominal de títulos ativos; valores sem centro permanecem identificados.</p>' + BarList([{ label: 'Não atribuído · Receita', value: 1000 }]) });
  }
  window.AreaCard = areaCard;

  screen('#/financeiro/fluxo-de-caixa', {
    title: 'Fluxo de caixa',
    render: function () {
      var labels = days(2026, 12, 19, 30);
      var ent = labels.map(function (l) { return l === '20/11' ? 1000 : 0; });
      return UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Financeiro' }, { label: 'Fluxo de caixa' }], title: 'Fluxo de caixa', sub: 'Entradas e saídas por dia.', actions: [UI.btn({ label: 'Relatório do fluxo', icon: 'chart', href: '#/relatorios' })] }) +
        '<div class="card filter-bar"><div class="filter-row">' + UI.field({ label: 'De', type: 'date', value: '2026-11-20', span: 12 }).replace('class="field"', 'class="field filter-date"') + UI.field({ label: 'Até', type: 'date', value: '2026-12-19', span: 12 }).replace('class="field"', 'class="field filter-date"') + '</div></div>' +
        UI.kpis([
          { label: 'A receber', value: brl(0), href: '#/financeiro/contas-a-receber', meta: 'Ver contas →' },
          { label: 'A pagar', value: brl(0), href: '#/financeiro/contas-a-pagar', meta: 'Ver contas →' },
          { label: 'Recebimentos vencidos', value: brl(0), href: '#/financeiro/contas-a-receber', meta: 'Ver contas →' },
          { label: 'Pagamentos vencidos', value: brl(0), href: '#/financeiro/contas-a-pagar', meta: 'Ver contas →', tone: 'error' }
        ]) +
        '<p class="block-sub">Os indicadores acima mostram a posição atual de todos os títulos. Os gráficos e o detalhamento seguem o período escolhido.</p>' +
        '<div class="split">' +
          UI.card({ title: 'Entradas e saídas realizadas', body: '<p class="block-sub">Valores diários de 20/11/2026 a 19/12/2026 · calendário BRT. Transferências internas são excluídas.</p>' +
            LineChart({ labels: labels, aria: 'Entradas e saídas realizadas por dia', series: [{ name: 'Entradas registradas', cls: 'c-in', values: ent }, { name: 'Saídas registradas', cls: 'c-out', values: labels.map(function () { return 0; }) }] }) +
            '<div class="row" style="margin-top:8px"><span class="block-sub">Data consultada · 01/12</span><span class="spacer"></span><input class="input" type="date" value="2026-12-01" style="width:160px" aria-label="Data consultada"/></div>' +
            '<div class="legend num" style="margin-top:6px"><span><i class="c-in"></i>Entradas ' + brl(0) + '</span><span><i class="c-out"></i>Saídas ' + brl(0) + '</span></div>' }) +
          UI.card({ title: 'Vencimentos ainda em aberto', body: '<p class="block-sub">Principal em aberto na posição atual. Não é saldo projetado do banco.</p>' + ChartEmpty('Nenhum valor no período.') }) +
        '</div>' +
        prazoCards() + areaCard() +
        UI.section('Detalhamento por dia', UI.dataTable({ columns: [
          { label: 'Data', key: 'd', num: true },
          { label: 'Entradas realizadas', align: 'right', num: true, render: function () { return brl(1000); } },
          { label: 'Saídas realizadas', align: 'right', num: true, render: function () { return brl(0); } },
          { label: 'A receber em aberto', align: 'right', num: true, render: function () { return '—'; } },
          { label: 'A pagar em aberto', align: 'right', num: true, render: function () { return '—'; } }
        ], rows: [{ d: '20/11/2026' }] })) +
        UI.card({ title: 'Operações por competência', body: '<p class="block-sub">Até 8 maiores categorias no período, por valor nominal de títulos ativos. Não é lucro nem caixa realizado.</p>' + BarList([{ label: 'Teste · Receita', value: 1000 }]) }) +
        UI.section('Todas as operações por competência', UI.dataTable({ columns: [
          { label: 'Operação financeira', key: 'o' }, { label: 'Tipo', render: function () { return UI.badge('success', 'Receita'); } },
          { label: 'Valor nominal', align: 'right', num: true, render: function () { return brl(1000); } }
        ], rows: [{ o: 'Teste' }] }))
      );
    }
  });
  print(F + 'Avante_EntradaESaidaPordia.png', '#/financeiro/fluxo-de-caixa', 'Fluxo de caixa');
  print(F + 'Avante_EntradaESaidaPordia02.png', '#/financeiro/fluxo-de-caixa', 'Fluxo de caixa · detalhamento');

  /* ---------- Resumo financeiro ---------- */
  screen('#/financeiro', {
    title: 'Resumo financeiro',
    render: function () {
      var labels = days(2026, 11, 20, 30);
      function agenda(kind) {
        var rec = kind === 'receber';
        return '<a class="agenda-card ' + (rec ? 'is-in' : 'is-out') + '" href="#/financeiro/contas-a-' + kind + '">' +
          '<div class="row"><span class="sc-icon ' + (rec ? 't-receive' : 't-pay') + '">' + icon(rec ? 'arrowIn' : 'arrowOut', 14) + '</span><strong>' + (rec ? 'Contas a receber' : 'Contas a pagar') + '</strong><span class="spacer"></span>' + icon('arrowRight', 14) + '</div>' +
          '<p class="welcome-value num">' + brl(0) + '</p>' +
          '<div class="total-line num"><span>Vencidos</span><span>' + brl(0) + '</span></div>' +
          '<div class="total-line num"><span>Hoje e próximos 7 dias</span><span>' + brl(0) + '</span></div></a>';
      }
      return UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Financeiro' }, { label: 'Resumo financeiro' }], title: 'Resumo financeiro', sub: 'Como está o dinheiro da empresa.', actions: [UI.btn({ label: 'Opções da tela', icon: 'sliders' }), UI.btn({ label: 'Relatório do período', icon: 'chart', href: '#/relatorios' })] }) +
        '<div class="card filter-bar"><div class="filter-row">' + UI.filter('Período dos indicadores', ['Últimos 30 dias', 'Este mês', 'Últimos 90 dias'], 'Últimos 30 dias') + '</div></div>' +
        '<div class="split">' +
          UI.card({ title: 'Agenda financeira', body: '<div class="grid-2">' + agenda('receber') + agenda('pagar') + '</div>' }) +
          UI.card({ title: 'Fluxo do período', body: '<div class="stack">' +
            '<div class="total-line num"><span>Quanto entrou</span><strong class="text-success">' + brl(1000) + '</strong></div>' +
            '<div class="total-line num"><span>Quanto saiu</span><strong>' + brl(0) + '</strong></div>' +
            '<div class="total-line is-big num"><span>Entrou menos saiu</span><span>' + brl(1000) + '</span></div></div>' }) +
        '</div>' +
        '<div class="split">' +
          UI.card({ title: 'Evolução das entradas e saídas', body: '<p class="block-sub">Movimentos e estornos no período. Transferências internas excluídas. Período: 22/10/2026 a 20/11/2026.</p>' +
            LineChart({ labels: labels, aria: 'Evolução das entradas e saídas', series: [{ name: 'Entradas', cls: 'c-in', values: labels.map(function (l) { return l === '20/11' ? 1000 : 0; }) }, { name: 'Saídas', cls: 'c-out', values: labels.map(function () { return 0; }) }] }) +
            '<div class="row" style="margin-top:8px">' + UI.btn({ label: 'Ver movimentos desta data', size: 'sm', href: '#/financeiro/movimentacoes' }) + '</div>' }) +
          UI.card({ title: 'Saldos por conta', actions: [UI.btn({ label: 'Contas bancárias', size: 'sm', variant: 'ghost', href: '#/financeiro/contas-bancarias' })], body: BarList([{ label: 'test', value: 1100 }]) }) +
        '</div>' +
        UI.kpis([{ label: 'Ticket médio', value: brl(0) }, { label: 'Vendas no período', value: '0' }, { label: 'Valor vendido', value: brl(0) }], 3) +
        UI.card({ title: 'Produtos mais vendidos', actions: [UI.tabs([{ id: 'qtd', label: 'Quantidade', href: '#/financeiro' }, { id: 'rec', label: 'Receita', href: '#/financeiro' }], 'qtd', { pills: true })], body: '<p class="form-section-title">Unidades vendidas por produto</p>' + ChartEmpty() }) +
        '<details class="card disclosure" open><summary class="card-head"><span class="card-title">Detalhar prazos e centros de custo</span>' + icon('chevDown', 15, 'chev') + '</summary><div class="card-body stack">' + prazoCards() + areaCard() + '</div></details>' +
        UI.card({ title: 'Registrar movimentações e títulos', body: '<div class="grid-2">' +
          '<div><p class="form-section-title" style="margin-bottom:8px">Já recebi ou paguei</p><div class="row">' +
            UI.btn({ label: 'Registrar entrada', icon: 'arrowIn', href: '#/financeiro/movimentacoes?modal=entrada' }) + UI.btn({ label: 'Registrar saída', icon: 'arrowOut', href: '#/financeiro/movimentacoes?modal=saida' }) +
            UI.btn({ label: 'Transferência', icon: 'bank' }) + UI.btn({ label: 'Recibos avulsos', icon: 'receipt' }) + '</div></div>' +
          '<div><p class="form-section-title" style="margin-bottom:8px">Ainda vou receber ou pagar</p><div class="row">' +
            UI.btn({ label: 'Adicionar conta a pagar', href: '#/financeiro/contas-a-pagar?modal=novo' }) + UI.btn({ label: 'Adicionar conta a receber', href: '#/financeiro/contas-a-receber?modal=novo' }) + '</div></div>' +
        '</div>' })
      );
    }
  });
  print(F + 'Avante_ComoEstaODinheiro.png', '#/financeiro', 'Resumo financeiro');
  print(F + 'Avante_ComoEstaODinheiro02.png', '#/financeiro', 'Resumo financeiro · vendas e produtos');
  print(F + 'Avante_ComoEstaODinheiro03.png', '#/financeiro', 'Resumo financeiro · prazos e atalhos');

  /* ---------- Despesas avulsas ---------- */
  screen('#/financeiro/despesas-avulsas', {
    title: 'Despesas avulsas',
    render: function (q) {
      var html = UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Financeiro' }, { label: 'Despesas avulsas' }], title: 'Despesas avulsas', sub: 'Custos avulsos já ocorridos. Compromissos futuros ficam em Contas a pagar.', actions: [
          UI.btn({ label: 'Contas a pagar', icon: 'chevRight', href: '#/financeiro/contas-a-pagar' }),
          UI.btn({ label: 'Registrar despesa avulsa', icon: 'plus', variant: 'primary', href: UI.href({ modal: 'novo' }) })
        ] }) +
        UI.dataTable({
          toolbar: UI.filter('Situação', ['Ativas', 'Anuladas', 'Todas']),
          columns: [
            { label: 'Descrição', key: 'd' }, { label: 'Categoria', key: 'c' }, { label: 'Data', key: 'dt', num: true },
            { label: 'Valor', align: 'right', num: true, render: function (r) { return brl(r.v); } },
            { label: 'Situação', render: function () { return UI.badge('success', 'Ativa'); } }
          ],
          rows: [{ d: 'teste', c: 'Operação', dt: '20/11/2026', v: 1000 }],
          actions: function () { return UI.btn({ label: 'Anular', variant: 'danger-outline', size: 'sm', href: UI.href({ modal: 'anular' }) }); },
          empty: { icon: 'minusCircle', title: 'Nenhuma despesa avulsa.', actions: [UI.btn({ label: 'Registrar despesa avulsa', icon: 'plus', variant: 'primary', size: 'sm', href: UI.href({ modal: 'novo' }) })] }
        }));
      if (q.modal === 'novo') html += UI.modal({
        title: 'Registrar despesa', size: 'md',
        body: '<div class="form-grid">' + UI.field({ label: 'Descrição', required: true }) +
          UI.field({ label: 'Categoria', type: 'select', options: ['Operação', 'Administrativo', 'Pessoal', 'Impostos'], span: 6 }) +
          UI.field({ label: 'Valor', type: 'money', required: true, span: 6 }) +
          UI.field({ label: 'Data', type: 'date', value: '2026-11-20', span: 6 }) + '</div>' +
          '<p class="help" style="margin-top:12px">Registre custos já ocorridos. Compras e custo do estoque são tratados em Compras; não os duplique aqui.</p>',
        primary: 'Salvar'
      });
      if (q.modal === 'anular') html += UI.confirm({ title: 'Anular a despesa “teste”?', text: 'O valor de <strong class="num">' + brl(1000) + '</strong> deixa de contar no resultado. A despesa fica no histórico como anulada.', action: 'Anular despesa' });
      return html;
    }
  });
  print(F + 'Avante_DespesasAvulsas.png', '#/financeiro/despesas-avulsas', 'Despesas avulsas');
  print(F + 'Avante_DespesasAvulsas_Registardespesa.png', '#/financeiro/despesas-avulsas?modal=novo', 'Registrar despesa');
})();
