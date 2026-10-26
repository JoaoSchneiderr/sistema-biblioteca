// Regras de negócio da biblioteca.
// Cada regra é uma função pura para poder ser testada isoladamente (nível de componente).

export const LIMITE_LIVROS = 3;
export const PRAZO_DIAS = 7;
export const MULTA_POR_DIA = 1;
export const TETO_MULTA = 20;
export const MAX_TENTATIVAS_LOGIN = 3;

// Regra da multa: R$ 1,00 por dia de atraso, com teto de R$ 20,00.
export function calcularMulta(diasAtraso) {
  if (!Number.isInteger(diasAtraso) || diasAtraso < 0) {
    throw new Error('Dias de atraso inválidos');
  }
  return Math.min(diasAtraso * MULTA_POR_DIA, TETO_MULTA);
}

// Regra do empréstimo: no máximo 3 livros ao mesmo tempo por aluno.
export function podeEmprestar(livrosComAluno) {
  return livrosComAluno < LIMITE_LIVROS;
}

// Regra da reserva: livro reservado só pode ser emprestado para quem reservou.
export function reservaPermite(reservadoPor, alunoId) {
  return reservadoPor === null || reservadoPor === alunoId;
}

// Regra do login: bloqueia após 3 senhas erradas seguidas.
export function deveBloquear(tentativasErradas) {
  return tentativasErradas >= MAX_TENTATIVAS_LOGIN;
}
