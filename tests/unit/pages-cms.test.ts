import { readFileSync } from 'node:fs'
import { load } from 'js-yaml'
import { expect, it } from 'vitest'

/** .pages.yml 은 브라우저 글쓰기(Pages CMS)의 유일한 설정. 스키마와 어긋나면 CMS 로 쓴 글이 빌드에서 깨진다 */
const cfg = load(readFileSync('.pages.yml', 'utf-8')) as any
const posts = cfg.content.find((c: any) => c.name === 'posts')
const fieldNames = posts.fields.map((f: any) => f.name)

it('posts 컬렉션이 src/content/posts 를 가리킨다', () => {
  expect(posts.type).toBe('collection')
  expect(posts.path).toBe('src/content/posts')
})

it('콘텐츠 스키마의 모든 필드 + body 가 CMS 필드로 있다', () => {
  // src/content.config.ts 의 z.object 키 목록을 그대로 읽는다 — 스키마에 필드가 늘면 여기서 걸린다
  const schema = readFileSync('src/content.config.ts', 'utf-8')
  const keys = [...schema.matchAll(/^\s{6}(\w+):\s*(?:z\.|image\()/gm)].map((m) => m[1])
  expect(keys.length).toBeGreaterThan(5)
  for (const k of keys) expect(fieldNames, `CMS 에 '${k}' 필드가 없다`).toContain(k)
  expect(fieldNames).toContain('body')
})

it('새 글은 draft 로 시작하고, 이미지는 글 옆 images/ 에 상대 경로로 저장된다', () => {
  expect(posts.fields.find((f: any) => f.name === 'draft').default).toBe(true)
  expect(cfg.media.input).toBe('src/content/posts/images')
  expect(cfg.media.output).toBe('images')
})
