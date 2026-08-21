---
name: typescript-style-guide
description: Apply, review, and explain the TypeScript Style Guide conventions for type modelling, constants, and variable state. Use automatically for TypeScript tasks involving inference, readonly data, optional properties, discriminated unions, type-safe constants, enums, boolean state flags, null and undefined, template literal types, any and unknown, assertions, type errors, type definitions, arrays, type imports, or generated service types.
---

# TypeScript Style Guide

Apply only the conventions relevant to the current task. Keep TypeScript, linters, and formatters responsible for rules they can enforce automatically.

## Workflow

1. Inspect the consuming repository's conventions and configuration.
2. Let explicit repository conventions take precedence over this opinionated guide.
3. Identify which guide topic applies.
4. Read only the relevant reference file.
5. Apply, review, or explain the conventions in the context of the current task.
6. State important tradeoffs when a convention depends on context or judgment.

## Reference routing

- Read [references/types.md](references/types.md) for type modelling, inference, readonly data, object properties, discriminated unions, constants, template literal types, `any`, `unknown`, assertions, type errors, type definitions, arrays, type imports, and generated service types.
- Read [references/variables.md](references/variables.md) for const assertion declarations, enum alternatives, mutually exclusive state variables instead of multiple boolean flags, and `null` and `undefined` conventions.

## Boundaries

- Do not reimplement deterministic TypeScript, ESLint, or formatting checks.
- Do not introduce unrelated conventions merely because this skill is active.
- Treat guide conventions as defaults when the consuming repository is silent.
