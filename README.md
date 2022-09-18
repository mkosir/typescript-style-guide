# Turborepo / Next.js / TypeScript boilerplate

[![TypeScript][typescript-badge]][typescript-url]
[![semantic-release][semantic-badge]][semantic-url]

[![CI][lint-badge]][lint-url]
[![CI][tsc-badge]][tsc-url]
[![CI][build-badge]][build-url]
[![CI][test-badge]][test-url]

Opinionated frontend monorepo with focus on best practices and painless developer experience.

## Requirements

- [Node v18+](https://nodejs.org/)

## Running

_Easily set up a local development environment_

- `npm install`
- `npm run dev` - Start all NextJs apps 🚀

Visit one of the monorepo apps [localhost:3100](http://localhost:3100/)

## Features:

- [Turborepo v1](https://turborepo.org/) remote cache build system, with blazingly fast execution of commands (build, lint, test etc.) on your local machine and CI
- [TypeScript v4](https://github.com/microsoft/TypeScript) codebase with [Strict Configuration](https://typescript-eslint.io/docs/linting/configs#strict)
- [NextJs](https://github.com/vercel/next.js) apps
- Depending on your preference to build custom UI components, monorepo includes 3 separate packages with respective configs.  
  Any UI package can be easily imported into Nextjs app:
  - Vanilla CSS package - [ui](https://github.com/mkosir/turborepo-boilerplate-multiple-ui/tree/main/packages/ui)
  - [MUI v5](https://mui.com/) package - [ui-mui](https://github.com/mkosir/turborepo-boilerplate-multiple-ui/tree/main/packages/ui-mui)
  - [Tailwind v3](https://tailwindcss.com/) package - [ui-tailwind](https://github.com/mkosir/turborepo-boilerplate-multiple-ui/tree/main/packages/ui-tailwind)
- Unit and integration tests with [Jest](https://github.com/facebook/jest)
- Linting with [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/) code formatter
- Git hooks with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- Commit messages must meet [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format.  
  After staging changes just run `npm run commit` and get instant feedback on your commit message formatting and be prompted for required fields by [Commitizen](https://github.com/commitizen/cz-cli)

# Commands

Bellow commands will be executed on monorepo level - on all apps and packages where npm script exists.

| Command             | Description                                                                         |
| ------------------- | ----------------------------------------------------------------------------------- |
| prepare             | Setup git hooks with Husky (executes on npm install)                                |
| build               | Build all apps and packages                                                         |
| dev                 | Start all apps                                                                      |
| lint                | Lint all apps and packages                                                          |
| lint-stage-husky    | Run lint-staged on every commit                                                     |
| tsc                 | Run TypeScript compiler                                                             |
| test                | Run tests on all apps and packages                                                  |
| storybook           | Start storybooks on all apps and packages                                           |
| format-lint         | Lint formatting with Prettier                                                       |
| format-fix          | Fix formatting with Prettier                                                        |
| commit              | Run Commitizen on staged file                                                       |
| clean               | Remove installed, generated and cached folders (node_modules, coverage, .next etc.) |
| update-dependencies | Update dependencies to their latest versions                                        |

[typescript-badge]: https://badges.frapsoft.com/typescript/code/typescript.svg?v=101
[typescript-url]: https://github.com/microsoft/TypeScript
[semantic-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[lint-badge]: https://github.com/mkosir/turborepo-boilerplate-multiple-ui/actions/workflows/lint.yml/badge.svg
[lint-url]: https://github.com/mkosir/turborepo-boilerplate-multiple-ui/actions/workflows/lint.yml
[tsc-badge]: https://github.com/mkosir/turborepo-boilerplate-multiple-ui/actions/workflows/tsc.yml/badge.svg
[tsc-url]: https://github.com/mkosir/turborepo-boilerplate-multiple-ui/actions/workflows/tsc.yml
[build-badge]: https://github.com/mkosir/turborepo-boilerplate-multiple-ui/actions/workflows/build.yml/badge.svg
[build-url]: https://github.com/mkosir/turborepo-boilerplate-multiple-ui/actions/workflows/build.yml
[test-badge]: https://github.com/mkosir/turborepo-boilerplate-multiple-ui/actions/workflows/test.yml/badge.svg
[test-url]: https://github.com/mkosir/turborepo-boilerplate-multiple-ui/actions/workflows/test.yml
