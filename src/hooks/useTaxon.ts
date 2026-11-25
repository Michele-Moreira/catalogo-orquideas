import { useEffect, useState } from 'react'
import { pegarFilhos, pegarTaxon } from '../services/gbif'
import type { TaxonGbif } from '../types/gbif'
import { limparTaxons } from '../utils/limparTaxons'
import { mensagemDeErro } from '../utils/mensagemDeErro'

type Estado =
  | { tipo: 'carregando' }
  | { tipo: 'erro'; mensagem: string }
  | { tipo: 'pronto'; taxon: TaxonGbif; variedades: TaxonGbif[] }

// Serve pra espécie e pra variedade: o id do GBIF vale pra qualquer nível.
// A variedade só volta com a lista de variedades vazia.
export function useTaxon(id: number) {
  const [estado, setEstado] = useState<Estado>({ tipo: 'carregando' })

  useEffect(() => {
    let ignorar = false

    Promise.all([pegarTaxon(id), pegarFilhos(id)])
      .then(([taxon, filhos]) => {
        if (ignorar) return
        setEstado({ tipo: 'pronto', taxon, variedades: limparTaxons(filhos, 'VARIETY') })
      })
      .catch((erro) => {
        if (ignorar) return
        setEstado({ tipo: 'erro', mensagem: mensagemDeErro(erro, 'Planta') })
      })

    return () => {
      ignorar = true
    }
  }, [id])

  return estado
}
