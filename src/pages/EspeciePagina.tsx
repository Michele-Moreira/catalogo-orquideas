import { useParams } from 'react-router'
import FichaPlanta from '../components/FichaPlanta'

// A key faz a ficha recomeçar do zero ao ir de uma espécie pra uma variedade dela
function EspeciePagina() {
  const { id } = useParams()
  return <FichaPlanta key={id} id={Number(id)} />
}

export default EspeciePagina
