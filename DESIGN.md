# DESIGN.md — Avante ERP Design System

> Fonte da verdade visual do **Avante ERP** (ERP e PDV na nuvem da Algorithmus).
> Regras de uso: `.claude/skills/erp-design/SKILL.md`. Menu e catálogo de telas: `MAPA_DE_TELAS.md`.
>
> **Stack:** o projeto ainda não tem código. Este documento assume **React + Tailwind CSS + shadcn/ui**
> (tokens em CSS variables HSL, padrão shadcn). Revise se a stack for outra.
>
> **Origem da paleta:** cores extraídas pixel a pixel dos prints oficiais em `referencias/` (logo, botões,
> sidebar, PDV e login). O site avanteerp.com.br não abriu no navegador do app; confira a cor da logo
> no manual da marca, se houver.

## 0. Identidade da marca (atualizada em 20/11/2026, a partir da logo oficial)

| Papel | Hex | Uso |
|---|---|---|
| **Azul Avante** | `#0A5CDB` | Logo, ações primárias, PDV, gráficos, status positivo, gradiente de destaque |
| **Tinta** (preto da logo) | `#11141B` | Texto, item ativo do menu (pílula preta), abas ativas, cartão escuro |
| **Branco** | `#FFFFFF` | Cartões e texto sobre azul ou tinta |
| Canvas | `#EFF1F5` | Fundo da aplicação |

**Regras da marca:**
- **Tudo azul.** ERP e PDV usam o mesmo `--primary`. O verde-petróleo do PDV e todos os verdes foram removidos.
- **Status positivo em azul.** Ativo, pago e concluído usam fundo azul-claro com texto azul-escuro. Os únicos tons fora da marca são o vermelho (erro e destrutivo) e o âmbar (pendente e alerta), porque carregam significado.
- **Gráficos:** entradas em azul, saídas em tinta a 35–45% de opacidade.
- **Logo:** barra azul inclinada mais o paralelogramo em tinta (branco no tema escuro), "vante" em azul 800 e "ERP" ou "PDV" espaçado.

**Os tokens oficiais estão em `prototipo/css/tokens.css`**, e o bloco CSS abaixo é a versão anterior. Contrastes verificados no navegador: primário 5.8:1, texto 16.2:1, texto secundário 5.0:1, status 5.8 a 12.6:1.

## 0.1 Estilo visual (referências de dashboard enviadas)

| Elemento | Regra |
|---|---|
| Canvas | Cinza-claro `--background`. Topbar sem borda, na cor do canvas |
| Cartões | Brancos, **sem borda**, raio `--radius-lg` (18px), sombra suave `--shadow-card` |
| Menu lateral | Painel branco flutuante (raio 18px). Item ativo em **pílula preta**, subitem ativo em pílula azul-clara |
| Botões | **Pílula** (raio 999px). Primário azul com `--shadow-brand` |
| Abas e segmentados | Trilho cinza, opção ativa em pílula preta |
| Destaques | 1 cartão em `--gradient-brand` (azul) e 1 em `--gradient-ink` (escuro) por tela, no máximo |
| Painel | Abre com cartão de boas-vindas que resume as pendências do dia em uma frase |
| Campos | Raio 10px. Modais com raio 22px e fundo desfocado |

Esta atualização substitui o "raio pequeno (6px)" e as "sombras mínimas" dos princípios. A densidade das tabelas continua a mesma: linhas de 40px e padding compacto.

---

## 1. Princípios

| Princípio | Na prática |
|---|---|
| Densidade alta | Linhas de 36–44px, padding compacto, sem hero sections ou espaços vazios decorativos |
| Hierarquia clara | 1 título de página, 1 ação primária, peso tipográfico em vez de cor para destacar |
| Sobriedade | Cartões sem borda com sombra suave e raio 18px; cor forte só em 1–2 destaques por tela |
| Só tokens | Nenhuma cor hex/rgb no código de componentes — apenas classes semânticas |
| Números alinháveis | `tabular-nums` em valores, quantidades, impostos, datas e códigos |

---

## 2. Tokens de cor (versão anterior — ver `prototipo/css/tokens.css`)

Formato HSL sem `hsl()` (padrão shadcn/ui). Usar sempre via classe (`bg-background`, `text-muted-foreground`…).

