/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },

  extends: ['eslint-config-base', 'plugin:tailwindcss/recommended'],

  rules: {
    'tailwindcss/classnames-order': 'error',
    'tailwindcss/no-custom-classname': 'off',
  },
};
