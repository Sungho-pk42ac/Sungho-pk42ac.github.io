import { expect, it } from 'vitest'
import { publishedSlugs } from '../helpers/fixtures'
import { exists, readText } from '../helpers/html'

it('/rss.xml — 발행 글 수만큼 item, draft 없음, 절대 URL', () => {
  const xml = readText('/rss.xml')
  expect((xml.match(/<item>/g) ?? []).length).toBe(publishedSlugs.length)
  expect(xml).not.toContain('아직 쓰는 중인 글')
  expect(xml).toMatch(/<link>https?:\/\/[^<]+\/posts\/hello-fixture\/<\/link>/)
})

it('페이지 <head> 에 RSS autodiscovery 링크가 있다', () => {
  expect(readText('/')).toMatch(/<link[^>]+type="application\/rss\+xml"[^>]+href="\/rss\.xml"/)
})

it('sitemap 이 발행되고 발행 글 전부 포함, draft 없음', () => {
  expect(exists('/sitemap-index.xml')).toBe(true)
  const xml = readText('/sitemap-0.xml')
  for (const slug of publishedSlugs) expect(xml).toContain(`/posts/${slug}/`)
  expect(xml).not.toContain('/posts/draft-fixture/')
  expect(xml).not.toContain('/posts/series-4-draft/')
})
