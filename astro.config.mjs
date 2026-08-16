import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

export default defineConfig({
  // RSS·sitemap·OG 의 절대 URL 이 이 값을 쓴다. 커스텀 도메인을 붙이면 여기만 바꾼다.
  site: 'https://sungho-pk42ac.github.io',
  // 정적 호스팅은 디렉터리 라우트를 /x/ 로 서빙한다. 내부 링크·paginate URL 을 전부 여기에 맞춘다.
  trailingSlash: 'always',

  // draft 는 애초에 라우트가 안 생기므로 filter 불필요
  integrations: [sitemap()],

  markdown: {
    // 기본값 shiki는 색을 인라인 스타일로 박아서 CSS 변수로 테마 전환이 안 된다.
    // prism은 .token 클래스만 붙이므로 velog의 토큰→변수 매핑 CSS가 그대로 동작하고
    // 다크모드 전환도 따라온다.
    syntaxHighlight: 'prism',
  },
})
