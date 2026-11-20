# 04 · Estilos visuais

> Este arquivo descreve **como o design deve parecer e se comportar**. As referências enviadas pela empresa são dashboards "soft" (canvas claro, cartões flutuantes, pílulas pretas, cartões de destaque coloridos e escuros). **Copie o estilo, não as cores**: as cores são só as da logo (03-tokens.md).

## 1. Linguagem geral — "Soft dashboard"

| Característica | Como aplicar |
|---|---|
| **Canvas** | Toda a área atrás do conteúdo é `--background` (cinza frio `#F0F1F4`). A topbar tem a **mesma cor** do canvas e não tem borda. |
| **Superfícies flutuantes** | Cartões brancos **sem borda**, raio 18px e `--shadow-card`. Eles parecem "pousados" no canvas. |
| **Pílulas** | Botões, abas, segmentados, chips, itens de menu, badges e a busca global são **totalmente arredondados** (999px). |
| **Contraste preto × azul** | Navegação e seleção usam **preto (tinta)**: item ativo do menu, aba ativa, segmentado ativo, avatar. **Ação** usa **azul**: botão primário, links, foco. |
| **Destaques** | No máximo **1 cartão em gradiente azul** (`--gradient-brand`) e **1 cartão escuro** (`--gradient-ink`) por tela, com texto branco e números grandes. |
| **Números grandes** | KPIs com 28px/700, tabulares, com rótulo pequeno acima e meta abaixo. |
| **Respiro** | 18px entre blocos; cartões com padding de 16–20px. Tabelas continuam compactas (linha de 40px). |
| **Divisores** | Quase não existem. Separe por espaço e por superfície. Só tabelas têm linhas entre registros, e a barra de ferramentas da tabela tem uma linha embaixo. |

---

## 2. Topbar (64px)

- Fundo = canvas, sem borda nem sombra.
- Esquerda: botão do menu (ícone em círculo branco com sombra) e a logo.
- Centro: **busca global em pílula branca com sombra** (40px de altura, até 420px de largura), ícone de lupa, texto "Buscar telas e ações…" e `kbd` `Ctrl K` à direita.
- Direita: **"Criar"** (pílula azul com sombra azul), **"Assistente"** (pílula secundária, oculta em tablet), sino (círculo branco com sombra) e **usuário** (pílula branca com avatar preto circular de 32px, nome e chevron).

## 3. Menu lateral

- **Painel branco flutuante**: margem de 12px do canvas (esquerda e embaixo), raio 18px, `--shadow-card`, sem borda. Altura = viewport − 76px; fica fixo (sticky) e rola por dentro.
- **Topo**: seletor "Empresa ativa", um bloco em `--muted` com raio 14px, ícone de prédio azul dentro de um quadrado branco de 32px (raio 10px), rótulo "Empresa ativa" (11px, cinza), nome da empresa (13px/600) e chevron.
- **Itens principais**: pílulas de 38px, ícone de 17px + rótulo de 13,5px/500. Hover: `--accent`.
  - **Ativo** (rota sem filhos, ex.: Painel): **pílula preta** (`--sidebar-active`), texto e ícone brancos.
  - **Grupo que contém a rota ativa**: rótulo e ícone em **azul**.
- **Subitens**: recuo de 34px, pílulas de 32px, 13px. **Ativo**: pílula azul-clara (`--sidebar-sub-active`) com texto azul (600).
- **Separadores com título** dentro do Financeiro: "DIA A DIA", "BANCOS E MEIOS", "PATRIMÔNIO", "CADASTROS" (11px, maiúsculas, cinza).
- **Rodapé**: botão **"Abrir PDV"** com 46px de altura, raio 14px, **fundo `--gradient-brand`**, texto branco 600, ícone de monitor, `kbd` `Alt+1` com borda branca e `--shadow-brand`.
- **Recolhido** (desktop): 84px de largura, só ícones centralizados; clicar num grupo expande o menu.
- **Celular/tablet**: vira gaveta de 272px que desliza da esquerda, com fundo escurecido (scrim).

## 4. Cartões

