/* Clientes: lista (Ativos · Arquivados), novo, editar, arquivar. Reutilizada no PDV. */
(function () {
  var R = 'referencias/';
  var CLIENTE = { nome: 'João Victor Pertile', doc: null, tel: '49999468030', email: 'joaovictorpertile7@gmail.com', pais: 'Brasil', cidade: 'Xanxerê SC', endereco: 'Xanxerê' };

  function clientForm(v) {
    v = v || {};
    return '<div class="form-grid">' +
      UI.field({ label: 'Nome', value: v.nome, required: true }) +
      UI.field({ label: 'CPF/CNPJ', value: v.doc, span: 6, num: true }) +
      UI.field({ label: 'Telefone', type: 'tel', value: v.tel, span: 6, num: true }) +
      UI.field({ label: 'E-mail', type: 'email', value: v.email, span: 6 }) +
      UI.field({ label: 'País', type: 'select', options: ['Não informado', 'Brasil'], value: v.pais || 'Não informado', span: 6 }) +
      UI.field({ label: 'Cidade', value: v.cidade, span: 6 }) +
      UI.field({ label: 'Endereço', type: 'textarea', value: v.endereco }) +
    '</div>';
  }
  window.ClientForm = clientForm;

  /* Página de clientes compartilhada entre ERP e PDV */
  window.ClientsPage = function (o) {
    var q = o.query || {};
    var tab = q.tab || 'ativos';
    var arch = tab === 'arquivados';
    var rows = arch ? [] : o.rows;
    var html = UI.pageHeader({ crumbs: o.crumbs, title: 'Clientes', actions: [UI.btn({ label: 'Novo cliente', icon: 'plus', variant: 'primary', href: UI.href({ modal: 'novo' }) })] }) +
      UI.dataTable({
        toolbar: UI.tabs([{ id: 'ativos', label: 'Ativos', count: o.rows.length }, { id: 'arquivados', label: 'Arquivados', count: 0 }], tab, { pills: true }) +
          '<div class="row nowrap search-inline">' + UI.field({ type: 'search', placeholder: 'Buscar CPF ou CNPJ exato' }) + UI.btn({ label: 'Buscar', variant: 'secondary' }) + '</div>',
        columns: [
          { label: 'Cliente', render: function (r) { return '<span class="cell-main">' + esc(r.nome) + '</span>' + (r.sub ? '<span class="cell-sub">' + esc(r.sub) + '</span>' : ''); } },
          { label: 'CPF/CNPJ', num: true, render: function (r) { return r.doc || '—'; } },
          { label: 'Telefone', key: 'tel', num: true },
          { label: 'E-mail', key: 'email' }
        ],
        rows: rows,
        actions: function () {
          return UI.btn({ label: 'Editar', size: 'sm', href: UI.href({ modal: 'editar' }) }) +
            UI.btn({ icon: 'inbox', variant: 'ghost', size: 'sm', cls: 'btn-icon', aria: 'Arquivar cliente', href: UI.href({ modal: 'arquivar' }) });
        },
        empty: arch
          ? { icon: 'inbox', title: 'Nenhum cliente arquivado.', text: 'Clientes arquivados saem das buscas e das vendas, mas mantêm o histórico. Use “Arquivar” na lista de ativos.' }
          : { icon: 'users', title: 'Nenhum cliente cadastrado.', actions: [UI.btn({ label: 'Novo cliente', icon: 'plus', variant: 'primary', size: 'sm', href: UI.href({ modal: 'novo' }) })] }
      });
    if (q.modal === 'novo') html += UI.modal({ title: 'Novo cliente', body: clientForm(), primary: 'Salvar' });
    if (q.modal === 'editar') html += UI.modal({ title: 'Editar cliente', body: clientForm(CLIENTE), primary: 'Salvar' });
    if (q.modal === 'arquivar') html += UI.confirm({ title: 'Arquivar cliente?', text: '<strong>' + esc(CLIENTE.nome) + '</strong> sai da lista de ativos e das buscas de venda. Você pode restaurar pela aba Arquivados.', action: 'Arquivar' });
    return html;
  };

  screen('#/clientes', {
    title: 'Clientes',
    render: function (q) { return UI.page(ClientsPage({ query: q, rows: [CLIENTE], crumbs: [{ label: 'Clientes' }] })); }
  });
  print(R + 'Avante_Clientes.png', '#/clientes', 'Clientes');
  print(R + 'Avante_Clientes_Arquvidos_EssaNaoSeiUtilidadeSugerirAlgoMelhor.png', '#/clientes?tab=arquivados', 'Clientes · arquivados (aba)');
  print(R + 'Avante_Clientes_NovoCliente.png', '#/clientes?modal=novo', 'Clientes · novo');
  print(R + 'Avante_Clientes_EditarCliente.png', '#/clientes?modal=editar', 'Clientes · editar');
})();
