import type { HTMLElement } from 'node-html-parser'
import { expect, it } from 'vitest'
import { readHtml, readText } from '../helpers/html'

/** 최적화된 <img> 의 조건 */
const expectOptimized = (img: HTMLElement | null) => {
  expect(img).not.toBeNull()
  expect(img!.getAttribute('loading')).toBe('lazy')
  expect(img!.getAttribute('decoding')).toBe('async')
  expect(Number(img!.getAttribute('width'))).toBeGreaterThan(0)
  expect(Number(img!.getAttribute('height'))).toBeGreaterThan(0)
  expect(img!.getAttribute('src')).toMatch(/^\/_astro\/.*\.webp$/)
}

it('본문 이미지가 최적화(webp)·지연로딩·크기 속성으로 나온다', () => {
  expectOptimized(readHtml('/posts/image-fixture/').querySelector('.markdown-body img'))
})

it('카드 썸네일도 같은 조건이다', () => {
  expectOptimized(readHtml('/').querySelector('.post-card__thumb img'))
})

it('원본 PNG 경로가 산출물에 노출되지 않는다', () => {
  expect(readText('/posts/image-fixture/')).not.toContain('images/sample.png')
  expect(readText('/')).not.toContain('images/sample.png')
})
