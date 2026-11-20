/*
 * Estado atual da conta, copiado dos prints em referencias/ (20/11/2026).
 * Regra do projeto: não inventar dados. O que está zerado nos prints continua zerado
 * e aparece na tela como estado vazio.
 */
window.DATA = {
  empresa: { nome: 'João Pertile', modo: 'Cadastro gerencial por CPF' },
  usuario: { nome: 'Responsável', inicial: 'R', perfil: 'Proprietário' },
  periodo: { inicio: '22/10/2026', fim: '20/11/2026', dias: 30, atualizadoAs: '10:31' },

  // Avante_VisaoDaLoja01/02: receita, custo, despesas e resultado zerados; 0 vendas
  vendas: { quantidade: 0, receitaLiquida: 0, ticketMedio: 0, itensVendidos: 0 },
  custoItens: 0,
  despesasAvulsas: 0,

  // Avante_VisaoDaLoja02: vencimentos financeiros zerados
  receber: { vencidos: 0, parcelasVencidas: 0, proximos7: 0, parcelasProximas: 0, hoje: [] },
  pagar: { vencidos: 0, parcelasVencidas: 0, proximos7: 0, parcelasProximas: 0, hoje: [] },

  // Avante_ProdutosEServicos_ProdutosEServicos: 1 produto ativo, 20 em estoque
  estoque: { itensAtivos: 1, unidades: 20, abaixoDoMinimo: [], semEstoque: 0 },

  // Avante_VisaoDaLoja01 (últimas ações): Orçamento #2 salvo
  orcamentosAbertos: [
    { numero: 2, salvoEm: '18/11/2026, 21:39' }
  ],

  // Avante_MaisDoFinanceiro_Comdados: entrada de R$ 1.000,00 em 20/11 e ajuste de R$ 100,00
  financeiro: { saldoInicial: 0, entradas: 1000, saidas: 0, ajusteSaldo: 100, saldoFinal: 1100 },
  movimentosPorDia: [{ dia: '20/11', entradas: 1000, saidas: 0 }],

  // Avante_VisaoDaLoja04: "Nenhuma conta bancária ativa."
  contasBancariasAtivas: 0,

  // Avante_VisaoDaLoja01
  atividade: [
    { icone: 'box', titulo: 'Cadastro atualizado', ref: 'Produto #2', quando: '18/11/2026, 21:57', rota: '#/catalogo/produtos' },
    { icone: 'file', titulo: 'Orçamento salvo', ref: 'Orçamento #2', quando: '18/11/2026, 21:39', rota: '#/vendas/orcamentos' }
  ],

  // Avante_VisaoDaLoja08_EssaManter: sem país ou cidade informados
  localizacao: { paises: [], cidades: [] }
};
