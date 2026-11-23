# 03 · Tokens de design

> Fonte executável: `prototipo/css/tokens.css`. O arquivo tem os tokens base e, **no final, o bloco v3** (`:root:not(.dark)` e `.dark`) que **sobrescreve** azul, degradês (agora cores sólidas), sombra de marca e fonte de destaque. Os valores abaixo já são os **finais** (base + v3).
>
> Formato: **HSL sem `hsl()`** (padrão shadcn/ui). Uso: `hsl(var(--primary))` ou com alfa `hsl(var(--primary) / .5)`. Tema escuro: classe `.dark` no `<html>`.

## 1. Cores

### 1.1 Neutros e superfícies
| Token | Claro (HSL) | Claro (HEX) | Escuro (HSL) | Uso |
|---|---|---|---|---|
| `--background` | `220 38% 96%` | `#F1F4F9` | `222 22% 6%` | Cor-base da página (sob as manchas) |
| `--foreground` | `223 45% 14%` | `#141D34` | `220 20% 94%` | Texto principal (nunca `#000`) |
| `--card` / `--card-foreground` | `0 0% 100%` / `223 45% 14%` | `#FFFFFF` / `#141D34` | `222 18% 10%` / `220 20% 94%` | Cartões, tabelas, modais, inputs |
| `--popover` / `-foreground` | `0 0% 100%` / `223 45% 14%` | `#FFFFFF` | `222 18% 11%` / `220 20% 94%` | Menus suspensos, paleta Ctrl K |
| `--muted` | `220 45% 96%` | `#F0F3F9` | `222 16% 14%` | Trilho de abas, ícone de vazio, skeleton |
| `--muted-foreground` | `222 14% 40%` | `#586074` | `220 10% 64%` | Texto secundário, labels de KPI, cabeçalho de tabela |
| `--secondary` / `-foreground` | `220 45% 95%` / `223 45% 14%` | `#EDF0F8` | `222 16% 14%` / `220 20% 94%` | Botão secundário |
| `--accent` / `-foreground` | `220 50% 95%` / `223 45% 14%` | `#ECF0F9` | `222 16% 15%` / `220 20% 94%` | Hover de linha e de item |
| `--border` | `220 30% 91%` | `#E1E6EF` | `222 14% 17%` | Divisores, contorno de tile, `kbd` |
| `--input` | `220 25% 85%` | `#CFD6E2` | `222 14% 23%` | Borda de campos |
| `--table-header` | `220 45% 97%` | `#F4F6FB` | `222 16% 12%` | (Opcional) cabeçalho de tabela |
| `--row-selected` | `216 90% 95%` | `#E7F0FE` | `216 60% 17%` | Linha selecionada |

### 1.2 Azul da marca e família
| Token | Claro (HSL) | Claro (HEX) | Escuro (HSL) | Uso |
|---|---|---|---|---|
| `--primary` | **`217 92% 47%`** | **`#0A5EE6`** | `214 95% 60%` | Menu, banner, botão primário, links, foco, gráficos |
| `--primary-hover` | `217 92% 41%` | `#0852C9` | `214 95% 66%` | Hover |
| `--primary-active` | `217 92% 35%` | `#0746AB` | `214 95% 70%` | Pressionado; trilho do segmentado no banner |
| `--primary-subtle` | `216 90% 95%` | `#E7F0FE` | `216 60% 17%` | Fundos azul-claros |
| `--primary-tint` | `216 100% 86%` | `#B8D4FF` | `216 80% 70%` | Símbolo preenchido; destaque de texto sobre azul |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | `222 30% 8%` | Texto sobre azul |
| `--ring` | `217 92% 47%` | `#0A5EE6` | `214 95% 60%` | Anel de foco |
| `--brand-pdv` / `-hover` / `-subtle` | = primary / hover / subtle | | = primary | PDV usa o mesmo azul |
| `--ink` / `--ink-foreground` | `223 72% 22%` / `0 0% 100%` | **`#102760`** / `#FFFFFF` | `214 95% 60%` / `222 40% 8%` | Seleção (aba e segmentado ativos), avatar |
| `--navy` / `--navy-subtle` | `223 72% 22%` / `223 60% 94%` | `#102760` / `#E7ECF9` | `222 60% 70%` / `222 40% 16%` | Marinho; ícone neutro |
| `--highlight` / `-foreground` | `223 72% 22%` / `0 0% 100%` | `#102760` | `223 55% 20%` / `0 0% 100%` | Cartão escuro |
| `--sky` / `--sky-subtle` | `204 92% 46%` / `204 95% 95%` | `#098BE1` / `#E6F5FE` | `204 90% 60%` / `204 60% 16%` | "A receber", dia "valores iguais" |
| `--indigo` / `--indigo-subtle` | `236 64% 54%` / `236 90% 96%` | `#3F49D5` / `#ECEDFE` | `236 80% 72%` / `236 45% 18%` | "A pagar", saídas, últimas ações |
| `--destructive` / `-foreground` | `4 74% 49%` / `0 0% 100%` | `#D92D20` | `4 72% 56%` | Botão destrutivo |

