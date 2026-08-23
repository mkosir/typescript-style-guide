## Types

When creating types, consider how they would best **describe our code**.  
Being expressive and keeping types as **narrow as possible** offers several benefits to the codebase:

- Increased Type Safety - Catch errors at compile time, as narrowed types provide more specific information about the shape and behavior of your data.
- Improved Code Clarity - Reduces cognitive load by providing clearer boundaries and constraints on your data, making your code easier for other developers to understand.
- Easier Refactoring - With narrower types, making changes to your code becomes less risky, allowing you to refactor with confidence.

### Type Inference

As a rule of thumb, explicitly declare types only when it helps to narrow them.

<Note>
  Just because you don't need to add types doesn't mean you shouldn't. In some cases, explicitly declaring types can
  improve code readability and clarify intent.
</Note>

Explicitly declare types when doing so helps to narrow them:

```ts
// ❌ Avoid
const employees = new Map(); // Inferred as wide type 'Map<any, any>'
employees.set('Lea', 17);
type UserRole = 'admin' | 'guest';
const [userRole, setUserRole] = useState('admin'); // Inferred as 'string', not the desired narrowed literal type

// ✅ Use explicit type declarations to narrow the types.
const employees = new Map<string, number>(); // Narrowed to 'Map<string, number>'
employees.set('Gabriel', 32);
type UserRole = 'admin' | 'guest';
const [userRole, setUserRole] = useState<UserRole>('admin'); // Explicit type 'UserRole'
```

Avoid explicitly declaring types when they can be inferred:

```ts
// ❌ Avoid
const userRole: string = 'admin'; // Inferred as wide type 'string'
const employees = new Map<string, number>([['Gabriel', 32]]); // Redundant type declaration
const [isActive, setIsActive] = useState<boolean>(false); // Redundant, inferred as 'boolean'

// ✅ Use type inference.
const USER_ROLE = 'admin'; // Inferred as narrowed string literal type 'admin'
const employees = new Map([['Gabriel', 32]]); // Inferred as 'Map<string, number>'
const [isActive, setIsActive] = useState(false); // Inferred as 'boolean'
```

### Data Immutability

Immutability should be a key principle. Wherever possible, prevent unintended mutations with types like `Readonly` and `ReadonlyArray`.

- Readonly types help prevent accidental mutations and bugs caused by unintended side effects. This protection exists during type checking and does not freeze values at runtime.
- When performing data processing, always return new arrays, objects, or other reference-based data structures. To minimize cognitive load for future developers, strive to keep data objects flat and concise.
- Use mutations sparingly, only in cases where they are truly necessary, such as when dealing with complex objects or optimizing for performance.

```ts
// ❌ Avoid data mutations
const removeFirstUser = (users: Array<User>) => {
  if (users.length === 0) {
    return users;
  }
  return users.splice(1);
};

// ✅ Use readonly type to prevent accidental mutations
const removeFirstUser = (users: ReadonlyArray<User>) => {
  if (users.length === 0) {
    return users;
  }
  return users.slice(1);
  // Using arr.splice(1) errors - Function 'splice' does not exist on 'users'
};
```

### Required & Optional Object Properties

**Strive to have the majority of object properties required and use optional properties sparingly.**

This approach reflects designing type-safe and maintainable code:

- Clarity and Predictability - Required properties make it explicit which data is always expected. This reduces ambiguity for developers using or consuming the object, as they know exactly what must be present.
- Type Safety - When properties are required, TypeScript can enforce their presence and catch missing properties during type checking.
- Avoids Overuse of Optional Chaining - If too many properties are optional, it often leads to extensive use of optional chaining (`?.`) to handle potential undefined values. This clutters the code and obscures its intent.

If introducing many optional properties truly can't be avoided, utilize **discriminated union types**.