```css
@layer base {
  :root {
    /* Neutros — base fria azulada dos prints */
    --background: 220 37% 97%;        /* #F4F6FA  fundo da área de conteúdo */
    --foreground: 217 28% 15%;        /* #1B2330  texto principal (15.8:1) */
    --card: 0 0% 100%;                /* #FFFFFF  superfícies, tabelas, cards */
    --card-foreground: 217 28% 15%;
    --popover: 0 0% 100%;
    --popover-foreground: 217 28% 15%;
    --muted: 216 38% 95%;             /* #EDF1F7 */
    --muted-foreground: 217 11% 40%;  /* #5B6472  texto auxiliar (6.0:1) */
    --border: 215 25% 91%;            /* #E1E6ED */
    --input: 215 24% 86%;             /* #D3DAE4 */

    /* Marca — Azul Avante (ERP) */
    --primary: 215 93% 45%;           /* #0861DF (5.6:1 com branco) */
    --primary-hover: 216 93% 38%;     /* #0751BD */
    --primary-active: 216 93% 32%;    /* #06449E */
    --primary-subtle: 217 84% 95%;    /* #E8F0FD  item ativo do menu, linha selecionada */
    --primary-foreground: 0 0% 100%;
    --ring: 215 93% 45%;

    /* Marca — Verde-petróleo (PDV) */
    --brand-pdv: 175 88% 25%;         /* #08796F (5.3:1) */
    --brand-pdv-hover: 173 89% 22%;   /* #06685D */
    --brand-pdv-subtle: 170 32% 93%;  /* #E6F2F0  fundo do PDV */

    /* Destaque */
    --highlight: 213 62% 23%;         /* #16375F  card de KPI principal */
    --highlight-foreground: 0 0% 100%;

    --secondary: 216 38% 95%;         /* #EDF1F7 */
    --secondary-foreground: 217 28% 15%;
    --accent: 216 38% 95%;            /* hover de linha / item de menu */
    --accent-foreground: 217 28% 15%;
    --destructive: 4 74% 49%;         /* #D92D20 */
    --destructive-foreground: 0 0% 100%;

    /* Superfícies de app */
    --sidebar: 216 38% 95%;           /* #EDF1F7 */
    --sidebar-foreground: 217 28% 15%;
    --sidebar-active: 217 84% 95%;    /* fundo do item ativo */
    --sidebar-active-foreground: 215 93% 45%;
    --table-header: 220 37% 98%;
    --row-selected: 217 84% 95%;

    /* Status: fundo suave + texto escuro (todos ≥ 6:1) */
    --status-success: 145 33% 93%;   --status-success-fg: 148 66% 24%;  /* #E7F3EC / #15653A */
    --status-warning: 39 88% 94%;    --status-warning-fg: 36 100% 27%;  /* #FDF3E1 / #8A5300 */
    --status-error: 0 81% 96%;       --status-error-fg: 4 76% 40%;      /* #FDECEC / #B42318 */
    --status-pending: 45 100% 93%;   --status-pending-fg: 44 100% 24%;  /* #FFF6DB / #7A5A00 */
    --status-invoiced: 217 84% 95%;  --status-invoiced-fg: 217 88% 36%; /* #E8F0FD / #0B4AAE */
    --status-cancelled: 216 17% 94%; --status-cancelled-fg: 217 11% 40%;/* #EEF0F3 / #5B6472 */

    --radius: 0.375rem;               /* 6px */
  }

  /* PDV: mesmos componentes, cor de marca trocada */
  .theme-pdv {
    --primary: 175 88% 25%;
    --primary-hover: 173 89% 22%;
    --primary-active: 173 89% 18%;
    --primary-subtle: 170 32% 93%;
    --ring: 175 88% 25%;
    --background: 170 32% 96%;
  }

  .dark {
    --background: 218 30% 8%;
    --foreground: 216 30% 93%;
    --card: 218 26% 11%;
    --card-foreground: 216 30% 93%;
    --popover: 218 26% 12%;
    --popover-foreground: 216 30% 93%;
    --muted: 218 20% 15%;
    --muted-foreground: 216 12% 64%;
    --border: 218 18% 20%;
    --input: 218 18% 24%;

    --primary: 214 92% 62%;
    --primary-hover: 214 92% 68%;
    --primary-active: 214 92% 72%;
    --primary-subtle: 216 50% 18%;
    --primary-foreground: 218 40% 8%;
    --ring: 214 92% 62%;

    --brand-pdv: 173 60% 45%;
    --brand-pdv-hover: 173 60% 52%;
    --brand-pdv-subtle: 173 40% 14%;

    --highlight: 213 55% 22%;
    --highlight-foreground: 0 0% 100%;

    --secondary: 218 20% 16%;
    --secondary-foreground: 216 30% 93%;
    --accent: 218 20% 17%;
    --accent-foreground: 216 30% 93%;
    --destructive: 4 72% 56%;
    --destructive-foreground: 0 0% 100%;

    --sidebar: 218 30% 9%;
    --sidebar-foreground: 216 20% 85%;
    --sidebar-active: 216 50% 18%;
    --sidebar-active-foreground: 214 92% 72%;
    --table-header: 218 24% 12%;
    --row-selected: 216 50% 18%;

    --status-success: 148 40% 14%;   --status-success-fg: 145 60% 65%;
    --status-warning: 36 60% 15%;    --status-warning-fg: 40 95% 68%;
    --status-error: 4 45% 16%;       --status-error-fg: 4 90% 75%;
    --status-pending: 44 60% 15%;    --status-pending-fg: 45 95% 68%;
    --status-invoiced: 217 45% 18%;  --status-invoiced-fg: 214 94% 76%;
    --status-cancelled: 218 14% 18%; --status-cancelled-fg: 216 12% 66%;
  }
}
```

