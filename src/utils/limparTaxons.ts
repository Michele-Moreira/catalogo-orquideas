import type { TaxonGbif } from '../types/gbif'

// O GBIF manda a mesma planta mais de uma vez (com autores diferentes), plantas marcadas como duvidosas
// e itens sem nome (UNRANKED). Fica só o que é aceito, do nível pedido, um de cada nome, em ordem alfabética.
export function limparTaxons(taxons: TaxonGbif[], rank: string) {
  const vistos = new Set<string>()
  const limpos: TaxonGbif[] = []

  for (const taxon of taxons) {
    const nome = taxon.canonicalName
    if (!nome || taxon.rank !== rank || taxon.taxonomicStatus !== 'ACCEPTED' || vistos.has(nome)) {
      continue
    }
    vistos.add(nome)
    limpos.push(taxon)
  }

  return limpos.sort((a, b) => (a.canonicalName ?? '').localeCompare(b.canonicalName ?? ''))
}
