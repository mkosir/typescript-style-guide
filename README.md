# TypeScript & React Style Guide

## Table of Contents

- [Introduction](#introduction)
- [TLDR](#tldr)
- [Code Collocation](#code-collocation)
- [Data immutability](#data-immutability)
- [Functions](#functions)
- [Variables](#variables)
- [Types](#types)
- [Naming](#naming)
  - [Named Export](#named-export)
  - [Naming Conventions](#naming-conventions)
    - [React Components](#react-components)
    - [Prop Types](#prop-types)
    - [Functions](#functions-1)
    - [Variables](#variables-1)
      - [Locals](#locals)
      - [Booleans](#booleans)
      - [Constants](#constants)
      - [Object constants](#object-constants)
      - [Generics](#generics)
- [React Components](#react-components-1)
  - [Props](#props)
  - [Component Types](#component-types)
  - [Passing Data](#passing-data)
- [Project Structure](#project-structure)
- [Tests](#tests)

## Introduction

TypeScript & React Style Guide provides concise set of conventions (sometimes arbitrary) and best practices used to create consistent, maintainable code.

As any code style guide is opinionated, this is no different as it tries to set conventions that govern our code.

Since "consistency is the key" majority of rules are enforced by automated tooling as ESLint, TypeScript, Prettier, etc. Still certain opinionated design and architectural decisions must be followed which are covered with described conventions bellow.

This guide requires you to use:

- [TypeScript v5](https://github.com/microsoft/TypeScript)
- [typescript-eslint v6](https://github.com/typescript-eslint/typescript-eslint) with [`strict-type-checked`](https://typescript-eslint.io/linting/configs/#strict-type-checked),
  [`stylistic-type-checked`](https://typescript-eslint.io/linting/configs/#stylistic-type-checked) configurations enabled.
- It assumes you are using, but is not limited to [React](https://github.com/facebook/react) UI library.

## TLDR

- **Code is organized and grouped by feature.** Collocate code as close as possible to where it's relevant.
- Strive for data immutability.
- Strive for functions to be pure, stateless and have single responsibility.
- Use of server-state library is encouraged ([react-query](https://github.com/tanstack/query), [apollo client](https://github.com/apollographql/apollo-client)...).
- Use of client-state library for global state is discouraged.  
  Reconsider if something should be truly global across application, e.g. `themeMode`, `Permissions` or even that can be put in server-state (e.g. user settings `/me` endpoint). If still truly needed use [Zustand](https://github.com/pmndrs/zustand) (no Redux).
- Use named exports.

## Code Collocation

- Every application or package in monorepo has project files/folders organized and grouped by **feature**.
- **Collocate code as close as possible to where it's relevant.**
- Deep folder nesting does not represent an issue.
- [Relevant article](https://kentcdodds.com/blog/colocation) on code collocation.

## Data immutability

Majority of the data should be immutable (use `Readonly`, `ReadonlyArray`, always return new array, object etc). To keep cognitive load low for future developers try to keep data objects small.  
Mutations should be used sparingly in cases when necessary: complex objects, performance reasoning etc.

## Functions

Since React components and hooks are also functions, convention that takes a lot of good parts from basic functional programming concepts should be followed as much as possible.

- Function should have single responsibility.
- Function should be stateless where the same input arguments return same value every single time.
- Function should accept at least one argument and return data.
- Function should not have side effects, but be pure. It's implementation should not modify or access variable value outside its local environment (global state, fetching etc.).
- To keep function readable and easily extensible for the future (adding/removing args), strive to have single object as the function arg, instead of multiple args.  
  As exception this not applies when having only one primitive single arg (simple functions e.g. isNumber(value), implementing currying etc.).

  ```ts
  // ❌ Avoid having multiple arguments
  transformUserInput("client", false, 60, 120, null, true, 2000);

  // ✅ Use options object as argument
  transformUserInput({
    method: "client",
    isValidated: false,
    minLines: 60,
    maxLines: 120,
    defaultInput: null,
    shouldLog: true,
    timeout: 2000,
  });
  ```

<details>
<summary>Potential exceptions of react components and hooks</summary>

```ts
// No input arguments.
const Logo = () => {
  return (
    <svg width="100" height="100">
      <circle cx="50" cy="50" r="40"></circle>
      <text x="50%" y="50%">
        Icon
      </text>
    </svg>
  );
};

// Parent React component with side effects.
const ProductsPage = () => {
  const { data: products } = useFetchProducts();

  return (
    <div>
      {products.map((product) => (
        <ProductItem name={product.name} />
      ))}
    </div>
  );
};

// React hook with side effects.
const useGetUsers: UseGeUsers = ({ country, isActive }) =>
  useQuery(["fetchUsers", { country, isActive }], () =>
    fetchUsers({ country, isActive })
  );
```

</details>

## Variables

- Create const assertion (`as const`) whenever object or array should be immutable and inferred as a literal type.
  - type is narrowed
  - object and array gets `readonly` properties
- Prefer object const assertion over enum.
- Prefer using `null` instead of `undefined`, to explicitly state it has no value - assignment, return type etc.
  Reach out for `undefined` assignment when e.g. trying to exclude fields in: forms, request payload, querying database ([Prisma differentiation](https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined)) etc.

## Types

- All types are defined with `type` alias ([eslint rule](https://typescript-eslint.io/rules/consistent-type-definitions/#type)).  
  In case of exceptions, most commonly declaration merging (extending third-party library types - [example](https://github.com/mkosir/trpc-api-boilerplate/blob/main/src/utils/types/process-env.ts#L14)), use `interface` and disable linter.

  ```ts
  // ❌ Avoid interface definitions
  interface UserInfo {
    name: string;
  }

  // ✅ Use type definition
  type UserInfo = {
    name: string;
  };
  ```

- Array types are defined with `generic` syntax ([eslint rule](https://typescript-eslint.io/rules/array-type/#generic)).

  ```ts
  // ❌ Avoid
  const x: string[] = ["a", "b"];
  const y: readonly string[] = ["a", "b"];

  // ✅ Use
  const x: Array<string> = ["a", "b"];
  const y: ReadonlyArray<string> = ["a", "b"];
  ```

- If TypeScript error can't be mitigated, as last resort use `@ts-expect-error` to suppress it ([eslint rule](https://typescript-eslint.io/rules/prefer-ts-expect-error/)). If at any future point suppressed line becomes error-free, TypeSciprt compiler will indicate it.  
   `@ts-ignore` is not allowed, while `@ts-expect-error` can be used with provided description ([eslint rule](https://typescript-eslint.io/rules/ban-ts-comment/#allow-with-description)).

  ```ts
  // ❌ Avoid @ts-ignore
  // @ts-ignore
  const result = doSomething("hello");

  // ✅ Use @ts-expect-error with description
  // @ts-expect-error: the library definition is wrong
  const result = doSomething("hello");
  ```

## Naming

Setting aside convention on cache invalidation, but for the second hardest thing, clear naming with important context should be provided.  
Strive to keep naming conventions consistent and readable, because another person will maintain the code you have written.

### Named Export

Named exports must be used to keep variables, functions... names consistent across the entire codebase ([eslint rule](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md)).  
In case of exceptions e.g. Next.js pages, disable rule:

```ts
// .eslintrc
...
overrides: [
  {
    files: ["src/pages/**/*"],
    rules: { "import/no-default-export": "off" },
  },
],
```

### Naming Conventions

While it's often hard to find the best names, try optimize code for consistency and the reader by following rules:

- #### React Components
  Pascal case (`ProductItem`, `ProductsPage`)
- #### Prop Types
  React component name following "Props" postfix `[ComponentName]Props` - (`ProductItemProps`, `ProductsPageProps`)
- #### Callback Props

  Event handler (callback) props are defined with prefix `on*` (e.g. `onClick`) and handler implementation function with prefix `handle*` (e.g. `handleClick`) - ([eslint rule](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md)).

  ```tsx
  // ❌ Avoid inconsistent callback prop naming
  <MyComponent userClick={actionUserClick} />

  // ✅ Use prop prefix 'on*' and handler prefix 'handle*'
  <MyComponent onClick={handleClick} />
  ```

- #### Functions
  Camel case (`filterProductsByType`, `useGetProducts`)
- #### Variables

  - #### Locals
    Camel case - `products`, `productsFiltered`
  - #### Booleans
    Prefixed with `is`, `has` etc. (`isProduct`)
  - #### Constants
    `PRODUCT_ID`
  - #### Object constants
    Singular, capitalized with const assertion and satisfying type (if there is one).
    ```ts
    const ORDER_STATUS = {
      pending: "pending",
      fulfilled: "fulfilled",
      error: "error",
    } as const satisfies OrderStatus;
    ```
  - #### Generics

    A name starts with the capital letter T `TRequest`, `TFooBar` (similar as [Google style guide](https://google.github.io/styleguide/javaguide.html#s5.2.8-type-variable-names) or [.Net internal](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2?view=net-5.0) implementation).  
    Avoid (popular convention) naming generics with one character `T`, `K` etc., the more variables we introduce, the easier it is to mistake them.

    ```ts
    // ❌ Avoid naming generics with one character
    const createPair = <T, K extends string>(first: T, second: K): [T, K] => {
      return [first, second];
    };
    const pair = createPair(1, "a");

    // ✅ Name starts with the capital letter T
    const createPair = <TFirst, TSecond extends string>(
      first: TFirst,
      second: TSecond
    ): [TFirst, TSecond] => {
      return [first, second];
    };
    const pair = createPair(1, "a");
    ```

## React Components

### Props

Strive to have majority of props required and not optional.  
Especially when creating new component for first/single use case majority of props should be required. When component starts covering more use cases, introduce optional props.  
There are potential exceptions, where component API needs to implement optional props from start (e.g. shared components covering multiple use cases, UI design system components - button `isDisabled` etc.)

To eliminate optional props, when possible use **discriminated type**, which will decrease complexity on component API and only necessary/required props will be passed.

```ts
// ❌ Avoid optional props as they increase complexity of component API
type StatusProps = {
  data?: Products;
  title?: string;
  time?: number;
  error?: string;
};

// ✅ Strive to have majority of props required, or if that's not possible,
// use discriminated union type for clear intent on component usage
type StatusSuccess = {
  status: 'success';
  data: Products;
  title: string;
};

type StatusLoading = {
  status: 'loading';
  time: number;
};

type StatusError = {
  status: 'error';
  error: string;
};

type StatusProps = StatusSuccess | StatusLoading | StatusError;

export const Status = (status: StatusProps) => {...
```

As mentioned React components are functions, where [respective rules apply](#functions), if it becomes to complex it probably should be broken into smaller pieces.

### Component Types

- Container:
  - All container components have postfix "Container" or "Page" `[ComponentName]Container|Page`
  - Each feature has a container component (`AddUserContainer.tsx`, `EditProductContainer.tsx`, `ProductsPage.tsx` etc.)
  - Includes business logic.
  - API integration.
  - Expected file/folder structure:
  ```
  ProductsPage/
  ├─ api/
  │  └─ useGetProducts/
  ├─ components/
  │  └─ ProductItem/
  ├─ utils/
  │  └─ filterProductsByType/
  └─ index.tsx
  ```
- UI - Feature specific
  - Representational components that are designed to fulfill feature requirements.
  - Should follow functions conventions as much as possible.
  - No API integration.
  - Expected file/folder structure:
  ```
  ProductItem/
  ├─ index.tsx
  ├─ ProductItem.stories.tsx
  └─ ProductItem.test.tsx
  ```
- UI - Design system
  - Reusable/generic types of components used throughout whole codebase.
  - Expected file/folder structure:
  ```
  Button/
  ├─ index.tsx
  ├─ styled.tsx (optional)
  ├─ Button.stories.tsx
  └─ Button.test.tsx
  ```

### Passing Data

- Prop drilling should not become an issue, if it does [break out your render method](https://kentcdodds.com/blog/prop-drilling#how-can-we-avoid-problems-with-prop-drilling).
- Component composition is discouraged. Exception can be made, with strong rational behind it, where its being emphasized how component API improved (performance improvement, better app scalability etc.)
- Fetching of data is only allowed in container components.
- Use of server-state library is encouraged ([react-query](https://github.com/tanstack/query), [apollo client](https://github.com/apollographql/apollo-client)...).
- use of client-state library for global state is discouraged.  
  Reconsider if something should be truly global across application, e.g. `themeMode`, `Permissions` or even that can be put in server-state user settings (e.g. `/me` endpoint). If still truly needed use [Zustand](https://github.com/pmndrs/zustand) (no Redux).

## Project Structure

Every application has following file/folder structure:

```shell
apps/
├─ product-manager/
│  ├─ common/
│  │  ├─ components/
│  │  │  ├─ ProductTitle/
│  │  │  ├─ ...
│  │  │  └─ index.tsx
│  │  ├─ consts/
│  │  │  ├─ paths.ts
│  │  │  └─ ...
│  │  └─ types/
│  ├─ modules/
│  │  ├─ HomePage/
│  │  ├─ ProductAddPage/
│  │  ├─ ProductPage/
│  │  ├─ ProductsPage/
│  │  │  ├─ api/
│  │  │  │  └─ useGetProducts/
│  │  │  ├─ components/
│  │  │  │  ├─ ProductItem/
│  │  │  │  ├─ ProductsStatistics/
│  │  │  │  └─ ...
│  │  │  ├─ utils/
│  │  │  │  └─ filterProductsByType/
│  │  │  └─ index.tsx
│  │  ├─ ...
│  │  └─ index.tsx
│  └─ pages/
│     ├─ products/
│     │  ├─ [id].tsx
│     │  ├─ add.tsx
│     │  ├─ index.tsx
│     ├─ _app.tsx
│     ├─ index.tsx
│     └─ ...
├─ warehouse/
├─ admin-dashboard/
└─ ...
```

- `modules` folder is responsible for implementation of each individual page (routed from `pages` folder)
- `pages` folder serves as a router, where its only responsibility is to define routes
- `common` folder is responsible for implementations that are truly used across application.  
  Since its a "global folder" it should be used sparingly (codebase tries to follow grouped by feature project structure as much as possible).

## Tests

- Test can be run through npm scripts, but it's highly encouraged to use [Jest Runner](https://marketplace.visualstudio.com/items?itemName=Tfirstris.vscode-jest-runner) VS code extension so any monorepo app/package single test can be run [instantly](https://github.com/mkosir/typescript-react-style-guide/raw/main/misc/vscode-jest-runner.gif).

  ```sh
  code --install-extension Tfirstris.vscode-jest-runner
  ```

- All test descriptions follows naming convention as `it('should ... when ...')`. [Eslint rule](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-title.md) with regex:
  ```ts
  'jest/valid-title': [
    'error',
    {
      mustMatch: { it: [/should.*when/u.source, "Test title must include 'should' and 'when'"] },
    },
  ],
  ```
- Snapshot tests are discouraged in order to avoid fragility, which leads to "just update it" turn of mind, to achieve all the tests pass.  
  Exceptions can be made, with strong rational behind it, where test output has short and clear intent, whats actually being tested (e.g. design system library critical elements that shouldn't deviate).
