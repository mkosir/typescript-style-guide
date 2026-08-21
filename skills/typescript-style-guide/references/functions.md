## Functions

Function conventions should be followed as much as possible (some of the conventions derive from functional programming basic concepts):

### General

Prefer functions that:

- have a single responsibility.
- make dependencies explicit through arguments.
- return a value when they calculate or transform data.
- avoid side effects when practical.

A stateless function does not retain data between calls. A deterministic function returns the same result for the same inputs. A pure function is deterministic and has no observable side effects, making it easier to understand, test, and reuse.

Not every function can be pure. Network requests, storage, logging, and UI updates require side effects. Keep these functions small and isolate side effects from pure business logic.

### Single Object Arg

To keep function readable and easily extensible for the future (adding/removing args), strive to have single object as the function arg, instead of multiple args.  
 As an exception this does not apply when having only one primitive single arg (e.g. simple functions isNumber(value), implementing currying etc.).

```ts
// ❌ Avoid having multiple arguments
transformUserInput('client', false, 60, 120, null, true, 2000);

// ✅ Use options object as argument
transformUserInput({
  method: 'client',
  isValidated: false,
  minLines: 60,
  maxLines: 120,
  defaultInput: null,
  shouldLog: true,
  timeout: 2000,
});
```

### Required & Optional Args

**Strive to have majority of args required and use optional sparingly.**  
 If the function becomes too complex, it probably should be broken into smaller pieces.  
 An exaggerated example where implementing 10 functions with 5 required args each, is better then implementing one "can do it all" function that accepts 50 optional args.

### Args as Discriminated Type

When applicable use **discriminated union type** to eliminate optional properties, which will decrease complexity on function API and only required properties will be passed depending on its use case.

```ts
// ❌ Avoid optional properties as they increase complexity and ambiguity in function APIs
type StatusParams = {
  data?: Products;
  title?: string;
  time?: number;
  error?: string;
};

// ✅ Prefer required properties. If optional properties are unavoidable,
// use a discriminated union to represent distinct use cases with required properties.
type StatusSuccessParams = {
  status: 'success';
  data: Products;
  title: string;
};

type StatusLoadingParams = {
  status: 'loading';
  time: number;
};

type StatusErrorParams = {
  status: 'error';
  error: string;
};

// Discriminated union 'StatusParams' ensures predictable function arguments with no optional properties
type StatusParams = StatusSuccessParams | StatusLoadingParams | StatusErrorParams;

export const parseStatus = (params: StatusParams) => {...
```

### Return Types

Requiring explicit return types improves safety, catches errors early, and helps with long-term maintainability. However, excessive strictness can slow development and add unnecessary redundancy.

As a rule of thumb, be explicit on the outside, implicit on the inside. For example, when building APIs or libraries, always type everything explicitly to avoid accidental breaking changes. For internal logic, let TypeScript infer its defaults, which will provide strong type safety without added verbosity.

Consider the advantages of explicitly defining the return type of a function:

- **Improves Readability**: Clearly specifies what type of value the function returns, making the code easier to understand for those calling the function.
- **Avoids Misuse**: Ensures that calling code does not accidentally attempt to use an undefined value when no return value is intended.
- **Surfaces Type Errors Early**: Helps catch potential type errors during development, especially when code changes unintentionally alter the return type.
- **Simplifies Refactoring**: Ensures that any variable assigned to the function's return value is of the correct type, making refactoring safer and more efficient.
- **Encourages Design Discussions**: Similar to Test-Driven Development (TDD), explicitly defining function arguments and return types promotes discussions about a function's functionality and interface ahead of implementation.
- **Can Improve Compilation Performance**: Explicit return types can reduce the work TypeScript needs to do, especially for complex inferred types.

As context matters, use explicit return types when they add clarity and safety.

<Rule
  prefix="Explicitly defining the return type of a function is encouraged, although not required"
  href="https://typescript-eslint.io/rules/explicit-function-return-type/"
>{`"@typescript-eslint/explicit-function-return-type": "error"`}</Rule>
