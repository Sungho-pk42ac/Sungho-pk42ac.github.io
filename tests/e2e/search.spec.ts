import { expect, test, type Page } from '@playwright/test'

/** 헤더 검색 열고 입력. 결과 링크 로케이터를 돌려준다 */
async function search(page: Page, query: string) {
  await page.goto('/')
  await page.locator('pagefind-modal-trigger button').click()
  const input = page.locator('pagefind-modal input').first()
  await input.fill(query)
  await expect(input).toHaveValue(query)
  return page.locator('pagefind-modal .pf-result-link')
}

test('본문에만 있는 단어로 글이 검색되고 클릭하면 그 글로 간다', async ({ page }) => {
  const results = await search(page, '고유토큰-list05')
  await expect(results.first()).toContainText('목록 픽스처 05')
  await results.first().click()
  await expect(page).toHaveURL(/\/posts\/list-05\/$/)
})

test('draft 글의 단어는 검색되지 않는다', async ({ page }) => {
  const results = await search(page, '드래프트고유토큰')
  // 색인이 로드될 시간을 주고도 결과가 없어야 한다 (양성 케이스는 위 테스트가 증명)
  await page.waitForTimeout(800)
  await expect(results).toHaveCount(0)
})

test('한글 단어 검색이 된다', async ({ page }) => {
  const results = await search(page, '소제목')
  await expect(results.first()).toContainText('TOC 픽스처')
})
