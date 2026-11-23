# 04 · Estilos visuais (v3)

> Valores exatos em [03-tokens.md](03-tokens.md). Aqui está **como** o estilo se aplica, elemento por elemento, exatamente como no protótipo.

## 1. Linguagem geral — "Soft corporate dashboard chapado"

- **Fundo**: todas as telas (inclusive login, carregamento e PDV) usam o mesmo fundo claro com **manchas azuis suaves** (`--canvas-art`, fixo ao rolar).
- **Superfícies**: cartões **brancos, sem borda**, raio 18px, sombra suave `--shadow-card`, flutuando sobre o fundo.
- **Cor de marca chapada**: azul institucional `#0A5EE6` **sólido** no menu lateral, no banner do Painel, no KPI de Vendas e nos botões primários. Marinho `#102760` sólido no cartão escuro, nas seleções e no botão "Abrir PDV". **Nenhum degradê em componentes.**
- **Formas**: tudo que é clicável e cabe numa linha é **pílula** (999px). Campos têm raio 10px.
- **Tipografia**: títulos e números em **DM Sans** com espaçamento negativo (−0.03em); interface em Inter.
- **Assinatura**: o **símbolo da Avante** ampliado, preenchido ou em linhas, cortado pela borda, nas superfícies de marca.
- **Densidade**: tabelas e formulários compactos (linha 40px, input 38px, texto 13–13,5px); Painel e resumos arejados.

Hierarquia de cor por tela: superfícies grandes coloridas são raras. Em telas internas, no máximo **1 cartão azul e 1 marinho**. O Painel é a exceção (banner azul, KPI Vendas azul, KPI Estoque marinho, KPIs céu e índigo suaves). Detalhes pequenos em azul sólido são permitidos (selo do calendário, contador, saldo final, dia selecionado, tile do PDV).

## 2. Topbar (64px)

- Sticky, **sem borda**, fundo `hsl(var(--background) / .55)` + `backdrop-filter: blur(14px)`; `padding: 0 20px 0 16px`; `gap: 12px`.
- Da esquerda para a direita: botão de menu (círculo branco de 38px, `--shadow-card`) · **logo** (barra azul + peça branca com realce leve, "vante" azul, "ERP" branco com halo azul; ver [02 §1](02-identidade-marca.md)) · **busca** (pílula branca de 40px, até 420px, `padding: 0 8px 0 14px`, `--shadow-card`, lupa + "Buscar telas e ações…" + `kbd` "Ctrl K") · espaço · **[+ Criar]** (primário 38px) · **Assistente** (secundário, oculto < 1024px) · sino (círculo branco de 38px) · **usuário** (pílula branca de 38px, `padding: 0 10px 0 3px`, avatar marinho de 32px com inicial branca, nome e chevron).

## 3. Menu lateral — dois blocos + painel secundário

### 3.1 Painel principal (`.sidebar-panel`)
- 268px de largura, a 12px das bordas do canvas, **fundo azul sólido `#0A5EE6`**, raio 18px, `--shadow-brand`, `overflow: hidden`.
- **Seletor de empresa** no topo: caixa `branco / .10` (hover `.16`), raio 14px, `padding: 10px 12px`; ícone num quadrado branco a 14% de 32px; rótulo "Empresa ativa" a 65%; nome 13px/600 branco; chevron.
- **Itens**: pílula de 38px, `padding: 0 12px`, `gap: 10px`, Inter 13,5px/500, branco a 90%, ícone 17px a 70%.
  - Hover: fundo `branco / .10`.
  - **Ativo: pílula branca, texto `#094FB9` 600, `--shadow-pop`.**
  - Grupo que contém a rota ativa: rótulo branco 650.
- **Subitens**: recuados, com linha-guia à esquerda (`border-left: 1px solid branco / .14`); pílulas de 32px, 13px, branco a 78%; **ativo: `branco / .18` com texto branco 600**.
- **"Mais do financeiro"**: último subitem do Financeiro, pílula de 32px com **borda tracejada** `branco / .28`; aberta ou com rota ativa dentro: fundo `branco / .14–.18` e borda sólida.
- **Arte**: símbolo da Avante **em linhas**, 300px de altura, no **canto inferior direito**, cortado pela borda (`right: -70px; bottom: -40px`), branco a 18%. Recolhido: 90px (`right: -30px; bottom: -12px`).

