import { useEffect, useState } from 'react'
import { pegarFoto } from '../services/inaturalist'
import type { Foto } from '../types/inaturalist'

type Estado =
  | { tipo: 'carregando' }
  | { tipo: 'pronto'; foto: Foto | null }

// Foto é enfeite: se o iNaturalist falhar, a planta só fica sem foto, sem mensagem de erro
export function useFoto(nome: string) {
  const [estado, setEstado] = useState<Estado>({ tipo: 'carregando' })

  useEffect(() => {
    let ignorar = false

    pegarFoto(nome)
      .then((foto) => {
        if (ignorar) return
        setEstado({ tipo: 'pronto', foto })
      })
      .catch(() => {
        if (ignorar) return
        setEstado({ tipo: 'pronto', foto: null })
      })

    return () => {
      ignorar = true
    }
  }, [nome])

  return estado
}
