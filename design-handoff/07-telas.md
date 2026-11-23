# 07 · Telas

> Para cada tela: **rota**, **cabeçalho e ações**, **conteúdo** (filtros, KPIs, colunas, campos), **modais** e **dados do print** (reproduza exatamente; não invente). A implementação de referência de cada tela está em `prototipo/js/screens/<módulo>.js`, e a URL de cada estado está em `MAPA_DE_TELAS.md` (seção 4).
>
> Convenções: **[P]** = botão primário (azul, único). **[O]** = outline. **[D]** = destrutivo (sempre com modal de confirmação). Colunas marcadas com **→** ficam alinhadas à direita e tabulares.

---

## A. Acesso

### A1. Login — `/login` (layout bare)
- Duas colunas. **Esquerda:** painel **azul sólido** com a logo toda branca, dois símbolos da Avante (preenchido no canto inferior direito, em linhas no superior esquerdo), a frase em DM Sans 26px/700 a frase "ERP e PDV na nuvem para vender, controlar o estoque e acompanhar o financeiro no mesmo lugar." e 3 itens translúcidos ("Venda registrada no PDV", "Estoque atualizado", "Entradas e saídas no financeiro"). **Direita:** formulário de 400px.
- Formulário: ícone de cadeado em caixa · título "Entre na sua conta" (DM Sans) · E-mail ou usuário* · Senha* (com link "Esqueci minha senha" na mesma linha do label) · checkbox "Manter conectado neste aparelho" (ajuda: "Use esta opção só em um aparelho de confiança.") · caixa de verificação de segurança · **[P] Entrar →** (largura total, 44px) · info "Problemas com seu acesso? Peça ao responsável pela empresa para conferir seu cadastro."
- Celular: só o formulário.

### A2. Transições — `/transicao/pdv` e `/transicao/erp`
- Tela cheia com o fundo de manchas azuis e o símbolo da Avante em linhas, grande, a 10%, cortado no canto inferior direito. No centro: símbolo da logo num quadrado branco de 64px (raio 20px, `--shadow-pop`) · "Avante PDV" ou "Avante ERP" (16px/600) · "Abrindo o ponto de venda" ou "Carregando seu espaço" · barra de progresso de 72px animada em azul. Redireciona em ~900ms.

### A3. Boas-vindas — modal no Painel (`/painel?modal=boas-vindas`)
- "Hoje na sua empresa", subtítulo "João Pertile". Dois cartões lado a lado: **A receber** (fundo azul-claro) e **A pagar** (fundo vermelho-claro), cada um com R$ 0,00 grande e as linhas Hoje / Em atraso. Rodapé: "Resumo exibido ao entrar no sistema." + **[P] Continuar**.

---

## B. Painel — `/painel`

Página com `gap: 22px`. Ordem dos blocos (exatamente esta):

1. **Banner azul** (`HeroBanner`, azul sólido com 2 símbolos da Avante): avatar **branco** "R" (inicial azul) · linha "Olá, Responsável · João Pertile · 22/10/2026 — 20/11/2026 · atualizado às 10:31" · frase em DM Sans 24px **"Você tem 2 pendências hoje: nenhuma conta bancária ativa e o Orçamento #2 em aberto."** ("2 pendências" em azul-claro `#B8D4FF`) · à direita, segmentado Hoje / 7 dias / **30 dias** (ativo) / 90 dias (trilho azul-escuro, ativo branco) e botão branco "Exportar resumo" com ícone de download.
2. **Atalhos rápidos** (cartão): título + "Use `Alt` + número" + [ghost pequeno] Personalizar. Grid de 8 tiles (8 colunas ≥ 1360px, 4 abaixo, 2 no celular): **Abrir PDV** (tile **azul sólido**, texto branco), Nova venda, Novo orçamento, Conta a pagar, Conta a receber, Registrar despesa, Novo cliente, Novo produto. Cada tile: ícone em caixa de 32px, rótulo e `Alt+n`.
3. **Indicadores principais** ("Últimos 30 dias"), 4 KPIs (cada cartão é um link):
   - **Vendas** — **azul sólido** com símbolo em linhas: R$ 0,00 · "**0** vendas · Ticket médio **R$ 0,00**" → `/vendas`.
   - **Contas a receber · hoje e 7 dias** — fundo céu-claro, ícone de entrada: R$ 0,00 · split Vencidos R$ 0,00 | Parcelas 0 → `/financeiro/contas-a-receber`.
   - **Contas a pagar · hoje e 7 dias** — fundo índigo-claro, ícone de saída: idem → `/financeiro/contas-a-pagar`.
   - **Alertas de estoque** — **marinho sólido**: "0 itens abaixo do mínimo" · "**1** item ativo · **20** unidades em estoque" → `/catalogo/produtos`.
4. **Calendário financeiro** (`FinancialCalendar`, cartão grande): selo azul + "Calendário financeiro" / "Vencimentos e movimentos de caixa"; navegação "Novembro de 2026"; grade Dom–Sáb. **20/11/2026 é "hoje"** (anel azul) e tem movimento: **mais entradas** (azul-claro, entradas R$ 1.000,00, saídas R$ 0,00). Clicar num dia mostra a faixa de detalhe com [Ver movimentações →]. Legenda: Mais entradas · Mais saídas · Valores iguais · Hoje.
5. **Atenção e atividade** (2 cartões grandes lado a lado; empilham < 1100px):
   - **O que precisa da sua atenção** — "2 itens pedem ação hoje" + contador azul "2". Linhas: (âmbar, banco) **Nenhuma conta bancária ativa** · "Cadastre uma conta para registrar recebimentos e usar a conciliação bancária." · **[P] Cadastrar conta ›** (`/financeiro/contas-bancarias?modal=nova`); (azul, documento) **Orçamento #2 em aberto** · "Salvo em 18/11/2026, 21:39. Envie ao cliente ou converta em venda." · [O] Abrir › (`/vendas/orcamentos?modal=ver&id=2`). Abaixo, pílulas ok: "✓ Nada vence hoje" e "✓ Estoque acima do mínimo". Sem pendências: estado vazio "Nenhuma pendência hoje." e subtítulo "Tudo em dia por aqui".
   - **Últimas ações** — "O que foi feito no sistema". Linhas: "Cadastro atualizado · Produto #2 · 18/11/2026, 21:57"; "Orçamento salvo · Orçamento #2 · 18/11/2026, 21:39".
