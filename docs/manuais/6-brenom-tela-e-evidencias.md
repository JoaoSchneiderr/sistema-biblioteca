# Manual – Brenom Moraes: tela, login, reserva e evidências

**Sua parte:** cuidar da **tela** (login, empréstimo, devolução e reserva), conferir manualmente a reserva pela tela e **organizar as evidências** e as instruções para que outra pessoa consiga repetir tudo.

## Antes de começar
Siga a seção "Preparar o ambiente" do [README](../../README.md) e rode `npm start`.

## 1. Conhecer a tela
Arquivos: `public/index.html`, `public/app.js` e `public/estilo.css`.
1. Abra http://localhost:3000 e entre com **bibliotecario / 1234**.
2. Faça um empréstimo, uma devolução com atraso e uma reserva, e confira a tabela de livros.

## 2. Verificação manual da reserva (esperado × observado)
A reserva não tem teste automático na tela, então registre a conferência manual:

| Passo | Esperado | Observado |
| --- | --- | --- |
| Emprestar L1 para Ana | "Empréstimo registrado." | |
| Reservar L1 para Bruno | "Reserva registrada." e Bruno na coluna "Reservado por" | |
| Devolver L1 (0 dia de atraso) | "Multa: R$ 0,00" | |
| Emprestar L1 para Ana | "Livro reservado para outro aluno" | |
| Emprestar L1 para Bruno | "Empréstimo registrado." | |

Tire um print de cada passo e salve em `docs/evidencias/reserva-tela-1.png`, `-2.png`…
Para recomeçar do zero, pare o sistema (`Ctrl + C`) e rode `npm start` de novo.

## 3. Organizar as evidências
No fim, `docs/evidencias/` deve ter:

| Arquivo | Quem gera |
| --- | --- |
| `teste1-vitest.txt` e print | João |
| `eslint-antes.txt`, `eslint-depois.txt` | Luis |
| `issues-lista.png` | Israel |
| `playwright-report/` e print | Gustavo |
| `postman-relatorio.html` | Eduarda |
| `reserva-tela-*.png` | Brenom |

Envie para o GitHub:
```bash
git add docs/evidencias
git commit -m "Evidências da versão Biblioteca 1"
git push
```

## 4. Conferir se dá para repetir
Em outra pasta (ou outro computador), siga o README do zero: clonar, `npm install`, rodar os quatro comandos. Anote no README qualquer passo que faltou. Registre a versão usada: Node (`node -v`) e o código do commit.

## 5. Montar a apresentação
Organize a ordem: sistema e regras (Brenom) → qualidade (Luis e Israel) → Teste 1 (João) → Teste 2 (Gustavo) → Teste 3 (Eduarda) → o que ficou fora.

## Na apresentação
Explique como a tela se comunica com a API e mostre a verificação manual da reserva com esperado × observado.
