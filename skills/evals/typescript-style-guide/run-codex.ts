import { execFile } from 'node:child_process'
import { cp, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve, sep } from 'node:path'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'

import { Codex } from '@openai/codex-sdk'

import { EVAL_CASES } from './cases.ts'

const execFileAsync = promisify(execFile)
const REPOSITORY_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const SKILL_SOURCE = join(REPOSITORY_ROOT, 'skills/typescript-style-guide')
const TEST_CASE = EVAL_CASES[0]
const VERBOSE = process.argv.includes('--verbose')

const LOCAL_SKILL_REPORTING = `## Local Skill Reporting

When a local skill is used, append it to the final response using this format:

Skills used:

- \`skill-name\` (\`references/reference.md\`) - brief task-specific reason

List only local skills and references actually used. Omit this section when no local skill was used.
`

const getTargetPath = (workspaceRoot: string, filePath: string) => {
  const targetPath = resolve(workspaceRoot, filePath)

  if (!targetPath.startsWith(`${workspaceRoot}${sep}`)) {
    throw new Error(`Workspace path must be relative: ${filePath}`)
  }

  return targetPath
}

const runCodex = async (task: string, cwd: string) => {
  const codex = new Codex()
  const thread = codex.startThread({
    approvalPolicy: 'never',
    sandboxMode: 'read-only',
    workingDirectory: cwd,
  })
  const { events } = await thread.runStreamed(task)
  const references = new Set<string>()
  let finalResponse = ''
  let skillUsed = false

  for await (const event of events) {
    if (VERBOSE) console.log(JSON.stringify(event))

    if (event.type === 'turn.failed') throw new Error(event.error.message)
    if (event.type === 'error') throw new Error(event.message)
    if (event.type !== 'item.completed') continue

    if (event.item.type === 'agent_message') finalResponse = event.item.text
    if (event.item.type !== 'command_execution') continue

    const { command } = event.item

    if (command.includes('.agents/skills/typescript-style-guide/SKILL.md')) skillUsed = true

    for (const reference of command.match(/references\/[\w-]+\.md/g) ?? []) {
      references.add(reference)
    }
  }

  return { finalResponse, references: [...references], skillUsed }
}

const runCodexCase = async () => {
  const workspaceRoot = await mkdtemp(join(tmpdir(), 'typescript-style-guide-eval-'))

  try {
    await execFileAsync('git', ['init', '--quiet'], { cwd: workspaceRoot })
    await writeFile(join(workspaceRoot, 'AGENTS.md'), LOCAL_SKILL_REPORTING)

    const skillTarget = join(workspaceRoot, '.agents/skills/typescript-style-guide')
    await mkdir(dirname(skillTarget), { recursive: true })
    await cp(SKILL_SOURCE, skillTarget, { recursive: true })

    for (const [filePath, content] of Object.entries(TEST_CASE.workspace)) {
      const targetPath = getTargetPath(workspaceRoot, filePath)
      await mkdir(dirname(targetPath), { recursive: true })
      await writeFile(targetPath, content)
    }

    console.log(`Case: ${TEST_CASE.id}`)
    console.log(`Task: ${TEST_CASE.task}`)

    for (const [filePath, content] of Object.entries(TEST_CASE.workspace)) {
      console.log(`\nFixture: ${filePath}\n${content}`)
    }

    console.log('Running Codex...')
    const startedAt = Date.now()

    const result = await runCodex(TEST_CASE.task, workspaceRoot)

    console.log(`\nCompleted in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`)
    console.log(`Skill: ${result.skillUsed ? 'typescript-style-guide' : 'not used'}`)
    console.log(`References: ${result.references.join(', ') || 'none'}`)
    console.log(`\nFinal response:\n${result.finalResponse}`)
  } finally {
    await rm(workspaceRoot, { recursive: true, force: true })
  }
}

await runCodexCase()
