import { Link } from 'react-router'
import { useTaxon } from '../hooks/useTaxon'
import { nomeParaMostrar, traduzirNivel } from '../utils/formatarNome'
import Carregando from './Carregando'
import FotoPlanta from './FotoPlanta'
import MensagemErro from './MensagemErro'

type Props = {
  id: number
}

function FichaPlanta({ id }: Props) {
  const estado = useTaxon(id)

  if (estado.tipo === 'carregando') {
    return <Carregando mensagem="Carregando ficha..." />
  }

  if (estado.tipo === 'erro') {
    return <MensagemErro mensagem={estado.mensagem} />
  }

  const { taxon, variedades } = estado
  const nome = nomeParaMostrar(taxon)
  const ehVariedade = taxon.rank === 'VARIETY'

  return (
    <main className="conteudo">
      <title>{`${nome} · Catálogo de Orquídeas`}</title>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Início</Link>
        {taxon.genusKey && (
          <>
            {' › '}
            <Link className="nome-cientifico" to={`/genero/${taxon.genusKey}`}>{taxon.genus}</Link>
          </>
        )}
        {ehVariedade && taxon.speciesKey && (
          <>
            {' › '}
            <Link className="nome-cientifico" to={`/especie/${taxon.speciesKey}`}>{taxon.species}</Link>
          </>
        )}
        {' › '}
        <span className="nome-cientifico" aria-current="page">{nome}</span>
      </nav>

      <div className="ficha">
        <FotoPlanta nome={taxon.canonicalName ?? nome} grande />

        <div className="ficha-info">
          <p className="etiqueta">{traduzirNivel(taxon.rank)}</p>
          <h1 className="nome-cientifico">{nome}</h1>
          {taxon.authorship && <p className="subtitulo">Descrita por {taxon.authorship}</p>}

          <dl className="ficha-dados">
            <dt>Família</dt>
            <dd>{taxon.family ?? 'Orchidaceae'}</dd>
            <dt>Gênero</dt>
            <dd className="nome-cientifico">{taxon.genus}</dd>
            {ehVariedade && (
              <>
                <dt>Espécie</dt>
                <dd className="nome-cientifico">{taxon.species}</dd>
              </>
            )}
          </dl>

          <a className="link-destaque" href={`https://www.gbif.org/species/${taxon.key}`} target="_blank" rel="noreferrer">
            Ver no GBIF ↗
          </a>
        </div>
      </div>

      {!ehVariedade && (
        <section className="secao-variedades">
          <h2>Variedades</h2>
          {variedades.length === 0 ? (
            <p className="subtitulo">Essa espécie não tem variedades registradas.</p>
          ) : (
            <ul className="grade-especies">
              {variedades.map((variedade) => (
                <li key={variedade.key}>
                  <Link className="caixa-especie" to={`/especie/${variedade.key}`}>
                    <FotoPlanta nome={variedade.canonicalName ?? ''} />
                    <span className="nome-cientifico">{nomeParaMostrar(variedade)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  )
}

export default FichaPlanta