### 1.3 Superfícies de marca (os antigos `--gradient-*`, hoje **cores sólidas**)
Os nomes foram mantidos por compatibilidade; na v3 **todos valem uma cor sólida**.

| Token | Claro | HEX | Escuro | Uso |
|---|---|---|---|---|
| `--gradient-brand` | `hsl(217 92% 47%)` | `#0A5EE6` | `hsl(214 95% 52%)` | Superfície azul: KPI Vendas, tile PDV, selo do calendário, contador, saldo final, dia selecionado |
| `--gradient-sidebar` | `hsl(217 92% 47%)` | `#0A5EE6` | `hsl(218 70% 24%)` | Painel do menu lateral |
| `--gradient-flyout` | `hsl(214 100% 97%)` | `#F0F6FF` | `hsl(220 35% 14%)` | Painel secundário "Mais do financeiro" |
| `--gradient-ink` | `hsl(223 72% 22%)` | `#102760` | `hsl(223 55% 20%)` | Cartão escuro (Alertas de estoque) |
| `--gradient-pill` | `hsl(223 72% 22%)` | `#102760` | `hsl(214 95% 52%)` | Botão "Abrir PDV" |
| `--gradient-soft` | `hsl(0 0% 100%)` | `#FFFFFF` | `hsl(222 18% 10%)` | Cartão do calendário |
| `--gradient-sky` | `hsl(204 95% 96%)` | `#EBF7FE` | `hsl(210 40% 13%)` | KPI "Contas a receber" |
| `--gradient-indigo` | `hsl(236 90% 97%)` | `#F0F1FE` | `hsl(232 30% 14%)` | KPI "Contas a pagar" |

### 1.4 Menu lateral
| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--sidebar-foreground` | `0 0% 100%` | `0 0% 100%` | Texto do menu (item 90%, subitem 78%, rótulo 65%) |
| `--sidebar-active` / `-foreground` | `0 0% 100%` / `216 91% 38%` (`#094FB9`) | `0 0% 100%` / `218 80% 35%` | Item ativo: **pílula branca com texto azul** |
| `--sidebar-sub-active` / `-foreground` | `0 0% 100%` / `0 0% 100%` | idem | Subitem ativo: branco a 18% com texto branco |
| `--flyout-foreground` | `223 60% 22%` (`#162A5A`) | `214 80% 86%` | Texto do painel secundário |

### 1.5 Status (sem verde)
| Token (fundo / texto) | Claro HSL | Claro HEX | Escuro HSL | Uso |
|---|---|---|---|---|
| `--status-success` / `-fg` | `216 90% 95%` / `216 85% 34%` | `#E7F0FE` / `#0D48A0` | `216 60% 17%` / `214 95% 74%` | **Sucesso = azul**: Ativo, Pago, Concluída, Em estoque, Registrado, Aberto |
| `--status-warning` / `-fg` | `39 88% 94%` / `36 100% 27%` | `#FDF4E2` / `#8A5300` | `36 60% 15%` / `40 95% 68%` | Atenção, estoque baixo |
| `--status-error` / `-fg` | `0 81% 96%` / `4 76% 40%` | `#FDEDED` / `#B42318` | `4 45% 16%` / `4 90% 75%` | Vencido, Estornada, erro de campo |
| `--status-pending` / `-fg` | `45 100% 93%` / `44 100% 24%` | `#FFF6DB` / `#7A5A00` | `44 60% 15%` / `45 95% 68%` | Pendente, Em contagem, Em aberto |
| `--status-invoiced` / `-fg` | `236 90% 96%` / `236 55% 38%` | `#ECEDFE` / `#2C3396` | `236 40% 18%` / `236 85% 82%` | Info / Faturado (índigo), perfis |
| `--status-cancelled` / `-fg` | `220 30% 94%` / `222 14% 38%` | `#EBEEF4` / `#535B6E` | `222 14% 16%` / `220 10% 66%` | Cancelado, Arquivado, Rascunho |

Todos os pares de texto têm contraste ≥ 4,5:1.

