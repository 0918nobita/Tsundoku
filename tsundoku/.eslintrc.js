module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'prettier/react'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.jsx', '.tsx'] },
    ],
    'prettier/prettier': 'error',
  },
};
