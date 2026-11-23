# Avante ERP — Design System (v3)

> **Para a IA que vai ler este arquivo:** este documento é a especificação estrita da identidade visual do **Avante ERP** (ERP + PDV na nuvem da Algorithmus), na versão atual (v3, commit `31d2f53`). Todos os valores foram medidos no protótipo de referência (`prototipo/`, fonte executável em `prototipo/css/tokens.css` → `app.css` → `components.css` → `screens.css` → `theme.css` → `v2.css` → `v3.css`). **Não invente cores, raios, sombras ou fontes.** Use somente o que está aqui. Em caso de dúvida, abra o protótipo (`node prototipo/serve.js` → `http://localhost:5173/prototipo/`).

---

## 1. Identidade visual & vibe geral

| Aspecto | Definição |
|---|---|
| **Estilo** | *Soft corporate dashboard* **chapado** (flat): azul institucional sólido, superfícies brancas flutuantes sem borda, formas arredondadas, pílulas. **Sem degradês** em componentes (o único degradê é o fundo de manchas azuis da página). |
| **Tema** | Claro como padrão; tema escuro completo via classe `.dark` no `<html>`. Não é glassmorphism; a única translucidez é a topbar (`blur(14px)`) e o overlay de modal (`blur(3px)`). |
| **Assinatura gráfica** | O **símbolo da Avante** (o "A" formado por uma barra inclinada + peça de apoio) usado como **arte decorativa** em duas versões: **preenchida** (azul-claro translúcido) e **em linhas** (contorno branco/azul de 1,5px), sempre cortada pela borda do contêiner. |
| **Paleta** | Família de azuis da marca: **Azul institucional `#0A5EE6`**, céu `#098BE1`, índigo `#3F49D5`, marinho `#102760`, azul-claro `#B8D4FF`. **Proibido verde e preto puro.** Vermelho e âmbar só com significado (erro e alerta). |
| **Densidade** | Mista: **tabelas e formulários densos** (linha 40px, input 38px, texto 13–13,5px); **painéis e resumos arejados** (cartões com padding 18–32px, gap 18–22px entre blocos). |
| **Sensação** | Confiável, organizado, moderno, leve, brasileiro, "sem ruído". Ação em azul, navegação/seleção em marinho, informação em branco. |
| **Idioma / formatos** | pt-BR. Moeda `R$ 1.234,56` (`Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'})`), data `dd/mm/aaaa`, data e hora `dd/mm/aaaa, hh:mm:ss`. Números sempre `font-variant-numeric: tabular-nums`. |

---

## 2. Paleta de cores (design tokens)

Formato dos tokens: **HSL sem `hsl()`** (padrão shadcn/ui). Uso: `hsl(var(--primary))` ou com alfa `hsl(var(--primary) / .5)`. **Nunca escreva HEX/RGB em componentes.**

### 2.1 Fundos

| Token | HSL (claro) | HEX (claro) | HEX (escuro) | Uso |
|---|---|---|---|---|
| `--background` | `220 38% 96%` | `#F1F4F9` | `#0C0E13` | Cor-base da página (sob as manchas) |
| `--canvas-art` | ver abaixo | — | ver abaixo | Fundo real do `body` (manchas azuis), `background-attachment: fixed` |
| `--card` | `0 0% 100%` | `#FFFFFF` | `#15181E` | Cartões, tabelas, modais, inputs |
| `--popover` | `0 0% 100%` | `#FFFFFF` | `#171A21` | Menus suspensos, paleta Ctrl K |
| `--muted` | `220 45% 96%` | `#F0F3F9` | `#1E2129` | Trilho de abas, ícone de estado vazio, fundos de apoio |
| `--secondary` | `220 45% 95%` | `#EDF0F8` | `#1E2129` | Botão secundário |
| `--accent` | `220 50% 95%` | `#ECF0F9` | `#20242C` | Hover de linha e de item |
| `--table-header` | `220 45% 97%` | `#F4F6FB` | `#1A1D23` | (Opcional) cabeçalho de tabela |
| `--row-selected` | `216 90% 95%` | `#E7F0FE` | `#112645` | Linha selecionada |
| **Menu lateral** `--gradient-sidebar` | `hsl(217 92% 47%)` | `#0A5EE6` | `hsl(218 70% 24%)` | Painel azul do menu (sólido) |
| **Painel secundário** `--gradient-flyout` | `hsl(214 100% 97%)` | `#F0F6FF` | `hsl(220 35% 14%)` | "Mais do financeiro" |
| **Destaque escuro** `--gradient-ink` | `hsl(223 72% 22%)` | `#102760` | `hsl(223 55% 20%)` | Cartão escuro, botão "Abrir PDV" |
| `--gradient-sky` | `hsl(204 95% 96%)` | `#EBF7FE` | `hsl(210 40% 13%)` | Cartão "Contas a receber" |
| `--gradient-indigo` | `hsl(236 90% 97%)` | `#F0F1FE` | `hsl(232 30% 14%)` | Cartão "Contas a pagar" |

