/* Fornecedores e frete: Fornecedores (lista, ficha, novo), Transportadoras (lista, nova, cotar frete, conta Melhor Envio). */
(function () {
  var R = 'referencias/';
  var PESSOA = { nome: 'João Victor Pertile', doc: '12181472963', contato: 'João Victor Pertile', tel: '49999468030', email: 'joaovictorpertile7@gmail.com', pais: 'Brasil', cidade: 'Xanxerê SC', endereco: 'Xanxerê' };

  function partyForm(kind, v) {
    v = v || {};
    var transp = kind === 'transportadora';
    return '<div class="info' + (transp ? ' is-success' : '') + '">' + icon(transp ? 'truck' : 'box', 15) + (transp ? 'Cadastro de transporte' : 'Cadastro de fornecimento') + '</div>' +
      UI.formSection({ title: 'Identificação', fields: [
        UI.field({ label: transp ? 'Nome da transportadora' : 'Nome do fornecedor', value: v.nome, required: true }),
        UI.field({ label: 'CPF/CNPJ', value: v.doc, span: 6, num: true }),
        UI.field({ label: 'Inscrição estadual', span: 6, num: true })
      ] }) +
      UI.formSection({ title: transp ? 'Operação de transporte' : 'Fornecimento', fields: (transp ? [
        UI.field({ label: 'Marca', type: 'select', options: ['Correios', 'Jadlog', 'Loggi', 'Outra'], span: 6 }),
        UI.field({ label: 'Plataforma de frete', type: 'select', options: ['Outra plataforma', 'Melhor Envio'], span: 6 })
      ] : []).concat([
        UI.field({ label: 'Prazo habitual (dias)', type: 'number', value: '0', span: 6, num: true, align: 'right' }),
        UI.field({ label: 'Condições de pagamento', span: 6 })
      ]).concat(transp ? [] : [UI.field({ type: 'checkbox', label: 'Também presta serviço de transporte' })]) }) +
      UI.formSection({ title: 'Contatos e localização', fields: [
        UI.field({ label: 'Pessoa de contato', value: v.contato }),
        UI.field({ label: 'Telefone', type: 'tel', value: v.tel, span: 6, num: true }),
        UI.field({ label: 'E-mail', type: 'email', value: v.email, span: 6 }),
        UI.field({ label: 'País', type: 'select', options: ['Não informado', 'Brasil'], value: v.pais || 'Não informado', span: 6 }),
        UI.field({ label: 'Cidade', value: v.cidade, span: 6 }),
        UI.field({ label: 'Endereço', type: 'textarea', value: v.endereco })
      ] }) +
      UI.formSection({ title: 'Observações internas', collapsible: true, fields: [UI.field({ type: 'textarea', label: 'Observações', optional: true })] });
  }

  function partyList(o) {
    var q = o.query;
    var tab = q.tab || 'ativos';
    var rows = tab === 'arquivados' ? [] : o.rows;
    return UI.dataTable({
      toolbar: UI.tabs([{ id: 'ativos', label: 'Ativos', count: o.rows.length }, { id: 'arquivados', label: 'Arquivados', count: 0 }], tab, { pills: true }) +
        '<div class="search-inline">' + UI.field({ type: 'search', placeholder: 'Nome, CPF/CNPJ ou e-mail' }) + '</div>',
      columns: o.columns, rows: rows, actions: o.actions,
      empty: tab === 'arquivados'
        ? { icon: 'inbox', title: 'Nenhum cadastro arquivado.', text: 'Cadastros arquivados saem das buscas, mas mantêm o histórico.' }
        : { icon: o.icon, title: 'Nenhum cadastro encontrado.', actions: [o.emptyAction] }
    });
  }

  /* ---------- Fornecedores ---------- */
  screen('#/fornecedores', {
    title: 'Fornecedores',
    render: function (q) {
      var html = UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Fornecedores e frete' }, { label: 'Fornecedores' }], title: 'Fornecedores', actions: [UI.btn({ label: 'Novo fornecedor', icon: 'plus', variant: 'primary', href: UI.href({ modal: 'novo' }) })] }) +
        partyList({
          query: q, rows: [PESSOA], icon: 'box',
          columns: [
            { label: 'Fornecedor', render: function (r) { return '<span class="cell-flex"><span class="thumb">' + icon('box', 14) + '</span><span><span class="cell-main">' + esc(r.nome) + '</span><span class="cell-sub">' + esc(r.contato) + '</span></span></span>'; } }
          ],
          actions: function () { return UI.btn({ label: 'Ver ficha', size: 'sm', href: UI.href({ modal: 'ficha' }) }); },
          emptyAction: UI.btn({ label: 'Novo fornecedor', icon: 'plus', variant: 'primary', size: 'sm', href: UI.href({ modal: 'novo' }) })
        }));
      if (q.modal === 'novo') html += UI.modal({ title: 'Novo fornecedor', size: 'sheet', body: partyForm('fornecedor'), primary: 'Salvar' });
      if (q.modal === 'ficha') html += UI.modal({
        title: 'Fornecedor', size: 'lg',
        body: '<div class="doc-summary"><span class="cell-flex"><span class="thumb">' + icon('box', 15) + '</span><span><span class="cell-sub">Fornecedor</span><strong class="doc-name">' + esc(PESSOA.nome) + '</strong></span></span></div>' +
          '<div class="row" style="margin-bottom:12px">' +
            UI.btn({ label: 'Registrar conta a pagar', icon: 'plus', variant: 'primary', href: '#/financeiro/contas-a-pagar?modal=novo' }) +
            UI.btn({ label: 'Editar cadastro', icon: 'sliders' }) +
            UI.btn({ label: 'Relatório de pagamentos', icon: 'chart', href: '#/relatorios' }) +
            '<span class="spacer"></span>' + UI.btn({ label: 'Arquivar', icon: 'inbox', variant: 'ghost', href: UI.href({ modal: 'arquivar' }) }) + '</div>' +
          UI.kpis([{ label: 'Pago neste mês', value: brl(0), raw: 0 }, { label: 'Total pago', value: brl(0), raw: 0 }]) +
          '<div class="stack" style="margin-top:12px">' +
            UI.card({ title: 'Condições de fornecimento', body: UI.dl([['Prazo habitual', 'Não informado'], ['Pagamento', 'antes']]) }) +
            UI.card({ title: 'Identificação e contato', body: UI.dl([['CPF/CNPJ', PESSOA.doc, true], ['Pessoa de contato', PESSOA.contato], ['Telefone', PESSOA.tel, true], ['E-mail', PESSOA.email], ['Endereço', PESSOA.endereco]]) }) +
          '</div>',
        footer: false
      });
      if (q.modal === 'arquivar') html += UI.confirm({ title: 'Arquivar fornecedor?', text: '<strong>' + esc(PESSOA.nome) + '</strong> sai da lista de ativos. O histórico de pagamentos é mantido.', action: 'Arquivar' });
      return html;
    }
  });
  print(R + 'Avantes_Fornecedores_TelaDeInfoDoFornecedor.png', '#/fornecedores?modal=ficha', 'Fornecedor · ficha');
  print(R + 'Avante_Fornecedores_NovoFornecedor.png', '#/fornecedores?modal=novo', 'Fornecedor · novo');

  /* ---------- Transportadoras ---------- */
  screen('#/fornecedores/transportadoras', {
    title: 'Transportadoras',
    render: function (q) {
      var html = UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Fornecedores e frete' }, { label: 'Transportadoras' }], title: 'Transportadoras', actions: [
          UI.btn({ label: 'Conta Melhor Envio', icon: 'link', href: UI.href({ modal: 'melhor-envio' }) }),
          UI.btn({ label: 'Cotar frete', icon: 'truck', href: UI.href({ modal: 'cotar' }) }),
          UI.btn({ label: 'Nova transportadora', icon: 'plus', variant: 'primary', href: UI.href({ modal: 'nova' }) })
        ] }) +
        partyList({
          query: q, rows: [PESSOA], icon: 'truck',
          columns: [
            { label: 'Transportadora', render: function (r) { return '<span class="cell-flex"><span class="thumb">' + icon('truck', 14) + '</span><span><span class="cell-main">' + esc(r.nome) + '</span><span class="cell-sub">Correios · ' + esc(r.contato) + '</span></span></span>'; } },
            { label: 'Plataforma de frete', align: 'right', render: function () { return '<span class="muted">Outra plataforma</span>'; } }
          ],
          actions: function () { return UI.btn({ label: 'Editar', size: 'sm', href: UI.href({ modal: 'nova' }) }); },
          emptyAction: UI.btn({ label: 'Nova transportadora', icon: 'plus', variant: 'primary', size: 'sm', href: UI.href({ modal: 'nova' }) })
        }));
      if (q.modal === 'nova') html += UI.modal({ title: 'Nova transportadora', size: 'sheet', body: partyForm('transportadora', PESSOA), primary: 'Salvar' });
      if (q.modal === 'cotar') html += UI.modal({
        title: 'Cotar frete · Melhor Envio', size: 'md',
        body: '<div class="form-grid">' +
          UI.field({ label: 'CEP de origem', span: 6, num: true, placeholder: '00000-000' }) +
          UI.field({ label: 'CEP de destino', span: 6, num: true, placeholder: '00000-000' }) +
          UI.field({ label: 'Peso (gramas)', type: 'number', value: '500', span: 6, num: true, align: 'right' }) +
          UI.field({ label: 'Largura (cm)', type: 'number', value: '10', span: 6, num: true, align: 'right' }) +
          UI.field({ label: 'Altura (cm)', type: 'number', value: '10', span: 6, num: true, align: 'right' }) +
          UI.field({ label: 'Comprimento (cm)', type: 'number', value: '10', span: 6, num: true, align: 'right' }) +
          UI.field({ label: 'Valor segurado (R$)', type: 'money', value: '0,00', span: 6 }) + '</div>',
        primary: 'Consultar frete'
      });
      if (q.modal === 'melhor-envio') html += UI.modal({
        title: 'Conta do Melhor Envio', size: 'sm',
        body: '<div class="info">' + icon('link', 16) + '<strong>Conecte sua conta</strong></div><p class="help" style="margin-top:8px">O administrador do Avante precisa configurar o aplicativo para esta empresa.</p>',
        footer: false
      });
      return html;
    }
  });
  print(R + 'Avante_Fornecedor_Transportadoras.png', '#/fornecedores/transportadoras', 'Transportadoras');
  print(R + 'Avante_Fornecedores_Transportadora_NovaTransportadora.png', '#/fornecedores/transportadoras?modal=nova', 'Transportadora · nova');
  print(R + 'Avante_Fornecedores_Transportadoras_Arquivados.png', '#/fornecedores/transportadoras?tab=arquivados', 'Transportadoras · arquivadas (aba)');
  print(R + 'Avante_Forenecedores_Transportadoras_CotarFrente.png', '#/fornecedores/transportadoras?modal=cotar', 'Cotar frete');
  print(R + 'Avante_Fornecedores_Transportadoras_CotarComMelhorEnvio.png', '#/fornecedores/transportadoras?modal=melhor-envio', 'Conta Melhor Envio');
})();
