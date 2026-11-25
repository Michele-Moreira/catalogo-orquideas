import { Link } from 'react-router'
import { useEspecies } from '../hooks/useEspecies'
import { nomeCurto } from '../utils/formatarNome'
import Carregando from './Carregando'
import GradeTaxons from './GradeTaxons'
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
      <title>{`${genero.canonicalName} · Catálogo de Orquídeas`}</title>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Início</Link> › <Link to="/generos">Gêneros</Link> ›{' '}
        <span aria-current="page">{genero.canonicalName}</span>
      </nav>
      <h1 className="nome-cientifico">{genero.canonicalName}</h1>
      <p className="subtitulo">{especies.length} espécies</p>

      <GradeTaxons
        taxons={especies}
        oQueFiltra={`espécies de ${genero.canonicalName}`}
        endereco={(especie) => `/especie/${especie.key}`}
        nome={(especie) => nomeCurto(especie.canonicalName ?? '')}
      />
    </main>
  )
}

export default ListaEspecies
