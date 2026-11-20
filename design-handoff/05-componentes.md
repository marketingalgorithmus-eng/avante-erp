# 05 · Componentes

> Implementação de referência: `prototipo/js/ui.js` (funções que retornam HTML) + `prototipo/css/components.css` e `theme.css`. Em React, crie um componente para cada item abaixo e **use-o em todas as telas**: nenhuma tela pode ter estilo próprio para estes elementos.

## Índice
1. AppShell · 2. Topbar · 3. Sidebar · 4. PageHeader · 5. Button · 6. Badge · 7. Tabs / Segmented · 8. Card · 9. KpiCard · 10. FilterBar · 11. DataTable · 12. EmptyState · 13. Field · 14. FormSection · 15. Modal / Sheet / Confirm · 16. DescriptionList · 17. Charts · 18. CommandPalette · 19. Dropdown menu · 20. Skeleton · 21. Banner / Info · 22. UnsavedBar · 23. Logo

---

### 1. AppShell
- Grid `268px | 1fr` (84px recolhido). Topbar sticky em cima, menu sticky à esquerda, `main` rolando.
- Três layouts: **app** (topbar + menu), **pdv** (topbar própria do PDV, sem menu lateral) e **bare** (login e telas de transição, tela cheia).
- O layout vem da rota (ver 06-layout-navegacao.md).

### 2. Topbar
| Parte | Especificação |
|---|---|
| Botão menu | Ícone em círculo branco de 38px com sombra. Desktop: recolhe o menu. Celular: abre a gaveta |
| Logo | Componente Logo com sufixo "ERP" e link para `/painel` |
| Busca global | Pílula branca de 40px com sombra; abre a CommandPalette; `Ctrl K` |
| Criar | Botão primário com `+` que abre um Dropdown com 8 ações (ver 06) |
| Assistente | Botão secundário com ícone de balão (oculto < 1024px) |
| Notificações | Botão ícone circular branco |
| Usuário | Pílula branca: avatar preto de 32px + nome + chevron; menu com perfil, "Alternar tema escuro", "Configurações", "Ver boas-vindas" e "Sair" |

### 3. Sidebar
- Props: `items[]` (`{label, icon, route}` ou `{label, icon, children[]}`; os filhos podem ser `{section: "Título"}`), `activeRoute`, `collapsed`.
- Grupos em acordeão; mais de um pode ficar aberto; o grupo da rota ativa abre sozinho.
- Seletor de empresa no topo e "Abrir PDV" no rodapé (ver 04 §3).
- Acessibilidade: `<nav aria-label="Menu principal">`, `aria-expanded` nos grupos, `aria-current="page"` no item ativo.

### 4. PageHeader
- Anatomia: breadcrumbs (12px, cinza, separados por chevron) → **título h1** (26px/700) com badge opcional → subtítulo (13px, cinza). Ações à direita, alinhadas pela base.
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
- `Tabs variant="pills"`: trilho cinza, ativo preto (filtros de status, sub-abas de modal, áreas de relatórios). Item: `{id, label, icon?, count?}`.
- `Tabs variant="underline"`: seções de página (Conciliação, Configurações, Análises, Fichas técnicas × Insumos).
- `Segmented`: escolha única dentro de formulário ou de período. `role="group"`, botões com `aria-pressed`.
- O estado da aba fica **na URL** (`?tab=` ou `?status=`), para que todo estado seja linkável.

### 8. Card
- Props: `title?`, `icon?`, `actions?[]`, `children`, `footer?`, `flush?` (corpo sem padding).
- Variações de superfície: `default`, `tile`, `accent` (gradiente azul) e `dark` (gradiente tinta). Ver 04 §4.

### 9. KpiCard
- Anatomia: rótulo (13px, cinza) + ícone à direita → **valor** (28px/700, tabular) → meta (12px; partes em negrito) **ou** "split" (duas colunas separadas por linha tracejada, ex.: Vencidos | Parcelas).
- Props: `label`, `value`, `raw` (valor numérico para saber se é zero), `tone` (`default | accent | dark | success | error`), `help?` (ícone "?" com title), `href?` (o cartão inteiro vira link), `meta?`.
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
- `BarChart` diário (Painel): pares de barras entradas/saídas.
- `BarList(rows)`: rótulo + valor à direita + trilho em pílula com preenchimento em gradiente.
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
- Props: `suffix` (`"ERP" | "PDV"`). Ver 02-identidade-marca.md. `role="img"` e `aria-label="Avante ERP"`.

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
