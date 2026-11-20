/* PDV — Frente de caixa: Atendimento, Vendas do turno, Meu caixa, Clientes, abrir turno, pagamento, recibo. */
(function () {
  var D = window.DATA;
  var R = 'referencias/';

  var PRODUTO = { nome: 'Camiseta Alternativa Algodão Azul Escuro', sku: '01', preco: 74.90, estoque: 20 };
  var VENDA6 = { id: 6, cliente: 'Não identificado', data: '20/11/2026, 12:42:12', situacao: 'Concluída', pagamento: 'Dinheiro', valor: 149.80 };
  var CLIENTES = [
    { nome: 'João Victor Pertile', sub: 'Também fornecedor', doc: '12181472963', tel: '49999468030', email: 'joaovictorpertile7@gmail.com' },
    { nome: 'João Victor Pertile', sub: 'Também fornecedor', doc: '12181472963', tel: '49999468030', email: 'joaovictorpertile7@gmail.com' },
    { nome: 'João Victor Pertile', doc: null, tel: '49999468030', email: 'joaovictorpertile7@gmail.com' }
  ];

  function shell(active, content) {
    var tabs = [['#/pdv', 'Atendimento', 'monitor'], ['#/pdv/vendas', 'Vendas', 'receipt'], ['#/pdv/caixa', 'Meu caixa', 'wallet'], ['#/pdv/clientes', 'Clientes', 'user']];
    return '<header class="pdv-top">' +
      '<a class="brand" href="#/pdv" aria-label="Avante PDV">' + LogoSvg('PDV') + '</a>' +
      '<nav class="pdv-nav">' + tabs.map(function (t) {
        return '<a href="' + t[0] + '" class="' + (t[0] === active ? 'is-active' : '') + '"' + (t[0] === active ? ' aria-current="page"' : '') + '>' + icon(t[2], 15) + '<span class="hide-sm">' + t[1] + '</span></a>';
      }).join('') + '</nav>' +
      '<div class="topbar-actions">' +
        UI.btn({ label: 'Abrir ERP', icon: 'grid', variant: 'secondary', href: '#/transicao/erp', cls: 'hide-sm' }) +
        '<button type="button" class="company is-inline hide-md">' + icon('building', 16) + '<span class="company-name">' + esc(D.empresa.nome) + '</span>' + icon('chevDown', 13) + '</button>' +
        UI.btn({ label: 'Assistente', icon: 'chat', variant: 'secondary', cls: 'hide-md' }) +
        UI.btn({ icon: 'bell', variant: 'ghost', cls: 'btn-icon', aria: 'Notificações' }) +
        '<span class="avatar">' + D.usuario.inicial + '</span>' +
      '</div></header><div class="pdv-page">' + content + '</div>';
  }

  /* ---------- Atendimento ---------- */
  function atendimento(q) {
    var aberto = q.estado === 'venda';
    var qtd = aberto ? 2 : 0;
    var totalV = qtd * PRODUTO.preco;

    var tools = '<div class="pdv-tools">' +
      '<span class="pdv-status">' + icon('check', 14) + 'Conectado</span>' +
      [['Cobranças Pix', 'Shift+F8'], ['Rascunhos', 'Alt+6'], ['Personalizar atalhos', 'Alt+8'], ['Tela cheia', 'Alt+7'], ['Ordens prontas', 'Alt+9']].map(function (t) {
        return UI.btn({ label: t[0], kbd: t[1], variant: 'ghost', size: 'sm' });
      }).join('') + '</div>';

    var caixa = '<div class="card pdv-caixa">' + icon('wallet', 18, 'muted') +
      (aberto
        ? '<div><strong>Caixa principal</strong><span class="block-sub">Turno de caixa</span></div>' + UI.btn({ label: 'Meu turno', icon: 'clock', kbd: 'F8', size: 'sm', href: '#/pdv/caixa' })
        : '<div><strong>Caixa fechado</strong><span class="block-sub">' + esc(D.usuario.nome) + '</span></div>' + UI.btn({ label: 'Abrir turno', icon: 'wallet', kbd: 'F8', variant: 'primary', href: '#/pdv?modal=abrir-turno' })) +
      '</div>';

    var head = '<div class="pdv-head">' + caixa +
      UI.btn({ label: 'Nova venda', icon: 'plus', kbd: 'F3', variant: 'primary', cls: 'btn-lg', href: '#/pdv' }) +
      '<span class="spacer"></span>' + UI.btn({ label: 'Vendas em espera', icon: 'clock', kbd: 'F4' }) + '</div>';

    var catalog = '<div class="pdv-catalog">' +
      '<div class="pdv-search">' + icon('search', 18, 'muted') + '<input class="input" placeholder="Produto ou serviço, SKU ou código" aria-label="Buscar produto"/><span class="kbd">F2</span>' + UI.btn({ icon: 'receipt', variant: 'secondary', cls: 'btn-icon', aria: 'Ler código de barras' }) + '</div>' +
      '<div class="row">' + UI.filter('Categoria', ['Todas as categorias', 'Camiseta']) + '<span class="spacer"></span><span class="block-sub num">1 item</span></div>' +
      '<div class="pdv-grid"><a class="card pdv-product" href="#/pdv?estado=venda"><span class="thumb">' + icon('box', 16) + '</span>' +
        '<span class="pdv-product-name">' + esc(PRODUTO.nome) + '</span><span class="cell-sub num">' + PRODUTO.sku + '</span>' +
        '<strong class="num pdv-price">' + brl(PRODUTO.preco) + '</strong><span class="cell-sub num">' + PRODUTO.estoque + ' em estoque</span></a></div></div>';

    var cart = '<aside class="card pdv-cart">' +
      '<div class="row"><h2 class="card-title">Venda atual</h2><span class="spacer"></span>' + UI.badge('invoiced', qtd + (qtd === 1 ? ' item' : ' itens')) + '</div>' +
      '<div class="pdv-customer">' + icon('user', 16, 'muted') + 'Consumidor não identificado</div>' +
      '<button type="button" class="btn btn-link">Identificar cliente por CPF <span class="kbd">Alt+1</span></button>' +
      (aberto
        ? '<p class="block-sub">Quantidades <span class="kbd">Shift+F2</span></p>' +
          '<div class="pdv-line"><div><span class="cell-main">' + esc(PRODUTO.nome) + '</span><span class="cell-sub num">' + PRODUTO.sku + '</span></div>' +
          '<div class="row nowrap">' + UI.btn({ label: '−', size: 'sm', aria: 'Diminuir' }) + '<input class="input num r pdv-qty" value="2" aria-label="Quantidade"/>' + UI.btn({ label: '+', size: 'sm', aria: 'Aumentar' }) +
          '<span class="spacer"></span><span class="num">' + brl(totalV) + '</span>' + UI.btn({ icon: 'x', variant: 'ghost', size: 'sm', cls: 'btn-icon', aria: 'Remover item' }) + '</div></div>'
        : UI.emptyState({ icon: 'cart', title: 'Escolha produtos ou serviços para começar.', compact: true })) +
      '<div class="pdv-total"><span>Total estimado</span><strong class="num">' + brl(totalV) + '</strong></div>' +
      (aberto ? '' : '<div class="info is-warning">' + icon('alert', 15) + 'Selecione seu caixa para concluir a venda.</div>') +
      UI.btn({ label: 'Ir para pagamento', icon: 'check', kbd: 'Ctrl+Enter', variant: 'primary', cls: 'btn-block btn-lg', href: aberto ? '#/pdv?estado=venda&modal=pagamento' : null, disabled: !aberto }) +
      (aberto ? '<details class="pdv-more"><summary>' + icon('menu', 14) + 'Mais opções da venda' + icon('chevDown', 14, 'chev') + '</summary><div class="row">' + UI.btn({ label: 'Desconto', size: 'sm' }) + UI.btn({ label: 'Observação', size: 'sm' }) + UI.btn({ label: 'Colocar em espera', size: 'sm' }) + '</div></details>' : '') +
      '</aside>';

    var html = shell('#/pdv', '<div class="pdv-title-row"><h1 class="page-title">Atendimento</h1>' + tools + '</div>' + head + '<div class="pdv-body">' + catalog + cart + '</div>');

    if (q.modal === 'abrir-turno') html += UI.modal({
      title: 'Abrir meu turno', size: 'md',
      body: '<div class="grid-2" style="margin-bottom:12px"><button type="button" class="option-card is-selected">' + icon('wallet', 16) + '<strong>Caixa principal</strong><span>Disponível</span></button></div>' +
        '<div class="form-grid">' +
        UI.field({ label: 'Fundo inicial em dinheiro', type: 'money', value: '0,00' }) +
        UI.field({ label: 'Nome do turno', value: 'Turno de caixa', span: 6, help: 'Aparece no relatório do caixa.' }) +
        UI.field({ label: 'Duração prevista', type: 'select', options: ['8 horas', '4 horas', '6 horas', '12 horas'], span: 6, help: 'Usada para avisar quando o turno passar do previsto.' }) +
        '</div>',
      primary: 'Abrir turno'
    });

    if (q.modal === 'pagamento') html += UI.modal({
      title: 'Pagamento', size: 'md',
      body: '<div class="pay-total"><span>Total a receber</span><strong class="num">' + brl(totalV) + '</strong></div>' +
        '<div class="form-grid">' +
          UI.field({ label: 'Meio de pagamento', type: 'select', options: ['Dinheiro', 'Pix', 'Cartão de crédito', 'Cartão de débito'], span: 6 }) +
          UI.field({ label: 'Valor recebido', type: 'money', value: '149,80', span: 6 }) +
          UI.field({ label: 'Conta de recebimento', type: 'select', options: ['Sem lançamento automático'] }) +
        '</div>' +
        '<div class="row" style="justify-content:flex-end;margin-top:8px">' + UI.btn({ label: 'Trocar meio de pagamento', kbd: 'F6', variant: 'ghost', size: 'sm' }) + '</div>' +
        '<div class="info is-warning">' + icon('alert', 15) + '<span>Destino financeiro não configurado para Dinheiro. Esses valores ficam sem baixa financeira automática. Em pagamento dividido com destino definido, o restante fica pendente no Financeiro.</span></div>' +
        '<div class="pay-change"><span>Troco em dinheiro</span><strong class="num">' + brl(0) + '</strong></div>' +
        UI.formSection({ title: 'Dividir pagamento', collapsible: true, open: true, fields: ['<div style="grid-column: span 12">' + UI.btn({ label: 'Adicionar meio de pagamento', icon: 'plus', kbd: 'Shift+F3' }) + '</div>'] }),
      secondary: false, primary: 'Concluir venda', primaryKbd: 'F9'
    });
    return html;
  }

  function recibo() {
    var v = VENDA6;
    return UI.modal({
      title: 'Venda #' + v.id, size: 'md',
      body: '<div class="receipt"><p class="receipt-company">' + esc(D.empresa.nome) + '</p><p class="block-sub">Recibo de venda #' + v.id + '</p><p class="num">' + v.data + '</p></div>' +
        UI.dataTable({ footer: false, columns: [
          { label: 'Descrição', render: function (r) { return '<span class="cell-main">' + esc(r.nome) + '</span><span class="cell-sub num">' + r.sku + '</span>'; } },
          { label: 'Qtd. × unit.', align: 'right', num: true, render: function (r) { return '2 × ' + brl(r.preco); } },
          { label: 'Total', align: 'right', num: true, render: function (r) { return brl(2 * r.preco); } }
        ], rows: [PRODUTO] }) +
        '<div class="totals num">' +
          '<div class="total-line"><span>Subtotal</span><span>' + brl(149.8) + '</span></div>' +
          '<div class="total-line"><span>Desconto</span><span>' + brl(0) + '</span></div>' +
          '<div class="total-line is-strong"><span>Total</span><span>' + brl(149.8) + '</span></div>' +
          '<div class="total-line"><span>Dinheiro</span><span>' + brl(149.8) + '</span></div>' +
          '<div class="total-line"><span>Troco</span><span>' + brl(0) + '</span></div></div>' +
        '<p class="help">Comprovante gerencial. Sem validade fiscal.</p>' +
        UI.formSection({ title: 'Andamento e etiquetas', fields: [
          UI.field({ label: 'Andamento', type: 'select', options: ['Concluída'], span: 4 }),
          UI.field({ label: 'Etiquetas', placeholder: 'Ex.: Retirada, Entrega local', span: 5 }),
          '<div class="field" style="grid-column: span 3; justify-content:flex-end">' + UI.btn({ label: 'Salvar andamento' }) + '</div>'
        ] }) +
        UI.formSection({ title: 'Comprovantes de pagamento', desc: 'Nenhum documento anexado.', fields: [UI.field({ type: 'file', button: 'Anexar PDF ou foto' })] }),
      footLeft: '<div class="row">' + UI.btn({ label: 'Pedido de venda · A4', size: 'sm' }) + UI.btn({ label: 'Imprimir documento', icon: 'file', kbd: 'F7', size: 'sm' }) + UI.btn({ label: 'Devolver itens', size: 'sm' }) + UI.btn({ label: 'Trocar produtos', icon: 'grid', size: 'sm' }) + '</div>',
      right: UI.btn({ label: 'Estornar venda', variant: 'danger-outline', href: UI.href({ modal: 'estornar' }) })
    });
  }
  var reciboModal = recibo;

  screen('#/pdv', {
    layout: 'pdv', title: 'PDV · Atendimento', nav: '#/pdv',
    render: function (q) {
      var html = atendimento(q);
      if (q.modal === 'recibo') html += reciboModal();
      if (q.modal === 'estornar') html += UI.confirm({ title: 'Estornar a venda #6?', text: 'O valor de <strong>' + brl(149.8) + '</strong> sai do caixa e os itens voltam ao estoque. Esta ação fica registrada no histórico.', action: 'Estornar venda' });
      return html;
    }
  });
  print(R + 'Avante_PVD.png', '#/pdv', 'PDV · atendimento (caixa fechado)');
  print(R + 'Avante_PDV.png', '#/pdv?estado=venda', 'PDV · venda em andamento');
  print(R + 'Avante_PDV_AbriTurno.png', '#/pdv?modal=abrir-turno', 'PDV · abrir turno');
  print(R + 'Avante_PDV_Cloncluirvenda.png', '#/pdv?estado=venda&modal=pagamento', 'PDV · pagamento');
  print(R + 'Avante_PDV_Aparece_QuandoCloncui_venda.png', '#/pdv?modal=recibo&id=6', 'PDV · venda concluída (recibo)');

  screen('#/pdv/vendas', {
    layout: 'pdv', title: 'PDV · Vendas', nav: '#/pdv',
    render: function (q) {
      var html = shell('#/pdv/vendas', SalesPage({ query: q, title: 'Vendas do PDV', sales: [VENDA6] }));
      if (q.modal === 'recibo') html += reciboModal();
      if (q.modal === 'estornar') html += UI.confirm({ title: 'Estornar a venda #6?', text: 'O valor de <strong>' + brl(149.8) + '</strong> sai do caixa e os itens voltam ao estoque.', action: 'Estornar venda' });
      return html;
    }
  });
  print(R + 'Avante_PDV_AbaDeVendas.png', '#/pdv/vendas', 'PDV · vendas');

  screen('#/pdv/caixa', {
    layout: 'pdv', title: 'PDV · Meu caixa', nav: '#/pdv',
    render: function (q) {
      var html = shell('#/pdv/caixa',
        UI.pageHeader({ title: 'Meu caixa', actions: [UI.btn({ label: 'Novo caixa' }), UI.btn({ label: 'Movimentação' }), UI.btn({ label: 'Gerenciar turno' }), UI.btn({ label: 'Fechar meu turno', icon: 'check', kbd: 'Alt+2', variant: 'primary', href: UI.href({ modal: 'fechar' }) })] }) +
        '<div class="card card-body row">' + icon('clock', 16, 'muted') + '<div><strong>Turno de caixa</strong><span class="cell-sub num">Término previsto: 20/11/2026, 20:40:34</span></div><span class="spacer"></span>' + UI.badge('success', 'Aberto') + '</div>' +
        UI.kpis([
          { label: 'Fundo inicial', value: brl(100), raw: 100 },
          { label: 'Entradas · crédito', value: brl(149.8), raw: 149.8, tone: 'success' },
          { label: 'Saídas · débito', value: brl(0), raw: 0 },
          { label: 'Dinheiro esperado', value: brl(249.8), raw: 249.8, tone: 'highlight' }
        ]) +
        UI.card({ title: 'Meios de pagamento registrados', body: UI.dl([['Dinheiro', brl(149.8), true]]) + '<p class="help" style="margin-top:8px">Valores líquidos das devoluções na posição atual. Cartão e Pix não comprovam liquidação.</p>' }) +
        UI.section('Movimentações do turno', UI.dataTable({
          columns: [
            { label: 'Data', key: 'data', num: true }, { label: 'Movimento', key: 'mov' }, { label: 'Motivo', key: 'motivo' },
            { label: 'Entrada (crédito)', align: 'right', num: true, render: function (r) { return r.in ? '<span class="text-success">' + brl(r.in) + '</span>' : '—'; } },
            { label: 'Saída (débito)', align: 'right', num: true, render: function (r) { return r.out ? brl(r.out) : '—'; } }
          ],
          rows: [
            { data: '20/11/2026, 12:42:12', mov: 'Venda em dinheiro', motivo: 'Recebimento de venda', in: 149.8 },
            { data: '20/11/2026, 12:40:34', mov: 'Fundo inicial', motivo: 'Abertura de caixa', in: 100 }
          ], footer: false
        })) +
        UI.section('Turnos de caixa', UI.dataTable({
          columns: [
            { label: 'Turno', render: function () { return '<span class="cell-main">Turno de caixa</span><span class="cell-sub num">Término previsto: 20/11/2026, 20:40:34</span>'; } },
            { label: 'Caixa', key: 'caixa' }, { label: 'Operador', key: 'op' }, { label: 'Abertura', key: 'ab', num: true },
            { label: 'Situação', render: function () { return UI.badge('success', 'Aberto'); } }
          ],
          rows: [{ caixa: 'Caixa principal', op: 'Responsável', ab: '20/11/2026, 12:40:34' }],
          actions: function () { return UI.btn({ label: 'Resumo do turno', size: 'sm' }); }
        })));
      if (q.modal === 'fechar') html += UI.confirm({ title: 'Fechar meu turno?', text: 'Confira o dinheiro em caixa antes de fechar. Dinheiro esperado: <strong class="num">' + brl(249.8) + '</strong>.', action: 'Fechar turno' });
      return html;
    }
  });
  print(R + 'Avante_PDV_MeuCaixa.png', '#/pdv/caixa', 'PDV · meu caixa');

  screen('#/pdv/clientes', {
    layout: 'pdv', title: 'PDV · Clientes', nav: '#/pdv',
    render: function (q) {
      return shell('#/pdv/clientes', window.ClientsPage ? ClientsPage({ query: q, rows: CLIENTES, base: '#/pdv/clientes' }) : '');
    }
  });
  print(R + 'Avante_PDV_Clientes.png', '#/pdv/clientes', 'PDV · clientes');
})();