6. **Entradas e saídas** (`MoneyBlock`): "Últimos 30 dias · 22/10/2026 — 20/11/2026" + legenda. Gráfico de barras diário (30 dias; só 20/11 = R$ 1.000,00 em azul). Ao lado: Entradas **R$ 1.000,00** · Saídas **R$ 0,00** · **Saldo ao final R$ 1.100,00** (cartão azul sólido) · Resultado operacional **R$ 0,00** · [Ver movimentações] [ghost Mais gráficos] (`/relatorios/analises?tab=vendas`).
7. **Onde você vende** ("Localização das vendas no período", mantido a pedido): cartão "Localização das vendas" com segmentado Vendas / Clientes com vendas, globo pontilhado girando à esquerda, "Vendas por país" (vazio: "Sem país informado neste período.") e tabela "Vendas por cidade" (# · Cidade · Vendas→; vazia: "Nenhuma cidade com vendas no período.").

Carregamento: skeleton (faixa, banner, 4 KPIs, 4 blocos) por ~280ms na primeira visita. Os gráficos que saíram do Painel antigo (origem das vendas, categorias mais vendidas, clientes novos e recorrentes, devoluções, situação das vendas) estão em **Relatórios › Análises**.

---

## C. Vendas

### C1. Vendas — `/vendas`
- Cabeçalho: "Vendas" · **[P] + Registrar venda** (vai para o PDV).
- Faixa de resumo (cartão dividido em 5 partes): select Período (Últimos 30 dias) | Total de vendas 0 | Registradas 0 | Estornadas 0 | Total vendido R$ 0,00.
- Atalhos de relatório (botões pequenos com ícone de gráfico): Evolução das vendas, ERP e PDV, Horários de venda.
- Tabela: abas Todas 0 / Registradas 0 / Estornadas 0 + "Buscar e filtrar". Com a busca aberta (`?busca=1`): campo "Número da venda ou CPF/CNPJ" + Buscar; selects Pagamento ("Todos os pagamentos"), Andamento ("Todo o andamento"); Limpar filtros.
- Colunas: Venda (chevron + #nº) · Cliente · Data → · Situação (badge) · Pagamento (ícone + meio) · Valor líquido →; ação: recibo.
- Vazio: "Nenhuma venda neste filtro" + [P] Registrar venda.

### C2. Orçamentos — `/vendas/orcamentos`
- Cabeçalho: **[P] + Novo orçamento**.
- Colunas: Orçamento (nome + #id) · Cliente · Validade → · Total → · Situação. Ação: [O] Abrir orçamento.
- Dado: **Teste #2 · João Victor Pertile · 25/11/2026 · R$ 74,90 · Rascunho**.
- **Modal Detalhe** (`?modal=ver&id=2`, lg): título "Teste · #2"; faixa-resumo (badge Rascunho · "Válido até 25/11/2026" · R$ 74,90 grande); nome do cliente; tabela Produto (nome + SKU) · Quantidade → · Unitário → · Total → (Camiseta Alternativa Algodão Azul Escuro, 01, 1, R$ 74,90); totais Subtotal / Desconto / Total; "Fotos do orçamento" (dropzone "Adicionar foto"); Condições: "Condições de pagamento: 50% depois e 50% na hora da retirada" e "Prazo e entrega: 15 dias úteis após a confi". Rodapé: [O] Baixar PDF, [O] Editar · **[P] Marcar como enviado**.
- **Modal Novo / Editar** (lg): Nome do orçamento* (placeholder "Ex.: Proposta de materiais") · Destinatário (cliente) com busca "Buscar cliente por nome, documento ou e-mail" + [O] + Cadastrar cliente · Vendedor (Responsável) | Válido até (Novo: 27/11/2026; Editar: 25/11/2026) · Desconto total (R$ 0,00) · seção recolhível "Condições de pagamento, entrega e observações" (Condições de pagamento, Prazo e entrega, Observações) · seção "Produtos, serviços e quantidades" com a descrição "Não reserva estoque nem movimenta caixa.": linhas com busca "Buscar nome, SKU ou código de barras" + quantidade + remover; [O] + Adicionar item; caixa de totais (Novo: "Selecione um produto ou serviço em cada item."; Editar: Subtotal R$ 74,90 · Desconto R$ 0,00 · **Total R$ 74,90**). Rodapé: Cancelar · **[P] Salvar orçamento**.

---

## D. PDV (layout pdv)

### D1. Atendimento — `/pdv` (caixa fechado) e `/pdv?estado=venda` (venda em andamento)
- Título "Atendimento" + ferramentas (ghost pequenos com kbd): ✓ Conectado · Cobranças Pix `Shift+F8` · Rascunhos `Alt+6` · Personalizar atalhos `Alt+8` · Tela cheia `Alt+7` · Ordens prontas `Alt+9`.
- Linha de caixa: cartão "Caixa fechado · Responsável" + **[P] Abrir turno `F8`** *(com venda em andamento: "Caixa principal · Turno de caixa" + [O] Meu turno `F8`)* · **[P] + Nova venda `F3`** (grande) · à direita [O] Vendas em espera `F4`.
- Catálogo: busca grande "Produto ou serviço, SKU ou código" + `F2` + botão leitor de código de barras; select "Todas as categorias"; "1 item"; cartão de produto (ícone · Camiseta Alternativa Algodão Azul Escuro · 01 · **R$ 74,90** em azul · 20 em estoque).
- Carrinho "Venda atual" (badge "0 itens" / "2 itens"): "Consumidor não identificado" · link "Identificar cliente por CPF `Alt+1`" · vazio "Escolha produtos ou serviços para começar." *(ou "Quantidades `Shift+F2`" + linha do produto com −, 2, + · R$ 149,80 · remover)* · **Total estimado** (30px) · aviso âmbar "Selecione seu caixa para concluir a venda." (só com o caixa fechado) · **[P] ✓ Ir para pagamento `Ctrl+Enter`** (desabilitado com o caixa fechado) · recolhível "Mais opções da venda".
- **Modal Abrir meu turno** (md): opção selecionada "Caixa principal · Disponível" · Fundo inicial em dinheiro (R$ 0,00) · Nome do turno ("Turno de caixa") | Duração prevista (8 horas) · **[P] Abrir turno**.
- **Modal Pagamento** (md): "Total a receber" R$ 149,80 (28px) · Meio de pagamento (Dinheiro) | Valor recebido (149,80) · Conta de recebimento ("Sem lançamento automático") · ghost "Trocar meio de pagamento `F6`" · aviso âmbar "Destino financeiro não configurado para Dinheiro…" · faixa azul-clara "Troco em dinheiro R$ 0,00" · recolhível "Dividir pagamento" com [O] + Adicionar meio de pagamento `Shift+F3` · **[P] Concluir venda `F9`**.
- **Modal Venda #6 / recibo** (`?modal=recibo&id=6`): "João Pertile · RECIBO DE VENDA #6 · 20/11/2026, 12:42:12" · tabela Descrição · Qtd. × unit. → · Total → (2 × R$ 74,90 = R$ 149,80) · Subtotal, Desconto, **Total**, Dinheiro, Troco · "Comprovante gerencial. Sem validade fiscal." · "Andamento e etiquetas": Andamento (Concluída) | Etiquetas ("Ex.: Retirada, Entrega local") | [O] Salvar andamento · "Comprovantes de pagamento": dropzone "Anexar PDF ou foto". Rodapé esquerdo: Pedido de venda · A4, Imprimir documento `F7`, Devolver itens, Trocar produtos; direito: **[D] Estornar venda** → confirmação.

### D2. Vendas do PDV — `/pdv/vendas`
- Igual a C1 (componente SalesPage), sem botão primário. Dado: **#6 · Não identificado · 20/11/2026, 12:42:12 · Concluída · Dinheiro · R$ 149,80**. Resumo: 1 / 1 / 0 / R$ 149,80.

### D3. Meu caixa — `/pdv/caixa`
- Ações: [O] Novo caixa, [O] Movimentação, [O] Gerenciar turno, **[P] ✓ Fechar meu turno `Alt+2`** (confirmação).
- Faixa: "Turno de caixa · Término previsto: 20/11/2026, 20:40:34" + badge Aberto.
- KPIs: Fundo inicial R$ 100,00 · Entradas · crédito R$ 149,80 (azul) · Saídas · débito R$ 0,00 · **Dinheiro esperado R$ 249,80 (cartão escuro)**.
- "Meios de pagamento registrados": Dinheiro R$ 149,80 + nota "Valores líquidos das devoluções na posição atual. Cartão e Pix não comprovam liquidação."
- "Movimentações do turno": Data · Movimento · Motivo · Entrada (crédito) → · Saída (débito) → — (20/11/2026, 12:42:12 · Venda em dinheiro · Recebimento de venda · R$ 149,80 · —) e (12:40:34 · Fundo inicial · Abertura de caixa · R$ 100,00 · —).
- "Turnos de caixa": Turno (nome + término) · Caixa · Operador · Abertura → · Situação; ação [O] Resumo do turno.

### D4. Clientes do PDV — `/pdv/clientes`
- Componente ClientsPage com 3 registros: João Victor Pertile ("Também fornecedor", 12181472963, 49999468030, joaovictorpertile7@gmail.com) ×2 e João Victor Pertile (CPF —, mesmo telefone e e-mail).

---

## E. Clientes — `/clientes`
- **[P] + Novo cliente**. Tabela com abas **Ativos 1 / Arquivados 0** + busca "Buscar CPF ou CNPJ exato" + Buscar.
- Colunas: Cliente (nome + "Também fornecedor") · CPF/CNPJ · Telefone · E-mail. Ações: [O] Editar · ícone Arquivar → confirmação "Arquivar cliente? … Você pode restaurar pela aba Arquivados."
- Dado (ERP): João Victor Pertile · — · 49999468030 · joaovictorpertile7@gmail.com.
- Aba Arquivados vazia: "Nenhum cliente arquivado. Clientes arquivados saem das buscas e das vendas, mas mantêm o histórico."
- **Modal Novo / Editar cliente** (md): Nome* · CPF/CNPJ | Telefone · E-mail | País (Não informado / Brasil) · Cidade · Endereço (textarea). Editar: João Victor Pertile · — · 49999468030 · joaovictorpertile7@gmail.com · Brasil · Xanxerê SC · Xanxerê. **[P] Salvar**.

---

## F. Catálogo

### F1. Produtos e serviços — `/catalogo/produtos`
- Ações: [O] Opções da tela · [O] + Novo serviço · **[P] + Novo produto**. Chips: Categorias ›, Fichas técnicas ›, Inventário ›, Insumos ›.
- Tabela com seleção: abas Todos 1 / Ativos 1 / Arquivados 0 (`?status=`) + "Buscar e filtrar" (busca "Nome, SKU ou código de barras" + Buscar; selects Tipo de cadastro, Categoria, Estoque, Uso; Limpar filtros).
- Colunas: Produto ou serviço (miniatura + nome) · SKU · Preço → · Custo → · Acréscimo sobre custo ("Sem custo") · Estoque → · Disponibilidade (badge "✓ Em estoque") · Categoria · Status (badge Ativo). Ações: ícone de histórico + "⋯". Rodapé "1–1 de 1 itens".
- Dado: Camiseta Alternativa Algodão Azul Escuro · 01 · R$ 74,90 · R$ 0,00 · Sem custo · 20 · Em estoque · Camiseta · Ativo.
- **Opções da tela** (painel lateral): checkboxes de colunas (SKU, Preço, Custo, Acréscimo sobre custo, Estoque, Disponibilidade, Categoria, Status e Ações marcados; Código de barras, Fornecedor e NCM desmarcados) · Produtos por página (25) com a ajuda "Estas opções mudam apenas a sua visualização nesta empresa." · **[P] Aplicar**.
- **Ações do produto** (sm): Imprimir etiqueta · Histórico de estoque · Duplicar produto · Criar variação · Arquivar (vermelho).
- **Arquivar** (confirmação): "Arquivar item? … O histórico de vendas e estoque será preservado."
- **Imprimir etiquetas** (lg, 2 colunas): Quantidade (1) | Papel (Folha A4) · Etiquetas por linha (3 colunas) | Altura (36 mm) · recolhível "Ajustar folha já iniciada e medidas" (Margem 8 · Espaço 3 · Começar na posição 1). À direita: "1 etiqueta · 1 folha · 62,7 × 36,0 mm" + pré-visualização (nome, código de barras, 98856804473701389143, 01) + dica. **[P] Imprimir etiquetas**.
- **Histórico de estoque** (lg): "Movimentos · Camiseta…" — Data · Quantidade → (azul) · Motivo · Operador: 18/11/2026, 21:47:56 · +10 · Ajuste rápido de estoque · #4 e 07/11/2026, 22:48:34 · +10 · Estoque inicial · #4.

### F2. Cadastro de produto, serviço e insumo (ItemModal, xl)
- Coluna "Imagens" + resumo "Novo produto / Novo serviço / Novo insumo · SKU ainda não informado". Abas em pílula. Rodapé: Cancelar (com dados preenchidos, mostra UnsavedBar) · **[P] Cadastrar produto / serviço / insumo**.
- Abas do **produto e do insumo**: Cadastro · Preços · Estoque · Fornecedor · Fiscal · Opcionais. Abas do **serviço**: Cadastro · Preços · Opcionais · Prestação.

| Aba | Campos |
|---|---|
| Cadastro | Nome do produto/serviço* · SKU (com botão gerar) | Código de barras ("Gerado automaticamente ao salvar") · Categoria | Publicação (segmentado Ativo/Arquivado) · Descrição (opcional) · Uso do cadastro (Produto para venda / Insumo da produção; só produto e insumo) |
| Preços | Preço regular (R$) | Aplicar preço promocional (switch) · Custo unitário ou, no serviço, Custo estimado por unidade (R$) | Acréscimo sobre o custo (%) · info "Informe o preço para conferir a margem." |
| Estoque | Disponibilidade (segmentado Em estoque / **Fora de estoque** ativo em vermelho-claro / Sob encomenda) · Controle de quantidade (Controlar / Sem controle) · Quantidade atual (0) | Estoque mínimo (5; ajuda: aparece em "Reposição de estoque" no Painel) · Unidade do estoque (Unidade) · recolhível "Compra por embalagem" |
| Fornecedor | Fornecedor principal (busca) + "Sugestões recentes · Nenhum fornecedor cadastrado." + ajuda |
| Fiscal | NCM (8 dígitos) | CEST (7 dígitos) · Origem (Não definida) | Unidade comercial (UN, KG, CX…) · CFOP de referência | CST ICMS · CSOSN | CST PIS · CST COFINS | CST IBS/CBS · Classificação IBS/CBS (cClassTrib · 6 dígitos) · info "Revise os códigos com a contabilidade. Este cadastro não emite notas." |
| Opcionais | Descrição "Modelos opcionais com valor e observação por unidade do item. Ex.: 'Embalagem para presente + R$ 5,00'." · bloco: Nome do opcional | Valor por unidade (R$) · Observação do pedido · Ficha técnica do opcional (Sem consumo de insumos) · [D-outline] Remover · [O] + Adicionar opcional |
| Prestação (serviço) | Disponibilidade do serviço (Disponível para venda) · Unidade de cobrança (Por execução) · Duração estimada em minutos (0; "Opcional. Não reserva horários nem cria agendamentos.") · info "A venda é um registro gerencial. NFS-e precisa de integração fiscal própria…" |

### F3. Categorias — `/catalogo/categorias`
- Colunas: Categoria · Produtos →. Ação [O] Ver produtos →. Dado: Camiseta · 1.

### F4. Inventário — `/catalogo/inventario`
- Subtítulo "Contagens de estoque. O saldo só muda depois da aprovação." · **[P] + Nova contagem**.
- Colunas: Contagem · Criada em → · Situação (badge pendente "Em contagem"). Ação [O] Abrir contagem. Dado: Teste · 07/11/2026, 23:05:36.
- **Nova contagem** (md): Nome* ("Ex.: Contagem da prateleira A") · Produtos (busca + Remover + "Sugestões recentes": Camiseta… SKU 01 [Selecionar →]) · [O] + Adicionar produto · ajuda "Conte os itens fisicamente; o estoque só muda após aprovação." · **[P] Criar contagem**.
- **Contagem aberta** (lg): título "Teste" + badge "Em contagem" · campo "Ler código de barras ou SKU" · tabela Produto · Saldo da contagem → · Saldo atual → · Quantidade contada (input "Não contado") · ajuda "Salvar registra a contagem; enviar solicita revisão. Aprovar aplica as diferenças ao estoque." · rodapé: [D-outline] Cancelar contagem (confirmação) | [O] Enviar para revisão · **[P] Salvar quantidades**.

### F5. Fichas técnicas — `/catalogo/fichas-tecnicas`
- Subtítulo "Fichas técnicas dizem quais insumos cada produto fabricado consome." · [O] Mapa de fichas técnicas · [O] + Cadastrar insumo · **[P] + Criar ficha técnica**. Abas sublinhadas: Fichas técnicas | Estoque de insumos.
- Filtro: busca "Buscar ficha técnica, produto ou SKU" + Situação (Ativas) + Buscar. Cartão vazio: "Nenhuma ficha técnica cadastrada · Comece escolhendo o produto que sua empresa fabrica." + [P] Criar ficha técnica · "0 registros".
- **Escolha o produto fabricado** (md): Produto* (busca) · sugestão Camiseta… [Selecionar →] · erro "Escolha um produto cadastrado." · Cancelar · **[P] Continuar**.
- **Nova ficha técnica** (lg): Nome da ficha técnica* · "Insumos por unidade de Camiseta Alternativa Algodão Azul Escuro": Insumo (busca) | Quantidade por produto (1) | Perda adicional % (0) | remover · [O] + Adicionar insumo · **[P] Salvar**.

### F6. Insumos — `/catalogo/insumos`
- Mesmo cabeçalho e abas (ativa: Estoque de insumos); **[P] + Cadastrar insumo**. Busca "Buscar insumo ou SKU". Tabela Insumo · Saldo → · Mínimo →, vazia: "Nenhum insumo cadastrado. Insumos são itens usados na produção e não aparecem no PDV."

---

## G. Fornecedores e frete

### G1. Fornecedores — `/fornecedores`
- **[P] + Novo fornecedor**. Tabela com abas Ativos 1 / Arquivados 0 + busca "Nome, CPF/CNPJ ou e-mail". **Uma coluna**: Fornecedor (ícone + nome + pessoa de contato). Ação [O] Ver ficha.
- **Ficha do fornecedor** (lg): resumo "Fornecedor · João Victor Pertile" · ações **[P] + Registrar conta a pagar**, [O] Editar cadastro, [O] Relatório de pagamentos, [ghost] Arquivar · KPIs Pago neste mês R$ 0,00 | Total pago R$ 0,00 · cartão "Condições de fornecimento" (Prazo habitual: Não informado · Pagamento: antes) · cartão "Identificação e contato" (CPF/CNPJ 12181472963 · Pessoa de contato · Telefone 49999468030 · E-mail · Endereço Xanxerê).
- **Novo fornecedor** (painel lateral): info "Cadastro de fornecimento" · Identificação (Nome do fornecedor* · CPF/CNPJ | Inscrição estadual) · Fornecimento (Prazo habitual em dias (0) | Condições de pagamento · checkbox "Também presta serviço de transporte") · Contatos e localização (Pessoa de contato · Telefone | E-mail · País | Cidade · Endereço) · recolhível "Observações internas" · **[P] Salvar**.

### G2. Transportadoras — `/fornecedores/transportadoras`
- Ações: [O] Conta Melhor Envio · [O] Cotar frete · **[P] + Nova transportadora**. Tabela com abas Ativos 1 / Arquivados 0 + busca. Colunas: Transportadora (ícone + nome + "Correios · contato") · Plataforma de frete → ("Outra plataforma"). Ação [O] Editar.
- **Nova transportadora** (painel lateral): info "Cadastro de transporte" · Identificação · **Operação de transporte** (Marca: Correios | Plataforma de frete: Outra plataforma · Prazo habitual | Condições de pagamento) · Contatos e localização (preenchido: João Victor Pertile, 12181472963, 49999468030, joaovictorpertile7@gmail.com, Brasil, Xanxerê SC, Xanxerê) · Observações internas.
- **Cotar frete · Melhor Envio** (md): CEP de origem | CEP de destino · Peso em gramas (500) | Largura cm (10) · Altura (10) | Comprimento (10) · Valor segurado (R$ 0,00) · **[P] Consultar frete**.
- **Conta do Melhor Envio** (sm): info "Conecte sua conta" + "O administrador do Avante precisa configurar o aplicativo para esta empresa."

---

## H. Financeiro

### H1. Resumo financeiro — `/financeiro`
- Ações: [O] Opções da tela · [O] Relatório do período. Filtro "Período dos indicadores" (Últimos 30 dias).
- Grid 2fr/1fr: **Agenda financeira** (2 cartões clicáveis: Contas a receber em azul-claro e Contas a pagar em vermelho-claro, cada um com R$ 0,00 · Vencidos · Hoje e próximos 7 dias) | **Fluxo do período** (Quanto entrou R$ 1.000,00 · Quanto saiu R$ 0,00 · Entrou menos saiu R$ 1.000,00).
- Grid 2fr/1fr: **Evolução das entradas e saídas** (linha de 30 dias com pico em 20/11 + [O] Ver movimentos desta data) | **Saldos por conta** (barra "test R$ 1.100,00").
- KPIs: Ticket médio R$ 0,00 · Vendas no período 0 · Valor vendido R$ 0,00.
- **Produtos mais vendidos** (abas Quantidade / Receita): "Unidades vendidas por produto" — gráfico vazio.
- Recolhível **Detalhar prazos e centros de custo**: Contas a receber por prazo | Contas a pagar por prazo (vazios) + Entradas e saídas por área ("Não atribuído · Receita R$ 1.000,00").
- **Registrar movimentações e títulos**: "Já recebi ou paguei" [Registrar entrada] [Registrar saída] [Transferência] [Recibos avulsos] | "Ainda vou receber ou pagar" [Adicionar conta a pagar] [Adicionar conta a receber].

### H2. Contas a pagar — `/financeiro/contas-a-pagar` · H3. Contas a receber — `/financeiro/contas-a-receber` (TitlesPage)
- Ações: [O] Relatório por período · **[P] + Adicionar conta a pagar / a receber**.
- FilterBar: Situação (Pendentes) · Data de referência (Vencimento) · Período (Todas as datas) · busca "Descrição ou documento" · Filtrar · recolhível "Mais filtros: categoria, centro e conta" (Plano de contas, Centro de custo, Conta).
- Nota: "Parcelas selecionadas pela data indicada. Quitado e em aberto mostram a posição atual, somando todo o filtro."
- KPIs: Valor das parcelas · Em aberto (com ?) · Principal quitado · Vencido — todos R$ 0,00.
- Cartão "Principal das parcelas selecionadas" + texto explicativo + gráfico vazio.
- Tabela: Descrição · Operação · Vencimento · Valor das parcelas → · Em aberto → · Situação · Ações — vazia com ação.
- **Formulário** (painel lateral): chip Empresa · Descrição* · Operação financeira (Teste / Água e saneamento) com o link "Nova operação" · Fornecedor ou Cliente (opcional, busca) · Valor total* (R$) | Data de competência (20/11/2026) · Vencimento | Centro de custo (pagar: obrigatório, "Selecione um centro"; receber: opcional, "Sem centro") · Forma de pagamento (só pagar: Dinheiro / A definir / Pix / Boleto…) · Contrato (opcional, Sem vínculo) · recolhível Parcelar valor · recolhível Documento · checkbox "Abrir anexos depois de salvar" · **[P] Salvar**.
- **Cadastrar operação financeira** (sm, por cima do formulário): Operação fixa ou variável (pagar: Fixa; receber: Variável) · Nome da operação* (Teste) · ajuda "Para contas a pagar." / "Para valores a receber." · **[P] Salvar**.

### H4. Movimentações — `/financeiro/movimentacoes` (`?estado=vazio` = sem lançamentos)
- Subtítulo "O que entrou e saiu das contas da empresa." · [D-outline] Registrar saída · **[P] Registrar entrada**.
- Chip "Filtros · Este mês +" e [O] Relatório deste período.
- KPIs: **Saldo ao final (cartão escuro)** R$ 1.100,00 (vazio: R$ 100,00) · Saldo inicial R$ 0,00 · Entradas R$ 1.000,00 (azul) · Saídas R$ 0,00.
- Faixa: "Ajuste de saldo no período · R$ 100,00".
- **Extrato de movimentações**: grupo "Hoje · 20/11/2026"; linha clicável: ícone de banco · **teste** / "test · Teste" · **+ R$ 1.000,00** (azul) / "Entrada" · chevron. Vazio: "Nenhuma movimentação neste filtro" + [P] Registrar entrada.
- **Registrar entrada / saída** (md): chip Empresa · Descrição (opcional) · Valor* | Data do movimento · Conta de recebimento ou de pagamento (test) | Operação (Teste) · Contrato (opcional) · recolhível "Competência e identificação".
- **Detalhe da entrada** (lg): título "teste" · 4 KPIs (Valor total R$ 1.000,00 · Em aberto R$ 0,00 · Data de competência 20/11/2026 · Operação financeira Teste) · "Centro de custo: Não informado · Emissão: 20/11/2026" · **Parcelas** (Parcela · Vencimento · Valor → · Em aberto → + [O] Ver cobrança) · Documentos do título (dropzone) · **Pagamentos e estornos** (Conta · Principal · Desconto · Juros · Multa · Taxa da operadora/banco · Valor líquido · Situação "Registrado").

### H5. Fluxo de caixa — `/financeiro/fluxo-de-caixa`
- Subtítulo "Entradas e saídas por dia." · [O] Relatório do fluxo. Filtros De (20/11/2026) | Até (19/12/2026).
- KPIs clicáveis com "Ver contas →": A receber · A pagar · Recebimentos vencidos · Pagamentos vencidos (R$ 0,00) + nota.
- Grid: **Entradas e saídas realizadas** (linha de 30 dias, entradas azul e saídas índigo; "Data consultada · 01/12" + seletor de data; legenda com valores) | **Vencimentos ainda em aberto** (vazio).
- Prazos (2 cartões vazios) · Entradas e saídas por área (barra) · **Detalhamento por dia** (Data · Entradas realizadas → · Saídas realizadas → · A receber em aberto → · A pagar em aberto →; 20/11/2026 · R$ 1.000,00 · R$ 0,00 · — · —) · Operações por competência (barra "Teste · Receita") · **Todas as operações por competência** (Operação financeira · Tipo [badge Receita] · Valor nominal →).

### H6. Despesas avulsas — `/financeiro/despesas-avulsas`
- Subtítulo "Custos avulsos já ocorridos. Compromissos futuros ficam em Contas a pagar." · [O] Contas a pagar › · **[P] + Registrar despesa avulsa**.
- Tabela com select Situação (Ativas) na barra. Colunas: Descrição · Categoria · Data → · Valor → · Situação (Ativa). Ação [D-outline] Anular → confirmação. Dado: teste · Operação · **20/11/2026** · R$ 1.000,00.
- **Registrar despesa** (md): Descrição* · Categoria (Operação) | Valor* · Data · ajuda "Registre custos já ocorridos. Compras e custo do estoque são tratados em Compras; não os duplique aqui."

### H7. Contas bancárias — `/financeiro/contas-bancarias` (`?estado=com-conta`)
- Subtítulo "Contas de banco, caixa e repasses usadas nos lançamentos." · [O] Contas de recebimento do PDV · [O] Registrar transferência (desabilitado sem conta) · **[P] + Adicionar conta**.
- "Saldos por conta" ("Nesta empresa"): "Nenhuma conta para exibir." *(com conta: barra test R$ 100,00)*.
- "Contas bancárias e de caixa": Conta (ícone + nome) · Tipo · Saldo inicial → · Saldo registrado → (azul). Ações [D-outline] Arquivar · [O] Ver extrato →. Com conta: test · Repasses a receber · R$ 100,00 · R$ 100,00.
- **Cadastrar conta financeira** (md): Nome da conta* · Tipo de conta (Banco) · Instituição bancária (opcional) | Saldo inicial · Data inicial · ajuda "O fechamento do ponto de venda é realizado em Meu caixa, no PDV."
- **Contas de recebimento do PDV** (lg): texto explicativo + tabela Caixa · Meio · Conta de destino · Operação (vazia) + **[P] + Autorizar conta de destino**.

### H8. Conciliação bancária — `/financeiro/conciliacao`
- [O] Relatório desta consulta · [O] Arquivos importados · **[P] Importar extrato**. Abas sublinhadas: Extrato geral · A conciliar · Conciliados.
- Filtros: Conta (Todas as contas) · De 22/10/2026 · Até 20/11/2026 · Consultar.
- KPIs: Entradas registradas no ERP · Saídas registradas no ERP · Conciliados 0 · A conferir 0. Nota "Gaveta do PDV, despesas sem conta e créditos internos de troca aparecem como registros de apoio."
- "Todas as contas" (22/10/2026 a 20/11/2026): Data · Movimentação · Valor → · Conferência — vazia + [P] Importar extrato.

### H9. Maquininhas e recebíveis — `/financeiro/maquininhas` · H10. Cartões corporativos — `/financeiro/cartoes`
- **[P] Cadastrar maquininha / Cadastrar cartão**. Cartão com abas Ativos 0 / Arquivados 0 e estado vazio ("Cadastre a maquininha para acompanhar valores a receber e conferir repasses." / "Cadastre somente os quatro últimos dígitos para acompanhar compras e faturas."). **Sem tabela** (o print não tem colunas).
- **Vincule uma conta bancária** (md): info "Contas bancárias · Cadastre a conta onde serão conferidos os pagamentos ou repasses." + [O] Abrir Contas bancárias ›.

### H11. Empréstimos, Bens e patrimônio (sem print)
- Cabeçalho + cartão vazio "Tela aguardando print de referência". **Não desenhe campos** até haver print.

### H12. Investimentos — `/financeiro/investimentos` · H13. Consórcios — `/financeiro/consorcios`
- **[P] Criar aplicação / Cadastrar consórcio**. Abas em pílula (Ativas | Arquivadas; Em acompanhamento | Encerrados). Estado vazio: "Suas aplicações financeiras · Vincule a aplicação a um banco para registrar aportes, resgates e rendimentos." / "Seus consórcios em um só lugar · Registre o contrato e acompanhe os títulos de cada parcela."

### H14. Contratos — `/financeiro/contratos`
- Subtítulo "Carteira de contratos: documentos, partes e datas de vigência." · **[P] + Cadastrar contrato**. Tabela com abas Ativos 1 / Arquivados 0. Colunas: Contrato (ícone + "teste" / "sdasd") · Vigência (badge "Prazo indeterminado"). Ação [O] Abrir.
- **Detalhe** (lg): resumo "Parte contratante · sdasd" + badge · Vigência "20/11/2026 em diante" · Tipo "Serviços" · [O] Editar cadastro · cartão "Títulos vinculados: Nenhum título vinculado." · Documentos do contrato (dropzone) · [D-outline] Arquivar cadastro.
- **Cadastrar contrato** (md): Partes e tipo (Nome do contrato* · Tipo: Outro · Outra parte) · Vigência (Início 20/11/2026 | Fim opcional, "Deixe em branco para prazo indeterminado.") · recolhível Referência e observação.

### H15. Plano de contas — `/financeiro/plano-de-contas`
- Subtítulo "Operações financeiras que classificam cada entrada e saída na DRE e na DFC." · [O] Arquivados. Abas em pílula Receitas | Despesas + busca "Buscar operação financeira". Contador "1 de 1 operações" / "35 de 35 operações".
- Cartão com grupos recolhíveis (cabeçalho cinza, chevron, nome em negrito e contador à direita). Itens: nome + "Variável · DFC Não classificada" / "Comportamento não definido · DFC Não classificada" + ícones Editar · Ver lançamentos → · Arquivar (vermelho). Grupo vazio: "Adicione operações neste grupo." Rodapé de cada grupo: [ghost] + Adicionar operação em <grupo>.
- **Receitas:** Fora da DRE (movimento patrimonial) 0 · Não classificada 1 (Teste) · Receita bruta 0 · Receitas financeiras 0 · Outras receitas 0.
- **Despesas:** Fora da DRE 0 · Não classificada 35 (visíveis no print: Água e saneamento, Aluguel, Aquisição de equipamentos, Assessoria jurídica, Benefícios da equipe, Combustível e estacionamento, Comissões, Compras de mercadorias, Condomínio, Viagens e hospedagem; **as outras 25 vêm do sistema real**) · Deduções de receita 0 · Custos 0 · Despesas operacionais 0 · Despesas financeiras 0 · Outras despesas 0.
- **Editar / nova operação** (md): Nome da operação* · Fixa ou variável | Atividade na DFC (Não classificada).

### H16. Centros de custo — `/financeiro/centros-de-custo`
- Subtítulo "Use o mesmo código nas empresas que devem entrar juntas na DRE por centro de custo." · **[P] + Adicionar centro**.
- Colunas: Centro de custo · Situação (Ativo) · Código de consolidação. Ações [O] Editar código · [D-outline] Arquivar. Dado: teste · Ativo · 112312.
- **Adicionar centro de custo** (sm): Nome do centro* · Código de consolidação (opcional, com ajuda).

---

## I. Relatórios

### I1. Relatórios — `/relatorios`
- Subtítulo "Biblioteca com 36 relatórios prontos para baixar ou analisar." · [O] Análises · [O] Histórico · **[P] + Criar relatório**.
- Filtro: busca "Buscar DRE, extrato, fornecedor…" + abas em pílula: Todas as áreas · Vendas · Produtos e estoque · Acompanhamento de operações · Financeiro (`?area=`).
- Grid de cartões (mínimo 260px): ícone da área + nome da área + seta · **nome do relatório** · descrição. Os 36 relatórios:
  - **Vendas (9):** Evolução das vendas · Vendas por origem · ERP e PDV · Vendas por horário · BRT · Produtos vendidos · Serviços vendidos · Curva ABC de produtos · Vendas por categoria · Vendas e estornos · Devoluções por item.
  - **Produtos e estoque (4):** Estoque e reposição · Inventário atual · Posição e avaliação do estoque · Entregas pendentes.
  - **Acompanhamento de operações (4):** Histórico de operações · Conferência de caixas · Entradas e saídas do caixa · Despesas avulsas.
  - **Financeiro (19):** DRE gerencial · EBITDA / LAJIDA · EBIT / LAJIR · DFC gerencial · Plano de operações financeiras · Movimentos registrados · Extrato geral e conciliação · Extrato importado e conciliação · Patrimônio e contratos · Extrato de conta · Movimentação financeira · Fluxo previsto e realizado · Valores por operação financeira · Valores por centro de custo · Contas a receber · Contas a pagar · Pagamentos por fornecedor · Vendas por operação financeira · Valores por atraso.
  - As descrições exatas estão em `prototipo/js/screens/relatorios.js`.
- **Configurar relatório** (lg, 2 colunas): Empresa · De | Até · recolhível Colunas do relatório · checkboxes "Salvar como meu modelo" e "Guardar esta fotografia no histórico" · Arquivo (PDF) | Página do PDF (Horizontal). À direita, "SEU DOCUMENTO": seções com checkbox e botões ↑↓ (Indicadores, Gráfico, Tabela detalhada, Critérios e filtros) + prévia (João Pertile · nome · período · mini-KPIs Receita líquida, Custo histórico, Margem bruta, Margem sobre a receita). Rodapé "0 registros · prévia pronta" · [O] Abrir análise · **[P] Baixar relatório**.

### I2. Análises — `/relatorios/analises` (abas sublinhadas: Extrato de conta | Painel de vendas `?tab=vendas`)
- **Extrato de conta:** filtros O que analisar (Extrato de conta) · Período (Personalizado) · Conta (test) · De · Até + nota · linha de título "Extrato de conta · 22/10/2026 a 20/11/2026 · Conta: test" + "Atualizado em 20/11/2026, 12:22:05 BRT · BRL" + [O] Colunas + **[P] Preparar arquivo** · KPIs Saldo anterior R$ 0,00 · Entradas R$ 1.000,00 · Saídas R$ 0,00 · **Saldo ao final R$ 1.100,00 (escuro)** · info do saldo inicial · gráfico "Saldo registrado ao final de cada dia" · tabela Detalhamento (Data · Documento · Histórico · Categoria · Centro de custo · Entradas → · Saídas → · Saldo registrado → · Conciliação · Linha do banco; 2 linhas: Saldo inicial informado R$ 100,00 e Movimento #31 · Recebimento · teste · Teste · Receita · R$ 1.000,00 · R$ 1.100,00) · recolhível "Como calculamos".
- **Painel de vendas** (o que saiu do painel antigo): Vendas ao longo do tempo (abas Receita/Vendas/Ticket médio, linha zerada vs. período anterior) | Produtos mais vendidos · Origem das vendas | Contas bancárias ("Nenhuma conta bancária ativa.") · Pedidos recentes (Pedido · Cliente · Situação · Total) · Categorias mais vendidas | Clientes novos e recorrentes · Segmentos de clientes · Estoque baixo ("0 em estoque baixo · 1 produto ativo · 20 unidades"; Produto · SKU · Restante) | Valor histórico por cliente (Clientes com compras 0 · Clientes recorrentes 0 · Receita acumulada R$ 0,00 · Maior receita por cliente —) · Devoluções de itens (0 · R$ 0,00) · "Caixa, operadores e despesas": Situação das vendas | Despesas avulsas.

---

## J. Equipe e Configurações

### J1. Usuários e permissões — `/equipe`
- Subtítulo "Cada pessoa acessa somente os dados e as ações permitidos pelo seu perfil." · **[P] + Adicionar usuário**.
- "Perfis de acesso": 5 cartões — Proprietário ("Todos os recursos do plano, incluindo gestão da equipe."), Gerente ("Gestão, relatórios, estoque e caixa; sem gerir usuários."), Caixa ("Venda, clientes e próprio caixa; sem custos ou relatórios gerenciais."), Operador ("Clientes, catálogo e próprias vendas; sem operar caixa ou estoque."), Estoquista ("Consulta de produtos e ajustes de estoque; sem alterar preços, acessar custos ou vendas.").
- "Equipe da empresa": Pessoa (avatar + Responsável + e-mail) · Perfil (badge "Proprietário da empresa") · Acesso (Ativo) · "Proprietário".
- **Adicionar à equipe** (sm): Nome* · E-mail de acesso* ("Use um e-mail que a pessoa utiliza para acessar sua conta.") · Perfil (Caixa).

### J2. Funcionários e salários — `/equipe/funcionarios` (sem print: tela aguardando referência)

### J3. Dados da empresa e preferências — `/configuracoes`
- Busca "Buscar configuração: e-mail, impressão, CNPJ…" (560px). Abas sublinhadas: Empresa e documentos · Vendas e catálogo · Financeiro e avisos · Integrações.
- Aba Empresa e documentos, grid de 3 cartões: **Dados da empresa** (info "Cadastro gerencial por CPF" · João Pertile · link-cartão "Editar dados e modo fiscal · CPF ou CNPJ, endereço e uso de documentos") · **Identidade visual** ("Editar ícone e cor da empresa · Personalizar como a empresa aparece no seletor") · **Atividade e módulos** (badges Financeiro, Relatórios, Clientes, Catálogo, Vendas, PDV + "Revisar atividade e rotinas do menu · Ajustar as funções que aparecem para sua atividade"). As outras abas ainda não têm print.

### J4. Documentos da empresa — `/configuracoes/documentos`
- Subtítulo "Fotos de produtos, anexos de orçamentos e comprovantes de venda."
- Cartão de uso: "0 KB usados de 1 GB" · "0 de 5000 arquivos" · barra · "O limite considera os arquivos cifrados. Arquivos removidos liberam espaço após a limpeza automática."
- Cartão com select Arquivos (Fotos dos produtos, Fotos dos orçamentos, Comprovantes de venda, Documentos de títulos, Documentos de contratos) + dica + vazio "Nenhum arquivo neste grupo." + [O] Ir para Produtos e serviços.
