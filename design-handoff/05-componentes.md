# 05 · Componentes (v3)

> Implementação de referência: `prototipo/js/ui.js` (funções que retornam HTML) + `prototipo/css/components.css`, `theme.css`, `v2.css` e `v3.css` (os dois últimos têm a camada visual atual). Em React, crie um componente para cada item abaixo e **use-o em todas as telas**: nenhuma tela pode ter estilo próprio para estes elementos.

## Índice
1. AppShell · 2. Topbar · 3. Sidebar (+ Flyout e PdvLaunch) · 4. PageHeader · 5. Button · 6. Badge · 7. Tabs / Segmented · 8. Card · 9. KpiCard · 10. FilterBar · 11. DataTable · 12. EmptyState · 13. Field · 14. FormSection · 15. Modal / Sheet / Confirm · 16. DescriptionList · 17. Charts · 18. CommandPalette · 19. Dropdown menu · 20. Skeleton · 21. Banner / Info · 22. UnsavedBar · 23. Logo · 24. AvanteDeco · 25. HeroBanner · 26. BigCard · 27. FinancialCalendar · 28. FocusList e ActivityList · 29. MoneyBlock

---

### 1. AppShell
- Grid `268px | 1fr` (84px recolhido). Topbar sticky em cima, menu sticky à esquerda (a 12px das bordas), `main` rolando. O `body` usa o fundo de manchas `--canvas-art`.
- Três layouts: **app** (topbar + menu), **pdv** (topbar própria do PDV, sem menu lateral) e **bare** (login e telas de transição, tela cheia).
- O layout vem da rota (ver 06-layout-navegacao.md).

### 2. Topbar
| Parte | Especificação |
|---|---|
| Botão menu | Ícone em círculo branco de 38px com sombra. Desktop: recolhe o menu. Celular: abre a gaveta |
| Logo | Componente Logo com sufixo "ERP" e link para `/painel` (peça de apoio e "ERP" brancos com realce leve; ver 02 §1) |
| Busca global | Pílula branca de 40px com sombra; abre a CommandPalette; `Ctrl K` |
| Criar | Botão primário com `+` que abre um Dropdown com 8 ações (ver 06) |
| Assistente | Botão secundário com ícone de balão (oculto < 1024px) |
| Notificações | Botão ícone circular branco |
| Usuário | Pílula branca: avatar **marinho** de 32px + nome + chevron; menu com perfil, "Alternar tema escuro", "Configurações", "Ver boas-vindas" e "Sair" |

### 3. Sidebar
- Props: `items[]` (`{label, icon, route}` ou `{label, icon, children[]}`; os filhos podem ser `{section: "Título"}`), `activeRoute`, `collapsed`.
- Grupos em acordeão; mais de um pode ficar aberto; o grupo da rota ativa abre sozinho.
- Dois blocos: **painel azul sólido** (seletor de empresa, itens e o símbolo em linhas no canto inferior direito) e, 12px abaixo, o **bloco do PDV** (`PdvLaunch`). Medidas e cores em 04 §3.
- Item ativo: **pílula branca com texto azul**; subitem ativo: branco a 18% com texto branco.
- Grupo com itens `more: true` (Financeiro): os itens de uso diário ficam no menu; os demais aparecem no **Flyout** aberto pelo subitem "Mais do financeiro" (borda tracejada).

**Flyout** (painel secundário): props `groupId`, `title`, `sections[]`. 272px, à direita do menu, fundo `#F0F6FF`, link ativo azul sólido com texto branco. Abre pelo botão "Mais do financeiro" ou por `?menu=financeiro`; fecha com X, clique fora, `Esc` e ao navegar. `role="dialog"`/`aria-label`, botão com `aria-expanded`.

**PdvLaunch**: pílula de 52px marinho sólido, ícone de monitor 19px + "Abrir PDV" (DM Sans 15px/700) + seta à direita; hover azul e seta desliza 3px. Recolhido: só o ícone, centralizado.
- Acessibilidade: `<nav aria-label="Menu principal">`, `aria-expanded` nos grupos, `aria-current="page"` no item ativo.

### 4. PageHeader
- Anatomia: breadcrumbs (12px, cinza, separados por chevron) → **título h1** (DM Sans 28px/800, −0.03em) com badge opcional → subtítulo (13px, cinza). Ações à direita, alinhadas pela base.
- Regra: no máximo **1 botão primário**, sempre o último à direita. O restante é outline.

