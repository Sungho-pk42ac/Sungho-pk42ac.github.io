import { getCollection, type CollectionEntry } from 'astro:content'

export type Post = CollectionEntry<'posts'>

/**
 * 공개된 글을 최신순으로. 목록·피드·색인은 전부 이걸 통해 글을 얻는다.
 * draft 는 프로덕션 빌드에서만 제외하고 dev 에서는 보여준다 — 쓰는 중인 글을 확인해야 하니까.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft)
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}
