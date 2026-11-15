<!-- Título da Issue: [Regra] Bloqueio do login  | Label: regra -->

## Regra
Após 3 senhas erradas seguidas, o acesso é bloqueado (mesmo que depois a senha certa seja digitada).

## Versão do sistema
Biblioteca 1 (commit: COMMIT)

## Onde está implementada
`src/regras.js`, função `deveBloquear` (usada pela rota `POST /api/login` em `src/app.js`).

## Testes que verificam a regra
| Teste | Ferramenta | Arquivo | Dados |
| --- | --- | --- | --- |
| Teste 1 (componente) | Vitest | `tests/unit/multa.test.js` | 2 senhas erradas (não bloqueia) e 3 (bloqueia) |
| Teste 2 (sistema) | Playwright | `tests/e2e/biblioteca.spec.js` | 3 senhas erradas pela tela e depois a senha certa |

## Resultado esperado
- `deveBloquear(2)` = falso; `deveBloquear(3)` = verdadeiro.
- Tela: 1ª e 2ª tentativa → "Usuário ou senha inválidos"; 3ª → "Acesso bloqueado"; com a senha certa continua "Acesso bloqueado".

## Resultado obtido
Todos passaram.
- Teste 1: `Tests 9 passed (9)` → `docs/evidencias/teste1-vitest.txt`
- Teste 2: `2 passed` → `docs/evidencias/teste2-playwright.txt`, `teste2-playwright.png` e `playwright-report/`

## O que ficou fora
Como desbloquear o usuário (o sistema não tem essa função; só reiniciando), e se o contador volta a zero depois de um login certo antes da 3ª tentativa.
