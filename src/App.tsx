import { Routes, Route } from 'react-router'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import MensagemErro from './components/MensagemErro'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="*" element={<MensagemErro mensagem="Página não encontrada." />} />
      </Routes>
    </>
  )
}

export default App
