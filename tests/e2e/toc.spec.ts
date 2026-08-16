import { expect, test } from '@playwright/test'

test('세 번째 h2 까지 스크롤하면 그 목차 항목이 활성화된다', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/posts/long-toc/')
  await expect(page.locator('nav.toc')).toBeVisible()

  const third = page.locator('.markdown-body h2').nth(2)
  const id = await third.getAttribute('id')
  // 제목이 뷰포트 상단에 오도록 점프 (목차 링크 클릭과 같은 동작)
  await page.evaluate((id) => document.getElementById(id!)!.scrollIntoView({ block: 'start' }), id)

  await expect(page.locator(`nav.toc a.is-active`)).toHaveAttribute('href', `#${id}`)
})

test('뷰포트 900px 에서는 목차가 보이지 않는다', async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 800 })
  await page.goto('/posts/long-toc/')
  await expect(page.locator('nav.toc')).toBeHidden()
})
