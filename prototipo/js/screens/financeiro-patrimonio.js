/* Financeiro — Patrimônio e Cadastros: Empréstimos, Investimentos, Consórcios, Bens e patrimônio, Contratos,
   Plano de contas, Centros de custo. */
(function () {
  var F = 'referencias/ContabilSemdados/MaisDoFinanceiro/';

  function crumbs(l) { return [{ label: 'Financeiro' }, { label: l }]; }

  /* Telas do menu sem print de referência: estrutura mínima, sem campos inventados */
  function pending(title, text) {
    return function () {
      return UI.page(UI.pageHeader({ crumbs: crumbs(title), title: title }) +
        UI.card({ body: UI.emptyState({ icon: 'image', title: 'Tela aguardando print de referência', text: text + ' Não há captura desta tela em referencias/, então os campos não foram desenhados para não inventar conteúdo.' }) }));
    };
  }
  screen('#/financeiro/emprestimos', { title: 'Empréstimos', render: pending('Empréstimos', 'Empréstimos tomados pela empresa e suas parcelas.') });
  screen('#/financeiro/bens', { title: 'Bens e patrimônio', render: pending('Bens e patrimônio', 'Imóveis, veículos e outros bens da empresa.') });

  /* ---------- Investimentos ---------- */
  screen('#/financeiro/investimentos', {
    title: 'Investimentos',
    render: function (q) {
      var tab = q.tab || 'ativas';
      return UI.page(UI.pageHeader({ crumbs: crumbs('Investimentos'), title: 'Investimentos', sub: 'Aplicações financeiras da empresa.', actions: [UI.btn({ label: 'Criar aplicação', icon: 'plus', variant: 'primary' })] }) +
        UI.tabs([{ id: 'ativas', label: 'Ativas' }, { id: 'arquivadas', label: 'Arquivadas' }], tab, { pills: true }) +
        UI.card({ body: UI.emptyState(tab === 'arquivadas' ? { icon: 'inbox', title: 'Nenhuma aplicação arquivada.' } : { icon: 'bank', title: 'Suas aplicações financeiras', text: 'Vincule a aplicação a um banco para registrar aportes, resgates e rendimentos.', actions: [UI.btn({ label: 'Criar aplicação', icon: 'plus', variant: 'primary', size: 'sm' })] }) }));
    }
  });
  print(F + 'Avante_AplicaçõesFinanceiras.png', '#/financeiro/investimentos', 'Investimentos');

  /* ---------- Consórcios ---------- */
  screen('#/financeiro/consorcios', {
    title: 'Consórcios',
    render: function (q) {
      var tab = q.tab || 'acompanhamento';
      return UI.page(UI.pageHeader({ crumbs: crumbs('Consórcios'), title: 'Consórcios', actions: [UI.btn({ label: 'Cadastrar consórcio', icon: 'plus', variant: 'primary' })] }) +
        UI.tabs([{ id: 'acompanhamento', label: 'Em acompanhamento' }, { id: 'encerrados', label: 'Encerrados' }], tab, { pills: true }) +
        UI.card({ body: UI.emptyState(tab === 'encerrados' ? { icon: 'inbox', title: 'Nenhum consórcio encerrado.' } : { icon: 'bank', title: 'Seus consórcios em um só lugar', text: 'Registre o contrato e acompanhe os títulos de cada parcela.', actions: [UI.btn({ label: 'Cadastrar consórcio', icon: 'plus', variant: 'primary', size: 'sm' })] }) }));
    }
  });
  print(F + 'Avante_Consorcios.png', '#/financeiro/consorcios', 'Consórcios');

  /* ---------- Contratos ---------- */
  var CONTRATO = { nome: 'teste', parte: 'sdasd', vigencia: '20/11/2026 em diante', tipo: 'Serviços' };
  screen('#/financeiro/contratos', {
    title: 'Contratos',
    render: function (q) {
      var tab = q.tab || 'ativos';
      var rows = tab === 'arquivados' ? [] : [CONTRATO];
      var html = UI.page(UI.pageHeader({ crumbs: crumbs('Contratos'), title: 'Contratos', sub: 'Carteira de contratos: documentos, partes e datas de vigência.', actions: [UI.btn({ label: 'Cadastrar contrato', icon: 'plus', variant: 'primary', href: UI.href({ modal: 'novo' }) })] }) +
        UI.dataTable({
          toolbar: UI.tabs([{ id: 'ativos', label: 'Ativos', count: 1 }, { id: 'arquivados', label: 'Arquivados', count: 0 }], tab, { pills: true }),
          columns: [
            { label: 'Contrato', render: function (r) { return '<span class="cell-flex"><span class="thumb">' + icon('file', 14) + '</span><span><span class="cell-main">' + esc(r.nome) + '</span><span class="cell-sub">' + esc(r.parte) + '</span></span></span>'; } },
            { label: 'Vigência', render: function () { return UI.badge('success', 'Prazo indeterminado'); } }
          ],
          rows: rows,
          actions: function () { return UI.btn({ label: 'Abrir', icon: 'chevRight', size: 'sm', href: UI.href({ modal: 'ver' }) }); },
          empty: tab === 'arquivados' ? { icon: 'inbox', title: 'Nenhum contrato arquivado.' } : { icon: 'file', title: 'Nenhum contrato ativo.', actions: [UI.btn({ label: 'Cadastrar contrato', icon: 'plus', variant: 'primary', size: 'sm', href: UI.href({ modal: 'novo' }) })] }
        }));
      if (q.modal === 'ver') html += UI.modal({
        title: CONTRATO.nome, size: 'lg',
        body: '<div class="doc-summary"><span class="cell-flex"><span class="thumb">' + icon('file', 15) + '</span><span><span class="cell-sub">Parte contratante</span><strong class="doc-name">' + esc(CONTRATO.parte) + '</strong></span></span>' + UI.badge('success', 'Prazo indeterminado') + '</div>' +
          UI.dl([['Vigência', CONTRATO.vigencia, true], ['Tipo', CONTRATO.tipo]]) +
          '<div class="row" style="margin:12px 0">' + UI.btn({ label: 'Editar cadastro', icon: 'sliders', href: UI.href({ modal: 'novo' }) }) + '</div>' +
          UI.card({ title: 'Títulos vinculados', body: '<p class="empty-text">Nenhum título vinculado.</p>' }) +
          UI.formSection({ title: 'Documentos do contrato', desc: 'Nenhum documento anexado.', fields: [UI.field({ type: 'file', button: 'Anexar PDF ou foto' })] }),
        right: UI.btn({ label: 'Arquivar cadastro', icon: 'inbox', variant: 'danger-outline', href: UI.href({ modal: 'arquivar' }) })
      });
      if (q.modal === 'arquivar') html += UI.confirm({ title: 'Arquivar o contrato “teste”?', text: 'O contrato sai da carteira ativa. Títulos e documentos vinculados continuam no histórico.', action: 'Arquivar' });
      if (q.modal === 'novo') html += UI.modal({
        title: 'Cadastrar contrato', size: 'md',
        body: UI.formSection({ title: 'Partes e tipo', fields: [
            UI.field({ label: 'Nome do contrato', required: true }),
            UI.field({ label: 'Tipo', type: 'select', options: ['Outro', 'Serviços', 'Locação', 'Fornecimento'], span: 6 }),
            UI.field({ label: 'Outra parte', help: 'Pessoa ou empresa com quem o contrato foi firmado.' })
          ] }) +
          UI.formSection({ title: 'Vigência', fields: [
            UI.field({ label: 'Início da vigência', type: 'date', value: '2026-11-20', span: 6 }),
            UI.field({ label: 'Fim da vigência', type: 'date', optional: true, span: 6, help: 'Deixe em branco para prazo indeterminado.' })
          ] }) +
          UI.formSection({ title: 'Referência e observação', collapsible: true, fields: [UI.field({ label: 'Referência', optional: true }), UI.field({ label: 'Observação', type: 'textarea', optional: true })] }),
        primary: 'Salvar'
      });
      return html;
    }
  });
  print(F + 'Avante_ContratosCom dados.png', '#/financeiro/contratos', 'Contratos');
  print(F + 'Avante_Contrato_MaisInfoQuandoClicaNoContrato.png', '#/financeiro/contratos?modal=ver', 'Contrato · detalhe');
  print(F + 'Avante_Contratos_CadastrarContratos.png', '#/financeiro/contratos?modal=novo', 'Cadastrar contrato');

  /* ---------- Plano de contas ---------- */
  var RECEITAS = [
    ['Fora da DRE (movimento patrimonial)', []],
    ['Não classificada', [['Teste', 'Variável · DFC Não classificada']]],
    ['Receita bruta', []], ['Receitas financeiras', []], ['Outras receitas', []]
  ];
  var DESP_VISIVEIS = ['Água e saneamento', 'Aluguel', 'Aquisição de equipamentos', 'Assessoria jurídica', 'Benefícios da equipe', 'Combustível e estacionamento', 'Comissões', 'Compras de mercadorias', 'Condomínio', 'Viagens e hospedagem'];
  var DESPESAS = [
    ['Fora da DRE (movimento patrimonial)', []],
    ['Não classificada', DESP_VISIVEIS.map(function (n) { return [n, 'Comportamento não definido · DFC Não classificada']; }), 35],
    ['Deduções de receita', []], ['Custos', []], ['Despesas operacionais', []], ['Despesas financeiras', []], ['Outras despesas', []]
  ];

  screen('#/financeiro/plano-de-contas', {
    title: 'Plano de contas',
    render: function (q) {
      var tab = q.tab || 'receitas';
      var groups = tab === 'despesas' ? DESPESAS : RECEITAS;
      var total = tab === 'despesas' ? 35 : 1;
      var html = UI.page(
        UI.pageHeader({ crumbs: crumbs('Plano de contas'), title: 'Plano de contas', sub: 'Operações financeiras que classificam cada entrada e saída na DRE e na DFC.', actions: [UI.btn({ label: 'Arquivados', icon: 'inbox' })] }) +
        '<div class="row">' + UI.tabs([{ id: 'receitas', label: 'Receitas', icon: 'arrowIn' }, { id: 'despesas', label: 'Despesas', icon: 'arrowOut' }], tab, { pills: true }) +
          '<span class="spacer"></span><div style="width:280px">' + UI.field({ type: 'search', placeholder: 'Buscar operação financeira' }) + '</div></div>' +
        '<p class="block-sub num">' + total + ' de ' + total + ' operações' + (tab === 'despesas' ? ' · o protótipo mostra as 10 visíveis no print' : '') + '</p>' +
        '<div class="card coa">' + groups.map(function (g) {
          var count = g[2] || g[1].length;
          return '<details class="coa-group" open><summary>' + icon('chevDown', 14, 'chev') + '<strong>' + esc(g[0]) + '</strong><span class="spacer"></span><span class="count num">' + count + '</span></summary>' +
            (g[1].length ? '<ul class="coa-list">' + g[1].map(function (o) {
              return '<li><span class="spacer"><span class="cell-main">' + esc(o[0]) + '</span><span class="cell-sub">' + esc(o[1]) + '</span></span>' +
                UI.btn({ icon: 'sliders', variant: 'ghost', size: 'sm', cls: 'btn-icon', aria: 'Editar ' + o[0], href: UI.href({ modal: 'editar' }) }) +
                UI.btn({ icon: 'arrowRight', variant: 'ghost', size: 'sm', cls: 'btn-icon', aria: 'Ver lançamentos de ' + o[0], href: '#/financeiro/movimentacoes' }) +
                UI.btn({ icon: 'inbox', variant: 'ghost', size: 'sm', cls: 'btn-icon text-error', aria: 'Arquivar ' + o[0], href: UI.href({ modal: 'arquivar' }) }) + '</li>';
            }).join('') + '</ul>' : '<p class="coa-empty">Adicione operações neste grupo.</p>') +
            '<div class="coa-add">' + UI.btn({ label: 'Adicionar operação em ' + g[0], icon: 'plus', variant: 'ghost', size: 'sm', href: UI.href({ modal: 'nova' }) }) + '</div></details>';
        }).join('') + '</div>');
      if (q.modal === 'editar' || q.modal === 'nova') html += UI.modal({
        title: q.modal === 'editar' ? 'Editar operação financeira' : 'Nova operação financeira', size: 'md',
        body: '<div class="form-grid">' + UI.field({ label: 'Nome da operação', value: q.modal === 'editar' ? 'Teste' : '', required: true }) +
          UI.field({ label: 'Fixa ou variável', type: 'select', options: ['Variável', 'Fixa'], span: 6 }) +
          UI.field({ label: 'Atividade na DFC', type: 'select', options: ['Não classificada', 'Operacional', 'Investimento', 'Financiamento'], span: 6 }) + '</div>',
        primary: 'Salvar'
      });
      if (q.modal === 'arquivar') html += UI.confirm({ title: 'Arquivar operação financeira?', text: 'A operação deixa de aparecer nos novos lançamentos. Lançamentos já feitos mantêm a classificação.', action: 'Arquivar' });
      return html;
    }
  });
  print(F + 'Avante_OperacoesFinanceiras.png', '#/financeiro/plano-de-contas', 'Plano de contas · receitas');
  print(F + 'Avante_OpreracoesFinanceiras02.png', '#/financeiro/plano-de-contas?tab=despesas', 'Plano de contas · grupos de despesa');
  print(F + 'Avante_OperacaoFinanceira_Despesas01.png', '#/financeiro/plano-de-contas?tab=despesas', 'Plano de contas · despesas');
  print(F + 'Avante_EditarOperacaoDereceita.png', '#/financeiro/plano-de-contas?modal=editar', 'Editar operação financeira');

  /* ---------- Centros de custo ---------- */
  screen('#/financeiro/centros-de-custo', {
    title: 'Centros de custo',
    render: function (q) {
      var html = UI.page(UI.pageHeader({ crumbs: crumbs('Centros de custo'), title: 'Centros de custo', sub: 'Use o mesmo código nas empresas que devem entrar juntas na DRE por centro de custo.', actions: [UI.btn({ label: 'Adicionar centro', icon: 'plus', variant: 'primary', href: UI.href({ modal: 'novo' }) })] }) +
        UI.dataTable({
          columns: [{ label: 'Centro de custo', key: 'n' }, { label: 'Situação', render: function () { return UI.badge('success', 'Ativo'); } }, { label: 'Código de consolidação', key: 'c', num: true }],
          rows: [{ n: 'teste', c: '112312' }],
          actions: function () { return UI.btn({ label: 'Editar código', size: 'sm', href: UI.href({ modal: 'novo' }) }) + UI.btn({ label: 'Arquivar', variant: 'danger-outline', size: 'sm', href: UI.href({ modal: 'arquivar' }) }); },
          empty: { icon: 'grid', title: 'Nenhum centro de custo.', actions: [UI.btn({ label: 'Adicionar centro', icon: 'plus', variant: 'primary', size: 'sm', href: UI.href({ modal: 'novo' }) })] }
        }));
      if (q.modal === 'novo') html += UI.modal({ title: 'Adicionar centro de custo', size: 'sm',
        body: '<div class="form-grid">' + UI.field({ label: 'Nome do centro', required: true }) + UI.field({ label: 'Código de consolidação', optional: true, num: true, help: 'Mesmo código em empresas diferentes soma os valores na DRE consolidada.' }) + '</div>',
        primary: 'Salvar' });
      if (q.modal === 'arquivar') html += UI.confirm({ title: 'Arquivar o centro “teste”?', text: 'O centro deixa de aparecer nos novos lançamentos. O histórico é mantido.', action: 'Arquivar' });
      return html;
    }
  });
  print(F + 'Avante_CentroDeCustos.png', '#/financeiro/centros-de-custo', 'Centros de custo');
  print(F + 'Avante_CentroDecustos_AdicionarCentro.png', '#/financeiro/centros-de-custo?modal=novo', 'Adicionar centro de custo');
})();