```ts
// ❌ Avoid optional properties when possible, as they increase complexity and ambiguity
type User = {
  id?: number;
  email?: string;
  dashboardAccess?: boolean;
  adminPermissions?: ReadonlyArray<string>;
  subscriptionPlan?: 'free' | 'pro' | 'premium';
  rewardsPoints?: number;
  temporaryToken?: string;
};

// ✅ Prefer required properties. If optional properties are unavoidable,
// use a discriminated union to make object usage explicit and predictable.
type AdminUser = {
  role: 'admin';
  id: number;
  email: string;
  dashboardAccess: boolean;
  adminPermissions: ReadonlyArray<string>;
};

type RegularUser = {
  role: 'regular';
  id: number;
  email: string;
  subscriptionPlan: 'free' | 'pro' | 'premium';
  rewardsPoints: number;
};

type GuestUser = {
  role: 'guest';
  temporaryToken: string;
};

// Discriminated union type 'User' ensures clear intent with no optional properties
type User = AdminUser | RegularUser | GuestUser;

const regularUser: User = {
  role: 'regular',
  id: 212,
  email: 'lea@user.com',
  subscriptionPlan: 'pro',
  rewardsPoints: 1500,
  dashboardAccess: false, // Error: 'dashboardAccess' property does not exist
};
```

### Type-Safe Constants With Satisfies

The `as const satisfies` syntax combines narrow, readonly inference with type validation. It is useful when a constant should retain its exact values while conforming to a broader type.

Key benefits:

- Readonly values with `as const`
  - Ensures the constant is treated as readonly.
  - Narrows the types of values to their literals, preventing accidental modifications.
- Validation with `satisfies`
  - Ensures the object conforms to a broader type without widening its inferred type.
  - Helps catch type mismatches at compile time while preserving narrowed inferred types.

Array constants:

```ts
type UserRole = 'admin' | 'editor' | 'moderator' | 'viewer' | 'guest';

// ❌ Avoid constant of wide type
const DASHBOARD_ACCESS_ROLES: ReadonlyArray<UserRole> = ['admin', 'editor', 'moderator'];

// ❌ Avoid constant with incorrect values
const DASHBOARD_ACCESS_ROLES = ['admin', 'contributor', 'analyst'] as const;

// ✅ Use readonly constant of narrowed type
const DASHBOARD_ACCESS_ROLES = ['admin', 'editor', 'moderator'] as const satisfies ReadonlyArray<UserRole>;
```

Object constants:

```ts
type OrderStatus = {
  pending: 'pending' | 'idle';
  fulfilled: boolean;
  error: string;
};

// ❌ Avoid mutable constant of wide type
const IDLE_ORDER: OrderStatus = {
  pending: 'idle',
  fulfilled: true,
  error: 'Shipping Error',
};

// ❌ Avoid constant with incorrect values
const IDLE_ORDER = {
  pending: 'done',
  fulfilled: 'partially',
  error: 116,
} as const;

// ✅ Use readonly constant of narrowed type
const IDLE_ORDER = {
  pending: 'idle',
  fulfilled: true,
  error: 'Shipping Error',
} as const satisfies OrderStatus;
```

### Template Literal Types

Embrace template literal types as they allow you to create precise and type-safe string constructs by interpolating values. They are a powerful alternative to using the wide string type, providing better type safety.

Template literal types constrain values known to TypeScript at compile time. They do not validate strings received at runtime.

Adopting template literal types brings several advantages:

- Prevent errors caused by typos or invalid strings.
- Provide better type safety and autocompletion support.
- Improve code maintainability and readability.

Template literal types are useful in various practical scenarios, such as:

- String Patterns - Use template literal types to enforce specific string patterns during type checking.

  ```ts
  // ❌ Avoid
  const appVersion = '2.6';
  // ✅ Use
  type Version = `v${number}.${number}.${number}`;
  const appVersion: Version = 'v2.6.1';
  ```

- API Endpoints - Use template literal types to restrict values to valid API routes.

  ```ts
  // ❌ Avoid
  const userEndpoint = '/api/usersss'; // Type 'string' - Typo 'usersss': the route doesn't exist, leading to a runtime error.
  // ✅ Use
  type ApiRoute = 'users' | 'posts' | 'comments';
  type ApiEndpoint = `/api/${ApiRoute}`; // Type ApiEndpoint = "/api/users" | "/api/posts" | "/api/comments"
  const userEndpoint: ApiEndpoint = '/api/users';
  ```

