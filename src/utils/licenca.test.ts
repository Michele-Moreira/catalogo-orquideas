import { describe, it, expect } from 'vitest'
import { licencaLivre, nomeDaLicenca } from './licenca'

describe('licencaLivre', () => {
  it('aceita o endereço da Creative Commons', () => {
    expect(licencaLivre('http://creativecommons.org/licenses/by/4.0/')).toBe(true)
  })

  it('aceita o código curto do iNaturalist', () => {
    expect(licencaLivre('cc-by-nc')).toBe(true)
  })

  it('aceita a licença escrita junto com o nome do autor', () => {
    expect(licencaLivre('lesueur caroline (cc-by-sa)')).toBe(true)
  })

  it('recusa quando não tem licença', () => {
    expect(licencaLivre(null)).toBe(false)
  })

  it('recusa "todos os direitos reservados"', () => {
    expect(licencaLivre('All rights reserved')).toBe(false)
  })
})

describe('nomeDaLicenca', () => {
  it('tira o nome do endereço', () => {
    expect(nomeDaLicenca('http://creativecommons.org/licenses/by-nc/4.0/')).toBe('CC BY-NC')
  })

  it('tira o nome do código curto', () => {
    expect(nomeDaLicenca('lesueur caroline (cc-by-sa)')).toBe('CC BY-SA')
  })

  it('reconhece domínio público', () => {
    expect(nomeDaLicenca('http://creativecommons.org/publicdomain/zero/1.0/')).toBe('CC0')
  })
})
