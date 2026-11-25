import { afterEach, describe, it, expect, vi } from 'vitest'
import { buscarFotoInaturalist } from './inaturalist'

const fotoFalsa = {
  medium_url: 'https://exemplo.com/photos/1/medium.jpeg',
  attribution: '(c) Fulano, some rights reserved (CC BY-NC)',
  license_code: 'cc-by-nc',
}

function fingirInaturalist(results: unknown[]) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results }) }))
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('buscarFotoInaturalist', () => {
  it('devolve a foto quando o nome bate', async () => {
    fingirInaturalist([{ name: 'Cattleya walkeriana', default_photo: fotoFalsa }])
    expect(await buscarFotoInaturalist('Cattleya walkeriana')).toEqual({
      url: 'https://exemplo.com/photos/1/medium.jpeg',
      urlGrande: 'https://exemplo.com/photos/1/large.jpeg',
      credito: '(c) Fulano, some rights reserved (CC BY-NC)',
    })
  })

  it('devolve null quando só vem planta com nome parecido', async () => {
    fingirInaturalist([{ name: 'Cattleya × dolosa', default_photo: fotoFalsa }])
    expect(await buscarFotoInaturalist('Cattleya walkeriana dolosa')).toBeNull()
  })

  it('devolve null quando a planta não tem foto', async () => {
    fingirInaturalist([{ name: 'Cattleya aclandiae', default_photo: null }])
    expect(await buscarFotoInaturalist('Cattleya aclandiae')).toBeNull()
  })

  it('devolve null quando a foto tem todos os direitos reservados', async () => {
    fingirInaturalist([{ name: 'Cattleya alaorii', default_photo: { ...fotoFalsa, license_code: null } }])
    expect(await buscarFotoInaturalist('Cattleya alaorii')).toBeNull()
  })
})
