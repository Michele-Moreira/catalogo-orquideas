// Só os campos do iNaturalist que o site usa
export type TaxonInaturalist = {
  name: string
  default_photo: {
    medium_url: string
    attribution: string // texto do crédito pronto: "(c) Fulano, some rights reserved (CC BY-NC)"
    license_code: string | null
  } | null
}

export type RespostaInaturalist = {
  results: TaxonInaturalist[]
}

export type Foto = {
  url: string
  urlGrande: string
  credito: string
}
