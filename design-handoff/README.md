# Avante ERP — Pacote de Design para Implementação

> **Para a LLM que vai implementar:** este pacote descreve, de forma completa e sem ambiguidade, o design system e as telas do **Avante ERP** (ERP + PDV na nuvem da Algorithmus). Leia todos os arquivos na ordem abaixo **antes** de escrever qualquer código. Quando um detalhe não estiver aqui, consulte o protótipo de referência (`prototipo/`), que é a fonte visual executável. Nunca invente cores, campos, colunas ou dados.

---

## O que é este pacote

| Item | Valor |
|---|---|
| **Produto** | Avante ERP — sistema de gestão (ERP) com frente de caixa (PDV) integrada |
| **Empresa** | Algorithmus |
| **Tipo de design** | Design system de **aplicação SaaS B2B / dashboard operacional** (back-office + ponto de venda), *light-first* com tema escuro |
| **Estilo** | "Soft dashboard": canvas cinza-claro, cartões brancos sem borda e cantos grandes, botões em pílula, destaques em gradiente azul e cartão preto. Densidade de ERP nas tabelas |
| **Paleta** | Somente as cores da logo: **Azul Avante `#0A5EDB`**, **Tinta (preto) `#12151C`**, **Branco**. **Sem verde em nenhum lugar** |
| **Idioma da interface** | Português do Brasil (pt-BR), moeda BRL, datas `dd/mm/aaaa` |
| **Stack-alvo recomendada** | React + Tailwind CSS + shadcn/ui (tokens em CSS variables HSL). O protótipo de referência é HTML/CSS/JS puro |
| **Escopo** | 41 rotas, 113 estados de tela (cada print do sistema original virou um estado navegável) |
| **Versão do design** | 20/11/2026 — commit `5e02675` em github.com/marketingalgorithmus-eng/avante-erp |

---

## Ordem de leitura

| # | Arquivo | Conteúdo |
|---|---|---|
| 1 | [01-visao-geral.md](01-visao-geral.md) | Nome, tipo de design, a ideia a ser transmitida, público, princípios e decisões de produto |
| 2 | [02-identidade-marca.md](02-identidade-marca.md) | Logo (construção e uso), paleta da marca, regras de cor, o que é proibido |
| 3 | [03-tokens.md](03-tokens.md) | Todos os tokens: cores (claro e escuro, HSL e HEX), tipografia, espaçamento, raios, sombras, gradientes, z-index, breakpoints |
| 4 | [04-estilos-visuais.md](04-estilos-visuais.md) | O estilo em detalhe: superfícies, cartões, pílulas, destaques, gráficos, estados, movimento, tema escuro |
| 5 | [05-componentes.md](05-componentes.md) | Especificação de cada componente: anatomia, variantes, medidas, estados, comportamento, acessibilidade |
| 6 | [06-layout-navegacao.md](06-layout-navegacao.md) | Shell da aplicação, topbar, menu lateral completo, rotas, layout do PDV, responsivo, atalhos de teclado |
| 7 | [07-telas.md](07-telas.md) | Todas as telas, módulo por módulo: cabeçalho, ações, filtros, colunas, campos, modais e estados |
| 8 | [08-regras-implementacao.md](08-regras-implementacao.md) | Regras obrigatórias, mapeamento para React/Tailwind/shadcn, acessibilidade, checklist e critérios de aceite |
| 9 | [09-arquivos-anexos.md](09-arquivos-anexos.md) | O que é cada arquivo enviado junto (protótipo, CSS, JS, prints, mapas) e como usá-los |

---

## Arquivos que acompanham este pacote

Envie junto, mantendo a estrutura de pastas:

```
design-handoff/          ← este pacote (leia primeiro)
DESIGN.md                ← design system resumido (seções 0 e 0.1 são as vigentes)
MAPA_DE_TELAS.md         ← menu aprovado + catálogo dos 113 prints com a URL de cada estado
prototipo/               ← protótipo navegável (fonte visual executável)
  css/tokens.css         ← ÚNICA fonte de valores de cor/forma
  css/app.css, components.css, screens.css, theme.css
  js/ui.js               ← componentes (PageHeader, DataTable, Modal…)
  js/screens/*.js        ← uma tela por módulo, com conteúdo exato
referencias/             ← 113 prints do sistema original (conteúdo e regras de negócio)
```

Detalhes de cada um em [09-arquivos-anexos.md](09-arquivos-anexos.md).

---

## Prompt sugerido para enviar à outra LLM

```text
Você vai implementar o design do Avante ERP. Leia, nesta ordem, todos os arquivos de
design-handoff/ (README → 01 → 09). Depois use prototipo/ como referência visual
executável e referencias/ apenas para conferir conteúdo e regras de negócio.

Regras inegociáveis:
1. Use somente os tokens de design-handoff/03-tokens.md (ou prototipo/css/tokens.css).
   Nenhuma cor hexadecimal solta no código de componentes. Nenhum verde.
2. Reproduza o estilo descrito em 04-estilos-visuais.md: canvas cinza-claro, cartões
   brancos sem borda (raio 18px, sombra suave), botões e abas em pílula, item ativo do
   menu em pílula preta, no máximo 1 cartão em gradiente azul e 1 cartão escuro por tela.
3. Não invente campos, colunas, filtros nem dados. Telas sem dados mostram estado vazio.
4. Use os nomes de menu e títulos de 06-layout-navegacao.md e 07-telas.md.
5. Crie componentes reutilizáveis (05-componentes.md) e use-os em todas as telas.
6. Valide com o checklist de 08-regras-implementacao.md antes de entregar cada tela.

Stack: React + TypeScript + Tailwind CSS + shadcn/ui. Comece pelos tokens, depois o
shell (topbar + menu), depois os componentes base, depois as telas na ordem do menu.
```

---

## Como rodar o protótipo de referência

```bash
node prototipo/serve.js
# abra http://localhost:5173/prototipo/
```

Cada estado de tela tem URL própria (ex.: `#/catalogo/produtos?modal=produto&tab=estoque`). A lista completa está no final de `MAPA_DE_TELAS.md` e em [07-telas.md](07-telas.md).
