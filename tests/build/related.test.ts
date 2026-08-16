import { expect, it } from 'vitest'
import { readHtml } from '../helpers/html'

it('태그가 겹치는 글 하단에 관련 글이 최대 3개, 자기 자신은 없다', () => {
  // list-02: [LLM, 회고] — LLM 은 여러 글과 겹친다
  const links = readHtml('/posts/list-02/').querySelectorAll('.related a').map((a) => a.getAttribute('href'))
  expect(links.length).toBeGreaterThan(0)
  expect(links.length).toBeLessThanOrEqual(3)
  expect(links).not.toContain('/posts/list-02/')
  expect(links.every((h) => h?.startsWith('/posts/'))).toBe(true)
})

it('겹치는 태그가 없는 글에는 관련 글 섹션 요소 자체가 없다', () => {
  // hello-fixture 는 태그가 없다
  expect(readHtml('/posts/hello-fixture/').querySelector('.related')).toBeNull()
})

it('draft 는 추천되지 않는다', () => {
  // long-toc [LLM] 의 관련 글에 draft 슬러그가 없어야 한다
  const links = readHtml('/posts/long-toc/').querySelectorAll('.related a').map((a) => a.getAttribute('href'))
  expect(links).not.toContain('/posts/draft-fixture/')
  expect(links).not.toContain('/posts/series-4-draft/')
})
