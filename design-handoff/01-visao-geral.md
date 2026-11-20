# 01 · Visão geral do design

## 1. Identificação

| Campo | Valor |
|---|---|
| Nome do produto | **Avante ERP** (back-office) e **Avante PDV** (frente de caixa) |
| Nome do design system | **Avante Design System** — tema "Azul Avante" |
| Tipo de design | Interface de aplicação **SaaS B2B**; categoria **dashboard operacional / ERP**; plataforma **web responsiva** (desktop-first, utilizável em tablet e celular) |
| Estilo visual | **Soft dashboard**: superfícies claras, cartões flutuantes sem borda, formas arredondadas, pílulas, contraste marcado entre azul da marca e preto (tinta) |
| Paleta | Monocromática da marca: azul, preto (tinta), branco e cinzas frios. Vermelho e âmbar só para significado (erro e alerta) |
| Tema | Claro como padrão; tema escuro completo disponível |
| Tom de voz | Direto, profissional e amigável. Frases curtas, verbos de ação ("Registrar entrada", "Abrir PDV") |

---

## 2. A ideia a ser transmitida

> **"Tudo da sua empresa em um lugar, claro e sob controle."**

O design precisa fazer o dono de um pequeno ou médio negócio sentir que:

1. **Entende a situação da empresa em 5 segundos.** O Painel abre com uma frase que resume o dia ("Você tem 2 pendências hoje: …"), indicadores grandes e números alinhados.
2. **Chega a qualquer tarefa em 1 ou 2 cliques.** Atalhos rápidos no topo, busca global `Ctrl K`, botão "Criar" sempre visível e atalhos `Alt+1…8`.
3. **Confia no sistema.** Visual calmo e consistente, sem cores gritantes. A cor forte (azul) só aparece onde há ação ou destaque. Valores financeiros sempre em fonte tabular, alinhados à direita.
4. **Vende sem fricção no PDV.** O PDV usa a mesma identidade azul, com alvos grandes, total em destaque e teclas de atalho visíveis.

### Palavras-chave da personalidade
`confiável` · `organizado` · `moderno` · `leve` · `rápido` · `brasileiro` · `sem ruído`

### O que o design **não** é
- Não é uma landing page: nada de seções enormes, ilustrações decorativas ou textos longos.
- Não é colorido: sem arco-íris de categorias, sem verde, sem gradientes por toda parte.
- Não é denso como um ERP antigo: espaço para respirar entre blocos, mas tabelas continuam compactas.

---

## 3. Público e contexto de uso

| Perfil | Uso principal | Implicação no design |
|---|---|---|
| Proprietário | Painel, financeiro, relatórios | Resumos em linguagem simples, indicadores grandes |
| Gerente | Vendas, estoque, caixa, relatórios | Tabelas com filtros rápidos, exportação |
| Caixa / Operador | PDV o dia inteiro | Alvos grandes, teclado primeiro, poucas cores |
| Estoquista | Produtos, inventário | Busca por SKU/código de barras, números claros |

Perfis de acesso existentes: Proprietário, Gerente, Caixa, Operador, Estoquista.

---

## 4. Princípios de design (em ordem de prioridade)

1. **Clareza antes de estética.** Hierarquia por tamanho e peso tipográfico, não por cor.
2. **Uma ação primária por tela.** Botão azul em pílula no canto superior direito. As demais ações são outline ou ghost.
3. **Cor com significado.** Azul = marca/ação/positivo. Preto = navegação ativa e destaque escuro. Vermelho = erro/destrutivo. Âmbar = pendente/alerta.
4. **Fidelidade ao conteúdo real.** Nenhum campo, coluna ou dado é inventado. Telas sem dados mostram estado vazio com ação sugerida.
5. **Densidade onde se trabalha, respiro onde se lê.** Tabelas e formulários são compactos; o Painel e os cartões de resumo têm mais espaço.
6. **Números são cidadãos de primeira classe.** `tabular-nums`, alinhamento à direita, formato `R$ 1.234,56`.
7. **Teclado e acessibilidade.** Foco visível, atalhos, contraste WCAG AA em todos os pares de cor.
8. **Consistência absoluta.** As 113 telas usam os mesmos componentes; nenhuma tela tem estilo próprio.

---

## 5. Decisões de produto que o design já incorpora

| Antes (sistema original) | Agora (design novo) | Motivo |
|---|---|---|
| PDV em verde-petróleo, ERP em azul | **Tudo no azul da marca** | Identidade única, pedido da empresa |
| Verde para status "ativo/pago" | **Azul-claro com texto azul-escuro** | Remover verde por completo |
| Menu com 3 níveis ("Mais do financeiro") | **2 níveis com separadores com título** | Menos cliques, menos confusão |
| "Arquivados" abria modal sem ação | **Abas Ativos · Arquivados** dentro da lista | Restaurar fica a 1 clique |
| "Adicionais" sem explicação | **"Opcionais"** com exemplo | Nome autoexplicativo |
| "Receitas de produtos" | **"Fichas técnicas"** | Termo de mercado |
| Formulários longos em coluna única | **Painel lateral, grid de 2 colunas, opcionais recolhidos** | Menos rolagem |
| Gráficos do painel antigo soltos | **Movidos para Relatórios › Análises** | Painel focado em ação |
| Bugs visuais ("null", "20 00:00:00/11/2026") | **Corrigidos** | Qualidade |
