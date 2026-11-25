import { afterEach, describe, it, expect, vi } from 'vitest'
import { ErroGbif, pegarFilhos } from './gbif'

// Finge o GBIF: cada chamada do fetch devolve a próxima página da lista
function fingirGbif(paginas: { results: { key: number }[]; endOfRecords: boolean }[]) {
  const fetchFalso = vi.fn()
  for (const pagina of paginas) {
    fetchFalso.mockResolvedValueOnce({ ok: true, json: async () => pagina })
  }
  vi.stubGlobal('fetch', fetchFalso)
  return fetchFalso
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('pegarFilhos', () => {
  it('junta as páginas até o GBIF avisar que acabou', async () => {
    const fetchFalso = fingirGbif([
      { results: [{ key: 1 }, { key: 2 }], endOfRecords: false },
      { results: [{ key: 3 }], endOfRecords: true },
    ])

    const filhos = await pegarFilhos(2821327)

    expect(filhos.map((f) => f.key)).toEqual([1, 2, 3])
    expect(fetchFalso).toHaveBeenCalledTimes(2)
    expect(fetchFalso.mock.calls[1][0]).toContain('offset=2')
  })

  it('para quando vem uma página vazia, mesmo sem o aviso', async () => {
    fingirGbif([{ results: [], endOfRecords: false }])
    expect(await pegarFilhos(1)).toEqual([])
  })

  it('lança ErroGbif com o status quando a resposta dá erro', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }))
    await expect(pegarFilhos(1)).rejects.toBeInstanceOf(ErroGbif)
  })
})
