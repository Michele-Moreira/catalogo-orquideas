import { useEffect, useState } from 'react'
import { pegarFoto } from '../services/fotos'
import type { Foto } from '../types/foto'

type Estado =
  | { tipo: 'carregando' }
  | { tipo: 'pronto'; foto: Foto | null }

// Foto é enfeite: se o iNaturalist falhar, a planta só fica sem foto, sem mensagem de erro
export function useFoto(nome: string, id: number) {
  const [estado, setEstado] = useState<Estado>({ tipo: 'carregando' })

  useEffect(() => {
    let ignorar = false

    pegarFoto(nome, id)
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
  }, [nome, id])

  return estado
}
