import { useEffect, useState } from 'react'
import { buscarOrquideas } from '../services/gbif'
import type { TaxonGbif } from '../types/gbif'

type Estado =
  | { tipo: 'carregando' }
  | { tipo: 'erro'; mensagem: string }
  | { tipo: 'pronto'; resultados: TaxonGbif[] }

export function useBusca(termo: string) {
  const [estado, setEstado] = useState<Estado>({ tipo: 'carregando' })

  useEffect(() => {
    let ignorar = false

    buscarOrquideas(termo)
      .then((resultados) => {
        if (ignorar) return
        setEstado({ tipo: 'pronto', resultados })
      })
      .catch(() => {
        if (ignorar) return
        setEstado({ tipo: 'erro', mensagem: 'Não deu pra buscar agora. Tenta de novo daqui a pouco.' })
      })

    return () => {
      ignorar = true
    }
  }, [termo])

  return estado
}
