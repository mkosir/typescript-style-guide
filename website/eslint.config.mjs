import eslint from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  eslintPluginImport.flatConfigs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tsconfigRootDir: import.meta.name,
      },
    },
  },
  {
    files: ['**/*.{js,ts,tsx}'],
    ignores: ['!.*', 'node_modules', 'dist', 'compiled', 'build', '.docusaurus'],

    plugins: {
      react: eslintPluginReact,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      'react-hooks': eslintPluginReactHooks,
      prettier: eslintPluginPrettierRecommended,
    },

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...eslintPluginReactHooks.configs.recommended.rules,

      'react/prop-types': 'off',
      'no-undef': 'off',

      'prefer-template': 'error',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',

      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
      '@typescript-eslint/restrict-plus-operands': 'off',

      'import/no-default-export': 'error',
      'import/no-unresolved': 'off',
    },

    settings: {
      react: { version: 'detect' },
    },
  },
);
