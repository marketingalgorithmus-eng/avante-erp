# Mapa de Telas — Avante ERP

Catálogo dos 113 prints em `referencias/`, organizados pelo menu proposto. Cada linha traz o nome sugerido da tela, o arquivo de origem e se o print tem dados.

**Legenda de dados:** `vazio` = print sem dados (não inventar conteúdo; redesenhar só layout, filtros, cabeçalho e estado vazio) · `dados` = print com registros reais · `—` = modal, formulário ou componente.

> **Como a coluna "Dados" foi preenchida:** conferi visualmente Painel 01, Clientes, Clientes arquivados, Produtos e serviços, Transportadoras, Equipe, Contas a pagar, Movimentações com dados, Configurações e PDV. Nas demais telas, a classificação vem do nome do arquivo ou da pasta `ContabilSemdados` e deve ser confirmada ao abrir cada print, antes de codar a tela.
>
> Não existe arquivo de texto de categorias em `referencias/`. Os nomes atuais vêm da sidebar capturada nos prints (`Avante_funcoes.png`, `Avante_Funcoes02.png` e as telas com menu aberto).

---

## 1. Menu atual × menu proposto

| # | Menu atual | Menu proposto | Submenu atual | Submenu proposto | Motivo |
|---|---|---|---|---|---|
| 1 | Visão da loja | **Painel** | — | — | Termo padrão de ERP; "loja" não serve para quem presta serviço |
| 2 | Vendas | **Vendas** | Vendas realizadas | **Vendas** | "Realizadas" é redundante |
| | | | Orçamentos | **Orçamentos** | Mantém |
| | | | *(botão "Abrir PDV" no rodapé)* | **PDV (Frente de caixa)** | O PDV passa a constar também no menu de Vendas |
| 3 | Clientes | **Clientes** | — | — | Mantém |
| 4 | Produtos e serviços | **Catálogo** | Produtos e serviços | **Produtos e serviços** | Grupo e item tinham o mesmo nome |
| | | | Receitas de produtos | **Fichas técnicas** | Termo usado em food service e indústria para "receita" de insumos |
| | | | *(aba)* Estoque de insumos | **Insumos** | Vira item próprio do menu, não aba escondida |
| | | | Contagens de estoque | **Inventário** | Nome padrão do processo |
| | | | Categorias | **Categorias** | Mantém |
| 5 | Fornecedores | **Fornecedores e frete** | Fornecedores | **Fornecedores** | Grupo e item tinham o mesmo nome |
| | | | Transportadoras | **Transportadoras** | Mantém |
| 6 | Dinheiro da empresa | **Financeiro** | *(novo)* Como está o dinheiro | **Resumo financeiro** | É o painel do módulo, vai para o topo |
| | | | Contas a pagar | **Contas a pagar** | Mantém |
| | | | Valores a receber | **Contas a receber** | Par simétrico de "Contas a pagar" |
| | | | O que entrou e saiu | **Movimentações** | Linguagem informal demais para relatório contábil |
| | | | Entradas e saídas por dia | **Fluxo de caixa** | Termo financeiro padrão |
| | | | Contas e bancos | **Contas bancárias** | Mais direto |
| | | | Conciliação bancária | **Conciliação bancária** | Mantém |
| | | | Despesas avulsas | **Despesas avulsas** | Mantém |
| | | | Maquininhas e repasses | **Maquininhas e recebíveis** | "Recebíveis" é o termo do mercado |
| | | | Cartões da empresa | **Cartões corporativos** | Mais claro |
| | | | Empréstimos | **Empréstimos** | Mantém |
| | | | Aplicações financeiras | **Investimentos** | Mais curto |
| | | | Consórcios | **Consórcios** | Mantém |
| | | | Imóveis e veículos | **Bens e patrimônio** | Cobre outros ativos além de imóveis e veículos |
| | | | Contratos | **Contratos** | Mantém |
| | | | Operações financeiras | **Plano de contas** | É o cadastro de categorias de receita e despesa |
| | | | Centros de custo | **Centros de custo** | Mantém |
| 7 | Relatórios | **Relatórios** | Biblioteca de relatórios | **Relatórios** | "Biblioteca" é um passo a mais |
| | | | Análises e gráficos | **Análises** | Mais curto |
| 8 | Equipe e controle | **Equipe** | Equipe | **Usuários e permissões** | Descreve o que a tela faz (perfis de acesso) |
| | | | Funcionários e salários | **Funcionários e salários** | Mantém |
| 9 | Configurações | **Configurações** | Configurações | **Dados da empresa e preferências** | Grupo e item tinham o mesmo nome |
| | | | Arquivos da empresa | **Documentos da empresa** | Mais claro |

**Mudança estrutural no Financeiro:** hoje há um subgrupo "Mais do financeiro" com 12 itens dentro de "Dinheiro da empresa" (3 níveis de menu). A proposta remove o terceiro nível e usa **separadores com título** dentro do grupo:

```
Financeiro
  Resumo financeiro
  ── Dia a dia ──────────
  Contas a pagar
  Contas a receber
  Movimentações
  Fluxo de caixa
  Despesas avulsas
  ── Bancos e meios ─────
  Contas bancárias
  Conciliação bancária
  Maquininhas e recebíveis
  Cartões corporativos
  ── Patrimônio ─────────
  Empréstimos
  Investimentos
  Consórcios
  Bens e patrimônio
  Contratos
  ── Cadastros ──────────
  Plano de contas
  Centros de custo
```

---

## 2. Sugestões para os pontos marcados por você

| Print | Problema | Sugestão |
|---|---|---|
| `Avante_Clientes_Arquvidos_EssaNaoSeiUtilidadeSugerirAlgoMelhor.png` | Botão "Arquivados" abre um modal separado só com o nome, sem ação de restaurar | Remover o botão e o modal. Usar abas de status na própria tabela, **Ativos (n) · Arquivados (n)**, como já existe em Produtos, com a ação **Restaurar** na linha. É o mesmo padrão em Clientes, Fornecedores e Transportadoras |
| `Avante_ProdutosEServicos_NovoServico_CadastrarServico_Adicionais_NaoViUtilidadeEporque.png` | Aba "Adicionais" sem contexto | Ela cadastra **opcionais cobrados à parte** (ex.: "taxa de urgência + R$ 20", "embalagem para presente") e permite consumir insumos. Renomear para **Opcionais**, mostrar uma frase de exemplo no estado vazio e deixar a seção recolhida por padrão |
| `Avante_exemplodeComoEstaAMaioriaDosCamposAPreencher.png` | Formulário longo em coluna única, muitos `?` e blocos recolhíveis soltos | Grid de 2 colunas; campos obrigatórios primeiro; opcionais agrupados em **"Mais detalhes"** (um único bloco recolhível); ajuda como texto auxiliar abaixo do campo, não ícone `?` |
| `Avante_VisaoDaLoja08_EssaManter.png` | Marcado para manter | Preservar o conteúdo e a ordem; aplicar só os tokens novos |
| `Avante_PDV.png` × `Avante_PVD.png` | Dois prints do PDV | Catalogados como a mesma tela (estado vazio e venda em andamento) |

---

## 3. Catálogo completo dos prints

### Acesso e navegação (7)
| Status · Tela | Arquivo | Dados |
|---|---|---|
| [x] Login | `Avante_Tela Login.png` | — |
| [x] Boas-vindas (primeiro acesso) | `Avante_Primeira_info_q_aparece_quando_abro.png` | — |
| [x] Aviso: alterações não salvas | `Avante_Mensagem_DesejaContinuareditando.png` | — |
| [x] Transição ERP → PDV | `ContabilSemdados/MaisDoFinanceiro/Avante_TelaDeTransicaoDoERPParaOPDV.png` | — |
| [x] Transição PDV → ERP | `ContabilSemdados/MaisDoFinanceiro/Avante_TelaDeTransiçãoDoPdVParaERP.png` | — |
| [x] Menu lateral (referência) | `ContabilSemdados/MaisDoFinanceiro/Avante_funcoes.png`, `Avante_Funcoes02.png` | — |

### Painel (8)
| Status · Tela | Arquivo | Dados |
|---|---|---|
| [x] Painel: rotinas, últimas ações, KPIs | `Avante_VisaoDaLoja01.png` | vazio |
| [x] Painel: seções seguintes | `Avante_VisaoDaLoja02.png`, `Avante_VisaoDaLoja03.png`, `Avante_VisaoDaLoja04.png`, `Avante_VisaoDaLoja05.png`, `Avante_visaoDaLoja06.png`, `Avante_VisaoDaLoja07.png` | vazio |
| [x] Painel: seção a manter | `Avante_VisaoDaLoja08_EssaManter.png` | vazio |

### Vendas (6)
| Status · Tela | Arquivo | Dados |
|---|---|---|
| [x] Vendas: lista | `Avante_Vendas_VendasRealizadas.png` | dados |
| [x] Vendas: busca ativa | `Avante_Vendas_VendasRealizadas_ComBuscaAtiva.png` | dados |
| [x] Orçamentos: lista | `Avante_Vendas_Orcamento.png` | dados |
| [x] Orçamento: detalhe | `Avante_Vendas_Orcamento_CliqueiNoOrçamentoEMostraIsso.png` | dados |
| [x] Orçamento: editar | `Avante_Vendas_Orcamento_EditarOrçamento.png` | — |
| [x] Orçamento: novo | `Avante_Vendas_Orcamento_NovoOrcamento.png` | — |