```css
/* Fundo de todas as telas (claro) */
--canvas-art:
  radial-gradient(55% 60% at 18% 20%, hsl(216 95% 89% / .85) 0%, transparent 70%),
  radial-gradient(45% 50% at 88% 88%, hsl(226 92% 90% / .8) 0%, transparent 70%),
  radial-gradient(35% 40% at 82% 8%,  hsl(204 90% 93% / .6) 0%, transparent 70%),
  hsl(220 38% 96%);
/* Escuro */
--canvas-art:
  radial-gradient(55% 60% at 18% 20%, hsl(218 70% 18% / .9) 0%, transparent 70%),
  radial-gradient(45% 50% at 88% 88%, hsl(232 60% 18% / .85) 0%, transparent 70%),
  hsl(222 30% 7%);
```

### 2.2 Texto

| Token | HSL | HEX claro | HEX escuro | Uso |
|---|---|---|---|---|
| `--foreground` | `223 45% 14%` | `#141D34` | `#EDEFF3` | Texto principal (marinho quase preto, **nunca `#000`**) |
| `--muted-foreground` | `222 14% 40%` | `#586074` | `#9AA0AC` | Texto secundário, labels de KPI, cabeçalho de tabela, ajuda |
| Desabilitado | — | `opacity: .5` sobre o componente | idem | Botões e campos desabilitados (`pointer-events: none`) |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | `#0E121B` | Texto sobre azul |
| `--ink-foreground` | `0 0% 100%` | `#FFFFFF` | `#0C111D` | Texto sobre marinho |
| `--sidebar-foreground` | `0 0% 100%` | `#FFFFFF` | `#FFFFFF` | Texto do menu (90% item, 78% subitem, 65% rótulo) |
| `--flyout-foreground` | `223 60% 22%` | `#162A5A` | `#BFD7F8` | Texto do painel secundário |

### 2.3 Destaque e ação

| Token | HSL | HEX claro | HEX escuro | Uso |
|---|---|---|---|---|
| `--primary` | `217 92% 47%` | **`#0A5EE6`** | `#388CFA` | Botão primário, links, foco, menu, gráficos, banner |
| `--primary-hover` | `217 92% 41%` | `#0852C9` | `#569DFB` | Hover |
| `--primary-active` | `217 92% 35%` | `#0746AB` | `#6AA9FB` | Pressionado; trilho do segmentado no banner |
| `--primary-subtle` | `216 90% 95%` | `#E7F0FE` | `#112645` | Fundo azul-claro (badge positivo, miniatura, dia com entradas) |
| `--primary-tint` | `216 100% 86%` | `#B8D4FF` | `#75A6F0` | Azul-claro do símbolo preenchido; destaque de texto sobre azul |
| `--ring` | `217 92% 47%` | `#0A5EE6` | `#388CFA` | Anel de foco |
| `--ink` / `--navy` / `--highlight` | `223 72% 22%` | **`#102760`** | `#388CFA` (ink) | Seleção (aba ativa, segmentado ativo), avatar, cartão escuro |
| `--sky` / `--sky-subtle` | `204 92% 46%` / `204 95% 95%` | `#098BE1` / `#E6F5FE` | `#3DABF5` / `#102E41` | Ícone "a receber", dia "valores iguais" |
| `--indigo` / `--indigo-subtle` | `236 64% 54%` / `236 90% 96%` | `#3F49D5` / `#ECEDFE` | `#7E86F1` / `#191C43` | Ícone "a pagar", saídas em gráficos, ícone de atividade |
| `--navy-subtle` | `223 60% 94%` | `#E7ECF9` | `#182239` | Ícone neutro (cliente, produto) |
| `--sidebar-active` / `-foreground` | `0 0% 100%` / `216 91% 38%` | `#FFFFFF` / `#094FB9` | `#FFFFFF` / `#1246A1` | Item ativo do menu: **pílula branca com texto azul** |
| `--destructive` | `4 74% 49%` | `#D92D20` | `#E0493E` | Botão destrutivo |

### 2.4 Bordas, divisores e sombras

| Token | Valor | HEX | Uso |
|---|---|---|---|
| `--border` | `220 30% 91%` | `#E1E6EF` (escuro `#252931`) | Divisores, contorno de tile, borda de botão outline, `kbd` |
| `--input` | `220 25% 85%` | `#CFD6E2` (escuro `#323743`) | Borda de campos |
| Espessura padrão | `1px` (renderiza 0,8px em zoom 125%) | — | Todas as bordas |
| `--shadow-card` | `0 1px 2px hsl(223 60% 20% / 0.04), 0 8px 24px hsl(223 60% 30% / 0.06)` | — | Cartões, tabelas, busca, botões-ícone da topbar, chips |
| `--shadow-pop` | `0 10px 30px hsl(223 60% 20% / 0.14)` | — | Dropdowns, painel secundário, item ativo do menu |
| `--shadow-brand` | `0 8px 20px hsl(217 92% 40% / 0.22)` | — | Botão primário, banner azul, cartão de Vendas, menu, botão PDV |
| `--shadow-modal` | `0 24px 64px hsl(223 60% 15% / 0.24)` | — | Modais e paleta |
| Overlay | `hsl(var(--ink) / .35)` + `backdrop-filter: blur(3px)` | `#102760` 35% | Fundo de modal |
| Foco | `outline: 2px solid hsl(var(--ring)); outline-offset: 1px` | — | Todo elemento interativo (`:focus-visible`) |
| Foco de campo | `border-color: hsl(var(--ring)); box-shadow: 0 0 0 3px hsl(var(--ring) / .15)` | — | Inputs |

### 2.5 Cores semânticas (sem verde)