### 3.2 Bloco do PDV (`.sidebar-foot`)
- Separado do painel azul, **12px abaixo**, no rodapé.
- Botão **"Abrir PDV"**: pílula de 52px, **fundo marinho `#102760` sólido**, `padding: 0 20px 0 18px`, `gap: 12px`, `--shadow-brand`; ícone de monitor 19px branco + "Abrir PDV" em DM Sans 15px/700 branco + **seta** à direita (`margin-left: auto`).
- Hover: fundo `--primary-hover` (azul) e a seta desliza 3px para a direita. Sem brilho, sem textura, sem caixa em volta do ícone.
- Leva a `/transicao/pdv`.

### 3.3 Painel secundário (`.flyout`)
- Abre **à direita do menu** (10px de distância), 272px, **fundo azul-claro `#F0F6FF`**, raio 18px, `--shadow-pop`, `padding: 14px 12px`.
- Cabeçalho: rótulo "FINANCEIRO" em azul, 11px maiúsculas + título "Mais do financeiro" em DM Sans 15px/700 + botão fechar.
- Seções em 11px maiúsculas a 60% (Consultas, Meios de pagamento, Patrimônio, Configuração financeira).
- Links: pílulas de 36px, 13,5px/500, cor `#162A5A`; hover fundo branco; **ativo: fundo `#0A5EE6`, texto branco, `--shadow-brand`**.
- Entrada: `opacity 0→1` + `translateX(-8px → 0)` em 160ms. Fecha com X, clique fora, `Esc` ou ao navegar.

## 4. Cartões

| Variante | Visual |
|---|---|
| **Padrão** | Branco, sem borda, raio 18px, `--shadow-card` |
| **Banner azul** (`.hero-blue`, só no Painel) | Ver §5 |
| **KPI** | `padding: 18px 20px`, `gap: 8px`: rótulo 13px/500 + ícone 16px à direita → valor DM Sans 28px/700 → meta 12px ou "split" (2 colunas separadas por linha tracejada `1px dashed --border`). Valor zero em `--muted-foreground` |
| KPI `accent` (Vendas) | Fundo azul sólido, texto branco, `--shadow-brand`, símbolo em linhas (120px, `right: -14px; bottom: -26px`, branco 25%) |
| KPI `dark` (Estoque) | Fundo marinho sólido `#102760`, texto branco |
| KPI `soft-sky` / `soft-indigo` | Fundo `#EBF7FE` / `#F0F1FE`, ícone céu / índigo |
| **Bloco grande** (`.big-card`) | `padding: 22px 24px`; título DM Sans 21px + subtítulo 12px; contador opcional à direita (40×40, raio 14px, azul sólido, número branco 18px/700, `--shadow-brand`) |
| **Tile de atalho** (`.sc`) | Branco, borda `--border`, raio 16px, `padding: 8px 10px`; ícone em caixa de 32px (raio 10px, fundo subtle do tom); rótulo 13px/600; `kbd Alt+n`. Hover: `--shadow-card`. **Tile "Abrir PDV"**: fundo azul sólido, texto branco, ícone em branco a 18% |
| **Bloco interno** | Raio 14–16px, 1px `--border`, fundo branco |

## 5. Banner azul do Painel (`.hero.hero-blue`)

- Cartão **azul sólido `#0A5EE6`**, `padding: 28px 32px` (22×20px < 760px), `gap: 20px`, `--shadow-brand`, `overflow: hidden`, raio 18px.
- Avatar **branco** de 48px com a inicial em azul (17px).
- Linha de contexto 12,5px branco a 82%: "Olá, Responsável · João Pertile · 22/10/2026 — 20/11/2026 · atualizado às 10:31".
- Frase DM Sans **24px/700**, line-height 1.2, branca; o número ("2 pendências") em **azul-claro `#B8D4FF`**.
- À direita: **segmentado** com trilho `--primary-active` (`#0746AB`), botões branco a 85%, **ativo branco com texto azul**; botão **branco** com texto azul e raio 10px ("Exportar resumo"; hover `--primary-tint`).
- **Arte**: símbolo **preenchido** `right: -5%; top: -45%; height: 190%`, cor `#B8D4FF` a 38% + símbolo **em linhas** `right: 9%; bottom: -80%; height: 150%`, branco a 16%. No celular: preenchido `right: -20%; top: -10%; height: 110%` e o de linhas some.

## 6. Botões

