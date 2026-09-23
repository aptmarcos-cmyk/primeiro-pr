# Handoff: REINO — landing page e catálogo de camisetas

## Overview
REINO é uma marca de moda cristã ("vista o evangelho"). Este pacote entrega o sistema de identidade visual e 11 conceitos de camiseta para serem implementados na landing page que você está montando. O público é omnichannel: jovens 13–25, profissionais 25–45, famílias, líderes.

Proposta de valor: "Somos a marca REINO para todos aqueles que buscam um propósito e querem se vestir bem com significado." Tom: convite, não imposição. Fé viva, não dogma morto. Comunidade, não isolamento.

## About the Design Files
Os arquivos `.dc.html` deste bundle são **referências de design criadas em HTML** — protótipos que mostram aparência e comportamento pretendidos, não código de produção para copiar. A tarefa é **recriar estes designs no ambiente do codebase alvo** (React/Next, Vue, etc.) usando os padrões e bibliotecas já estabelecidos nele. Se ainda não houver ambiente definido, escolha o framework mais adequado e implemente ali.

Os dados dos produtos estão em `products.json` e os tokens em `design-tokens.json` — importe esses dois arquivos direto no codebase em vez de transcrever valores do HTML. Eles são a fonte de verdade para integração entre este projeto de design e a landing page.

## Fidelity
**High-fidelity.** Cores, tipografia, espaçamentos e estados finais estão definidos. Recrie fielmente usando as bibliotecas do codebase. A única parte deliberadamente aproximada é o mockup vetorial da camiseta (desenhado em CSS clip-path): ele é placeholder de foto de produto — troque por foto real quando existir, mantendo o enquadramento 4:5.

## Screens / Views

### 1. Grade de produtos (bloco principal da landing)
- **Purpose**: usuário navega os 11 modelos, entende mensagem/versículo de cada um e vai para o produto.
- **Layout**: `display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 28px;` dentro de container `max-width: 1320px; padding: 0 56px; margin: 0 auto`. Cada card `min-width: 0` (obrigatório para não estourar o grid).
- **Card**: fundo `#FFFFFF`, borda `1px solid #E4DDCD`, sem raio. Duas zonas:
  1. **Zona do mockup** — fundo `#EDE9DE` (claro), `#14130F` (linhas escuras), `#E9E1D6` (Páscoa) ou `#E6E4D6` (verde); `padding: 34px`; flex centralizado. Dentro, a silhueta da camiseta (specs em `design-tokens.json > shirt_mockup`).
  2. **Zona de texto** — `padding: 28px`. Nome do produto em Instrument Serif 30px + número do conceito em IBM Plex Mono 11px `#B45A3C` (linha flex, `justify-content: space-between`, `align-items: baseline`). Abaixo, fileira de badges (`gap: 8px`, `flex-wrap: wrap`), depois dois parágrafos DM Sans 15px/1.6 `#46443C`: descrição visual e argumento de venda (rótulo `<strong>Vende porque</strong>`).
- **Badges**: IBM Plex Mono 10px, tracking .14em, uppercase, `padding: 6px 10px`, sem raio. Variantes: sólido preto (`#14130F`/`#F4F1EA`), sólido terracota (`#B45A3C`/`#FFFFFF`), sólido verde (`#4A5D42`/`#FFFFFF`), outline neutro (`1px solid #CFC8B8`), outline terracota (`1px solid #B45A3C`, texto `#8E4229`), outline verde (`1px solid #4A5D42`, texto `#3B4A35`), sólido claro premium (`#EBE6D9`/`#14130F`).

### 2. Hero
- H1 Instrument Serif 84px, `line-height: .94`, `letter-spacing: -.02em`, segunda linha em itálico.
- Eyebrow acima: IBM Plex Mono 12px, tracking .22em, uppercase, `#B45A3C`.
- Lead DM Sans 19px/1.6 `#46443C`, `max-width: 640px`, `text-wrap: pretty`.
- Fundo `#F4F1EA`. Padding `88px 56px 56px`.

### 3. Ficha técnica (tabela de especificações)
- Wrapper com `overflow-x: auto`, borda `1px solid #DED7C7`, fundo branco. Tabela `min-width: 900px`, `border-collapse: collapse`, fonte 13px.
- Header: fundo `#14130F`, texto `#F4F1EA`, IBM Plex Mono 10px tracking .14em uppercase weight 400, `padding: 14px 16px`.
- Linhas: `border-top: 1px solid #EFE9DA`, zebra `#FCFAF4` nas pares, `padding: 13px 16px`. Coluna do número em IBM Plex Mono `#B45A3C`; nome em weight 700.
- Colunas: #, Design, Mensagem, Público, Local, Base/tinta, Estilo, Técnica. Dados em `products.json`.

