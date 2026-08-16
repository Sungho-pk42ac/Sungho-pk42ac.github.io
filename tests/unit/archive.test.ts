import { expect, it } from 'vitest'
import { groupByYearMonth } from '../../src/lib/archive'

const p = (id: string, date: string) => ({ id, data: { date: new Date(date) } })

it('연·월로 묶고 최신 연월이 먼저, 그룹 안은 입력 순서 유지', () => {
  const posts = [p('c', '2026-03-09'), p('b', '2026-03-01'), p('a', '2026-01-10'), p('z', '2025-12-31')]
  expect(groupByYearMonth(posts)).toEqual([
    { year: 2026, month: 3, posts: [posts[0], posts[1]] },
    { year: 2026, month: 1, posts: [posts[2]] },
    { year: 2025, month: 12, posts: [posts[3]] },
  ])
})

it('빈 입력은 빈 배열', () => {
  expect(groupByYearMonth([])).toEqual([])
})
