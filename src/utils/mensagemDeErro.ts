import { ErroGbif } from '../services/gbif'

// 404 quer dizer "esse id não existe"; o resto é o GBIF fora do ar ou a internet caindo
export function mensagemDeErro(erro: unknown, oQueNaoAchou: string) {
  if (erro instanceof ErroGbif && erro.status === 404) {
    return `${oQueNaoAchou} não encontrada.`
  }
  return 'Não deu pra carregar agora. Tenta de novo daqui a pouco.'
}
