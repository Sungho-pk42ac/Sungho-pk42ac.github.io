type Tagged = { data: { tags: string[] } }

/** 태그별 글 수. 많은 순, 같으면 이름순. 입력은 이미 draft 가 걸러진 목록이어야 한다. */
export function getTagCounts(posts: Tagged[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const { data } of posts) for (const tag of data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'ko'))
}

/** 태그 페이지 경로. 한글은 그대로 둔다 — 브라우저·정적 호스팅 모두 유니코드 경로를 다룬다 */
export const tagHref = (tag: string) => `/tags/${tag}/`
