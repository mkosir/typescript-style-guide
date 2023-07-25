# TypeScript & React Style Guide

## Table of Contents

- [Introduction](#introduction)
- [About Guide](#about-guide)
- [TLDR](#tldr)
- [Data Immutability](#data-immutability)
- [Functions](#functions)
- [Variables](#variables)
  - [Const Assertion](#const-assertion)
  - [Enums](#enums)
  - [Null & Undefined](#null--undefined)
- [Types](#types)
  - [Type Definition](#type-definition)
  - [Array Types](#array-types)
  - [Return Types](#return-types)
  - [Type Error](#type-error)
  - [Type & Non-nullability Assertions](#type--non-nullability-assertions)
  - [any](#any)
- [Naming](#naming)
  - [Named Export](#named-export)
  - [Naming Conventions](#naming-conventions)
    - [Variables](#variables-1)
      - [Locals](#locals)
      - [Booleans](#booleans)
      - [Constants](#constants)
      - [Object constants](#object-constants)
    - [Functions](#functions-1)
    - [Generics](#generics)
    - [React Components](#react-components)
    - [Prop Types](#prop-types)
    - [Callback Props](#callback-props)
    - [React Hooks](#react-hooks)
  - [Comments](#comments)
- [React Components](#react-components-1)
  - [Props](#props)
    - [Using Props Type](#using-props-type)
    - [Required \& Optional Props](#required--optional-props)
    - [Using Discriminated Type](#using-discriminated-type)
  - [Component Types](#component-types)
  - [Passing Data](#passing-data)
- [Source Organization](#source-organization)
  - [Code Collocation](#code-collocation)
  - [Imports](#imports)
  - [Project Structure](#project-structure)
- [Tests - Unit \& Integration](#tests---unit--integration)
  - [What \& How To Test](#what--how-to-test)
  - [Test Description](#test-description)
  - [Tooling Extension](#tooling-extension)
  - [Snapshot](#snapshot)
- [Contributing](#contributing)

## Introduction

TypeScript & React Style Guide provides concise set of conventions (sometimes arbitrary) and best practices used to create consistent, maintainable code.

## About Guide

As any code style guide is opinionated, this is no different as it tries to set conventions that govern our code.

Since "consistency is the key", style guide strives to enforce majority of the rules by using automated tooling as ESLint, TypeScript, Prettier, etc. Still certain opinionated design and architectural decisions must be followed which are covered with described conventions bellow.

Style Guide requires you to use:

- [TypeScript v5](https://github.com/microsoft/TypeScript)
- [typescript-eslint v6](https://github.com/typescript-eslint/typescript-eslint) with [`strict-type-checked`](https://typescript-eslint.io/linting/configs/#strict-type-checked),
  [`stylistic-type-checked`](https://typescript-eslint.io/linting/configs/#stylistic-type-checked) configurations enabled.
- It assumes you are using, but is not limited to [React](https://github.com/facebook/react) UI library.

## TLDR

- **Code is organized and grouped by feature.** Collocate code as close as possible to where it's relevant.
- Strive for data immutability. ↓
- Strive for data immutability. &#8628;
- Strive for data immutability. &#11015;
- Strive for functions to be pure, stateless and have single responsibility.⬇
- Strive for functions to implement majority of arguments/props as required (avoid optional).
- Embrace const assertions.
- Strong emphasis to keep naming conventions consistent and readable.
- Use of server-state library is encouraged ([react-query](https://github.com/tanstack/query), [apollo client](https://github.com/apollographql/apollo-client)...).
- Use of client-state library for global state is discouraged.
- Use named exports.
- Prop drilling should not become an issue.
- Test business logic, not implementation details.

## Data Immutability

Majority of the data should be immutable (use `Readonly`, `ReadonlyArray`, always return new array, object etc). To keep cognitive load low for future developers try to keep data objects small.  
As an exception mutations should be used sparingly in cases where truly necessary: complex objects, performance reasoning etc.

## Functions

Since React components and hooks are also functions, a lot of basic concepts from functional programming applies.  
Conventions should be followed as much as possible:

- Function should have single responsibility.
- Function should be stateless where the same input arguments return same value every single time.
- Function should accept at least one argument and return data.
- Function should not have side effects, but be pure. It's implementation should not modify or access variable value outside its local environment (global state, fetching etc.).
- To keep function readable and easily extensible for the future (adding/removing args), strive to have single object as the function arg, instead of multiple args.  
  As exception this not applies when having only one primitive single arg (e.g. simple functions isNumber(value), implementing currying etc.).

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

- ### Const Assertion

  Strive to use const assertion (`as const`):

  - type is narrowed
  - object gets `readonly` properties
  - array becomes `readonly` tuple

    ```ts
    // ❌ Avoid declaring constants without const assertion
    const BASE_LOCATION = { x: 50, y: 130 }; // Type { x: number; y: number; }
    BASE_LOCATION.x = 10;
    const BASE_LOCATION = [50, 130]; // Type number[]
    BASE_LOCATION.push(10);

    // ✅ Use const assertion
    const BASE_LOCATION = { x: 50, y: 130 } as const; // Type '{ readonly x: 50; readonly y: 130; }'
    const BASE_LOCATION = [50, 130] as const; // Type 'readonly [10, 20]'
    ```

- ### Enums
  Prefer object const assertion over enum.
- ### Null & Undefined
  Prefer using `null` instead of `undefined`, to explicitly state it has no value - assignment, return type etc.  
  Reach out for `undefined` assignment when e.g. trying to exclude fields in: forms, request payload, querying database ([Prisma differentiation](https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined)) etc.

## Types

- #### Type Definition

  All types are defined with `type` alias ([eslint rule](https://typescript-eslint.io/rules/consistent-type-definitions/#type)).  
  Both are nearly equivalent, so to choose one is mostly arbitrary decision to achieve consistent codebase.

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

  In case of exceptions use `interface` and disable lint rule. E.g. declaration merging, extending third-party library types etc.

  ```ts
  declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface ProcessEnv {
      NODE_ENV: 'development' | 'production;
      PORT: string;
    }
  }

  ```

- #### Array Types

  Array types must be defined with `generic` syntax ([eslint rule](https://typescript-eslint.io/rules/array-type/#generic)).

  ```ts
  // ❌ Avoid
  const x: string[] = ["a", "b"];
  const y: readonly string[] = ["a", "b"];

  // ✅ Use
  const x: Array<string> = ["a", "b"];
  const y: ReadonlyArray<string> = ["a", "b"];
  ```

- #### Return Types

  Including return type annotations is highly encouraged, altought not required ([eslint rule](https://typescript-eslint.io/rules/explicit-function-return-type/)).

  Consider benefits when explicitly typing the return value of a function:

  - Return values makes it clear and easy to understand to any calling code what type is returned.
  - In the case where there is no return value, the calling code doesn't try to use the undefined value when it shouldn't.
  - Surface potential type errors faster in the future if there are code changes that change the return type of the function.
  - Easier to refactor, since it ensures that the return value is assigned to a variable of the correct type.
  - Similar to writing tests before implementation (TDD), defining function arguments and return type, gives you the opportunity to discuss the feature functionality and its interface ahead of implementation.
  - Although type inference is very convenient, adding return types can save TypeScript compiler a lot of work.

- #### Type Error

  If TypeScript error can't be mitigated, as last resort use `@ts-expect-error` to suppress it ([eslint rule](https://typescript-eslint.io/rules/prefer-ts-expect-error/)). If at any future point suppressed line becomes error-free, TypeScript compiler will indicate it.  
   `@ts-ignore` is not allowed, while `@ts-expect-error` can be used with provided description ([eslint rule](https://typescript-eslint.io/rules/ban-ts-comment/#allow-with-description)).

  ```ts
  // ❌ Avoid @ts-ignore
  // @ts-ignore
  const result = doSomething("hello");

  // ✅ Use @ts-expect-error with description
  // @ts-expect-error: the library definition is wrong
  const result = doSomething("hello");
  ```

- #### Type & Non-nullability Assertions

  Type assertions `brand as BrandType` and non-nullability assertions `brand!.name` are unsafe. Both only silence TypeScript compiler and increase the risk of crashing application at runtime.  
  They can only be used as last resort exceptions (e.g. third party library types mismatch etc.) with strong rational why being introduced into codebase.

- #### any

  `any` data type must not be used as it represents literally “any” value that TypeScript defaults to and skips type checking since it cannot infer the type. As such, any is dangerous, it can mask severe programming errors.  
  If error truly cannot be resolved as safer option use type `unknown` since it does not allow dereferencing all properties or as last resort use `@ts-expect-error` ([Type Error](#type-error)).

## Naming

Setting aside convention on cache invalidation, but for the second hardest thing, clear naming with important context should be provided.

Strive to keep naming conventions consistent and readable, because another person will maintain the code you have written.

### Named Export

Named exports must be used to ensure that all imports follow a uniform pattern ([eslint rule](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md)).  
This keeps variables, functions... names consistent across the entire codebase.  
Named exports have the benefit of erroring when import statements try to import something that hasn't been declared.

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

While it's often hard to find the best names, try optimize code for consistency and future reader by following rules:

- #### Variables

  - #### Locals
    Camel case  
    `products`, `productsFiltered`
  - #### Booleans
    Prefixed with `is`, `has` etc.  
    `isDisabled`, `hasProduct`
  - #### Constants
    Capitalized  
    `PRODUCT_ID`
  - #### Object constants
    Singular, capitalized with const assertion and optionally satisfies type (if there is one).
    ```ts
    const ORDER_STATUS = {
      pending: "pending",
      fulfilled: "fulfilled",
      error: "error",
    } as const satisfies OrderStatus;
    ```

- #### Functions

  Camel case  
  `filterProductsByType`, `formatCurrency`

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

- #### React Components
  Pascal case  
  `ProductItem`, `ProductsPage`
- #### Prop Types
  React component name following "Props" postfix  
  `[ComponentName]Props` - `ProductItemProps`, `ProductsPageProps`
- #### Callback Props

  Event handler (callback) props are prefixed as `on*` - e.g. `onClick`.  
  Event handler implementation functions are prefixed as `handle*` - e.g. `handleClick` ([eslint rule](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md)).

  ```tsx
  // ❌ Avoid inconsistent callback prop naming
  <Button click={actionClick} />
  <MyComponent userSelectedOccurred={triggerUser} />

  // ✅ Use prop prefix 'on*' and handler prefix 'handle*'
  <Button onClick={handleClick} />
  <MyComponent onUserSelected={handleUserSelected} />
  ```

- #### React Hooks

  Camel case, prefixed as 'use' ([eslint rule](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)), symmetrically convention as `[value, setValue] = useState()` ([eslint rule](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md#rule-details))

  ```ts
  // ❌ Avoid inconsistent useState hook naming
  const [userName, setUser] = useState();
  const [color, updateColor] = useState();
  const [visible, setVisible] = useState();

  // ✅ Use
  const [name, setName] = useState();
  const [color, setColor] = useState();
  const [isActive, setIsActive] = useState();
  ```

  Custom hook must always return an object:

  ```ts
  // ❌ Avoid
  const [products, errors] = useGetProducts();
  const [fontSizes] = useTheme();

  // ✅ Use
  const { products, errors } = useGetProducts();
  const { fontSizes } = useTheme();
  ```

### Comments

Comments in general should be avoided. Try to write clear code and name things what they are before adding comments.

As an exception use comments only when you need to add context or explain choices that cannot be expressed through code.  
Comments should always be complete sentences. As rule of a thumb try to explain `why` in comments, not `how` and `what`.

```ts
// ❌ Avoid
// convert to minutes
const m = s * 60;
// avg users per minute
const myAvg = u / m;

// ✅ Use
const SECONDS_IN_MINUTE = 60;
const minutes = seconds * SECONDS_IN_MINUTE;
const averageUsersPerMinute = noOfUsers / minutes;

// TODO: Filtering should be moved to the backend once API changes are released.
// Issue/PR - https://github.com/foo/repo/pulls/55124
const filteredUsers = frontendFiltering(selectedUsernames);

// Use Fourier transformation to minimize information loss - https://github.com/dntj/jsfft#usage
const frequencies = signal.FFT();
```

## React Components

### Props

#### Using Props Type

```tsx
// ❌ Avoid using React.FC type
type FooProps = {
  name: string;
  score: number;
};

export const Foo: React.FC<FooProps> = ({ name, score }) => {

// ✅ Use props argument with type
type FooProps = {
  name: string;
  score: number;
};

export const Foo = ({ name, score }: FooProps) => {...
```

#### Required & Optional Props

Strive to have majority of props required and not optional.  
Especially when creating new component for first/single use case majority of props should be required. When component starts covering more use cases, introduce optional props.  
There are potential exceptions, where component API needs to implement optional props from the start (e.g. shared components covering multiple use cases, UI design system components - button `isDisabled` etc.)

An exaggerated example where implementing 10 React components (or functions) with 5 required props each, is better then implementing one "can do it all" function which accepts 50 optional props.  
As mentioned React components are functions, where [respective conventions apply](#functions), if it becomes to complex it probably should be broken into smaller pieces.

#### Using Discriminated Type

When applicable use **discriminated type** to eliminate optional props, which will decrease complexity on component API and only necessary/required props will be passed.

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
- Component composition is discouraged. Exceptions can be made, with strong rational behind it, where its being emphasized how component API improved (performance improvement, better app scalability etc.)
- Fetching of data is only allowed in container components.
- Use of server-state library is encouraged ([react-query](https://github.com/tanstack/query), [apollo client](https://github.com/apollographql/apollo-client)...).
- use of client-state library for global state is discouraged.  
  Reconsider if something should be truly global across application, e.g. `themeMode`, `Permissions` or even that can be put in server-state (e.g. user settings - `/me` endpoint). If still truly needed use [Zustand](https://github.com/pmndrs/zustand) (not Redux, Mobx etc.).

## Source Organization

### Code Collocation

- Every application or package in monorepo has project files/folders organized and grouped by **feature**.
- **Collocate code as close as possible to where it's relevant.**
- Deep folder nesting should not represent an issue.

### Imports

Import paths can be relative, starting with `./` or `../`, or they can be absolute `common/components`.

Relative imports `./myCustomHook` must be used when importing files within the same feature, as it allows moving feature around the codebase without introducing changes in these imports.  
Absolute imports `common/components` must be used in all other cases.

### Project Structure

Example monorepo project, where every application has following file/folder structure:

```shell
apps/
├─ product-manager/
│  ├─ common/
│  │  ├─ components/
│  │  │  ├─ Button/
│  │  │  ├─ ProductTitle/
│  │  │  ├─ ...
│  │  │  └─ index.tsx
│  │  ├─ consts/
│  │  │  ├─ paths.ts
│  │  │  └─ ...
│  │  ├─ hooks/
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
│  ├─ eslintrc.js
│  ├─ package.json
│  └─ tsconfig.json
├─ warehouse/
├─ admin-dashboard/
└─ ...
```

- `modules` folder is responsible for implementation of each individual page, where all custom features for that page are being implemented (components, hooks, utils functions etc.).
- `common` folder is responsible for implementations that are truly used across application. Since its a "global folder" it should be used sparingly.  
  If same component e.g. `common/components/ProductTitle` starts being used on more the one page, it shall be moved to common folder.

In case Nextjs is being used as React framework, `pages` folder serves only as a router, where its responsibility is to define routes (no business logic implementation). Same approach applies for other frameworks with file-system based router.

## Tests - Unit & Integration

### What & How To Test

Automated test comes with benefits that helps us write better code and makes it easy to refactor, while bugs are caught earlier in the process.  
 Consider trade-offs of what and how to test to achieve confidence application is working as intended, while writing and maintaining tests doesn't slow the team down.

✅ Do:

- Design test to be short, simple, and delightful to work with. One should look at a test and get the intent instantly.
- Strive to write tests in a way your app/package is used by a user, meaning test business logic.  
  E.g. given some user input, they receive the expected output for a process.
- All tests must be setup and implemented to run as standalone in isolation, where they don't depend on other tests order of execution.
- Make tests resilient to changes, query HTML elements based on attributes that are unlikely to change.  
  Order of priority must be followed as specified in [Testing Library](https://testing-library.com/docs/queries/about/#priority) - [role](https://testing-library.com/docs/queries/byrole), [label](https://testing-library.com/docs/queries/bylabeltext), [placeholder](https://testing-library.com/docs/queries/byplaceholdertext), [text contents](https://testing-library.com/docs/queries/bytext), [display value](https://testing-library.com/docs/queries/bydisplayvalue), [alt text](https://testing-library.com/docs/queries/byalttext), [title](https://testing-library.com/docs/queries/bytitle), [test ID](https://testing-library.com/docs/queries/bytestid).

❌ Don't:

- Don't test implementation details. When refactoring code, tests shouldn't change.
- Don't re-test the library/framework.
- Don't mandate 100% code coverage for applications.
- Don't test just to test.

### Test Description

All test descriptions must follow naming convention as `it('should ... when ...')`.  
 [Eslint rule](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-title.md#mustmatch--mustnotmatch) implements regex:

```ts
'jest/valid-title': [
  'error',
  {
    mustMatch: { it: [/should.*when/u.source, "Test title must include 'should' and 'when'"] },
  },
],
```

```ts
// ❌ Avoid
it("accepts ISO date format where date is parsed and formatted as YYYY-MM");
it("after title is confirmed user description is rendered");

// ✅ Name test description as it('should ... when ...')
it("should return parsed date as YYYY-MM when input is in ISO date format");
it("should render user description when title is confirmed");
```

### Tooling Extension

Test can be run through npm scripts, but to improve development experience it's highly encouraged to use [Jest Runner](https://marketplace.visualstudio.com/items?itemName=Tfirstris.vscode-jest-runner) VS code extension so any single test can be run [instantly](https://github.com/mkosir/typescript-react-style-guide/raw/main/misc/vscode-jest-runner.gif), especially if testing app/package in larger codebase (monorepo).

```sh
code --install-extension Tfirstris.vscode-jest-runner
```

### Snapshot

Snapshot tests are discouraged in order to avoid fragility, which leads to "just update it" turn of mind, to achieve all the tests pass.  
 Exceptions can be made, with strong rational behind it, where test output has short and clear intent, whats actually being tested (e.g. design system library critical elements that shouldn't deviate).

## Contributing

All contributions are welcome!  
Open a [PR](.github/pull_request_template.md), [issue](https://github.com/mkosir/typescript-react-style-guide/issues/new/choose) or [discussion](https://github.com/mkosir/typescript-react-style-guide/discussions/new/choose).
