type SkillName =
  | 'typescript-style-guide'
  | 'typescript-types'
  | 'typescript-discriminated-unions'
  | 'typescript-functions'
  | 'typescript-variables'
  | 'typescript-naming'
  | 'typescript-source-organization'
  | 'typescript-react'
  | 'typescript-tests'

type ExpectedResult =
  | {
      usedSkill: 'typescript-style-guide'
      loadedReferences: ReadonlyArray<
        | 'references/types.md'
        | 'references/discriminated-unions.md'
        | 'references/functions.md'
        | 'references/variables.md'
        | 'references/naming.md'
        | 'references/source-organization.md'
        | 'references/react.md'
        | 'references/tests.md'
      >
      outcome: string
    }
  | {
      usedSkill: Exclude<SkillName, 'typescript-style-guide'> | null
      outcome: string
    }

type EvalCase = {
  id: string
  installedSkills: ReadonlyArray<SkillName>
  task: string
  workspace: Readonly<Record<string, string>>
  expected: ExpectedResult
}

export const EVAL_CASES = [
  {
    id: 'types-safe-unknown-narrowing',
    installedSkills: ['typescript-types'],
    task: 'Review the status handling in src/shouldRetry.ts.',
    workspace: {
      'src/shouldRetry.ts': `export const shouldRetry = (error: unknown) => {
  const status = (error as { status?: number }).status
  return status ? status >= 500 : true
}
`,
    },
    expected: {
      usedSkill: 'typescript-types',
      outcome: 'Identifies the unchecked assertion and recommends runtime narrowing before comparing status as a number.',
    },
  },
  {
    id: 'discriminated-unions-mutually-exclusive-outcomes',
    installedSkills: ['typescript-discriminated-unions'],
    task: 'Review the cleanup result model in src/cleanup.ts.',
    workspace: {
      'src/cleanup.ts': `type CleanupDetail = {
  fileName: string
  status: 'deleted' | 'failed'
  error?: string
}

export const cleanupDetails: ReadonlyArray<CleanupDetail> = []
`,
    },
    expected: {
      usedSkill: 'typescript-discriminated-unions',
      outcome: 'Models deleted and failed as separate variants so error is required only for the failed outcome.',
    },
  },
  {
    id: 'functions-related-parameters',
    installedSkills: ['typescript-functions'],
    task: 'Review the createUser function API in src/createUser.ts.',
    workspace: {
      'src/createUser.ts': `export const createUser = (
  name: string,
  email: string,
  isAdmin: boolean,
  sendWelcomeEmail: boolean,
) => ({ name, email, isAdmin, sendWelcomeEmail })

createUser('Lea', 'lea@example.com', false, true)
`,
    },
    expected: {
      usedSkill: 'typescript-functions',
      outcome: 'Recommends a single object parameter because the related positional arguments make the call difficult to understand.',
    },
  },
  {
    id: 'variables-union-over-boolean-flags',
    installedSkills: ['typescript-variables'],
    task: 'Review how order status is represented in src/orderStatus.ts.',
    workspace: {
      'src/orderStatus.ts': `type OrderStatus = {
  isPending: boolean
  isProcessing: boolean
  isConfirmed: boolean
  isExpired: boolean
}
`,
    },
    expected: {
      usedSkill: 'typescript-variables',
      outcome: 'Recommends one literal-union status instead of multiple boolean flags that can represent conflicting states.',
    },
  },
  {
    id: 'naming-expressive-code',
    installedSkills: ['typescript-naming'],
    task: 'Review the readability of src/average.ts.',
    workspace: {
      'src/average.ts': `export const calculate = (u: number, s: number) => {
  // Convert seconds to minutes
  const m = s / 60

  // Calculate average users per minute
  return u / m
}
`,
    },
    expected: {
      usedSkill: 'typescript-naming',
      outcome: 'Recommends expressive names for the function, parameters, and local value instead of comments that restate unclear code.',
    },
  },
  {
    id: 'source-organization-nearby-import',
    installedSkills: ['typescript-source-organization'],
    task: 'Review the import path in src/features/orders/index.ts.',
    workspace: {
      'src/features/orders/formatOrder.ts': `export const formatOrder = (id: string) => \`Order \${id}\`
`,
      'src/features/orders/index.ts': `import { formatOrder } from '@features/orders/formatOrder'

export const orderTitle = formatOrder('123')
`,
    },
    expected: {
      usedSkill: 'typescript-source-organization',
      outcome: 'Recommends a relative import because both files belong to the same nearby feature.',
    },
  },
  {
    id: 'react-prop-used-as-initial-state',
    installedSkills: ['typescript-react'],
    task: 'Review the state handling in src/ProfileEditor.tsx.',
    workspace: {
      'src/ProfileEditor.tsx': `import { useState } from 'react'

type ProfileEditorProps = {
  displayName: string
}

export const ProfileEditor = ({ displayName }: ProfileEditorProps) => {
  const [name, setName] = useState(displayName)

  return <input value={name} onChange={(event) => setName(event.target.value)} />
}
`,
    },
    expected: {
      usedSkill: 'typescript-react',
      outcome: 'Warns that state initialized from a prop will not follow later prop changes and recommends an initial-prefixed prop when the behavior is intentional.',
    },
  },
  {
    id: 'tests-public-behavior',
    installedSkills: ['typescript-tests'],
    task: 'Review what src/formatPrice.test.ts is testing.',
    workspace: {
      'src/formatPrice.test.ts': `import { expect, it } from 'vitest'

it('should format euros when currency is EUR', () => {
  expect(new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' }).format(12)).toBe('€12.00')
})
`,
    },
    expected: {
      usedSkill: 'typescript-tests',
      outcome: "Identifies that the test retests Intl and recommends testing the project's public behavior or removing the test.",
    },
  },
  {
    id: 'complete-guide-selective-reference',
    installedSkills: ['typescript-style-guide'],
    task: 'Review the request state model in src/requestState.ts.',
    workspace: {
      'src/requestState.ts': `type RequestState<Data> = {
  isLoading: boolean
  data?: Data
  error?: string
}
`,
    },
    expected: {
      usedSkill: 'typescript-style-guide',
      loadedReferences: ['references/discriminated-unions.md'],
      outcome: 'Recommends mutually exclusive request-state variants and loads no unrelated guide reference.',
    },
  },
  {
    id: 'styling-does-not-trigger',
    installedSkills: ['typescript-style-guide'],
    task: 'Review only the mobile spacing in src/Success.tsx.',
    workspace: {
      'src/Success.tsx': `export const Success = () => (
  <main className="min-h-screen px-12 py-16">
    <h1 className="mb-12 text-2xl">Done</h1>
  </main>
)
`,
    },
    expected: {
      usedSkill: null,
      outcome: 'Reviews only the requested styling and does not activate the TypeScript Style Guide.',
    },
  },
] as const satisfies ReadonlyArray<EvalCase>
