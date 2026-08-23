---
name: typescript-naming
description: Apply, review, and explain TypeScript naming conventions. Use automatically for tasks involving exports, identifiers, generic type parameters, acronyms, React props and handlers, hooks, comments, or TSDoc.
---

# Naming

Apply the TypeScript Style Guide's naming conventions in the context of the current task.

## Workflow

1. Inspect the consuming repository's conventions and configuration.
2. Let explicit repository conventions take precedence over this opinionated guidance.
3. Apply, review, or explain only the guidance relevant to the task.
4. State important tradeoffs when the appropriate name or documentation depends on context or judgment.

## Boundaries

- Keep ESLint and other tooling responsible for checks they can enforce automatically.
- Do not introduce unrelated TypeScript Style Guide conventions merely because this skill is active.

## Related Guidance

### Type-Safe Constants With Satisfies

For detailed guidance on validating constants against existing types, use `typescript-types` when it is available.

<!-- BEGIN CANONICAL GUIDE CONTENT -->

## Naming

Strive to keep naming conventions consistent and readable, with important context provided, because another person will maintain the code you have written.

### Named Export

<!-- prettier-ignore-start -->
<Rule
  prefix="Named exports must be used to ensure that all imports follow a uniform pattern"
  href="https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md"
>{`export default [
  {
    rules: { 'import/no-default-export': 'error' },
  },
  // In case of exceptions disable the rule
  {
    files: ['src/pages/**/*'],
    rules: { 'import/no-default-export': 'off' },
  },
];
`}</Rule>
<!-- prettier-ignore-end -->

This keeps variable and function names consistent across the entire codebase. Named exports have the benefit of
erroring when import statements try to import something that hasn't been declared.

### Naming Conventions

While it's often hard to find the best name, aim to optimize code for consistency and future readers by following these conventions:

#### Variables {#variables-1}

- **Locals**  
  Camel case  
  `products`, `productsFiltered`
- **Booleans**  
   Prefixed with `is`, `has` etc.  
   `isDisabled`, `hasProduct`
  <!-- prettier-ignore-start -->
  <Rule href="https://typescript-eslint.io/rules/naming-convention">
    {`'@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'are', 'should', 'has', 'can', 'did', 'will'],
      }
  ]
  `}
  </Rule>
  <!-- prettier-ignore-end -->

- **Constants**  
  Capitalized

  ```ts
  const FEATURED_PRODUCT_ID = '8f47d2a1-b13e-4d5a-a7d8-6ef1234';
  ```

