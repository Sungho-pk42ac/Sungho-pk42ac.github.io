import { expect, it } from 'vitest'
import { getTagCounts } from '../../src/lib/tags'

const p = (tags: string[]) => ({ data: { tags } })

it('태그별 글 수를 세고 많은 순으로 정렬한다', () => {
  const posts = [p(['LLM', '회고']), p(['LLM']), p(['삽질', 'LLM']), p([]), p(['회고'])]
  expect(getTagCounts(posts)).toEqual([
    { tag: 'LLM', count: 3 },
    { tag: '회고', count: 2 },
    { tag: '삽질', count: 1 },
  ])
})

it('개수가 같으면 이름순', () => {
  expect(getTagCounts([p(['b']), p(['a'])]).map((t) => t.tag)).toEqual(['a', 'b'])
})
