import { afterEach, describe, it, expect, vi } from 'vitest'
import { pegarFoto } from './fotos'

// Finge as duas APIs: o endereço diz qual delas está sendo chamada
function fingirApis(inaturalist: unknown[], gbif: unknown[]) {
  const fetchFalso = vi.fn(async (endereco: string) => ({
    ok: true,
    json: async () => ({ results: endereco.includes('inaturalist') ? inaturalist : gbif }),
  }))
  vi.stubGlobal('fetch', fetchFalso)
  return fetchFalso
}

const midiaBoa = {
  type: 'StillImage',
  format: 'image/jpeg',
  identifier: 'https://exemplo.com/foto.jpg',
  license: 'lesueur caroline (cc-by-sa)',
  creator: 'lesueur caroline',
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('pegarFoto', () => {
  it('usa o GBIF quando o iNaturalist não tem a planta', async () => {
    fingirApis([], [{ media: [midiaBoa] }])
    expect(await pegarFoto('Cattleya aclandiae', 1)).toEqual({
      url: 'https://exemplo.com/foto.jpg',
      urlGrande: 'https://exemplo.com/foto.jpg',
      credito: '(c) lesueur caroline (CC BY-SA), via GBIF',
    })
  })

  it('pula foto do GBIF sem licença ou fora do https', async () => {
    fingirApis([], [{ media: [{ ...midiaBoa, license: 'All rights reserved' }, { ...midiaBoa, identifier: 'http://exemplo.com/x.jpg' }] }])
    expect(await pegarFoto('Cattleya adelinae', 2)).toBeNull()
  })

  it('não pede de novo uma planta que já buscou', async () => {
    const fetchFalso = fingirApis([], [])
    await pegarFoto('Cattleya adrienne', 3)
    await pegarFoto('Cattleya adrienne', 3)
    expect(fetchFalso).toHaveBeenCalledTimes(2) // 1 no iNaturalist + 1 no GBIF, e só
  })
})
