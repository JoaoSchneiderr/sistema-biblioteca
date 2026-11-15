<!-- Título da Issue: [Regra] Reserva  | Label: regra -->

## Regra
Livro reservado, ao ser devolvido, só pode ser emprestado para quem reservou.

## Versão do sistema
Biblioteca 1 (commit: f7f4cc7)

## Onde está implementada
`src/regras.js`, função `reservaPermite` (usada em `src/app.js`, rotas `POST /api/reservas` e `POST /api/emprestimos`).

## Testes que verificam a regra
| Teste | Ferramenta | Arquivo | Dados |
| --- | --- | --- | --- |
| Teste 3 (integração) | Postman/Newman | `postman/biblioteca.postman_collection.json` | Req. 05: Bruno reserva L1; 07: Ana tenta pegar L1; 08: Bruno pega L1 |
| Verificação manual (tela) | Navegador | `docs/evidencias/reserva-tela-verificacao.md` | Mesmo cenário feito pela tela, passo a passo |

## Resultado esperado
- Reserva → 201; Ana pegando L1 reservado para Bruno → 409 "Livro reservado para outro aluno"; Bruno pegando L1 → 201.
- Na tela: as mesmas mensagens, e Bruno aparece na coluna "Reservado por".

## Resultado obtido
Todos passaram.
- Teste 3: `assertions 13 | failed 0` → `docs/evidencias/teste3-newman.txt` e `postman-relatorio.html`
- Tela: 5 de 5 passos com observado igual ao esperado → `docs/evidencias/reserva-tela-1.png` a `reserva-tela-5.png`

## O que ficou fora
Não há teste automático no nível de componente (Vitest) nem de sistema (Playwright) para a reserva. Fora também: cancelar reserva e fila com mais de uma reserva.

## Links
- Evidências: https://github.com/JoaoSchneiderr/sistema-biblioteca/tree/f7f4cc7/docs/evidencias
- Código na versão testada: https://github.com/JoaoSchneiderr/sistema-biblioteca/tree/f7f4cc7
