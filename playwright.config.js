import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'on',
    trace: 'on',
    // Use CHROMIUM_PATH só se o navegador do Playwright não puder ser baixado.
    launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
  },
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
});
