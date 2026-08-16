import { describe, expect, it } from 'vitest'
import { getRelatedPosts } from '../../src/lib/related'

const p = (id: string, tags: string[], date = '2026-01-01') => ({ id, data: { tags, date: new Date(date) } })

describe('getRelatedPosts', () => {
  const me = p('me', ['a', 'b', 'c'])
  const all = [
    me,
    p('two-old', ['a', 'b'], '2026-01-01'),
    p('two-new', ['b', 'c'], '2026-02-01'),
    p('one', ['c'], '2026-03-01'),
    p('none', ['z'], '2026-04-01'),
    p('three', ['a', 'b', 'c'], '2025-01-01'),
  ]

  it('공통 태그가 많은 순, 동률이면 최신순', () => {
    expect(getRelatedPosts(me, all).map((x) => x.id)).toEqual(['three', 'two-new', 'two-old'])
  })

  it('자기 자신과 공통 태그 0개는 후보에서 뺀다', () => {
    const ids = getRelatedPosts(me, all, 10).map((x) => x.id)
    expect(ids).not.toContain('me')
    expect(ids).not.toContain('none')
    expect(ids).toContain('one')
  })

  it('상한은 기본 3', () => {
    expect(getRelatedPosts(me, all)).toHaveLength(3)
  })
})
