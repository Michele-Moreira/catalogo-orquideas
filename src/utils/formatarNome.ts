import type { TaxonGbif } from '../types/gbif'

// O GBIF escreve variedade sem o "var." ("Cattleya walkeriana dolosa"), mas o jeito certo de mostrar
// é "Cattleya walkeriana var. dolosa".
export function nomeParaMostrar(taxon: TaxonGbif) {
  const nome = taxon.canonicalName ?? taxon.scientificName
  if (taxon.rank !== 'VARIETY') {
    return nome
  }

  const partes = nome.split(' ')
  const variedade = partes.pop()
  return `${partes.join(' ')} var. ${variedade}`
}

// Na lista de um gênero, repetir "Cattleya" em toda caixa só ocupa espaço: mostra "C. walkeriana"
export function nomeCurto(nome: string) {
  const [genero, ...resto] = nome.split(' ')
  if (resto.length === 0) {
    return nome
  }
  return `${genero[0]}. ${resto.join(' ')}`
}

const nomesDoNivel: Record<string, string> = {
  GENUS: 'Gênero',
  SPECIES: 'Espécie',
  VARIETY: 'Variedade',
}

export function traduzirNivel(rank: string) {
  return nomesDoNivel[rank] ?? rank
}
