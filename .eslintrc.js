const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'prettier',
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/require-default-props': 0,
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};
