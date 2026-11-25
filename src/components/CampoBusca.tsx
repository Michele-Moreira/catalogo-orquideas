import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'

// Diferente do filtro da página do gênero, aqui a busca vai no GBIF.
// Por isso ela só sai quando a pessoa aperta Enter ou o botão, e não a cada letra.
function CampoBusca() {
  const [termo, setTermo] = useState('')
  const navegar = useNavigate()

  function buscar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const limpo = termo.trim()
    if (limpo) {
      navegar(`/busca?q=${encodeURIComponent(limpo)}`)
    }
  }

  return (
    <form className="campo-busca" role="search" onSubmit={buscar}>
      <input
        type="search"
        placeholder="Buscar orquídea pelo nome..."
        aria-label="Buscar orquídea pelo nome científico"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  )
}

export default CampoBusca
