module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
  },
  // plugins: [
  //   "prettier"
  // ],
  // "rules": {
  //   "prettier/prettier": "error"
  // }
};
