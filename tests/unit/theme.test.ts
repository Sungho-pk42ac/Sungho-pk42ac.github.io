import { expect, it } from 'vitest'
import { resolveTheme } from '../../src/lib/theme'

it('저장된 값이 없으면 light (첫 방문은 항상 라이트)', () => {
  expect(resolveTheme(null)).toBe('light')
})

it("저장된 'dark' 는 dark", () => {
  expect(resolveTheme('dark')).toBe('dark')
})

it('알 수 없는 값은 light 로 되돌린다', () => {
  expect(resolveTheme('garbage')).toBe('light')
})