| Variante | Visual |
|---|---|
| **Primário** | Azul `#0A5EE6` sólido, texto branco 600, `--shadow-brand`; hover `#0852C9`; pressionado `#0746AB` |
| **Outline** | Branco, borda 1px `--border`, texto foreground; hover `--accent` |
| **Secundário** | `--secondary`, texto foreground |
| **Ghost** | Transparente; hover `--accent` |
| **Destrutivo** | `#D92D20`, texto branco |
| **Destrutivo outline** | Branco, borda vermelha a 30%, texto `#B42318`; hover `--status-error` |
| **Link** | Texto azul 500, sublinha no hover |

Todos em **pílula**, 36px (pequeno 30px, grande 44px), `padding: 0 16px` (pequeno `0 12px`, grande `0 20px`), `gap: 6px`, ícone 15px, transição de 120ms, desabilitado com opacidade .5. Botão de ícone: círculo 36×36 (30×30).

## 7. Abas, segmentados, chips e contadores

- **Abas em pílula**: trilho `--muted`, `padding: 3px`, `gap: 2px`; aba de 30px, `padding: 0 14px`, 13px/500 muted; **ativa: marinho `#102760` com texto branco 600**; contador em mini-pílula de 18px.
- **Abas sublinhadas** (dentro de modais): 36px; ativa em foreground com borda inferior de 2px marinho.
- **Segmentado**: igual às abas em pílula (`aria-pressed`). No banner azul, segue §5.
- **Chip**: pílula de 28px branca com `--shadow-card`, 12,5px/500.
- **Contador**: pílula de 18–20px, 11–12px/600; `.is-alert` com as cores de pendente.

## 8. Campos de formulário

- Input e select: 38px, raio 10px, borda `--input`, fundo branco, 13,5px, `padding: 0 10px` (select `0 28px 0 10px` com seta).
- **Foco**: borda azul + halo `0 0 0 3px hsl(var(--ring) / .15)`. Desabilitado ou só leitura: fundo `--muted`.
- Label 12px/500 **acima**; obrigatório com `*` vermelho; "(opcional)" em 400 muted; ajuda ou erro 11,5px abaixo.
- Afixos `R$` e `%` em 12,5px muted; valores à direita e tabulares.
- Checkbox 16px (`accent-color: primary`); switch 32×18 (ligado azul); dropzone com borda tracejada `--input`, fundo `--muted` a 50%, raio 14px, mín. 120px.
- Seção de formulário: título 13,5px/600 + descrição 12px, separada por 1px `--border`, recolhível com chevron que gira 180°.

## 9. Tabelas

- Dentro de cartão (raio 18px, `overflow: hidden`). Barra superior `padding: 12px 16px` com abas de status + "Buscar e filtrar", separada por 1px `--border`.
- Cabeçalho 32px, 11px/600 maiúsculas +0.04em, muted, **sem fundo**. Linha 40px, 13px. Primeira e última coluna com 16px de padding lateral.
- Hover `hsl(var(--accent) / .6)`; seleção `--row-selected`; números à direita e tabulares.
- Célula principal: título 500 + subtítulo 12px muted; miniatura de 28px, raio 12px, `--primary-subtle` com ícone azul.
- Rodapé `padding: 10px 16px 14px`, 12px muted: "N registros" + paginação em botões pequenos.
- Tabelas largas rolam **dentro do cartão**; a página nunca rola na horizontal.

## 10. Modais

- Raio 22px, sem borda, `--shadow-modal`; overlay marinho a 35% + desfoque de 3px.
- Cabeçalho sem divisória: título DM Sans 18px/650 + subtítulo + botão fechar circular. Rodapé com divisória: ações secundárias à esquerda; Cancelar + primário à direita.
- Tamanhos `sm` 440 / `md` 640 / `lg` 920 / `xl` 1180; painel lateral de 680px (raio só à esquerda). Tela cheia < 760px.
- Confirmação destrutiva: `sm`, pergunta no título, consequência no corpo com o nome em negrito, "Voltar" + botão vermelho com o verbo.

## 11. Gráficos

- **Entradas, receita e saldo**: azul `--primary`. **Saídas**: índigo (`hsl(var(--indigo) / .7)` em barras, `--indigo` em linhas). Período anterior: muted tracejado.
- Grade horizontal 1px `--border`; eixos 10,5px muted, tabulares, em R$; última data alinhada à direita.
- Barras de proporção: trilho de 8px `--muted` em pílula, preenchimento **azul sólido**.
- Sem dados: bloco `--muted` a 60%, raio 14px, 120px, "Nenhum valor neste conjunto."
- Legenda: quadradinho de 8px (raio 2px) + rótulo 12px.

