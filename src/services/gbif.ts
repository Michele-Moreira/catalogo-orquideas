import type { Foto } from '../types/foto'
import type { MidiaGbif, PaginaGbif, PaginaRegistrosGbif, TaxonGbif } from '../types/gbif'
import { licencaLivre, nomeDaLicenca } from '../utils/licenca'

const ENDERECO = 'https://api.gbif.org/v1'

// O GBIF junta várias listas de plantas; a "Backbone" é a oficial dele. Usar sempre ela
// faz o id de uma espécie ser o mesmo na busca, na ficha e na lista de filhos.
const LISTA_OFICIAL = 'd7dddbf4-2cf0-4f39-9b2a-bb099caae36c'
const ID_ORQUIDEAS = 7689 // família Orchidaceae

// O GBIF entrega no máximo 1000 itens por página
const POR_PAGINA = 1000

// Erro que guarda o status: 404 ("não existe") pede mensagem diferente de 500 ("o GBIF caiu")
export class ErroGbif extends Error {
  status: number

  constructor(status: number) {
    super(`GBIF respondeu ${status}`)
    this.status = status
  }
}

async function pedir<T>(caminho: string, parametros: URLSearchParams = new URLSearchParams()): Promise<T> {
  const resposta = await fetch(`${ENDERECO}/${caminho}?${parametros}`)

  if (!resposta.ok) {
    throw new ErroGbif(resposta.status)
  }

  return resposta.json()
}

export function pegarTaxon(id: number) {
  return pedir<TaxonGbif>(`species/${id}`)
}

// Dendrobium tem mais de 1800 filhos: com um pedido só, a lista viria cortada em 1000 sem dar erro.
// Por isso pede página por página até o GBIF avisar que acabou (endOfRecords).
export async function pegarFilhos(id: number) {
  const todos: TaxonGbif[] = []
  let offset = 0
  let acabou = false

  while (!acabou) {
    const parametros = new URLSearchParams({ limit: String(POR_PAGINA), offset: String(offset) })
    const pagina = await pedir<PaginaGbif>(`species/${id}/children`, parametros)

    todos.push(...pagina.results)
    offset += pagina.results.length
    acabou = pagina.endOfRecords || pagina.results.length === 0
  }

  return todos
}

// Busca só orquídeas (espécies e variedades) aceitas, na lista oficial
export async function buscarOrquideas(termo: string) {
  const parametros = new URLSearchParams({
    q: termo,
    datasetKey: LISTA_OFICIAL,
    highertaxonKey: String(ID_ORQUIDEAS),
    status: 'ACCEPTED',
    limit: '100',
  })
  parametros.append('rank', 'SPECIES')
  parametros.append('rank', 'VARIETY')

  const pagina = await pedir<PaginaGbif>('species/search', parametros)
  return pagina.results
}

// Serve de foto: imagem comum (as de "dzi" são de visualizador de herbário), em https
// (senão o navegador bloqueia no site publicado) e com licença livre
function midiaServe(midia: MidiaGbif) {
  return (
    midia.type === 'StillImage' &&
    (midia.format === 'image/jpeg' || midia.format === 'image/png') &&
    midia.identifier?.startsWith('https://') &&
    licencaLivre(midia.license)
  )
}

// Segunda fonte de foto, quando o iNaturalist não tem. Só registros de observação (HUMAN_OBSERVATION):
// as fotos de herbário (planta seca) pesam de 8 a 17 MB cada, pesadas demais pra uma caixa de 200px.
export async function buscarFotoGbif(id: number): Promise<Foto | null> {
  const parametros = new URLSearchParams({
    taxonKey: String(id),
    mediaType: 'StillImage',
    basisOfRecord: 'HUMAN_OBSERVATION',
    limit: '20',
  })
  const pagina = await pedir<PaginaRegistrosGbif>('occurrence/search', parametros)
  const midia = pagina.results.flatMap((registro) => registro.media ?? []).find(midiaServe)
  if (!midia?.identifier || !midia.license) {
    return null
  }

  const autor = midia.creator ?? midia.rightsHolder ?? 'autor desconhecido'
  return {
    url: midia.identifier,
    urlGrande: midia.identifier,
    credito: `(c) ${autor} (${nomeDaLicenca(midia.license)}), via GBIF`,
  }
}
