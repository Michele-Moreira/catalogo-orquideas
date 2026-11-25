// A licença vem escrita de vários jeitos: "http://creativecommons.org/licenses/by-nc/4.0/",
// "cc-by-nc", "lesueur caroline (cc-by-sa)". Sem licença Creative Commons, a foto não pode ser usada.
export function licencaLivre(licenca: string | null | undefined) {
  if (!licenca) {
    return false
  }
  const texto = licenca.toLowerCase()
  return texto.includes('creativecommons.org') || /\bcc[- ]?(by|0|zero)\b/.test(texto) || texto.includes('publicdomain')
}

// Nome curto pro crédito embaixo da foto: "CC BY-NC", "CC0"
export function nomeDaLicenca(licenca: string) {
  const texto = licenca.toLowerCase()
  if (texto.includes('publicdomain') || /\bcc[- ]?(0|zero)\b/.test(texto)) {
    return 'CC0'
  }
  const tipo = texto.match(/(?:licenses\/|\bcc[- ]?)(by(?:-(?:nc|sa|nd))*)/)
  return tipo ? `CC ${tipo[1].toUpperCase()}` : 'Creative Commons'
}
