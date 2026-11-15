# Respostas para a ficha – versão Biblioteca 1

Ambiente: Node v22.14.0, Windows 11, Chromium (Playwright). Todos os resultados abaixo são da versão já com o ajuste do ESLint.

## Qualidade – ESLint (Luis Otavio)
- **Antes, o que vamos analisar e como?** Todo o código JavaScript, sem executar (análise estática), com `npm run lint`. Além das regras recomendadas, quatro regras de manutenção: `complexity` (máx. 5), `max-lines-per-function` (máx. 30), `no-console` e `eqeqeq`.
- **Depois, o que encontramos e o que ficou fora?** 6 avisos e 0 erros: 4 de complexidade, 1 de função longa e 1 de console. Dividimos a rota de empréstimo em funções menores e ficaram 5 avisos (a rota de empréstimo saiu da lista). Os três testes passaram de novo depois do ajuste. Fora: a análise não executa o código, então não verifica se as regras dão o resultado certo; ficaram 3 avisos de complexidade, a função longa e o console.

## Qualidade – Rastreabilidade com GitHub Issues (Israel Gonçalves Medeiros)
- **Antes, o que vamos verificar e como?** Se cada regra do sistema está ligada a pelo menos um teste, a um resultado guardado e a um responsável. Uma Issue por regra, com o modelo "Regra do sistema" e a label `regra`.
- **Depois, o que encontramos e o que ficou fora?** As 4 regras têm Issue com teste, resultado e evidência anexada. A multa é a mais coberta (3 testes). A reserva só tem teste automático no Postman (mais a verificação manual pela tela). O prazo de 7 dias não é verificado por nenhum teste. Fora: regras que não estão no sistema.

## Teste 1 – Vitest (João Lucas)
- **Antes, o que testar, técnica e nível?** Regra da multa, nível de componente, análise de valores limite: 0, 1, 20 e 21 dias (mais -1 inválido). Também os limites do empréstimo (2 e 3 livros) e do login (2 e 3 senhas).
- **Depois, o que aconteceu e o que guardar?** 0 dia retornou R$ 0; 1 dia, R$ 1; 20 e 21 dias, R$ 20; -1 deu erro. 9 de 9 passaram. Guardar o teste e a saída (`docs/evidencias/teste1-vitest.txt` e `.png`).
- **Depois, o que concluímos e o que ficou fora?** A aprovação vale para esses valores. Ficaram fora outros valores de atraso e a data real de devolução.

## Teste 2 – Playwright (Gustavo Figueiró)
- **Antes, o que testar, técnica e nível?** Uso do sistema pela tela, nível de sistema, teste funcional automatizado: empréstimo + devolução com 3 dias de atraso, e bloqueio após 3 senhas erradas. Rodado de novo depois do ajuste do ESLint (regressão).
- **Depois, o que aconteceu e o que guardar?** A tela mostrou "Multa: R$ 3,00" e, na 3ª senha errada, "Acesso bloqueado", que continuou com a senha certa. 2 de 2 passaram. Guardar o teste e o relatório (`docs/evidencias/playwright-report/`, `teste2-playwright.txt` e `.png`).
- **Depois, o que concluímos e o que ficou fora?** A aprovação vale para esses dois usos. Fora: reserva pela tela, outros navegadores e telas de celular.

## Teste 3 – Postman/Newman (Eduarda Bertella)
- **Antes, o que testar, técnica e nível?** API de empréstimo, nível de integração de componentes, valores limite no número de livros (3º aceito, 4º recusado) e a regra da reserva, com conferências automáticas.
- **Depois, o que aconteceu e o que guardar?** 3º livro aceito (201); 4º recusado (422) com aviso de limite; devolução com 25 dias deu multa de R$ 20; Ana recusada no livro reservado (409) e Bruno aceito (201). 13 de 13 conferências passaram. Guardar a coleção e o relatório (`docs/evidencias/postman-relatorio.html`, `teste3-newman.txt` e `.png`).
- **Depois, o que concluímos e o que ficou fora?** A aprovação vale para um aluno com até 4 pedidos. Fora: vários alunos ao mesmo tempo, desempenho e banco de dados real (os dados ficam em memória).

## Tela e reserva (Brenom Moraes)
- **Verificação manual da reserva:** 5 de 5 passos com o observado igual ao esperado (`docs/evidencias/reserva-tela-verificacao.md` e `reserva-tela-1.png` a `-5.png`).
- **Dá para repetir?** Sim: clonar, `npm install`, `npx playwright install chromium` e os quatro comandos do README. Versão usada: Node v22.14.0.
