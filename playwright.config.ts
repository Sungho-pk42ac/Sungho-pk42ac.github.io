import { defineConfig } from '@playwright/test'

/**
 * e2e 는 vitest 가 만든 .test-dist 를 정적 서버로 띄워서 돈다.
 * 따라서 실행 순서는 vitest(빌드 포함) → playwright 여야 한다. npm test 가 그 순서를 강제한다.
 * 브라우저는 기본 프로젝트(chromium)만 쓴다.
 *
 * 포트는 tests/setup/e2e.mjs 가 매번 빈 포트를 골라 E2E_PORT 로 넘긴다 (npm run test:e2e).
 * `npx playwright test` 를 직접 치면 43210 을 쓴다.
 */
const port = process.env.E2E_PORT ?? '43210'
const baseURL = `http://localhost:${port}`

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  webServer: {
    // astro preview 가 아니라 (Astro 의존성으로 이미 설치된) vite preview 로 서빙한다.
    // astro preview 는 (1) AI 에이전트 환경을 감지하면 데몬화하고 (2) .astro/preview.json 락을 남기는데
    // Playwright 의 강제 종료로 락이 안 지워지면 다음 실행에서 죽은 pid 검사(find-process)로 수십 초를 먹어
    // 간헐적으로 60초 타임아웃이 났다. vite preview 는 락도 데몬도 없고 --strictPort 로 포트 이동도 막는다.
    command: `npx vite preview --outDir .test-dist --port ${port} --strictPort`,
    url: baseURL,
  },
})
