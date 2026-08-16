import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getPublishedPosts } from '../lib/posts'

/** RSS 피드. 절대 URL 은 astro.config 의 site 에서 나온다 */
export async function GET(context: APIContext) {
  const posts = await getPublishedPosts()
  return rss({
    title: 'pk42ac',
    description: 'LLM 공부하며 남기는 기록',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/posts/${post.id}/`,
    })),
  })
}
