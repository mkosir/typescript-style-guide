import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import * as eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import * as eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import * as tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  eslintPluginJsxA11y.flatConfigs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {
    ignores: ['!.*', 'node_modules', 'dist', 'compiled', 'build', '.docusaurus'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tsconfigRootDir: import.meta.name,
      },
    },
    settings: {
      'import-x/resolver-next': [createTypeScriptImportResolver()],
      react: { version: 'detect' },
    },
  },
  {
    files: ['**/*.{js,ts,tsx}'],

    plugins: {
      'react-hooks': eslintPluginReactHooks,
    },

    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,

      'react/jsx-sort-props': ['error', { callbacksLast: true, shorthandFirst: true }],
      'react/react-in-jsx-scope': 'off',
      'react/hook-use-state': 'error',

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
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'are', 'should', 'has', 'can', 'did', 'will'],
        },
        {
          // Generic type parameter must start with letter T, followed by any uppercase letter.
          selector: 'typeParameter',
          format: ['PascalCase'],
          custom: { regex: '^T[A-Z]', match: true },
        },
      ],

      'import-x/no-default-export': 'error',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
);
