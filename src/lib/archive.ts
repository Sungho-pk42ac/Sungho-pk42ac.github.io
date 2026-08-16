type Dated = { data: { date: Date } }

/**
 * 연·월별 묶음. 입력이 최신순이면(getPublishedPosts) 그룹도 최신 연월이 먼저 오고
 * 그룹 안 순서도 그대로다 — 다시 정렬하지 않는다.
 */
export function groupByYearMonth<T extends Dated>(posts: T[]): { year: number; month: number; posts: T[] }[] {
  const groups: { year: number; month: number; posts: T[] }[] = []
  for (const post of posts) {
    const year = post.data.date.getFullYear()
    const month = post.data.date.getMonth() + 1
    const last = groups.at(-1)
    if (last && last.year === year && last.month === month) last.posts.push(post)
    else groups.push({ year, month, posts: [post] })
  }
  return groups
}
