/** 시리즈 이웃 계산에 필요한 최소 형태. astro:content 에 묶이지 않아 단위 테스트가 쉽다. */
type SeriesLike = { id: string; data: { series?: string; seriesOrder?: number } }

/** 같은 시리즈 안에서 seriesOrder 기준 이전 화 / 다음 화. 시리즈가 없으면 둘 다 null. */
export function getSeriesNeighbors<T extends SeriesLike>(post: T, all: T[]): { prev: T | null; next: T | null } {
  if (!post.data.series) return { prev: null, next: null }
  const chapters = all
    .filter((p) => p.data.series === post.data.series)
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0))
  const i = chapters.findIndex((p) => p.id === post.id)
  return { prev: chapters[i - 1] ?? null, next: chapters[i + 1] ?? null }
}
