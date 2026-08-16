import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, it } from 'vitest'
import { readHtml, TEST_DIST } from '../helpers/html'

it('빌드 후 pagefind 색인이 있고 언어가 ko 다', () => {
  const entry = JSON.parse(readFileSync(join(TEST_DIST, 'pagefind/pagefind-entry.json'), 'utf-8'))
  expect(entry.languages.ko.page_count).toBeGreaterThan(0)
})

it('글 본문만 색인 대상이다 (홈·아카이브 등은 제외)', () => {
  const entry = JSON.parse(readFileSync(join(TEST_DIST, 'pagefind/pagefind-entry.json'), 'utf-8'))
  const posts = readHtml('/').querySelectorAll('.post-card').length + readHtml('/2/').querySelectorAll('.post-card').length
  expect(entry.languages.ko.page_count).toBe(posts)
})

it('헤더에 검색 트리거가 있다', () => {
  expect(readHtml('/').querySelector('.site-header pagefind-modal-trigger')).not.toBeNull()
})
