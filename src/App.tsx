import { Routes, Route } from 'react-router'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import GeneroPagina from './pages/GeneroPagina'
import GenerosPagina from './pages/GenerosPagina'
import EspeciePagina from './pages/EspeciePagina'
import BuscaPagina from './pages/BuscaPagina'
import MensagemErro from './components/MensagemErro'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/generos" element={<GenerosPagina />} />
        <Route path="/genero/:id" element={<GeneroPagina />} />
        <Route path="/especie/:id" element={<EspeciePagina />} />
        <Route path="/busca" element={<BuscaPagina />} />
        <Route path="*" element={<MensagemErro mensagem="Página não encontrada." />} />
      </Routes>
    </>
  )
}

export default App
