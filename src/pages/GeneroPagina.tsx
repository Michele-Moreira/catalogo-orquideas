import { useParams } from 'react-router'
import ListaEspecies from '../components/ListaEspecies'

// A key com o id faz o React montar a lista do zero ao trocar de gênero,
// em vez de mostrar por um instante as espécies do gênero anterior
function GeneroPagina() {
  const { id } = useParams()
  return <ListaEspecies key={id} id={Number(id)} />
}

export default GeneroPagina