| Token (fundo / texto) | HEX claro | HEX escuro | Contraste | Status |
|---|---|---|---|---|
| `--status-success` / `-fg` | `#E7F0FE` / `#0D48A0` | `#112645` / `#7EB4FC` | 7,5:1 | **Sucesso = azul**: Ativo, Pago, Concluída, Em estoque, Registrado, Aberto |
| `--status-warning` / `-fg` | `#FDF4E2` / `#8A5300` | `#3D2B0F` / `#FBC760` | 6,3:1 | Alerta: atenção, estoque baixo, configuração faltando |
| `--status-error` / `-fg` | `#FDEDED` / `#B42318` | `#3B1916` / `#F98E86` | 5,8:1 | Erro: Vencido, Estornada, Fora de estoque, erro de campo |
| `--status-pending` / `-fg` | `#FFF6DB` / `#7A5A00` | `#3D310F` / `#FBD460` | 5,9:1 | Pendente, Em contagem, Em aberto |
| `--status-invoiced` / `-fg` | `#ECEDFE` / `#2C3396` | `#1C1E40` / `#AAAFF8` | — | **Info / Faturado** (índigo), perfis |
| `--status-cancelled` / `-fg` | `#EBEEF4` / `#535B6E` | `#23272F` / `#A0A5B1` | 5,6:1 | Cancelado, Arquivado, Rascunho |

> **Regra:** matiz entre 85° e 175° (verde) com saturação > 20% é **proibida** em qualquer cor de texto, fundo, borda ou gráfico.

---

## 3. Tipografia

### 3.1 Famílias

```css
--font-sans:    "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;   /* corpo, UI, tabelas */
--font-display: "DM Sans", "Inter", ui-sans-serif, system-ui, sans-serif;                           /* títulos e números grandes */
--font-mono:    "JetBrains Mono", ui-monospace, "Cascadia Mono", Consolas, monospace;               /* kbd, SKU, códigos */
```

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,700;9..40,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

`body`: Inter **14px / 400 / line-height 1.45 (20,3px) / letter-spacing −0.005em (−0,07px)**, `font-feature-settings: "cv11","ss01"`, `-webkit-font-smoothing: antialiased`.

### 3.2 Escala (valores medidos)

| Papel | Família | Tamanho | Peso | Line-height | Letter-spacing | Cor |
|---|---|---|---|---|---|---|
| **H1** — título de página (`.page-title`) | DM Sans | 28px | 800 | 1.25 (35px) | −0.03em (−0,84px) | foreground |
| **H1 banner** (`.hero-title`) | DM Sans | 24px (22px < 760px) | 700 | 1.2 (28,8px) | −0.03em | branco |
| **H2** — título de bloco grande (`.big-title`) | DM Sans | 21px | 700 | 1.45 | −0.03em (−0,63px) | foreground |
| **H3** — título de modal (`.modal-title`) | DM Sans | 18px | 650 | 1.45 | −0.03em | foreground |
| **H4** — título de cartão / seção (`.card-title`, `.block-title`) | DM Sans | 15px | 650 | 1.45 | −0.03em (−0,45px) | foreground |
| **Número KPI** (`.kpi-value`) | DM Sans | 28px (24px < 640px) | 700 | 1.15 | −0.03em | foreground / branco |
| **Total PDV** | DM Sans | 30px | 700 | — | −0.03em | foreground |
| Login (frase) | DM Sans | 26px | 700 | 1.35 | −0.03em | branco |
| Subtítulo de página (`.page-sub`) | Inter | 13px | 400 | 1.45 | −0,07px | muted-foreground |
| Subtítulo de bloco (`.block-sub`) | Inter | 12px | 400 | 1.45 | — | muted-foreground |
| **Corpo** | Inter | 14px | 400 | 1.45 | −0,07px | foreground |
| Célula de tabela | Inter | 13px | 400 | 1.45 | −0,07px | foreground |
| Input / select | Inter | 13,5px | 400 | 1.45 | — | foreground |
| **Label de campo** (`.label`) | Inter | 12px | 500 | 1.45 | — | foreground |
| Cabeçalho de tabela | Inter | 11px | 600, MAIÚSCULAS | 1.45 | +0.04em (0,44px) | muted-foreground |
| Seção de menu / painel | Inter | 11px | 600, MAIÚSCULAS | 1.45 | +0.04em | 55–60% do texto |
| Rótulo de KPI (`.kpi-top`) | Inter | 13px | 500 | 1.45 | — | muted / branco 85% |
| Meta de KPI | Inter | 12px | 400 (negrito 600) | 1.45 | — | muted / branco 85% |
| Breadcrumb | Inter | 12px | 400 | 1.45 | — | muted-foreground |
| **Botão** padrão | Inter | 13px | 600 | 1.45 | — | conforme variante |
| Botão pequeno | Inter | 12px | 600 | 1.45 | — | conforme variante |
| Item de menu / subitem | Inter | 13,5px 500 (ativo 600) / 13px 400 | — | — | — | branco 90% / 78% |
| Badge | Inter | 12px | 600 | 1.45 | — | fg do status |
| Ajuda / erro de campo | Inter | 11,5px | 400 | 1.45 | — | muted / error-fg |
| kbd | JetBrains Mono | 10,5px | 400 | 1 | — | muted-foreground |

Números (valores, quantidades, datas, códigos): **sempre `tabular-nums`**, alinhados à direita em tabelas.

