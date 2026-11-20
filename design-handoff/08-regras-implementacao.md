# 08 · Regras de implementação

## 1. Regras inegociáveis

1. **Só tokens.** Nenhuma cor HEX, RGB ou HSL literal em componentes. Use `hsl(var(--token))`. A única exceção é o próprio arquivo de tokens.
2. **Zero verde.** Positivo e sucesso usam o azul (`--status-success`). Se algum verde aparecer, é bug.
3. **Uma ação primária por tela**, no canto superior direito do cabeçalho (no modal, à direita do rodapé).
4. **Toda ação destrutiva** (arquivar, anular, estornar, cancelar contagem, fechar turno, excluir) abre a **confirmação** antes de executar.
5. **Fidelidade ao conteúdo:** não invente campos, colunas, filtros, opções nem dados. Tela sem dados = estado vazio. Telas sem print (Empréstimos, Bens e patrimônio, Funcionários e salários) ficam como "aguardando referência".
6. **Nomes:** use exatamente os nomes de menu e títulos de 06 e 07 ("Fichas técnicas", "Contas a receber", "Movimentações", "Plano de contas"…), não os nomes antigos dos prints.
7. **Números:** `tabular-nums`, alinhados à direita, `Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'})`, datas `dd/mm/aaaa`, data e hora `dd/mm/aaaa, hh:mm:ss`.
8. **Componentes reutilizáveis** para tudo o que está em 05. Nenhuma tela com CSS próprio para botão, cartão, tabela, campo ou modal.
9. **Estado na URL** (modal, aba, status, busca), para que todo estado seja linkável e o `Esc`/voltar funcionem.
10. **Acessibilidade WCAG AA:** contraste ≥ 4,5:1 (todos os tokens já passam), foco visível, `label` em todo campo, `aria-label` em botões só com ícone, `aria-current` no menu, `aria-modal` em modais e navegação completa por teclado (`Tab`, `Enter`, `Esc`).

## 2. Mapeamento para React + Tailwind + shadcn/ui

### `tailwind.config.ts` (trecho)
```ts
theme: {
  extend: {
    colors: {
      background: 'hsl(var(--background))', foreground: 'hsl(var(--foreground))',
      card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
      popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
      muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
      border: 'hsl(var(--border))', input: 'hsl(var(--input))', ring: 'hsl(var(--ring))',
      primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))',
                 hover: 'hsl(var(--primary-hover))', active: 'hsl(var(--primary-active))', subtle: 'hsl(var(--primary-subtle))' },
      ink: { DEFAULT: 'hsl(var(--ink))', foreground: 'hsl(var(--ink-foreground))' },
      secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
      accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
      destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
      sidebar: { DEFAULT: 'hsl(var(--sidebar))', foreground: 'hsl(var(--sidebar-foreground))',
                 active: 'hsl(var(--sidebar-active))', 'active-foreground': 'hsl(var(--sidebar-active-foreground))',
                 'sub-active': 'hsl(var(--sidebar-sub-active))', 'sub-active-foreground': 'hsl(var(--sidebar-sub-active-foreground))' },
      status: {
        success: { DEFAULT: 'hsl(var(--status-success))', fg: 'hsl(var(--status-success-fg))' },
        warning: { DEFAULT: 'hsl(var(--status-warning))', fg: 'hsl(var(--status-warning-fg))' },
        error:   { DEFAULT: 'hsl(var(--status-error))',   fg: 'hsl(var(--status-error-fg))' },
        pending: { DEFAULT: 'hsl(var(--status-pending))', fg: 'hsl(var(--status-pending-fg))' },
        invoiced:{ DEFAULT: 'hsl(var(--status-invoiced))',fg: 'hsl(var(--status-invoiced-fg))' },
        cancelled:{DEFAULT: 'hsl(var(--status-cancelled))',fg:'hsl(var(--status-cancelled-fg))' },
      },
    },
    borderRadius: { sm: '8px', DEFAULT: '12px', lg: '18px', modal: '22px', pill: '999px' },
    boxShadow: { card: 'var(--shadow-card)', pop: 'var(--shadow-pop)', brand: 'var(--shadow-brand)', modal: 'var(--shadow-modal)' },
    backgroundImage: { 'gradient-brand': 'var(--gradient-brand)', 'gradient-ink': 'var(--gradient-ink)' },
    fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
  },
},
darkMode: 'class',
```
Copie os blocos `:root` e `.dark` de `prototipo/css/tokens.css` para `globals.css`.

