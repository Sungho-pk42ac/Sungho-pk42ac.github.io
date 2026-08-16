import { expect, it } from 'vitest'
import { exists } from '../helpers/html'

it('draft: true 인 글은 빌드 산출물에 없다', () => {
  expect(exists('/posts/draft-fixture/')).toBe(false)
})
