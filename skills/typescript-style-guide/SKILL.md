---
name: typescript-style-guide
description: Apply, review, and explain the opinionated conventions in the TypeScript Style Guide. Use automatically for TypeScript tasks involving type modelling, function APIs, variables and state, naming, source organization, React component design, or tests.
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

- Read [references/types.md](references/types.md) for type modelling, inference, readonly data, object properties, constants, template literal types, `any`, `unknown`, assertions, type errors, type definitions, arrays, type imports, and generated service types. This reference takes precedence for narrowing `unknown` and assertions, including their runtime null checks.
- Read [references/discriminated-unions.md](references/discriminated-unions.md) for general discriminated-union modelling, narrowing, invalid states, and exhaustiveness checking.
- Read [references/functions.md](references/functions.md) for function responsibility, statelessness, purity, side effects, function arguments, function API design, and return types. This reference takes precedence when discriminated unions concern a function's arguments.
- Read [references/variables.md](references/variables.md) when the task concerns variable declarations, state modelling, enum alternatives, or choosing how application state represents absence with `null` or `undefined`. Do not read it for incidental variables or runtime checks used only for type narrowing.
- Read [references/naming.md](references/naming.md) for named exports, naming conventions, generic type parameters, React naming, comments, and TSDoc.
- Read [references/source-organization.md](references/source-organization.md) for code collocation, feature-based organization, relative and absolute import paths, and frontend or backend project structure. Do not read it for type-only import semantics, which belong to Types.
- Read [references/react.md](references/react.md) for React component and hook APIs, required and optional props, discriminated props, props-to-state, component typing and roles, data flow, state placement, and compound components. This reference takes precedence when discriminated unions concern component props.
- Read [references/tests.md](references/tests.md) for test design, the Arrange-Act-Assert pattern, isolation, implementation details, mocking, test descriptions, and snapshots.

## Boundaries

- Do not reimplement deterministic TypeScript, ESLint, or formatting checks.
- Do not introduce unrelated conventions merely because this skill is active.
- Treat guide conventions as defaults when the consuming repository is silent.
