module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always',
        ts: 'never',
        json: 'never',
      },
    ],
    'no-console': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
