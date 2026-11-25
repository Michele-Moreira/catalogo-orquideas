import { Link } from 'react-router'
import { generos } from '../data/generos'

function Inicio() {
  return (
    <main className="conteudo">
      <h1>Escolha um gênero</h1>
      <p className="subtitulo">
        Cada gênero reúne várias espécies. Clique pra ver todas e ir descendo até as variedades.
      </p>

      <ul className="grade-generos">
        {generos.map((genero) => (
          <li key={genero.id}>
            <Link className="caixa-genero" to={`/genero/${genero.id}`}>
              <h2>{genero.nome}</h2>
              <p>{genero.descricao}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Inicio
