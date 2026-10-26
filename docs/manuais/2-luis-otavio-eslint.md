# Manual – Luis Otavio: análise estática com ESLint

**Sua parte:** a parte de **qualidade**. Procurar problemas no código **sem executá-lo** (análise estática) e discutir a **manutenção** (facilidade de entender e modificar o código).

## Antes de começar
Siga a seção "Preparar o ambiente" do [README](../../README.md). O sistema não precisa estar rodando.

## Passo a passo
1. Abra `eslint.config.js`. Ele usa as regras recomendadas do ESLint e quatro regras extras ligadas à manutenção:
   - `complexity`: avisa quando uma função tem muitos caminhos (mais de 5 `if`/`||`/`??`…).
   - `max-lines-per-function`: avisa quando uma função passa de 30 linhas.
   - `no-console`: avisa sobre `console.log` esquecido.
   - `eqeqeq`: exige `===` em vez de `==`.
2. Rode a análise:
   ```bash
   npm run lint
   ```
3. Salve a saída como evidência:
   ```bash
   npm run lint > docs/evidencias/eslint-antes.txt
   ```
4. Monte uma tabela contando os alertas por regra. Na versão Biblioteca 1 a saída esperada é **6 avisos e 0 erros**:

   | Regra | Quantidade | Onde | O que indica |
   | --- | --- | --- | --- |
   | complexity | 4 | rotas de `src/app.js` | rotas com muitos caminhos: mais difíceis de entender e testar |
   | max-lines-per-function | 1 | `criarApp` em `src/app.js` | função longa demais: concentra muitas responsabilidades |
   | no-console | 1 | `src/server.js` | mensagem de inicialização; aceitável aqui |

5. Escolha **um** alerta para ajustar. Sugestão: dividir a rota de empréstimo (`/api/emprestimos`) em funções menores para reduzir a complexidade. Combine com a Eduarda, que cuida dessa API.
6. Depois do ajuste, rode de novo e guarde:
   ```bash
   npm run lint > docs/evidencias/eslint-depois.txt
   npm test
   ```
   Rodar `npm test` garante que o ajuste não quebrou as regras.
7. Abra uma Issue no GitHub (modelo "Regra do sistema" ou uma Issue simples) com a contagem antes e depois e anexe os dois arquivos. Combine com o Israel.

## O que preencher na ficha (Qualidade)
- **Depois o que encontramos e o que ficou fora?** Ex.: "6 avisos, 0 erros: 4 de complexidade, 1 de função longa e 1 de console. Após dividir a rota de empréstimo, ficaram X. Fora: a análise não executa o código, então não verifica se as regras dão o resultado certo, e só cobre os arquivos JavaScript."

## Na apresentação
Explique o que é análise estática, por que avisos de complexidade afetam a manutenção e mostre a contagem antes e depois.