- Internationalization Keys - Avoid relying on raw strings for translation keys, which can lead to typos and missing translations. Use template literal types to constrain their structure.

  ```ts
  // ❌ Avoid
  const homeTitle = 'translation.homesss.title'; // Type 'string' - Typo 'homesss': the translation doesn't exist, leading to a runtime error.
  // ✅ Use
  type LocaleKeyPages = 'home' | 'about' | 'contact';
  type TranslationKey = `translation.${LocaleKeyPages}.${string}`; // Type TranslationKey = `translation.home.${string}` | `translation.about.${string}` | `translation.contact.${string}`
  const homeTitle: TranslationKey = 'translation.home.title';
  ```

- CSS Utilities - Avoid raw strings for color values, which can lead to invalid or non-existent colors. Use template literal types to enforce known color names and require custom values to start with `#`.

  ```ts
  // ❌ Avoid
  const color = 'blue-450'; // Type 'string' - Color 'blue-450' doesn't exist, leading to a runtime error.
  // ✅ Use
  type BaseColor = 'blue' | 'red' | 'yellow' | 'gray';
  type Variant = 50 | 100 | 200 | 300 | 400;
  type Color = `${BaseColor}-${Variant}` | `#${string}`; // Type Color = "blue-50" | "blue-100" | "blue-200" ... | "red-50" | "red-100" ... | #${string}
  const iconColor: Color = 'blue-400';
  const customColor: Color = '#AD3128';
  ```

- Database queries - Avoid using raw strings for table or column names, which can lead to typos. Use template literal types to define valid table and column combinations.

<!-- prettier-ignore-start -->
```ts
// ❌ Avoid
const query = 'SELECT name FROM usersss WHERE age > 30'; // Type 'string' - Typo 'usersss': table doesn't exist, leading to a runtime error.
// ✅ Use
type Table = 'users' | 'posts' | 'comments';
type Column<TTableName extends Table> =
  TTableName extends 'users' ? 'id' | 'name' | 'age' :
  TTableName extends 'posts' ? 'id' | 'title' | 'content' :
  TTableName extends 'comments' ? 'id' | 'postId' | 'text' :
  never;

type Query<TTableName extends Table> = `SELECT ${Column<TTableName>} FROM ${TTableName} WHERE ${string}`;
const userQuery: Query<'users'> = 'SELECT name FROM users WHERE age > 30'; // Accepted by Query<'users'>
const invalidQuery: Query<'users'> = 'SELECT title FROM users WHERE age > 30'; // Error: 'title' is not a column in 'users' table.
```
<!-- prettier-ignore-end -->

### Type any & unknown

The `any` type must not be used because it bypasses type checking and allows unsafe operations and assignments. This can mask serious programming errors.

When dealing with ambiguous data, use `unknown`, which is the type-safe counterpart of `any`.  
Anything can be assigned to `unknown`, but it must be narrowed before accessing its properties or assigning it to a more specific type.

```ts
// ❌ Avoid any
const foo: any = 'five';
const bar: number = foo; // no type error

// ✅ Use unknown
const foo: unknown = 5;
const bar: number = foo; // type error - Type 'unknown' is not assignable to type 'number'

// Narrow the type before dereferencing it using:
// Type guard
const isNumber = (num: unknown): num is number => {
  return typeof num === 'number';
};
if (!isNumber(foo)) {
  throw Error(`API provided a fault value for field 'foo':${foo}. Should be a number!`);
}
const bar: number = foo;
```

### Type & Non-nullability Assertions

Type assertions `user as User` and non-nullability assertions `user!.name` are unsafe. Both only silence the TypeScript compiler and increase the risk of crashing the application at runtime.  
They can only be used as an exception, such as a third-party library type mismatch, with a strong rationale for why they are introduced into the codebase.

```ts
type User = { id: string; username: string; avatar: string | null };
// ❌ Avoid type assertions
const user = { name: 'Nika' } as User;

// ❌ Avoid non-nullability assertions
const getUsername = (user: User | null) => user!.username; // Runtime error when user is null
```

### Type Errors

When a TypeScript error cannot be mitigated, use `@ts-expect-error` as a last resort to suppress it.

This directive notifies the compiler when the suppressed error no longer exists, ensuring errors are revisited once they’re obsolete, unlike `@ts-ignore`, which can silently linger even after the error is resolved.

- Always use `@ts-expect-error` with a clear description explaining why it is necessary.
- Avoid `@ts-ignore`, as it does not track suppressed errors.

<Rule href="https://typescript-eslint.io/rules/ban-ts-comment/#allow-with-description">{`'@typescript-eslint/ban-ts-comment': [
  'error',
  {
    'ts-expect-error': 'allow-with-description'
  },
]`}</Rule>

```ts
// ❌ Avoid @ts-ignore as it will do nothing if the following line is error-free.
// @ts-ignore
const newUser = createUser('Gabriel');