Extensão no `tailwind.config` (além das cores padrão do shadcn):

```ts
colors: {
  primary: {
    DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))",
    hover: "hsl(var(--primary-hover))", active: "hsl(var(--primary-active))", subtle: "hsl(var(--primary-subtle))",
  },
  "brand-pdv": { DEFAULT: "hsl(var(--brand-pdv))", hover: "hsl(var(--brand-pdv-hover))", subtle: "hsl(var(--brand-pdv-subtle))" },
  highlight: { DEFAULT: "hsl(var(--highlight))", foreground: "hsl(var(--highlight-foreground))" },
  sidebar: {
    DEFAULT: "hsl(var(--sidebar))", foreground: "hsl(var(--sidebar-foreground))",
    active: "hsl(var(--sidebar-active))", "active-foreground": "hsl(var(--sidebar-active-foreground))",
  },
  "table-header": "hsl(var(--table-header))",
  "row-selected": "hsl(var(--row-selected))",
  status: {
    success:   { DEFAULT: "hsl(var(--status-success))",   fg: "hsl(var(--status-success-fg))" },
    warning:   { DEFAULT: "hsl(var(--status-warning))",   fg: "hsl(var(--status-warning-fg))" },
    error:     { DEFAULT: "hsl(var(--status-error))",     fg: "hsl(var(--status-error-fg))" },
    pending:   { DEFAULT: "hsl(var(--status-pending))",   fg: "hsl(var(--status-pending-fg))" },
    invoiced:  { DEFAULT: "hsl(var(--status-invoiced))",  fg: "hsl(var(--status-invoiced-fg))" },
    cancelled: { DEFAULT: "hsl(var(--status-cancelled))", fg: "hsl(var(--status-cancelled-fg))" },
  },
},
```

### Estados de botão

| Variante | Normal | Hover | Ativo / pressionado |
|---|---|---|---|
| Primário | `bg-primary` | `hover:bg-primary-hover` | `active:bg-primary-active` |
| Secundário | `bg-secondary` | `hover:bg-accent` | `active:bg-muted` |
| Outline | `border-border bg-card` | `hover:bg-accent` | `active:bg-muted` |
| Destrutivo | `bg-destructive` | `hover:bg-destructive/90` | `active:bg-destructive/80` |

### Mapa de status

