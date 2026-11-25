import type { Foto, RespostaInaturalist } from '../types/inaturalist'

const ENDERECO = 'https://api.inaturalist.org/v1/taxa'

// O iNaturalist bloqueia quem pede demais ao mesmo tempo. Com 24 caixas na tela,
// sairiam 24 pedidos juntos; aqui no máximo 4 andam por vez e o resto espera na fila.
const MAXIMO_AO_MESMO_TEMPO = 4
let emAndamento = 0
const fila: (() => void)[] = []

async function esperarVez() {
  if (emAndamento < MAXIMO_AO_MESMO_TEMPO) {
    emAndamento++
    return
  }
  // Quem termina passa a vaga direto pro próximo da fila (o emAndamento não muda)
  await new Promise<void>((resolver) => fila.push(resolver))
}

function liberarVez() {
  const proximo = fila.shift()
  if (proximo) {
    proximo()
  } else {
    emAndamento--
  }
}

// A busca do iNaturalist é aproximada: pedindo "Cattleya walkeriana dolosa" ela pode trazer um híbrido
// com nome parecido. Só vale a foto se o nome bater exatamente; senão, a planta fica sem foto.
async function buscarFoto(nome: string): Promise<Foto | null> {
  await esperarVez()
  try {
    const parametros = new URLSearchParams({ q: nome, per_page: '5' })
    const resposta = await fetch(`${ENDERECO}?${parametros}`)
    if (!resposta.ok) {
      throw new Error(`iNaturalist respondeu ${resposta.status}`)
    }

    const dados: RespostaInaturalist = await resposta.json()
    const mesmaPlanta = dados.results.find((taxon) => taxon.name.toLowerCase() === nome.toLowerCase())
    const foto = mesmaPlanta?.default_photo
    // Sem licença (license_code null) quer dizer "todos os direitos reservados": não pode usar
    if (!foto || !foto.license_code) {
      return null
    }

    return {
      url: foto.medium_url,
      urlGrande: foto.medium_url.replace('/medium.', '/large.'),
      credito: foto.attribution,
    }
  } finally {
    liberarVez()
  }
}

// Cache: guarda a promessa de cada nome. Voltar pra uma página, ou duas caixas pedirem a mesma
// planta, não gera pedido novo. Se o pedido falhar, sai do cache pra poder tentar de novo depois.
const cache = new Map<string, Promise<Foto | null>>()

export function pegarFoto(nome: string) {
  const guardada = cache.get(nome)
  if (guardada) {
    return guardada
  }

  const promessa = buscarFoto(nome)
  cache.set(nome, promessa)
  promessa.catch(() => cache.delete(nome))
  return promessa
}
