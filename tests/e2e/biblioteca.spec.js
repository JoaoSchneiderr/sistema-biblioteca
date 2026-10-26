// Teste 2 - Playwright - teste funcional do uso do sistema (nível de sistema).
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ request, page }) => {
  await request.post('/api/reset');
  await page.goto('/');
});

async function entrar(page, senha = '1234') {
  await page.fill('#login', 'bibliotecario');
  await page.fill('#senha', senha);
  await page.click('#btn-entrar');
}

test('empréstimo e devolução com 3 dias de atraso mostra multa de R$ 3,00', async ({ page }) => {
  await entrar(page);
  await expect(page.locator('#mensagem')).toHaveText('Login realizado.');

  await page.selectOption('#emp-aluno', 'a1');
  await page.selectOption('#emp-livro', 'L1');
  await page.click('#btn-emprestar');
  await expect(page.locator('#mensagem')).toHaveText('Empréstimo registrado.');

  await page.selectOption('#dev-livro', 'L1');
  await page.fill('#dev-atraso', '3');
  await page.click('#btn-devolver');
  await expect(page.locator('#mensagem')).toHaveText('Devolução registrada. Multa: R$ 3,00');
});

test('3 senhas erradas seguidas bloqueiam o acesso', async ({ page }) => {
  await entrar(page, 'errada');
  await expect(page.locator('#mensagem')).toHaveText('Usuário ou senha inválidos');
  await entrar(page, 'errada');
  await expect(page.locator('#mensagem')).toHaveText('Usuário ou senha inválidos');
  await entrar(page, 'errada');
  await expect(page.locator('#mensagem')).toHaveText('Acesso bloqueado');

  // Mesmo com a senha certa, continua bloqueado.
  await entrar(page, '1234');
  await expect(page.locator('#mensagem')).toHaveText('Acesso bloqueado');
});
