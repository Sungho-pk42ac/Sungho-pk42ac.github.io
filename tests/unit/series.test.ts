import { describe, expect, it } from 'vitest'
import { getSeriesNeighbors } from '../../src/lib/series'

const p = (id: string, series?: string, seriesOrder?: number) => ({ id, data: { series, seriesOrder } })

describe('getSeriesNeighbors', () => {
  const all = [p('c', 'llm', 3), p('a', 'llm', 1), p('x'), p('b', 'llm', 2), p('z', 'other', 1)]

  it('같은 시리즈를 seriesOrder 순으로 정렬해 이전/다음을 준다', () => {
    const { prev, next } = getSeriesNeighbors(p('b', 'llm', 2), all)
    expect(prev?.id).toBe('a')
    expect(next?.id).toBe('c')
  })

  it('첫 화는 이전이 없고 마지막 화는 다음이 없다', () => {
    expect(getSeriesNeighbors(p('a', 'llm', 1), all).prev).toBeNull()
    expect(getSeriesNeighbors(p('c', 'llm', 3), all).next).toBeNull()
  })

  it('시리즈가 없는 글은 둘 다 없다', () => {
    expect(getSeriesNeighbors(p('x'), all)).toEqual({ prev: null, next: null })
  })
})