## 2. Fundo de todas as telas (`--canvas-art`)
O `body` usa `background: var(--canvas-art); background-attachment: fixed;` — o mesmo fundo da tela de carregamento, em todas as telas.
```css
/* claro */
--canvas-art:
  radial-gradient(55% 60% at 18% 20%, hsl(216 95% 89% / .85) 0%, transparent 70%),
  radial-gradient(45% 50% at 88% 88%, hsl(226 92% 90% / .8) 0%, transparent 70%),
  radial-gradient(35% 40% at 82% 8%,  hsl(204 90% 93% / .6) 0%, transparent 70%),
  hsl(220 38% 96%);
/* escuro */
--canvas-art:
  radial-gradient(55% 60% at 18% 20%, hsl(218 70% 18% / .9) 0%, transparent 70%),
  radial-gradient(45% 50% at 88% 88%, hsl(232 60% 18% / .85) 0%, transparent 70%),
  hsl(222 30% 7%);
```
É o **único degradê** permitido na interface.

## 3. Forma
| Token / elemento | Valor | Uso |
|---|---|---|
| `--radius-lg` | **18px** | Cartões, tabelas, KPIs, banner, menu, painel secundário |
| Modal | 22px (painel lateral: só à esquerda) | |
| Tiles, linhas de destaque, blocos internos | 16px | Atalhos, `focus-row` |
| Blocos menores | 14px | Seletor de empresa, `money-stat`, selo do calendário, contador, ícone de 44px, dropzone |
| `--radius` | 12px | Células do calendário, alertas inline |
| Campos | 10px (textarea 12px) | Input, select; botão branco do banner |
| `--radius-sm` | 8px | |
| `kbd` | 6px | |
| **Pílula** | **999px** | Botões, abas, segmentados, chips, badges, itens de menu, busca, contadores, "Abrir PDV" |

Bordas: sempre 1px. Cartões **não têm borda** no tema claro (no escuro: 1px `--border`).