| Status | Uso no Avante | Classe |
|---|---|---|
| Sucesso | Ativo, Pago, Quitado, Em estoque, Venda concluída | `bg-status-success text-status-success-fg` |
| Alerta | Estoque baixo, Vence hoje, Turno aberto há muito tempo | `bg-status-warning text-status-warning-fg` |
| Erro | Vencido, Falha na emissão, Sem estoque | `bg-status-error text-status-error-fg` |
| Pendente | Em aberto, Orçamento enviado, Aguardando pagamento | `bg-status-pending text-status-pending-fg` |
| Faturado | Faturado, NF emitida | `bg-status-invoiced text-status-invoiced-fg` |
| Cancelado | Cancelado, Arquivado | `bg-status-cancelled text-status-cancelled-fg` |

Badge: `inline-flex h-5 items-center rounded px-1.5 text-xs font-medium`. Nunca usar só cor — o texto do status sempre aparece.

---

## 3. Tipografia

- **Fonte:** `Inter` (fallback `ui-sans-serif, system-ui`), com `font-feature-settings: "cv11", "ss01"`.
- **Mono (códigos, chaves NF-e, SKUs):** `JetBrains Mono` / `ui-monospace`.
- **Base da aplicação:** 14px (`text-sm`) — não 16px.

| Uso | Classe | Tamanho / peso |
|---|---|---|
| Título da página | `text-lg font-semibold` | 18px / 600 |
| Título de seção / card | `text-sm font-semibold` | 14px / 600 |
| Corpo, células, inputs | `text-sm` | 14px / 400 |
| Labels de formulário | `text-xs font-medium` | 12px / 500 |
| Cabeçalho de tabela | `text-xs font-medium text-muted-foreground` | 12px / 500 |
| Auxiliar, hint, metadados | `text-xs text-muted-foreground` | 12px / 400 |
| KPI de dashboard | `text-2xl font-semibold tabular-nums` | 24px / 600 |

