import type { Foto } from '../types/foto'
import type { RespostaInaturalist } from '../types/inaturalist'
import { licencaLivre } from '../utils/licenca'

const ENDERECO = 'https://api.inaturalist.org/v1/taxa'

// A busca do iNaturalist é aproximada: pedindo "Cattleya walkeriana dolosa" ela pode trazer um híbrido
// com nome parecido. Só vale a foto se o nome bater exatamente; senão, a planta fica sem foto.
export async function buscarFotoInaturalist(nome: string): Promise<Foto | null> {
  const parametros = new URLSearchParams({ q: nome, per_page: '5' })
  const resposta = await fetch(`${ENDERECO}?${parametros}`)
  if (!resposta.ok) {
    throw new Error(`iNaturalist respondeu ${resposta.status}`)
  }

  const dados: RespostaInaturalist = await resposta.json()
  const mesmaPlanta = dados.results.find((taxon) => taxon.name.toLowerCase() === nome.toLowerCase())
  const foto = mesmaPlanta?.default_photo
  // Sem licença (license_code null) quer dizer "todos os direitos reservados": não pode usar
  if (!foto || !licencaLivre(foto.license_code)) {
    return null
  }

  return {
    url: foto.medium_url,
    urlGrande: foto.medium_url.replace('/medium.', '/large.'),
    credito: foto.attribution,
  }
}
