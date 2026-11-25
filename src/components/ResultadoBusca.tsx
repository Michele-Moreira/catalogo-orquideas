import { Link } from 'react-router'
import { useBusca } from '../hooks/useBusca'
import { nomeParaMostrar, traduzirNivel } from '../utils/formatarNome'
import { limparTaxons } from '../utils/limparTaxons'
import Carregando from './Carregando'
import FotoPlanta from './FotoPlanta'
import MensagemErro from './MensagemErro'

type Props = {
  termo: string
}

function ResultadoBusca({ termo }: Props) {
  const estado = useBusca(termo)

  if (estado.tipo === 'carregando') {
    return <Carregando mensagem={`Buscando "${termo}"...`} />
  }

  if (estado.tipo === 'erro') {
    return <MensagemErro mensagem={estado.mensagem} />
  }

  // Espécies primeiro, depois variedades; cada grupo limpo e em ordem alfabética
  const resultados = [
    ...limparTaxons(estado.resultados, 'SPECIES'),
    ...limparTaxons(estado.resultados, 'VARIETY'),
  ]

  return (
    <main className="conteudo">
      <h1>Resultado pra "{termo}"</h1>
      <p className="subtitulo">
        {resultados.length === 0
          ? 'Nenhuma orquídea com esse nome. A busca é pelo nome científico, como "Cattleya" ou "walkeriana".'
          : `${resultados.length} orquídeas encontradas`}
      </p>

      <ul className="grade-especies">
        {resultados.map((taxon) => (
          <li key={taxon.key}>
            <Link className="caixa-especie" to={`/especie/${taxon.key}`}>
              <FotoPlanta nome={taxon.canonicalName ?? ''} />
              <span className="nome-cientifico">{nomeParaMostrar(taxon)}</span>
              <span className="nivel">{traduzirNivel(taxon.rank)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default ResultadoBusca
