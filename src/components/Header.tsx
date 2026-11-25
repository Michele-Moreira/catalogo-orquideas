import { Link } from 'react-router'
import CampoBusca from './CampoBusca'

function Header() {
  return (
    <header className="cabecalho">
      <Link className="logo" to="/">
        <img src="/favicon.svg" alt="" width="32" height="32" />
        Catálogo de Orquídeas
      </Link>
      <CampoBusca />
    </header>
  )
}

export default Header
