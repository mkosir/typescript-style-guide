import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

type GuideSection = {
  source: `${string}/SKILL.md`
  target: `typescript-style-guide/references/${string}.md`
}

const SKILLS_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const START_MARKER = '<!-- BEGIN CANONICAL GUIDE CONTENT -->'
const END_MARKER = '<!-- END CANONICAL GUIDE CONTENT -->'
const GUIDE_SECTIONS = [
  {
    source: 'typescript-types/SKILL.md',
    target: 'typescript-style-guide/references/types.md',
  },
  {
    source: 'typescript-discriminated-unions/SKILL.md',
    target: 'typescript-style-guide/references/discriminated-unions.md',
  },
  {
    source: 'typescript-functions/SKILL.md',
    target: 'typescript-style-guide/references/functions.md',
  },
  {
    source: 'typescript-variables/SKILL.md',
    target: 'typescript-style-guide/references/variables.md',
  },
] as const satisfies ReadonlyArray<GuideSection>

for (const { source, target } of GUIDE_SECTIONS) {
  const sourcePath = resolve(SKILLS_ROOT, source)
  const targetPath = resolve(SKILLS_ROOT, target)
  const skill = await readFile(sourcePath, 'utf8')
  const startIndex = skill.indexOf(START_MARKER)
  const endIndex = skill.indexOf(END_MARKER)

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(`${source} is missing its canonical-content markers`)
  }

  const contentStart = startIndex + START_MARKER.length
  const guideSection = `${skill.slice(contentStart, endIndex).trim()}\n`

  await writeFile(targetPath, guideSection)
}
