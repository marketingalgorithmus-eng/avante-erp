# 03 · Tokens de design

> Fonte executável: `prototipo/css/tokens.css`. Formato **HSL sem `hsl()`** (padrão shadcn/ui): use `hsl(var(--token))` ou `hsl(var(--token) / 0.5)` para transparência. **Componentes nunca usam HEX direto.**

## 1. Cores — tema claro (`:root`)

### Neutros
| Token | HSL | HEX | Uso |
|---|---|---|---|
| `--background` | 225 16% 95% | `#F0F1F4` | Canvas da aplicação e da topbar |
| `--foreground` | 222 22% 9% | `#12151C` | Texto principal (16,2:1 no canvas) |
| `--card` | 0 0% 100% | `#FFFFFF` | Cartões, tabelas, modais, menu lateral |
| `--card-foreground` | 222 22% 9% | `#12151C` | Texto em cartões |
| `--popover` / `--popover-foreground` | 0 0% 100% / 222 22% 9% | `#FFFFFF` / `#12151C` | Menus suspensos, paleta Ctrl K |
| `--muted` | 225 18% 96% | `#F3F4F7` | Trilhos de abas, tiles de atalho, fundos de apoio |
| `--muted-foreground` | 222 9% 42% | `#616775` | Texto secundário (5,7:1 no branco; 5,0:1 no canvas) |
| `--border` | 225 14% 91% | `#E5E6EB` | Divisores e bordas sutis |
| `--input` | 225 12% 85% | `#D4D6DD` | Borda de campos |
| `--secondary` / `--secondary-foreground` | 225 18% 96% / 222 22% 9% | `#F3F4F7` / `#12151C` | Botão secundário |
| `--accent` / `--accent-foreground` | 225 18% 95% / 222 22% 9% | `#F0F1F5` / `#12151C` | Hover de linha e de item |
| `--table-header` | 225 18% 97% | `#F6F7F9` | Fundo opcional de cabeçalho |
| `--row-selected` | 216 90% 95% | `#E7F0FE` | Linha selecionada |

### Marca
| Token | HSL | HEX | Uso |
|---|---|---|---|
| `--primary` | 216 91% 45% | `#0A5EDB` | Azul Avante: ação primária, links, foco (5,8:1 com branco) |
| `--primary-hover` | 216 91% 39% | `#0951BE` | Hover |
| `--primary-active` | 216 91% 33% | `#0845A1` | Pressionado |
| `--primary-subtle` | 216 90% 95% | `#E7F0FE` | Fundo azul-claro (badges, seleção, info) |
| `--primary-foreground` | 0 0% 100% | `#FFFFFF` | Texto sobre azul |
| `--ring` | 216 91% 45% | `#0A5EDB` | Anel de foco |
| `--brand-pdv`, `-hover`, `-subtle` | = primary | = primary | PDV usa o mesmo azul (mantido por compatibilidade) |
| `--ink` | 222 22% 9% | `#12151C` | Tinta: pílula ativa, avatar, cartão escuro |
| `--ink-foreground` | 0 0% 100% | `#FFFFFF` | Texto sobre tinta |
| `--highlight` / `--highlight-foreground` | 222 22% 9% / 0 0% 100% | `#12151C` / `#FFFFFF` | Cartão de destaque escuro |
| `--destructive` / `--destructive-foreground` | 4 74% 49% / 0 0% 100% | `#D92D20` / `#FFFFFF` | Botão destrutivo |

### Menu lateral
| Token | HSL | HEX | Uso |
|---|---|---|---|
| `--sidebar` | 0 0% 100% | `#FFFFFF` | Painel do menu |
| `--sidebar-foreground` | 222 22% 9% | `#12151C` | Itens |
| `--sidebar-active` | 222 22% 9% | `#12151C` | **Pílula preta** do item principal ativo |
| `--sidebar-active-foreground` | 0 0% 100% | `#FFFFFF` | Texto da pílula preta (18,3:1) |
| `--sidebar-sub-active` | 216 90% 95% | `#E7F0FE` | Pílula azul-clara do subitem ativo |
| `--sidebar-sub-active-foreground` | 216 91% 40% | `#0953C3` | Texto do subitem ativo (6,0:1) |

