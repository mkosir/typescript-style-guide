/** @type {import("eslint").Linter.Config} */

// This eslint configuration file (and tsconfig.lintstaged.json) is being used only by lint-staged

module.exports = {
  root: true,

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.lintstaged.json'],
  },

  extends: ['eslint-config-base'],
};
