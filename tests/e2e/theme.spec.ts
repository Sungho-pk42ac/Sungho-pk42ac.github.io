import { expect, test } from '@playwright/test'

// 시스템이 다크여도 첫 방문은 라이트여야 한다
test.use({ colorScheme: 'dark' })

const theme = (page: import('@playwright/test').Page) => page.locator('html').getAttribute('data-theme')

test('첫 방문은 라이트, 토글하면 다크, 새로고침해도 유지된다', async ({ page }) => {
  await page.goto('/')
  expect(await theme(page)).toBe('light')

  await page.getByRole('button', { name: '테마 전환' }).click()
  expect(await theme(page)).toBe('dark')

  await page.reload()
  expect(await theme(page)).toBe('dark')
})

test('다크에서 원본 토큰 값이 적용된다 (배경 #121212, 티얼 #96f2d7)', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '테마 전환' }).click()

  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
  expect(bg).toBe('rgb(18, 18, 18)')

  // 태그 칩이 --primary1 을 쓴다. 다크에서는 teal2 로 밝아져야 한다
  const chip = await page.locator('.post-card__tags li').first().evaluate((el) => getComputedStyle(el).color)
  expect(chip).toBe('rgb(150, 242, 215)')
})
