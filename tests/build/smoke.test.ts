import { describe, expect, it } from 'vitest'
import { exists, readHtml } from '../helpers/html'

/**
 * 트레이서 테스트 — 픽스처 글 하나가 빌드되어 제목이 <h1>으로 나오면
 * "픽스처 → 빌드 → 산출물 파싱" 경로 전체가 살아 있는 것이다.
 */
describe('build smoke', () => {
  it('픽스처 글이 /posts/{slug}/ 로 빌드된다', () => {
    expect(exists('/posts/hello-fixture/')).toBe(true)
  })

  it('글 페이지의 <h1>이 frontmatter title이다', () => {
    const doc = readHtml('/posts/hello-fixture/')
    expect(doc.querySelector('h1')?.text.trim()).toBe('픽스처 첫 글')
  })
})