// ✅ Use @ts-expect-error with description.
// @ts-expect-error: This library function has incorrect type definitions - createUser accepts string as an argument.
const newUser = createUser('Gabriel');
```

### Type Definition

TypeScript provides two options for defining types: `type` and `interface`. While these options have some functional differences, they are interchangeable in most cases. To maintain consistency, choose one and use it consistently.

<Rule
  prefix="Define all types using type alias"
  href="https://typescript-eslint.io/rules/consistent-type-definitions"
>{`'@typescript-eslint/consistent-type-definitions': ['error', 'type']`}</Rule>

<Note>
  Consider using interfaces when developing a package that might be extended by third-party consumers in the future or
  when your team prefers working with interfaces. In these cases, you can disable linting rules if needed, such as when
  defining type unions (e.g. `type Status = 'loading' | 'error'`).
</Note>

```ts
// ❌ Avoid interface definitions
interface UserRole = 'admin' | 'guest'; // Invalid - interfaces can't define type unions

interface UserInfo {
  name: string;
  role: 'admin' | 'guest';
}

// ✅ Use type definition
type UserRole = 'admin' | 'guest';

type UserInfo = {
  name: string;
  role: UserRole;
};

```

When performing declaration merging (e.g. extending third-party library types), use `interface` and disable the lint rule where necessary.

```ts
// types.ts
declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: string;
    CUSTOM_ENV_VAR: string;
  }
}

// server.ts
app.listen(process.env.PORT, () => {...}
```

### Array Types

<Rule
  prefix="Array types should be defined using generic syntax"
  href="https://typescript-eslint.io/rules/array-type/#generic"
>{`'@typescript-eslint/array-type': ['error', { default: 'generic' }]`}</Rule>
<Note>
  Since there is no functional difference between the 'generic' and 'array' definitions, feel free to choose the one
  that your team finds most readable.
</Note>

```ts
// ❌ Avoid
const x: string[] = ['foo', 'bar'];
const y: readonly string[] = ['foo', 'bar'];

// ✅ Use
const x: Array<string> = ['foo', 'bar'];
const y: ReadonlyArray<string> = ['foo', 'bar'];
```

### Type Imports and Exports

TypeScript allows specifying a `type` keyword on imports to indicate that the export exists only in the type system, not at runtime.

Type imports must always be separated:

- Tree Shaking and Dead Code Elimination - `import type` is erased during compilation, leaving no runtime import for a bundler to analyze or remove.
- Avoids Side Effects - Depending on compiler settings, a regular import used only as a type may remain in emitted JavaScript and run module side effects.
- Code Clarity - Makes the difference between runtime and type-only imports explicit.

<Rule href="https://typescript-eslint.io/rules/consistent-type-imports/">{`'@typescript-eslint/consistent-type-imports': 'error'`}</Rule>

```ts
// ❌ Avoid using `import` for both runtime and type
import { MyClass } from 'some-library';

// Even if MyClass is only used as a type, a regular import can pull the module into the runtime bundle.

// ✅ Use `import type`
import type { MyClass } from 'some-library';

// This import is removed from the emitted JavaScript.
```

### Services & Types Generation

Documentation becomes outdated the moment it's written, and worse than no documentation is wrong documentation. The same applies to types when describing the modules your app interacts with, such as APIs, messaging protocols, and databases.

For external services, such as REST, GraphQL, and MQ, it's crucial to generate types from their contracts, whether they use Swagger, schemas, or other sources (e.g. [openapi-ts](https://github.com/drwpow/openapi-typescript), [graphql-config](https://github.com/kamilkisiela/graphql-config)). Avoid manually declaring and maintaining types, as they can easily fall out of sync.

Generated types keep compile-time contracts in sync. They do not validate data received from external services at runtime.

As an exception, manually declare types only when no other options are available, such as when there is no documentation for the service, data cannot be fetched to retrieve a contract, or the database cannot be accessed to infer types.
