---
paths:
  - "**/*.{tsx,css}"
---

# Estilo (CSS puro)

- Todo o estilo está em `src/index.css`. Sem Tailwind nem biblioteca de componentes: não adicione sem a Mi pedir.
- **Sem `style` inline** no JSX. Estilo novo vira classe no `index.css`, numa seção com o cabeçalho
  `/* ========== NOME DA SEÇÃO ========== */`.
- Cores sempre pelas variáveis do `:root` (`--cor-fundo`, `--cor-caixa`, `--cor-texto`, `--cor-texto-suave`,
  `--cor-destaque`, `--cor-folha`, `--cor-borda`). Cor nova vira variável antes de ser usada.
- Classe nova em português e kebab-case (`caixa-genero`, `grade-especies`).
- Layout com flex-box e grid. Responsividade pelo `@media (max-width: 768px)` no fim do arquivo; conferir em 360px.
- Caixa de foto sempre com `aspect-ratio` fixo, com ou sem foto, pra grade não pular quando a imagem chega.
- Acessibilidade: imagem com `alt`, campo com `aria-label` ou `<label>`, foco visível em tudo que é clicável.