### 5. Button
- Props: `variant` (`primary | outline | secondary | ghost | link | destructive | danger-outline`), `size` (`sm 30 | md 36 | lg 44`), `icon`, `kbd`, `href`, `disabled`, `iconOnly` (+ `aria-label` obrigatório).
- Sempre pílula. Disabled: opacidade de 50%, sem eventos.

### 6. Badge
- Props: `tone` (`success | warning | error | pending | invoiced | cancelled`), `icon?`, `children`.
- Mapeamento de status → tom:

| Status no sistema | Tom |
|---|---|
| Ativo, Ativa, Aberto, Concluída, Pago, Quitado, Em estoque, Registrado, Receita, Prazo indeterminado | `success` (azul) |
| Atenção, Estoque baixo | `warning` |
| Vencido, Estornada, Fora de estoque | `error` |
| Pendente, Em contagem, Em aberto | `pending` |
| Faturado, perfil de usuário ("Proprietário da empresa") | `invoiced` |
| Rascunho, Cancelado, Arquivado, módulos | `cancelled` |

### 7. Tabs / Segmented
- `Tabs variant="pills"`: trilho `--muted`, ativo **marinho** com texto branco (filtros de status, sub-abas de modal, áreas de relatórios). Item: `{id, label, icon?, count?}`.
- `Tabs variant="underline"`: seções de página (Conciliação, Configurações, Análises, Fichas técnicas × Insumos).
- `Segmented`: escolha única dentro de formulário ou de período. `role="group"`, botões com `aria-pressed`.
- O estado da aba fica **na URL** (`?tab=` ou `?status=`), para que todo estado seja linkável.

### 8. Card
- Props: `title?`, `icon?`, `actions?[]`, `children`, `footer?`, `flush?` (corpo sem padding).
- Variações de superfície: `default` (branco), `tile` (com borda, raio 16px), `accent` (**azul sólido** + símbolo em linhas), `dark` (**marinho sólido**), `soft-sky` e `soft-indigo`. Ver 04 §4. Nenhuma usa degradê.

### 9. KpiCard
- Anatomia: rótulo (13px, cinza) + ícone à direita → **valor** (DM Sans 28px/700, tabular) → meta (12px; partes em negrito) **ou** "split" (duas colunas separadas por linha tracejada, ex.: Vencidos | Parcelas).
- Props: `label`, `value`, `raw` (valor numérico para saber se é zero), `tone` (`default | accent | dark | soft-sky | soft-indigo | success | error`), `help?` (ícone "?" com title), `href?` (o cartão inteiro vira link), `meta?`.
- **Valor zero fica em cinza** (`--muted-foreground`), exceto nos tons accent e dark.
- O grid de KPIs ocupa 4 colunas (2 em telas médias e 1 no celular).

### 10. FilterBar
- Cartão com uma linha flexível: busca (cresce, mínimo 200px) + selects compactos (label de 12px acima, 150–200px) + botão "Filtrar/Buscar" (secundário) + "Limpar filtros" (ghost, só aparece com filtro ativo).
- Opcional: seção recolhível "Mais filtros: categoria, centro e conta" e uma nota de rodapé em cinza.
- Variante "dentro da tabela": abre com o botão "Buscar e filtrar" na barra da tabela (`?busca=1`).

### 11. DataTable
- Props: `columns[]` (`{label, key | render, align: left|right|center, num, width}`), `rows[]`, `selectable`, `actions(row)`, `toolbar` (nó), `empty` (props de EmptyState), `countLabel`, `footer=false`.
- Comportamento: cabeçalho fixo ao rolar, hover de linha, checkbox de seleção (cabeçalho seleciona todos), ações à direita (`white-space: nowrap`), paginação no rodapé e rolagem horizontal **dentro** do cartão no celular.
- Colunas de dinheiro, quantidade e data: `align: right`, `num: true`.

### 12. EmptyState
- Props: `icon`, `title`, `text?`, `actions?[]`, `center` (padrão: centralizado), `compact`.
- O texto explica **o que vai aparecer ali** e a ação leva a criar o primeiro item.
- Exemplo: ícone de banco · "Nenhuma movimentação neste filtro" · "Entradas e saídas registradas aqui ou pelo PDV aparecem no extrato." · [Registrar entrada].

### 13. Field
- Tipos: `text, email, tel, number, date, select, textarea, money (R$ à esquerda, alinhado à direita), percent (% à direita), search (lupa), checkbox, switch, file (dropzone), static (só leitura)`.
- Props: `label`, `required` (asterisco), `optional` ("(opcional)"), `help`, `error`, `placeholder`, `value`, `span` (1–12, padrão 12), `num`, `align`.
- `<label for>` ligado ao `id`; o erro substitui a ajuda e usa `aria-describedby`.

