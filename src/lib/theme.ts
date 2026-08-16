/** localStorage 키. 인라인 스크립트(BaseLayout)와 토글이 같은 키를 쓴다. */
export const THEME_KEY = 'theme'

/** 저장값 → 테마. 첫 방문(null)과 알 수 없는 값은 light — 시스템 설정을 따르지 않는다. */
export const resolveTheme = (stored: string | null): 'light' | 'dark' => (stored === 'dark' ? 'dark' : 'light')
