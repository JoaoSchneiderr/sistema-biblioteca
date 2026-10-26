# Manual – Gustavo Figueiró: Teste 2 (Playwright)

**Sua parte:** teste **funcional** no nível de **sistema**. O Playwright abre o navegador, faz o que o bibliotecário faria e confere o resultado na tela automaticamente. Rodar de novo depois de uma alteração verifica se o que funcionava continua funcionando (**regressão**).

## Antes de começar
1. Siga a seção "Preparar o ambiente" do [README](../../README.md).
2. Instale o navegador do Playwright (uma vez):
   ```bash
   npx playwright install chromium
   ```
O sistema **não** precisa estar rodando: o Playwright inicia sozinho (veja `webServer` em `playwright.config.js`).

## Passo a passo
1. Abra `tests/e2e/biblioteca.spec.js`. Há dois cenários:
   - **Empréstimo e devolução:** login → emprestar L1 para Ana → devolver com 3 dias de atraso → conferir "Multa: R$ 3,00".
   - **Bloqueio:** 3 senhas erradas → "Acesso bloqueado", e continua bloqueado mesmo com a senha certa.
2. Rode os testes:
   ```bash
   npm run test:e2e
   ```
3. Confira: `2 passed`.
4. Abra o relatório com prints e passos:
   ```bash
   npx playwright show-report
   ```
5. Guarde as evidências: copie a pasta `playwright-report` para `docs/evidencias/playwright-report` e tire um print do relatório (`docs/evidencias/teste2-playwright.png`).
6. Para ver o navegador funcionando (bom para a demonstração):
   ```bash
   npx playwright test --headed
   ```

## Regressão
Depois que o Luis ou a Eduarda mudarem o código (ajuste do ESLint), rode `npm run test:e2e` de novo e guarde o novo relatório. Se continuar `2 passed`, a mudança não quebrou o uso do sistema.

## Se um teste falhar
O relatório mostra o passo que falhou, o print da tela e o esperado contra o obtido. Investigue a causa, corrija, rode de novo e guarde as duas execuções.

## O que preencher na ficha (coluna Teste 2)
- **Depois o que aconteceu e o que guardar?** Ex.: "A tela mostrou multa de R$ 3,00 e, na 3ª senha errada, acesso bloqueado. Guardar teste e relatório."
- **Depois o que concluímos e o que ficou fora?** Ex.: "A aprovação vale para esses dois usos. Fora: reserva pela tela, outros navegadores e telas de celular."

## Na apresentação
Rode `npx playwright test --headed` ao vivo e mostre o relatório.
