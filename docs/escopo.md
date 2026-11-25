# Escopo — Catálogo de Orquídeas

Ideia do pai da Mi (25/11/2026): um site pra quem não entende de orquídea achar a planta e ir navegando
por **gênero → espécie → variedade**. Escopo montado pelo techlead no mesmo dia.

## Dados

| Fonte | Pra quê | Detalhe |
|---|---|---|
| GBIF (`api.gbif.org/v1`) | gênero, espécies, variedades e busca | grátis, sem chave; usar sempre a lista oficial ("Backbone") |
| iNaturalist (`api.inaturalist.org/v1/taxa`) | foto | só foto com licença (CC); crédito embaixo da foto é obrigatório |

## Páginas (v1)

| Rota | O que mostra |
|---|---|
| `/` | as 4 caixas de gênero (Cattleya, Cymbidium, Dendrobium, Catasetum) |
| `/genero/:id` | espécies do gênero, com filtro (`?busca=`) e "mostrar mais" de 24 em 24 |
| `/especie/:id` | ficha (foto, trilha, autor) e variedades; serve também pra variedade |
| `/busca?q=` | busca no GBIF, só orquídeas, espécies e variedades |
| `*` | página não encontrada |

## Fora da v1

1. Nome popular em português (sem isso, quem busca "orquídea chocolate" não acha nada). Primeiro da v2.
2. Híbridos: o registro oficial é o da RHS, que não tem API.
3. Foto de outra fonte quando o iNaturalist não tem (várias espécies ficam "Sem foto").
4. Dicas de cultivo, mais gêneros, várias fotos por planta, favoritos.

## Armadilhas já tratadas

- Dendrobium tem 1859 filhos e o GBIF entrega 1000 por página: `pegarFilhos` pede até `endOfRecords`.
- O GBIF repete a mesma planta com autores diferentes e manda duvidosas e itens sem nome: `limparTaxons`.
- A busca do iNaturalist é aproximada: só vale a foto se o nome bater exatamente.
- Muitas fotos de uma vez: 24 por vez na tela, no máximo 4 pedidos juntos e cache por nome.
- Variedade vem sem o "var." no GBIF: `nomeParaMostrar` põe.
