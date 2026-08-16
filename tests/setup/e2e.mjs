// e2e 러너 — 매 실행마다 OS 가 비어 있다고 보장하는 포트를 받아 Playwright 에 넘긴다.
// 고정 포트는 Windows 에서 직전 실행의 소켓 잔상으로 EADDRINUSE 가 나 간헐적으로 스위트를 막았다.
import { spawnSync } from 'node:child_process'
import { createServer } from 'node:net'

const port = await new Promise((resolve) => {
  const s = createServer()
  s.listen(0, () => {
    const { port } = s.address()
    s.close(() => resolve(port))
  })
})

const r = spawnSync('npx', ['playwright', 'test', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, E2E_PORT: String(port) },
})
process.exit(r.status ?? 1)