---

## 4. Espaçamento, grid e bordas

### 4.1 Espaçamento (base 4px)

| Valor | Onde |
|---|---|
| 2–4px | Gap interno de badge, padding de trilho de abas (3px) |
| 6px | Gap ícone ↔ texto em botões; gap entre botões pequenos |
| 8px | Gap entre botões; padding de linha vertical; gap de tabs (2px) |
| 10–12px | Gap entre cartões em grids (12px); gap de formulário (12px); padding de tile (8×10px) |
| 14–16px | Padding horizontal de tabela (16px); padding de linha de destaque (14×16px) |
| 18px | **Gap vertical entre blocos de página**; padding de cartão (16px 18px) |
| 20–24px | Padding de KPI (18px 20px); padding de bloco grande (22px 24px); padding lateral da página (24px) |
| 28–32px | Padding do banner azul (28px 32px) |

- Página: `padding: 8px 24px 32px` (16px laterais < 640px), `gap: 18px` (Painel: `22px`).
- Cartão padrão: cabeçalho `16px 18px 6px`, corpo `10px 18px 16px`, rodapé `0 18px 14px`.
- Modal: cabeçalho `18px 20px 8px`, corpo `12px 20px 18px`, rodapé `14px 20px`.
- Formulário: grid de **12 colunas**, `gap: 12px`; campo curto = 6 colunas; no celular, todos ocupam 12.

### 4.2 Contêineres e responsivo

| Elemento | Medida |
|---|---|
| Conteúdo | `max-width: 1440px; margin: 0 auto` |
| Topbar | 64px de altura, sticky, `hsl(var(--background) / .55)` + `blur(14px)` |
| Menu lateral | 268px (recolhido 84px); painel com margem de 12px do canvas |
| Painel secundário | 272px, à direita do menu (+10px) |
| Modais | `sm` 440 · `md` 640 · `lg` 920 · `xl` 1180 · painel lateral 680px |

| Breakpoint | Comportamento |
|---|---|
| ≥ 1360px | Atalhos em 8 colunas |
| < 1280px | Pendências em 2 colunas |
| < 1100px | KPIs em 2 colunas; grids 2/1 empilham |
| < 1024px | Menu vira gaveta de 272px com scrim; painel secundário abre sobre a gaveta; busca vira ícone |
| < 760px | Tudo em 1 coluna; modal em tela cheia; campos em largura total |
| < 640px | Atalhos em 2 colunas; sufixo "ERP" da logo oculto |

**Regra:** nunca há rolagem horizontal da página; só tabelas rolam dentro do próprio cartão.

### 4.3 Raios (`border-radius`) e bordas

| Elemento | Raio | Borda |
|---|---|---|
| Cartão, tabela, KPI, bloco grande, banner, menu, painel secundário | **18px** (`--radius-lg`) | nenhuma (no escuro: 1px `--border`) |
| Modal | **22px** (painel lateral: 22px só à esquerda) | nenhuma |
| Tile de atalho, linha de destaque, bloco interno | 16px | 1px `--border` |
| Seletor de empresa, resumo interno, `money-stat`, ícone de destaque 44px | 14px | — |
| Célula de calendário, `--radius` | 12px | 1px `--border` |
| Input, select, textarea | **10px** (textarea 12px) | 1px `--input` |
| Ícone em caixa (32px), estado vazio | 10px | — |
| Botão branco do banner | 10px | — |
| `kbd` | 6px | 1px `--border` |
| `--radius-sm` | 8px | — |
| **Botões, abas, segmentados, chips, badges, itens de menu, busca, contadores, "Abrir PDV"** | **999px (pílula)** | — |

---

## 5. Anatomia dos componentes existentes

### 5.1 Topbar
- 64px; `padding: 0 20px 0 16px`; `gap: 12px`; fundo `hsl(var(--background) / .55)` + `backdrop-filter: blur(14px)`; sem borda.
- **Logo**: símbolo SVG de 26px + "vante" em Inter 800, 27px, −0.04em, cor `--primary` + "ERP" 9,5px 700, +0.2em, 75% de opacidade.
- **Busca**: pílula branca de 40px, `max 420px`, `padding: 0 8px 0 14px`, `--shadow-card`, texto muted, `kbd` "Ctrl K".
- **Criar**: botão primário de 38px. **Ícones** (menu, sino): círculo branco de 38px com `--shadow-card`. **Usuário**: pílula branca de 38px, `padding: 0 10px 0 3px`, avatar marinho de 32px.

### 5.2 Menu lateral (dois blocos)
- **Painel principal** `.sidebar-panel`: fundo `#0A5EE6` sólido, raio 18px, `--shadow-brand`, `overflow: hidden`.
  - Seletor de empresa: `hsl(white / .10)` (hover .16), raio 14px, `padding: 10px 12px`; ícone em quadrado branco 14% de 32px; rótulo 65%; nome 13px/600.
  - Item: pílula de 38px, `padding: 0 12px`, `gap: 10px`, 13,5px/500, branco 90%, ícone 17px a 70%. **Hover** `white / .10`. **Ativo**: fundo branco, texto `#094FB9` 600, `--shadow-pop`.
  - Grupo com a rota ativa: rótulo branco 650.
  - Subitens: linha-guia à esquerda (`border-left: 1px solid white/.14`), pílulas de 32px, 13px, branco 78%; **ativo** `white / .18` com texto branco 600.
  - Botão "Mais do financeiro": pílula de 32px, borda tracejada `white/.28`; aberta/ativa: fundo `white/.14–.18`, borda sólida.
  - **Arte**: símbolo em linhas, 300px de altura, `right: -70px; bottom: -40px`, `white / .18`.
