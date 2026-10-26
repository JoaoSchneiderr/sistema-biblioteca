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
    if (!aluno || !livro) return res.status(404).json({ erro: 'Aluno ou livro não encontrado' });
    if (livro.emprestadoPara) return res.status(409).json({ erro: 'Livro já emprestado' });
    if (!reservaPermite(livro.reservadoPor, alunoId)) {
      return res.status(409).json({ erro: 'Livro reservado para outro aluno' });
    }
    const comAluno = db.livros.filter((l) => l.emprestadoPara === alunoId).length;
    if (!podeEmprestar(comAluno)) {
      return res.status(422).json({ erro: 'Limite de 3 livros atingido' });
    }
    livro.emprestadoPara = alunoId;
    if (livro.reservadoPor === alunoId) livro.reservadoPor = null;
    res.status(201).json({ ok: true, livroId, alunoId, livrosComAluno: comAluno + 1 });
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