### PDV — Frente de caixa (8)
| Status · Tela | Arquivo | Dados |
|---|---|---|
| [x] PDV: venda em andamento | `Avante_PDV.png` | dados |
| [x] PDV: tela inicial | `Avante_PVD.png` | — |
| [x] PDV: aba de vendas do turno | `Avante_PDV_AbaDeVendas.png` | — |
| [x] Abrir turno de caixa | `Avante_PDV_AbriTurno.png` | — |
| [x] Identificar cliente | `Avante_PDV_Clientes.png` | — |
| [x] Pagamento / concluir venda | `Avante_PDV_Cloncluirvenda.png` | — |
| [x] Venda concluída (recibo) | `Avante_PDV_Aparece_QuandoCloncui_venda.png` | — |
| [x] Meu caixa (turno) | `Avante_PDV_MeuCaixa.png` | — |

### Clientes (4)
| Status · Tela | Arquivo | Dados |
|---|---|---|
| [x] Clientes: lista | `Avante_Clientes.png` | dados |
| [x] Clientes: arquivados (modal → virar aba) | `Avante_Clientes_Arquvidos_EssaNaoSeiUtilidadeSugerirAlgoMelhor.png` | vazio |
| [x] Novo cliente | `Avante_Clientes_NovoCliente.png` | — |
| [x] Editar cliente | `Avante_Clientes_EditarCliente.png` | — |

### Catálogo (25)
| Status · Tela | Arquivo | Dados |
|---|---|---|
| [x] Produtos e serviços: lista | `Avante_ProdutosEServicos_ProdutosEServicos.png` | dados |
| [x] Opções da tela (colunas) | `Avante_ProdutosEServicos_ProdutosEServicos_OpccoesDeTela.png` | — |
| [x] Ações do produto (menu ⋯) | `Avante_ProdutosEServicos_AcoesDoProduto.png` | — |
| [x] Arquivar produto | `Avante_ProdutosEServicos_AcoesDoProduto_Arquivar.png` | — |
| [x] Imprimir etiqueta | `Avante_ProdutosEServicos_AcoesDoProduto_ImprimirEtiqueta.png` | — |
| [x] Histórico de estoque | `Avante_ProdutosEServicos_acoesDoProduto_HistoricoDeHestoque.png` | dados |
| [x] Novo produto: Cadastro | `Avante_ProdutosEServicos_CadastrarProdutos_Cadastro.png` | — |
| [x] Novo produto: Preços | `Avante_ProdutosEServicos_CadastrarProduto_Precos.png` | — |
| [x] Novo produto: Estoque | `Avante_ProdutosEServicos_CadastrarProduto_Estoque.png` | — |
| [x] Novo produto: Fiscal | `Avante_ProdutosEServicos_CadastrarProduto_Fiscal.png` | — |
| [x] Novo produto: Fornecedor | `Avante_ProdutosEServicos_CadastrarProduto_Fornescedor.png` | — |
| [x] Novo produto: Opcionais | `Avante_ProdutosEServicos_CadastrarProduto_Adicionais.png` | — |
| [x] Novo serviço: Cadastro | `Avante_ProdutosEServicos_CadastrarServiço_Cadastro.png` | — |
| [x] Novo serviço: Preços | `Avante_ProdutosEServicos_NovoServico_CadastrarServico_Valores.png` | — |
| [x] Novo serviço: Opcionais | `Avante_ProdutosEServicos_NovoServico_CadastrarServico_Adicionais_NaoViUtilidadeEporque.png` | — |
| [x] Novo serviço: Prestação | `Avante_ProdutosEServicos_NovoServico_Prestacao.png` | — |
| [x] Categorias | `Avante_ProdutosEServicos_Categorias.png` | dados |
| [x] Inventário: lista | `Avante_ProdutosEServicos_ContagemDeEstoque.png` | vazio |
| [x] Inventário: nova contagem | `Avante_ProdutosEServicos_ContagemDeEstoque_NovaContagem.png` | — |
| [x] Inventário: contagem aberta | `Avante_ProdutosEServicos_ContagemDeEstoque_AbriContagem.png` | — |
| [x] Fichas técnicas: lista | `Avante_ProdutosEServicos_ReceitasDeProdutos.png` | vazio |
| [x] Ficha técnica: escolher produto | `Avante_ReceitaDeProdutos_CriarReceita_EscollhaProduto.png` | — |
| [x] Ficha técnica: montando | `Avante_ReceitasDeProdutos_CriandoReceita.png` | — |
| [x] Insumos: estoque | `Avante_ReceitaDeProdutos_estoqueDeInsumos.png` | vazio |
| [x] Novo insumo (= formulário de produto) | `Avante_ProdutosEServicos_ReceitaDeProdutos_CadastrarInsumo_eomesmoquecadastrarProduto.png` | — |