- **Bloco do PDV** (separado, 12px abaixo): botão em pílula de 52px, fundo marinho `#102760` sólido, `padding: 0 20px 0 18px`, `gap: 12px`, ícone de monitor de 19px + "Abrir PDV" em DM Sans 15px/700 + seta à direita; hover `--primary-hover`, a seta desliza 3px.
- **Painel secundário** `.flyout`: 272px, fundo `#F0F6FF`, raio 18px, `--shadow-pop`, `padding: 14px 12px`; cabeçalho (rótulo azul em maiúsculas 11px + título DM Sans 15px/700); seções 11px em maiúsculas a 60%; links em pílula de 36px, 13,5px/500, cor `#162A5A`, hover branco; **ativo**: fundo `#0A5EE6`, texto branco, `--shadow-brand`. Entrada: `opacity 0→1; translateX(-8px→0)`, 160ms.

### 5.3 Botões

| Variante | Altura / padding | Fundo | Texto | Borda | Sombra | Hover | Active |
|---|---|---|---|---|---|---|---|
| **Primário** | 36px / 0 16px (topbar 38px) | `#0A5EE6` | branco 600 | — | `--shadow-brand` | `#0852C9` | `#0746AB` |
| **Outline** | 36px / 0 16px | branco | foreground | 1px `#E1E6EF` | — | `--accent` | `--muted` |
| **Secundário** | 36px / 0 16px | `#F0F3F9` | foreground | — | — | brilho .97 | — |
| **Ghost** | 36px | transparente | foreground | — | — | `--accent` | — |
| **Destrutivo** | 36px / 0 16px | `#D92D20` | branco | — | — | 90% | 80% |
| **Destrutivo outline** | 36px | branco | `#B42318` | 1px `#B42318` / 30% | — | `--status-error` | — |
| **Link** | auto | — | `#0A5EE6` 500 | — | — | sublinhado | — |
| **Pequeno** | 30px / 0 12px, 12px | idem | idem | idem | idem | idem | idem |
| **Grande** | 44px / 0 20px, 14px | idem | idem | idem | idem | idem | idem |
| **Ícone** | 36×36 (pequeno 30×30) | idem | — | — | — | — | — |

Todos: pílula 999px, `gap: 6px`, ícone de 15px (pequeno 14px), transição de 120ms, `disabled` = opacidade .5. Podem ter `kbd` à direita.

### 5.4 Cartões
- **Padrão**: branco, **sem borda**, raio 18px, `--shadow-card`.
- **Banner azul** (`.hero-blue`): fundo `#0A5EE6`, `padding: 28px 32px`, `gap: 20px`, `--shadow-brand`, `overflow: hidden`. Avatar branco de 48px com inicial azul; linha de contexto 12,5px a 82%; frase DM Sans 24px/700 branca, com números em `--primary-tint` (`#B8D4FF`). Segmentado: trilho `#0746AB`, ativo branco com texto azul. Botão branco, raio 10px, texto azul. **Arte**: símbolo preenchido (`right:-5%; top:-45%; height:190%; #B8D4FF / .38`) + símbolo em linhas (`right:9%; bottom:-80%; height:150%; white / .16`).
- **KPI** (`.kpi`): `padding: 18px 20px`, `gap: 8px`, rótulo + ícone de 16px à direita → valor → meta ou "split" (2 colunas separadas por linha tracejada `1px dashed --border`). Valor zero fica em `--muted-foreground`.
  - `kpi-accent`: fundo `#0A5EE6`, texto branco, `--shadow-brand`, símbolo em linhas (120px, `right:-14px; bottom:-26px`, branco 25%).
  - `kpi-dark`: fundo `#102760`, texto branco.
  - `kpi-soft-sky` / `kpi-soft-indigo`: fundo `#EBF7FE` / `#F0F1FE`, ícone céu/índigo.
- **Bloco grande** (`.big-card`): `padding: 22px 24px`; cabeçalho com título DM Sans 21px + subtítulo 12px; contador à direita (40×40, raio 14px, azul sólido, branco 18px/700).
- **Tile de atalho** (`.sc`): branco, borda `#E1E6EF`, raio 16px, `padding: 8px 10px`; ícone em caixa de 32px (raio 10px) com fundo subtle do tom (azul, céu, índigo ou marinho); rótulo 13px/600; `kbd Alt+n`. Hover: borda `--border` + `--shadow-card`. Tile do PDV: fundo `#0A5EE6`, texto branco, ícone em branco 18%.

### 5.5 Campos
- Input/select: 38px, `padding: 0 10px` (select `0 28px 0 10px` com seta), raio 10px, borda `#CFD6E2`, fundo branco, 13,5px. **Foco**: borda `#0A5EE6` + halo `0 0 0 3px hsl(var(--ring)/.15)`. Desabilitado ou só leitura: fundo `--muted`, texto muted.
- Afixo (`.input-affix`): mesma caixa; prefixo `R$` ou lupa, sufixo `%`, 12,5px muted; valores alinhados à direita e tabulares.
- Label 12px/500 **acima**; obrigatório com `*` em `#B42318`; "(opcional)" em 400 muted; ajuda 11,5px abaixo.
- Checkbox de 16px (`accent-color: primary`); switch 32×18 (ligado `--primary`); dropzone com borda tracejada `--input`, fundo `--muted` 50%, raio 14px, mínimo 120px.
- Seção de formulário: título 13,5px/600 + descrição 12px; separada por 1px `--border`; recolhível com `<details>` e chevron que gira 180°.

