// Teste 1 - Vitest - valores limite na regra da multa (nível de componente).
// Regra: R$ 1,00 por dia de atraso, com teto de R$ 20,00.
import { describe, it, expect } from 'vitest';
import { calcularMulta, podeEmprestar, deveBloquear } from '../../src/regras.js';

describe('Regra da multa - valores limite', () => {
  it('0 dia de atraso: sem multa (R$ 0)', () => {
    expect(calcularMulta(0)).toBe(0);
  });

  it('1 dia de atraso: primeira multa (R$ 1)', () => {
    expect(calcularMulta(1)).toBe(1);
  });

  it('20 dias de atraso: chega ao teto (R$ 20)', () => {
    expect(calcularMulta(20)).toBe(20);
  });

  it('21 dias de atraso: continua no teto (R$ 20)', () => {
    expect(calcularMulta(21)).toBe(20);
  });

  it('dias negativos: valor inválido', () => {
    expect(() => calcularMulta(-1)).toThrow('Dias de atraso inválidos');
  });
});

describe('Regra do empréstimo - valores limite', () => {
  it('aluno com 2 livros pode pegar o 3º', () => {
    expect(podeEmprestar(2)).toBe(true);
  });

  it('aluno com 3 livros não pode pegar o 4º', () => {
    expect(podeEmprestar(3)).toBe(false);
  });
});

describe('Regra do login - valores limite', () => {
  it('2 senhas erradas: ainda não bloqueia', () => {
    expect(deveBloquear(2)).toBe(false);
  });

  it('3 senhas erradas: bloqueia', () => {
    expect(deveBloquear(3)).toBe(true);
  });
});
