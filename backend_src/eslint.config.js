import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { 
    files: ['**/*.{js,mjs,cjs}'], 
    plugins: { js }, 
    // Nutze node globals zusätzlich zu browser für das Backend
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node ,
      },
    },
    rules: {
      'no-console': 'warn',
      'no-var': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'indent': ['error', 2, { 'SwitchCase': 1 }],
    },
  },
]);