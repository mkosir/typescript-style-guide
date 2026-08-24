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

type EvalCase = {
  id: string
  installedSkills: ReadonlyArray<SkillName>
  task: string
  workspace: Readonly<Record<string, string>>
  expected: {
    usedSkills: ReadonlyArray<SkillName>
    loadedReferences: ReadonlyArray<string>
    outcome: string
  }
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
      usedSkills: ['typescript-types'],
      loadedReferences: [],
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
      usedSkills: ['typescript-discriminated-unions'],
      loadedReferences: [],
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
      usedSkills: ['typescript-functions'],
      loadedReferences: [],
      outcome: 'Recommends a single object parameter because the related positional arguments make the call difficult to understand.',
    },
  },
  {
    id: 'variables-enum-alternative',
    installedSkills: ['typescript-variables'],
    task: 'Review how user roles are represented in src/userRole.ts.',
    workspace: {
      'src/userRole.ts': `export enum UserRole {
  Guest = 'guest',
  Admin = 'admin',
}
`,
    },
    expected: {
      usedSkills: ['typescript-variables'],
      loadedReferences: [],
      outcome: 'Recommends a literal union or const assertion instead of an enum.',
    },
  },
  {
    id: 'naming-descriptive-generic-parameters',
    installedSkills: ['typescript-naming'],
    task: 'Review the generic parameter names in src/createPair.ts.',
    workspace: {
      'src/createPair.ts': `export const createPair = <T, K>(first: T, second: K): [T, K] => [first, second]
`,
    },
    expected: {
      usedSkills: ['typescript-naming'],
      loadedReferences: [],
      outcome: 'Recommends descriptive generic parameter names with a T prefix instead of single-letter names.',
    },
  },
  {
    id: 'source-organization-nearby-import',
    installedSkills: ['typescript-source-organization'],
    task: 'Review the import path in src/features/orders/index.ts.',
    workspace: {
      'src/features/orders/formatOrder.ts': `export const formatOrder = (id: string) => \`Order ${id}\`
`,
      'src/features/orders/index.ts': `import { formatOrder } from '@features/orders/formatOrder'

export const orderTitle = formatOrder('123')
`,
    },
    expected: {
      usedSkills: ['typescript-source-organization'],
      loadedReferences: [],
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
      usedSkills: ['typescript-react'],
      loadedReferences: [],
      outcome: 'Warns that state initialized from a prop will not follow later prop changes and recommends an initial-prefixed prop when the behavior is intentional.',
    },
  },
  {
    id: 'tests-description-convention',
    installedSkills: ['typescript-tests'],
    task: 'Review the test description in src/formatPrice.test.ts.',
    workspace: {
      'src/formatPrice.test.ts': `import { expect, it } from 'vitest'

it('formats euros', () => {
  expect(new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' }).format(12)).toBe('€12.00')
})
`,
    },
    expected: {
      usedSkills: ['typescript-tests'],
      loadedReferences: [],
      outcome: "Recommends an it('should ... when ...') description that states the behavior and condition.",
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
      usedSkills: ['typescript-style-guide'],
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
      usedSkills: [],
      loadedReferences: [],
      outcome: 'Reviews only the requested styling and does not activate the TypeScript Style Guide.',
    },
  },
] as const satisfies ReadonlyArray<EvalCase>
