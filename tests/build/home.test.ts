import { expect, it } from 'vitest'
import { readHtml } from '../helpers/html'

/** 페이지의 글 카드 목록 */
const cards = (route: string) => readHtml(route).querySelectorAll('.post-card')

it('홈에 카드가 정확히 10개, 최신 글이 첫 번째', () => {
  const list = cards('/')
  expect(list).toHaveLength(10)
  // 픽스처 중 최신: list-09 (2026-03-09)
  expect(list[0].querySelector('.post-card__title')?.text.trim()).toBe('목록 픽스처 09')
})

it('/2/ 에 나머지 글이 있고, 홈↔2페이지 이동 링크가 있다', () => {
  // 발행 픽스처 13개 → 10 + 3
  expect(cards('/2/')).toHaveLength(3)
  expect(readHtml('/').querySelector('.pagination a[rel="next"]')?.getAttribute('href')).toBe('/2/')
  expect(readHtml('/2/').querySelector('.pagination a[rel="prev"]')?.getAttribute('href')).toBe('/')
})
