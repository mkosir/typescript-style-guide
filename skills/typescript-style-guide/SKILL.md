---
name: typescript-style-guide
description: Apply, review, and explain the TypeScript Style Guide conventions for type modelling, functions, constants, variable state, and naming. Use automatically for TypeScript tasks involving inference, readonly data, optional properties, discriminated unions, type-safe constants, function design, arguments, return types, purity, side effects, enums, boolean state flags, null and undefined, naming, exports, generics, comments, template literal types, any and unknown, assertions, type errors, type definitions, arrays, type imports, or generated service types.
---

# TypeScript Style Guide

Apply only the conventions relevant to the current task. Keep TypeScript, linters, and formatters responsible for rules they can enforce automatically.

## Workflow

1. Inspect the consuming repository's conventions and configuration.
2. Let explicit repository conventions take precedence over this opinionated guide.
3. Identify which guide topic applies.
4. Read only the reference for the task's primary guide topic. Read multiple references only when the task substantively spans multiple topics.
5. Apply, review, or explain the conventions in the context of the current task.
6. State important tradeoffs when a convention depends on context or judgment.

## Reference routing

- Read [references/types.md](references/types.md) for type modelling, inference, readonly data, object properties, discriminated unions, constants, template literal types, `any`, `unknown`, assertions, type errors, type definitions, arrays, type imports, and generated service types. This reference takes precedence for narrowing `unknown` and assertions, including their runtime null checks.
- Read [references/functions.md](references/functions.md) for function responsibility, statelessness, purity, side effects, function arguments, function API design, and return types. This reference takes precedence when discriminated unions concern a function's arguments.
- Read [references/variables.md](references/variables.md) when the task concerns variable declarations, state modelling, enum alternatives, or choosing how application state represents absence with `null` or `undefined`. Do not read it for incidental variables or runtime checks used only for type narrowing.
- Read [references/naming.md](references/naming.md) for named exports, naming conventions, generic type parameters, React naming, comments, and TSDoc.

## Boundaries

- Do not reimplement deterministic TypeScript, ESLint, or formatting checks.
- Do not introduce unrelated conventions merely because this skill is active.
- Treat guide conventions as defaults when the consuming repository is silent.
