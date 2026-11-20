/* Vendas: Vendas (lista), Orçamentos (lista, detalhe, novo, editar). */
(function () {
  var R = 'referencias/';

  /* Orçamento real visto nos prints */
  var ORCAMENTO = {
    id: 2, nome: 'Teste', cliente: 'João Victor Pertile', vendedor: 'Responsável', validade: '25/11/2026', situacao: 'Rascunho',
    itens: [{ produto: 'Camiseta Alternativa Algodão Azul Escuro', sku: '01', qtd: 1, unit: 74.90 }],
    desconto: 0, condicoes: '50% depois e 50% na hora da retirada', prazo: '15 dias úteis após a confi'
  };
  function total(o) { return o.itens.reduce(function (s, i) { return s + i.qtd * i.unit; }, 0) - o.desconto; }

  /* ---------- Lista de vendas (compartilhada com o PDV) ---------- */
  window.SalesPage = function (o) {
    var q = o.query || {};
    var sales = o.sales || [];
    var reg = sales.filter(function (s) { return s.situacao !== 'Estornada'; }).length;
    var est = sales.length - reg;
    var soma = sales.reduce(function (s, v) { return s + v.valor; }, 0);
    var tab = q.tab || 'todas';
    var rows = sales.filter(function (s) { return tab === 'todas' || (tab === 'registradas' ? s.situacao !== 'Estornada' : s.situacao === 'Estornada'); });

    var summary = '<div class="card summary-strip">' +
      '<div class="summary-period">' + UI.filter('Período', ['Últimos 30 dias', 'Hoje', 'Últimos 7 dias', 'Últimos 90 dias'], 'Últimos 30 dias') + '</div>' +
      [['Total de vendas', int(sales.length)], ['Registradas', int(reg)], ['Estornadas', int(est)], ['Total vendido', brl(soma)]].map(function (k) {
        return '<div class="summary-item"><span>' + k[0] + '</span><strong class="num' + (k[1] === '0' || k[1] === brl(0) ? ' muted' : '') + '">' + k[1] + '</strong></div>';
      }).join('') + '</div>';

    var reports = '<div class="row">' + ['Evolução das vendas', 'ERP e PDV', 'Horários de venda'].map(function (l) {
      return UI.btn({ label: l, icon: 'chart', size: 'sm', href: '#/relatorios/analises' });
    }).join('') + '</div>';

    var searching = q.busca === '1';
    var toolbar = UI.tabs([
      { id: 'todas', label: 'Todas', count: sales.length },
      { id: 'registradas', label: 'Registradas', count: reg },
      { id: 'estornadas', label: 'Estornadas', count: est }
    ], tab, { pills: true }) +
      UI.btn({ label: searching ? 'Fechar busca' : 'Buscar e filtrar', icon: searching ? 'x' : 'search', size: 'sm', href: UI.href({ busca: searching ? null : '1' }) });

    var filters = searching ? '<div class="table-filters">' +
      '<div class="filter-row">' +
        '<div class="filter-search">' + UI.field({ type: 'search', placeholder: 'Número da venda ou CPF/CNPJ' }) + '</div>' +
        UI.btn({ label: 'Buscar', variant: 'secondary' }) + '</div>' +
      '<div class="filter-row">' +
        UI.filter('Pagamento', ['Todos os pagamentos', 'Dinheiro', 'Pix', 'Cartão de crédito', 'Cartão de débito']) +
        UI.filter('Andamento', ['Todo o andamento', 'Concluída']) +
        UI.btn({ label: 'Limpar filtros', variant: 'ghost', size: 'sm' }) + '</div></div>' : '';

    var table = UI.dataTable({
      toolbar: toolbar + filters,
      columns: [
        { label: 'Venda', render: function (r) { return '<span class="cell-flex">' + icon('chevDown', 14, 'muted') + '<strong class="num">#' + r.id + '</strong></span>'; } },
        { label: 'Cliente', key: 'cliente' },
        { label: 'Data', key: 'data', num: true },
        { label: 'Situação', render: function (r) { return UI.badge(r.situacao === 'Estornada' ? 'error' : 'success', r.situacao); } },
        { label: 'Pagamento', render: function (r) { return '<span class="cell-flex">' + icon('wallet', 14, 'muted') + esc(r.pagamento) + '</span>'; } },
        { label: 'Valor líquido', align: 'right', num: true, render: function (r) { return brl(r.valor); } }
      ],
      rows: rows,
      actions: function (r) { return UI.btn({ icon: 'receipt', variant: 'ghost', size: 'sm', cls: 'btn-icon', aria: 'Ver recibo da venda #' + r.id, href: UI.href({ modal: 'recibo', id: r.id }) }); },
      empty: { icon: 'box', title: 'Nenhuma venda neste filtro', text: 'As vendas registradas no ERP e no PDV aparecem aqui.', actions: o.emptyAction ? [o.emptyAction] : [] }
    });

    return UI.pageHeader({ crumbs: o.crumbs, title: o.title, actions: o.actions || [] }) + summary + reports + table;
  };

  screen('#/vendas', {
    title: 'Vendas',
    render: function (q) {
      return UI.page(SalesPage({
        query: q, title: 'Vendas', crumbs: [{ label: 'Vendas' }], sales: [],
        actions: [UI.btn({ label: 'Registrar venda', icon: 'plus', variant: 'primary', href: '#/transicao/pdv' })],
        emptyAction: UI.btn({ label: 'Registrar venda', icon: 'plus', variant: 'primary', size: 'sm', href: '#/transicao/pdv' })
      }));
    }
  });
  print(R + 'Avante_Vendas_VendasRealizadas.png', '#/vendas', 'Vendas');
  print(R + 'Avante_Vendas_VendasRealizadas_ComBuscaAtiva.png', '#/vendas?busca=1', 'Vendas · busca ativa');

  /* ---------- Orçamentos ---------- */
  function quoteForm(v) {
    v = v || {};
    var itens = v.itens || [{ produto: '', qtd: 1 }];
    var subtotal = v.itens ? v.itens.reduce(function (s, i) { return s + i.qtd * i.unit; }, 0) : 0;
    return UI.formSection({ fields: [
        UI.field({ label: 'Nome do orçamento', value: v.nome, placeholder: 'Ex.: Proposta de materiais', required: true }),
        '<div class="field" style="grid-column: span 12"><label class="label">Destinatário (cliente)</label><div class="row nowrap">' +
          '<div class="spacer">' + UI.field({ type: 'search', value: v.cliente, placeholder: 'Buscar cliente por nome, documento ou e-mail' }) + '</div>' +
          UI.btn({ label: 'Cadastrar cliente', icon: 'plus', href: '#/clientes?modal=novo' }) + '</div></div>',
        UI.field({ label: 'Vendedor', type: 'select', options: ['Responsável'], value: v.vendedor, span: 6 }),
        UI.field({ label: 'Válido até', type: 'date', value: v.validadeISO, span: 6, help: 'Depois desta data o orçamento aparece como vencido.' }),
        UI.field({ label: 'Desconto total', type: 'money', value: '0,00', span: 6 })
      ] }) +
      UI.formSection({ title: 'Condições de pagamento, entrega e observações', collapsible: true, fields: [
        UI.field({ label: 'Condições de pagamento', value: v.condicoes, optional: true }),
        UI.field({ label: 'Prazo e entrega', value: v.prazo, optional: true }),
        UI.field({ label: 'Observações', type: 'textarea', optional: true })
      ] }) +
      UI.formSection({ title: 'Produtos, serviços e quantidades', desc: 'Não reserva estoque nem movimenta caixa.', fields: [
        '<div class="item-rows" style="grid-column: span 12">' + itens.map(function (i) {
          return '<div class="item-row"><div class="spacer">' + UI.field({ type: 'search', value: i.produto ? i.produto + ' · ' + i.sku : '', placeholder: 'Buscar nome, SKU ou código de barras' }) + '</div>' +
            '<input class="input num r item-qty" value="' + i.qtd + '" aria-label="Quantidade"/>' +
            UI.btn({ icon: 'x', variant: 'danger-outline', cls: 'btn-icon', aria: 'Remover item' }) + '</div>';
        }).join('') + '</div>',
        '<div style="grid-column: span 12">' + UI.btn({ label: 'Adicionar item', icon: 'plus', size: 'sm' }) + '</div>',
        '<div class="totals-box" style="grid-column: span 12">' + (v.itens
          ? '<span class="num">Subtotal: ' + brl(subtotal) + '</span><span class="num">Desconto: ' + brl(0) + '</span><strong class="num">Total: ' + brl(subtotal) + '</strong>'
          : '<span>Selecione um produto ou serviço em cada item.</span>') + '</div>'
      ] });
  }

  function quoteDetail(o) {
    var t = total(o);
    return UI.modal({
      title: o.nome + ' · #' + o.id, size: 'lg',
      body: '<div class="doc-summary"><span>' + UI.badge('cancelled', o.situacao) + '</span><span class="num">Válido até ' + o.validade + '</span><strong class="num">' + brl(t) + '</strong></div>' +
        '<h3 class="doc-party">' + esc(o.cliente) + '</h3>' +
        UI.dataTable({ footer: false, columns: [
          { label: 'Produto', render: function (r) { return '<span class="cell-main">' + esc(r.produto) + '</span><span class="cell-sub num">' + r.sku + '</span>'; } },
          { label: 'Quantidade', align: 'right', num: true, render: function (r) { return int(r.qtd); } },
          { label: 'Unitário', align: 'right', num: true, render: function (r) { return brl(r.unit); } },
          { label: 'Total', align: 'right', num: true, render: function (r) { return brl(r.qtd * r.unit); } }
        ], rows: o.itens }) +
        '<div class="totals num"><div class="total-line"><span>Subtotal</span><span>' + brl(t + o.desconto) + '</span></div>' +
        '<div class="total-line"><span>Desconto</span><span>' + brl(o.desconto) + '</span></div>' +
        '<div class="total-line is-strong"><span>Total</span><span>' + brl(t) + '</span></div></div>' +
        UI.formSection({ title: 'Fotos do orçamento', desc: 'Nenhuma foto adicionada.', fields: [UI.field({ type: 'file', button: 'Adicionar foto', placeholder: 'Arraste o arquivo ou' })] }) +
        UI.formSection({ title: 'Condições', fields: ['<div style="grid-column: span 12">' + UI.dl([['Condições de pagamento', esc(o.condicoes)], ['Prazo e entrega', esc(o.prazo)]]) + '</div>'] }),
      footLeft: '<div class="row">' + UI.btn({ label: 'Baixar PDF', icon: 'download' }) + UI.btn({ label: 'Editar', href: UI.href({ modal: 'editar' }) }) + '</div>',
      secondary: false, primary: 'Marcar como enviado'
    });
  }

  screen('#/vendas/orcamentos', {
    title: 'Orçamentos',
    render: function (q) {
      var list = [ORCAMENTO];
      var html = UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Vendas' }, { label: 'Orçamentos' }], title: 'Orçamentos', actions: [UI.btn({ label: 'Novo orçamento', icon: 'plus', variant: 'primary', href: UI.href({ modal: 'novo' }) })] }) +
        UI.dataTable({
          columns: [
            { label: 'Orçamento', render: function (r) { return '<span class="cell-main">' + esc(r.nome) + '</span><span class="cell-sub num">#' + r.id + '</span>'; } },
            { label: 'Cliente', key: 'cliente' },
            { label: 'Validade', key: 'validade', num: true },
            { label: 'Total', align: 'right', num: true, render: function (r) { return brl(total(r)); } },
            { label: 'Situação', render: function (r) { return UI.badge('cancelled', r.situacao); } }
          ],
          rows: list,
          actions: function (r) { return UI.btn({ label: 'Abrir orçamento', size: 'sm', href: UI.href({ modal: 'ver', id: r.id }) }); },
          empty: { icon: 'file', title: 'Nenhum orçamento.', actions: [UI.btn({ label: 'Novo orçamento', icon: 'plus', variant: 'primary', size: 'sm', href: UI.href({ modal: 'novo' }) })] }
        }));
      if (q.modal === 'ver') html += quoteDetail(ORCAMENTO);
      if (q.modal === 'editar') html += UI.modal({ title: 'Editar orçamento', size: 'lg', body: quoteForm(Object.assign({ validadeISO: '2026-11-25' }, ORCAMENTO)), primary: 'Salvar orçamento' });
      if (q.modal === 'novo') html += UI.modal({ title: 'Novo orçamento', size: 'lg', body: quoteForm({ validadeISO: '2026-11-27', vendedor: 'Responsável' }), primary: 'Salvar orçamento' });
      return html;
    }
  });
  print(R + 'Avante_Vendas_Orcamento.png', '#/vendas/orcamentos', 'Orçamentos');
  print(R + 'Avante_Vendas_Orcamento_CliqueiNoOrçamentoEMostraIsso.png', '#/vendas/orcamentos?modal=ver&id=2', 'Orçamento · detalhe');
  print(R + 'Avante_Vendas_Orcamento_EditarOrçamento.png', '#/vendas/orcamentos?modal=editar&id=2', 'Orçamento · editar');
  print(R + 'Avante_Vendas_Orcamento_NovoOrcamento.png', '#/vendas/orcamentos?modal=novo', 'Orçamento · novo');
})();