## 12. Símbolo decorativo — posições exatas

O contêiner recebe `position: relative; overflow: hidden`; os filhos de conteúdo `position: relative; z-index: 1`; o símbolo `position: absolute; pointer-events: none; width: auto`.

| Onde | Versão | Posição | Cor |
|---|---|---|---|
| Banner do Painel | preenchido | `right: -5%; top: -45%; height: 190%` | `hsl(var(--primary-tint) / .38)` |
| Banner do Painel | linhas | `right: 9%; bottom: -80%; height: 150%` | `hsl(var(--primary-foreground) / .16)` |
| KPI Vendas | linhas | `right: -14px; bottom: -26px; height: 120px` | `hsl(var(--primary-foreground) / .25)` |
| Menu lateral | linhas | `right: -70px; bottom: -40px; height: 300px` (recolhido: `-30px`, `-12px`, `90px`) | `hsl(var(--sidebar-foreground) / .18)` |
| Login (painel azul) | preenchido | `right: -12%; bottom: -8%; height: 62%` | `hsl(var(--primary-tint) / .45)` |
| Login (painel azul) | linhas | `left: -10%; top: -6%; height: 34%` | `hsl(var(--primary-foreground) / .2)` |
| Telas de carregamento | linhas | `right: -6%; bottom: -18%; height: 95vh` | `hsl(var(--primary) / .10)` |

## 13. Login e telas de carregamento

- **Login**: duas colunas. Esquerda: painel **azul sólido** com a logo toda branca (36/38px), a frase em DM Sans 26px/700 branca, 3 itens com ícone e os dois símbolos (§12). Direita: formulário de 400px sobre o fundo de manchas. No celular, só o formulário.
- **Carregamento** (ERP ↔ PDV): fundo de manchas + símbolo em linhas a 10%; no centro, quadrado branco de 64px (raio 20px, `--shadow-pop`) com o símbolo de 30px; "Avante ERP"/"Avante PDV" 16px/600; subtítulo 12,5px muted; barra de 72×2px com segmento azul animado.

## 14. Badges de status

Pílula de 22px, `padding: 0 9px`, 12px/600, fundo suave + texto do mesmo tom ([03 §1.5](03-tokens.md)). O texto do status sempre aparece (nunca só a cor). Ícone opcional de 12px.

## 15. Estados obrigatórios em toda tela

| Estado | Visual |
|---|---|
| Carregando | Skeleton no formato final (blocos `--muted` com brilho de 1,2s), nunca spinner em tela cheia |
| Vazio | Centralizado, `padding: 24px 8px`, `gap: 6px`: ícone em caixa de 32px (`--muted`, raio 10px) → título 13px/600 → texto 12,5px muted → ação (botão primário pequeno ou link) |
| Vazio por filtro | "Nenhum resultado neste filtro" + "Limpar filtros" |
| Erro | Mensagem + "Tentar novamente"; erro de campo inline em vermelho |
| Aviso | Faixa raio 12px, `padding: 8px 12px`, ícone + texto + ação à direita, nas cores de status |
| Alterações não salvas | Faixa âmbar no modal: "Há alterações não salvas." + "Continuar editando" + "Descartar e fechar" (vermelho outline) |
| Foco | Contorno de 2px `--ring` com afastamento de 1px |

## 16. Iconografia

- Estilo **Lucide** (traço 2px, terminações arredondadas, viewBox 24). Em React: `lucide-react`.
- Tamanhos: 13–15px em botões e textos, 16–17px no menu e em KPIs, 18px na topbar e em linhas de destaque, 19px no "Abrir PDV".
- Ícones herdam a cor do texto. No menu azul: branco a 70% (ativo: azul).
- Ícone em caixa: 32px, raio 10px, fundo subtle do tom (azul, céu, índigo ou marinho-claro), ícone na cor do tom.

## 17. Tema escuro

Mesma estrutura, trocando só os tokens (`.dark`): fundo quase preto com manchas azul-escuras, cartões grafite **com 1px de borda**, azul mais claro (`hsl(214 95% 60%)`), menu `hsl(218 70% 24%)`, painel secundário `hsl(220 35% 14%)`, cartão escuro `hsl(223 55% 20%)`. Símbolos e superfícies de marca continuam azuis. Continua chapado e sem verde.
