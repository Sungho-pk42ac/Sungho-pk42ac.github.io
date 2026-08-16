import { execSync } from 'node:child_process'

/**
 * Vitest globalSetup — 픽스처 글만으로 .test-dist/ 에 1회 빌드한다.
 * POSTS_DIR 로 컬렉션 base 를 바꾸므로 실제 글(src/content/posts)과 dist/ 는 손대지 않는다.
 * outDir 은 astro build 가 스스로 비운다.
 */
export default function setup() {
  const env = { ...process.env, POSTS_DIR: 'tests/fixtures/posts' }
  // vitest 는 자기 import.meta.env 를 흉내내려고 process.env 에 DEV="1", PROD="", MODE="test",
  // NODE_ENV="test", BASE_URL="/" 를 넣는다. Astro 는 서버 코드의 import.meta.env 에 process.env 를
  // 합치므로 그대로 물려주면 프로덕션 빌드가 dev 처럼 굴어 draft 가 새어 나온다. 전부 지운다.
  for (const k of ['DEV', 'PROD', 'SSR', 'MODE', 'NODE_ENV', 'BASE_URL', 'TEST', 'VITEST']) delete env[k]
  execSync('npx astro build --outDir .test-dist', { stdio: 'inherit', env })
  // 실제 build 스크립트와 같은 후처리 — 검색 색인
  execSync('npx pagefind --site .test-dist', { stdio: 'inherit', env })
}
