import { Link } from 'react-router'
import { useEspecies } from '../hooks/useEspecies'
import { nomeCurto } from '../utils/formatarNome'
import Carregando from './Carregando'
import MensagemErro from './MensagemErro'

type Props = {
  id: number
}

function ListaEspecies({ id }: Props) {
  const estado = useEspecies(id)

  if (estado.tipo === 'carregando') {
    return <Carregando mensagem="Carregando espécies..." />
  }

  if (estado.tipo === 'erro') {
    return <MensagemErro mensagem={estado.mensagem} />
  }

  const { genero, especies } = estado

  return (
    <main className="conteudo">
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Início</Link> › <span aria-current="page">{genero.canonicalName}</span>
      </nav>
      <h1 className="nome-cientifico">{genero.canonicalName}</h1>
      <p className="subtitulo">{especies.length} espécies</p>

      <ul className="grade-especies">
        {especies.map((especie) => (
          <li key={especie.key}>
            <Link className="caixa-especie" to={`/especie/${especie.key}`}>
              <span className="nome-cientifico">{nomeCurto(especie.canonicalName ?? '')}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default ListaEspecies
