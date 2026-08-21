type ExpectedSkill = {
  name: 'typescript-style-guide'
  references: ReadonlyArray<
    | 'references/types.md'
    | 'references/variables.md'
    | 'references/naming.md'
  >
}

type EvalCase = {
  id: string
  task: string
  workspace: Record<string, string>
  expected: {
    skills: ReadonlyArray<ExpectedSkill>
  }
}

export const EVAL_CASES = [
  {
    id: 'types-safe-unknown-narrowing',
    task: 'Review the status handling in src/example.ts.',
    workspace: {
      'src/example.ts': `export const shouldRetry = (error: unknown) => {
  const status = (error as { status?: number }).status
  return status ? status >= 500 : true
}
`,
    },
    expected: {
      skills: [
        {
          name: 'typescript-style-guide',
          references: ['references/types.md'],
        },
      ],
    },
  },
  {
    id: 'variables-enum-alternative',
    task: 'Review the enum in src/example.ts.',
    workspace: {
      'src/example.ts': `export enum UserRole {
  Guest = 'guest',
  Admin = 'admin',
}
`,
    },
    expected: {
      skills: [
        {
          name: 'typescript-style-guide',
          references: ['references/variables.md'],
        },
      ],
    },
  },
  {
    id: 'naming-descriptive-generic',
    task: 'Review the generic parameter names in src/example.ts.',
    workspace: {
      'src/example.ts': `export const createPair = <T, K>(first: T, second: K): [T, K] => [first, second]
`,
    },
    expected: {
      skills: [
        {
          name: 'typescript-style-guide',
          references: ['references/naming.md'],
        },
      ],
    },
  },
  {
    id: 'styling-does-not-trigger',
    task: 'Review only the mobile spacing in src/example.tsx.',
    workspace: {
      'src/example.tsx': `export const Success = () => (
  <main className="min-h-screen px-12 py-16">
    <h1 className="mb-12 text-2xl">Done</h1>
  </main>
)
`,
    },
    expected: {
      skills: [],
    },
  },
] as const satisfies ReadonlyArray<EvalCase>