### Fornecedores e frete (7)
| Status · Tela | Arquivo | Dados |
|---|---|---|
| [x] Fornecedor: detalhe | `Avantes_Fornecedores_TelaDeInfoDoFornecedor.png` | dados |
| [x] Novo fornecedor | `Avante_Fornecedores_NovoFornecedor.png` | — |
| [x] Transportadoras: lista | `Avante_Fornecedor_Transportadoras.png` | dados |
| [x] Nova transportadora | `Avante_Fornecedores_Transportadora_NovaTransportadora.png` | — |
| [x] Transportadoras: arquivadas (→ aba) | `Avante_Fornecedores_Transportadoras_Arquivados.png` | vazio |
| [x] Cotar frete | `Avante_Forenecedores_Transportadoras_CotarFrente.png` | — |
| [x] Cotar frete com Melhor Envio | `Avante_Fornecedores_Transportadoras_CotarComMelhorEnvio.png` | — |

### Financeiro (39) — pasta `ContabilSemdados/MaisDoFinanceiro/`
| Status · Tela | Arquivo | Dados |
|---|---|---|
| [x] Resumo financeiro | `Avante_ComoEstaODinheiro.png`, `Avante_ComoEstaODinheiro02.png`, `Avante_ComoEstaODinheiro03.png` | vazio |
| [x] Contas a pagar: lista | `Avante_DinheiroDaEmpresa_ContasAPagar.png` | vazio |
| [x] Contas a pagar: adicionar | `Avante_DinheiroDaEmpresa_ContasAPagar_AdicionarContaAPagar.png`, `Avante_exemplodeComoEstaAMaioriaDosCamposAPreencher.png` | — |
| [x] Contas a pagar: cadastro da conta | `Avante_DinheiroDaEmpresa_ContasAPagar_CadastrodeConta.png` | — |
| [x] Contas a receber: lista | `Avante_DinehiroDaEmpresa_ValoresAReceber.png` | vazio |
| [x] Contas a receber: adicionar | `Avante_DinheiroDaEmpresa_ValoresAReceber_AdicionarValor.png`, `Avante_DinheiroDaEmpresa_ValoresAReceber_AdicionarValorAReceber.png` | — |
| [x] Movimentações: vazio | `Avante_MaisDoFinaceiro_OqEntrouESaiu.png` | vazio |
| [x] Movimentações: com dados | `Avante_MaisDoFinanCeiro_OqEntrouESaiu_ComDados.png`, `Avante_MaisDoFinanceiro_Comdados.png` | dados |
| [x] Movimentação: detalhe da entrada | `Avante_MaisDoFinanceiro_OqEntrouEOqSaiu_VisualizacaoDeEbtrada.png` | dados |
| [x] Registrar entrada | `Avante_MaisDoFinanceiro_OqentrouESaiu_RegistarEntrada.png` | — |
| [x] Fluxo de caixa | `Avante_EntradaESaidaPordia.png`, `Avante_EntradaESaidaPordia02.png` | vazio |
| [x] Despesas avulsas | `Avante_DespesasAvulsas.png` | vazio |
| [x] Registrar despesa | `Avante_DespesasAvulsas_Registardespesa.png` | — |
| [x] Contas bancárias: início | `Avante_DinheiroDaEmpresa_ContasEBancos_InicioComCadastro.png` | vazio |
| [x] Contas bancárias: lista | `Avante_DinheiroDaEmpresa_ContasEBancos.png` | vazio |
| [x] Contas bancárias: cadastrar | `Avante_DinheiroDaEmpresa_ContasEBancos_Cadastrar.png` | — |
| [x] Contas bancárias: contas do PDV | `Avante_DinheiroDaEmpresa_ContasEBancos_ContasPDV.png` | vazio |
| [x] Conciliação bancária | `Avante_DinheiroDaEmpresa_ConciliacaoBancaria.png` | vazio |
| [x] Maquininhas e recebíveis | `Avante_MaquininhasERepasses.png` | vazio |
| [x] Vincular maquininha | `Avante_MaquininhasERepasses_VincularMaquininha.png` | — |
| [x] Cartões corporativos | `Avante_CastoesDaEmpresa.png` | vazio |
| [x] Vincular cartão | `Avante_CastaosDaEmpresa_Vincular.png` | — |
| [x] Investimentos | `Avante_AplicaçõesFinanceiras.png` | vazio |
| [x] Consórcios | `Avante_Consorcios.png` | vazio |
| [x] Contratos: lista | `Avante_ContratosCom dados.png` | dados |
| [x] Contrato: detalhe | `Avante_Contrato_MaisInfoQuandoClicaNoContrato.png` | dados |
| [x] Cadastrar contrato | `Avante_Contratos_CadastrarContratos.png` | — |
| [x] Plano de contas | `Avante_OperacoesFinanceiras.png`, `Avante_OpreracoesFinanceiras02.png` | vazio |
| [x] Plano de contas: despesas | `Avante_OperacaoFinanceira_Despesas01.png` | vazio |
| [x] Editar categoria de receita | `Avante_EditarOperacaoDereceita.png` | — |
| [x] Centros de custo | `Avante_CentroDeCustos.png` | vazio |
| [x] Adicionar centro de custo | `Avante_CentroDecustos_AdicionarCentro.png` | — |

