<!-- Título da Issue: [Regra] Multa por atraso  | Label: regra -->

## Regra
Multa de R$ 1,00 por dia de atraso, com teto de R$ 20,00.

## Versão do sistema
Biblioteca 1 (commit: COMMIT)

## Onde está implementada
`src/regras.js`, função `calcularMulta` (usada pela rota `POST /api/devolucoes` em `src/app.js`).

## Testes que verificam a regra
| Teste | Ferramenta | Arquivo | Dados |
| --- | --- | --- | --- |
| Teste 1 (componente) | Vitest | `tests/unit/multa.test.js` | 0, 1, 20 e 21 dias de atraso (valores limite) e -1 dia (inválido) |
| Teste 2 (sistema) | Playwright | `tests/e2e/biblioteca.spec.js` | Devolução de L1 pela tela com 3 dias de atraso |
| Teste 3 (integração) | Postman/Newman | `postman/biblioteca.postman_collection.json` | Requisição 06: devolução de L1 com 25 dias de atraso |

## Resultado esperado
- 0 dia → R$ 0; 1 dia → R$ 1; 20 dias → R$ 20; 21 dias → R$ 20 (teto); -1 → erro "Dias de atraso inválidos".
- Tela mostra "Devolução registrada. Multa: R$ 3,00".
- API devolve multa 20 para 25 dias.

## Resultado obtido
Todos passaram.
- Teste 1: `Tests 9 passed (9)` → `docs/evidencias/teste1-vitest.txt` e `teste1-vitest.png`
- Teste 2: `2 passed` → `docs/evidencias/teste2-playwright.txt`, `teste2-playwright.png` e `playwright-report/`
- Teste 3: `assertions 13 | failed 0` → `docs/evidencias/teste3-newman.txt` e `postman-relatorio.html`

## O que ficou fora
Outros valores de atraso entre os limites, cálculo pela data real de devolução (o atraso é digitado) e valores não inteiros pela tela.