- **Object & Array Constants**

  Singular, capitalized with const assertion.

  ```ts
  const IDLE_ORDER = {
    pending: 'idle',
    fulfilled: true,
    error: 'Shipping Error',
  } as const;

  const DASHBOARD_ACCESS_ROLES = ['admin', 'editor', 'moderator'] as const;
  ```

  If a type exists, use [Type-Safe Constants With Satisfies](#type-safe-constants-with-satisfies).

  ```ts
  // Type OrderStatus is predefined (e.g. generated from database schema, API)
  type OrderStatus = {
    pending: 'pending' | 'idle';
    fulfilled: boolean;
    error: string;
  };

  const IDLE_ORDER = {
    pending: 'idle',
    fulfilled: true,
    error: 'Shipping Error',
  } as const satisfies OrderStatus;

  // Type UserRole is predefined
  type UserRole = 'admin' | 'editor' | 'moderator' | 'viewer' | 'guest';

  const DASHBOARD_ACCESS_ROLES = ['admin', 'editor', 'moderator'] as const satisfies ReadonlyArray<UserRole>;
  ```

#### Functions {#functions-1}

Camel case  
`filterProductsByType`, `formatCurrency`

#### Types {#types-1}

Pascal case  
`OrderStatus`, `ProductItem`

<Rule href="https://typescript-eslint.io/rules/naming-convention">
  {`
'@typescript-eslint/naming-convention': [
  'error',
  {
    selector: 'typeAlias',
    format: ['PascalCase'],
  },
]`}
</Rule>

#### Generics

A generic type parameter must start with the capital letter T followed by a descriptive name `TRequest`, `TFooBar`.

Key reasons and benefits:

- Complex types often involve generics, for which clear naming improves readability and maintainability.
- Single-letter generics like `T`, `K`, and `U` are disallowed. The more parameters we introduce, the easier it is to mistake them.
- Prefixing with `T` makes it immediately obvious that it's a generic type parameter, not a regular type.
- A common scenario is when a generic parameter shadows an existing type because it has the same name, e.g. `<Request extends Request>`.

<Rule href="https://typescript-eslint.io/rules/naming-convention">
  {`'@typescript-eslint/naming-convention': [
    'error',
    {
      // Generic type parameter must start with letter T, followed by any uppercase letter.
      selector: 'typeParameter',
      format: ['PascalCase'],
      custom: { regex: '^T[A-Z]', match: true },
    }
]`}
</Rule>

```ts
// ❌ Avoid naming generic parameters with one letter
const createPair = <T, K extends string>(first: T, second: K): [T, K] => {
  return [first, second];
};
const pair = createPair(1, 'a');

// ✅ Use descriptive names starting with capital T
const createPair = <TFirst, TSecond extends string>(first: TFirst, second: TSecond): [TFirst, TSecond] => {
  return [first, second];
};
const pair = createPair(1, 'a');

// ❌ Avoid naming generic parameters without a prefix - which 'Request' is which?
const handle = <Request extends Request>(req: Request): void => {...

// ✅ Prefix generic parameter with capital T
const handle = <TRequest extends Request>(req: TRequest): void => {...
```

#### Abbreviations & Acronyms

Treat acronyms as whole words, with capitalized first letter only.

```ts
// ❌ Avoid
const FAQList = ['qa-1', 'qa-2'];
const generateUserURL(params) => {...}

// ✅ Use
const FaqList = ['qa-1', 'qa-2'];
const generateUserUrl(params) => {...}
```

For readability, strive to avoid abbreviations, unless they are widely accepted and necessary.

```ts
// ❌ Avoid
const GetWin(params) => {...}

// ✅ Use
const GetWindow(params) => {...}
```

#### React Components

Pascal case  
 `ProductItem`, `ProductsPage`

#### Prop Types

React component name followed by the "Props" suffix  
 `[ComponentName]Props` - `ProductItemProps`, `ProductsPageProps`

#### Callback Props

Event handler (callback) props are prefixed with `on*` - e.g. `onClick`.  
Event handler implementation functions are prefixed with `handle*` - e.g. `handleClick`.

<Rule href="https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md">{`'react/jsx-handler-names': [
    'error',
    {
      eventHandlerPrefix: 'handle',
      eventHandlerPropPrefix: 'on',
    },
]`}</Rule>

```tsx
// ❌ Avoid inconsistent callback prop naming
<Button click={actionClick} />
<MyComponent userSelectedOccurred={triggerUser} />

// ✅ Use prop prefix 'on*' and handler prefix 'handle*'
<Button onClick={handleClick} />
<MyComponent onUserSelected={handleUserSelected} />
```

#### React Hooks

<Rule
  prefix="Camel case, prefixed as 'use'"
  href="https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks"
>{`'react-hooks/rules-of-hooks': 'error'`}</Rule>
<Rule
  prefix="Symmetrical convention: [value, setValue] = useState()"
  href="https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md#rule-details"
>{`'react/hook-use-state': 'error'`}</Rule>

```ts
// ❌ Avoid inconsistent useState hook naming
const [userName, setUser] = useState();
const [color, updateColor] = useState();
const [isActive, setActive] = useState();

// ✅ Use
const [name, setName] = useState();
const [color, setColor] = useState();
const [isActive, setIsActive] = useState();
```

A custom hook must always return an object.

```ts
// ❌ Avoid
const [products, errors] = useGetProducts();
const [fontSizes] = useTheme();

// ✅ Use
const { products, errors } = useGetProducts();
const { fontSizes } = useTheme();
```

### Comments

Comments can quickly become outdated, leading to confusion rather than clarity.

Favor expressive code over comments by using meaningful names and clear logic. Comments should primarily explain "why," not "what" or "how."

Use comments when:

- The context or reasoning isn't obvious from the code alone (e.g. config files, workarounds)
- Referencing related issues, PRs, or planned improvements

```ts
// ❌ Avoid
// convert to minutes
const m = s * 60;
// avg users per minute
const myAvg = u / m;

// ✅ Use - Prefer expressive code by naming things what they are
const SECONDS_IN_MINUTE = 60;
const minutes = seconds * SECONDS_IN_MINUTE;
const averageUsersPerMinute = noOfUsers / minutes;

// ✅ Use - Reference planned improvements
// TODO: Move filtering to the backend once API v2 is released.
// Issue/PR - https://github.com/foo/repo/pulls/55124
const filteredUsers = frontendFiltering(selectedUsers);

// ✅ Use - Add context to explain why
// Use Fourier transformation to minimize information loss - https://github.com/dntj/jsfft#usage
const frequencies = signal.FFT();
```

#### TSDoc Comments

[TSDoc](https://tsdoc.org/) standardizes TypeScript documentation comments so editors and documentation tools can interpret them consistently. This improves developer experience and supports generated API documentation.

Use TSDoc comments when documenting APIs, libraries, configurations, or reusable code.

```ts
/**
 * Configuration options for the Web3 SDK.
 */
export type Web3Config = {
  /** Ethereum network chain ID. */
  chainId: number;

  /**
   * Gas price strategy for transactions:
   * - `fast`: Higher fees, faster confirmation
   * - `standard`: Balanced
   * - `slow`: Lower fees, slower confirmation
   */
  gasPriceStrategy: 'fast' | 'standard' | 'slow';

  /** Maximum gas limit per transaction. */
  maxGasLimit?: number;

  /** Enables event listening for smart contract interactions. */
  enableEventListener?: boolean;
};
```

<!-- END CANONICAL GUIDE CONTENT -->
