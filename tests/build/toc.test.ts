import { expect, it } from 'vitest'
import { readHtml } from '../helpers/html'

const doc = () => readHtml('/posts/long-toc/')

it('긴 글에 nav.toc 가 있고 링크 수 = h2 + h3 수', () => {
  const d = doc()
  const h = d.querySelectorAll('.markdown-body h2, .markdown-body h3').length
  const links = d.querySelectorAll('nav.toc a')
  expect(h).toBe(10) // 5 섹션 × (h2 + h3)
  expect(links).toHaveLength(h)
  expect(links[0].getAttribute('href')).toBe('#' + d.querySelector('.markdown-body h2')?.getAttribute('id'))
})

it('코드블록에 Prism 토큰 클래스가 있고 인라인 코드는 <code> 로 감싸진다', () => {
  const d = doc()
  expect(d.querySelector('pre .token.keyword')).not.toBeNull()
  expect(d.querySelector('pre .token.comment')).not.toBeNull()
  expect(d.querySelectorAll('.markdown-body p > code').map((c) => c.text)).toContain('인라인코드()')
})