### Ajustes nos componentes shadcn
| shadcn | Ajuste |
|---|---|
| `Button` | `rounded-pill font-semibold h-9 px-4`; `default` = `bg-primary shadow-brand hover:bg-primary-hover`; crie as variantes `danger-outline` e `link` |
| `Card` | `rounded-lg border-0 shadow-card bg-card` (no escuro: `dark:border`); `CardHeader` sem borda; adicione as variantes `accent` (`bg-gradient-brand text-white shadow-brand`) e `dark` (`bg-gradient-ink text-white`) |
| `Tabs` | `TabsList` = `rounded-pill bg-muted p-[3px]`; `TabsTrigger[data-state=active]` = `bg-ink text-ink-foreground` |
| `Input`, `Select`, `Textarea` | `h-[38px] rounded-[10px] border-input`; foco `ring-[3px] ring-ring/15 border-ring` |
| `Badge` | `rounded-pill h-[22px] px-[9px] text-xs font-semibold` + variantes por status |
| `Dialog` | `rounded-modal border-0 shadow-modal`; overlay `bg-ink/35 backdrop-blur-[3px]` |
| `Sheet` (lado direito) | largura de 680px, `rounded-l-modal` |
| `AlertDialog` | Confirmação destrutiva |
| `Command` | Paleta `Ctrl K` |
| `DropdownMenu` | `rounded-[14px] shadow-pop`, itens `rounded-[10px]` |
| `Skeleton` | `bg-muted` |
| Tabela | `@tanstack/react-table` + componente `DataTable` próprio |
| Ícones | `lucide-react` |
| Gráficos | Recharts com cores `hsl(var(--primary))` e `hsl(var(--ink) / .4)` |

## 3. Ordem sugerida de construção

1. Tokens (`globals.css` + `tailwind.config`) e fonte Inter.
2. Logo, AppShell, Topbar, Sidebar (com o menu completo de 06), roteamento com estado na URL.
3. Componentes base: Button, Badge, Card, KpiCard, Tabs, Field, FormSection, FilterBar, DataTable, EmptyState, Modal, Sheet, Confirm, Skeleton.
4. Painel (é a vitrine do estilo).
5. Telas na ordem do menu: Vendas → PDV → Clientes → Catálogo → Fornecedores → Financeiro → Relatórios → Equipe → Configurações.
6. Tema escuro, responsivo e atalhos de teclado.
7. Revisão com o checklist abaixo.

## 4. Checklist por tela (entregar só com tudo marcado)

- [ ] Título e breadcrumbs com o nome aprovado (06/07)
- [ ] No máximo 1 botão primário; destrutivas com confirmação
- [ ] Só tokens; nenhuma cor literal; nenhum verde
- [ ] Cartões sem borda, raio 18px, sombra suave; botões e abas em pílula
- [ ] No máximo 1 cartão em gradiente azul e 1 escuro
- [ ] Números tabulares e à direita; moeda e datas em pt-BR
- [ ] Estados: carregando (skeleton), vazio (com ação), erro, com dados
- [ ] Campos com label acima, obrigatórios com *, ajuda/erro abaixo
- [ ] Nenhum campo, coluna ou dado inventado (comparar com o print em `referencias/`)
- [ ] Teclado: Tab percorre em ordem, Enter envia, Esc fecha
- [ ] Sem rolagem horizontal em 1440px e em 375px
- [ ] Tema escuro legível
- [ ] Estado linkável por URL

## 5. Critérios de aceite do projeto

| Critério | Como verificar |
|---|---|
| Cobertura | As 41 rotas existem e os 113 estados de `MAPA_DE_TELAS.md` (seção 4) abrem sem erro |
| Navegação | Todos os itens do menu levam a uma tela; nenhum link interno quebrado |
| Marca | Nenhum elemento com cor de matiz entre 85° e 175° (verde) com saturação acima de 20% |
| Contraste | Todos os pares texto/fundo ≥ 4,5:1 |
| Responsivo | Sem rolagem horizontal da página em 375px, 768px, 1024px e 1440px |
| Consistência | Componentes base usados em 100% das telas |
| Fidelidade | Os dados mostrados batem com os prints (ver 07) |

## 6. Erros comuns a evitar

| Erro | Correto |
|---|---|
| Deixar o PDV verde ou com tema próprio | PDV no mesmo azul da marca |
| Badge "Ativo/Pago" verde | Badge azul-claro com texto azul-escuro |
| Gráfico de entradas verde e saídas vermelho | Entradas em azul, saídas em tinta 40% |
| Cartão com borda cinza + sombra forte | Sem borda, `--shadow-card` |
| Botão retangular com raio 6px | Pílula (999px) |
| Item ativo do menu em azul | Pílula **preta** (subitem: azul-claro) |
| Vários cartões coloridos na mesma tela | No máximo 1 azul + 1 escuro |
| Modal "Arquivados" separado | Aba Ativos · Arquivados na lista |
| Inventar colunas onde o print só tem estado vazio | Estado vazio sem tabela (Maquininhas, Cartões, Fichas técnicas) |
| Mostrar "null" ou datas quebradas do sistema antigo | Corrigir: omitir "null", formatar `dd/mm/aaaa` |