## 4. Sombras
| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--shadow-card` | `0 1px 2px hsl(223 60% 20% / .04), 0 8px 24px hsl(223 60% 30% / .06)` | `0 1px 2px hsl(0 0% 0% / .3)` | Cartões, tabelas, busca, botões-ícone da topbar, chips |
| `--shadow-pop` | `0 10px 30px hsl(223 60% 20% / .14)` | `0 10px 30px hsl(0 0% 0% / .45)` | Dropdowns, painel secundário, item ativo do menu |
| `--shadow-brand` | `0 8px 20px hsl(217 92% 40% / .22)` | `0 10px 24px hsl(214 95% 40% / .35)` | Botão primário, banner, KPI Vendas, menu, "Abrir PDV", selos azuis |
| `--shadow-modal` | `0 24px 64px hsl(223 60% 15% / .24)` | `0 24px 64px hsl(0 0% 0% / .55)` | Modais e paleta |

Overlay de modal: `hsl(var(--ink) / .35)` + `backdrop-filter: blur(3px)`. Topbar: `hsl(var(--background) / .55)` + `backdrop-filter: blur(14px)`.

Foco: `outline: 2px solid hsl(var(--ring)); outline-offset: 1px` em todo `:focus-visible`. Foco de campo: `border-color: hsl(var(--ring)); box-shadow: 0 0 0 3px hsl(var(--ring) / .15)`.

## 5. Tipografia
```css
--font-sans:    "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
--font-display: "DM Sans", "Inter", ui-sans-serif, system-ui, sans-serif;
--font-mono:    "JetBrains Mono", ui-monospace, "Cascadia Mono", Consolas, monospace;
```
`body`: Inter 14px / 400 / line-height 1.45 / letter-spacing −0.005em, `font-feature-settings: "cv11","ss01"`, `-webkit-font-smoothing: antialiased`.

**DM Sans com `letter-spacing: -0.03em`** em: título de página, título de bloco grande, título do banner, valor de KPI, título de cartão e de bloco, título de modal, título do login, título do painel secundário, mês do calendário, valores de `money-stat`, "Abrir PDV", nome de documento, totais de resumo, de pagamento e do PDV.

| Estilo | Família | Tamanho / peso / line-height | Cor |
|---|---|---|---|
| Título de página `.page-title` | DM Sans | 28px / 800 / 1.25 (22px < 640px) | foreground |
| Título do banner `.hero-title` | DM Sans | 24px / 700 / 1.2 (22px < 760px) | branco; números em `--primary-tint` |
| Bloco grande `.big-title` | DM Sans | 21px / 700 | foreground |
| Modal `.modal-title` | DM Sans | 18px / 650 | foreground |
| Cartão / bloco `.card-title`, `.block-title` | DM Sans | 15px / 650 | foreground |
| Valor KPI `.kpi-value` | DM Sans | 28px / 700 / 1.15 (24px < 640px) | foreground / branco |
| Total PDV | DM Sans | 30px / 700 | foreground |
| Frase do login `.auth-claim` | DM Sans | 26px / 700 / 1.35 | branco |
| "Abrir PDV" | DM Sans | 15px / 700 | branco |
| Mês do calendário | DM Sans | 15px / 700 | foreground |
| Subtítulo de página | Inter | 13px / 400 | muted |
| Subtítulo de bloco | Inter | 12px / 400 | muted |
| Corpo | Inter | 14px / 400 / 1.45 | foreground |
| Célula de tabela | Inter | 13px | foreground |
| Input / select | Inter | 13,5px | foreground |
| Label de campo | Inter | 12px / 500 | foreground |
| Cabeçalho de tabela | Inter | 11px / 600 / MAIÚSCULAS / +0.04em | muted |
| Seção do menu e do painel | Inter | 11px / 600 / MAIÚSCULAS / +0.04em | 55–60% do texto |
| Rótulo de KPI | Inter | 13px / 500 | muted / branco 85% |
| Botão / botão pequeno | Inter | 13px / 600 · 12px / 600 | conforme variante |
| Item de menu / subitem | Inter | 13,5px / 500 (ativo 600) · 13px / 400 | branco 90% / 78% |
| Badge | Inter | 12px / 600 | fg do status |
| Ajuda / erro | Inter | 11,5px / 400 | muted / error-fg |
| kbd | JetBrains Mono | 10,5px | muted |

Números: **sempre `tabular-nums`**, à direita em tabelas.

## 6. Espaçamento (base 4px)
| Valor | Uso |
|---|---|
| 2–4px | Gap de badge; padding do trilho de abas (3px) |
| 6px | Ícone ↔ texto em botões |
| 8px | Gap entre botões; gap da grade do calendário |
| 10–12px | Gap entre cartões em grids (12px); gap de formulário (12px); padding de tile (8×10px) |
| 14–16px | Padding horizontal de tabela (16px); padding de linha de destaque (14×16px) |
| 18px | Gap vertical entre blocos; padding de cartão (16px 18px) |
| 20–24px | Padding de KPI (18×20px); bloco grande (22×24px); lateral da página (24px; 16px < 640px) |
| 28–32px | Padding do banner (28×32px) |

Página: `max-width: 1440px; padding: 8px 24px 32px; gap: 18px` (Painel: `gap: 22px`).
Cartão: cabeçalho `16px 18px 6px`, corpo `10px 18px 16px`, rodapé `0 18px 14px`.
Modal: cabeçalho `18px 20px 8px`, corpo `12px 20px 18px`, rodapé `14px 20px`.

## 7. Larguras e alturas
| Elemento | Medida |
|---|---|
| Topbar | 64px |
| Menu lateral | 268px (recolhido 84px), margem de 12px do canvas |
| Painel secundário | 272px, 10px à direita do menu |
| Modais | `sm` 440 · `md` 640 · `lg` 920 · `xl` 1180 · painel lateral 680px |
| Botão padrão / pequeno / grande / topbar | 36 / 30 / 44 / 38px |
| "Abrir PDV" | 52px |
| Input / select | 38px |
| Busca da topbar | 40px (máx. 420px de largura) |
| Item do menu / subitem / link do painel | 38 / 32 / 36px |
| Aba em pílula / segmentado | 30px (trilho 36px) |
| Linha de tabela / cabeçalho | 40 / 32px |
| Badge | 22px |
| Célula do calendário | 48px |
| Busca do PDV | 52px |

## 8. Breakpoints
| Nome | Largura | Mudança |
|---|---|---|
| `xl` | ≥ 1360px | Atalhos do Painel em 8 colunas |
| `lg` | < 1280px | Grids de pendências em 2 colunas |
| `md` | < 1100px | KPIs em 2 colunas; grids 2/1 empilham; PDV em coluna única |
| `tablet` | < 1024px | Menu vira gaveta de 272px com scrim; painel secundário abre sobre a gaveta; busca vira ícone |
| `sm` | < 760px | Tudo em 1 coluna; modal em tela cheia; banner com padding 22×20px |
| `xs` | < 640px | Atalhos em 2 colunas; sufixo "ERP" da logo oculto |

## 9. Camadas (z-index)
Topbar 30 · gaveta do menu 35 (scrim 34) · menus suspensos 40 · modal 45 · paleta Ctrl K 50. Símbolo decorativo: atrás do conteúdo (conteúdo com `position: relative; z-index: 1`).

## 10. Movimento
- Transições de 120–180ms `ease` em cor, fundo, borda e transform; 200ms na gaveta do menu.
- Painel secundário entra com `opacity 0→1` e `translateX(-8px → 0)` em 160ms.
- Setas de botões deslizam 3px no hover ("Abrir PDV").
- Skeleton com brilho de 1,2s em loop. Globo do Painel gira devagar.
- `prefers-reduced-motion: reduce` desliga todas as animações e transições.
