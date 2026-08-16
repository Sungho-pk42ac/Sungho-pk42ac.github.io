import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { parse } from 'node-html-parser'
import { describe, expect, it } from 'vitest'
import PostCard from '../../src/components/PostCard.astro'

/** PostCard 가 받는 최소 형태의 글 */
const post = (over: Record<string, unknown> = {}) => ({
  id: 'sample',
  data: {
    title: '샘플 글',
    date: new Date('2026-03-01'),
    description: '한 줄 요약',
    tags: ['LLM', '회고'],
    ...over,
  },
})

async function renderCard(p: ReturnType<typeof post>) {
  const container = await AstroContainer.create()
  return parse(await container.renderToString(PostCard, { props: { post: p } }))
}

describe('PostCard', () => {
  it('제목·날짜·요약·태그를 렌더하고 글로 링크한다', async () => {
    const doc = await renderCard(post())
    expect(doc.querySelector('.post-card__title a')?.getAttribute('href')).toBe('/posts/sample/')
    expect(doc.querySelector('.post-card__title')?.text.trim()).toBe('샘플 글')
    expect(doc.querySelector('.post-card__desc')?.text.trim()).toBe('한 줄 요약')
    expect(doc.querySelector('time')?.getAttribute('datetime')).toBe('2026-03-01T00:00:00.000Z')
    expect(doc.querySelectorAll('.post-card__tags li').map((li) => li.text)).toEqual(['LLM', '회고'])
  })

  it('썸네일이 없으면 <img> 가 없다', async () => {
    expect((await renderCard(post())).querySelector('img')).toBeNull()
  })

  it('썸네일이 있으면 <img> 가 있다', async () => {
    const thumbnail = { src: '/_astro/sample.png', width: 4, height: 4, format: 'png' }
    expect((await renderCard(post({ thumbnail }))).querySelector('img')?.getAttribute('src')).toBe('/_astro/sample.png')
  })
})
