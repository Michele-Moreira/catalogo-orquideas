# CLAUDE.md

Catálogo de orquídeas, ideia do pai da Mi: navegar por gênero → espécie → variedade, com foto e busca.
Escopo e plano completos em `docs/escopo.md`.

## Como trabalhar aqui

- Diferente do Séries: aqui a Mi pediu (25/11/2026) que o Jarvis escrevesse a v1 inteira e ela fizesse o
  code review. Depois da v1, volta o padrão de sempre: ela escreve, a gente explica o porquê.
- Antes de dizer que algo está certo: `npm run build`, `npm run lint` e `npx vitest run`.

## Stack

React 19 + TypeScript + Vite · React Router 7 (modo declarativo) · CSS puro · Vitest · deploy na Vercel.
As APIs (GBIF e iNaturalist) não pedem chave: não tem pasta `api/` nem proxy.

## Estrutura

| Caminho | O que é |
|---|---|
| `src/data/generos.ts` | os 4 gêneros da página inicial, com o id do GBIF |
| `src/services/gbif.ts` | pedidos ao GBIF: um táxon, os filhos (com paginação) e a busca |
| `src/services/inaturalist.ts` | foto de uma planta pelo nome, com cache em memória |
| `src/utils/limparTaxons.ts` | tira duvidosos, repetidos e lixo da lista do GBIF |
| `src/hooks/` | `useEspecies`, `useTaxon`, `useFoto`, `useBusca` (3 estados + `ignorar`) |
| `src/pages/` | `Inicio`, `GeneroPagina`, `EspeciePagina`, `BuscaPagina` |
| `vercel.json` | manda toda rota pro `index.html`, senão `/genero/<id>` dá 404 na Vercel |

## Comandos

```bash
npm run dev      # http://localhost:5173
npm run build    # tsc -b + vite build
npm run lint
npx vitest run
```

## Fluxo de entrega

- Commits em Conventional Commits (minúsculo, inglês, escopo obrigatório, sem co-autor).
- Subir pro repositório do GitHub e criar o projeto na Vercel: sempre com OK da Mi.
- Vercel: preset **Vite** sem override e Node **24.x**.
