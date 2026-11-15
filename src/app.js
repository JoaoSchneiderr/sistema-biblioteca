import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { dadosIniciais } from './dados.js';
import { calcularMulta, podeEmprestar, reservaPermite, deveBloquear } from './regras.js';

export function criarApp() {
  const app = express();
  let db = dadosIniciais();

  app.use(express.json());
  const pastaPublica = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
  app.use(express.static(pastaPublica));

  app.post('/api/reset', (req, res) => {
    db = dadosIniciais();
    res.json({ ok: true });
  });

  app.post('/api/login', (req, res) => {
    const { login, senha } = req.body ?? {};
    const usuario = db.usuarios.find((u) => u.login === login);
    if (!usuario) return res.status(401).json({ erro: 'Usuário ou senha inválidos' });
    if (usuario.bloqueado) return res.status(423).json({ erro: 'Acesso bloqueado' });
    if (usuario.senha !== senha) {
      usuario.tentativasErradas += 1;
      if (deveBloquear(usuario.tentativasErradas)) {
        usuario.bloqueado = true;
        return res.status(423).json({ erro: 'Acesso bloqueado' });
      }
      return res.status(401).json({ erro: 'Usuário ou senha inválidos' });
    }
    usuario.tentativasErradas = 0;
    res.json({ ok: true, usuario: usuario.login });
  });

  app.get('/api/livros', (req, res) => res.json(db.livros));
  app.get('/api/alunos', (req, res) => res.json(db.alunos));

  app.post('/api/emprestimos', (req, res) => {
    const { alunoId, livroId } = req.body ?? {};
    const aluno = db.alunos.find((a) => a.id === alunoId);
    const livro = db.livros.find((l) => l.id === livroId);
    const recusa = verificarEmprestimo(db, aluno, livro);
    if (recusa) return res.status(recusa.status).json({ erro: recusa.erro });
    const livrosComAluno = registrarEmprestimo(db, livro, alunoId);
    res.status(201).json({ ok: true, livroId, alunoId, livrosComAluno });
  });

  app.post('/api/devolucoes', (req, res) => {
    const { livroId, diasAtraso } = req.body ?? {};
    const livro = db.livros.find((l) => l.id === livroId);
    if (!livro || !livro.emprestadoPara) return res.status(404).json({ erro: 'Empréstimo não encontrado' });
    let multa;
    try {
      multa = calcularMulta(Number(diasAtraso ?? 0));
    } catch (e) {
      return res.status(400).json({ erro: e.message });
    }
    livro.emprestadoPara = null;
    res.json({ ok: true, livroId, multa });
  });

  app.post('/api/reservas', (req, res) => {
    const { alunoId, livroId } = req.body ?? {};
    const livro = db.livros.find((l) => l.id === livroId);
    if (!livro || !db.alunos.some((a) => a.id === alunoId)) {
      return res.status(404).json({ erro: 'Aluno ou livro não encontrado' });
    }
    if (!livro.emprestadoPara) return res.status(409).json({ erro: 'Livro disponível, não precisa reservar' });
    if (livro.reservadoPor) return res.status(409).json({ erro: 'Livro já reservado' });
    livro.reservadoPor = alunoId;
    res.status(201).json({ ok: true, livroId, alunoId });
  });

  return app;
}

// --- Empréstimo dividido em funções menores (ajuste do alerta "complexity" do ESLint) ---

function contarLivrosDoAluno(db, alunoId) {
  return db.livros.filter((l) => l.emprestadoPara === alunoId).length;
}

// O livro está livre para este aluno? (não emprestado e sem reserva de outra pessoa)
function verificarDisponibilidade(livro, alunoId) {
  if (livro.emprestadoPara) return { status: 409, erro: 'Livro já emprestado' };
  if (!reservaPermite(livro.reservadoPor, alunoId)) {
    return { status: 409, erro: 'Livro reservado para outro aluno' };
  }
  return null;
}

// Confere todas as regras do empréstimo. Devolve a recusa (status + mensagem) ou null se pode emprestar.
function verificarEmprestimo(db, aluno, livro) {
  if (!aluno || !livro) return { status: 404, erro: 'Aluno ou livro não encontrado' };
  const indisponivel = verificarDisponibilidade(livro, aluno.id);
  if (indisponivel) return indisponivel;
  if (!podeEmprestar(contarLivrosDoAluno(db, aluno.id))) {
    return { status: 422, erro: 'Limite de 3 livros atingido' };
  }
  return null;
}

// Registra o empréstimo e, se o aluno era quem tinha reservado, libera a reserva.
function registrarEmprestimo(db, livro, alunoId) {
  livro.emprestadoPara = alunoId;
  if (livro.reservadoPor === alunoId) livro.reservadoPor = null;
  return contarLivrosDoAluno(db, alunoId);
}
