import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { parse } from 'node-html-parser'
import { expect, it } from 'vitest'
import ThemeToggle from '../../src/components/ThemeToggle.astro'

it('ThemeToggle 은 aria-label 이 있는 버튼 하나를 렌더한다', async () => {
  const container = await AstroContainer.create()
  const doc = parse(await container.renderToString(ThemeToggle))
  const buttons = doc.querySelectorAll('button')
  expect(buttons).toHaveLength(1)
  expect(buttons[0].getAttribute('aria-label')).toBeTruthy()
})
