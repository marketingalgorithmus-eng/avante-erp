# 06 · Layout e navegação

## 1. Estrutura das páginas

```
┌──────────────────────────────────────────────────────────────────────┐
│ ☰  Avante ERP      ( 🔍 Buscar telas e ações…  Ctrl K )   [+ Criar] [Assistente] 🔔 (R Responsável ▾) │  topbar 64px, cor do canvas
├───────────────┬──────────────────────────────────────────────────────┤
│ ┌───────────┐ │  Catálogo › Produtos e serviços                        │
│ │Empresa    │ │  Produtos e serviços                [Opções] [+ Novo produto] │  PageHeader
│ │ativa ▾    │ │                                                        │
│ └───────────┘ │  ┌──────────────────────────────────────────────────┐ │
│ (● Painel   ) │  │ (Todos 1)(Ativos 1)(Arquivados 0)   [Buscar e filtrar] │ │  DataTable em cartão
│  Vendas     ▾ │  │ PRODUTO       SKU    PREÇO   …            AÇÕES      │ │
│  Clientes     │  └──────────────────────────────────────────────────┘ │
│  Catálogo   ▾ │                                                        │
│   …           │                                                        │
│ [▣ Abrir PDV ]│                                                        │
└───────────────┴──────────────────────────────────────────────────────┘
  menu 268px, painel branco flutuante (margem 12px, raio 18px)
```

- Conteúdo: `max-width: 1440px`, padding de 8px 24px 32px e gap de 18px entre blocos.
- Ordem padrão de uma tela de lista: **PageHeader → (chips de telas relacionadas) → FilterBar ou KPIs → DataTable**.
- Ordem padrão de uma tela de resumo: **PageHeader → filtros de período → KPIs → cartões em grid de 2 colunas (2fr/1fr em gráficos) → tabelas de detalhamento**.

## 2. Menu (nomes aprovados — usar exatamente estes)

| Grupo | Itens | Rota |
|---|---|---|
| **Painel** (ícone grade) | — | `/painel` |
| **Vendas** (recibo) | Vendas | `/vendas` |
| | Orçamentos | `/vendas/orcamentos` |
| | PDV (Frente de caixa) | `/pdv` |
| **Clientes** (pessoas) | — | `/clientes` |
| **Catálogo** (caixa) | Produtos e serviços | `/catalogo/produtos` |
| | Fichas técnicas | `/catalogo/fichas-tecnicas` |
| | Insumos | `/catalogo/insumos` |
| | Inventário | `/catalogo/inventario` |
| | Categorias | `/catalogo/categorias` |
| **Fornecedores e frete** (caminhão) | Fornecedores | `/fornecedores` |
| | Transportadoras | `/fornecedores/transportadoras` |
| **Financeiro** (banco) | Resumo financeiro | `/financeiro` |
| | *— DIA A DIA —* | |
| | Contas a pagar | `/financeiro/contas-a-pagar` |
| | Contas a receber | `/financeiro/contas-a-receber` |
| | Movimentações | `/financeiro/movimentacoes` |
| | Fluxo de caixa | `/financeiro/fluxo-de-caixa` |
| | Despesas avulsas | `/financeiro/despesas-avulsas` |
| | *— BANCOS E MEIOS —* | |
| | Contas bancárias | `/financeiro/contas-bancarias` |
| | Conciliação bancária | `/financeiro/conciliacao` |
| | Maquininhas e recebíveis | `/financeiro/maquininhas` |
| | Cartões corporativos | `/financeiro/cartoes` |
| | *— PATRIMÔNIO —* | |
| | Empréstimos | `/financeiro/emprestimos` |
| | Investimentos | `/financeiro/investimentos` |
| | Consórcios | `/financeiro/consorcios` |
| | Bens e patrimônio | `/financeiro/bens` |
| | Contratos | `/financeiro/contratos` |
| | *— CADASTROS —* | |
| | Plano de contas | `/financeiro/plano-de-contas` |
| | Centros de custo | `/financeiro/centros-de-custo` |
| **Relatórios** (gráfico de barras) | Relatórios | `/relatorios` |
| | Análises | `/relatorios/analises` |
| **Equipe** (pessoa +) | Usuários e permissões | `/equipe` |
| | Funcionários e salários | `/equipe/funcionarios` |
| **Configurações** (sliders) | Dados da empresa e preferências | `/configuracoes` |
| | Documentos da empresa | `/configuracoes/documentos` |