### 14. FormSection
- Props: `title?`, `desc?`, `fields[]`, `collapsible?`, `open?`, `aside?`.
- Grid de 12 colunas e gap de 12px; seções separadas por linha `--border`; recolhível com `<details>/<summary>` e chevron que gira.

### 15. Modal / Sheet / Confirm
- Props: `title`, `sub?`, `size` (`sm | md | lg | xl | sheet`), `tabs?`, `body`, `footLeft?`, `right?` (substitui os botões padrão), `primary?`, `primaryKbd?`, `cancel?`, `danger?`, `closeHref`.
- O modal abre por estado na URL (`?modal=novo`), então fechar = remover o parâmetro. Fecha com `Esc`, com clique no overlay e com o X. Foco inicial no primeiro campo. `role="dialog" aria-modal="true" aria-labelledby`.
- **Confirm**: `title` em forma de pergunta ("Arquivar cliente?"), texto com a consequência, "Voltar" + botão destrutivo com o verbo da ação. **Toda ação destrutiva passa pelo Confirm.**
- **ItemModal** (cadastro de produto, serviço e insumo, tamanho xl): coluna esquerda de 220px com "Imagens" (área quadrada + dropzone) e coluna direita com resumo ("Novo produto · SKU ainda não informado"), abas em pílula e o conteúdo da aba.

### 16. DescriptionList
- Grid automático (mínimo 180px por coluna): `dt` 12px cinza e `dd` 13,5px/500. Usado em fichas (fornecedor, contrato, orçamento).

### 17. Charts
- `LineChart({labels, series:[{name, cls, values}]})`: SVG de 640×200, 4 linhas de grade, eixo Y em R$ e eixo X com 3 rótulos (início, meio e fim).
- `BarChart` diário (Painel): pares de barras, entradas em azul e saídas em índigo a 70%.
- `BarList(rows)`: rótulo + valor à direita + trilho em pílula com preenchimento **azul sólido**.
- `ChartEmpty`: bloco cinza "Nenhum valor neste conjunto."
- Biblioteca sugerida em React: Recharts, com as cores vindas dos tokens.

### 18. CommandPalette (`Ctrl K`)
- Modal de 560px no topo (12vh), input de 44px, lista de até 360px.
- Itens: as 8 ações de criação ("Ação") + todas as telas do menu (com o grupo como dica). Busca sem acento e sem diferenciar maiúsculas.
- Teclado: ↑ ↓ navegam, `Enter` abre, `Esc` fecha. O item selecionado fica em `--primary-subtle`.

### 19. Dropdown menu
- Pop de 240px no mínimo, raio 14px, `--shadow-pop`, itens de 32px com raio 10px, ícone e `kbd` opcional. Separadores e rótulos de seção (11px, maiúsculas).

### 20. Skeleton
- Blocos `--muted` no formato do conteúdo, com brilho em loop de 1,2s. No Painel aparece por cerca de 280ms na primeira carga.

### 21. Banner / Info
- `Banner` (aviso de página): faixa âmbar com borda esquerda de 3px, ícone, texto (título em negrito + explicação) e ação outline à direita.
- `Info` (dica dentro de formulário/modal): faixa `--primary-subtle` com texto azul, raio 12px, ícone. Variantes `is-success` (azul) e `is-warning` (âmbar).

### 22. UnsavedBar
- Faixa âmbar dentro do modal: "**Há alterações não salvas.** Deseja descartá-las?" + "Continuar editando" (outline) + "Descartar e fechar" (destrutivo outline). Aparece ao clicar em "Cancelar" ou fechar com dados preenchidos.

### 23. Logo
- Props: `suffix` (`"ERP" | "PDV"`), `variant` (`topbar | onBlue | mark`). Ver 02-identidade-marca.md. `role="img"` e `aria-label="Avante ERP"`.

### 24. AvanteDeco
- Props: `variant` (`fill | line`), `className` (posição). SVG `viewBox="-1 -1 42 34"` com os 2 paths da logo; `fill="currentColor"` ou contorno de 1,5px com `vector-effect="non-scaling-stroke"`. Sempre `aria-hidden` e `pointer-events: none`. Posições e cores em 04 §12.

