import { expect, it } from 'vitest'
import { exists, readHtml } from '../helpers/html'

it('/tags/{tag}/ 는 그 태그 글만 나열한다', () => {
  const titles = readHtml('/tags/회고/')
    .querySelectorAll('.post-card__title')
    .map((t) => t.text.trim())
  // 회고 태그: list-02, list-06
  expect(titles.sort()).toEqual(['목록 픽스처 02', '목록 픽스처 06'])
})

it('없는 태그는 페이지가 없다', () => {
  expect(exists('/tags/없는태그/')).toBe(false)
})

it('홈 상단 태그 바 — 전체(/) + 태그 칩(/tags/x/), 0개 태그 없음', () => {
  const chips = readHtml('/').querySelectorAll('.tag-bar a')
  expect(chips[0].text.trim()).toBe('전체')
  expect(chips[0].getAttribute('href')).toBe('/')
  const hrefs = chips.slice(1).map((a) => a.getAttribute('href'))
  expect(hrefs).toContain('/tags/LLM/')
  expect(hrefs).toContain('/tags/회고/')
  expect(hrefs.every((h) => h?.startsWith('/tags/'))).toBe(true)
  // 가장 많은 태그(LLM)가 첫 칩
  expect(hrefs[0]).toBe('/tags/LLM/')
})

it('태그 페이지에서는 그 태그 칩이 활성 표시된다', () => {
  const active = readHtml('/tags/회고/').querySelector('.tag-bar a.is-active')
  expect(active?.getAttribute('href')).toBe('/tags/회고/')
})

it('카드와 글 페이지의 태그가 /tags/{tag}/ 로 링크된다', () => {
  const card = readHtml('/').querySelector('.post-card__tags a')
  expect(card?.getAttribute('href')).toMatch(/^\/tags\/.+\/$/)
  const post = readHtml('/posts/list-02/').querySelector('.post__tags a[href="/tags/회고/"]')
  expect(post).not.toBeNull()
})
