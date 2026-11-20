# 09 · Arquivos anexos — o que é cada um e como usar

> Envie estes arquivos junto do pacote, mantendo a estrutura de pastas. **Prioridade de fonte em caso de conflito:** `design-handoff/` > `prototipo/css/tokens.css` > `prototipo/` (visual e conteúdo) > `DESIGN.md` (seções 0 e 0.1) > `MAPA_DE_TELAS.md` > `referencias/` (só conteúdo e regras de negócio; o **visual** dos prints é o antigo e **não** deve ser copiado).

## 1. Raiz do projeto

| Arquivo | Conteúdo | Como usar |
|---|---|---|
| `DESIGN.md` | Design system em formato curto. **As seções 0 (identidade) e 0.1 (estilo visual) são as vigentes**; a seção 2 traz tokens antigos, marcados como "versão anterior" | Consulta rápida. Em caso de conflito, vale `design-handoff/03-tokens.md` |
| `MAPA_DE_TELAS.md` | (1) menu antigo × menu aprovado; (2) decisões sobre os pontos marcados pelo cliente; (3) catálogo dos 113 prints por módulo com o status `[x]`; (4) lista dos 113 prints → URL do estado no protótipo | Use a seção 4 para abrir cada estado no protótipo e comparar |
| `.claude/skills/erp-design/SKILL.md` | Regras de UI de ERP (densidade, tokens, tabelas, filtros, formulários, auditoria) | Regras gerais; o estilo visual atualizado está em 04-estilos-visuais.md |
| `skills-lock.json`, demais pastas em `.claude/skills/` | Skills de design de terceiros instaladas no projeto | Opcional, não é necessário para implementar |

## 2. `prototipo/` — protótipo navegável (HTML, CSS e JS puros, sem dependências)

Rodar: `node prototipo/serve.js` → http://localhost:5173/prototipo/

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Carrega fontes (Inter, JetBrains Mono), CSS na ordem tokens → app → components → screens → theme e os scripts das telas |
| `serve.js` | Servidor estático mínimo em Node, porta 5173, servindo a pasta raiz (para que os prints em `referencias/` também sejam acessíveis) |
| **`css/tokens.css`** | **Fonte única de valores**: todas as cores (claro e escuro), gradientes, raios, sombras e fontes. Copie para o projeto final |
| `css/app.css` | Base: reset, tipografia, botões, badges, topbar, menu lateral, shell, página, cartões, atalhos, KPIs, pendências, visão conectada, globo, skeleton, paleta e responsivo |
| `css/components.css` | Componentes do `ui.js`: campos, formulários, barra de filtros, tabela, abas, modal e painel lateral, lista de definição, variantes de KPI, grids utilitários, chips, info |
| `css/screens.css` | Estilos específicos de telas: login, transições, boas-vindas, aviso de não salvo, faixa de resumo de vendas, orçamento, catálogo (modal de item, etiqueta), financeiro (gráficos, barras, agenda, plano de contas), relatórios, equipe e PDV |
| **`css/theme.css`** | **Camada do estilo atual** (carregada por último): canvas, topbar sem borda, menu flutuante, pílulas, cartões sem borda, gradientes, ativo em preto, gráficos em azul, logo. Mostra exatamente o que mudou em relação à base |
| `js/icons.js` | Ícones no estilo Lucide (paths SVG) + utilitários `icon()`, `brl()` (moeda BRL), `int()` e `esc()` |
| `js/data.js` | Dados reais extraídos dos prints que alimentam o Painel (nenhum dado inventado) |
| `js/menu.js` | **Menu aprovado** (`MENU`), as 8 ações de criação com atalhos `Alt+n` (`CREATE_ACTIONS`) e `flatRoutes()` |
| **`js/ui.js`** | **Biblioteca de componentes**: `pageHeader`, `btn`, `badge`, `field`, `formSection`, `filterBar`, `filter`, `dataTable`, `pager`, `tabs`, `card`, `kpi`, `kpis`, `modal`, `confirm`, `statusTabs`, `dl`, `section`, `page`, `href` (estado na URL). Também o registro `screen()` / `print()` |
| `js/app.js` | Shell: topbar, menu lateral, roteador por hash com query (`Router`), menus suspensos, paleta `Ctrl K`, atalhos globais, tema escuro e a **logo em SVG** (`LogoMark`, `LogoSvg`) |
| `js/painel.js` | Painel completo (boas-vindas, atalhos, KPIs, pendências, visão conectada, gráfico, localização) |
| `js/globe.js` | Globo pontilhado em canvas (seção "Onde você vende") |
| `js/screens/acesso.js` | Login, transições ERP ↔ PDV, modal de boas-vindas, aviso de alterações não salvas |
| `js/screens/vendas.js` | Vendas (`SalesPage`, compartilhada com o PDV) e Orçamentos (lista, detalhe, novo, editar) |
| `js/screens/pdv.js` | PDV: atendimento, abrir turno, pagamento, recibo, estorno, vendas, meu caixa e clientes |
| `js/screens/clientes.js` | Clientes (`ClientsPage`, `ClientForm`) |
| `js/screens/catalogo.js` | Produtos e serviços, `ItemModal` (produto, serviço, insumo e todas as abas), opções da tela, ações, etiqueta, histórico, categorias, inventário, fichas técnicas e insumos |
| `js/screens/fornecedores.js` | Fornecedores (lista, ficha, novo) e Transportadoras (lista, nova, cotar frete, Melhor Envio) |
| `js/screens/financeiro.js` | `LineChart`, `BarList`, Resumo financeiro, Contas a pagar e a receber (`TitlesPage`), Movimentações, Fluxo de caixa e Despesas avulsas |
| `js/screens/financeiro-bancos.js` | Contas bancárias, Conciliação, Maquininhas e Cartões |
| `js/screens/financeiro-patrimonio.js` | Empréstimos e Bens (aguardando print), Investimentos, Consórcios, Contratos, Plano de contas e Centros de custo |
| `js/screens/relatorios.js` | Os 36 relatórios (nomes e descrições exatas), configuração de relatório e Análises (extrato de conta e painel de vendas) |
| `js/screens/equipe-config.js` | Usuários e permissões (5 perfis), Funcionários (aguardando print), Dados da empresa e preferências e Documentos da empresa |

