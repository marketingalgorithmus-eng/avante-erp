# 08 · Regras de implementação

## 1. Regras inegociáveis

1. **Só tokens.** Nenhuma cor HEX, RGB ou HSL literal em componentes. Use `hsl(var(--token))`. A única exceção é o próprio arquivo de tokens.
2. **Zero verde, zero preto, zero degradê.** Positivo e sucesso usam o azul (`--status-success`); o escuro é o marinho (`--ink`); superfícies de marca são cores sólidas. O único degradê é o fundo `--canvas-art`.
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
                 hover: 'hsl(var(--primary-hover))', active: 'hsl(var(--primary-active))',
                 subtle: 'hsl(var(--primary-subtle))', tint: 'hsl(var(--primary-tint))' },
      sky: { DEFAULT: 'hsl(var(--sky))', subtle: 'hsl(var(--sky-subtle))' },
      indigo: { DEFAULT: 'hsl(var(--indigo))', subtle: 'hsl(var(--indigo-subtle))' },
      navy: { DEFAULT: 'hsl(var(--navy))', subtle: 'hsl(var(--navy-subtle))' },
      flyout: { DEFAULT: 'hsl(214 100% 97%)', foreground: 'hsl(var(--flyout-foreground))' },
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
    backgroundImage: { canvas: 'var(--canvas-art)' },   // único degradê: fundo da página
    fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], display: ['DM Sans', 'Inter', 'sans-serif'],
                  mono: ['JetBrains Mono', 'monospace'] },
  },
},
darkMode: 'class',
```
Copie os blocos `:root` e `.dark` de `prototipo/css/tokens.css` para `globals.css`, **incluindo o bloco v3 do final** (ele sobrescreve o azul, as superfícies `--gradient-*` como cores sólidas, `--shadow-brand`, `--primary-tint` e `--font-display`). No `body`: `background: var(--canvas-art); background-attachment: fixed;`.

### Ajustes nos componentes shadcn
| shadcn | Ajuste |
|---|---|
| `Button` | `rounded-pill font-semibold h-9 px-4`; `default` = `bg-primary shadow-brand hover:bg-primary-hover`; crie as variantes `danger-outline` e `link` |
| `Card` | `rounded-lg border-0 shadow-card bg-card` (no escuro: `dark:border`); `CardHeader` sem borda; adicione as variantes `accent` (`bg-primary text-primary-foreground shadow-brand`, com `AvanteDeco`), `dark` (`bg-ink text-ink-foreground`), `soft-sky` (`bg-sky-subtle`) e `soft-indigo` (`bg-indigo-subtle`) |
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
| Gráficos | Recharts: entradas `hsl(var(--primary))`, saídas `hsl(var(--indigo) / .7)` |
| Títulos | `font-display tracking-[-0.03em]` em h1, títulos de bloco, KPIs, modais e totais |

## 3. Ordem sugerida de construção

1. Tokens (`globals.css` + `tailwind.config`), fundo `--canvas-art` e fontes DM Sans, Inter e JetBrains Mono.
2. Logo (com o realce do branco), `AvanteDeco`, AppShell, Topbar, Sidebar azul + Flyout "Mais do financeiro" + PdvLaunch (menu completo de 06), roteamento com estado na URL.
3. Componentes base: Button, Badge, Card, KpiCard, Tabs, Field, FormSection, FilterBar, DataTable, EmptyState, Modal, Sheet, Confirm, Skeleton.
4. Painel (é a vitrine do estilo): HeroBanner, atalhos, KPIs, FinancialCalendar, FocusList/ActivityList, MoneyBlock e localização.
5. Telas na ordem do menu: Vendas → PDV → Clientes → Catálogo → Fornecedores → Financeiro → Relatórios → Equipe → Configurações.
6. Tema escuro, responsivo e atalhos de teclado.
7. Revisão com o checklist abaixo.

## 4. Checklist por tela (entregar só com tudo marcado)

- [ ] Título e breadcrumbs com o nome aprovado (06/07)
- [ ] No máximo 1 botão primário; destrutivas com confirmação
- [ ] Só tokens; nenhuma cor literal; nenhum verde, preto ou degradê
- [ ] Cartões sem borda, raio 18px, sombra suave; botões e abas em pílula
- [ ] Títulos e números grandes em DM Sans (−0.03em)
- [ ] Telas internas: no máximo 1 cartão azul sólido e 1 marinho
- [ ] Símbolo da Avante só em superfícies de marca, cortado pela borda e `aria-hidden`
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
| Gráfico de entradas verde e saídas vermelho | Entradas em azul, saídas em índigo |
| Cartão, menu ou botão com degradê | Cor sólida (azul `#0A5EE6` ou marinho `#102760`) |
| Preto (`#000`, `#12151C`) em texto, avatar ou aba ativa | Marinho `#102760`; texto `#141D34` |
| Menu lateral branco | Menu **azul sólido** com item ativo em pílula branca |
| "Abrir PDV" com brilho, pulso ou caixa em volta do ícone | Pílula marinho lisa: ícone + texto + seta |
| Logo com sombra forte ou contorno grosso | Só o realce leve de 02 §1 |
| Cartão com borda cinza + sombra forte | Sem borda, `--shadow-card` |
| Botão retangular com raio 6px | Pílula (999px) |
| Item ativo do menu em azul ou preto | Pílula **branca com texto azul** sobre o menu azul (subitem: branco a 18%) |
| Vários cartões coloridos numa tela interna | No máximo 1 azul + 1 marinho (o Painel é a exceção, ver 07 §B) |
| Modal "Arquivados" separado | Aba Ativos · Arquivados na lista |
| Inventar colunas onde o print só tem estado vazio | Estado vazio sem tabela (Maquininhas, Cartões, Fichas técnicas) |
| Mostrar "null" ou datas quebradas do sistema antigo | Corrigir: omitir "null", formatar `dd/mm/aaaa` |
