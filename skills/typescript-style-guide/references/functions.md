## Functions

Function conventions should be followed as much as possible (some derive from basic functional programming concepts):

### General

Prefer functions that:

- have a single responsibility.
- make dependencies explicit through arguments.
- return a value when they calculate or transform data.
- avoid side effects when practical.

A stateless function does not retain data between calls. A deterministic function returns the same result for the same inputs. A pure function is deterministic and has no observable side effects, making it easier to understand, test, and reuse.

Not every function can be pure. Network requests, storage, logging, and UI updates require side effects. Keep these functions small and isolate side effects from pure business logic.

### Single Object Arg

When a function accepts several related parameters, prefer a single object parameter. Named properties make call sites easier to understand and allow the function API to evolve without relying on argument order.

Keep positional parameters when their meaning and order are obvious, or when a conventional signature is clearer, such as `isNumber(value)` or a callback.

```ts
// ❌ Multiple arguments make this call difficult to understand
transformUserInput('client', false, 60, 120, null, true, 2000);

// ✅ An object makes each argument explicit
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

**Strive to have the majority of arguments required and use optional arguments sparingly.**  
 If the function becomes too complex, it probably should be broken into smaller pieces.  
 An exaggerated example: implementing 10 focused functions with 5 required arguments each is preferable to implementing one "do-it-all" function with 50 optional arguments.

When function arguments represent mutually exclusive cases, use [discriminated unions](#function-arguments).

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
  prefix="Require explicit return types at module boundaries"
  href="https://typescript-eslint.io/rules/explicit-module-boundary-types/"
>{`"@typescript-eslint/explicit-module-boundary-types": "error"`}</Rule>