### 5.6 Tabelas
- Dentro de cartão (raio 18px, `overflow: hidden`). Barra superior `padding: 12px 16px` + linha 1px `--border`.
- `th`: 32px, 11px/600, maiúsculas, +0.04em, `#586074`, **sem fundo**; `td`: 40px, 13px; primeira/última coluna com 16px de padding lateral.
- Hover de linha `hsl(var(--accent) / .6)`; seleção `--row-selected`; números `text-align: right` + tabulares.
- Célula principal: `.cell-main` 500 + `.cell-sub` 12px muted; miniatura de 28px, raio 12px, `#E7F0FE` com ícone azul.
- Rodapé `padding: 10px 16px 14px`, 12px muted, "N registros" + paginação (botões pequenos "Anterior · Página 1 · Próxima").

### 5.7 Abas, segmentados, chips, badges, contadores
- **Abas em pílula** `.tabs.is-pills`: trilho `#F0F3F9`, `padding: 3px`, `gap: 2px`, raio 999px; aba de 30px, `padding: 0 14px`, 13px/500, muted; **ativa**: fundo `#102760`, texto branco 600; contador interno em mini-pílula de 18px.
- **Abas sublinhadas**: 36px, 13px/500 muted; ativa em `--foreground` com borda inferior de 2px `--ink`.
- **Segmentado** `.seg`: igual às abas em pílula, com `button[aria-pressed=true]` marinho.
- **Chip**: pílula de 28px, `padding: 0 10px`, 12,5px/500, branco + `--shadow-card`.
- **Badge**: pílula de 22px, `padding: 0 9px`, 12px/600, fundo e texto do status (§2.5), ícone opcional de 12px.
- **Contador** `.count`: pílula de 18–20px, 11–12px/600; `.is-alert` usa as cores de pendente.

### 5.8 Modais
- Raio 22px, sem borda, `--shadow-modal`, overlay marinho 35% + blur de 3px.
- Cabeçalho sem divisória (título DM Sans 18px/650 + subtítulo + botão fechar circular); rodapé com divisória (ações secundárias à esquerda; Cancelar + primário à direita).
- Confirmação destrutiva: `sm` (440px), pergunta no título, consequência no corpo com o nome em `<strong>`, "Voltar" + **botão destrutivo com o verbo**.
- Abre e fecha por estado na URL (`?modal=`); fecha com X, overlay e Esc; foco inicial no primeiro campo.

### 5.9 Estado vazio
- Centralizado, `padding: 24px 8px`, `gap: 6px`: ícone em caixa de 32px (raio 10px, `--muted`, ícone muted) → título 13px/600 → texto 12,5px muted → ação (botão primário pequeno ou link).

### 5.10 Calendário financeiro
- Bloco grande com selo de 46px (raio 14px, azul sólido, ícone branco) + título + navegação (botões-ícone brancos e mês em DM Sans 15px/700).
- Grade de 7 colunas, `gap: 8px`; célula de 48px, raio 12px, borda `--border`, 15px/600.
  - Com movimento: entradas `#E7F0FE`/`#0D48A0`, saídas `#ECEDFE`/`#3F49D5`, iguais `#E6F5FE`/`#098BE1`, com ponto de 6px.
  - Hoje: anel `0 0 0 2px #0A5EE6`. Selecionado: fundo azul sólido, texto branco, `--shadow-brand`.
- Detalhe do dia abaixo: faixa branca com borda e raio 14px.

### 5.11 Linhas de destaque (Painel)
- `.focus-row`: `padding: 14px 16px`, `gap: 14px`, raio 16px, branco com borda; ícone de 44px (raio 14px) com tom âmbar (alerta) ou azul; título 15px/650 + texto 13px muted; ação em botão pequeno.
- `.focus-ok`: pílula de 32px `#E7F0FE` com texto `#0D48A0` e check.
- `.act-row`: `padding: 12px`, raio 14px, ícone de 38px índigo sobre `#ECEDFE`; hover `--accent`.

### 5.12 Gráficos
- **Entradas / receita / saldo**: `#0A5EE6`. **Saídas**: `hsl(var(--indigo) / .7)` (barras) ou `#3F49D5` (linhas). Grade 1px `--border`; eixos 10,5px muted, tabulares, em R$; última data alinhada à direita.
- Barras de proporção: trilho de 8px em pílula `--muted`, preenchimento azul sólido.
- Sem dados: bloco `--muted` a 60%, raio 14px, 120px, "Nenhum valor neste conjunto."

