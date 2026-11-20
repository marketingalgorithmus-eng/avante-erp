/* Financeiro — Bancos e meios: Contas bancárias, Conciliação bancária, Maquininhas e recebíveis, Cartões corporativos. */
(function () {
  var F = 'referencias/ContabilSemdados/MaisDoFinanceiro/';

  /* Aviso padrão quando ainda não há conta bancária */
  function needBankModal() {
    return UI.modal({ title: 'Vincule uma conta bancária', size: 'md', footer: false,
      body: '<div class="info">' + icon('bank', 16) + '<div><strong>Contas bancárias</strong><br/>Cadastre a conta onde serão conferidos os pagamentos ou repasses.</div></div>' +
        '<div class="row" style="margin-top:12px">' + UI.btn({ label: 'Abrir Contas bancárias', icon: 'chevRight', href: '#/financeiro/contas-bancarias?modal=nova' }) + '</div>' });
  }

  /* ---------- Contas bancárias ---------- */
  screen('#/financeiro/contas-bancarias', {
    title: 'Contas bancárias',
    render: function (q) {
      var tem = q.estado === 'com-conta';
      var rows = tem ? [{ nome: 'test', tipo: 'Repasses a receber', ini: 100, saldo: 100 }] : [];
      var html = UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Financeiro' }, { label: 'Contas bancárias' }], title: 'Contas bancárias', sub: 'Contas de banco, caixa e repasses usadas nos lançamentos.', actions: [
          UI.btn({ label: 'Contas de recebimento do PDV', icon: 'monitor', href: UI.href({ modal: 'pdv' }) }),
          UI.btn({ label: 'Registrar transferência', icon: 'bank', disabled: !tem }),
          UI.btn({ label: 'Adicionar conta', icon: 'plus', variant: 'primary', href: UI.href({ modal: 'nova' }) })
        ] }) +
        UI.card({ title: 'Saldos por conta', actions: ['<span class="block-sub">Nesta empresa</span>'], body: tem ? BarList([{ label: 'test', value: 100 }]) : '<p class="empty-text">Nenhuma conta para exibir.</p>' }) +
        UI.section('Contas bancárias e de caixa', UI.dataTable({
          columns: [
            { label: 'Conta', render: function (r) { return '<span class="cell-flex">' + icon('bank', 15, 'muted') + esc(r.nome) + '</span>'; } },
            { label: 'Tipo', key: 'tipo' },
            { label: 'Saldo inicial', align: 'right', num: true, render: function (r) { return brl(r.ini); } },
            { label: 'Saldo registrado', align: 'right', num: true, render: function (r) { return '<strong class="text-success">' + brl(r.saldo) + '</strong>'; } }
          ],
          rows: rows,
          actions: function () { return UI.btn({ label: 'Arquivar', variant: 'danger-outline', size: 'sm', href: UI.href({ modal: 'arquivar' }) }) + UI.btn({ label: 'Ver extrato', icon: 'arrowRight', size: 'sm', href: '#/financeiro/movimentacoes' }); },
          empty: { icon: 'bank', title: 'Nenhuma conta cadastrada.', text: 'Cadastre a conta do banco ou o caixa para registrar entradas, saídas e conciliar o extrato.', actions: [UI.btn({ label: 'Adicionar conta', icon: 'plus', variant: 'primary', size: 'sm', href: UI.href({ modal: 'nova' }) })] }
        })));
      if (q.modal === 'nova') html += UI.modal({ title: 'Cadastrar conta financeira', size: 'md',
        body: '<div class="form-grid">' +
          UI.field({ label: 'Nome da conta', required: true, help: 'Como a conta aparece nos lançamentos. Ex.: Banco do Brasil PJ.' }) +
          UI.field({ label: 'Tipo de conta', type: 'select', options: ['Banco', 'Caixa', 'Repasses a receber', 'Carteira digital'] }) +
          UI.field({ label: 'Instituição bancária', type: 'select', options: ['Não informado'], optional: true, span: 6 }) +
          UI.field({ label: 'Saldo inicial', type: 'money', value: '0,00', span: 6 }) +
          UI.field({ label: 'Data inicial', type: 'date', value: '2026-11-20', span: 6, help: 'Data a partir da qual o saldo é calculado.' }) + '</div>' +
          '<p class="help" style="margin-top:12px">O fechamento do ponto de venda é realizado em Meu caixa, no PDV.</p>',
        primary: 'Salvar' });
      if (q.modal === 'pdv') html += UI.modal({ title: 'Contas de recebimento do PDV', size: 'lg',
        body: '<p class="block-sub" style="margin-bottom:12px">Autorize a conta de cada caixa e meio de pagamento. Para cartão, use Repasses a receber enquanto a operadora não liquidar. A venda registra o valor na conta escolhida; o ERP não confirma captura nem crédito no banco.</p>' +
          UI.dataTable({ columns: [{ label: 'Caixa' }, { label: 'Meio' }, { label: 'Conta de destino' }, { label: 'Operação' }], rows: [], empty: { icon: 'monitor', title: 'Nenhuma conta autorizada.', compact: true } }),
        right: UI.btn({ label: 'Autorizar conta de destino', icon: 'plus', variant: 'primary' }) });
      if (q.modal === 'arquivar') html += UI.confirm({ title: 'Arquivar a conta “test”?', text: 'A conta sai dos lançamentos novos. O extrato e o saldo registrado continuam no histórico.', action: 'Arquivar conta' });
      return html;
    }
  });
  print(F + 'Avante_DinheiroDaEmpresa_ContasEBancos.png', '#/financeiro/contas-bancarias', 'Contas bancárias · sem contas');
  print(F + 'Avante_DinheiroDaEmpresa_ContasEBancos_InicioComCadastro.png', '#/financeiro/contas-bancarias?estado=com-conta', 'Contas bancárias · com conta');
  print(F + 'Avante_DinheiroDaEmpresa_ContasEBancos_Cadastrar.png', '#/financeiro/contas-bancarias?modal=nova', 'Cadastrar conta financeira');
  print(F + 'Avante_DinheiroDaEmpresa_ContasEBancos_ContasPDV.png', '#/financeiro/contas-bancarias?modal=pdv', 'Contas de recebimento do PDV');

  /* ---------- Conciliação bancária ---------- */
  screen('#/financeiro/conciliacao', {
    title: 'Conciliação bancária',
    render: function (q) {
      var tab = q.tab || 'extrato';
      return UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Financeiro' }, { label: 'Conciliação bancária' }], title: 'Conciliação bancária', actions: [
          UI.btn({ label: 'Relatório desta consulta', icon: 'chart', href: '#/relatorios' }),
          UI.btn({ label: 'Arquivos importados', icon: 'file' }),
          UI.btn({ label: 'Importar extrato', icon: 'download', variant: 'primary' })
        ] }) +
        UI.tabs([{ id: 'extrato', label: 'Extrato geral' }, { id: 'conciliar', label: 'A conciliar' }, { id: 'conciliados', label: 'Conciliados' }], tab) +
        '<div class="card filter-bar"><div class="filter-row">' + UI.filter('Conta', ['Todas as contas']) +
          '<label class="filter-field"><span>De</span><input class="input" type="date" value="2026-10-22"/></label>' +
          '<label class="filter-field"><span>Até</span><input class="input" type="date" value="2026-11-20"/></label>' +
          UI.btn({ label: 'Consultar', variant: 'secondary' }) + '</div></div>' +
        UI.kpis([
          { label: 'Entradas registradas no ERP', value: brl(0), tone: 'success' }, { label: 'Saídas registradas no ERP', value: brl(0), tone: 'error' },
          { label: 'Conciliados', value: '0' }, { label: 'A conferir', value: '0' }
        ]) +
        '<p class="block-sub">Gaveta do PDV, despesas sem conta e créditos internos de troca aparecem como registros de apoio.</p>' +
        UI.section('Todas as contas', UI.dataTable({
          columns: [{ label: 'Data' }, { label: 'Movimentação' }, { label: 'Valor', align: 'right' }, { label: 'Conferência' }], rows: [],
          empty: { icon: 'bank', title: 'Nenhum lançamento no período.', text: 'Importe o extrato do banco (OFX) para conferir com o que foi registrado no ERP.', actions: [UI.btn({ label: 'Importar extrato', icon: 'download', variant: 'primary', size: 'sm' })] }
        }), { sub: '<span class="num">22/10/2026 a 20/11/2026</span>' }));
    }
  });
  print(F + 'Avante_DinheiroDaEmpresa_ConciliacaoBancaria.png', '#/financeiro/conciliacao', 'Conciliação bancária');

  /* ---------- Maquininhas e Cartões (mesmo padrão) ---------- */
  function linkedList(o) {
    return function (q) {
      var tab = q.tab || 'ativos';
      var html = UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Financeiro' }, { label: o.title }], title: o.title, sub: o.sub, actions: [UI.btn({ label: o.add, icon: 'plus', variant: 'primary', href: UI.href({ modal: 'vincular' }) })] }) +
        '<div class="card table-card"><div class="table-toolbar">' + UI.tabs([{ id: 'ativos', label: 'Ativos', count: 0 }, { id: 'arquivados', label: 'Arquivados', count: 0 }], tab, { pills: true }) + '</div>' +
          UI.emptyState(tab === 'arquivados' ? { icon: 'inbox', title: 'Nenhum cadastro arquivado.' } : { icon: o.icon, title: o.emptyTitle, text: o.sub, actions: [UI.btn({ label: o.add, icon: 'plus', variant: 'primary', size: 'sm', href: UI.href({ modal: 'vincular' }) })] }) +
          '<div class="table-foot"><span class="num">0 registros</span>' + UI.pager() + '</div></div>');
      if (q.modal === 'vincular') html += needBankModal();
      return html;
    };
  }

  screen('#/financeiro/maquininhas', { title: 'Maquininhas e recebíveis', render: linkedList({
    title: 'Maquininhas e recebíveis', add: 'Cadastrar maquininha', icon: 'wallet', emptyTitle: 'Nenhuma maquininha cadastrada.',
    sub: 'Cadastre a maquininha para acompanhar valores a receber e conferir repasses.',
    columns: [{ label: 'Maquininha' }, { label: 'Operadora' }, { label: 'Conta de repasse' }, { label: 'A receber', align: 'right' }]
  }) });
  print(F + 'Avante_MaquininhasERepasses.png', '#/financeiro/maquininhas', 'Maquininhas e recebíveis');
  print(F + 'Avante_MaquininhasERepasses_VincularMaquininha.png', '#/financeiro/maquininhas?modal=vincular', 'Maquininha · vincular conta');

  screen('#/financeiro/cartoes', { title: 'Cartões corporativos', render: linkedList({
    title: 'Cartões corporativos', add: 'Cadastrar cartão', icon: 'wallet', emptyTitle: 'Nenhum cartão cadastrado.',
    sub: 'Cadastre somente os quatro últimos dígitos para acompanhar compras e faturas.',
    columns: [{ label: 'Cartão' }, { label: 'Final' }, { label: 'Conta de pagamento' }, { label: 'Fatura aberta', align: 'right' }]
  }) });
  print(F + 'Avante_CastoesDaEmpresa.png', '#/financeiro/cartoes', 'Cartões corporativos');
  print(F + 'Avante_CastaosDaEmpresa_Vincular.png', '#/financeiro/cartoes?modal=vincular', 'Cartão · vincular conta');
})();
