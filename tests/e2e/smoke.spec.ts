import { expect, test } from '@playwright/test'

/**
 * e2e 트레이서 — preview 서버가 .test-dist 를 서빙하고
 * 브라우저가 픽스처 글을 실제로 렌더링하는지 확인한다.
 */
test('픽스처 글이 브라우저에서 열린다', async ({ page }) => {
  await page.goto('/posts/hello-fixture/')
  await expect(page.locator('h1')).toHaveText('픽스처 첫 글')
})
