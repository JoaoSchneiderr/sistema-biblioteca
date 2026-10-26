// Dados em memória. A rota POST /api/reset volta tudo ao estado inicial (usada pelos testes).

export function dadosIniciais() {
  return {
    usuarios: [{ login: 'bibliotecario', senha: '1234', tentativasErradas: 0, bloqueado: false }],
    alunos: [
      { id: 'a1', nome: 'Ana' },
      { id: 'a2', nome: 'Bruno' },
    ],
    livros: [
      { id: 'L1', titulo: 'Dom Casmurro', emprestadoPara: null, reservadoPor: null },
      { id: 'L2', titulo: 'O Cortiço', emprestadoPara: null, reservadoPor: null },
      { id: 'L3', titulo: 'Iracema', emprestadoPara: null, reservadoPor: null },
      { id: 'L4', titulo: 'Memórias Póstumas de Brás Cubas', emprestadoPara: null, reservadoPor: null },
      { id: 'L5', titulo: 'Vidas Secas', emprestadoPara: null, reservadoPor: null },
      { id: 'L6', titulo: 'Capitães da Areia', emprestadoPara: null, reservadoPor: null },
    ],
  };
}