### 25. HeroBanner
- Só no Painel. Cartão azul sólido com 2 `AvanteDeco`, avatar branco 48px, linha de contexto, frase DM Sans 24px/700 com o número em `--primary-tint`, segmentado de período (trilho `--primary-active`, ativo branco) e botão branco "Exportar resumo". Ver 04 §5.

### 26. BigCard
- Cartão branco `padding: 22px 24px` com cabeçalho: título DM Sans 21px/700 + subtítulo 12px; à direita, ações, navegação ou contador (40×40, raio 14px, azul sólido, branco 18px/700). Usado em: Calendário financeiro, O que precisa da sua atenção, Últimas ações, Entradas e saídas.

### 27. FinancialCalendar
- Cabeçalho: selo de 46px (raio 14px, azul sólido, ícone de calendário branco 18px) + "Calendário financeiro" / "Vencimentos e movimentos de caixa"; navegação com 2 botões-ícone brancos e o mês em DM Sans 15px/700 ("Novembro de 2026").
- Grade de 7 colunas (Dom…Sáb, 12px/600 muted), `gap: 8px`; célula de 48px, raio 12px, borda `--border`, número 15px/600. Hover: borda azul a 45% e fundo `--primary-subtle` a 60%.
- Dia com movimento (ponto de 6px): mais entradas `#E7F0FE`/`#0D48A0`; mais saídas `#ECEDFE`/`#3F49D5`; valores iguais `#E6F5FE`/`#098BE1`. **Hoje**: anel `0 0 0 2px` azul. **Selecionado**: azul sólido, texto branco, `--shadow-brand`.
- Ao clicar num dia: faixa de detalhe (branca, borda, raio 14px) com a data, "Entradas R$ …", "Saídas R$ …" e [Ver movimentações →]. Legenda: Mais entradas · Mais saídas · Valores iguais · Hoje.
- Cada célula é um `button` com `aria-label` ("20 de Novembro: entradas R$ 1.000,00, saídas R$ 0,00").

### 28. FocusList e ActivityList
- **FocusList** ("O que precisa da sua atenção"): linhas `padding: 14px 16px`, `gap: 14px`, raio 16px, brancas com borda; ícone de 44px (raio 14px) âmbar (`--status-warning`) para alerta ou azul (`--primary-subtle`) para informação; título 15px/650 + texto 13px muted; ação em botão pequeno (primário para alerta, outline para informação) com chevron. Abaixo, pílulas "ok" de 32px (`#E7F0FE`, texto `#0D48A0`, ícone de check): "Nada vence hoje", "Estoque acima do mínimo".
- **ActivityList** ("Últimas ações"): linhas `padding: 12px`, raio 14px, ícone de 38px (raio 12px) índigo sobre `#ECEDFE`, título 600 + referência e data 12px muted, chevron; hover `--accent`.

### 29. MoneyBlock
- BigCard "Entradas e saídas" com legenda (Entradas azul · Saídas índigo): à esquerda o `BarChart` diário; à direita 4 `money-stat` (raio 14px, borda, `padding: 12px 16px`, rótulo 13px muted + valor DM Sans 17px/700): Entradas, Saídas, **Saldo ao final** (azul sólido, texto branco, valor 20px, `--shadow-brand`) e Resultado operacional; botões [Ver movimentações] e [ghost Mais gráficos].

---

## Componentes específicos de tela (reutilizados entre módulos)

| Componente | Onde | Descrição |
|---|---|---|
| `SalesPage` | Vendas (ERP) e Vendas do PDV | Faixa de resumo (período + 4 números) + 3 atalhos de relatório + tabela com abas Todas/Registradas/Estornadas e busca |
| `ClientsPage` | Clientes (ERP) e Clientes do PDV | Lista com abas Ativos/Arquivados, busca por CPF/CNPJ, editar e arquivar |
| `ClientForm` | Novo/editar cliente | Nome, CPF/CNPJ, Telefone, E-mail, País, Cidade, Endereço |
| `ItemModal` | Produto, serviço, insumo | Ver §15 e 07-telas.md |
| `TitlesPage` | Contas a pagar e Contas a receber | Filtros, 4 KPIs, cartão de principal, tabela, formulário em painel lateral |
| `CompanyChip` | Formulários financeiros | Chip "Empresa · João Pertile" no topo do formulário |
| `PrazoCards`, `AreaCard` | Resumo financeiro e Fluxo de caixa | Prazos a receber/a pagar e entradas e saídas por área |
| `WelcomeModal` | Painel | "Hoje na sua empresa": cartões A receber / A pagar (Hoje, Em atraso) |
