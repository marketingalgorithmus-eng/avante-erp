# 02 · Identidade da marca

## 1. Logo

### Construção
A logo **Avante** tem três partes, da esquerda para a direita:

1. **Símbolo (o "A")**, formado por duas peças inclinadas com cantos arredondados:
   - **Barra azul**: paralelogramo alongado que desce da esquerda-alto para a direita-baixo. Ocupa toda a altura do símbolo. Cor: `--primary`.
   - **Peça de apoio**: paralelogramo menor que sobe da esquerda-baixo para a direita, encostando na base da barra. Ocupa ~60% da altura.
2. **Palavra "vante"**, em minúsculas, azul (`--primary`), Inter 800, encostada no símbolo, de modo que o símbolo vira o "A" de "Avante".
3. **Sufixo "ERP"** (ou "PDV" no ponto de venda), em maiúsculas, pequeno, peso 700, espaçamento largo (0,2em), alinhado à base.

### SVG do símbolo (viewBox 0 0 40 32)
```svg
<svg class="logo-mark" viewBox="0 0 40 32" aria-hidden="true">
  <path class="logo-blue" d="M15.6 2h7.6c1.2 0 2.2.6 2.8 1.7L39.4 29.1c.2.5-.1.9-.6.9h-10.4c-1.4 0-2.6-.8-3.2-2L14.9 3.1c-.2-.5.1-1.1.7-1.1Z"/>
  <path class="logo-ink"  d="M10.6 13.7h8.6L11.9 28.2c-.6 1.1-1.7 1.8-3 1.8H.9c-.5 0-.8-.5-.5-.9l8.3-14.1c.4-.8 1.1-1.3 1.9-1.3Z"/>
</svg>
```
Marcação completa:
```html
<span class="logo" role="img" aria-label="Avante ERP">
  <svg class="logo-mark">…</svg>
  <span class="logo-word" aria-hidden="true">vante</span>
  <span class="logo-erp" aria-hidden="true">ERP</span>
</span>
```
```css
.logo      { display: inline-flex; align-items: flex-end; gap: 1px; line-height: 1; }
.logo-mark { display: block; width: auto; height: 26px; margin-bottom: 1px; }
.logo-word { font: 800 27px/.82 "Inter"; letter-spacing: -0.04em; color: hsl(var(--primary)); }
.logo-erp  { margin-left: 5px; font-size: 9.5px; font-weight: 700; letter-spacing: .2em; }
.logo-mark .logo-blue { fill: hsl(var(--primary)); }
```
Se houver arquivo oficial (SVG/PNG transparente) da logo, prefira o oficial. Inter é uma aproximação da fonte original.

### Variações em uso (exatamente como no protótipo)

| Contexto | Barra | Peça de apoio | "vante" | Sufixo | Tamanho |
|---|---|---|---|---|---|
| **Topbar ERP / PDV** (fundo claro) | azul `--primary` | **branca**, com realce leve (abaixo) | azul | **"ERP"/"PDV" branco**, com realce leve | símbolo 26px, "vante" 27px, sufixo 9,5px |
| Topbar no celular (< 640px) | idem | idem | azul 23px | **oculto** | símbolo 22px |
| **Login** (painel azul) | **branca** | **branca** | branca 38px | branco | símbolo 36px |
| **Telas de carregamento** | azul | marinho (`--foreground`) | — | — | só o símbolo, 30px, num quadrado branco de 64px, raio 20px, `--shadow-pop` |

**Realce leve do branco na topbar** (para o branco não sumir no fundo claro; efeito bem discreto):
```css
.topbar .logo-mark .logo-ink { fill: hsl(var(--primary-foreground));
  stroke: hsl(var(--primary) / .35); stroke-width: .6px; paint-order: stroke; }
.topbar .logo-mark { filter: drop-shadow(0 1px 2px hsl(var(--primary) / .28)); }
.topbar .logo-erp  { color: hsl(var(--primary-foreground)); opacity: 1;
  text-shadow: 0 0 1px hsl(var(--primary) / .9), 0 0 1px hsl(var(--primary) / .9), 0 1px 3px hsl(var(--primary) / .4); }
```

### Regras de uso
- Área de respiro mínima ao redor = altura do sufixo.
- Nunca distorcer, rotacionar, aplicar degradê, trocar o azul por outra cor ou pintar a peça de apoio de azul.
- Fora o realce leve acima (contorno de 0,6px a 35% e sombra de 2px), **nenhum outro efeito** na logo.
- Sobre fundo azul: tudo branco.

---

## 2. Símbolo decorativo (assinatura gráfica da v3)

O mesmo "A" da logo, **ampliado e cortado pela borda** do contêiner, como na arte institucional. Duas versões:

| Versão | Desenho | Cor típica |
|---|---|---|
| **Preenchido** (`fill`) | As duas peças chapadas | Azul-claro `--primary-tint` (`#B8D4FF`) a 38–45% sobre azul |
| **Em linhas** (`line`) | Só o contorno das duas peças, traço de 1,5px que não escala | Branco a 16–25% sobre azul; azul a 10% sobre fundo claro |

