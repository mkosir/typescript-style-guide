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
    case: { type: 'string' },
    verbose: { type: 'boolean', default: false },
  },
})

const TEST_CASE = options.case ? EVAL_CASES.find(({ id }) => id === options.case) : EVAL_CASES[0]

if (!TEST_CASE) {
  throw new Error(`Unknown case "${options.case}". Available cases: ${EVAL_CASES.map(({ id }) => id).join(', ')}`)
}

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

const runCodexCase = async () => {
  const workspaceRoot = await mkdtemp(join(tmpdir(), 'typescript-style-guide-eval-'))

  try {
    await execFileAsync('git', ['init', '--quiet'], { cwd: workspaceRoot })
    await writeFile(join(workspaceRoot, 'AGENTS.md'), LOCAL_SKILL_REPORTING)

    const skillsTarget = join(workspaceRoot, '.agents/skills')
    await mkdir(skillsTarget, { recursive: true })

    for (const skill of TEST_CASE.installedSkills) {
      await cp(join(SKILLS_ROOT, skill), join(skillsTarget, skill), { recursive: true })
    }

    for (const [filePath, content] of Object.entries(TEST_CASE.workspace)) {
      const targetPath = getTargetPath(workspaceRoot, filePath)
      await mkdir(dirname(targetPath), { recursive: true })
      await writeFile(targetPath, content)
    }

    console.log(`Case: ${TEST_CASE.id}`)
    console.log(`Task: ${TEST_CASE.task}`)
    console.log(`Installed skills: ${formatList(TEST_CASE.installedSkills)}`)
    console.log(`Fixtures: ${formatList(Object.keys(TEST_CASE.workspace))}`)

    if (options.verbose) {
      for (const [filePath, content] of Object.entries(TEST_CASE.workspace)) {
        console.log(`\nFixture: ${filePath}\n${content}`)
      }
    }

    console.log('Running Codex...')
    const startedAt = Date.now()

    const result = await runCodex(TEST_CASE.task, workspaceRoot, TEST_CASE.installedSkills)
    const expectedReferences =
      'loadedReferences' in TEST_CASE.expected ? TEST_CASE.expected.loadedReferences : []

    console.log(`\nCompleted in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`)
    console.log(`Expected skill: ${TEST_CASE.expected.usedSkill ?? 'none'}`)
    console.log(`Actual skills: ${formatList(result.usedSkills)}`)
    console.log(`Expected references: ${formatList(expectedReferences)}`)
    console.log(`Actual references: ${formatList(result.references)}`)
    console.log(`Expected outcome: ${TEST_CASE.expected.outcome}`)
    console.log(`\nFinal response:\n${result.finalResponse}`)
  } finally {
    await rm(workspaceRoot, { recursive: true, force: true })
  }
}

await runCodexCase()
