import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/', 'playwright-report/', 'test-results/', 'docs/'] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.node },
    },
    // Regras extras ligadas à manutenção (avisos, não erros):
    rules: {
      complexity: ['warn', 5], // funções com muitos caminhos são difíceis de entender e testar
      'max-lines-per-function': ['warn', { max: 30, skipBlankLines: true, skipComments: true }],
      'no-console': 'warn',
      eqeqeq: 'warn',
    },
  },
  {
    files: ['public/**/*.js'],
    languageOptions: { sourceType: 'script', globals: { ...globals.browser } },
  },
];
