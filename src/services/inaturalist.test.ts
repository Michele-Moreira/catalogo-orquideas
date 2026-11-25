import { afterEach, describe, it, expect, vi } from 'vitest'
import { pegarFoto } from './inaturalist'

const fotoFalsa = {
  medium_url: 'https://exemplo.com/photos/1/medium.jpeg',
  attribution: '(c) Fulano, some rights reserved (CC BY-NC)',
  license_code: 'cc-by-nc',
}

function fingirInaturalist(results: unknown[]) {
  const fetchFalso = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results }) })
  vi.stubGlobal('fetch', fetchFalso)
  return fetchFalso
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('pegarFoto', () => {
  it('devolve a foto quando o nome bate', async () => {
    fingirInaturalist([{ name: 'Cattleya walkeriana', default_photo: fotoFalsa }])
    expect(await pegarFoto('Cattleya walkeriana')).toEqual({
      url: 'https://exemplo.com/photos/1/medium.jpeg',
      urlGrande: 'https://exemplo.com/photos/1/large.jpeg',
      credito: '(c) Fulano, some rights reserved (CC BY-NC)',
    })
  })

  it('devolve null quando só vem planta com nome parecido', async () => {
    fingirInaturalist([{ name: 'Cattleya × dolosa', default_photo: fotoFalsa }])
    expect(await pegarFoto('Cattleya walkeriana dolosa')).toBeNull()
  })

  it('devolve null quando a planta não tem foto', async () => {
    fingirInaturalist([{ name: 'Cattleya aclandiae', default_photo: null }])
    expect(await pegarFoto('Cattleya aclandiae')).toBeNull()
  })

  it('devolve null quando a foto tem todos os direitos reservados', async () => {
    fingirInaturalist([{ name: 'Cattleya alaorii', default_photo: { ...fotoFalsa, license_code: null } }])
    expect(await pegarFoto('Cattleya alaorii')).toBeNull()
  })

  it('não pede de novo um nome que já buscou', async () => {
    const fetchFalso = fingirInaturalist([{ name: 'Cymbidium aloifolium', default_photo: fotoFalsa }])
    await pegarFoto('Cymbidium aloifolium')
    await pegarFoto('Cymbidium aloifolium')
    expect(fetchFalso).toHaveBeenCalledTimes(1)
  })
})