**Rotas fora do menu**: `/login`, `/transicao/pdv` (vai para `/pdv` após ~900ms), `/transicao/erp` (vai para `/painel`), `/pdv/vendas`, `/pdv/caixa` e `/pdv/clientes`.

## 3. Ações de criação (menu "Criar", atalhos do Painel e `Alt+n`)

| Tecla | Ação | Destino |
|---|---|---|
| `Alt+1` | Abrir PDV | `/transicao/pdv` |
| `Alt+2` | Nova venda | `/transicao/pdv` |
| `Alt+3` | Novo orçamento | `/vendas/orcamentos?modal=novo` |
| `Alt+4` | Conta a pagar | `/financeiro/contas-a-pagar?modal=novo` |
| `Alt+5` | Conta a receber | `/financeiro/contas-a-receber?modal=novo` |
| `Alt+6` | Registrar despesa | `/financeiro/despesas-avulsas?modal=novo` |
| `Alt+7` | Novo cliente | `/clientes?modal=novo` |
| `Alt+8` | Novo produto | `/catalogo/produtos?modal=produto` |

Outros atalhos globais: `Ctrl K` (busca), `Esc` (fecha a paleta, depois o modal, depois os menus e a gaveta).

## 4. Estado na URL (obrigatório)

Todo estado visível precisa ser linkável por query string:

| Parâmetro | Significado | Exemplo |
|---|---|---|
| `modal` | Modal aberto | `?modal=novo`, `?modal=ver&id=2`, `?modal=arquivar` |
| `tab` | Aba de página ou de modal | `?modal=produto&tab=estoque` |
| `status` | Aba de status da lista | `?status=arquivados` |
| `busca` | Filtros da tabela abertos | `?busca=1` |
| `estado` | Variação de conteúdo | `?estado=venda` (PDV com itens), `?estado=vazio` |
| `sair` | Aviso de alterações não salvas | `?sair=1` |
| `area` | Filtro de área de relatórios | `?area=financeiro` |

## 5. Layout do PDV

```
┌───────────────────────────────────────────────────────────────────────┐
│ Avante PDV  (■ Atendimento)( Vendas )( Meu caixa )( Clientes )   [Abrir ERP] [João Pertile ▾] [Assistente] 🔔 R │
├───────────────────────────────────────────────────────────────────────┤
│ Atendimento                 ✓ Conectado · Cobranças Pix ⇧F8 · Rascunhos Alt+6 · … │
│ ┌ Caixa fechado ─[Abrir turno F8]┐  [+ Nova venda F3]          [Vendas em espera F4] │
│ ( 🔍 Produto ou serviço, SKU ou código                    F2 [▥] )  ┌ Venda atual ─────┐ │
│ [Todas as categorias ▾]                               1 item       │ Consumidor não id.│ │
│ ┌──────────┐                                                       │ …                 │ │
│ │ □ Camiseta│                                                       │ Total  R$ 0,00    │ │
│ │ R$ 74,90  │                                                       │ [Ir p/ pagamento] │ │
│ └──────────┘                                                       └──────────────────┘ │
└───────────────────────────────────────────────────────────────────────┘
```

- Sem menu lateral. Navegação por **abas em pílula na topbar** (a ativa em preto).
- Grid de 2 colunas: catálogo (1fr) + carrinho de 420px fixo ao rolar. Em telas < 1100px, coluna única.
- Tudo em **azul da marca**: "Nova venda", "Abrir turno", "Ir para pagamento" e "Concluir venda" são botões primários azuis.

## 6. Responsivo

| Largura | Comportamento |
|---|---|
| ≥ 1024px | Menu fixo (recolhível para 84px) |
| < 1024px | Menu vira gaveta (272px) com scrim; busca vira botão de ícone; "Assistente" fica oculto |
| < 760px | Todos os grids viram 1 coluna; formulários com campos de largura total; modais em tela cheia; filtros empilhados |
| < 640px | Atalhos do Painel em 2 colunas, sem dica de tecla; nome do usuário oculto; sufixo da logo oculto |

**Regra**: nenhuma tela pode ter rolagem horizontal da página. Só tabelas rolam na horizontal, dentro do próprio cartão.
