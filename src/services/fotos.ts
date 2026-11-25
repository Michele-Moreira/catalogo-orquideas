import type { Foto } from '../types/foto'
import { buscarFotoGbif } from './gbif'
import { buscarFotoInaturalist } from './inaturalist'

// As APIs bloqueiam quem pede demais ao mesmo tempo. Com 24 caixas na tela,
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

// Primeiro o iNaturalist (fotos melhores, quase sempre da planta florida).
// Se ele não tiver, tenta as fotos de observação do GBIF.
async function buscarFoto(nome: string, id: number) {
  await esperarVez()
  try {
    return (await buscarFotoInaturalist(nome)) ?? (await buscarFotoGbif(id))
  } finally {
    liberarVez()
  }
}

// Cache: guarda a promessa de cada planta. Voltar pra uma página, ou duas caixas pedirem a mesma
// planta, não gera pedido novo. Se o pedido falhar, sai do cache pra poder tentar de novo depois.
const cache = new Map<number, Promise<Foto | null>>()

export function pegarFoto(nome: string, id: number) {
  const guardada = cache.get(id)
  if (guardada) {
    return guardada
  }

  const promessa = buscarFoto(nome, id)
  cache.set(id, promessa)
  promessa.catch(() => cache.delete(id))
  return promessa
}
