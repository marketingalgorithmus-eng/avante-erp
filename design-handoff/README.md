# Avante ERP — Pacote de Design para Implementação (v3)

> **Para a LLM que vai implementar:** este pacote descreve, de forma completa e sem ambiguidade, o design system e as telas do **Avante ERP** (ERP + PDV na nuvem da Algorithmus) **exatamente como está hoje no protótipo** (versão v3). Leia todos os arquivos na ordem abaixo **antes** de escrever qualquer código. Quando um detalhe não estiver aqui, consulte o protótipo de referência (`prototipo/`), que é a fonte visual executável. Nunca invente cores, campos, colunas ou dados.

---

## O que é este pacote

| Item | Valor |
|---|---|
| **Produto** | Avante ERP — sistema de gestão (ERP) com frente de caixa (PDV) integrada |
| **Empresa** | Algorithmus |
| **Tipo de design** | Design system de **aplicação SaaS B2B / dashboard operacional** (back-office + ponto de venda), *light-first* com tema escuro |
| **Estilo** | **Soft corporate dashboard chapado (flat)**: fundo com manchas azuis suaves, cartões brancos sem borda e cantos de 18px, botões e abas em pílula, menu lateral **azul sólido** com painel secundário azul-claro, banner azul sólido no Painel, títulos em **DM Sans** e o **símbolo da Avante** como arte decorativa (preenchido e em linhas). **Sem degradês** em componentes |
| **Paleta** | Família de azuis da marca: **Azul institucional `#0A5EE6`**, céu `#098BE1`, índigo `#3F49D5`, **marinho `#102760`** (no lugar do preto), azul-claro `#B8D4FF`, branco. **Sem verde e sem preto puro** |
| **Idioma da interface** | Português do Brasil (pt-BR), moeda BRL, datas `dd/mm/aaaa` |
| **Stack-alvo recomendada** | React + Tailwind CSS + shadcn/ui (tokens em CSS variables HSL). O protótipo de referência é HTML/CSS/JS puro |
| **Escopo** | 41 rotas, 113 estados de tela (cada print do sistema original virou um estado navegável) |
| **Versão do design** | v3 — 22/11/2026 — github.com/marketingalgorithmus-eng/avante-erp (branch `main`). A versão v1 (preto + degradês) está na etiqueta `design-v1-azul` e **não** vale mais |

---

## Ordem de leitura

| # | Arquivo | Conteúdo |
|---|---|---|
| 1 | [01-visao-geral.md](01-visao-geral.md) | Nome, tipo de design, a ideia a ser transmitida, público, princípios e decisões de produto |
| 2 | [02-identidade-marca.md](02-identidade-marca.md) | Logo (construção, SVG, realce do branco), símbolo decorativo, paleta, regras de cor e proibições |
| 3 | [03-tokens.md](03-tokens.md) | Todos os tokens: cores (claro e escuro, HSL e HEX), fundo, tipografia, espaçamento, raios, sombras, alturas, z-index, breakpoints, movimento |
| 4 | [04-estilos-visuais.md](04-estilos-visuais.md) | O estilo em detalhe: fundo, topbar, menu de dois blocos, cartões, banner, botões, campos, tabelas, gráficos, símbolo, tema escuro |
| 5 | [05-componentes.md](05-componentes.md) | Especificação de cada componente: anatomia, variantes, medidas, estados, comportamento, acessibilidade |
| 6 | [06-layout-navegacao.md](06-layout-navegacao.md) | Shell, topbar, menu principal + painel "Mais do financeiro", botão "Abrir PDV", rotas, layout do PDV, responsivo, atalhos |
| 7 | [07-telas.md](07-telas.md) | Todas as telas, módulo por módulo: cabeçalho, ações, filtros, colunas, campos, modais e estados |
| 8 | [08-regras-implementacao.md](08-regras-implementacao.md) | Regras obrigatórias, mapeamento para React/Tailwind/shadcn, acessibilidade, checklist e critérios de aceite |
| 9 | [09-arquivos-anexos.md](09-arquivos-anexos.md) | O que é cada arquivo enviado junto (protótipo, CSS, JS, prints, mapas) e como usá-los |

Resumo de uma página só (mesmos valores): [`../DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md).

---

## Arquivos que acompanham este pacote

Envie junto, mantendo a estrutura de pastas:

```
design-handoff/          ← este pacote (leia primeiro)
DESIGN_SYSTEM.md         ← design system v3 em um arquivo (mesmos valores deste pacote)
MAPA_DE_TELAS.md         ← menu aprovado + catálogo dos 113 prints com a URL de cada estado
prototipo/               ← protótipo navegável (fonte visual executável)
  css/tokens.css         ← ÚNICA fonte de valores de cor/forma (bloco v3 no final vale por cima)
  css/app.css, components.css, screens.css, theme.css, v2.css, v3.css  ← nesta ordem
  js/ui.js               ← componentes (PageHeader, DataTable, Modal…)
  js/app.js              ← shell, menu, logo e símbolo decorativo (AvanteDeco)
  js/painel.js           ← Painel (a vitrine do estilo)
  js/screens/*.js        ← uma tela por módulo, com conteúdo exato
referencias/             ← 113 prints do sistema original (conteúdo e regras de negócio)
```

Detalhes de cada um em [09-arquivos-anexos.md](09-arquivos-anexos.md).

---

## Prompt sugerido para enviar à outra LLM

```text
Você vai implementar o design do Avante ERP (versão v3). Leia, nesta ordem, todos os
arquivos de design-handoff/ (README → 01 → 09). Depois use prototipo/ como referência
visual executável e referencias/ apenas para conferir conteúdo e regras de negócio.

Regras inegociáveis:
1. Use somente os tokens de design-handoff/03-tokens.md (ou prototipo/css/tokens.css,
   com o bloco v3 do final por cima). Nenhuma cor hexadecimal solta em componentes.
   Nenhum verde. Nenhum preto puro: o escuro da marca é o marinho #102760.
2. Reproduza o estilo de 04-estilos-visuais.md: estilo chapado (sem degradês), fundo
   com manchas azuis suaves, cartões brancos sem borda (raio 18px, sombra suave),
   botões e abas em pílula, menu lateral azul sólido com item ativo em pílula branca,
   painel secundário azul-claro, botão "Abrir PDV" em pílula marinho separado do menu,
   títulos e números em DM Sans, e o símbolo da Avante como arte decorativa.
3. Não invente campos, colunas, filtros nem dados. Telas sem dados mostram estado vazio.
4. Use os nomes de menu e títulos de 06-layout-navegacao.md e 07-telas.md.
5. Crie componentes reutilizáveis (05-componentes.md) e use-os em todas as telas.
6. Valide com o checklist de 08-regras-implementacao.md antes de entregar cada tela.

Stack: React + TypeScript + Tailwind CSS + shadcn/ui. Comece pelos tokens e fontes,
depois o shell (topbar + menu + painel secundário + botão PDV), depois os componentes
base, depois o Painel e as telas na ordem do menu.
```

---

## Como rodar o protótipo de referência

```bash
node prototipo/serve.js
# abra http://localhost:5173/prototipo/
```

Cada estado de tela tem URL própria (ex.: `#/catalogo/produtos?modal=produto&tab=estoque`). O painel "Mais do financeiro" abre com `?menu=financeiro`. A lista completa está no final de `MAPA_DE_TELAS.md` e em [07-telas.md](07-telas.md).