### 4. Identidade visual (referência)
`REINO Brand Identity.dc.html` contém logo (3 versões), paleta, sistema tipográfico, 12 ícones, botões, card, badges, textura e aplicações (post 1200×1200, story 1080×1920, camiseta, tote bag). Specs em `design-tokens.json > logo / icons`.

## Interactions & Behavior
- **Botão primário**: default `#14130F` → hover `#B45A3C` → active `#8E4229` + `translateY(1px)`. Sem transição longa; 120–150ms ease-out é suficiente.
- **Botão secundário**: outline preto → hover preenche preto com texto off-white.
- **Card de produto**: sem hover elaborado. Se quiser feedback, escureça a borda para `#CFC8B8` e eleve com `box-shadow: 0 8px 24px -12px rgba(20,19,15,.18)`.
- **Responsivo**: o grid é fluido via `auto-fit/minmax(340px,1fr)`; abaixo de 720px reduza o padding lateral de 56px para 24px e o H1 de 84px para 48px. Mockups nunca recebem largura fixa — só `max-width: 300px`.
- Sem estados de loading/erro no escopo atual (página estática). Newsletter, se incluída, precisa de validação de e-mail e estado de sucesso.

## State Management
A grade é estática: renderize de `products.json`. Estado necessário apenas se adicionar:
- `filtroPublico` (jovem / profissional / família / líder) — filtra `products[].publico`.
- `modeloSelecionado` para modal ou página de produto (`slug` como rota: `/camiseta/[slug]`).
- Carrinho, caso conecte e-commerce — fora do escopo deste handoff.

## Design Tokens
Ver `design-tokens.json` (completo e machine-readable). Resumo:
- Cores: `#14130F` preto Reino, `#F4F1EA` off-white, `#B45A3C` terracota, `#4A5D42` verde musgo, `#FFFFFF` branco. Apoio: `#46443C`, `#6A675C`, `#E4DDCD`, `#DED7C7`, `#EDE9DE`, `#71210E` (Páscoa).
- Proporção de uso: 60% off-white/branco, 25% preto, 10% terracota, 5% verde.
- Tipografia: Instrument Serif (display), DM Sans (body), IBM Plex Mono (caption/referência bíblica). Import Google Fonts em `design-tokens.json > googleFonts`.
- Espaçamento: escala de 4 — 6, 8, 10, 12, 14, 18, 22, 28, 34, 56, 72, 88px.
- Raio: 0 em tudo, exceto pills de tag (`999px`) e a gola do mockup.
- Contraste: tinta em opacidade cheia sempre; nunca texto com alpha sobre base colorida.

## Assets
Nenhuma imagem bitmap. Tudo é tipografia + CSS (`clip-path`, `box-shadow`, gradientes). As fontes vêm do Google Fonts. Os ícones e o logo são formas CSS documentadas em `design-tokens.json` — se preferir SVG no codebase, converta os polígonos `clip-path` para `<path>` mantendo as proporções.

Quando houver fotografia de produto: enquadramento 4:5, fundo neutro claro (`#EDE9DE`) ou preto (`#14130F`) conforme a base da peça, peça centralizada, sem modelo cortado na altura do peito.

## Files
- `REINO 10 Camisetas.dc.html` — 11 conceitos de camiseta + ficha técnica (grade, cards, badges, tabela).
- `REINO Brand Identity.dc.html` — logo, paleta, tipografia, ícones, componentes, aplicações.
- `products.json` — os 11 produtos (fonte de verdade para a landing).
- `design-tokens.json` — tokens de cor, tipografia, botões, mockup, logo, produção.
- `support.js` — runtime dos protótipos. Necessário apenas para abrir os `.dc.html` localmente; não vai para produção.

## Como manter os dois lados integrados
1. `products.json` e `design-tokens.json` são o contrato. A landing lê esses arquivos; este projeto de design os gera.
2. Mudança de conteúdo (frase, versículo, público, cor de base) → eu atualizo aqui e reexporto os dois JSON; você faz o pull.
3. Mudança de layout/visual (novo card, nova seção) → eu atualizo o `.dc.html` e a seção correspondente deste README.
4. Não edite os JSON só do lado do código: divergência entre catálogo e design é o que quebra a integração. Se precisar de um campo novo (preço, SKU, estoque, tamanhos), me diga o nome do campo e eu o adiciono ao schema aqui.

### Campos ausentes de propósito
`preco`, `sku`, `tamanhos`, `estoque`, `imagens` não estão no schema porque são dados comerciais, não de design. Adicione no seu lado ou peça que eu inclua os campos vazios para padronizar as chaves.
