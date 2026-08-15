/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config'

export default getViteConfig({
  test: {
    // 빌드 산출물 테스트는 globalSetup 이 .test-dist 를 만들어 둔 뒤 실행된다
    globalSetup: ['./tests/setup/build.ts'],
    include: ['tests/unit/**/*.test.ts', 'tests/build/**/*.test.ts'],
  },
})
