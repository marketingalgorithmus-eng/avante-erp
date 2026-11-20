/*
 * Menu aprovado (MAPA_DE_TELAS.md). Cada tela tem uma rota e os prints de referência,
 * para ligarmos as telas internas uma a uma.
 */
var R = 'referencias/';
var F = 'referencias/ContabilSemdados/MaisDoFinanceiro/';

window.MENU = [
  { id: 'painel', label: 'Painel', icon: 'grid', route: '#/painel' },
  {
    id: 'vendas', label: 'Vendas', icon: 'receipt', children: [
      { label: 'Vendas', route: '#/vendas', prints: [R + 'Avante_Vendas_VendasRealizadas.png', R + 'Avante_Vendas_VendasRealizadas_ComBuscaAtiva.png'] },
      { label: 'Orçamentos', route: '#/vendas/orcamentos', prints: [R + 'Avante_Vendas_Orcamento.png', R + 'Avante_Vendas_Orcamento_NovoOrcamento.png', R + 'Avante_Vendas_Orcamento_EditarOrçamento.png', R + 'Avante_Vendas_Orcamento_CliqueiNoOrçamentoEMostraIsso.png'] },
      { label: 'PDV (Frente de caixa)', route: '#/pdv', pdv: true, prints: [R + 'Avante_PVD.png', R + 'Avante_PDV.png', R + 'Avante_PDV_AbriTurno.png', R + 'Avante_PDV_Cloncluirvenda.png', R + 'Avante_PDV_MeuCaixa.png'] }
    ]
  },
  { id: 'clientes', label: 'Clientes', icon: 'users', route: '#/clientes', prints: [R + 'Avante_Clientes.png', R + 'Avante_Clientes_NovoCliente.png', R + 'Avante_Clientes_EditarCliente.png', R + 'Avante_Clientes_Arquvidos_EssaNaoSeiUtilidadeSugerirAlgoMelhor.png'] },
  {
    id: 'catalogo', label: 'Catálogo', icon: 'box', children: [
      { label: 'Produtos e serviços', route: '#/catalogo/produtos', prints: [R + 'Avante_ProdutosEServicos_ProdutosEServicos.png', R + 'Avante_ProdutosEServicos_CadastrarProdutos_Cadastro.png', R + 'Avante_ProdutosEServicos_CadastrarServiço_Cadastro.png', R + 'Avante_ProdutosEServicos_AcoesDoProduto.png'] },
      { label: 'Fichas técnicas', route: '#/catalogo/fichas-tecnicas', prints: [R + 'Avante_ProdutosEServicos_ReceitasDeProdutos.png', R + 'Avante_ReceitaDeProdutos_CriarReceita_EscollhaProduto.png', R + 'Avante_ReceitasDeProdutos_CriandoReceita.png'] },
      { label: 'Insumos', route: '#/catalogo/insumos', prints: [R + 'Avante_ReceitaDeProdutos_estoqueDeInsumos.png', R + 'Avante_ProdutosEServicos_ReceitaDeProdutos_CadastrarInsumo_eomesmoquecadastrarProduto.png'] },
      { label: 'Inventário', route: '#/catalogo/inventario', prints: [R + 'Avante_ProdutosEServicos_ContagemDeEstoque.png', R + 'Avante_ProdutosEServicos_ContagemDeEstoque_NovaContagem.png', R + 'Avante_ProdutosEServicos_ContagemDeEstoque_AbriContagem.png'] },
      { label: 'Categorias', route: '#/catalogo/categorias', prints: [R + 'Avante_ProdutosEServicos_Categorias.png'] }
    ]
  },
  {
    id: 'fornecedores', label: 'Fornecedores e frete', icon: 'truck', children: [
      { label: 'Fornecedores', route: '#/fornecedores', prints: [R + 'Avantes_Fornecedores_TelaDeInfoDoFornecedor.png', R + 'Avante_Fornecedores_NovoFornecedor.png'] },
      { label: 'Transportadoras', route: '#/fornecedores/transportadoras', prints: [R + 'Avante_Fornecedor_Transportadoras.png', R + 'Avante_Fornecedores_Transportadora_NovaTransportadora.png', R + 'Avante_Forenecedores_Transportadoras_CotarFrente.png', R + 'Avante_Fornecedores_Transportadoras_CotarComMelhorEnvio.png'] }
    ]
  },
  {
    id: 'financeiro', label: 'Financeiro', icon: 'bank', children: [
      { label: 'Resumo financeiro', route: '#/financeiro', prints: [F + 'Avante_ComoEstaODinheiro.png', F + 'Avante_ComoEstaODinheiro02.png', F + 'Avante_ComoEstaODinheiro03.png'] },
      { section: 'Dia a dia' },
      { label: 'Contas a pagar', route: '#/financeiro/contas-a-pagar', prints: [F + 'Avante_DinheiroDaEmpresa_ContasAPagar.png', F + 'Avante_DinheiroDaEmpresa_ContasAPagar_AdicionarContaAPagar.png', F + 'Avante_exemplodeComoEstaAMaioriaDosCamposAPreencher.png'] },
      { label: 'Contas a receber', route: '#/financeiro/contas-a-receber', prints: [F + 'Avante_DinehiroDaEmpresa_ValoresAReceber.png', F + 'Avante_DinheiroDaEmpresa_ValoresAReceber_AdicionarValorAReceber.png'] },
      { label: 'Movimentações', route: '#/financeiro/movimentacoes', prints: [F + 'Avante_MaisDoFinanceiro_Comdados.png', F + 'Avante_MaisDoFinaceiro_OqEntrouESaiu.png', F + 'Avante_MaisDoFinanceiro_OqentrouESaiu_RegistarEntrada.png'] },
      { label: 'Fluxo de caixa', route: '#/financeiro/fluxo-de-caixa', prints: [F + 'Avante_EntradaESaidaPordia.png', F + 'Avante_EntradaESaidaPordia02.png'] },
      { label: 'Despesas avulsas', route: '#/financeiro/despesas-avulsas', prints: [F + 'Avante_DespesasAvulsas.png', F + 'Avante_DespesasAvulsas_Registardespesa.png'] },
      { section: 'Bancos e meios' },
      { label: 'Contas bancárias', route: '#/financeiro/contas-bancarias', prints: [F + 'Avante_DinheiroDaEmpresa_ContasEBancos.png', F + 'Avante_DinheiroDaEmpresa_ContasEBancos_InicioComCadastro.png', F + 'Avante_DinheiroDaEmpresa_ContasEBancos_Cadastrar.png', F + 'Avante_DinheiroDaEmpresa_ContasEBancos_ContasPDV.png'] },
      { label: 'Conciliação bancária', route: '#/financeiro/conciliacao', prints: [F + 'Avante_DinheiroDaEmpresa_ConciliacaoBancaria.png'] },
      { label: 'Maquininhas e recebíveis', route: '#/financeiro/maquininhas', prints: [F + 'Avante_MaquininhasERepasses.png', F + 'Avante_MaquininhasERepasses_VincularMaquininha.png'] },
      { label: 'Cartões corporativos', route: '#/financeiro/cartoes', prints: [F + 'Avante_CastoesDaEmpresa.png', F + 'Avante_CastaosDaEmpresa_Vincular.png'] },
      { section: 'Patrimônio' },
      { label: 'Empréstimos', route: '#/financeiro/emprestimos', prints: [] },
      { label: 'Investimentos', route: '#/financeiro/investimentos', prints: [F + 'Avante_AplicaçõesFinanceiras.png'] },
      { label: 'Consórcios', route: '#/financeiro/consorcios', prints: [F + 'Avante_Consorcios.png'] },
      { label: 'Bens e patrimônio', route: '#/financeiro/bens', prints: [] },
      { label: 'Contratos', route: '#/financeiro/contratos', prints: [F + 'Avante_ContratosCom dados.png', F + 'Avante_Contrato_MaisInfoQuandoClicaNoContrato.png', F + 'Avante_Contratos_CadastrarContratos.png'] },
      { section: 'Cadastros' },
      { label: 'Plano de contas', route: '#/financeiro/plano-de-contas', prints: [F + 'Avante_OperacoesFinanceiras.png', F + 'Avante_OpreracoesFinanceiras02.png', F + 'Avante_OperacaoFinanceira_Despesas01.png', F + 'Avante_EditarOperacaoDereceita.png'] },
      { label: 'Centros de custo', route: '#/financeiro/centros-de-custo', prints: [F + 'Avante_CentroDeCustos.png', F + 'Avante_CentroDecustos_AdicionarCentro.png'] }
    ]
  },
  {
    id: 'relatorios', label: 'Relatórios', icon: 'chart', children: [
      { label: 'Relatórios', route: '#/relatorios', prints: [F + 'Avante_BibliotecaDeRelatorios.png', F + 'Avante_BibliotecaDerelatorios02.png', F + 'Avante_BibliotecaDeRelarios_OqApareceQuandoClicoEmCadaUmDosBlocosAli.png'] },
      { label: 'Análises', route: '#/relatorios/analises', prints: [F + 'avanteAnaliseGrafica.png', F + 'Avante_analiseGrafica_02.png', R + 'Avante_VisaoDaLoja03.png', R + 'Avante_VisaoDaLoja04.png', R + 'Avante_VisaoDaLoja05.png', R + 'Avante_visaoDaLoja06.png'] }
    ]
  },
  {
    id: 'equipe', label: 'Equipe', icon: 'userPlus', children: [
      { label: 'Usuários e permissões', route: '#/equipe', prints: [F + 'Avante_Equipe.png', F + 'Avante_CadastroDePessoaNaEquipe.png'] },
      { label: 'Funcionários e salários', route: '#/equipe/funcionarios', prints: [] }
    ]
  },
  {
    id: 'configuracoes', label: 'Configurações', icon: 'sliders', children: [
      { label: 'Dados da empresa e preferências', route: '#/configuracoes', prints: [F + 'Avante_ConfiguracoesDaEmpresa.png'] },
      { label: 'Documentos da empresa', route: '#/configuracoes/documentos', prints: [F + 'Avante_Configuracoes_arquivoasDaempresa.png'] }
    ]
  }
];