| Tipo | Visual |
|---|---|
| **Padrão** | Branco, sem borda, raio 18px, `--shadow-card`. Cabeçalho sem linha divisória (16px 18px 6px): título 15px/650, ações à direita. Corpo com padding de 10px 18px 16px. |
| **Destaque azul** (`kpi-accent`) | Fundo `--gradient-brand`, texto branco, rótulos e meta a 85% de opacidade, `--shadow-brand`. Badges internos em branco a 16%. |
| **Destaque escuro** (`kpi-dark` / `kpi-highlight`) | Fundo `--gradient-ink`, texto branco. Usado em "Alertas de estoque" (Painel), "Saldo ao final" (Movimentações), "Dinheiro esperado" (PDV) e "Saldo ao final" (Análises). |
| **Tile** (atalhos, blocos internos) | Fundo `--muted`, sem sombra, raio 14–16px. Hover: fica branco, ganha borda `--border` e sombra. |
| **Boas-vindas / hero** (Painel) | Cartão padrão com avatar preto circular de 44px, linha pequena em cinza (saudação + empresa + período) e uma **frase grande** (20px/650) com o número de pendências **em azul e negrito**. Período e "Exportar resumo" à direita. |

## 5. Botões

| Variante | Visual | Uso |
|---|---|---|
| **Primário** | Pílula azul, texto branco 600, `--shadow-brand`; hover `--primary-hover`; ativo `--primary-active` | **Uma por tela**, no canto superior direito |
| **Outline** | Pílula branca, borda `--border`; hover `--accent` | Ações secundárias |
| **Secundário** | Pílula `--muted` sem borda | "Assistente", "Buscar" em filtros |
| **Ghost** | Transparente; hover `--accent` | Ações terciárias, "Personalizar", "Limpar filtros" |
| **Link** | Texto azul 500, sem altura fixa | Ações dentro de estados vazios |
| **Destrutivo** | Pílula `--destructive`, texto branco | Confirmar em modal destrutivo |
| **Destrutivo outline** | Pílula branca, borda vermelha a 30%, texto `--status-error-fg`; hover `--status-error` | "Arquivar", "Anular", "Estornar venda", "Registrar saída", "Remover" |
| **Ícone** | Círculo de 36px (30px pequeno) | Ações de linha, fechar modal |

Os botões podem ter ícone (15px) à esquerda e `kbd` à direita (ex.: "Nova venda F3").

## 6. Abas, segmentados e chips

- **Abas em pílula** (filtros de status, sub-abas de modal): trilho `--muted` com padding de 3px e raio 999px. Cada opção é uma pílula de 30px; a **ativa é preta** (`--ink`) com texto branco 600. Os contadores aparecem como mini-pílula dentro da aba.
- **Abas sublinhadas** (seções de página, ex.: "Extrato geral · A conciliar · Conciliados"): texto cinza; a ativa fica em tinta com **sublinhado preto de 2px**.
- **Segmentado** (período "Hoje · 7 dias · 30 dias · 90 dias", disponibilidade de estoque): igual às abas em pílula. Em campos de formulário, o segmentado ocupa a largura toda; a opção "Fora de estoque" ativa fica vermelho-clara.
- **Chips** (atalhos para telas relacionadas, filtros aplicados): pílula branca com sombra, 28px.

## 7. Campos de formulário

- Label **acima** (12px/500), asterisco vermelho nos obrigatórios e "(opcional)" em cinza nos opcionais.
- Input com 38px, raio 10px, borda `--input` e fundo branco. Foco: borda `--ring` + halo `0 0 0 3px hsl(var(--ring)/.15)`.
- Afixos dentro do campo: `R$` à esquerda (valores, alinhados à direita e tabulares), `%` à direita, lupa nas buscas.
- Ajuda abaixo do campo (11,5px, cinza); o erro ocupa o mesmo lugar em vermelho.
- Seções de formulário com título de 13,5px/600 e descrição de 12px, separadas por linha sutil; seções opcionais **recolhíveis** (`<details>`) com chevron.
- Grid de 12 colunas e gap de 12px; campos curtos ocupam 6 colunas. No celular, tudo ocupa as 12.
- Dropzone: borda tracejada `--input`, fundo `--muted` a 50%, raio 14px, ícone, texto e botão "Adicionar…".
- Switch (32×18) azul quando ligado; checkbox com `accent-color: primary`.

## 8. Tabelas

