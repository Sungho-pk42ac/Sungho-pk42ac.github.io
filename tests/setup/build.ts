import { execSync } from 'node:child_process'

/**
 * Vitest globalSetup — 픽스처 글만으로 .test-dist/ 에 1회 빌드한다.
 * POSTS_DIR 로 컬렉션 base 를 바꾸므로 실제 글(src/content/posts)과 dist/ 는 손대지 않는다.
 * outDir 은 astro build 가 스스로 비운다.
 */
export default function setup() {
  execSync('npx astro build --outDir .test-dist', {
    stdio: 'inherit',
    env: { ...process.env, POSTS_DIR: 'tests/fixtures/posts' },
  })
}
