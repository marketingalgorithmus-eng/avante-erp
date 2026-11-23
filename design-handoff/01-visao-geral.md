# 01 · Visão geral do design

## 1. Identificação

| Campo | Valor |
|---|---|
| Nome do produto | **Avante ERP** (back-office) e **Avante PDV** (frente de caixa) |
| Nome do design system | **Avante Design System v3** — tema "Azul institucional chapado" |
| Tipo de design | Interface de aplicação **SaaS B2B**; categoria **dashboard operacional / ERP**; plataforma **web responsiva** (desktop-first, utilizável em tablet e celular) |
| Estilo visual | **Soft corporate dashboard chapado (flat)**: fundo claro com manchas azuis suaves, cartões brancos flutuantes sem borda, formas arredondadas, pílulas, menu lateral azul sólido, banner azul sólido e o **símbolo da Avante** como arte decorativa. Inspirado na arte institucional da marca |
| Paleta | Família de azuis da marca: azul institucional, céu, índigo, **marinho** (no lugar do preto), azul-claro e branco. Vermelho e âmbar só para significado (erro e alerta) |
| Tipografia | **DM Sans** (títulos e números grandes) + **Inter** (interface) + JetBrains Mono (códigos e atalhos) |
| Tema | Claro como padrão; tema escuro completo disponível |
| Tom de voz | Direto, profissional e amigável. Frases curtas, verbos de ação ("Registrar entrada", "Abrir PDV") |

---

## 2. A ideia a ser transmitida

> **"Tudo da sua empresa em um lugar, claro e sob controle."**

O design precisa fazer o dono de um pequeno ou médio negócio sentir que:

1. **Entende a situação da empresa em 5 segundos.** O Painel abre com um banner azul com uma frase que resume o dia ("Você tem 2 pendências hoje: …"), indicadores grandes e números alinhados.
2. **Chega a qualquer tarefa em 1 ou 2 cliques.** Atalhos rápidos no topo, busca global `Ctrl K`, botão "Criar" sempre visível, atalhos `Alt+1…8` e o botão "Abrir PDV" sempre no rodapé do menu.
3. **Confia no sistema.** Visual calmo, chapado e consistente, sem degradês nem cores gritantes. A cor forte (azul) aparece onde há marca, ação ou destaque. Valores financeiros sempre em fonte tabular, alinhados à direita.
4. **Reconhece a marca.** O símbolo da Avante aparece como arte gráfica, cortado pelas bordas, no banner, no menu, no login e nas telas de carregamento, como na arte institucional.
5. **Vende sem fricção no PDV.** O PDV usa a mesma identidade azul, com alvos grandes, total em destaque e teclas de atalho visíveis.

### Palavras-chave da personalidade
`confiável` · `organizado` · `moderno` · `leve` · `rápido` · `brasileiro` · `sem ruído` · `institucional`

### O que o design **não** é
- Não é uma landing page: nada de seções enormes, ilustrações ou textos longos.
- Não é colorido: sem arco-íris de categorias, sem verde, sem preto, **sem degradês** nos componentes.
- Não é glassmorphism: a única translucidez é a topbar (desfoque de 14px) e o fundo do modal.
- Não é denso como um ERP antigo: espaço para respirar entre blocos, mas tabelas continuam compactas.

---

## 3. Público e contexto de uso

| Perfil | Uso principal | Implicação no design |
|---|---|---|
| Proprietário | Painel, financeiro, relatórios | Resumos em linguagem simples, indicadores grandes, calendário financeiro |
| Gerente | Vendas, estoque, caixa, relatórios | Tabelas com filtros rápidos, exportação |
| Caixa / Operador | PDV o dia inteiro | Alvos grandes, teclado primeiro, poucas cores |
| Estoquista | Produtos, inventário | Busca por SKU/código de barras, números claros |

Perfis de acesso existentes: Proprietário, Gerente, Caixa, Operador, Estoquista.

---

## 4. Princípios de design (em ordem de prioridade)

1. **Clareza antes de estética.** Hierarquia por tamanho e peso tipográfico (DM Sans nos títulos), não por cor.
2. **Uma ação primária por tela.** Botão azul em pílula no canto superior direito. As demais ações são outline ou ghost.
3. **Cor com significado.** Azul = marca, ação e positivo. Marinho = seleção (aba ativa, segmentado ativo), avatar e cartão escuro. Céu e índigo = "a receber" e "a pagar". Vermelho = erro e destrutivo. Âmbar = pendente e alerta.
4. **Chapado.** Cores sólidas; o único degradê da interface é o fundo de manchas azuis da página.
5. **Fidelidade ao conteúdo real.** Nenhum campo, coluna ou dado é inventado. Telas sem dados mostram estado vazio com ação sugerida.
6. **Densidade onde se trabalha, respiro onde se lê.** Tabelas e formulários são compactos; o Painel e os cartões de resumo têm mais espaço.
7. **Números são cidadãos de primeira classe.** `tabular-nums`, alinhamento à direita, formato `R$ 1.234,56`.
8. **Teclado e acessibilidade.** Foco visível, atalhos, contraste WCAG AA em todos os pares de cor.
9. **Consistência absoluta.** As 113 telas usam os mesmos componentes; nenhuma tela tem estilo próprio.

---

## 5. Decisões de produto que o design já incorpora

| Antes (sistema original) | Agora (design v3) | Motivo |
|---|---|---|
| PDV em verde-petróleo, ERP em azul | **Tudo no azul da marca** | Identidade única, pedido da empresa |
| Verde para status "ativo/pago" | **Azul-claro com texto azul-escuro** | Remover verde por completo |
| Preto como cor escura | **Marinho `#102760`** | O preto não combinava com a marca |
| Degradês em cartões, menu e botões (v1/v2) | **Cores sólidas** + símbolo da Avante como detalhe | Visual mais institucional e menos "brilhante" |
| Menu branco com 3 níveis ("Mais do financeiro") | **Menu azul sólido** + **painel secundário azul-claro** "Mais do financeiro" | Uso diário no menu, o resto a 1 clique |
| PDV como item perdido no menu | **Bloco separado** no rodapé do menu: pílula marinho "Abrir PDV" com ícone e seta | Ação mais importante do dia, sempre visível |
| "Arquivados" abria modal sem ação | **Abas Ativos · Arquivados** dentro da lista | Restaurar fica a 1 clique |
| "Adicionais" sem explicação | **"Opcionais"** com exemplo | Nome autoexplicativo |
| "Receitas de produtos" | **"Fichas técnicas"** | Termo de mercado |
| Formulários longos em coluna única | **Painel lateral, grid de 2 colunas, opcionais recolhidos** | Menos rolagem |
| Painel antigo cheio de gráficos | **Painel enxuto**: banner, atalhos, indicadores, calendário financeiro, atenção + últimas ações, entradas e saídas, localização. Os demais gráficos foram para **Relatórios › Análises** | Painel focado em ação |
| Bugs visuais ("null", "20 00:00:00/11/2026") | **Corrigidos** | Qualidade |