### Relatórios (5)
| Status · Tela | Arquivo | Dados |
|---|---|---|
| [x] Relatórios: catálogo | `Avante_BibliotecaDeRelatorios.png`, `Avante_BibliotecaDerelatorios02.png` | — |
| [x] Relatório aberto | `Avante_BibliotecaDeRelarios_OqApareceQuandoClicoEmCadaUmDosBlocosAli.png` | vazio |
| [x] Análises | `avanteAnaliseGrafica.png`, `Avante_analiseGrafica_02.png` | vazio |

### Equipe (2)
| Status · Tela | Arquivo | Dados |
|---|---|---|
| [x] Usuários e permissões | `Avante_Equipe.png` | dados |
| [x] Adicionar pessoa | `Avante_CadastroDePessoaNaEquipe.png` | — |

### Configurações (2)
| Status · Tela | Arquivo | Dados |
|---|---|---|
| [x] Dados da empresa e preferências | `Avante_ConfiguracoesDaEmpresa.png` | — |
| [x] Documentos da empresa | `Avante_Configuracoes_arquivoasDaempresa.png` | vazio |

### Itens de menu sem print
**Empréstimos**, **Bens e patrimônio** (Imóveis e veículos) e **Funcionários e salários** aparecem na sidebar, mas não têm print. No protótipo, essas três rotas existem e mostram "Tela aguardando print de referência", sem campos inventados.

---

## 4. Telas construídas no protótipo — 113 de 113

