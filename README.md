# Sistema de Biblioteca

Trabalho B2 de Qualidade e Teste de Software. Grupo: João Lucas, Luis Otavio, Israel Gonçalves Medeiros, Gustavo Figueiró, Eduarda Bertella e Brenom Moraes (ADS e S.I).

Aplicação web em JavaScript (Node.js + Express) com tela e API. O bibliotecário entra com login, registra empréstimos, devoluções e reservas, e o sistema calcula a multa por atraso.

## Regras

| Regra | Descrição | Onde está |
| --- | --- | --- |
| Empréstimo | No máximo 3 livros por aluno ao mesmo tempo; o 4º é recusado. Prazo: 7 dias. | `src/regras.js` → `podeEmprestar` |
| Multa | R$ 1,00 por dia de atraso, com teto de R$ 20,00. | `src/regras.js` → `calcularMulta` |
| Reserva | Livro reservado, ao ser devolvido, só pode ser emprestado para quem reservou. | `src/regras.js` → `reservaPermite` |
| Login | Após 3 senhas erradas seguidas, o acesso é bloqueado. | `src/regras.js` → `deveBloquear` |

Usuário de acesso: **bibliotecario** / senha **1234**. Alunos: `a1` (Ana) e `a2` (Bruno). Livros: `L1` a `L6`.

## Preparar o ambiente (todos fazem uma vez)

1. Instale o [Node.js 22 LTS](https://nodejs.org) e o [Git](https://git-scm.com).
2. Clone o repositório e instale as dependências:
   ```bash
   git clone https://github.com/JoaoSchneiderr/sistema-biblioteca.git
   cd sistema-biblioteca
   npm install
   ```
3. Inicie o sistema e abra http://localhost:3000:
   ```bash
   npm start
   ```
   Para parar, use `Ctrl + C` no terminal.

## Comandos

| O quê | Comando | Precisa do sistema rodando? |
| --- | --- | --- |
| Análise estática (ESLint) | `npm run lint` | Não |
| Teste 1 – Vitest | `npm test` | Não |
| Teste 2 – Playwright | `npm run test:e2e` | Não (ele inicia sozinho) |
| Teste 3 – Postman/Newman | `npm run test:api` | **Sim** (`npm start` em outro terminal) |

## Estrutura

```
src/regras.js        regras de negócio (funções puras)
src/app.js           API (rotas /api/...)
public/              tela (HTML, CSS, JS)
tests/unit/          Teste 1 (Vitest)
tests/e2e/           Teste 2 (Playwright)
postman/             Teste 3 (coleção do Postman)
docs/manuais/        passo a passo de cada membro
docs/evidencias/     saídas, relatórios e capturas guardados
.github/             modelo de Issue (rastreabilidade) e GitHub Actions
```

## Manuais por membro

| Membro | Tarefa | Manual |
| --- | --- | --- |
| João Lucas | Regra da multa e Teste 1 (Vitest) | [docs/manuais/1-joao-lucas-vitest.md](docs/manuais/1-joao-lucas-vitest.md) |
| Luis Otavio | Análise estática (ESLint) | [docs/manuais/2-luis-otavio-eslint.md](docs/manuais/2-luis-otavio-eslint.md) |
| Israel Gonçalves Medeiros | Rastreabilidade (GitHub Issues) | [docs/manuais/3-israel-github-issues.md](docs/manuais/3-israel-github-issues.md) |
| Gustavo Figueiró | Teste 2 (Playwright) | [docs/manuais/4-gustavo-playwright.md](docs/manuais/4-gustavo-playwright.md) |
| Eduarda Bertella | API de empréstimo e Teste 3 (Postman) | [docs/manuais/5-eduarda-postman.md](docs/manuais/5-eduarda-postman.md) |
| Brenom Moraes | Tela, login, reserva e evidências | [docs/manuais/6-brenom-tela-e-evidencias.md](docs/manuais/6-brenom-tela-e-evidencias.md) |
