/* Painel (tela inicial) — blocos 1 a 4 + localização das vendas (preservada do print 08). */
window.Painel = (function () {
  var D = window.DATA;
  var PERIODOS = [
    { id: 'hoje', label: 'Hoje' },
    { id: '7', label: '7 dias' },
    { id: '30', label: '30 dias' },
    { id: '90', label: '90 dias' }
  ];
  var periodo = '30';

  function zero(v) { return !v ? ' is-zero' : ''; }

  function empty(o) {
    return '<div class="empty' + (o.center ? ' is-center' : '') + '">' +
      '<span class="empty-icon">' + icon(o.icon || 'inbox', 16) + '</span>' +
      '<p class="empty-title">' + o.title + '</p>' +
      (o.text ? '<p class="empty-text">' + o.text + '</p>' : '') +
      (o.actions ? '<div class="empty-actions">' + o.actions.map(function (a) {
        return '<a class="btn btn-link" href="' + a.route + '">' + a.label + '</a>';
      }).join('') + '</div>' : '') +
      '</div>';
  }

  /* ---------- Bloco 1: contexto + atalhos ---------- */
  function header() {
    var p = D.periodo;
    var pend = [];
    if (!D.contasBancariasAtivas) pend.push('nenhuma conta bancária ativa');
    D.orcamentosAbertos.forEach(function (o) { pend.push('o Orçamento #' + o.numero + ' em aberto'); });
    var resumo = pend.length
      ? 'Você tem <b>' + pend.length + (pend.length === 1 ? ' pendência' : ' pendências') + '</b> hoje: ' + pend.join(' e ') + '.'
      : 'Nenhuma pendência hoje. Bom trabalho!';
    return '<h1 class="sr-only">Painel</h1><section class="card hero" aria-label="Resumo do dia">' +
      '<span class="hero-avatar">' + D.usuario.inicial + '</span>' +
      '<div class="hero-text">' +
        '<p class="hero-greet">Olá, ' + esc(D.usuario.nome) + ' · ' + esc(D.empresa.nome) + ' · <span class="num">' + p.inicio + ' — ' + p.fim + ' · atualizado às ' + p.atualizadoAs + '</span></p>' +
        '<p class="hero-title">' + resumo + '</p>' +
      '</div>' +
      '<div class="head-actions">' +
        '<div class="seg" role="group" aria-label="Período">' + PERIODOS.map(function (x) {
          return '<button type="button" data-periodo="' + x.id + '" aria-pressed="' + (x.id === periodo) + '">' + x.label + '</button>';
        }).join('') + '</div>' +
        '<button type="button" class="btn btn-outline">' + icon('download', 15) + '<span class="hide-sm">Exportar resumo</span></button>' +
      '</div>' +
    '</section>';
  }

  function shortcuts() {
    var tones = { pay: 't-pay', receive: 't-receive', neutral: 't-neutral' };
    return '<section class="card" aria-labelledby="b1">' +
      '<div class="card-head">' +
        '<h2 class="card-title" id="b1">Atalhos rápidos</h2>' +
        '<div class="head-actions"><span class="block-sub hide-sm">Use <span class="kbd">Alt</span> + número</span>' +
        '<button type="button" class="btn btn-ghost btn-sm">' + icon('sliders', 14) + 'Personalizar</button></div>' +
      '</div>' +
      '<div class="shortcuts-grid">' + CREATE_ACTIONS.map(function (a) {
        var pdv = a.tone === 'pdv';
        return '<a class="sc' + (pdv ? ' is-pdv' : '') + '" href="' + a.route + '">' +
          '<span class="sc-icon ' + (tones[a.tone] || '') + '">' + icon(a.icon, 17) + '</span>' +
          '<span class="sc-text"><span class="sc-label">' + a.label + '</span>' +
          '<span class="sc-hint"><span class="kbd">Alt+' + a.key + '</span></span></span>' +
        '</a>';
      }).join('') + '</div>' +
    '</section>';
  }

  /* ---------- Bloco 2: indicadores ---------- */
  function kpis() {
    var v = D.vendas, r = D.receber, p = D.pagar, e = D.estoque;
    var alertas = e.abaixoDoMinimo.length + e.semEstoque;
    return '<section aria-labelledby="b2">' +
      '<div class="block-head"><h2 class="block-title" id="b2">Indicadores principais</h2><span class="block-sub">Últimos ' + D.periodo.dias + ' dias</span></div>' +
      '<div class="kpis">' +

        '<a class="card kpi kpi-accent" href="#/vendas">' +
          '<div class="kpi-top"><span>Vendas</span>' + icon('cart', 16) + '</div>' +
          '<p class="kpi-value num' + zero(v.receitaLiquida) + '">' + brl(v.receitaLiquida) + '</p>' +
          '<div class="kpi-meta num"><span><b>' + int(v.quantidade) + '</b> vendas</span><span>Ticket médio <b>' + brl(v.ticketMedio) + '</b></span></div>' +
        '</a>' +

        '<a class="card kpi kpi-soft-sky" href="#/financeiro/contas-a-receber">' +
          '<div class="kpi-top"><span>Contas a receber · hoje e 7 dias</span>' + icon('arrowIn', 16) + '</div>' +
          '<p class="kpi-value num' + zero(r.proximos7) + '">' + brl(r.proximos7) + '</p>' +
          '<div class="kpi-split num"><div><small>Vencidos</small><span>' + brl(r.vencidos) + '</span></div><div><small>Parcelas</small><span>' + int(r.parcelasProximas) + '</span></div></div>' +
        '</a>' +

        '<a class="card kpi kpi-soft-indigo" href="#/financeiro/contas-a-pagar">' +
          '<div class="kpi-top"><span>Contas a pagar · hoje e 7 dias</span>' + icon('arrowOut', 16) + '</div>' +
          '<p class="kpi-value num' + zero(p.proximos7) + '">' + brl(p.proximos7) + '</p>' +
          '<div class="kpi-split num"><div><small>Vencidos</small><span>' + brl(p.vencidos) + '</span></div><div><small>Parcelas</small><span>' + int(p.parcelasProximas) + '</span></div></div>' +
        '</a>' +

        '<a class="card kpi kpi-dark" href="#/catalogo/produtos">' +
          '<div class="kpi-top"><span>Alertas de estoque</span>' +
            (alertas ? '<span class="badge badge-warning">' + icon('alert', 12) + 'Atenção</span>' : icon('alert', 16)) + '</div>' +
          '<p class="kpi-value num' + zero(alertas) + '">' + int(alertas) + ' <span class="kpi-unit">itens abaixo do mínimo</span></p>' +
          '<div class="kpi-meta num"><span><b>' + int(e.itensAtivos) + '</b> item ativo</span><span><b>' + int(e.unidades) + '</b> unidades em estoque</span></div>' +
        '</a>' +

      '</div>' +
    '</section>';
  }

  /* ---------- Calendário financeiro (vencimentos e movimentos de caixa) ---------- */
  var MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  var cal = { y: 2026, m: 10, sel: null };     // mês exibido (0–11) e dia selecionado (dd/mm/aaaa)
  var HOJE = D.periodo.fim;                     // "hoje" do protótipo: data da última atualização

  function calendar() {
    var mov = {};
    D.movimentosPorDia.forEach(function (x) { mov[x.dia + '/2026'] = x; });
    var first = new Date(cal.y, cal.m, 1), total = new Date(cal.y, cal.m + 1, 0).getDate();
    var pad = function (n) { return ('0' + n).slice(-2); };
    var cells = '';
    for (var i = 0; i < first.getDay(); i++) cells += '<span class="cal-cell is-blank" aria-hidden="true"></span>';
    for (var d = 1; d <= total; d++) {
      var key = pad(d) + '/' + pad(cal.m + 1) + '/' + cal.y;
      var x = mov[key], tone = '';
      if (x) tone = x.entradas > x.saidas ? 'is-in' : (x.saidas > x.entradas ? 'is-out' : 'is-eq');
      var label = d + ' de ' + MESES[cal.m] + (x ? ': entradas ' + brl(x.entradas) + ', saídas ' + brl(x.saidas) : ': sem movimentos');
      cells += '<button type="button" class="cal-cell ' + tone + (key === HOJE ? ' is-today' : '') + (key === cal.sel ? ' is-selected' : '') + '" data-day="' + key + '" aria-label="' + label + '"' + (key === cal.sel ? ' aria-pressed="true"' : '') + '>' +
        '<span class="num">' + d + '</span>' + (x ? '<i class="cal-dot" aria-hidden="true"></i>' : '') + '</button>';
    }
    var detail = '';
    if (cal.sel) {
      var s = mov[cal.sel] || { entradas: 0, saidas: 0 };
      detail = '<div class="cal-detail"><strong class="num">' + cal.sel + (cal.sel === HOJE ? ' · hoje' : '') + '</strong>' +
        '<span class="num">Entradas <b>' + brl(s.entradas) + '</b></span><span class="num">Saídas <b>' + brl(s.saidas) + '</b></span>' +
        '<span class="spacer"></span>' + UI.btn({ label: 'Ver movimentações', size: 'sm', icon: 'arrowRight', href: '#/financeiro/movimentacoes' }) + '</div>';
    }
    return '<div class="big-head"><div class="cal-title"><span class="cal-badge">' + icon('calendar', 18) + '</span>' +
        '<div><h2 class="big-title">Calendário financeiro</h2><p class="block-sub">Vencimentos e movimentos de caixa</p></div></div>' +
        '<div class="cal-nav">' + UI.btn({ icon: 'chevRight', size: 'sm', cls: 'btn-icon cal-prev', aria: 'Mês anterior' }) +
          '<strong class="cal-month">' + MESES[cal.m] + ' de ' + cal.y + '</strong>' +
          UI.btn({ icon: 'chevRight', size: 'sm', cls: 'btn-icon cal-next', aria: 'Próximo mês' }) + '</div></div>' +
      '<div class="cal-grid" role="grid">' + ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(function (w) { return '<span class="cal-week">' + w + '</span>'; }).join('') + cells + '</div>' +
      detail +
      '<div class="cal-legend"><span><i class="cal-dot is-in"></i>Mais entradas</span><span><i class="cal-dot is-out"></i>Mais saídas</span><span><i class="cal-dot is-eq"></i>Valores iguais</span><span><i class="cal-ring"></i>Hoje</span></div>';
  }

  function bindCalendar(root) {
    var box = root.querySelector('#cal');
    if (!box) return;
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.classList.contains('cal-prev')) { cal.m--; if (cal.m < 0) { cal.m = 11; cal.y--; } cal.sel = null; }
      else if (b.classList.contains('cal-next')) { cal.m++; if (cal.m > 11) { cal.m = 0; cal.y++; } cal.sel = null; }
      else if (b.dataset.day) cal.sel = cal.sel === b.dataset.day ? null : b.dataset.day;
      else return;
      box.innerHTML = calendar();
      var again = b.dataset.day ? box.querySelector('[data-day="' + b.dataset.day + '"]') : box.querySelector(b.classList.contains('cal-prev') ? '.cal-prev' : '.cal-next');
      if (again) again.focus();
    });
  }

  /* ---------- Bloco 3 (novo): atenção agora + últimas ações, em 2 cartões grandes ---------- */
  function focus() {
    var venceHoje = D.pagar.hoje.concat(D.receber.hoje);
    var orc = D.orcamentosAbertos;
    var repor = D.estoque.abaixoDoMinimo;
    var todo = [], ok = [];
    if (!D.contasBancariasAtivas) todo.push({ tone: 'warn', icon: 'bank', title: 'Nenhuma conta bancária ativa', text: 'Cadastre uma conta para registrar recebimentos e usar a conciliação bancária.', label: 'Cadastrar conta', route: '#/financeiro/contas-bancarias?modal=nova' });
    orc.forEach(function (o) { todo.push({ tone: 'blue', icon: 'file', title: 'Orçamento #' + o.numero + ' em aberto', text: 'Salvo em ' + o.salvoEm + '. Envie ao cliente ou converta em venda.', label: 'Abrir', route: '#/vendas/orcamentos?modal=ver&id=' + o.numero }); });
    venceHoje.forEach(function () { todo.push({ tone: 'warn', icon: 'calendar', title: 'Conta vencendo hoje', text: '', label: 'Ver', route: '#/financeiro/contas-a-pagar' }); });
    repor.forEach(function () { todo.push({ tone: 'warn', icon: 'box', title: 'Produto abaixo do mínimo', text: '', label: 'Repor', route: '#/catalogo/produtos' }); });
    if (!venceHoje.length) ok.push({ icon: 'calendar', title: 'Nada vence hoje', route: '#/financeiro/contas-a-pagar' });
    if (!repor.length) ok.push({ icon: 'box', title: 'Estoque acima do mínimo', route: '#/catalogo/produtos' });

    var rows = todo.map(function (t) {
      return '<li class="focus-row"><span class="focus-icon is-' + t.tone + '">' + icon(t.icon, 18) + '</span>' +
        '<span class="focus-text"><strong>' + esc(t.title) + '</strong>' + (t.text ? '<span class="num">' + esc(t.text) + '</span>' : '') + '</span>' +
        '<a class="btn ' + (t.tone === 'warn' ? 'btn-primary' : 'btn-outline') + ' btn-sm" href="' + t.route + '">' + t.label + icon('chevRight', 13) + '</a></li>';
    }).join('');
    var oks = ok.map(function (o) { return '<a class="focus-ok" href="' + o.route + '">' + icon('check', 14) + o.title + '</a>'; }).join('');

    var acoes = D.atividade.map(function (a) {
      return '<li><a class="act-row" href="' + a.rota + '"><span class="act-icon">' + icon(a.icone, 16) + '</span>' +
        '<span class="act-text"><strong>' + esc(a.titulo) + '</strong><span class="num">' + esc(a.ref) + ' · ' + a.quando + '</span></span>' + icon('chevRight', 15, 'muted') + '</a></li>';
    }).join('');

    return '<section class="home-split" aria-label="Atenção e atividade">' +
      '<div class="card big-card">' +
        '<div class="big-head"><div><h2 class="big-title">O que precisa da sua atenção</h2><p class="block-sub">' + (todo.length ? todo.length + (todo.length === 1 ? ' item pede ação hoje' : ' itens pedem ação hoje') : 'Tudo em dia por aqui') + '</p></div>' +
          '<span class="big-count num">' + todo.length + '</span></div>' +
        (rows ? '<ul class="focus-list">' + rows + '</ul>' : UI.emptyState({ icon: 'check', title: 'Nenhuma pendência hoje.' })) +
        (oks ? '<div class="focus-oks">' + oks + '</div>' : '') +
      '</div>' +
      '<div class="card big-card">' +
        '<div class="big-head"><div><h2 class="big-title">Últimas ações</h2><p class="block-sub">O que foi feito no sistema</p></div></div>' +
        (acoes ? '<ul class="act-list">' + acoes + '</ul>' : UI.emptyState({ icon: 'history', title: 'Nenhuma ação recente.' })) +
      '</div>' +
    '</section>';
  }

  /* ---------- Bloco 4 (novo): dinheiro no período, um cartão grande ---------- */
  function money() {
    var v = D.vendas, f = D.financeiro;
    var resultado = v.receitaLiquida - D.custoItens - D.despesasAvulsas;
    return '<section class="card big-card money" aria-label="Entradas e saídas">' +
      '<div class="big-head"><div><h2 class="big-title">Entradas e saídas</h2><p class="block-sub num">Últimos ' + D.periodo.dias + ' dias · ' + D.periodo.inicio + ' — ' + D.periodo.fim + '</p></div>' +
        '<div class="legend"><span><i class="c-in"></i>Entradas</span><span><i class="c-out"></i>Saídas</span></div></div>' +
      '<div class="money-grid">' +
        '<div class="money-chart">' + chart() + '</div>' +
        '<div class="money-side">' +
          '<div class="money-stat"><span>Entradas</span><strong class="num">' + brl(f.entradas) + '</strong></div>' +
          '<div class="money-stat"><span>Saídas</span><strong class="num">' + brl(f.saidas) + '</strong></div>' +
          '<div class="money-stat is-total"><span>Saldo ao final</span><strong class="num">' + brl(f.saldoFinal) + '</strong></div>' +
          '<div class="money-stat"><span>Resultado operacional</span><strong class="num' + (resultado < 0 ? ' text-error' : '') + '">' + brl(resultado) + '</strong></div>' +
          '<div class="row">' + UI.btn({ label: 'Ver movimentações', size: 'sm', href: '#/financeiro/movimentacoes' }) + UI.btn({ label: 'Mais gráficos', size: 'sm', variant: 'ghost', icon: 'chart', href: '#/relatorios/analises?tab=vendas' }) + '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  /* ---------- Bloco 3 antigo (não usado no Painel atual) ---------- */
  function attention() {
    var venceHoje = D.pagar.hoje.concat(D.receber.hoje);
    var orc = D.orcamentosAbertos;
    var repor = D.estoque.abaixoDoMinimo;
    var total = venceHoje.length + orc.length + repor.length + (D.contasBancariasAtivas ? 0 : 1);

    var banner = D.contasBancariasAtivas ? '' :
      '<div class="banner" role="status">' + icon('alert', 16) +
        '<p><strong>Nenhuma conta bancária ativa.</strong> <span>Cadastre uma conta para registrar recebimentos e usar a conciliação bancária.</span></p>' +
        '<a class="btn btn-outline btn-sm" href="#/financeiro/contas-bancarias">Cadastrar conta</a>' +
      '</div>';

    var vencimentos = '<div class="card"><div class="card-head"><h3 class="card-title">' + icon('calendar', 15) + 'Vencimentos de hoje</h3>' +
      '<span class="count' + (venceHoje.length ? ' is-alert' : '') + ' num">' + venceHoje.length + '</span></div>' +
      '<div class="card-body">' + (venceHoje.length ? '' : empty({
        icon: 'check', title: 'Nada vence hoje.', text: 'Contas a pagar e a receber com vencimento hoje aparecem aqui.',
        actions: [{ label: 'Contas a pagar', route: '#/financeiro/contas-a-pagar' }, { label: 'Contas a receber', route: '#/financeiro/contas-a-receber' }]
      })) + '</div></div>';

    var orcamentos = '<div class="card"><div class="card-head"><h3 class="card-title">' + icon('file', 15) + 'Orçamentos em aberto</h3>' +
      '<span class="count' + (orc.length ? ' is-alert' : '') + ' num">' + orc.length + '</span></div>' +
      '<div class="card-body">' + (orc.length ? '<ul class="list">' + orc.map(function (o) {
        return '<li><span class="list-icon">' + icon('file', 14) + '</span>' +
          '<span class="list-main"><span class="list-title num">Orçamento #' + o.numero + '</span><span class="list-sub num">Salvo em ' + o.salvoEm + '</span></span>' +
          '<a class="btn btn-outline btn-sm" href="#/vendas/orcamentos">Abrir</a></li>';
      }).join('') + '</ul>' : empty({ icon: 'file', title: 'Nenhum orçamento em aberto.', actions: [{ label: 'Novo orçamento', route: '#/vendas/orcamentos' }] })) + '</div>' +
      (orc.length ? '<div class="card-foot"><a class="btn btn-link" href="#/vendas/orcamentos">Ver orçamentos ' + icon('chevRight', 14) + '</a></div>' : '') +
      '</div>';

    var reposicao = '<div class="card"><div class="card-head"><h3 class="card-title">' + icon('box', 15) + 'Reposição de estoque</h3>' +
      '<span class="count' + (repor.length ? ' is-alert' : '') + ' num">' + repor.length + '</span></div>' +
      '<div class="card-body">' + (repor.length ? '' : empty({
        icon: 'check', title: 'Nenhum item abaixo do mínimo.', text: 'Defina o estoque mínimo dos produtos para receber alertas de reposição.',
        actions: [{ label: 'Ver produtos', route: '#/catalogo/produtos' }, { label: 'Abrir inventário', route: '#/catalogo/inventario' }]
      })) + '</div></div>';

    var atividade = '<div class="card"><div class="card-head"><h3 class="card-title">' + icon('history', 15) + 'Últimas ações</h3></div>' +
      '<div class="card-body">' + (D.atividade.length ? '<ul class="list">' + D.atividade.map(function (a) {
        return '<li><span class="list-icon">' + icon(a.icone, 14) + '</span>' +
          '<a class="list-main" href="' + a.rota + '"><span class="list-title">' + esc(a.titulo) + '</span><span class="list-sub num">' + esc(a.ref) + ' · ' + a.quando + '</span></a></li>';
      }).join('') + '</ul>' : empty({ icon: 'history', title: 'Nenhuma ação recente.' })) + '</div></div>';

    return '<section aria-labelledby="b3">' +
      '<div class="block-head"><h2 class="block-title" id="b3">Pendências e atenção <span class="count' + (total ? ' is-alert' : '') + ' num">' + total + '</span></h2></div>' +
      banner +
      '<div class="attention">' + vencimentos + orcamentos + reposicao + atividade + '</div>' +
    '</section>';
  }

  /* ---------- Bloco 4: visão conectada ---------- */
  function days() {
    var out = [], end = new Date(2026, 10, 20);
    for (var i = D.periodo.dias - 1; i >= 0; i--) {
      var d = new Date(end); d.setDate(end.getDate() - i);
      out.push(('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2));
    }
    return out;
  }

  function chart() {
    var labels = days();
    var map = {};
    D.movimentosPorDia.forEach(function (m) { map[m.dia] = m; });
    var rows = labels.map(function (l) { var m = map[l] || {}; return { l: l, i: m.entradas || 0, o: m.saidas || 0 }; });
    var max = Math.max.apply(null, rows.map(function (r) { return Math.max(r.i, r.o); }).concat([1]));
    var W = 640, H = 230, padL = 52, padB = 22, padT = 8, cw = (W - padL) / rows.length, bw = Math.max(2, cw / 2 - 2);
    var y = function (v) { return H - padB - (v / max) * (H - padB - padT); };
    var ticks = [0, max / 2, max];
    var svg = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" role="img" aria-label="Entradas e saídas por dia nos últimos ' + rows.length + ' dias">';
    svg += '<g class="grid">' + ticks.map(function (t) { return '<line x1="' + padL + '" x2="' + W + '" y1="' + y(t) + '" y2="' + y(t) + '"/>'; }).join('') + '</g>';
    svg += '<g class="axis">' + ticks.map(function (t) {
      return '<text x="' + (padL - 6) + '" y="' + (y(t) + 3) + '" text-anchor="end">' + (t ? brl(t).replace(',00', '') : '0') + '</text>';
    }).join('');
    rows.forEach(function (r, k) {
      var last = rows.length - 1;
      if ((k % 7 === 0 && last - k > 3) || k === last) svg += '<text x="' + (k === last ? W - 2 : padL + k * cw + cw / 2) + '" y="' + (H - 6) + '" text-anchor="' + (k === last ? 'end' : 'middle') + '">' + r.l + '</text>';
    });
    svg += '</g>';
    rows.forEach(function (r, k) {
      var x = padL + k * cw + 1;
      svg += '<g><title>' + r.l + ' · Entradas ' + brl(r.i) + ' · Saídas ' + brl(r.o) + '</title>' +
        '<rect class="c-base" x="' + x + '" y="' + (H - padB - 1) + '" width="' + (cw - 2) + '" height="1"/>' +
        (r.i ? '<rect class="c-in" x="' + x + '" y="' + y(r.i) + '" width="' + bw + '" height="' + (H - padB - y(r.i)) + '" rx="1"/>' : '') +
        (r.o ? '<rect class="c-out" x="' + (x + bw + 1) + '" y="' + y(r.o) + '" width="' + bw + '" height="' + (H - padB - y(r.o)) + '" rx="1"/>' : '') +
        '</g>';
    });
    return svg + '</svg>';
  }

  function connected() {
    var v = D.vendas, e = D.estoque, f = D.financeiro;
    var resultado = v.receitaLiquida - D.custoItens - D.despesasAvulsas;
    function row(label, value, total) { return '<div class="flow-row' + (total ? ' is-total' : '') + '"><span>' + label + '</span><span class="num">' + value + '</span></div>'; }
    function node(o) {
      return '<div class="card flow-node">' +
        '<div class="flow-head"><span class="sc-icon ' + (o.tone || '') + '">' + icon(o.icon, 15) + '</span><span class="flow-name">' + o.name + '</span>' +
        '<a class="btn btn-ghost btn-sm" href="' + o.route + '">Abrir ' + icon('chevRight', 13) + '</a></div>' +
        '<div class="flow-rows">' + o.rows + '</div>' +
        '<p class="flow-caption">' + o.caption + '</p></div>';
    }
    var arrow = '<div class="flow-arrow" aria-hidden="true">' + icon('arrowRight', 18) + '</div>';

    return '<section aria-labelledby="b4">' +
      '<div class="block-head"><h2 class="block-title" id="b4">Visão conectada</h2><span class="block-sub">Cada venda baixa o estoque e gera entrada no financeiro</span></div>' +
      '<div class="flow">' +
        node({ name: 'Vendas', icon: 'cart', route: '#/vendas', caption: 'Inclui vendas do PDV e orçamentos convertidos.',
          rows: row('Receita líquida', brl(v.receitaLiquida)) + row('Vendas', int(v.quantidade)) + row('Ticket médio', brl(v.ticketMedio)) }) +
        arrow +
        node({ name: 'Estoque', icon: 'box', tone: 't-neutral', route: '#/catalogo/produtos', caption: 'Saídas por venda e ajustes de inventário.',
          rows: row('Itens vendidos', int(v.itensVendidos)) + row('Itens ativos', int(e.itensAtivos)) + row('Unidades em estoque', int(e.unidades)) }) +
        arrow +
        node({ name: 'Financeiro', icon: 'wallet', tone: 't-receive', route: '#/financeiro/movimentacoes', caption: 'Ajuste de saldo no período: ' + brl(f.ajusteSaldo) + '.',
          rows: row('Entradas', brl(f.entradas)) + row('Saídas', brl(f.saidas)) + row('Saldo ao final', brl(f.saldoFinal), true) }) +
      '</div>' +
      '<div class="split">' +
        '<div class="card"><div class="card-head"><h3 class="card-title">Entradas e saídas por dia</h3>' +
          '<div class="legend"><span><i class="c-in"></i>Entradas</span><span><i class="c-out"></i>Saídas</span></div></div>' +
          '<div class="card-body">' + chart() + '</div></div>' +
        '<div class="card"><div class="card-head"><h3 class="card-title">Resultado do período</h3>' +
          '<a class="btn btn-ghost btn-sm" href="#/relatorios">Relatório ' + icon('chevRight', 13) + '</a></div>' +
          '<div class="card-body"><table class="ledger"><tbody>' +
            '<tr><td><span class="op"></span>Receita líquida</td><td>' + brl(v.receitaLiquida) + '</td></tr>' +
            '<tr><td><span class="op">−</span>Custo estimado dos itens</td><td>' + brl(D.custoItens) + '</td></tr>' +
            '<tr><td><span class="op">−</span>Despesas avulsas</td><td>' + brl(D.despesasAvulsas) + '</td></tr>' +
            '<tr class="is-result"><td><span class="op">=</span>Resultado operacional</td><td>' + brl(resultado) + '</td></tr>' +
          '</tbody></table>' +
          (v.quantidade ? '' : '<p class="note">Sem vendas no período. O resultado aparece assim que a primeira venda for registrada.</p>') +
          '</div></div>' +
      '</div>' +
    '</section>';
  }

  /* ---------- Localização das vendas (mantida do print 08) ---------- */
  function geo() {
    var L = D.localizacao;
    return '<section aria-labelledby="b5">' +
      '<div class="block-head"><h2 class="block-title" id="b5">Onde você vende</h2><span class="block-sub">Localização das vendas no período</span></div>' +
      '<div class="card">' +
        '<div class="card-head"><h3 class="card-title">' + icon('globe', 15) + 'Localização das vendas</h3>' +
          '<div class="seg" role="group" aria-label="Exibir"><button type="button" aria-pressed="true">Vendas</button><button type="button" aria-pressed="false">Clientes com vendas</button></div></div>' +
        '<div class="geo">' +
          '<div class="geo-globe"><canvas id="globe" width="600" height="600" aria-label="Globo com a localização das vendas"></canvas></div>' +
          '<div class="geo-side">' +
            '<div><p class="block-title" style="margin-bottom:6px">Vendas por país</p>' + (L.paises.length ? '' : '<p class="empty-text">Sem país informado neste período.</p>') + '</div>' +
            '<div><p class="block-title" style="margin-bottom:6px">Vendas por cidade</p>' +
              '<table class="table"><thead><tr><th style="width:32px">#</th><th>Cidade</th><th class="r">Vendas</th></tr></thead><tbody>' +
              (L.cidades.length ? '' : '<tr><td colspan="3" class="muted" style="text-align:center">Nenhuma cidade com vendas no período.</td></tr>') +
              '</tbody></table></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function skeleton() {
    var b = function (h, w) { return '<div class="sk" style="height:' + h + 'px;' + (w ? 'width:' + w : '') + '"></div>'; };
    return '<div class="page" aria-busy="true" aria-label="Carregando painel">' +
      b(48, '320px') + b(132) +
      '<div class="kpis">' + b(112) + b(112) + b(112) + b(112) + '</div>' +
      '<div class="attention">' + b(196) + b(196) + b(196) + b(196) + '</div>' +
      '</div>';
  }

  var loaded = false;
  function render(el, q) {
    q = q || {};
    if (!loaded) el.innerHTML = skeleton();
    setTimeout(function () {
      loaded = true;
      el.innerHTML = '<div class="page page-home">' + header() + shortcuts() + kpis() +
        '<section class="card big-card cal-card" id="cal" aria-label="Calendário financeiro">' + calendar() + '</section>' +
        focus() + money() + geo() + '</div>' +
        (q.modal === 'boas-vindas' && window.WelcomeModal ? WelcomeModal() : '');
      el.querySelectorAll('[data-periodo]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          periodo = btn.getAttribute('data-periodo');
          el.querySelectorAll('[data-periodo]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        });
      });
      el.querySelectorAll('.geo .seg button').forEach(function (btn, _, all) {
        btn.addEventListener('click', function () { all.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); }); });
      });
      bindCalendar(el);
      if (window.Globe) window.Globe.mount(document.getElementById('globe'));
    }, loaded ? 0 : 280);
  }

  screen('#/painel', { title: 'Painel', mount: render });
  print('referencias/Avante_VisaoDaLoja01.png', '#/painel', 'Painel · atalhos e indicadores');
  print('referencias/Avante_VisaoDaLoja02.png', '#/painel', 'Painel · vencimentos e resultado');
  print('referencias/Avante_VisaoDaLoja08_EssaManter.png', '#/painel', 'Painel · localização das vendas (mantida)');

  return { render: render };
})();
