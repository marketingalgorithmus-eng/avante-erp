/* Catálogo: Produtos e serviços, cadastro (produto, serviço, insumo), ações, etiquetas, histórico,
   Fichas técnicas, Insumos, Inventário e Categorias. */
(function () {
  var R = 'referencias/';
  var P = { nome: 'Camiseta Alternativa Algodão Azul Escuro', sku: '01', preco: 74.90, custo: 0, estoque: 20, categoria: 'Camiseta', barras: '98856804473701389143' };

  function seg(options, active, label) {
    return '<div class="seg seg-field" role="group" aria-label="' + esc(label || '') + '">' + options.map(function (o) {
      var on = o[0] === active;
      return '<button type="button" aria-pressed="' + on + '"' + (o[2] ? ' data-tone="' + o[2] + '"' : '') + '>' + (o[1] ? icon(o[1], 14) : '') + o[0] + '</button>';
    }).join('') + '</div>';
  }
  function segField(label, help, html, span) {
    return '<div class="field" style="grid-column: span ' + (span || 12) + '"><span class="label">' + label + '</span>' + html + (help ? '<p class="help">' + help + '</p>' : '') + '</div>';
  }

  /* ---------- Cadastro de produto / serviço / insumo ---------- */
  var KINDS = {
    produto: { title: 'Cadastrar produto', primary: 'Cadastrar produto', head: 'Novo produto', icon: 'box', uso: 'Produto para venda',
      tabs: [['cadastro', 'Cadastro', 'box'], ['precos', 'Preços', 'wallet'], ['estoque', 'Estoque', 'inbox'], ['fornecedor', 'Fornecedor', 'truck'], ['fiscal', 'Fiscal', 'check'], ['adicionais', 'Opcionais', 'file']] },
    insumo: { title: 'Cadastrar insumo', primary: 'Cadastrar insumo', head: 'Novo insumo', icon: 'box', uso: 'Insumo da produção',
      tabs: [['cadastro', 'Cadastro', 'box'], ['precos', 'Preços', 'wallet'], ['estoque', 'Estoque', 'inbox'], ['fornecedor', 'Fornecedor', 'truck'], ['fiscal', 'Fiscal', 'check'], ['adicionais', 'Opcionais', 'file']] },
    servico: { title: 'Cadastrar serviço', primary: 'Cadastrar serviço', head: 'Novo serviço', icon: 'clock',
      tabs: [['cadastro', 'Cadastro', 'box'], ['precos', 'Preços', 'wallet'], ['adicionais', 'Opcionais', 'file'], ['prestacao', 'Prestação', 'clock']] }
  };

  function tabBody(kind, tab) {
    var servico = kind === 'servico';
    switch (tab) {
      case 'precos':
        return UI.formSection({ title: 'Preços', fields: [
          UI.field({ label: 'Preço regular', type: 'money', value: '0,00', span: 6, help: 'Valor cobrado na venda.' }),
          UI.field({ label: 'Aplicar preço promocional', type: 'switch', span: 6 }),
          UI.field({ label: servico ? 'Custo estimado por unidade' : 'Custo unitário', type: 'money', value: '0,00', span: 6, help: 'Usado para calcular margem e resultado.' }),
          UI.field({ label: 'Acréscimo sobre o custo (%)', type: 'percent', span: 6 }),
          '<div class="info is-success" style="grid-column: span 12">' + icon('trend', 15) + 'Informe o preço para conferir a margem.</div>'
        ] });
      case 'estoque':
        return UI.formSection({ title: 'Estoque', fields: [
          segField('Disponibilidade', 'Como o item aparece no PDV e nos orçamentos.', seg([['Em estoque', 'check'], ['Fora de estoque', 'x', 'error'], ['Sob encomenda', 'clock']], 'Fora de estoque', 'Disponibilidade')),
          segField('Controle de quantidade', 'Com controle, cada venda baixa o saldo.', seg([['Controlar', 'inbox'], ['Sem controle', 'x']], 'Controlar', 'Controle de quantidade')),
          UI.field({ label: 'Quantidade atual', type: 'number', value: '0', span: 6, num: true, align: 'right' }),
          UI.field({ label: 'Estoque mínimo', type: 'number', value: '5', span: 6, num: true, align: 'right', help: 'Abaixo deste saldo o item aparece em “Reposição de estoque” no Painel.' }),
          UI.field({ label: 'Unidade do estoque', type: 'select', options: ['Unidade', 'Caixa', 'Quilo', 'Litro', 'Metro'], span: 6 }),
          '<div style="grid-column: span 12">' + UI.formSection({ title: 'Compra por embalagem', desc: 'Para quem compra em caixa e vende por unidade.', collapsible: true, fields: [UI.field({ label: 'Unidades por embalagem', type: 'number', span: 6, num: true, optional: true })] }) + '</div>'
        ] });
      case 'fornecedor':
        return UI.formSection({ title: 'Fornecedor', fields: [
          UI.field({ label: 'Fornecedor principal', type: 'search', placeholder: 'Buscar fornecedor por nome, documento ou e-mail', help: 'Vincula o produto a um fornecedor da sua empresa. Compras e histórico continuam no cadastro do fornecedor.' }),
          '<div class="suggest" style="grid-column: span 12"><p class="block-sub">Sugestões recentes</p><p class="empty-text">Nenhum fornecedor cadastrado.</p></div>'
        ] });
      case 'fiscal':
        return UI.formSection({ title: 'Fiscal', fields: [
          UI.field({ label: 'NCM', placeholder: '8 dígitos', span: 6, num: true }),
          UI.field({ label: 'CEST', placeholder: '7 dígitos', span: 6, num: true }),
          UI.field({ label: 'Origem', type: 'select', options: ['Não definida', '0 · Nacional', '1 · Estrangeira (importação direta)', '2 · Estrangeira (mercado interno)'], span: 6 }),
          UI.field({ label: 'Unidade comercial', placeholder: 'UN, KG, CX…', span: 6 }),
          UI.field({ label: 'CFOP de referência', span: 6, num: true }),
          UI.field({ label: 'CST ICMS', span: 6, num: true }),
          UI.field({ label: 'CSOSN', span: 6, num: true }),
          UI.field({ label: 'CST PIS', span: 6, num: true }),
          UI.field({ label: 'CST COFINS', span: 6, num: true }),
          UI.field({ label: 'CST IBS/CBS', span: 6, num: true }),
          UI.field({ label: 'Classificação IBS/CBS', placeholder: 'cClassTrib · 6 dígitos', span: 6, num: true }),
          '<div class="info" style="grid-column: span 12">' + icon('alert', 15) + 'Revise os códigos com a contabilidade. Este cadastro não emite notas.</div>'
        ] });
      case 'adicionais':
        return UI.formSection({ title: 'Opcionais', desc: 'Modelos opcionais com valor e observação por unidade do item. Ex.: “Embalagem para presente + R$ 5,00”.', fields: [
          '<div class="item-rows" style="grid-column: span 12"><div class="form-grid">' +
            UI.field({ label: 'Nome do opcional', span: 7 }) +
            UI.field({ label: 'Valor por unidade', type: 'money', value: '0,00', span: 5 }) +
            UI.field({ label: 'Observação do pedido' }) +
            UI.field({ label: 'Ficha técnica do opcional', type: 'select', options: ['Sem consumo de insumos', 'Usar ficha técnica'], help: 'Escolha uma ficha técnica se o opcional consome insumos do estoque.' }) +
            '<div style="grid-column: span 12">' + UI.btn({ label: 'Remover', icon: 'x', variant: 'danger-outline', size: 'sm' }) + '</div>' +
          '</div></div>',
          '<div style="grid-column: span 12">' + UI.btn({ label: 'Adicionar opcional', icon: 'plus', size: 'sm' }) + '</div>'
        ] });
      case 'prestacao':
        return UI.formSection({ title: 'Prestação', fields: [
          UI.field({ label: 'Disponibilidade do serviço', type: 'select', options: ['Disponível para venda', 'Indisponível'] }),
          UI.field({ label: 'Unidade de cobrança', type: 'select', options: ['Por execução', 'Por hora', 'Por dia', 'Por mês'] }),
          UI.field({ label: 'Duração estimada (minutos)', type: 'number', value: '0', span: 6, num: true, align: 'right', help: 'Opcional. Não reserva horários nem cria agendamentos.' }),
          '<div class="info" style="grid-column: span 12">' + icon('alert', 15) + 'A venda é um registro gerencial. NFS-e precisa de integração fiscal própria. Quantidades são inteiras na unidade escolhida.</div>'
        ] });
      default:
        return UI.formSection({ title: 'Cadastro', fields: [
          UI.field({ label: servico ? 'Nome do serviço' : 'Nome do produto', required: true }),
          '<div class="field" style="grid-column: span 6"><label class="label">SKU</label><div class="row nowrap"><input class="input num" aria-label="SKU"/>' + UI.btn({ icon: 'history', variant: 'secondary', cls: 'btn-icon', aria: 'Gerar SKU' }) + '</div><p class="help">Código interno. Gere um automaticamente se preferir.</p></div>',
          UI.field({ label: 'Código de barras', placeholder: 'Gerado automaticamente ao salvar', span: 6, num: true }),
          UI.field({ label: 'Categoria', span: 6 }),
          segField('Publicação', 'Itens arquivados saem do PDV e das buscas.', seg([['Ativo', 'check'], ['Arquivado', 'inbox']], 'Ativo', 'Publicação'), 6),
          UI.field({ label: 'Descrição', type: 'textarea', rows: 4, optional: true })
        ].concat(servico ? [] : [UI.field({ label: 'Uso do cadastro', type: 'select', options: kind === 'insumo' ? ['Insumo da produção', 'Produto para venda'] : ['Produto para venda', 'Insumo da produção'] })]) });
    }
  }

  window.ItemModal = function (kind, q, closeHref) {
    var K = KINDS[kind];
    var tab = q.tab || 'cadastro';
    var tabs = UI.tabs(K.tabs.map(function (t) { return { id: t[0], label: t[1], icon: t[2] }; }), tab, { pills: true });
    var body = '<div class="item-modal">' +
      '<aside class="item-images"><p class="form-section-title">Imagens</p>' +
        '<div class="item-image">' + icon('box', 40) + '</div>' + UI.field({ type: 'file', button: 'Adicionar imagem', placeholder: 'Arraste o arquivo ou' }) + '</aside>' +
      '<div class="item-form"><div class="doc-summary"><span class="cell-flex"><span class="thumb">' + icon(K.icon, 16) + '</span><span><strong class="doc-name">' + K.head + '</strong><span class="cell-sub">SKU ainda não informado</span></span></span></div>' +
        tabs + '<div class="item-tab">' + tabBody(kind, tab) + '</div>' +
        (q.sair ? UnsavedBar(closeHref) : '') + '</div></div>';
    return UI.modal({ title: K.title, size: 'xl', body: body, closeHref: closeHref, primary: K.primary,
      right: '<a class="btn btn-outline" href="' + UI.href({ sair: '1' }) + '">Cancelar</a>' + UI.btn({ label: K.primary, variant: 'primary', type: 'submit' }) });
  };

  /* ---------- Produtos e serviços ---------- */
  function barcode(code) {
    var x = 0, bars = '';
    for (var i = 0; i < code.length * 3; i++) {
      var w = 1 + (parseInt(code[i % code.length], 10) + i) % 3;
      if (i % 2 === 0) bars += '<rect x="' + x + '" y="0" width="' + w + '" height="40"/>';
      x += w + 1;
    }
    return '<svg class="barcode" viewBox="0 0 ' + x + ' 40" preserveAspectRatio="none" aria-hidden="true">' + bars + '</svg>';
  }

  screen('#/catalogo/produtos', {
    title: 'Produtos e serviços',
    render: function (q) {
      var tab = q.status || 'todos';
      var searching = q.busca === '1';
      var rows = tab === 'arquivados' ? [] : [P];
      var base = '#/catalogo/produtos';
      var toolbar = UI.tabs([{ id: 'todos', label: 'Todos', count: 1, href: base }, { id: 'ativos', label: 'Ativos', count: 1, href: base + '?status=ativos' }, { id: 'arquivados', label: 'Arquivados', count: 0, href: base + '?status=arquivados' }], tab, { pills: true }) +
        UI.btn({ label: searching ? 'Fechar busca' : 'Buscar e filtrar', icon: searching ? 'x' : 'search', size: 'sm', href: UI.href({ busca: searching ? null : '1' }) }) +
        (searching ? '<div class="table-filters"><div class="filter-row"><div class="filter-search">' + UI.field({ type: 'search', placeholder: 'Nome, SKU ou código de barras' }) + '</div>' + UI.btn({ label: 'Buscar', variant: 'secondary' }) + '</div>' +
          '<div class="filter-row">' + UI.filter('Tipo de cadastro', ['Produtos e serviços', 'Produtos', 'Serviços']) + UI.filter('Categoria', ['Todas as categorias', 'Camiseta']) + UI.filter('Estoque', ['Todo estoque', 'Em estoque', 'Abaixo do mínimo', 'Sem estoque']) + UI.filter('Uso', ['Todos os tipos', 'Produto para venda', 'Insumo da produção']) + UI.btn({ label: 'Limpar filtros', variant: 'ghost', size: 'sm' }) + '</div></div>' : '');

      var html = UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Catálogo' }, { label: 'Produtos e serviços' }], title: 'Produtos e serviços', actions: [
          UI.btn({ label: 'Opções da tela', icon: 'sliders', href: UI.href({ modal: 'opcoes' }) }),
          UI.btn({ label: 'Novo serviço', icon: 'plus', href: UI.href({ modal: 'servico' }) }),
          UI.btn({ label: 'Novo produto', icon: 'plus', variant: 'primary', href: UI.href({ modal: 'produto' }) })
        ] }) +
        '<div class="row">' + [['Categorias', '#/catalogo/categorias'], ['Fichas técnicas', '#/catalogo/fichas-tecnicas'], ['Inventário', '#/catalogo/inventario'], ['Insumos', '#/catalogo/insumos']].map(function (l) {
          return '<a class="chip" href="' + l[1] + '">' + l[0] + icon('chevRight', 13) + '</a>';
        }).join('') + '</div>' +
        UI.dataTable({
          toolbar: toolbar, selectable: true,
          columns: [
            { label: 'Produto ou serviço', render: function (r) { return '<span class="cell-flex"><span class="thumb">' + icon('box', 14) + '</span><span class="cell-main">' + esc(r.nome) + '</span></span>'; } },
            { label: 'SKU', key: 'sku', num: true },
            { label: 'Preço', align: 'right', num: true, render: function (r) { return brl(r.preco); } },
            { label: 'Custo', align: 'right', num: true, render: function (r) { return brl(r.custo); } },
            { label: 'Acréscimo sobre custo', render: function (r) { return r.custo ? '' : '<span class="muted">Sem custo</span>'; } },
            { label: 'Estoque', align: 'right', num: true, render: function (r) { return '<strong>' + int(r.estoque) + '</strong>'; } },
            { label: 'Disponibilidade', render: function () { return UI.badge('success', 'Em estoque', 'check'); } },
            { label: 'Categoria', key: 'categoria' },
            { label: 'Status', render: function () { return UI.badge('success', 'Ativo'); } }
          ],
          rows: rows,
          actions: function () {
            return UI.btn({ icon: 'history', variant: 'ghost', size: 'sm', cls: 'btn-icon', aria: 'Histórico de estoque', href: UI.href({ modal: 'historico' }) }) +
              UI.btn({ label: '⋯', variant: 'ghost', size: 'sm', cls: 'btn-icon', aria: 'Ações do produto', href: UI.href({ modal: 'acoes' }) });
          },
          countLabel: rows.length ? '1–1 de 1 itens' : '0 itens',
          empty: tab === 'arquivados'
            ? { icon: 'inbox', title: 'Nenhum item arquivado.', text: 'Itens arquivados saem do PDV e das buscas, mas o histórico de vendas e estoque é preservado.' }
            : { icon: 'box', title: 'Nenhum produto ou serviço cadastrado.', actions: [UI.btn({ label: 'Novo produto', icon: 'plus', variant: 'primary', size: 'sm', href: UI.href({ modal: 'produto' }) })] }
        }));

      var close = base;
      if (q.modal === 'produto') html += ItemModal('produto', q, close);
      if (q.modal === 'servico') html += ItemModal('servico', q, close);
      if (q.modal === 'opcoes') html += UI.modal({
        title: 'Opções da tela', size: 'sheet',
        body: '<div class="stack">' + UI.formSection({ title: 'Colunas visíveis', fields: [['SKU', 1], ['Preço', 1], ['Custo', 1], ['Acréscimo sobre custo', 1], ['Estoque', 1], ['Disponibilidade', 1], ['Categoria', 1], ['Status', 1], ['Código de barras', 0], ['Fornecedor', 0], ['NCM', 0], ['Ações', 1]].map(function (c) {
            return UI.field({ type: 'checkbox', label: c[0], checked: !!c[1], span: 6 });
          }) }) +
          UI.formSection({ title: 'Paginação', fields: [UI.field({ label: 'Produtos por página', type: 'select', options: ['25', '50', '100'], span: 6, help: 'Estas opções mudam apenas a sua visualização nesta empresa.' })] }) + '</div>',
        primary: 'Aplicar'
      });
      if (q.modal === 'acoes') html += UI.modal({
        title: 'Ações do produto', sub: esc(P.nome), size: 'sm', footer: false,
        body: '<div class="action-list">' +
          [['Imprimir etiqueta', 'file', 'etiqueta'], ['Histórico de estoque', 'history', 'historico'], ['Duplicar produto', 'plus', 'produto'], ['Criar variação', 'grid', 'produto'], ['Arquivar', 'inbox', 'arquivar']].map(function (a) {
            return '<a class="menu-item' + (a[2] === 'arquivar' ? ' text-error' : '') + '" href="' + UI.href({ modal: a[2] }) + '">' + icon(a[1], 15) + a[0] + '</a>';
          }).join('') + '</div>'
      });
      if (q.modal === 'arquivar') html += UI.confirm({ title: 'Arquivar item?', text: '<strong>' + esc(P.nome) + '</strong> sai do PDV e das buscas. O histórico de vendas e estoque será preservado.', action: 'Arquivar' });
      if (q.modal === 'etiqueta') html += UI.modal({
        title: 'Imprimir etiquetas', size: 'lg',
        body: '<div class="label-print"><div class="form-grid">' +
            UI.field({ label: 'Quantidade de etiquetas', type: 'number', value: '1', span: 6, num: true, align: 'right' }) +
            UI.field({ label: 'Papel', type: 'select', options: ['Folha A4', 'Bobina térmica'], span: 6 }) +
            UI.field({ label: 'Etiquetas por linha', type: 'select', options: ['3 colunas', '2 colunas', '4 colunas'], span: 6 }) +
            UI.field({ label: 'Altura da etiqueta (mm)', type: 'number', value: '36', span: 6, num: true, align: 'right' }) +
            '<div style="grid-column: span 12">' + UI.formSection({ title: 'Ajustar folha já iniciada e medidas', collapsible: true, open: true, fields: [
              UI.field({ label: 'Margem do papel (mm)', type: 'number', value: '8', span: 6, num: true, align: 'right' }),
              UI.field({ label: 'Espaço entre etiquetas (mm)', type: 'number', value: '3', span: 6, num: true, align: 'right' }),
              UI.field({ label: 'Começar na posição', type: 'number', value: '1', span: 6, num: true, align: 'right', help: 'Use para aproveitar uma folha já usada.' })
            ] }) + '</div></div>' +
          '<div class="label-preview"><p class="block-sub num">1 etiqueta · 1 folha · 62,7 × 36,0 mm</p>' +
            '<div class="label-card"><strong>' + esc(P.nome) + '</strong>' + barcode(P.barras) + '<span class="mono num">' + P.barras + '</span><span class="mono">' + P.sku + '</span></div>' +
            '<p class="help">Use escala de 100% e desative cabeçalhos e rodapés. Confira as medidas da folha e teste a leitura antes de imprimir o lote.</p></div></div>',
        right: UI.btn({ label: 'Imprimir etiquetas', icon: 'file', variant: 'primary' })
      });
      if (q.modal === 'historico') html += UI.modal({
        title: 'Movimentos · ' + P.nome, size: 'lg', footer: false,
        body: UI.dataTable({
          columns: [{ label: 'Data', key: 'data', num: true }, { label: 'Quantidade', align: 'right', num: true, render: function (r) { return '<span class="text-success">' + r.qtd + '</span>'; } }, { label: 'Motivo', key: 'motivo' }, { label: 'Operador', key: 'op', num: true }],
          rows: [{ data: '18/11/2026, 21:47:56', qtd: '+10', motivo: 'Ajuste rápido de estoque', op: '#4' }, { data: '07/11/2026, 22:48:34', qtd: '+10', motivo: 'Estoque inicial', op: '#4' }]
        })
      });
      return html;
    }
  });
  print(R + 'Avante_ProdutosEServicos_ProdutosEServicos.png', '#/catalogo/produtos', 'Produtos e serviços');
  print(R + 'Avante_ProdutosEServicos_ProdutosEServicos_OpccoesDeTela.png', '#/catalogo/produtos?modal=opcoes', 'Opções da tela');
  print(R + 'Avante_ProdutosEServicos_AcoesDoProduto.png', '#/catalogo/produtos?busca=1&modal=acoes', 'Ações do produto');
  print(R + 'Avante_ProdutosEServicos_AcoesDoProduto_Arquivar.png', '#/catalogo/produtos?modal=arquivar', 'Arquivar produto');
  print(R + 'Avante_ProdutosEServicos_AcoesDoProduto_ImprimirEtiqueta.png', '#/catalogo/produtos?modal=etiqueta', 'Imprimir etiqueta');
  print(R + 'Avante_ProdutosEServicos_acoesDoProduto_HistoricoDeHestoque.png', '#/catalogo/produtos?modal=historico', 'Histórico de estoque');
  print(R + 'Avante_ProdutosEServicos_CadastrarProdutos_Cadastro.png', '#/catalogo/produtos?modal=produto', 'Novo produto · Cadastro');
  print(R + 'Avante_ProdutosEServicos_CadastrarProduto_Precos.png', '#/catalogo/produtos?modal=produto&tab=precos', 'Novo produto · Preços');
  print(R + 'Avante_ProdutosEServicos_CadastrarProduto_Estoque.png', '#/catalogo/produtos?modal=produto&tab=estoque', 'Novo produto · Estoque');
  print(R + 'Avante_ProdutosEServicos_CadastrarProduto_Fiscal.png', '#/catalogo/produtos?modal=produto&tab=fiscal', 'Novo produto · Fiscal');
  print(R + 'Avante_ProdutosEServicos_CadastrarProduto_Fornescedor.png', '#/catalogo/produtos?modal=produto&tab=fornecedor', 'Novo produto · Fornecedor');
  print(R + 'Avante_ProdutosEServicos_CadastrarProduto_Adicionais.png', '#/catalogo/produtos?modal=produto&tab=adicionais', 'Novo produto · Opcionais');
  print(R + 'Avante_ProdutosEServicos_CadastrarServiço_Cadastro.png', '#/catalogo/produtos?modal=servico', 'Novo serviço · Cadastro');
  print(R + 'Avante_ProdutosEServicos_NovoServico_CadastrarServico_Valores.png', '#/catalogo/produtos?modal=servico&tab=precos', 'Novo serviço · Preços');
  print(R + 'Avante_ProdutosEServicos_NovoServico_CadastrarServico_Adicionais_NaoViUtilidadeEporque.png', '#/catalogo/produtos?modal=servico&tab=adicionais', 'Novo serviço · Opcionais');
  print(R + 'Avante_ProdutosEServicos_NovoServico_Prestacao.png', '#/catalogo/produtos?modal=servico&tab=prestacao', 'Novo serviço · Prestação');
  print(R + 'Avante_Mensagem_DesejaContinuareditando.png', '#/catalogo/produtos?modal=servico&tab=prestacao&sair=1', 'Aviso: alterações não salvas');

  /* ---------- Categorias ---------- */
  screen('#/catalogo/categorias', {
    title: 'Categorias',
    render: function () {
      return UI.page(UI.pageHeader({ crumbs: [{ label: 'Catálogo' }, { label: 'Categorias' }], title: 'Categorias' }) +
        UI.dataTable({
          columns: [{ label: 'Categoria', key: 'nome' }, { label: 'Produtos', align: 'right', num: true, render: function (r) { return int(r.qtd); } }],
          rows: [{ nome: 'Camiseta', qtd: 1 }],
          actions: function () { return UI.btn({ label: 'Ver produtos', icon: 'arrowRight', size: 'sm', href: '#/catalogo/produtos?busca=1' }); },
          empty: { icon: 'grid', title: 'Nenhuma categoria.', text: 'Categorias são criadas no cadastro do produto.' }
        }));
    }
  });
  print(R + 'Avante_ProdutosEServicos_Categorias.png', '#/catalogo/categorias', 'Categorias');

  /* ---------- Inventário (contagens de estoque) ---------- */
  screen('#/catalogo/inventario', {
    title: 'Inventário',
    render: function (q) {
      var html = UI.page(UI.pageHeader({ crumbs: [{ label: 'Catálogo' }, { label: 'Inventário' }], title: 'Inventário', sub: 'Contagens de estoque. O saldo só muda depois da aprovação.', actions: [UI.btn({ label: 'Nova contagem', icon: 'plus', variant: 'primary', href: UI.href({ modal: 'nova' }) })] }) +
        UI.dataTable({
          columns: [{ label: 'Contagem', key: 'nome' }, { label: 'Criada em', key: 'data', num: true }, { label: 'Situação', render: function () { return UI.badge('pending', 'Em contagem'); } }],
          rows: [{ nome: 'Teste', data: '07/11/2026, 23:05:36' }],
          actions: function () { return UI.btn({ label: 'Abrir contagem', size: 'sm', href: UI.href({ modal: 'abrir' }) }); },
          empty: { icon: 'inbox', title: 'Nenhuma contagem.', actions: [UI.btn({ label: 'Nova contagem', icon: 'plus', variant: 'primary', size: 'sm', href: UI.href({ modal: 'nova' }) })] }
        }));
      if (q.modal === 'nova') html += UI.modal({
        title: 'Nova contagem', size: 'md',
        body: '<div class="form-grid">' + UI.field({ label: 'Nome', placeholder: 'Ex.: Contagem da prateleira A', required: true }) + '</div>' +
          UI.formSection({ title: 'Produtos', desc: 'Conte os itens fisicamente; o estoque só muda após aprovação.', fields: [
            '<div class="item-rows" style="grid-column: span 12"><div class="item-row"><div class="spacer">' + UI.field({ type: 'search', placeholder: 'Buscar nome, SKU ou código de barras' }) + '</div>' + UI.btn({ label: 'Remover', icon: 'x', variant: 'danger-outline', size: 'sm' }) + '</div>' +
              '<div class="suggest"><p class="block-sub">Sugestões recentes</p><div class="suggest-item"><span class="thumb">' + icon('box', 14) + '</span><span class="spacer"><span class="cell-main">' + esc(P.nome) + '</span><span class="cell-sub num">SKU ' + P.sku + '</span></span>' + UI.btn({ label: 'Selecionar', icon: 'arrowRight', variant: 'ghost', size: 'sm' }) + '</div></div></div>',
            '<div style="grid-column: span 12">' + UI.btn({ label: 'Adicionar produto', icon: 'plus', size: 'sm' }) + '</div>'
          ] }),
        primary: 'Criar contagem'
      });
      if (q.modal === 'abrir') html += UI.modal({
        title: 'Teste', sub: UI.badge('pending', 'Em contagem'), size: 'lg',
        body: '<div class="pdv-search">' + icon('search', 16, 'muted') + '<input class="input" placeholder="Ler código de barras ou SKU" aria-label="Ler código de barras ou SKU"/></div>' +
          '<div style="margin-top:12px">' + UI.dataTable({ footer: false, columns: [
            { label: 'Produto', render: function (r) { return '<span class="cell-main">' + esc(r.nome) + '</span><span class="cell-sub num">' + r.sku + '</span>'; } },
            { label: 'Saldo da contagem', align: 'right', num: true, render: function () { return '20'; } },
            { label: 'Saldo atual', align: 'right', num: true, render: function () { return '20'; } },
            { label: 'Quantidade contada', align: 'right', render: function () { return '<input class="input num r count-input" placeholder="Não contado" aria-label="Quantidade contada"/>'; } }
          ], rows: [P] }) + '</div>' +
          '<p class="help" style="margin-top:8px">Salvar registra a contagem; enviar solicita revisão. Aprovar aplica as diferenças ao estoque.</p>',
        footLeft: UI.btn({ label: 'Cancelar contagem', variant: 'danger-outline', href: UI.href({ modal: 'cancelar' }) }),
        right: UI.btn({ label: 'Enviar para revisão' }) + UI.btn({ label: 'Salvar quantidades', variant: 'primary' })
      });
      if (q.modal === 'cancelar') html += UI.confirm({ title: 'Cancelar a contagem “Teste”?', text: 'As quantidades contadas serão descartadas e o estoque não muda.', action: 'Cancelar contagem' });
      return html;
    }
  });
  print(R + 'Avante_ProdutosEServicos_ContagemDeEstoque.png', '#/catalogo/inventario', 'Inventário');
  print(R + 'Avante_ProdutosEServicos_ContagemDeEstoque_NovaContagem.png', '#/catalogo/inventario?modal=nova', 'Inventário · nova contagem');
  print(R + 'Avante_ProdutosEServicos_ContagemDeEstoque_AbriContagem.png', '#/catalogo/inventario?modal=abrir', 'Inventário · contagem aberta');

  /* ---------- Fichas técnicas e Insumos ---------- */
  function recipeHeader(active) {
    return UI.pageHeader({ crumbs: [{ label: 'Catálogo' }, { label: active === 'fichas' ? 'Fichas técnicas' : 'Insumos' }], title: active === 'fichas' ? 'Fichas técnicas' : 'Insumos',
      sub: 'Fichas técnicas dizem quais insumos cada produto fabricado consome.',
      actions: [UI.btn({ label: 'Mapa de fichas técnicas', icon: 'file' }), UI.btn({ label: 'Cadastrar insumo', icon: 'plus', variant: active === 'insumos' ? 'primary' : 'outline', href: UI.href({ modal: 'insumo' }) })]
        .concat(active === 'fichas' ? [UI.btn({ label: 'Criar ficha técnica', icon: 'plus', variant: 'primary', href: UI.href({ modal: 'escolher' }) })] : []) }) +
      UI.tabs([{ id: 'fichas', label: 'Fichas técnicas', icon: 'file', href: '#/catalogo/fichas-tecnicas' }, { id: 'insumos', label: 'Estoque de insumos', icon: 'inbox', href: '#/catalogo/insumos' }], active);
  }

  screen('#/catalogo/fichas-tecnicas', {
    title: 'Fichas técnicas',
    render: function (q) {
      var html = UI.page(recipeHeader('fichas') +
        '<div class="card filter-bar"><div class="filter-row"><div class="filter-search">' + UI.field({ type: 'search', placeholder: 'Buscar ficha técnica, produto ou SKU' }) + '</div>' + UI.filter('Situação', ['Ativas', 'Arquivadas', 'Todas']) + UI.btn({ label: 'Buscar', variant: 'secondary' }) + '</div></div>' +
        '<div class="card table-card">' + UI.emptyState({ icon: 'file', title: 'Nenhuma ficha técnica cadastrada', text: 'Comece escolhendo o produto que sua empresa fabrica.', actions: [UI.btn({ label: 'Criar ficha técnica', icon: 'plus', variant: 'primary', size: 'sm', href: UI.href({ modal: 'escolher' }) })] }) +
          '<div class="table-foot"><span class="num">0 registros</span>' + UI.pager() + '</div></div>');
      if (q.modal === 'escolher') html += UI.modal({
        title: 'Escolha o produto fabricado', size: 'md',
        body: '<div class="form-grid">' + UI.field({ label: 'Produto', type: 'search', placeholder: 'Buscar nome, SKU ou código de barras', required: true }) +
          '<div class="suggest" style="grid-column: span 12"><p class="block-sub">Sugestões recentes</p><div class="suggest-item"><span class="thumb">' + icon('box', 14) + '</span><span class="spacer"><span class="cell-main">' + esc(P.nome) + '</span><span class="cell-sub num">SKU ' + P.sku + '</span></span>' + UI.btn({ label: 'Selecionar', icon: 'arrowRight', variant: 'ghost', size: 'sm', href: UI.href({ modal: 'nova' }) }) + '</div></div>' +
          '<p class="field-error" style="grid-column: span 12">' + icon('alert', 14) + 'Escolha um produto cadastrado.</p></div>',
        right: '<a class="btn btn-outline" href="' + UI.href({ modal: null }) + '">Cancelar</a>' + UI.btn({ label: 'Continuar', variant: 'primary', href: UI.href({ modal: 'nova' }) })
      });
      if (q.modal === 'nova') html += UI.modal({
        title: 'Nova ficha técnica', size: 'lg',
        body: '<div class="form-grid">' + UI.field({ label: 'Nome da ficha técnica', required: true }) + '</div>' +
          UI.formSection({ title: 'Insumos por unidade de ' + P.nome, fields: [
            '<div class="item-rows" style="grid-column: span 12"><div class="form-grid recipe-row">' +
              UI.field({ label: 'Insumo', type: 'search', placeholder: 'Buscar nome, SKU ou código', span: 6 }) +
              UI.field({ label: 'Quantidade por produto', type: 'number', value: '1', span: 3, num: true, align: 'right' }) +
              UI.field({ label: 'Perda adicional (%)', type: 'percent', value: '0', span: 2 }) +
              '<div class="field" style="grid-column: span 1; justify-content:flex-end">' + UI.btn({ icon: 'x', variant: 'danger-outline', cls: 'btn-icon', aria: 'Remover insumo' }) + '</div></div></div>',
            '<div style="grid-column: span 12">' + UI.btn({ label: 'Adicionar insumo', icon: 'plus', size: 'sm' }) + '</div>'
          ] }),
        primary: 'Salvar'
      });
      if (q.modal === 'insumo') html += ItemModal('insumo', q, '#/catalogo/fichas-tecnicas');
      return html;
    }
  });
  print(R + 'Avante_ProdutosEServicos_ReceitasDeProdutos.png', '#/catalogo/fichas-tecnicas', 'Fichas técnicas');
  print(R + 'Avante_ReceitaDeProdutos_CriarReceita_EscollhaProduto.png', '#/catalogo/fichas-tecnicas?modal=escolher', 'Ficha técnica · escolher produto');
  print(R + 'Avante_ReceitasDeProdutos_CriandoReceita.png', '#/catalogo/fichas-tecnicas?modal=nova', 'Ficha técnica · montando');
  print(R + 'Avante_ProdutosEServicos_ReceitaDeProdutos_CadastrarInsumo_eomesmoquecadastrarProduto.png', '#/catalogo/fichas-tecnicas?modal=insumo', 'Novo insumo');

  screen('#/catalogo/insumos', {
    title: 'Insumos',
    render: function (q) {
      var html = UI.page(recipeHeader('insumos') +
        '<div class="card filter-bar"><div class="filter-row"><div class="filter-search">' + UI.field({ type: 'search', placeholder: 'Buscar insumo ou SKU' }) + '</div>' + UI.btn({ label: 'Buscar', variant: 'secondary' }) + '</div></div>' +
        UI.dataTable({
          columns: [{ label: 'Insumo' }, { label: 'Saldo', align: 'right' }, { label: 'Mínimo', align: 'right' }],
          rows: [],
          empty: { icon: 'inbox', title: 'Nenhum insumo cadastrado.', text: 'Insumos são itens usados na produção e não aparecem no PDV.', actions: [UI.btn({ label: 'Cadastrar insumo', icon: 'plus', variant: 'primary', size: 'sm', href: UI.href({ modal: 'insumo' }) })] }
        }));
      if (q.modal === 'insumo') html += ItemModal('insumo', q, '#/catalogo/insumos');
      return html;
    }
  });
  print(R + 'Avante_ReceitaDeProdutos_estoqueDeInsumos.png', '#/catalogo/insumos', 'Insumos');
})();
