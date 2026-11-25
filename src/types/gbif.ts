// Só os campos do GBIF que o site usa. O GBIF manda muito mais, mas o TypeScript só precisa saber destes.
export type Rank = 'FAMILY' | 'GENUS' | 'SPECIES' | 'SUBSPECIES' | 'VARIETY' | 'FORM' | 'UNRANKED'

export type TaxonGbif = {
  key: number
  canonicalName?: string // nome sem autor ("Cattleya walkeriana"); o lixo UNRANKED vem sem ele
  scientificName: string // nome com autor ("Cattleya walkeriana Gardner")
  authorship?: string
  rank: Rank | string
  taxonomicStatus: string // ACCEPTED, DOUBTFUL, SYNONYM...
  family?: string
  genus?: string
  genusKey?: number
  species?: string
  speciesKey?: number
}

// Toda lista do GBIF vem em páginas
export type PaginaGbif = {
  offset: number
  limit: number
  endOfRecords: boolean
  count?: number
  results: TaxonGbif[]
}

// Registro de alguém que viu a planta (no mato, num orquidário...), com as fotos que tirou
export type MidiaGbif = {
  type?: string
  format?: string
  identifier?: string
  license?: string
  creator?: string
  rightsHolder?: string
}

export type PaginaRegistrosGbif = {
  results: { media?: MidiaGbif[] }[]
}