- Dentro de cartão (raio 18px, `overflow: hidden`).
- Barra de ferramentas no topo (abas de status em pílula + busca/ações), com uma linha `--border` embaixo.
- Cabeçalho **sem fundo**: 11px, 600, maiúsculas, cinza.
- Linha de 40px; hover `--accent` a 60%; padding lateral de 16px nas pontas.
- Texto à esquerda; **números, valores e datas à direita** e tabulares.
- Célula principal com duas linhas: nome (500) e subinformação (12px, cinza). Miniatura de 28px com ícone azul sobre `--primary-subtle`.
- Ações da linha à direita: botões pequenos ou ícones.
- Rodapé sem linha: "N registros" à esquerda e paginação "Anterior · Página 1 · Próxima" à direita.
- Estado vazio **dentro** da tabela: ícone num quadrado de 32px, título, texto e ação.

## 9. Modais

- Raio 22px, sem borda, `--shadow-modal`; overlay tinta a 35% com blur de 3px.
- Cabeçalho sem linha: título 18px/650, subtítulo cinza e botão fechar circular.
- Rodapé com linha superior: ações secundárias à esquerda e Cancelar + primário à direita.
- **Painel lateral** (formulários longos): entra pela direita, 680px, altura total, raio 22px só nos cantos esquerdos.
- **Confirmação destrutiva**: modal `sm`, texto explicando a consequência (com o nome do item em negrito), "Voltar" + botão vermelho com o verbo ("Arquivar", "Estornar venda").
- Fechar: X, clique no overlay ou `Esc`. O foco vai para o primeiro campo ao abrir.

## 10. Gráficos

- **Entradas, receita e saldo**: linha ou barra **azul** (`--primary`).
- **Saídas e período anterior**: tinta a 35–45% (linha tracejada).
- Grade horizontal `--border`; eixos de 10,5px cinza, tabulares; valores em `R$`.
- Barras de proporção ("Entradas e saídas por área", "Saldos por conta"): trilho de 8px `--muted` em pílula, preenchimento `--gradient-brand`.
- Gráfico sem dados: bloco `--muted` a 60%, raio 14px, 120px de altura, texto "Nenhum valor neste conjunto."
- Legenda: quadradinho de 8px + rótulo de 12px.

## 11. Badges de status

Pílula de 22px, 12px/600, fundo suave + texto escuro do mesmo tom (tabela em 03-tokens.md). **Nunca** use só a cor: o texto do status sempre aparece. Ícone opcional de 12px.

## 12. Estados obrigatórios em toda tela

| Estado | Visual |
|---|---|
| Carregando | Skeleton no formato final (blocos `--muted` com brilho), nunca spinner em tela cheia |
| Vazio | Ícone num quadrado de 32px (`--muted`, raio 10px), título de 13px/600, texto curto e ação sugerida (botão azul pequeno ou link) |
| Vazio por filtro | "Nenhum resultado neste filtro" + "Limpar filtros" |
| Erro | Mensagem + "Tentar novamente"; erro de campo inline em vermelho |
| Aviso | Faixa `--status-warning` com raio 12px, ícone de alerta e ação à direita (ex.: "Nenhuma conta bancária ativa. Cadastrar conta") |
| Alterações não salvas | Faixa âmbar dentro do modal: "Há alterações não salvas." + "Continuar editando" + "Descartar e fechar" (vermelho outline) |
| Foco | Contorno de 2px `--ring` com afastamento de 1px em todo elemento interativo |

## 13. Iconografia

- Estilo **Lucide** (traço de 2px, cantos e terminações arredondados, viewBox 24). Na implementação React, use `lucide-react`.
- Tamanhos: 13–15px em botões e textos, 16–17px no menu e em KPIs, 18px na topbar.
- Os ícones herdam a cor do texto. No menu ficam em cinza; no item ativo, brancos.
- Ícone em caixa (`sc-icon`): 32px, raio 10px, fundo branco (dentro de tile) ou `--primary-subtle`, ícone azul.

## 14. Tema escuro

Mesma estrutura com tokens `.dark`: canvas quase preto, cartões grafite **com borda de 1px**, azul mais claro (`#388CFA`) e **pílula ativa invertida** (clara com texto escuro). Os gradientes continuam; o cartão escuro usa grafite (`#20242C`) para se separar do fundo.
