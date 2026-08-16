import { expect, it } from 'vitest'
import { readHtml, readText } from '../helpers/html'

it('<html> 은 기본이 data-theme="light"', () => {
  expect(readHtml('/').querySelector('html')?.getAttribute('data-theme')).toBe('light')
})

it('테마 복원 인라인 스크립트가 <head> 안에서 첫 스타일보다 앞에 온다 (깜빡임 방지)', () => {
  const html = readText('/')
  const head = html.slice(html.indexOf('<head'), html.indexOf('</head>'))
  const script = head.search(/<script[^>]*>[^<]*localStorage/)
  const style = head.search(/<(link[^>]*stylesheet|style)/)
  expect(script).toBeGreaterThan(-1)
  expect(style).toBeGreaterThan(-1)
  expect(script).toBeLessThan(style)
})