/* Ações de criação: menu "Criar", atalhos do Painel e paleta Ctrl K */
window.CREATE_ACTIONS = [
  { id: 'pdv', label: 'Abrir PDV', icon: 'monitor', route: '#/transicao/pdv', key: '1', tone: 'pdv' },
  { id: 'venda', label: 'Nova venda', icon: 'cart', route: '#/transicao/pdv', key: '2' },
  { id: 'orcamento', label: 'Novo orçamento', icon: 'file', route: '#/vendas/orcamentos?modal=novo', key: '3' },
  { id: 'pagar', label: 'Conta a pagar', icon: 'arrowOut', route: '#/financeiro/contas-a-pagar?modal=novo', key: '4', tone: 'pay' },
  { id: 'receber', label: 'Conta a receber', icon: 'arrowIn', route: '#/financeiro/contas-a-receber?modal=novo', key: '5', tone: 'receive' },
  { id: 'despesa', label: 'Registrar despesa', icon: 'minusCircle', route: '#/financeiro/despesas-avulsas?modal=novo', key: '6', tone: 'pay' },
  { id: 'cliente', label: 'Novo cliente', icon: 'user', route: '#/clientes?modal=novo', key: '7', tone: 'neutral' },
  { id: 'produto', label: 'Novo produto', icon: 'box', route: '#/catalogo/produtos?modal=produto', key: '8', tone: 'neutral' }
];

/* Lista plana de telas: rota -> { label, group, prints } */
window.flatRoutes = function () {
  var out = [];
  window.MENU.forEach(function (g) {
    if (g.route) out.push({ label: g.label, group: null, route: g.route, icon: g.icon, prints: g.prints || [] });
    (g.children || []).forEach(function (c) {
      if (c.route) out.push({ label: c.label, group: g.label, groupId: g.id, route: c.route, icon: g.icon, prints: c.prints || [] });
    });
  });
  return out;
};
