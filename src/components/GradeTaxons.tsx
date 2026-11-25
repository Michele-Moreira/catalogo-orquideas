import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import type { TaxonGbif } from '../types/gbif'
import { semAcento } from '../utils/semAcento'
import FotoPlanta from './FotoPlanta'

type Props = {
  taxons: TaxonGbif[]
  oQueFiltra: string // completa o "Filtrar ..." do campo: "espécies de Cattleya", "gêneros"
  endereco: (taxon: TaxonGbif) => string
  nome: (taxon: TaxonGbif) => string
}

// Dendrobium tem quase 1700 espécies, e a família tem mais de 800 gêneros: desenhar tudo de uma vez
// deixaria a página lenta e dispararia centenas de pedidos de foto. Mostra de 24 em 24.
const POR_VEZ = 24

// Filtro pelo nome (guardado na URL, em ?busca=) + caixas com foto + "mostrar mais".
// Serve pra lista de espécies de um gênero e pra lista de todos os gêneros.
function GradeTaxons({ taxons, oQueFiltra, endereco, nome }: Props) {
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

  const filtrados = taxons.filter((taxon) => semAcento(taxon.canonicalName ?? '').includes(semAcento(busca)))
  const visiveis = filtrados.slice(0, quantidade)
  const faltam = filtrados.length - visiveis.length

  return (
    <>
      <div className="filtros">
        <input
          type="search"
          placeholder={`Filtrar ${oQueFiltra}...`}
          aria-label={`Filtrar ${oQueFiltra} pelo nome`}
          value={busca}
          onChange={(e) => mudarBusca(e.target.value)}
        />
      </div>

      {filtrados.length === 0 && <p className="sem-resultado">Nada com esse nome.</p>}

      <ul className="grade-especies">
        {visiveis.map((taxon) => (
          <li key={taxon.key}>
            <Link className="caixa-especie" to={endereco(taxon)}>
              <FotoPlanta nome={taxon.canonicalName ?? ''} id={taxon.key} />
              <span className="nome-cientifico">{nome(taxon)}</span>
            </Link>
          </li>
        ))}
      </ul>

      {faltam > 0 && (
        <button className="botao-mais" type="button" onClick={() => setQuantidade(quantidade + POR_VEZ)}>
          Mostrar mais ({faltam} restantes)
        </button>
      )}
    </>
  )
}

export default GradeTaxons