Protótipo em `prototipo/` (rode `node prototipo/serve.js` e abra http://localhost:5173/prototipo/). Cada print tem uma URL que reproduz exatamente aquele estado: tela, aba ou modal.

**Verificação (20/11/2026):** sintaxe de todos os JS ok · 113 de 113 prints mapeados em código e no disco · 113 URLs abertas sem erro de console nem tela vazia · todos os modais esperados presentes · 284 links internos sem quebra · 35 rotas do menu com tela · sem rolagem horizontal em 1440px e 375px.

**Decisões aplicadas (vindas da seção 2):**
- **Arquivados:** viraram abas Ativos · Arquivados nas próprias listas (Clientes, Transportadoras, Contratos, Maquininhas, Cartões).
- **Adicionais:** a aba passou a se chamar **Opcionais**, com exemplo de uso.
- **Formulários longos:** contas a pagar e a receber, fornecedor e transportadora abrem em painel lateral, com os campos opcionais recolhidos.
- **Receitas de produtos:** viraram **Fichas técnicas** em todos os títulos.
- **Cores:** o terceiro verde ("Novo serviço", "Adicionar modelo") saiu e a ação secundária ficou em outline.
- **Erros do sistema original não reproduzidos:** o texto "null" no detalhe da entrada e a data "20 00:00:00/11/2026" em Despesas avulsas.

- [x] `Avante_VisaoDaLoja01.png` → `#/painel` · Painel · atalhos e indicadores
- [x] `Avante_VisaoDaLoja02.png` → `#/painel` · Painel · vencimentos e resultado
- [x] `Avante_VisaoDaLoja08_EssaManter.png` → `#/painel` · Painel · localização das vendas (mantida)
- [x] `Avante_Tela Login.png` → `#/login` · Login
- [x] `Avante_TelaDeTransicaoDoERPParaOPDV.png` → `#/transicao/pdv?parar=1` · Transição ERP → PDV
- [x] `Avante_TelaDeTransiçãoDoPdVParaERP.png` → `#/transicao/erp?parar=1` · Transição PDV → ERP
- [x] `Avante_Primeira_info_q_aparece_quando_abro.png` → `#/painel?modal=boas-vindas` · Boas-vindas
- [x] `Avante_funcoes.png` → `#/painel` · Menu lateral (parte 1)
- [x] `Avante_Funcoes02.png` → `#/financeiro` · Menu lateral (parte 2)
- [x] `Avante_Vendas_VendasRealizadas.png` → `#/vendas` · Vendas
- [x] `Avante_Vendas_VendasRealizadas_ComBuscaAtiva.png` → `#/vendas?busca=1` · Vendas · busca ativa
- [x] `Avante_Vendas_Orcamento.png` → `#/vendas/orcamentos` · Orçamentos
- [x] `Avante_Vendas_Orcamento_CliqueiNoOrçamentoEMostraIsso.png` → `#/vendas/orcamentos?modal=ver&id=2` · Orçamento · detalhe
- [x] `Avante_Vendas_Orcamento_EditarOrçamento.png` → `#/vendas/orcamentos?modal=editar&id=2` · Orçamento · editar
- [x] `Avante_Vendas_Orcamento_NovoOrcamento.png` → `#/vendas/orcamentos?modal=novo` · Orçamento · novo
- [x] `Avante_PVD.png` → `#/pdv` · PDV · atendimento (caixa fechado)
- [x] `Avante_PDV.png` → `#/pdv?estado=venda` · PDV · venda em andamento
- [x] `Avante_PDV_AbriTurno.png` → `#/pdv?modal=abrir-turno` · PDV · abrir turno
- [x] `Avante_PDV_Cloncluirvenda.png` → `#/pdv?estado=venda&modal=pagamento` · PDV · pagamento
- [x] `Avante_PDV_Aparece_QuandoCloncui_venda.png` → `#/pdv?modal=recibo&id=6` · PDV · venda concluída (recibo)
- [x] `Avante_PDV_AbaDeVendas.png` → `#/pdv/vendas` · PDV · vendas
- [x] `Avante_PDV_MeuCaixa.png` → `#/pdv/caixa` · PDV · meu caixa
- [x] `Avante_PDV_Clientes.png` → `#/pdv/clientes` · PDV · clientes
- [x] `Avante_Clientes.png` → `#/clientes` · Clientes
- [x] `Avante_Clientes_Arquvidos_EssaNaoSeiUtilidadeSugerirAlgoMelhor.png` → `#/clientes?tab=arquivados` · Clientes · arquivados (aba)
- [x] `Avante_Clientes_NovoCliente.png` → `#/clientes?modal=novo` · Clientes · novo
- [x] `Avante_Clientes_EditarCliente.png` → `#/clientes?modal=editar` · Clientes · editar
- [x] `Avante_ProdutosEServicos_ProdutosEServicos.png` → `#/catalogo/produtos` · Produtos e serviços
- [x] `Avante_ProdutosEServicos_ProdutosEServicos_OpccoesDeTela.png` → `#/catalogo/produtos?modal=opcoes` · Opções da tela
- [x] `Avante_ProdutosEServicos_AcoesDoProduto.png` → `#/catalogo/produtos?busca=1&modal=acoes` · Ações do produto
- [x] `Avante_ProdutosEServicos_AcoesDoProduto_Arquivar.png` → `#/catalogo/produtos?modal=arquivar` · Arquivar produto
- [x] `Avante_ProdutosEServicos_AcoesDoProduto_ImprimirEtiqueta.png` → `#/catalogo/produtos?modal=etiqueta` · Imprimir etiqueta
- [x] `Avante_ProdutosEServicos_acoesDoProduto_HistoricoDeHestoque.png` → `#/catalogo/produtos?modal=historico` · Histórico de estoque
- [x] `Avante_ProdutosEServicos_CadastrarProdutos_Cadastro.png` → `#/catalogo/produtos?modal=produto` · Novo produto · Cadastro
- [x] `Avante_ProdutosEServicos_CadastrarProduto_Precos.png` → `#/catalogo/produtos?modal=produto&tab=precos` · Novo produto · Preços
- [x] `Avante_ProdutosEServicos_CadastrarProduto_Estoque.png` → `#/catalogo/produtos?modal=produto&tab=estoque` · Novo produto · Estoque
- [x] `Avante_ProdutosEServicos_CadastrarProduto_Fiscal.png` → `#/catalogo/produtos?modal=produto&tab=fiscal` · Novo produto · Fiscal
- [x] `Avante_ProdutosEServicos_CadastrarProduto_Fornescedor.png` → `#/catalogo/produtos?modal=produto&tab=fornecedor` · Novo produto · Fornecedor
- [x] `Avante_ProdutosEServicos_CadastrarProduto_Adicionais.png` → `#/catalogo/produtos?modal=produto&tab=adicionais` · Novo produto · Opcionais
- [x] `Avante_ProdutosEServicos_CadastrarServiço_Cadastro.png` → `#/catalogo/produtos?modal=servico` · Novo serviço · Cadastro
- [x] `Avante_ProdutosEServicos_NovoServico_CadastrarServico_Valores.png` → `#/catalogo/produtos?modal=servico&tab=precos` · Novo serviço · Preços
- [x] `Avante_ProdutosEServicos_NovoServico_CadastrarServico_Adicionais_NaoViUtilidadeEporque.png` → `#/catalogo/produtos?modal=servico&tab=adicionais` · Novo serviço · Opcionais
- [x] `Avante_ProdutosEServicos_NovoServico_Prestacao.png` → `#/catalogo/produtos?modal=servico&tab=prestacao` · Novo serviço · Prestação
- [x] `Avante_Mensagem_DesejaContinuareditando.png` → `#/catalogo/produtos?modal=servico&tab=prestacao&sair=1` · Aviso: alterações não salvas
- [x] `Avante_ProdutosEServicos_Categorias.png` → `#/catalogo/categorias` · Categorias
- [x] `Avante_ProdutosEServicos_ContagemDeEstoque.png` → `#/catalogo/inventario` · Inventário
- [x] `Avante_ProdutosEServicos_ContagemDeEstoque_NovaContagem.png` → `#/catalogo/inventario?modal=nova` · Inventário · nova contagem
- [x] `Avante_ProdutosEServicos_ContagemDeEstoque_AbriContagem.png` → `#/catalogo/inventario?modal=abrir` · Inventário · contagem aberta
- [x] `Avante_ProdutosEServicos_ReceitasDeProdutos.png` → `#/catalogo/fichas-tecnicas` · Fichas técnicas
- [x] `Avante_ReceitaDeProdutos_CriarReceita_EscollhaProduto.png` → `#/catalogo/fichas-tecnicas?modal=escolher` · Ficha técnica · escolher produto
- [x] `Avante_ReceitasDeProdutos_CriandoReceita.png` → `#/catalogo/fichas-tecnicas?modal=nova` · Ficha técnica · montando
- [x] `Avante_ProdutosEServicos_ReceitaDeProdutos_CadastrarInsumo_eomesmoquecadastrarProduto.png` → `#/catalogo/fichas-tecnicas?modal=insumo` · Novo insumo
- [x] `Avante_ReceitaDeProdutos_estoqueDeInsumos.png` → `#/catalogo/insumos` · Insumos
- [x] `Avantes_Fornecedores_TelaDeInfoDoFornecedor.png` → `#/fornecedores?modal=ficha` · Fornecedor · ficha
- [x] `Avante_Fornecedores_NovoFornecedor.png` → `#/fornecedores?modal=novo` · Fornecedor · novo
- [x] `Avante_Fornecedor_Transportadoras.png` → `#/fornecedores/transportadoras` · Transportadoras
- [x] `Avante_Fornecedores_Transportadora_NovaTransportadora.png` → `#/fornecedores/transportadoras?modal=nova` · Transportadora · nova
- [x] `Avante_Fornecedores_Transportadoras_Arquivados.png` → `#/fornecedores/transportadoras?tab=arquivados` · Transportadoras · arquivadas (aba)
- [x] `Avante_Forenecedores_Transportadoras_CotarFrente.png` → `#/fornecedores/transportadoras?modal=cotar` · Cotar frete
- [x] `Avante_Fornecedores_Transportadoras_CotarComMelhorEnvio.png` → `#/fornecedores/transportadoras?modal=melhor-envio` · Conta Melhor Envio
- [x] `Avante_DinheiroDaEmpresa_ContasAPagar.png` → `#/financeiro/contas-a-pagar` · Contas a pagar
- [x] `Avante_DinheiroDaEmpresa_ContasAPagar_AdicionarContaAPagar.png` → `#/financeiro/contas-a-pagar?modal=novo` · Contas a pagar · adicionar
- [x] `Avante_exemplodeComoEstaAMaioriaDosCamposAPreencher.png` → `#/financeiro/contas-a-pagar?modal=novo&exemplo=1` · Contas a pagar · formulário reorganizado
- [x] `Avante_DinheiroDaEmpresa_ContasAPagar_CadastrodeConta.png` → `#/financeiro/contas-a-pagar?modal=operacao` · Cadastrar operação financeira (pagar)
- [x] `Avante_DinehiroDaEmpresa_ValoresAReceber.png` → `#/financeiro/contas-a-receber` · Contas a receber
- [x] `Avante_DinheiroDaEmpresa_ValoresAReceber_AdicionarValorAReceber.png` → `#/financeiro/contas-a-receber?modal=novo` · Contas a receber · adicionar
- [x] `Avante_DinheiroDaEmpresa_ValoresAReceber_AdicionarValor.png` → `#/financeiro/contas-a-receber?modal=operacao` · Cadastrar operação financeira (receber)
- [x] `Avante_MaisDoFinaceiro_OqEntrouESaiu.png` → `#/financeiro/movimentacoes?estado=vazio` · Movimentações · sem lançamentos
- [x] `Avante_MaisDoFinanCeiro_OqEntrouESaiu_ComDados.png` → `#/financeiro/movimentacoes` · Movimentações · com lançamento
- [x] `Avante_MaisDoFinanceiro_Comdados.png` → `#/financeiro/movimentacoes` · Movimentações · com lançamento (menu)
- [x] `Avante_MaisDoFinanceiro_OqEntrouEOqSaiu_VisualizacaoDeEbtrada.png` → `#/financeiro/movimentacoes?modal=ver` · Movimentação · detalhe da entrada
- [x] `Avante_MaisDoFinanceiro_OqentrouESaiu_RegistarEntrada.png` → `#/financeiro/movimentacoes?estado=vazio&modal=entrada` · Registrar entrada
- [x] `Avante_EntradaESaidaPordia.png` → `#/financeiro/fluxo-de-caixa` · Fluxo de caixa
- [x] `Avante_EntradaESaidaPordia02.png` → `#/financeiro/fluxo-de-caixa` · Fluxo de caixa · detalhamento
- [x] `Avante_ComoEstaODinheiro.png` → `#/financeiro` · Resumo financeiro
- [x] `Avante_ComoEstaODinheiro02.png` → `#/financeiro` · Resumo financeiro · vendas e produtos
- [x] `Avante_ComoEstaODinheiro03.png` → `#/financeiro` · Resumo financeiro · prazos e atalhos
- [x] `Avante_DespesasAvulsas.png` → `#/financeiro/despesas-avulsas` · Despesas avulsas
- [x] `Avante_DespesasAvulsas_Registardespesa.png` → `#/financeiro/despesas-avulsas?modal=novo` · Registrar despesa
- [x] `Avante_DinheiroDaEmpresa_ContasEBancos.png` → `#/financeiro/contas-bancarias` · Contas bancárias · sem contas
- [x] `Avante_DinheiroDaEmpresa_ContasEBancos_InicioComCadastro.png` → `#/financeiro/contas-bancarias?estado=com-conta` · Contas bancárias · com conta
- [x] `Avante_DinheiroDaEmpresa_ContasEBancos_Cadastrar.png` → `#/financeiro/contas-bancarias?modal=nova` · Cadastrar conta financeira
- [x] `Avante_DinheiroDaEmpresa_ContasEBancos_ContasPDV.png` → `#/financeiro/contas-bancarias?modal=pdv` · Contas de recebimento do PDV
- [x] `Avante_DinheiroDaEmpresa_ConciliacaoBancaria.png` → `#/financeiro/conciliacao` · Conciliação bancária
- [x] `Avante_MaquininhasERepasses.png` → `#/financeiro/maquininhas` · Maquininhas e recebíveis
- [x] `Avante_MaquininhasERepasses_VincularMaquininha.png` → `#/financeiro/maquininhas?modal=vincular` · Maquininha · vincular conta
- [x] `Avante_CastoesDaEmpresa.png` → `#/financeiro/cartoes` · Cartões corporativos
- [x] `Avante_CastaosDaEmpresa_Vincular.png` → `#/financeiro/cartoes?modal=vincular` · Cartão · vincular conta
- [x] `Avante_AplicaçõesFinanceiras.png` → `#/financeiro/investimentos` · Investimentos
- [x] `Avante_Consorcios.png` → `#/financeiro/consorcios` · Consórcios
- [x] `Avante_ContratosCom dados.png` → `#/financeiro/contratos` · Contratos
- [x] `Avante_Contrato_MaisInfoQuandoClicaNoContrato.png` → `#/financeiro/contratos?modal=ver` · Contrato · detalhe
- [x] `Avante_Contratos_CadastrarContratos.png` → `#/financeiro/contratos?modal=novo` · Cadastrar contrato
- [x] `Avante_OperacoesFinanceiras.png` → `#/financeiro/plano-de-contas` · Plano de contas · receitas
- [x] `Avante_OpreracoesFinanceiras02.png` → `#/financeiro/plano-de-contas?tab=despesas` · Plano de contas · grupos de despesa
- [x] `Avante_OperacaoFinanceira_Despesas01.png` → `#/financeiro/plano-de-contas?tab=despesas` · Plano de contas · despesas
- [x] `Avante_EditarOperacaoDereceita.png` → `#/financeiro/plano-de-contas?modal=editar` · Editar operação financeira
- [x] `Avante_CentroDeCustos.png` → `#/financeiro/centros-de-custo` · Centros de custo
- [x] `Avante_CentroDecustos_AdicionarCentro.png` → `#/financeiro/centros-de-custo?modal=novo` · Adicionar centro de custo
- [x] `Avante_BibliotecaDeRelatorios.png` → `#/relatorios` · Relatórios
- [x] `Avante_BibliotecaDerelatorios02.png` → `#/relatorios?area=financeiro` · Relatórios · financeiros
- [x] `Avante_BibliotecaDeRelarios_OqApareceQuandoClicoEmCadaUmDosBlocosAli.png` → `#/relatorios?modal=relatorio&id=5` · Configurar relatório
- [x] `avanteAnaliseGrafica.png` → `#/relatorios/analises` · Análises · extrato de conta
- [x] `Avante_analiseGrafica_02.png` → `#/relatorios/analises` · Análises · detalhamento
- [x] `Avante_VisaoDaLoja03.png` → `#/relatorios/analises?tab=vendas` · Análises · painel de vendas
- [x] `Avante_VisaoDaLoja04.png` → `#/relatorios/analises?tab=vendas` · Análises · painel de vendas
- [x] `Avante_VisaoDaLoja05.png` → `#/relatorios/analises?tab=vendas` · Análises · painel de vendas
- [x] `Avante_visaoDaLoja06.png` → `#/relatorios/analises?tab=vendas` · Análises · painel de vendas
- [x] `Avante_VisaoDaLoja07.png` → `#/relatorios/analises?tab=vendas` · Análises · painel de vendas
- [x] `Avante_Equipe.png` → `#/equipe` · Usuários e permissões
- [x] `Avante_CadastroDePessoaNaEquipe.png` → `#/equipe?modal=novo` · Adicionar à equipe
- [x] `Avante_ConfiguracoesDaEmpresa.png` → `#/configuracoes` · Dados da empresa e preferências
- [x] `Avante_Configuracoes_arquivoasDaempresa.png` → `#/configuracoes/documentos` · Documentos da empresa
