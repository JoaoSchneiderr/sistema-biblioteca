# Manual – João Lucas: regra da multa e Teste 1 (Vitest)

**Sua parte:** mostrar que a regra da multa funciona nos valores limite, com um teste dinâmico automatizado no nível de **componente**.

**Regra:** R$ 1,00 por dia de atraso, com teto de R$ 20,00.
**Técnica:** análise de valores limite. A multa muda em dois pontos: quando passa de 0 para 1 dia (começa a cobrar) e quando passa de 20 para 21 dias (o teto segura o valor). Por isso testamos 0, 1, 20 e 21.

## Antes de começar
Siga a seção "Preparar o ambiente" do [README](../../README.md). O sistema **não** precisa estar rodando.

## Passo a passo
1. Abra `src/regras.js` e leia a função `calcularMulta`. Entenda como o teto é aplicado (`Math.min`).
2. Abra `tests/unit/multa.test.js`. Cada `it(...)` é um caso de teste com o dado e o esperado.
3. No terminal, na pasta do projeto, rode:
   ```bash
   npm test
   ```
4. Confira na saída: `Tests 9 passed (9)`.
5. Salve a saída como evidência:
   ```bash
   npm test > docs/evidencias/teste1-vitest.txt
   ```
6. Tire um print do terminal com o resultado e salve em `docs/evidencias/teste1-vitest.png`.

## O que deve acontecer
| Dias de atraso | Multa esperada |
| --- | --- |
| 0 | R$ 0 |
| 1 | R$ 1 |
| 20 | R$ 20 |
| 21 | R$ 20 (teto) |

O arquivo também testa os limites do empréstimo (2 e 3 livros) e do login (2 e 3 senhas erradas).

## Se um teste falhar
1. Leia a linha `Expected` / `Received` na saída: é o esperado contra o obtido.
2. Encontre a causa em `src/regras.js`, corrija e rode `npm test` de novo.
3. Guarde a saída antes e depois do ajuste (`teste1-vitest-antes.txt` e `teste1-vitest-depois.txt`).

**Experimento para a apresentação (opcional):** troque `Math.min(..., TETO_MULTA)` por só `diasAtraso * MULTA_POR_DIA`, rode `npm test` e mostre que o caso de 21 dias falha. Depois desfaça a mudança e rode de novo.

## O que preencher na ficha (coluna Teste 1)
- **Depois o que aconteceu e o que guardar?** Ex.: "0 dia retornou R$ 0; 1 dia, R$ 1; 20 e 21 dias, R$ 20. Guardar teste e saída (docs/evidencias/teste1-vitest.txt)."
- **Depois o que concluímos e o que ficou fora?** Ex.: "A aprovação vale para esses valores. Ficaram fora outros valores de atraso e a data real de devolução."

## Na apresentação
Explique o que são valores limite, por que escolheu 0, 1, 20 e 21, e mostre `npm test` rodando.
