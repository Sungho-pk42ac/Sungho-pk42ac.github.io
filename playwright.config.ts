import { defineConfig, devices } from '@playwright/test'

/**
 * e2e 는 vitest 가 만든 .test-dist 를 astro preview 로 서빙해서 돈다.
 * 따라서 실행 순서는 vitest(빌드 포함) → playwright 여야 한다. npm test 가 그 순서를 강제한다.
 */
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npx astro preview --outDir .test-dist --port 4321',
    url: 'http://localhost:4321',
    reuseExistingServer: false,
    timeout: 60_000,
    // Astro 7 은 AI 에이전트 환경(Claude Code 등)을 감지하면 서버를 데몬으로 띄운다.
    // 그러면 Playwright 는 "프로세스가 일찍 종료됨"으로 본다.
    // 이 env 는 데몬 자식 프로세스에 붙는 표식이라, 미리 달아주면 감지를 건너뛰고 포그라운드로 뜬다.
    env: { ASTRO_PREVIEW_BACKGROUND: '1' },
  },
})