### Status (sem verde)
| Token (fundo / texto) | HEX | Contraste | Usado para |
|---|---|---|---|
| `--status-success` / `-fg` | `#E7F0FE` / `#0D48A0` | 7,5:1 | Ativo, Pago, Quitado, Concluída, Em estoque, Registrado, Aberto (turno) |
| `--status-warning` / `-fg` | `#FDF4E2` / `#8A5300` | 6,3:1 | Atenção, estoque baixo, aviso de configuração |
| `--status-error` / `-fg` | `#FDEDED` / `#B42318` | 5,8:1 | Vencido, Estornada, Fora de estoque, erros de campo |
| `--status-pending` / `-fg` | `#FFF6DB` / `#7A5A00` | 5,9:1 | Pendente, Em contagem, Em aberto |
| `--status-invoiced` / `-fg` | `#E8E9ED` / `#202532` | 12,6:1 | Faturado, perfis de usuário |
| `--status-cancelled` / `-fg` | `#EEEFF2` / `#5D626F` | 5,6:1 | Cancelado, Arquivado, Rascunho |

## 2. Cores — tema escuro (`.dark`)

| Token | HEX | | Token | HEX |
|---|---|---|---|---|
| `--background` | `#0C0E13` | | `--primary` | `#388CFA` |
| `--foreground` | `#EDEFF3` | | `--primary-hover` | `#569DFB` |
| `--card` | `#15181E` | | `--primary-subtle` | `#112645` |
| `--popover` | `#171A21` | | `--primary-foreground` | `#0E121B` |
| `--muted` | `#1E2129` | | `--ink` (invertido) | `#EDEFF3` |
| `--muted-foreground` | `#9AA0AC` | | `--ink-foreground` | `#12151C` |
| `--border` | `#252931` | | `--highlight` | `#20242C` |
| `--input` | `#323743` | | `--destructive` | `#E0493E` |
| `--sidebar` | `#15181E` | | `--sidebar-active` | `#EDEFF3` (pílula clara) |
| `--sidebar-sub-active` | `#112645` | | `--sidebar-sub-active-foreground` | `#74AFFB` |
| `--status-success` / fg | `#112645` / `#7EB4FC` | | `--status-error` / fg | `#3B1916` / `#F98E86` |
| `--status-warning` / fg | `#3D2B0F` / `#FBC760` | | `--status-pending` / fg | `#3D310F` / `#FBD460` |
| `--status-invoiced` / fg | `#272B34` / `#DADEE7` | | `--status-cancelled` / fg | `#23272F` / `#A0A5B1` |

No escuro, os cartões ganham borda `--border` de 1px (a sombra some no fundo escuro).

## 3. Gradientes (os únicos permitidos)
```css
--gradient-brand: linear-gradient(140deg, hsl(214 95% 56%) 0%, hsl(216 91% 45%) 45%, hsl(220 85% 30%) 100%);
/* azul vivo → Azul Avante → azul-marinho. Cartão de destaque, botão "Abrir PDV", tile PDV, login, barras */
--gradient-ink: linear-gradient(150deg, hsl(222 20% 16%) 0%, hsl(222 22% 7%) 100%);
/* grafite → preto. Cartão de destaque escuro (ex.: "Saldo ao final", "Alertas de estoque") */
```

## 4. Forma
| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 8px | Badges internos, kbd (6px), checkbox |
| `--radius` | 12px | Inputs (10px na prática), ícones em caixa (10px), avisos |
| `--radius-lg` | 18px | **Cartões, tabelas, menu lateral** |
| Pílula | 999px | Botões, abas, segmentados, chips, itens do menu, badges, busca |
| Modal | 22px | Modais (painel lateral: 22px só nos cantos esquerdos) |
| Tiles e blocos internos | 14–16px | Atalhos, resumos internos, dropzones |

