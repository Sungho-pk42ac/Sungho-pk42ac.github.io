import { readdirSync, readFileSync } from 'node:fs'

const DIR = 'tests/fixtures/posts'

/** 픽스처 중 발행(draft 아님) 글 슬러그. 픽스처가 늘어도 테스트가 따라온다 */
export const publishedSlugs = readdirSync(DIR)
  .filter((f) => f.endsWith('.md'))
  .filter((f) => !/^draft:\s*true/m.test(readFileSync(`${DIR}/${f}`, 'utf-8')))
  .map((f) => f.replace(/\.md$/, ''))
