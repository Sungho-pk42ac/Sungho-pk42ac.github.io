import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// 테스트는 POSTS_DIR 로 픽스처 디렉터리를 가리킨다. 실제 글과 섞이지 않게 하기 위함.
const postsDir = process.env.POSTS_DIR ?? './src/content/posts'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: postsDir }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string().optional(),
      tags: z.array(z.string()).default([]),
      // 카드 상단 이미지. 없으면 카드가 텍스트만으로 접힌다 (velog 와 동일)
      thumbnail: image().optional(),
      // 빌드에서 제외. dev 에서는 보인다 (getPublishedPosts 참고)
      draft: z.boolean().default(false),
      // 순서 있는 글 묶음. 둘 다 있어야 이전/다음 화가 뜬다
      series: z.string().optional(),
      seriesOrder: z.number().optional(),
    }),
})

export const collections = { posts }
