type Related = { id: string; data: { tags: string[]; date: Date } }

/**
 * 관련 글 — 공통 태그 수 내림차순, 동률이면 최신순. 자기 자신과 겹침 0 은 제외.
 * ponytail: O(n·tags). 글 수천 개 전엔 충분하다
 */
export function getRelatedPosts<T extends Related>(current: T, all: T[], limit = 3): T[] {
  const mine = new Set(current.data.tags)
  return all
    .filter((p) => p.id !== current.id)
    .map((p) => ({ p, score: p.data.tags.filter((t) => mine.has(t)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.p.data.date.valueOf() - a.p.data.date.valueOf())
    .slice(0, limit)
    .map(({ p }) => p)
}