### 5.13 Símbolo decorativo (`AvanteDeco`)
```js
AvanteDeco('fill' | 'line', 'classe-de-posicao')
// <svg class="deco-a is-fill|is-line …" viewBox="-1 -1 42 34" aria-hidden="true">
// path 1 (barra):  M15.6 2h7.6c1.2 0 2.2.6 2.8 1.7L39.4 29.1c.2.5-.1.9-.6.9h-10.4c-1.4 0-2.6-.8-3.2-2L14.9 3.1c-.2-.5.1-1.1.7-1.1Z
// path 2 (apoio):  M10.6 13.7h8.6L11.9 28.2c-.6 1.1-1.7 1.8-3 1.8H.9c-.5 0-.8-.5-.5-.9l8.3-14.1c.4-.8 1.1-1.3 1.9-1.3Z
// fill: fill="currentColor" · line: fill="none" stroke="currentColor" stroke-width="1.5" vector-effect="non-scaling-stroke"
```
- `.deco-a { position: absolute; pointer-events: none; }`; o contêiner recebe `position: relative; overflow: hidden` e os filhos de conteúdo `position: relative; z-index: 1`.
- Hoje está em: banner (preenchido + linhas), KPI de Vendas (linhas), menu (linhas), login (preenchido + linhas), tela de carregamento (linhas a 10%).

---

## 6. Diretrizes de expansão (novos componentes)

1. **Superfície**: todo componente novo começa como cartão **branco, sem borda, raio 18px, `--shadow-card`** sobre o canvas. Elementos internos usam raio 14–16px (blocos) ou 10–12px (controles).
2. **Cor**: somente tokens. Ação = `--primary`; seleção = `--ink` (marinho); positivo = `--status-success` (azul). Máximo de **1 superfície azul sólida e 1 marinho** por tela. **Nada de degradês, verde ou preto.**
3. **Forma**: tudo que é clicável e cabe numa linha (botão, aba, chip, tag, filtro, paginação, item de lista de navegação) é **pílula 999px**. Campos de texto têm raio 10px.
4. **Tipografia**: títulos e números de destaque em **DM Sans, −0.03em**; o resto em Inter. Hierarquia por tamanho e peso, não por cor.
5. **Símbolo da Avante**: use-o só em superfícies de marca (fundos azuis ou marinhos, áreas vazias grandes), **cortado pela borda**, a 16–38% de opacidade, com no máximo 2 por superfície. Nunca sobre tabelas, formulários ou texto denso.
6. **Modais e painéis**: modal centralizado (raio 22px) para até ~8 campos; **painel lateral de 680px** acima disso; ação destrutiva sempre com confirmação `sm` e botão vermelho com verbo.
7. **Alertas inline**: faixa raio 12px, `padding: 8px 12px`, ícone de 15–16px + texto 12,5–13px, nas cores de status (`info` = `--primary-subtle`/`--status-invoiced-fg`, `warning` = âmbar, `error` = vermelho). Ação à direita em botão outline pequeno.
8. **Toasts**: pílula ou cartão `--popover` com `--shadow-pop`, raio 14px, `padding: 12px 16px`, ícone em caixa de 28px com o tom do status, texto 13px; canto inferior direito, 24px da borda, empilhados com gap de 8px; somem em 4s; nunca usam verde.
9. **Gráficos novos**: série principal `--primary`, secundária `--indigo`, terciária `--sky`, comparação `--muted-foreground` tracejada. Eixos 10,5px tabulares. Cartão branco, título H4 em DM Sans.
10. **Estados vazios**: padrão §5.9; o texto explica o que vai aparecer ali e a ação cria o primeiro item. Telas sem dados nunca mostram dados fictícios.
11. **Formulários novos**: grid de 12 colunas, label acima, ajuda abaixo, opcionais agrupados num `<details>` "Mais detalhes", valores monetários com afixo `R$` alinhados à direita.
12. **Estados obrigatórios**: carregando (skeleton `--muted` com brilho de 1,2s), vazio, erro (mensagem + "Tentar novamente"), com dados; foco visível; `prefers-reduced-motion` desliga animações.
13. **Movimento**: 120–180ms `ease`; hover de cartão clicável só troca borda e sombra (sem pular); setas deslizam 3px.
14. **Escuro**: troque só os tokens (`.dark`); cartões ganham 1px de `--border`; símbolos e superfícies de marca continuam azuis.

---

## 7. Snippets de referência

### 7.1 Tokens essenciais (CSS)
```css
:root {
  --background: 220 38% 96%;  --foreground: 223 45% 14%;
  --card: 0 0% 100%;          --muted: 220 45% 96%;  --muted-foreground: 222 14% 40%;
  --border: 220 30% 91%;      --input: 220 25% 85%;
  --primary: 217 92% 47%;     --primary-hover: 217 92% 41%; --primary-active: 217 92% 35%;
  --primary-subtle: 216 90% 95%; --primary-tint: 216 100% 86%; --primary-foreground: 0 0% 100%;
  --ink: 223 72% 22%;         --ink-foreground: 0 0% 100%;
  --sky: 204 92% 46%;         --indigo: 236 64% 54%;
  --status-success: 216 90% 95%; --status-success-fg: 216 85% 34%;
  --status-warning: 39 88% 94%;  --status-warning-fg: 36 100% 27%;
  --status-error: 0 81% 96%;     --status-error-fg: 4 76% 40%;
  --radius: 12px; --radius-lg: 18px;
  --shadow-card: 0 1px 2px hsl(223 60% 20% / .04), 0 8px 24px hsl(223 60% 30% / .06);
  --shadow-brand: 0 8px 20px hsl(217 92% 40% / .22);
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "DM Sans", "Inter", ui-sans-serif, system-ui, sans-serif;
}
body { font: 400 14px/1.45 var(--font-sans); letter-spacing: -0.005em; color: hsl(var(--foreground));
       background: var(--canvas-art); background-attachment: fixed; }
```

