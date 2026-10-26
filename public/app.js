const $ = (id) => document.getElementById(id);

async function api(metodo, url, corpo) {
  const resp = await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: corpo ? JSON.stringify(corpo) : undefined,
  });
  return { status: resp.status, dados: await resp.json() };
}

function mostrar(texto) {
  $('mensagem').textContent = texto;
}

function formatarReais(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

async function carregar() {
  const alunos = (await api('GET', '/api/alunos')).dados;
  const livros = (await api('GET', '/api/livros')).dados;
  const opcoesAlunos = alunos.map((a) => `<option value="${a.id}">${a.nome}</option>`).join('');
  const opcoesLivros = livros.map((l) => `<option value="${l.id}">${l.id} - ${l.titulo}</option>`).join('');
  for (const id of ['emp-aluno', 'res-aluno']) $(id).innerHTML = opcoesAlunos;
  for (const id of ['emp-livro', 'dev-livro', 'res-livro']) $(id).innerHTML = opcoesLivros;
  $('lista-livros').innerHTML = livros
    .map((l) => `<tr><td>${l.id}</td><td>${l.titulo}</td><td>${l.emprestadoPara ?? '-'}</td><td>${l.reservadoPor ?? '-'}</td></tr>`)
    .join('');
}

$('btn-entrar').addEventListener('click', async () => {
  const { status, dados } = await api('POST', '/api/login', { login: $('login').value, senha: $('senha').value });
  if (status === 200) {
    $('tela-login').hidden = true;
    $('painel').hidden = false;
    $('usuario-logado').textContent = dados.usuario;
    mostrar('Login realizado.');
    await carregar();
  } else {
    mostrar(dados.erro);
  }
});

$('btn-emprestar').addEventListener('click', async () => {
  const { status, dados } = await api('POST', '/api/emprestimos', { alunoId: $('emp-aluno').value, livroId: $('emp-livro').value });
  mostrar(status === 201 ? 'Empréstimo registrado.' : dados.erro);
  await carregar();
});

$('btn-devolver').addEventListener('click', async () => {
  const { status, dados } = await api('POST', '/api/devolucoes', { livroId: $('dev-livro').value, diasAtraso: Number($('dev-atraso').value) });
  mostrar(status === 200 ? `Devolução registrada. Multa: ${formatarReais(dados.multa)}` : dados.erro);
  await carregar();
});

$('btn-reservar').addEventListener('click', async () => {
  const { status, dados } = await api('POST', '/api/reservas', { alunoId: $('res-aluno').value, livroId: $('res-livro').value });
  mostrar(status === 201 ? 'Reserva registrada.' : dados.erro);
  await carregar();
});