```html
<svg class="deco-a is-fill|is-line" viewBox="-1 -1 42 34" aria-hidden="true" focusable="false">
  <!-- fill: os 2 paths da logo com fill="currentColor" -->
  <!-- line: os 2 paths com fill="none" stroke="currentColor" stroke-width="1.5"
       vector-effect="non-scaling-stroke" stroke-linejoin="round" -->
</svg>
```

Onde aparece hoje (posições exatas em [04-estilos-visuais.md §12](04-estilos-visuais.md)):

| Superfície | Versões |
|---|---|
| Banner azul do Painel | preenchido + linhas |
| KPI "Vendas" (azul) | linhas |
| Menu lateral azul (canto inferior direito) | linhas, grande |
| Login (painel azul) | preenchido + linhas |
| Telas de carregamento | linhas, muito suave |

Regras: só em superfícies de marca (azul, marinho ou áreas vazias grandes), sempre **cortado pela borda**, opacidade entre 10% e 45%, no máximo 2 por superfície, **nunca** sobre tabelas, formulários ou texto denso, sempre `aria-hidden`.

---

## 3. Paleta da marca

| Nome | HEX | HSL | Papel |
|---|---|---|---|
| **Azul institucional** | **`#0A5EE6`** | 217 92% 47% | Cor da marca: menu, banner, botão primário, links, foco, gráficos, status positivo |
| Azul hover / pressionado | `#0852C9` / `#0746AB` | 217 92% 41% / 35% | Estados do azul; trilho do segmentado no banner |
| **Azul-claro** (tint) | `#B8D4FF` | 216 100% 86% | Símbolo preenchido, números destacados sobre azul |
| Azul subtle | `#E7F0FE` | 216 90% 95% | Fundos azul-claros (badge positivo, miniatura, dia com entradas) |
| **Marinho** (substitui o preto) | **`#102760`** | 223 72% 22% | Aba e segmentado ativos, avatar, cartão escuro, botão "Abrir PDV" |
| Céu | `#098BE1` | 204 92% 46% | "A receber", dia com valores iguais |
| Índigo | `#3F49D5` | 236 64% 54% | "A pagar", saídas nos gráficos, últimas ações |
| Texto | `#141D34` | 223 45% 14% | Texto principal (marinho quase preto) |
| Branco | `#FFFFFF` | 0 0% 100% | Cartões, texto sobre azul e marinho |
| Fundo | `#F1F4F9` + manchas azuis | 220 38% 96% | Fundo de todas as telas |
| Painel secundário | `#F0F6FF` | 214 100% 97% | "Mais do financeiro" |

### Cores de significado (únicas fora da família azul)
| Nome | Fundo / Texto | Uso |
|---|---|---|
| Erro / destrutivo | `#FDEDED` / `#B42318`; sólido `#D92D20` | Vencido, falha, estornar, arquivar, anular, excluir |
| Alerta | `#FDF4E2` / `#8A5300` | Atenção, estoque baixo, configuração faltando |
| Pendente | `#FFF6DB` / `#7A5A00` | Pendente, em contagem, em aberto |

### Proibido
- **Qualquer verde** (matiz 85°–175° com saturação > 20%), inclusive em "sucesso", "pago", "entrada", gráficos e botões. Positivo = azul.
- **Preto puro** (`#000`) e cinzas neutros escuros: use o marinho.
- **Degradês** em cartões, botões, menu e badges. O único degradê é o fundo de manchas da página (`--canvas-art`).
- Roxo, laranja, rosa e outras cores de categoria.
- Cores hexadecimais soltas em componentes: use sempre tokens ([03-tokens.md](03-tokens.md)).

---

## 4. Como a cor é distribuída numa tela

| Proporção | Cor | Onde |
|---|---|---|
| ~65% | Fundo claro + branco | Fundo com manchas e cartões |
| ~20% | Azul institucional | Menu lateral, banner, botão primário, links, gráficos |
| ~10% | Marinho e texto | Texto, aba ativa, avatar, cartão escuro, botão PDV |
| ~3% | Céu, índigo, azul-claro | Cartões suaves, ícones, símbolo |
| ~2% | Vermelho / âmbar | Só onde existe erro ou alerta real |

---

## 5. Tipografia da marca

- **DM Sans** (Google Fonts, 500/700/800): títulos, números grandes, banner, nomes de bloco, "Abrir PDV". Sempre com `letter-spacing: -0.03em`.
- **Inter** (400/500/600/700/800): todo o resto da interface e a palavra "vante" da logo. `font-feature-settings: "cv11", "ss01"`.
- **JetBrains Mono** (400/500): só códigos, SKUs, chaves e atalhos (`kbd`).
- Números financeiros: `font-variant-numeric: tabular-nums` sempre.

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,700;9..40,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```