### 7.2 Banner azul com o símbolo (componente mais representativo)
```html
<section class="hero">
  <svg class="deco fill" viewBox="-1 -1 42 34" aria-hidden="true"><!-- 2 paths, fill="currentColor" --></svg>
  <span class="avatar">R</span>
  <div>
    <p class="greet">Olá, Responsável · João Pertile</p>
    <p class="title">Você tem <b>2 pendências</b> hoje.</p>
  </div>
  <div class="seg"><button aria-pressed="false">7 dias</button><button aria-pressed="true">30 dias</button></div>
</section>
```
```css
.hero { position: relative; overflow: hidden; display: flex; align-items: center; gap: 20px;
  padding: 28px 32px; border-radius: 18px; background: hsl(var(--primary));
  color: hsl(var(--primary-foreground)); box-shadow: var(--shadow-brand); }
.hero > :not(.deco) { position: relative; z-index: 1; }
.hero .deco { position: absolute; right: -5%; top: -45%; height: 190%; color: hsl(var(--primary-tint) / .38); pointer-events: none; }
.hero .avatar { width: 48px; height: 48px; border-radius: 50%; display: grid; place-items: center;
  background: hsl(var(--card)); color: hsl(var(--primary)); font-weight: 700; }
.hero .greet { font-size: 12.5px; color: hsl(var(--primary-foreground) / .82); }
.hero .title { font: 700 24px/1.2 var(--font-display); letter-spacing: -0.03em; }
.hero .title b { color: hsl(var(--primary-tint)); }
.hero .seg { display: inline-flex; padding: 3px; gap: 2px; border-radius: 999px; background: hsl(var(--primary-active)); }
.hero .seg button { height: 30px; padding: 0 14px; border: 0; border-radius: 999px; background: none;
  color: hsl(var(--primary-foreground) / .85); font: 500 12.5px var(--font-sans); }
.hero .seg button[aria-pressed="true"] { background: hsl(var(--card)); color: hsl(var(--primary)); font-weight: 600; }
```

### 7.3 Item de menu e botão "Abrir PDV"
```css
.sidebar-panel { border-radius: 18px; background: hsl(var(--primary)); box-shadow: var(--shadow-brand); overflow: hidden; }
.nav-link { display: flex; align-items: center; gap: 10px; height: 38px; padding: 0 12px; border-radius: 999px;
  font: 500 13.5px var(--font-sans); color: hsl(var(--sidebar-foreground) / .9); }
.nav-link:hover { background: hsl(var(--sidebar-foreground) / .10); }
.nav-link.is-active { background: hsl(var(--sidebar-active)); color: hsl(var(--sidebar-active-foreground)); font-weight: 600; box-shadow: var(--shadow-pop); }
.pdv-launch { display: flex; align-items: center; gap: 12px; min-height: 52px; padding: 0 20px 0 18px;
  border-radius: 999px; background: hsl(var(--ink)); color: hsl(var(--ink-foreground)); box-shadow: var(--shadow-brand); }
.pdv-launch:hover { background: hsl(var(--primary-hover)); }
.pdv-launch .title { font: 700 15px var(--font-display); letter-spacing: -0.03em; }
.pdv-launch .arrow { margin-left: auto; transition: transform .15s; }
.pdv-launch:hover .arrow { transform: translateX(3px); }
```

### 7.4 Tailwind (equivalência rápida)
```ts
// tailwind.config.ts → theme.extend
colors: { background:'hsl(var(--background))', foreground:'hsl(var(--foreground))',
  card:'hsl(var(--card))', muted:{DEFAULT:'hsl(var(--muted))',foreground:'hsl(var(--muted-foreground))'},
  border:'hsl(var(--border))', input:'hsl(var(--input))', ring:'hsl(var(--ring))',
  primary:{DEFAULT:'hsl(var(--primary))',hover:'hsl(var(--primary-hover))',active:'hsl(var(--primary-active))',
           subtle:'hsl(var(--primary-subtle))',tint:'hsl(var(--primary-tint))',foreground:'hsl(var(--primary-foreground))'},
  ink:{DEFAULT:'hsl(var(--ink))',foreground:'hsl(var(--ink-foreground))'},
  sky:'hsl(var(--sky))', indigo:'hsl(var(--indigo))' },
borderRadius: { DEFAULT:'12px', lg:'18px', modal:'22px', field:'10px', pill:'999px' },
boxShadow: { card:'var(--shadow-card)', pop:'var(--shadow-pop)', brand:'var(--shadow-brand)', modal:'var(--shadow-modal)' },
fontFamily: { sans:['Inter','system-ui','sans-serif'], display:['DM Sans','Inter','sans-serif'], mono:['JetBrains Mono','monospace'] },
// Cartão:  "bg-card rounded-lg shadow-card"
// Primário: "h-9 px-4 rounded-pill bg-primary text-primary-foreground font-semibold text-[13px] shadow-brand hover:bg-primary-hover active:bg-primary-active"
// Aba ativa: "h-[30px] px-3.5 rounded-pill bg-ink text-ink-foreground text-[13px] font-semibold"
// Título:  "font-display text-[28px] font-extrabold tracking-[-0.03em]"
```
