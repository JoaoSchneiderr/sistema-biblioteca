# Manual – Eduarda Bertella: API de empréstimo e Teste 3 (Postman)

**Sua parte:** testar a **API de empréstimo** no nível de **integração de componentes**, com **valores limite** no número de livros (3º aceito, 4º recusado) e a regra da reserva. As comparações são automáticas: não basta enviar a requisição, é preciso conferir a resposta.

## Antes de começar
1. Siga a seção "Preparar o ambiente" do [README](../../README.md).
2. Instale o [Postman](https://www.postman.com/downloads/) (app de desktop).
3. **Deixe o sistema rodando** em um terminal:
   ```bash
   npm start
   ```

## Passo a passo no Postman (para a demonstração)
1. No Postman: **Import** → escolha `postman/biblioteca.postman_collection.json`.
2. Abra a coleção "Sistema de Biblioteca - Teste 3". Cada requisição tem uma aba **Tests** com as conferências (ex.: `pm.response.to.have.status(422)`).
3. Clique nos três pontinhos da coleção → **Run collection** → **Run**. As requisições rodam em ordem:

   | # | Requisição | Esperado |
   | --- | --- | --- |
   | 00 | Reiniciar dados | 200 |
   | 01–03 | Ana pega L1, L2 e L3 | 201 (o 3º é aceito) |
   | 04 | Ana pede L4 | **422** "Limite de 3 livros atingido" |
   | 05 | Bruno reserva L1 | 201 |
   | 06 | Ana devolve L1 com 25 dias | multa R$ 20 (teto) |
   | 07 | Ana tenta pegar L1 | **409** "Livro reservado para outro aluno" |
   | 08 | Bruno pega L1 | 201 |

4. Confira que todas as 13 conferências passaram e exporte o resultado (**Export Results**) para `docs/evidencias/`.

## Passo a passo pelo terminal (Newman)
Com o sistema rodando em outro terminal:
```bash
npm run test:api
```
Isso roda a mesma coleção e gera o relatório `docs/evidencias/postman-relatorio.html`. A saída deve mostrar `assertions 13 | failed 0`.

## Onde está o código da API
`src/app.js`, rotas `POST /api/emprestimos`, `/api/devolucoes` e `/api/reservas`. As regras ficam em `src/regras.js`. Se o Luis propuser dividir a rota de empréstimo (alerta do ESLint), rode a coleção de novo depois da mudança.

## O que preencher na ficha (coluna Teste 3)
- **Depois o que aconteceu e o que guardar?** Ex.: "3º livro aceito (201); 4º recusado (422) com aviso de limite. Guardar coleção e relatório."
- **Depois o que concluímos e o que ficou fora?** Ex.: "A aprovação vale para um aluno com até 4 pedidos. Fora: vários alunos ao mesmo tempo, desempenho e banco de dados real (os dados ficam em memória)."

## Na apresentação
Rode a coleção no Postman ao vivo e mostre a requisição 04 sendo recusada.
