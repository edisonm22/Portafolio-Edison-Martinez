import globals from 'globals'
import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'

export default [
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      react: pluginReact,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
    },
  },
  {
    ignores: ['dist/', 'node_modules/'],
  },
]
