import { expect, it } from 'vitest'
import { readHtml } from '../helpers/html'

/**
 * 트레이서 테스트 — 픽스처 글 하나가 빌드되어 제목이 <h1>으로 나오면
 * "픽스처 → 빌드 → 산출물 파싱" 경로 전체가 살아 있는 것이다.
 * 파일이 없으면 readHtml 이 ENOENT 로 터지므로 존재 여부도 함께 검증된다.
 */
it('픽스처 글이 /posts/{slug}/ 로 빌드되고 <h1>이 title 이다', () => {
  expect(readHtml('/posts/hello-fixture/').querySelector('h1')?.text.trim()).toBe('픽스처 첫 글')
})
