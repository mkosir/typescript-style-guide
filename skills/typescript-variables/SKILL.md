---
name: typescript-variables
description: Apply, review, and explain TypeScript variable conventions. Use automatically for tasks involving variable declarations, const assertions, enum alternatives, literal-union state modelling, boolean flags, or choosing between null and undefined.
---

# Variables

Apply the TypeScript Style Guide's variable conventions in the context of the current task.

## Workflow

1. Inspect the consuming repository's conventions and configuration.
2. Let explicit repository conventions take precedence over this opinionated guidance.
3. Apply, review, or explain only the guidance relevant to the task.
4. State important tradeoffs when the appropriate choice depends on context or judgment.

## Boundaries

- Keep TypeScript and ESLint responsible for checks they can enforce automatically.
- Do not introduce unrelated TypeScript Style Guide conventions merely because this skill is active.

## Related Guidance

### Application State

For detailed guidance on states that require different data, use `typescript-discriminated-unions` when it is available.

<!-- BEGIN CANONICAL GUIDE CONTENT -->

## Variables

### Const Assertion

Strive to declare constants using the const assertion `as const`:

Constants are used to represent values that are not meant to change, ensuring reliability and consistency in a codebase. Const assertions preserve literal types and infer readonly properties.

- Type Narrowing - Using `as const` ensures that literal values (e.g., numbers, strings) are treated as exact values instead of generalized types like `number` or `string`.
- Readonly Properties - Objects and arrays get readonly properties, so TypeScript catches direct mutations.

Examples:

- Objects

  ```ts
  // ❌ Avoid
  const FOO_LOCATION = { x: 50, y: 130 }; // Type { x: number; y: number; }
  FOO_LOCATION.x = 10;

  // ✅ Use
  const FOO_LOCATION = { x: 50, y: 130 } as const; // Type '{ readonly x: 50; readonly y: 130; }'
  FOO_LOCATION.x = 10; // Error
  ```

- Arrays

  ```ts
  // ❌ Avoid
  const BAR_LOCATION = [50, 130]; // Type number[]
  BAR_LOCATION.push(10);

  // ✅ Use
  const BAR_LOCATION = [50, 130] as const; // Type 'readonly [50, 130]'
  BAR_LOCATION.push(10); // Error
  ```

- Template Literals

  ```ts
  // ❌ Avoid
  const RATE_LIMIT = 25;
  const RATE_LIMIT_MESSAGE = `Max number of requests/min is ${RATE_LIMIT}.`; // Type string

  // ✅ Use
  const RATE_LIMIT = 25;
  const RATE_LIMIT_MESSAGE = `Max number of requests/min is ${RATE_LIMIT}.` as const; // Type 'Max number of requests/min is 25.'
  ```

### Enums & Const Assertion

Enums are discouraged in the TypeScript ecosystem due to their runtime cost and quirks.  
The TypeScript documentation outlines several [pitfalls](https://www.typescriptlang.org/docs/handbook/enums.html#const-enum-pitfalls), and TypeScript 5.8 introduced the [--erasableSyntaxOnly](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html#the---erasablesyntaxonly-option) flag to disable runtime-generating features like enums altogether.

<Rule href="https://eslint.org/docs/latest/rules/no-restricted-syntax">{`'no-restricted-syntax': [
    'error',
    {
      selector: 'TSEnumDeclaration',
      message: 'Replace enum with a literal type or a const assertion.',
    },
]`}</Rule>

As a rule of thumb, prefer:

- Literal types whenever possible.
- Const assertion arrays when looping through values.
- Const assertion objects when enumerating arbitrary values.

Examples:

- Use literal types to avoid runtime objects and reduce bundle size.

  ```ts
  // ❌ Avoid using enums as they increase the bundle size
  enum UserRole {
    GUEST = 'guest',
    MODERATOR = 'moderator',
    ADMINISTRATOR = 'administrator',
  }

  // Transpiled JavaScript
  ('use strict');
  var UserRole;
  (function (UserRole) {
    UserRole['GUEST'] = 'guest';
    UserRole['MODERATOR'] = 'moderator';
    UserRole['ADMINISTRATOR'] = 'administrator';
  })(UserRole || (UserRole = {}));

  // ✅ Use literal types - Types are stripped during transpilation
  type UserRole = 'guest' | 'moderator' | 'administrator';

  const isGuest = (role: UserRole) => role === 'guest';
  ```

- Use const assertion arrays when looping through values.

  ```tsx
  // ❌ Avoid using enums
  enum USER_ROLES {
    guest = 'guest',
    moderator = 'moderator',
    administrator = 'administrator',
  }

  // ✅ Use const assertions arrays
  const USER_ROLES = ['guest', 'moderator', 'administrator'] as const;
  type UserRole = (typeof USER_ROLES)[number];

  const seedDatabase = () => {
    USER_ROLES.forEach((role) => {
      db.roles.insert(role);
    }
  }
  const insert = (role: UserRole) => {...

  const UsersRoleList = () => {
    return (
      <div>
        {USER_ROLES.map((role) => (
          <Item key={role} role={role} />
        ))}
      </div>
    );
  };
  const Item = ({ role }: { role: UserRole }) => {...
  ```

- Use const assertion objects when enumerating arbitrary values.

  ```ts
  // ❌ Avoid using enums
  enum COLORS {
    primary = '#B33930',
    secondary = '#113A5C',
    brand = '#9C0E7D',
  }

  // ✅ Use const assertions objects
  const COLORS = {
    primary: '#B33930',
    secondary: '#113A5C',
    brand: '#9C0E7D',
  } as const;

  type Colors = typeof COLORS;
  type ColorKey = keyof Colors; // Type "primary" | "secondary" | "brand"
  type ColorValue = Colors[ColorKey]; // Type "#B33930" | "#113A5C" | "#9C0E7D"

  const setColor = (color: ColorValue) => {...

  setColor(COLORS.primary);
  setColor('#B33930');
  ```

### Type Union & Boolean Flags

Embrace type unions, especially when type union options are mutually exclusive, instead multiple boolean flag variables.

Boolean flags have a tendency to accumulate over time, leading to confusing and error-prone code, since they hide the actual app state.

```ts
// ❌ Avoid introducing multiple boolean flag variables
const isPending, isProcessing, isConfirmed, isExpired;

// ✅ Use type union variable
type UserStatus = 'pending' | 'processing' | 'confirmed' | 'expired';
const userStatus: UserStatus;
```

Use a literal union when only the state value changes. When each state requires different data, use a [discriminated union](#application-state) to represent the valid states explicitly.

### Null & Undefined

With `strictNullChecks`, `null` and `undefined` have distinct types and meanings. Use them consistently based on what absence means in the application.  
Strive to:

- Use `null` when a value is explicitly empty, such as an assignment or function return value.
- Use `undefined` when a value is missing or omitted, such as an optional field in a form, request payload, or database query ([Prisma differentiation](https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined)).

<!-- END CANONICAL GUIDE CONTENT -->
