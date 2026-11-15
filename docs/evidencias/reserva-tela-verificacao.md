# Verificação manual da reserva pela tela (esperado × observado)

Versão: Biblioteca 1 · Node v22.14.0 · navegador Chromium · usuário `bibliotecario`. Sistema reiniciado antes de começar.

| # | Passo | Esperado | Observado | Print |
| --- | --- | --- | --- | --- |
| 1 | Emprestar L1 para Ana | "Empréstimo registrado." | "Empréstimo registrado." (L1 emprestado para a1) | `reserva-tela-1.png` |
| 2 | Reservar L1 para Bruno | "Reserva registrada." e Bruno em "Reservado por" | "Reserva registrada." e `a2` em "Reservado por" | `reserva-tela-2.png` |
| 3 | Devolver L1 (0 dia de atraso) | "Multa: R$ 0,00" | "Devolução registrada. Multa: R$ 0,00" | `reserva-tela-3.png` |
| 4 | Emprestar L1 para Ana | "Livro reservado para outro aluno" | "Livro reservado para outro aluno" | `reserva-tela-4.png` |
| 5 | Emprestar L1 para Bruno | "Empréstimo registrado." | "Empréstimo registrado." (L1 com a2, reserva liberada) | `reserva-tela-5.png` |

**Resultado:** 5 de 5 passos com o observado igual ao esperado.
