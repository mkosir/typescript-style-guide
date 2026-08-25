import { execFile } from 'node:child_process'
import { cp, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve, sep } from 'node:path'
import { parseArgs, promisify } from 'node:util'
import { fileURLToPath } from 'node:url'

import { Codex } from '@openai/codex-sdk'

import { EVAL_CASES } from './eval-cases.ts'

const execFileAsync = promisify(execFile)
const REPOSITORY_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const SKILLS_ROOT = join(REPOSITORY_ROOT, 'skills')

const { values: options } = parseArgs({
  options: {
    all: { type: 'boolean', default: false },
    case: { type: 'string' },
    verbose: { type: 'boolean', default: false },
  },
})

if (options.all && options.case) {
  throw new Error('Use either --all or --case, not both.')
}

const selectedCase = options.case ? EVAL_CASES.find(({ id }) => id === options.case) : EVAL_CASES[0]

if (!selectedCase) {
  throw new Error(`Unknown case "${options.case}". Available cases: ${EVAL_CASES.map(({ id }) => id).join(', ')}`)
}

const testCases = options.all ? EVAL_CASES : [selectedCase]

const LOCAL_SKILL_REPORTING = `## Local Skill Reporting

When a local skill is used, append it to the final response using this format:

Skills used:

- \`skill-name\` (\`references/reference.md\`) - brief task-specific reason

List only local skills and references actually used. Omit the reference when none was read. Omit this section when no local skill was used.
`

const getTargetPath = (workspaceRoot: string, filePath: string) => {
  const targetPath = resolve(workspaceRoot, filePath)

  if (!targetPath.startsWith(`${workspaceRoot}${sep}`)) {
    throw new Error(`Workspace path must be relative: ${filePath}`)
  }

  return targetPath
}

const runCodex = async (task: string, cwd: string, installedSkills: ReadonlyArray<string>) => {
  const codex = new Codex()
  const thread = codex.startThread({
    approvalPolicy: 'never',
    sandboxMode: 'read-only',
    workingDirectory: cwd,
  })
  const result = await thread.run(task)
  const references = new Set<string>()
  const usedSkills = new Set<string>()

  if (options.verbose) console.log(`\nCodex items:\n${JSON.stringify(result.items, null, 2)}`)

  for (const item of result.items) {
    if (item.type !== 'command_execution') continue

    const { command } = item

    for (const skill of installedSkills) {
      if (command.includes(`.agents/skills/${skill}/SKILL.md`)) usedSkills.add(skill)
    }

    for (const reference of command.match(/references\/[\w-]+\.md/g) ?? []) {
      references.add(reference)
    }
  }

  return {
    finalResponse: result.finalResponse,
    references: [...references],
    usedSkills: [...usedSkills],
  }
}

const formatList = (values: ReadonlyArray<string>) => values.join(', ') || 'none'
const containsSameValues = (first: ReadonlyArray<string>, second: ReadonlyArray<string>) =>
  first.length === second.length && first.every((value) => second.includes(value))

const runCodexCase = async (testCase: (typeof EVAL_CASES)[number]) => {
  const workspaceRoot = await mkdtemp(join(tmpdir(), 'typescript-style-guide-eval-'))

  try {
    await execFileAsync('git', ['init', '--quiet'], { cwd: workspaceRoot })
    await writeFile(join(workspaceRoot, 'AGENTS.md'), LOCAL_SKILL_REPORTING)

    const skillsTarget = join(workspaceRoot, '.agents/skills')
    await mkdir(skillsTarget, { recursive: true })

    for (const skill of testCase.installedSkills) {
      await cp(join(SKILLS_ROOT, skill), join(skillsTarget, skill), { recursive: true })
    }

    for (const [filePath, content] of Object.entries(testCase.workspace)) {
      const targetPath = getTargetPath(workspaceRoot, filePath)
      await mkdir(dirname(targetPath), { recursive: true })
      await writeFile(targetPath, content)
    }

    console.log(`Case: ${testCase.id}`)
    console.log(`Task: ${testCase.task}`)
    console.log(`Installed skills: ${formatList(testCase.installedSkills)}`)
    console.log(`Fixtures: ${formatList(Object.keys(testCase.workspace))}`)

    if (options.verbose) {
      for (const [filePath, content] of Object.entries(testCase.workspace)) {
        console.log(`\nFixture: ${filePath}\n${content}`)
      }
    }

    console.log('Running Codex...')
    const startedAt = Date.now()

    const result = await runCodex(testCase.task, workspaceRoot, testCase.installedSkills)
    const expectedSkills = testCase.expected.usedSkill ? [testCase.expected.usedSkill] : []
    const expectedReferences =
      'loadedReferences' in testCase.expected ? testCase.expected.loadedReferences : []
    const skillRoutingPassed = containsSameValues(result.usedSkills, expectedSkills)
    const referenceLoadingPassed = containsSameValues(result.references, expectedReferences)

    console.log(`\nCompleted in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`)
    console.log(`Expected skill: ${testCase.expected.usedSkill ?? 'none'}`)
    console.log(`Actual skills: ${formatList(result.usedSkills)}`)
    console.log(`Expected references: ${formatList(expectedReferences)}`)
    console.log(`Actual references: ${formatList(result.references)}`)
    console.log(`Skill routing: ${skillRoutingPassed ? 'PASS' : 'FAIL'}`)
    console.log(`Reference loading: ${referenceLoadingPassed ? 'PASS' : 'FAIL'}`)
    console.log('Outcome: NOT GRADED')
    console.log(`Expected outcome: ${testCase.expected.outcome}`)
    console.log(`\nFinal response:\n${result.finalResponse}`)

    return {
      id: testCase.id,
      passed: skillRoutingPassed && referenceLoadingPassed,
    }
  } finally {
    await rm(workspaceRoot, { recursive: true, force: true })
  }
}

const results = []

for (const [index, testCase] of testCases.entries()) {
  if (index > 0) console.log('\n')
  results.push(await runCodexCase(testCase))
}

if (options.all) {
  const passedCount = results.filter(({ passed }) => passed).length

  console.log('\nSummary:')
  for (const { id, passed } of results) console.log(`${passed ? 'PASS' : 'FAIL'} ${id}`)
  console.log(`Deterministic checks: ${passedCount}/${results.length} cases passed`)
  console.log('Outcomes: NOT GRADED')
}

if (results.some(({ passed }) => !passed)) process.exitCode = 1
