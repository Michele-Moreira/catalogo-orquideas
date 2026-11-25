import { useFoto } from '../hooks/useFoto'

type Props = {
  nome: string // nome do GBIF, sem "var.", que é como o iNaturalist também escreve
  id: number // id do GBIF, pra buscar a foto lá quando o iNaturalist não tiver
  grande?: boolean
}

// As três situações (carregando, sem foto, com foto) ocupam o mesmo espaço,
// então a grade não pula quando as fotos vão chegando
function FotoPlanta({ nome, id, grande = false }: Props) {
  const estado = useFoto(nome, id)
  const classe = grande ? 'foto-planta foto-grande' : 'foto-planta'

  if (estado.tipo === 'carregando') {
    return <div className={`${classe} foto-carregando`} aria-hidden="true" />
  }

  if (!estado.foto) {
    return (
      <div className={`${classe} sem-foto`}>
        <span>Sem foto</span>
      </div>
    )
  }

  return (
    <figure className={classe}>
      <img
        src={grande ? estado.foto.urlGrande : estado.foto.url}
        alt={`Foto da orquídea ${nome}`}
        loading="lazy"
      />
      <figcaption title={estado.foto.credito}>{estado.foto.credito}</figcaption>
    </figure>
  )
}

export default FotoPlanta
