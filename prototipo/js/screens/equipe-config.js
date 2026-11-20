/* Equipe e Configurações: Usuários e permissões, Funcionários e salários, Dados da empresa e preferências, Documentos da empresa. */
(function () {
  var F = 'referencias/ContabilSemdados/MaisDoFinanceiro/';
  var D = window.DATA;

  var PERFIS = [
    ['Proprietário', 'Todos os recursos do plano, incluindo gestão da equipe.'],
    ['Gerente', 'Gestão, relatórios, estoque e caixa; sem gerir usuários.'],
    ['Caixa', 'Venda, clientes e próprio caixa; sem custos ou relatórios gerenciais.'],
    ['Operador', 'Clientes, catálogo e próprias vendas; sem operar caixa ou estoque.'],
    ['Estoquista', 'Consulta de produtos e ajustes de estoque; sem alterar preços, acessar custos ou vendas.']
  ];

  screen('#/equipe', {
    title: 'Usuários e permissões',
    render: function (q) {
      var html = UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Equipe' }, { label: 'Usuários e permissões' }], title: 'Usuários e permissões', sub: 'Cada pessoa acessa somente os dados e as ações permitidos pelo seu perfil.', actions: [UI.btn({ label: 'Adicionar usuário', icon: 'plus', variant: 'primary', href: UI.href({ modal: 'novo' }) })] }) +
        UI.section('Perfis de acesso', '<div class="profile-grid">' + PERFIS.map(function (p) {
          return '<div class="card profile-card"><strong>' + p[0] + '</strong><span class="block-sub">' + p[1] + '</span></div>';
        }).join('') + '</div>') +
        UI.section('Equipe da empresa', UI.dataTable({
          columns: [
            { label: 'Pessoa', render: function (r) { return '<span class="cell-flex"><span class="avatar">' + r.ini + '</span><span><span class="cell-main">' + esc(r.nome) + '</span><span class="cell-sub">' + esc(r.email) + '</span></span></span>'; } },
            { label: 'Perfil', render: function (r) { return UI.badge('invoiced', r.perfil); } },
            { label: 'Acesso', render: function () { return UI.badge('success', 'Ativo'); } }
          ],
          rows: [{ ini: 'R', nome: D.usuario.nome, email: 'joaovictorpertile7@gmail.com', perfil: 'Proprietário da empresa' }],
          actions: function () { return '<span class="block-sub">Proprietário</span>'; }
        })));
      if (q.modal === 'novo') html += UI.modal({ title: 'Adicionar à equipe', size: 'sm',
        body: '<div class="form-grid">' + UI.field({ label: 'Nome', required: true }) +
          UI.field({ label: 'E-mail de acesso', type: 'email', required: true, help: 'Use um e-mail que a pessoa utiliza para acessar sua conta.' }) +
          UI.field({ label: 'Perfil', type: 'select', options: ['Caixa', 'Gerente', 'Operador', 'Estoquista'], help: 'Veja o que cada perfil pode fazer nos cartões acima.' }) + '</div>',
        primary: 'Salvar' });
      return html;
    }
  });
  print(F + 'Avante_Equipe.png', '#/equipe', 'Usuários e permissões');
  print(F + 'Avante_CadastroDePessoaNaEquipe.png', '#/equipe?modal=novo', 'Adicionar à equipe');

  screen('#/equipe/funcionarios', {
    title: 'Funcionários e salários',
    render: function () {
      return UI.page(UI.pageHeader({ crumbs: [{ label: 'Equipe' }, { label: 'Funcionários e salários' }], title: 'Funcionários e salários' }) +
        UI.card({ body: UI.emptyState({ icon: 'image', title: 'Tela aguardando print de referência', text: 'Cadastro de funcionários e folha de salários. Não há captura desta tela em referencias/, então os campos não foram desenhados para não inventar conteúdo.' }) }));
    }
  });

  /* ---------- Dados da empresa e preferências ---------- */
  screen('#/configuracoes', {
    title: 'Dados da empresa e preferências',
    render: function (q) {
      var tab = q.tab || 'empresa';
      var body;
      if (tab === 'empresa') {
        body = '<div class="grid-3">' +
          UI.card({ title: 'Dados da empresa', body: '<p class="info is-success" style="margin-bottom:8px">' + icon('check', 14) + 'Cadastro gerencial por CPF</p><p class="cell-main">' + esc(D.empresa.nome) + '</p>' +
            '<a class="setting-link" href="#/configuracoes">' + '<span><strong>Editar dados e modo fiscal</strong><span class="block-sub">CPF ou CNPJ, endereço e uso de documentos</span></span>' + icon('chevRight', 15) + '</a>' }) +
          UI.card({ title: 'Identidade visual', body: '<a class="setting-link" href="#/configuracoes"><span><strong>Editar ícone e cor da empresa</strong><span class="block-sub">Personalizar como a empresa aparece no seletor</span></span>' + icon('chevRight', 15) + '</a>' }) +
          UI.card({ title: 'Atividade e módulos', body: '<div class="row" style="margin-bottom:8px">' + ['Financeiro', 'Relatórios', 'Clientes', 'Catálogo', 'Vendas', 'PDV'].map(function (m) { return UI.badge('cancelled', m); }).join('') + '</div>' +
            '<a class="setting-link" href="#/configuracoes"><span><strong>Revisar atividade e rotinas do menu</strong><span class="block-sub">Ajustar as funções que aparecem para sua atividade</span></span>' + icon('chevRight', 15) + '</a>' }) +
        '</div>';
      } else {
        body = UI.card({ body: UI.emptyState({ icon: 'sliders', title: 'Sem configurações nesta aba no print de referência.', text: 'As opções desta aba serão desenhadas quando houver captura da tela.' }) });
      }
      return UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Configurações' }, { label: 'Dados da empresa e preferências' }], title: 'Dados da empresa e preferências' }) +
        '<div style="max-width:560px">' + UI.field({ type: 'search', placeholder: 'Buscar configuração: e-mail, impressão, CNPJ…' }) + '</div>' +
        UI.tabs([{ id: 'empresa', label: 'Empresa e documentos', icon: 'truck' }, { id: 'vendas', label: 'Vendas e catálogo', icon: 'box' }, { id: 'financeiro', label: 'Financeiro e avisos', icon: 'bell' }, { id: 'integracoes', label: 'Integrações', icon: 'sliders' }], tab) +
        body);
    }
  });
  print(F + 'Avante_ConfiguracoesDaEmpresa.png', '#/configuracoes', 'Dados da empresa e preferências');

  /* ---------- Documentos da empresa ---------- */
  screen('#/configuracoes/documentos', {
    title: 'Documentos da empresa',
    render: function () {
      return UI.page(
        UI.pageHeader({ crumbs: [{ label: 'Configurações' }, { label: 'Documentos da empresa' }], title: 'Documentos da empresa', sub: 'Fotos de produtos, anexos de orçamentos e comprovantes de venda.' }) +
        UI.card({ body: '<div class="total-line"><strong class="num">0 KB usados de 1 GB</strong><span class="block-sub num">0 de 5000 arquivos</span></div>' +
          '<span class="bar-track"><span class="bar-fill c-in" style="width:0%"></span></span>' +
          '<p class="help" style="margin-top:8px">O limite considera os arquivos cifrados. Arquivos removidos liberam espaço após a limpeza automática.</p>' }) +
        '<div class="card table-card"><div class="table-toolbar">' + UI.filter('Arquivos', ['Fotos dos produtos', 'Fotos dos orçamentos', 'Comprovantes de venda', 'Documentos de títulos', 'Documentos de contratos']) +
          '<span class="block-sub">Adicione fotos no produto ou no orçamento. Anexe comprovantes ao abrir a venda.</span></div>' +
          UI.emptyState({ icon: 'image', title: 'Nenhum arquivo neste grupo.', actions: [UI.btn({ label: 'Ir para Produtos e serviços', size: 'sm', href: '#/catalogo/produtos' })] }) +
          '<div class="table-foot"><span class="num">0 registros</span>' + UI.pager() + '</div></div>');
    }
  });
  print(F + 'Avante_Configuracoes_arquivoasDaempresa.png', '#/configuracoes/documentos', 'Documentos da empresa');
})();
