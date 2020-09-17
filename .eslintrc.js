/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const tsconfig = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'tsconfig.json')),
);
module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: tsconfig,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'arrow-body-style': [2, 'as-needed'],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*specs.ts'] },
    ],
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
  },
};
