type Props = {
  mensagem: string
}

function Carregando({ mensagem }: Props) {
  return (
    <main className="conteudo" role="status">
      <p className="subtitulo">{mensagem}</p>
    </main>
  )
}

export default Carregando
