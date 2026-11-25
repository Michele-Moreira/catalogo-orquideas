import { useSearchParams } from 'react-router'
import ResultadoBusca from '../components/ResultadoBusca'

function BuscaPagina() {
  const [parametros] = useSearchParams()
  const termo = (parametros.get('q') ?? '').trim()

  if (!termo) {
    return (
      <main className="conteudo">
        <h1>Buscar orquídea</h1>
        <p className="subtitulo">Digite o nome no campo lá em cima, por exemplo "walkeriana".</p>
      </main>
    )
  }

  return <ResultadoBusca key={termo} termo={termo} />
}

export default BuscaPagina
