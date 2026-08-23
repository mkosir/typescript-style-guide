## Discriminated Unions {#discriminated-unions}

If there's only one TypeScript feature to choose from, embrace discriminated unions.

Discriminated unions are a powerful concept to model complex data structures and improve type safety, leading to clearer and less error-prone code.  
You may encounter discriminated unions under different names, such as tagged unions or sum types, in languages such as C, Haskell, and Rust (in conjunction with pattern-matching).

Advantages of discriminated unions:

- As mentioned in [Required & Optional Object Properties](#required--optional-object-properties), [Function Arguments](#function-arguments), and [Props as Discriminated Type](#props-as-discriminated-type), discriminated unions remove optional object properties, reducing complexity.
- Exhaustiveness check - TypeScript can ensure that all possible variants of a type are implemented, catching unhandled cases during type checking.

  <Rule href="https://typescript-eslint.io/rules/switch-exhaustiveness-check/">{`"@typescript-eslint/switch-exhaustiveness-check": "error"`}</Rule>

  ```ts
  type Circle = { kind: 'circle'; radius: number };
  type Square = { kind: 'square'; size: number };
  type Triangle = { kind: 'triangle'; base: number; height: number };

  // Create a discriminated union 'Shape', with the 'kind' property to discriminate the type of object.
  type Shape = Circle | Square | Triangle;

  // TypeScript reports errors in the calculateArea function
  const calculateArea = (shape: Shape) => {
    // Error - Switch is not exhaustive. Cases not matched: "triangle"
    switch (shape.kind) {
      case 'circle':
        return Math.PI * shape.radius ** 2;
      case 'square':
        return shape.size * shape.width; // Error - Property 'width' does not exist on type 'square'
    }
  };
  ```

- Avoid code complexity introduced by [flag variables](#application-state).
- Clear code intent, as it becomes easier to read and understand by explicitly indicating the possible cases for a given type.
- TypeScript can narrow down union types, ensuring code correctness at compile time.
- Discriminated unions make refactoring and maintenance easier by providing a centralized definition of related types. When adding or modifying types within the union, the compiler reports any inconsistencies throughout the codebase.
- IDEs can leverage discriminated unions to provide better autocompletion and type inference.

### Practical Applications

#### Required & Optional Object Properties {#required--optional-object-properties}

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

#### Application State

When application states require different data, model the state and its data together with a discriminated union. This prevents invalid combinations, such as loading while holding both data and an error.

```ts
// ❌ Boolean flags and optional properties allow invalid state combinations
type RequestState = {
  isLoading: boolean;
  data?: Products;
  error?: string;
};

// ✅ Each state contains only the data valid for that state
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Products }
  | { status: 'error'; error: string };
```

#### Function Arguments

When applicable, use a **discriminated union type** to eliminate optional properties. This decreases complexity in a function's API and ensures that only the required properties are passed for each use case.

```ts
// ❌ Avoid optional properties as they increase complexity and ambiguity in function APIs
type NotificationParams = {
  channel: 'email' | 'sms';
  email?: string;
  phoneNumber?: string;
  subject?: string;
  message: string;
};

// ✅ Prefer required properties. If optional properties are unavoidable,
// use a discriminated union to represent distinct use cases with required properties.
type EmailNotificationParams = {
  channel: 'email';
  email: string;
  subject: string;
  message: string;
};

type SmsNotificationParams = {
  channel: 'sms';
  phoneNumber: string;
  message: string;
};

type NotificationParams = EmailNotificationParams | SmsNotificationParams;

export const sendNotification = (params: NotificationParams) => {
  switch (params.channel) {
    case 'email':
      return sendEmail(params.email, params.subject, params.message);
    case 'sms':
      return sendSms(params.phoneNumber, params.message);
  }
};
```

#### React Props

##### Required & Optional Props

**Strive to have the majority of props required and use optional props sparingly.**

Especially when creating a new component for its first or single use case, the majority of props should be required. When the component starts covering more use cases, introduce optional props.  
There are potential exceptions where a component API needs to implement optional props from the start (e.g. shared components covering multiple use cases, UI design system components - button `isDisabled` etc.)

If a component or hook becomes too complex, it should probably be broken into smaller pieces.  
An exaggerated example: implementing 10 React components with 5 required props each is better than implementing one "can do it all" component that accepts 50 optional props.

##### Props as Discriminated Type

When applicable, use **discriminated union types** to eliminate optional props. This approach reduces complexity in the component API and ensures that only the required props are passed based on the specific use case.

```tsx
// ❌ Avoid optional props as they increase complexity and ambiguity in component APIs
type AvatarProps = {
  variant: 'image' | 'initials';
  src?: string;
  alt?: string;
  initials?: string;
};

// ✅ Prefer required props. If optional props are unavoidable,
// use a discriminated union to represent distinct use cases with required props.
type ImageAvatarProps = {
  variant: 'image';
  src: string;
  alt: string;
};

type InitialsAvatarProps = {
  variant: 'initials';
  initials: string;
};

type AvatarProps = ImageAvatarProps | InitialsAvatarProps;

export const Avatar = (props: AvatarProps) => {
  switch (props.variant) {
    case 'image':
      return <img src={props.src} alt={props.alt} />;
    case 'initials':
      return <span>{props.initials}</span>;
  }
};
```