Regra numérica: valores, quantidades, impostos, datas e códigos → `tabular-nums`; colunas numéricas → `text-right`.
Moeda formatada com `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.

---

## 4. Espaçamento, raio e elevação

| Token | Valor | Uso |
|---|---|---|
| `1` | 4px | gap ícone–texto, padding de badge |
| `2` | 8px | padding de célula vertical, gap entre filtros |
| `3` | 12px | padding horizontal de célula, padding de card compacto |
| `4` | 16px | padding de card/seção, gap entre blocos |
| `6` | 24px | margem entre seções da página (máximo usual) |

- Raio: `rounded-md` (6px) em inputs, botões e cards; `rounded` (4px) em badges. Nada acima de 8px.
- Elevação: cards com `border` e sem sombra; `shadow-sm` só em dropdowns/popovers; `shadow-lg` só em modais.
- Alturas de controle: input/botão/select `h-8` (32px) padrão, `h-9` (36px) em formulários longos.

---

## 5. Layout da aplicação

```
┌───────────┬──────────────────────────────────────────────┐
│ Sidebar   │ Header: breadcrumb · título · [Ação primária]│
│ 224px     ├──────────────────────────────────────────────┤
│ (56px     │ Barra de filtros: busca · filtros · limpar   │
│ recolhida)├──────────────────────────────────────────────┤
│           │ Conteúdo (tabela / formulário / dashboard)   │
│           │ padding 16px, largura total                  │
└───────────┴──────────────────────────────────────────────┘
```

- Um único botão primário por tela, no canto superior direito do header.
- Ações secundárias: `variant="outline"` ou menu `⋯` ao lado da primária.
- **Topbar global (mantida dos prints):** logo · busca global `Ctrl K` · "Criar" · "Assistente" · notificações · usuário. O seletor "Empresa ativa" fica no topo da sidebar e o atalho "Abrir PDV", no rodapé.
- **Máximo de 2 níveis no menu.** Subgrupos longos usam separadores com título, não um terceiro nível. Veja o menu completo em `MAPA_DE_TELAS.md`.

### Menu proposto (resumo)

```
Painel
Vendas ............ Vendas · Orçamentos · PDV (Frente de caixa)
Clientes
Catálogo .......... Produtos e serviços · Fichas técnicas · Insumos · Inventário · Categorias
Fornecedores e frete .. Fornecedores · Transportadoras
Financeiro ........ Resumo financeiro · Dia a dia · Bancos e meios · Patrimônio · Cadastros
Relatórios ........ Relatórios · Análises
Equipe ............ Usuários e permissões · Funcionários e salários
Configurações ..... Dados da empresa e preferências · Documentos da empresa
```

### Padrões vindos dos prints

- **Arquivados:** nunca em modal separado. Use abas de status na tabela, **Ativos (n) · Arquivados (n)**, com a ação "Restaurar" na linha.
- **Telas sem dados:** não preencher com dados fictícios no redesign. Mostrar cabeçalho, filtros e um estado vazio com uma frase do que a tela faz e a ação primária ("Nenhuma conta a pagar no período. **Adicionar conta a pagar**").
- **KPIs zerados** (ex.: "R$ 0,00 · Sem variação"): manter os cards, com o valor em `text-muted-foreground` quando for zero.
- **Formulários em modal:** acima de ~8 campos, usar um painel lateral (sheet) de 640px ou uma página própria, em grid de 2 colunas, com os campos opcionais em um bloco "Mais detalhes".

---

## 6. Padrões de componentes

### Tabela de dados (shadcn `Table` + TanStack Table)
- Cabeçalho fixo (`sticky top-0 bg-table-header z-10`), `h-9`.
- Linhas `h-9`–`h-11` (36–44px), `hover:bg-accent`, selecionada `bg-row-selected`.
- Texto à esquerda, números à direita com `tabular-nums`.
- Coluna 1: checkbox de seleção múltipla; última coluna: ações da linha agrupadas à direita (ícones `size-4` + menu `⋯`).
- Barra de ações em massa aparece no lugar dos filtros quando há linhas selecionadas ("3 selecionados · Aprovar · Exportar · Cancelar").
- Rodapé: total de registros, seletor de itens por página (25/50/100) e paginação.

### Filtros e busca
- Acima da tabela: `Input` de busca (`w-64`, ícone de lupa, atalho `/`) + 2–4 filtros principais (`Select`/`Popover` com combobox) + período.
- Filtros ativos viram chips removíveis; botão "Limpar filtros" (ghost) aparece quando há ≥1 filtro.

### Formulários longos
- Seções com título (`text-sm font-semibold`) e borda, ou `Tabs`: Dados Gerais · Fiscal · Endereço · Financeiro.
- Grid de 12 colunas; campos curtos (UF, CEP, CFOP) ocupam 2–3 colunas.
- Label acima do input (`text-xs font-medium`), obrigatório marcado com `*`, erro abaixo em `text-xs text-destructive`.
- Rodapé fixo do formulário com "Cancelar" (outline) e "Salvar" (primary); `Enter` envia, `Esc` cancela.

### Ações destrutivas
- Sempre via `AlertDialog`: título claro ("Cancelar pedido #10234?"), consequência descrita, botão `variant="destructive"` com o verbo da ação.

### Dashboard
- Linha de KPIs: cards com label `text-xs text-muted-foreground`, valor `text-2xl tabular-nums`, variação em badge de status.
- Gráficos com borda, sem sombra, legenda compacta; cores de série derivadas dos tokens.

---

## 7. Estados obrigatórios

| Estado | Padrão |
|---|---|
| Loading | `Skeleton` no formato final (linhas de tabela, campos) — nunca spinner em tela cheia |
| Vazio | Ícone discreto + frase + ação sugerida ("Nenhum pedido. **Criar pedido**") |
| Vazio por filtro | "Nenhum resultado para os filtros" + "Limpar filtros" |
| Erro | Mensagem + "Tentar novamente"; erros de campo inline |
| Sucesso | `toast` curto (sonner), sem modal |

---

## 8. Acessibilidade e teclado

- Contraste mínimo WCAG AA (4.5:1 texto, 3:1 bordas de controles).
- `focus-visible:ring-2 ring-ring ring-offset-1` em todo controle interativo.
- Ordem de `Tab` segue a ordem visual; `Enter` submete formulários; `Esc` fecha modais e popovers.
- Ícones sem texto têm `aria-label`; status nunca dependem só de cor.

---

## 9. Checklist antes de entregar uma tela

- [ ] Só tokens semânticos (sem hex/rgb soltos)
- [ ] `tabular-nums` + alinhamento à direita em números
- [ ] Loading, vazio, erro e carregado implementados
- [ ] Componentes de `components/ui` reutilizados
- [ ] Um único botão primário; destrutivas com confirmação
- [ ] Navegação por teclado e contraste verificados
- [ ] Funciona no tema claro e escuro
