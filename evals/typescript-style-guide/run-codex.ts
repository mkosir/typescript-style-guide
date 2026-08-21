import { execFile, spawn } from 'node:child_process'
import { cp, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve, sep } from 'node:path'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'

import { EVAL_CASES } from './cases.ts'

const execFileAsync = promisify(execFile)
const REPOSITORY_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const SKILL_SOURCE = join(REPOSITORY_ROOT, 'skills/typescript-style-guide')
const TEST_CASE = EVAL_CASES[0]

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

const runCodex = async (args: ReadonlyArray<string>, cwd: string) => {
  return new Promise<void>((resolvePromise, rejectPromise) => {
    const child = spawn('codex', args, { cwd, stdio: 'inherit' })

    child.on('error', rejectPromise)
    child.on('close', (code) => {
      if (code === 0) resolvePromise()
      else rejectPromise(new Error(`codex exited with code ${code}`))
    })
  })
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
    console.log(`Fixture files: ${Object.keys(TEST_CASE.workspace).join(', ')}`)
    console.log('\nCodex JSONL:')

    await runCodex(
      [
        'exec',
        '--ephemeral',
        '--json',
        '--sandbox',
        'read-only',
        '--ignore-user-config',
        '--ignore-rules',
        '--cd',
        workspaceRoot,
        TEST_CASE.task,
      ],
      workspaceRoot,
    )
  } finally {
    await rm(workspaceRoot, { recursive: true, force: true })
  }
}

await runCodexCase()
