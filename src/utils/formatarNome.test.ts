import { describe, it, expect } from 'vitest'
import type { TaxonGbif } from '../types/gbif'
import { nomeCurto, nomeParaMostrar, traduzirNivel } from './formatarNome'

function taxon(canonicalName: string, rank: string): TaxonGbif {
  return { key: 1, canonicalName, scientificName: canonicalName, rank, taxonomicStatus: 'ACCEPTED' }
}

describe('nomeParaMostrar', () => {
  it('põe o "var." na variedade', () => {
    expect(nomeParaMostrar(taxon('Cattleya walkeriana dolosa', 'VARIETY'))).toBe('Cattleya walkeriana var. dolosa')
  })

  it('não muda o nome da espécie', () => {
    expect(nomeParaMostrar(taxon('Cattleya walkeriana', 'SPECIES'))).toBe('Cattleya walkeriana')
  })
})

describe('nomeCurto', () => {
  it('abrevia o gênero', () => {
    expect(nomeCurto('Cattleya walkeriana')).toBe('C. walkeriana')
  })

  it('não mexe em nome de uma palavra só', () => {
    expect(nomeCurto('Cattleya')).toBe('Cattleya')
  })
})

describe('traduzirNivel', () => {
  it('traduz o nível conhecido', () => {
    expect(traduzirNivel('SPECIES')).toBe('Espécie')
  })

  it('devolve o original quando não conhece', () => {
    expect(traduzirNivel('FORM')).toBe('FORM')
  })
})
