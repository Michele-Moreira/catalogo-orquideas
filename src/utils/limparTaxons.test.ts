import { describe, it, expect } from 'vitest'
import type { TaxonGbif } from '../types/gbif'
import { limparTaxons } from './limparTaxons'

function taxon(campos: Partial<TaxonGbif>): TaxonGbif {
  return {
    key: 1,
    canonicalName: 'Cattleya walkeriana',
    scientificName: 'Cattleya walkeriana Gardner',
    rank: 'SPECIES',
    taxonomicStatus: 'ACCEPTED',
    ...campos,
  }
}

describe('limparTaxons', () => {
  it('tira as plantas duvidosas', () => {
    const lista = [taxon({ key: 1 }), taxon({ key: 2, canonicalName: 'Cattleya dolosa', taxonomicStatus: 'DOUBTFUL' })]
    expect(limparTaxons(lista, 'SPECIES').map((t) => t.key)).toEqual([1])
  })

  it('tira o nome repetido e fica com o primeiro', () => {
    const lista = [taxon({ key: 1 }), taxon({ key: 2, scientificName: 'Cattleya walkeriana Outro autor' })]
    expect(limparTaxons(lista, 'SPECIES').map((t) => t.key)).toEqual([1])
  })

  it('tira o item sem nome (UNRANKED)', () => {
    const lista = [taxon({ key: 1 }), taxon({ key: 2, canonicalName: undefined, rank: 'UNRANKED' })]
    expect(limparTaxons(lista, 'SPECIES').map((t) => t.key)).toEqual([1])
  })

  it('fica só com o nível pedido', () => {
    const lista = [taxon({ key: 1 }), taxon({ key: 2, canonicalName: 'Cattleya walkeriana dolosa', rank: 'VARIETY' })]
    expect(limparTaxons(lista, 'VARIETY').map((t) => t.key)).toEqual([2])
  })

  it('ordena por nome', () => {
    const lista = [taxon({ key: 1, canonicalName: 'Cattleya walkeriana' }), taxon({ key: 2, canonicalName: 'Cattleya aclandiae' })]
    expect(limparTaxons(lista, 'SPECIES').map((t) => t.key)).toEqual([2, 1])
  })
})
