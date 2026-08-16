import { readdirSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { exists } from '../helpers/html'

/**
 * 픽스처 격리 가드 — 실제 글(src/content/posts)이 테스트 빌드에 새어 들어오면 안 된다.
 * 슬러그를 하드코딩하지 않고 실제 디렉터리를 읽어 전부 검사한다.
 */
describe('fixture isolation', () => {
  const realSlugs = readdirSync('src/content/posts')
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))

  it('실제 글이 하나 이상 있어야 이 가드가 의미 있다', () => {
    expect(realSlugs.length).toBeGreaterThan(0)
  })

  it.each(realSlugs)('실제 글 %s 은 .test-dist 에 없다', (slug) => {
    expect(exists(`/posts/${slug}/`)).toBe(false)
  })
})
