import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { useEspecies } from '../hooks/useEspecies'
import { nomeCurto } from '../utils/formatarNome'
import { semAcento } from '../utils/semAcento'
import Carregando from './Carregando'
import FotoPlanta from './FotoPlanta'
import MensagemErro from './MensagemErro'

type Props = {
  id: number
}

// Dendrobium tem quase 1700 espécies: desenhar todas de uma vez deixaria a página lenta
// (e no passo das fotos seriam 1700 pedidos). Mostra de 24 em 24.
const POR_VEZ = 24

function ListaEspecies({ id }: Props) {
  const estado = useEspecies(id)
  const [parametros, setParametros] = useSearchParams()
  const busca = parametros.get('busca') ?? ''
  const [quantidade, setQuantidade] = useState(POR_VEZ)

  // replace: sem ele, cada letra digitada viraria um passo no histórico do navegador
  function mudarBusca(valor: string) {
    setParametros((atuais) => {
      if (valor) {
        atuais.set('busca', valor)
      } else {
        atuais.delete('busca')
      }
      return atuais
    }, { replace: true })
    setQuantidade(POR_VEZ)
  }

  if (estado.tipo === 'carregando') {
    return <Carregando mensagem="Carregando espécies..." />
  }

  if (estado.tipo === 'erro') {
    return <MensagemErro mensagem={estado.mensagem} />
  }

  const { genero, especies } = estado
  const especiesFiltradas = especies.filter((especie) =>
    semAcento(especie.canonicalName ?? '').includes(semAcento(busca)),
  )
  const visiveis = especiesFiltradas.slice(0, quantidade)
  const faltam = especiesFiltradas.length - visiveis.length

  return (
    <main className="conteudo">
      <title>{`${genero.canonicalName} · Catálogo de Orquídeas`}</title>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Início</Link> › <span aria-current="page">{genero.canonicalName}</span>
      </nav>
      <h1 className="nome-cientifico">{genero.canonicalName}</h1>
      <p className="subtitulo">{especies.length} espécies</p>

      <div className="filtros">
        <input
          type="search"
          placeholder={`Filtrar espécies de ${genero.canonicalName}...`}
          aria-label="Filtrar espécies pelo nome"
          value={busca}
          onChange={(e) => mudarBusca(e.target.value)}
        />
      </div>

      {especiesFiltradas.length === 0 && (
        <p className="sem-resultado">Nenhuma espécie com esse nome.</p>
      )}

      <ul className="grade-especies">
        {visiveis.map((especie) => (
          <li key={especie.key}>
            <Link className="caixa-especie" to={`/especie/${especie.key}`}>
              <FotoPlanta nome={especie.canonicalName ?? ''} id={especie.key} />
              <span className="nome-cientifico">{nomeCurto(especie.canonicalName ?? '')}</span>
            </Link>
          </li>
        ))}
      </ul>

      {faltam > 0 && (
        <button className="botao-mais" type="button" onClick={() => setQuantidade(quantidade + POR_VEZ)}>
          Mostrar mais ({faltam} restantes)
        </button>
      )}
    </main>
  )
}

export default ListaEspecies
