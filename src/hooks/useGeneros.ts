import { useEffect, useState } from 'react'
import { pegarFilhos } from '../services/gbif'
import type { TaxonGbif } from '../types/gbif'
import { limparTaxons } from '../utils/limparTaxons'
import { mensagemDeErro } from '../utils/mensagemDeErro'

const ID_ORQUIDEAS = 7689 // família Orchidaceae no GBIF

type Estado =
  | { tipo: 'carregando' }
  | { tipo: 'erro'; mensagem: string }
  | { tipo: 'pronto'; generos: TaxonGbif[] }

// A família tem mais de 4000 filhos no GBIF (5 páginas), mas a maioria é nome antigo ou duvidoso:
// depois da limpeza ficam uns 840 gêneros
export function useGeneros() {
  const [estado, setEstado] = useState<Estado>({ tipo: 'carregando' })

  useEffect(() => {
    let ignorar = false

    pegarFilhos(ID_ORQUIDEAS)
      .then((filhos) => {
        if (ignorar) return
        setEstado({ tipo: 'pronto', generos: limparTaxons(filhos, 'GENUS') })
      })
      .catch((erro) => {
        if (ignorar) return
        setEstado({ tipo: 'erro', mensagem: mensagemDeErro(erro, 'Lista de gêneros') })
      })

    return () => {
      ignorar = true
    }
  }, [])

  return estado
}
