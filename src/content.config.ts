import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

/**
 * 글 컬렉션.
 * 슬라이스 1은 제목·날짜·요약만 쓴다.
 * 태그/썸네일은 #2, 시리즈/draft는 #5에서 이 스키마에 추가한다.
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
  }),
})

export const collections = { posts }
