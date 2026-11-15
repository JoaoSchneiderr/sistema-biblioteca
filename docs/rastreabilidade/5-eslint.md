<!-- Título da Issue: [Qualidade] Análise estática com ESLint: 6 → 5 avisos  | Label: qualidade -->

## O que foi analisado
Todo o código JavaScript do projeto com `npm run lint` (ESLint, regras recomendadas + `complexity`, `max-lines-per-function`, `no-console` e `eqeqeq`).

## Versão do sistema
Biblioteca 1 (commit: f7f4cc7)

## Antes do ajuste: 6 avisos, 0 erros
| Regra | Quantidade | Onde | O que indica |
| --- | --- | --- | --- |
| complexity | 4 | rotas de login, empréstimo (8), devolução e reserva em `src/app.js` | muitos caminhos: mais difícil de entender e testar |
| max-lines-per-function | 1 | `criarApp` em `src/app.js` (71 linhas) | função longa demais |
| no-console | 1 | `src/server.js` | mensagem de inicialização (aceitável) |

## Ajuste feito
A rota `POST /api/emprestimos` foi dividida em funções menores: `verificarEmprestimo`, `verificarDisponibilidade`, `contarLivrosDoAluno` e `registrarEmprestimo` (`src/app.js`).

## Depois do ajuste: 5 avisos, 0 erros
- O aviso de complexidade da rota de empréstimo sumiu (de 8 para abaixo de 5).
- `criarApp` caiu de 71 para 63 linhas (ainda acima de 30).

## Regressão
Depois do ajuste os três testes rodaram de novo e passaram: Vitest 9/9, Playwright 2/2 e Newman 13/13. O comportamento do sistema não mudou.

## Evidências
`docs/evidencias/eslint-antes.txt`, `eslint-antes.png`, `eslint-depois.txt` e `eslint-depois.png`.

## O que ficou fora
A análise estática não executa o código, então não diz se as regras dão o resultado certo (isso é papel dos testes). Ficaram 3 avisos de complexidade, a função longa e o `console.log`.

## Links
- Evidências: https://github.com/JoaoSchneiderr/sistema-biblioteca/tree/f7f4cc7/docs/evidencias
- Código na versão testada: https://github.com/JoaoSchneiderr/sistema-biblioteca/tree/f7f4cc7
