# 02 · Identidade da marca

## 1. Logo

### Construção
A logo **Avante** tem três partes, da esquerda para a direita:

1. **Símbolo (o "A")**, formado por duas peças inclinadas:
   - **Barra azul**: um paralelogramo alongado que desce **da esquerda-alto para a direita-baixo**, com cantos arredondados. Ocupa toda a altura do símbolo. Cor: Azul Avante.
   - **Peça de apoio**: um paralelogramo menor, mais baixo, que sobe **da esquerda-baixo para a direita**, encostando na base da barra azul. Ocupa cerca de 60% da altura (do meio até a base). Cor: **tinta (preto)** no tema claro e **branco** no tema escuro ou sobre fundo azul.
2. **Palavra "vante"**, em minúsculas, azul, peso extra-bold (800), letras arredondadas e geométricas, encostada no símbolo, de modo que o símbolo vira o "A" de "Avante".
3. **Sufixo "ERP"** (ou "PDV" no ponto de venda), em maiúsculas, pequeno (~1/3 da altura do "vante"), peso 700, espaçamento entre letras largo (0,2em), alinhado à linha de base. Cor: tinta a 75% no tema claro e branco no escuro.

### SVG do símbolo (viewBox 0 0 40 32), usado no protótipo
```svg
<svg viewBox="0 0 40 32" aria-hidden="true">
  <!-- barra azul -->
  <path class="logo-blue" d="M15.6 2h7.6c1.2 0 2.2.6 2.8 1.7L39.4 29.1c.2.5-.1.9-.6.9h-10.4c-1.4 0-2.6-.8-3.2-2L14.9 3.1c-.2-.5.1-1.1.7-1.1Z"/>
  <!-- peça de apoio (tinta no claro / branco no escuro) -->
  <path class="logo-ink" d="M10.6 13.7h8.6L11.9 28.2c-.6 1.1-1.7 1.8-3 1.8H.9c-.5 0-.8-.5-.5-.9l8.3-14.1c.4-.8 1.1-1.3 1.9-1.3Z"/>
</svg>
```
- `.logo-blue { fill: hsl(var(--primary)) }`
- `.logo-ink { fill: currentColor }`, com o elemento pai herdando `color: hsl(var(--foreground))`.
- A palavra "vante" é texto HTML: `font: 800 27px Inter; letter-spacing: -0.04em; color: hsl(var(--primary))`. **Se houver arquivo oficial (SVG/PNG transparente) da logo, prefira o oficial.** A fonte Inter é só uma aproximação da fonte original.

### Tamanhos e variações
| Contexto | Altura do símbolo | "vante" | Sufixo |
|---|---|---|---|
| Topbar ERP | 26px | 27px | `ERP` 9,5px |
| Topbar PDV | 26px | 27px | `PDV` 9,5px |
| Celular (< 640px) | 22px | 23px | oculto |
| Login (painel azul) | 36px | 38px | todo branco sobre gradiente |
| Telas de transição | 30px (só o símbolo, num quadrado branco de 64px, raio 20px) | — | — |

### Regras de uso
- Área de respiro mínima ao redor = altura do sufixo "ERP".
- Nunca: distorcer, rotacionar, aplicar sombra, contorno ou gradiente na logo, trocar o azul por outra cor, ou usar a peça de apoio em azul.
- Sobre fundo azul (gradiente da marca): tudo branco.
- Sobre fundo escuro: barra azul + peça branca + "vante" azul + sufixo branco (igual à logo oficial em fundo preto).

---

## 2. Paleta da marca

| Nome | HEX | HSL | Papel |
|---|---|---|---|
| **Azul Avante** | `#0A5EDB` | 216 91% 45% | Cor da marca. Ações primárias, links, foco, gráficos, status positivo, gradiente de destaque. Amostra da logo: `#0A5CDB` (claro) e `#005AEC` (versão em fundo preto) |
| **Tinta** (preto da logo) | `#12151C` | 222 22% 9% | Texto principal, item ativo do menu, abas ativas, cartão escuro, avatar |
| **Branco** | `#FFFFFF` | 0 0% 100% | Cartões, texto sobre azul/tinta |
| Canvas | `#F0F1F4` | 225 16% 95% | Fundo da aplicação (cinza frio muito claro) |

### Cores de significado (únicas fora da marca)
| Nome | Fundo / Texto | Uso |
|---|---|---|
| Erro / destrutivo | `#FDEDED` / `#B42318`; sólido `#D92D20` | Vencido, falha, estornar, arquivar, anular, excluir |
| Alerta / pendente | `#FDF4E2` / `#8A5300` e `#FFF6DB` / `#7A5A00` | Atenção, pendente, rascunho a enviar, estoque baixo |

### Proibido
- **Qualquer verde** (inclusive em "sucesso", "pago", "entrada", gráficos e botões). Positivo = azul.
- Roxo, laranja, rosa, ciano e outras cores de categoria.
- Cores hexadecimais soltas no código de componentes: use sempre tokens (ver 03-tokens.md).
- Gradientes além dos dois oficiais (`--gradient-brand` e `--gradient-ink`).

---

## 3. Como a cor é distribuída numa tela (regra 70 / 20 / 8 / 2)

| Proporção | Cor | Onde |
|---|---|---|
| ~70% | Canvas + branco | Fundo e cartões |
| ~20% | Tinta e cinzas | Texto, ícones, bordas sutis, item ativo do menu |
| ~8% | Azul | Botão primário, links, gráficos, badges positivos, 1 cartão em destaque |
| ~2% | Vermelho / âmbar | Só onde existe erro ou alerta real |

---

## 4. Tipografia da marca

- **Inter** (Google Fonts), pesos 400, 500, 600, 700 e 800. É a fonte da interface inteira.
- **JetBrains Mono** (400 e 500) só para códigos, SKUs, chaves e atalhos de teclado (`kbd`).
- Ativar `font-feature-settings: "cv11", "ss01"` (letras mais legíveis no Inter).
- Números financeiros: `font-variant-numeric: tabular-nums` sempre.
