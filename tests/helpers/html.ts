import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse, type HTMLElement } from 'node-html-parser'

/** 테스트 빌드 산출물 루트. tests/setup/build.ts 가 여기에 빌드한다. */
export const TEST_DIST = join(process.cwd(), '.test-dist')

/** 라우트 경로('/posts/foo/')를 산출물 파일 경로로 바꾼다. */
function toFilePath(routePath: string): string {
  const clean = routePath.replace(/^\/+/, '')
  // '/rss.xml' 같은 파일 라우트는 그대로, 디렉터리 라우트는 index.html
  return /\.[a-z0-9]+$/i.test(clean) ? join(TEST_DIST, clean) : join(TEST_DIST, clean, 'index.html')
}

/** 라우트가 빌드 산출물에 존재하는가 */
export function exists(routePath: string): boolean {
  return existsSync(toFilePath(routePath))
}

/** 산출물 파일을 문자열로 읽는다 (HTML이 아닌 rss/sitemap 등에 사용) */
export function readText(routePath: string): string {
  return readFileSync(toFilePath(routePath), 'utf-8')
}

/** 산출물 HTML을 파싱해 루트 요소를 돌려준다 */
export function readHtml(routePath: string): HTMLElement {
  // node-html-parser 는 기본으로 <pre> 안을 텍스트로 두고 자식을 안 만든다.
  // 코드블록의 .token 을 셀렉터로 잡으려면 pre 는 파싱해야 한다.
  return parse(readText(routePath), { blockTextElements: { script: true, noscript: true, style: true } })
}
