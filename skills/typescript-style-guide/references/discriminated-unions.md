## Discriminated Unions {#discriminated-unions}

If there's only one TypeScript feature to choose from, embrace discriminated unions.

Discriminated unions are a powerful concept to model complex data structures and improve type safety, leading to clearer and less error-prone code.  
You may encounter discriminated unions under different names, such as tagged unions or sum types, in languages such as C, Haskell, and Rust (in conjunction with pattern-matching).

Advantages of discriminated unions:

- As mentioned in [Required & Optional Object Properties](#required--optional-object-properties), [Args as Discriminated Type](#args-as-discriminated-type), and [Props as Discriminated Type](#props-as-discriminated-type), discriminated unions remove optional object properties, reducing complexity.
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

- Avoid code complexity introduced by [flag variables](#type-union--boolean-flags).
- Clear code intent, as it becomes easier to read and understand by explicitly indicating the possible cases for a given type.
- TypeScript can narrow down union types, ensuring code correctness at compile time.
- Discriminated unions make refactoring and maintenance easier by providing a centralized definition of related types. When adding or modifying types within the union, the compiler reports any inconsistencies throughout the codebase.
- IDEs can leverage discriminated unions to provide better autocompletion and type inference.