## 5. Sombras
| Token | Valor | Uso |
|---|---|---|
| `--shadow-card` | `0 1px 2px hsl(222 22% 9% / .04), 0 6px 20px hsl(222 22% 9% / .05)` | Todos os cartões, busca, botões de ícone da topbar |
| `--shadow-pop` | `0 10px 30px hsl(222 22% 9% / .12)` | Menus suspensos |
| `--shadow-brand` | `0 10px 24px hsl(216 91% 45% / .28)` | Botão primário, cartão em gradiente, "Abrir PDV" |
| `--shadow-modal` | `0 24px 64px hsl(222 22% 9% / .22)` | Modais e paleta |

Overlay de modal: `hsl(var(--ink) / .35)` + `backdrop-filter: blur(3px)`.

## 6. Tipografia
| Estilo | Tamanho / peso / espaçamento | Uso |
|---|---|---|
| Título de página | 26px / 700 / −0,025em | `h1` de cada tela (22px no celular) |
| Título do Painel (frase) | 20px / 650 / −0,02em, line-height 1,35 | Frase-resumo do cartão de boas-vindas |
| Valor KPI | 28px / 700 / −0,03em, tabular | Números grandes (24px no celular) |
| Total PDV | 30px / 700 / −0,03em | "Total estimado" |
| Título de modal | 18px / 650 | |
| Título de cartão / bloco | 15px / 650 / −0,01em | |
| Corpo | 14px / 400, line-height 1,45 | Base do `body` |
| Célula de tabela / input | 13,5px | |
| Label de campo | 12px / 500 | Sempre acima do campo |
| Cabeçalho de tabela | 11px / 600 / MAIÚSCULAS / +0,04em | |
| Auxiliar / ajuda | 11,5–12,5px / 400 / `--muted-foreground` | |
| Badge | 12px / 600 | |
| Seção do menu | 11px / 600 / MAIÚSCULAS / +0,04em | "DIA A DIA", "BANCOS E MEIOS"… |
| kbd | JetBrains Mono 10,5px | `Ctrl K`, `Alt+1`, `F8` |

## 7. Espaçamento (base 4px)
| Valor | Uso |
|---|---|
| 4px | Ícone ↔ texto pequeno, gap de badge |
| 6–8px | Gap entre botões, gap de filtros |
| 10–12px | Gap entre cartões em grids, padding de tile |
| 16px | Padding horizontal de tabela, gap de formulário em linha |
| 18px | Gap vertical entre blocos da página; padding de cartão (18px laterais, 16px) |
| 20–24px | Padding de KPI (18×20), padding lateral da página (24px; 16px no celular) |

Larguras: página com `max-width: 1440px`; menu lateral 268px (84px recolhido); modais `sm` 440 / `md` 640 / `lg` 920 / `xl` 1180 / painel lateral 680px.

## 8. Alturas de controle
| Controle | Altura |
|---|---|
| Topbar | 64px |
| Botão padrão / pequeno / grande | 36 / 30 / 44px |
| Input / select | 38px |
| Item do menu / subitem | 38 / 32px |
| Aba em pílula / segmentado | 30px (trilho 36px) |
| Linha de tabela | 40px (mínimo 36, máximo 44) |
| Badge | 22px |
| Busca do PDV | 52px |

## 9. Breakpoints
| Nome | Largura | Mudança |
|---|---|---|
| `xl` | ≥ 1360px | Atalhos do Painel em 8 colunas |
| `lg` | < 1280px | Pendências do Painel em 2 colunas |
| `md` | < 1100px | KPIs em 2 colunas, gráficos empilhados, PDV em coluna única |
| `tablet` | < 1024px | Menu vira gaveta; busca vira ícone |
| `sm` | < 760px | Grids e formulários em 1 coluna, modal em tela cheia |
| `xs` | < 640px | Atalhos em 2 colunas, sufixo da logo oculto |

## 10. Camadas (z-index)
Topbar 30 · gaveta do menu 35 (scrim 34) · menus suspensos 40 · modal 45 · paleta Ctrl K 50.

## 11. Movimento
- Transições: 120–150ms em cor, fundo, borda e transform; 200ms na gaveta do menu.
- Skeleton com brilho de 1,2s em loop.
- Globo do Painel gira devagar.
- `prefers-reduced-motion: reduce` desliga todas as animações e transições.
