# Manual – Israel Gonçalves Medeiros: rastreabilidade com GitHub Issues

**Sua parte:** a segunda ferramenta de **qualidade**. Ligar cada regra aos testes que a verificam e aos resultados (**rastreabilidade**), usando GitHub Issues.

## Antes de começar
- Peça ao João (dono do repositório) para te adicionar como colaborador: no GitHub, **Settings → Collaborators → Add people**.
- Siga a seção "Preparar o ambiente" do [README](../../README.md) se quiser rodar os testes você mesmo.

## Passo a passo
1. No repositório, vá em **Issues → New issue** e escolha o modelo **"Regra do sistema"**.
2. Crie **uma Issue por regra** (4 no total):
   - `[Regra] Multa por atraso`
   - `[Regra] Limite de 3 livros por aluno`
   - `[Regra] Reserva`
   - `[Regra] Bloqueio do login`
3. Em cada uma, preencha a regra, a versão (Biblioteca 1 + o código do commit, que aparece na página inicial do repositório) e onde está no código. Use a tabela do README.
4. Preencha a tabela "Testes que verificam a regra":

   | Regra | Teste | Arquivo |
   | --- | --- | --- |
   | Multa | Teste 1 (Vitest) e Teste 2 (Playwright) | `tests/unit/multa.test.js`, `tests/e2e/biblioteca.spec.js` |
   | Limite de 3 livros | Teste 1 (Vitest) e Teste 3 (Postman) | `tests/unit/multa.test.js`, `postman/biblioteca.postman_collection.json` |
   | Reserva | Teste 3 (Postman) | `postman/biblioteca.postman_collection.json` |
   | Bloqueio do login | Teste 1 (Vitest) e Teste 2 (Playwright) | `tests/unit/multa.test.js`, `tests/e2e/biblioteca.spec.js` |

5. Quando João, Gustavo e Eduarda rodarem os testes, **anexe** as evidências (arraste os arquivos de `docs/evidencias/` para o comentário da Issue) e preencha "Resultado obtido".
6. Atribua cada Issue a quem testou (campo **Assignees**) e use a label `regra`.
7. Se um teste falhar, abra uma Issue de defeito ligada à da regra (escreva `#número` da Issue da regra) e feche quando o teste passar de novo.
8. No fim, tire um print da lista de Issues e salve em `docs/evidencias/issues-lista.png`.

## Como avaliar
Confira se cada uma das 4 regras tem: teste ligado, resultado anexado e responsável. Anote o que estiver faltando.

## O que preencher na ficha (Qualidade)
- **Depois o que encontramos e o que ficou fora?** Ex.: "As 4 regras têm registro com teste e resultado. A reserva só é verificada pelo Postman. Fora: regras que não estão no sistema."

## Na apresentação
Explique o que é rastreabilidade e abra uma Issue mostrando regra → teste → resultado.
