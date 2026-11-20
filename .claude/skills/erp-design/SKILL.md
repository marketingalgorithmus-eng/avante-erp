---
name: erp-design
description: Sistema de design, arquitetura de UI/UX, auditoria visual e padrões de componentes para telas de ERP. Use sempre que criar, editar ou revisar telas, tabelas, formulários e dashboards do sistema.
---

# ERP Design System & UI Guidelines

## 1. Direção Estética e Densidade
- Evite layouts esparsos de landing page, sombras exageradas ou excesso de bordas arredondadas.
- Adote alta densidade de informação com hierarquia visual clara (estilo Linear, Stripe Dashboard ou SAP Fiori moderno).
- Priorize legibilidade rápida, escaneabilidade e redução de cliques para operadores que usam o sistema o dia inteiro.

## 2. Tokens de Design (Cores, Tipografia e Espaçamento)
- Nunca use cores hexadecimais soltas (hardcoded); utilize exclusivamente tokens semânticos (`bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`).
- Use escala de espaçamento compacta (`4px`, `8px`, `12px`, `16px`) dentro de tabelas, cards de filtro e formulários.
- Aplique `font-variant-numeric: tabular-nums` (ou classe `tabular-nums`) em todos os valores monetários, quantidades, impostos, datas e códigos.
- Use cores de status padronizadas e discretas (badges com fundo suave e texto contrastante) para estados como Pendente, Aprovado, Faturado e Cancelado.

## 3. Padrões de Componentes de ERP
- **Tabelas de Dados:** Cabeçalho fixo, altura de linha compacta (`36px` a `44px`), textos alinhados à esquerda, números/valores alinhados à direita, ações por linha agrupadas à direita e suporte a seleção múltipla e paginação.
- **Filtros e Busca:** Barra de busca rápida + filtros principais visíveis acima da tabela, com opção de limpar filtros em 1 clique.
- **Formulários Longos:** Agrupe campos relacionados em seções ou abas lógicas (ex.: Dados Gerais, Fiscal, Endereço, Financeiro). Labels sempre acima dos inputs e mensagens de erro claras abaixo do campo.
- **Ações:** Botão primário único no canto superior direito da tela; ações destrutivas sempre exigem modal de confirmação.

## 4. Auditoria e Polimento
Antes de finalizar qualquer tela, revise:
1. Todos os estados estão cobertos? (Loading/Skeleton, Empty State com ação sugerida, Erro e Dados carregados).
2. Os componentes base do projeto estão sendo reutilizados em vez de HTML/CSS duplicado?
3. Há contraste suficiente e navegação funcional por teclado (`Tab` e `Enter`) nos formulários?
