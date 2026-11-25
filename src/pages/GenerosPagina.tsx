import { Link } from 'react-router'
import Carregando from '../components/Carregando'
import GradeTaxons from '../components/GradeTaxons'
import MensagemErro from '../components/MensagemErro'
import { useGeneros } from '../hooks/useGeneros'

function GenerosPagina() {
  const estado = useGeneros()

  if (estado.tipo === 'carregando') {
    return <Carregando mensagem="Carregando todos os gêneros..." />
  }

  if (estado.tipo === 'erro') {
    return <MensagemErro mensagem={estado.mensagem} />
  }

  return (
    <main className="conteudo">
      <title>Todos os gêneros · Catálogo de Orquídeas</title>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Início</Link> › <span aria-current="page">Gêneros</span>
      </nav>
      <h1>Todos os gêneros</h1>
      <p className="subtitulo">{estado.generos.length} gêneros de orquídea</p>

      <GradeTaxons
        taxons={estado.generos}
        oQueFiltra="gêneros"
        endereco={(genero) => `/genero/${genero.key}`}
        nome={(genero) => genero.canonicalName ?? ''}
      />
    </main>
  )
}

export default GenerosPagina
