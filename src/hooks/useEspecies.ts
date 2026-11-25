import { useEffect, useState } from 'react'
import { pegarFilhos, pegarTaxon } from '../services/gbif'
import type { TaxonGbif } from '../types/gbif'
import { limparTaxons } from '../utils/limparTaxons'
import { mensagemDeErro } from '../utils/mensagemDeErro'

type Estado =
  | { tipo: 'carregando' }
  | { tipo: 'erro'; mensagem: string }
  | { tipo: 'pronto'; genero: TaxonGbif; especies: TaxonGbif[] }

export function useEspecies(id: number) {
  const [estado, setEstado] = useState<Estado>({ tipo: 'carregando' })

  useEffect(() => {
    let ignorar = false

    // Os dois pedidos saem juntos: o nome do gênero não depende da lista, e vice-versa
    Promise.all([pegarTaxon(id), pegarFilhos(id)])
      .then(([genero, filhos]) => {
        if (ignorar) return
        setEstado({ tipo: 'pronto', genero, especies: limparTaxons(filhos, 'SPECIES') })
      })
      .catch((erro) => {
        if (ignorar) return
        setEstado({ tipo: 'erro', mensagem: mensagemDeErro(erro, 'Gênero') })
      })

    return () => {
      ignorar = true
    }
  }, [id])

  return estado
}
