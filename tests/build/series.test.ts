import { expect, it } from 'vitest'
import { readHtml } from '../helpers/html'

/** 시리즈 네비 링크의 href 목록 */
const seriesLinks = (slug: string) =>
  readHtml(`/posts/${slug}/`)
    .querySelectorAll('nav.series-nav a')
    .map((a) => a.getAttribute('href'))

it('2화 페이지에 1화·3화 링크가 있다', () => {
  expect(seriesLinks('series-2')).toEqual(['/posts/series-1/', '/posts/series-3/'])
})

it('1화에는 이전 링크가 없다', () => {
  expect(seriesLinks('series-1')).toEqual(['/posts/series-2/'])
})

it('draft 인 4화는 3화의 다음으로 나오지 않는다', () => {
  expect(seriesLinks('series-3')).toEqual(['/posts/series-2/'])
})
