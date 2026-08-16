import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { parse } from 'node-html-parser'
import { describe, expect, it } from 'vitest'
import Toc from '../../src/components/Toc.astro'

const render = async (headings: { depth: number; slug: string; text: string }[]) =>
  parse(await (await AstroContainer.create()).renderToString(Toc, { props: { headings } }))

describe('Toc', () => {
  it('h2/h3 만 링크로 렌더하고 h4 는 뺀다', async () => {
    const doc = await render([
      { depth: 2, slug: 'a', text: 'A' },
      { depth: 3, slug: 'a-1', text: 'A-1' },
      { depth: 4, slug: 'a-1-x', text: '너무 깊음' },
      { depth: 2, slug: 'b', text: 'B' },
    ])
    expect(doc.querySelectorAll('nav.toc a').map((a) => a.getAttribute('href'))).toEqual(['#a', '#a-1', '#b'])
  })

  it('h3 은 h2 와 구분되는 표식이 있다', async () => {
    const doc = await render([
      { depth: 2, slug: 'a', text: 'A' },
      { depth: 3, slug: 'a-1', text: 'A-1' },
    ])
    expect(doc.querySelector('a[href="#a-1"]')?.closest('li')?.classList.contains('toc__item--h3')).toBe(true)
  })

  it('h2/h3 이 하나도 없으면 아무것도 렌더하지 않는다', async () => {
    const doc = await render([{ depth: 4, slug: 'x', text: 'x' }])
    expect(doc.querySelector('nav')).toBeNull()
  })
})