**Como a outra LLM deve usar o protótipo:** como especificação visual e de conteúdo. Não é preciso portar o JavaScript linha a linha; reimplemente cada tela com os componentes React equivalentes e use os textos, campos, colunas e dados exatamente como aparecem.

## 3. `referencias/` — 113 prints do sistema original

| Pasta | Conteúdo |
|---|---|
| `referencias/*.png` (61) | Login, Painel antigo ("Visão da loja" 01–08), Vendas, Orçamentos, PDV, Clientes, Catálogo e Fornecedores |
| `referencias/ContabilSemdados/MaisDoFinanceiro/*.png` (52) | Financeiro, Relatórios, Análises, Equipe, Configurações, transições e menu lateral. A maioria está **sem dados** de propósito |

- **O nome de cada arquivo descreve a tela** (ex.: `Avante_DinheiroDaEmpresa_ContasAPagar_AdicionarContaAPagar.png`).
- Use os prints para conferir **conteúdo, campos, textos e regras de negócio**, **nunca o visual**: o visual antigo (verde-petróleo, bordas, cantos pequenos) foi substituído.
- Os prints contêm dados pessoais reais (nome, CPF, telefone, e-mail). **Não publique** o repositório nem os prints.

## 4. Pacote `design-handoff/`

| Arquivo | Resumo |
|---|---|
| `README.md` | Índice, ficha do projeto, ordem de leitura, prompt sugerido |
| `01-visao-geral.md` | Nome, tipo de design, ideia, personalidade, público, princípios, decisões |
| `02-identidade-marca.md` | Logo (construção, SVG, tamanhos, regras), paleta, proibições, distribuição de cor |
| `03-tokens.md` | Todos os tokens com HSL e HEX, gradientes, forma, sombras, tipografia, espaçamento, alturas, breakpoints, z-index e movimento |
| `04-estilos-visuais.md` | O estilo "soft dashboard" detalhado, elemento por elemento |
| `05-componentes.md` | Especificação dos 23 componentes base + componentes de tela |
| `06-layout-navegacao.md` | Shell, menu completo com rotas, atalhos, estado na URL, layout do PDV e responsivo |
| `07-telas.md` | Todas as telas com conteúdo exato |
| `08-regras-implementacao.md` | Regras, config do Tailwind, ajustes no shadcn, ordem de construção, checklist, critérios de aceite e erros comuns |
| `09-arquivos-anexos.md` | Este arquivo |
