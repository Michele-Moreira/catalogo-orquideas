import type { Genero } from '../types/genero'

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
]
