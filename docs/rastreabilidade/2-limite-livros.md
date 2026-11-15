<!-- Título da Issue: [Regra] Limite de 3 livros por aluno  | Label: regra -->

## Regra
Cada aluno pode ter no máximo 3 livros emprestados ao mesmo tempo; o 4º pedido é recusado. Prazo: 7 dias.

## Versão do sistema
Biblioteca 1 (commit: f7f4cc7)

## Onde está implementada
`src/regras.js`, função `podeEmprestar` (usada pela rota `POST /api/emprestimos` em `src/app.js`, função `verificarEmprestimo`).

## Testes que verificam a regra
| Teste | Ferramenta | Arquivo | Dados |
| --- | --- | --- | --- |
| Teste 1 (componente) | Vitest | `tests/unit/multa.test.js` | Aluno com 2 livros (pode) e com 3 livros (não pode) |
| Teste 3 (integração) | Postman/Newman | `postman/biblioteca.postman_collection.json` | Requisições 01 a 04: Ana pede L1, L2, L3 e L4 |

## Resultado esperado
- `podeEmprestar(2)` = verdadeiro; `podeEmprestar(3)` = falso.
- API: 1º, 2º e 3º livro → 201; 4º livro → 422 "Limite de 3 livros atingido".

## Resultado obtido
Todos passaram.
- Teste 1: `Tests 9 passed (9)` → `docs/evidencias/teste1-vitest.txt`
- Teste 3: 3º livro 201, 4º livro 422 com a mensagem de limite → `docs/evidencias/teste3-newman.txt` e `postman-relatorio.html`

## O que ficou fora
O prazo de 7 dias (não é verificado por nenhum teste), vários alunos ao mesmo tempo e o limite pela tela.

## Links
- Evidências: https://github.com/JoaoSchneiderr/sistema-biblioteca/tree/f7f4cc7/docs/evidencias
- Código na versão testada: https://github.com/JoaoSchneiderr/sistema-biblioteca/tree/f7f4cc7
