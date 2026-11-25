import type { Genero } from '../types/genero'

// Gêneros em destaque na página inicial (os 4 primeiros + os que o pai da Mi pediu).
// Ids conferidos em 25/11/2026: api.gbif.org/v1/species/match?name=<nome>&rank=GENUS&family=Orchidaceae
export const generos: Genero[] = [
  {
    id: 2800821,
    nome: 'Cattleya',
    descricao: 'A "rainha das orquídeas": flores grandes e perfumadas, muitas nativas do Brasil.',
  },
  {
    id: 2782293,
    nome: 'Cymbidium',
    descricao: 'Flores que duram semanas em hastes longas. Vem da Ásia e da Austrália.',
  },
  {
    id: 2821327,
    nome: 'Dendrobium',
    descricao: 'Um dos maiores gêneros de orquídea, espalhado da Ásia até a Oceania.',
  },
  {
    id: 2803699,
    nome: 'Catasetum',
    descricao: 'Tem flor masculina e feminina diferentes. Muitas espécies nascem no Brasil.',
  },
  {
    id: 2804680,
    nome: 'Phalaenopsis',
    descricao: 'A "orquídea-borboleta", a mais vendida em floricultura. Vem da Ásia.',
  },
  {
    id: 2783121,
    nome: 'Vanda',
    descricao: 'Asiática, de raízes aéreas grossas. Muita gente cultiva sem vaso, pendurada.',
  },
  {
    id: 5297341,
    nome: 'Epidendrum',
    descricao: 'Um dos maiores gêneros das Américas, com flores pequenas em cachos.',
  },
  {
    id: 2825779,
    nome: 'Maxillaria',
    descricao: 'Muito comum nas matas do Brasil, com flores pequenas e às vezes perfumadas.',
  },
]
