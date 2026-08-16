import { expect, it } from 'vitest'
import { readHtml } from '../helpers/html'

const doc = () => readHtml('/archive/')

it('연·월 헤더에 개수가 붙고 최신 연월이 첫 번째다', () => {
  const heads = doc().querySelectorAll('.archive__month').map((h) => h.text.trim())
  // 픽스처 최신: 2026-03 (list-01~09 → 9개)
  expect(heads[0]).toBe('2026년 3월 (9)')
  expect(heads).toContain('2026년 2월 (3)') // series-1~3
})

it('항목이 글로 링크되고 draft 는 없다', () => {
  const hrefs = doc().querySelectorAll('.archive a').map((a) => a.getAttribute('href'))
  expect(hrefs).toContain('/posts/list-09/')
  expect(hrefs).not.toContain('/posts/draft-fixture/')
  expect(hrefs).not.toContain('/posts/series-4-draft/')
})

it('헤더 내비에 아카이브 링크가 있다', () => {
  expect(readHtml('/').querySelector('.site-header a[href="/archive/"]')).not.toBeNull()
})
