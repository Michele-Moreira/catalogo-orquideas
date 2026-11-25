import { Link } from 'react-router'

type Props = {
  mensagem: string
}

function MensagemErro({ mensagem }: Props) {
  return (
    <main className="conteudo aviso" role="alert">
      <p>{mensagem}</p>
      <Link className="link-destaque" to="/">
        Voltar pro início
      </Link>
    </main>
  )
}

export default MensagemErro
