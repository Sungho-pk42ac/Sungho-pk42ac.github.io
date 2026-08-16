import { expect, it } from 'vitest'
import { readHtml } from '../helpers/html'

const meta = (route: string, prop: string) =>
  readHtml(route).querySelector(`meta[property="${prop}"]`)?.getAttribute('content')

it('글 페이지에 og:title/description/url/type=article 과 canonical 이 있다', () => {
  const route = '/posts/hello-fixture/'
  expect(meta(route, 'og:title')).toBe('픽스처 첫 글')
  expect(meta(route, 'og:description')).toContain('트레이서용 픽스처')
  expect(meta(route, 'og:type')).toBe('article')
  expect(meta(route, 'og:url')).toMatch(/^https?:\/\/.+\/posts\/hello-fixture\/$/)
  expect(readHtml(route).querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(meta(route, 'og:url'))
})

it('홈은 og:type=website', () => {
  expect(meta('/', 'og:type')).toBe('website')
  expect(meta('/', 'og:title')).toBeTruthy()
})
