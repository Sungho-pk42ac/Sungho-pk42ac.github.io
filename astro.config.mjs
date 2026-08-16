import { defineConfig } from 'astro/config'

export default defineConfig({
  // 커스텀 도메인 확정 시 교체한다 (이슈 #7). RSS·sitemap·OG의 절대 URL이 이 값을 쓴다.
  site: 'https://example.com',
  // 정적 호스팅은 디렉터리 라우트를 /x/ 로 서빙한다. 내부 링크·paginate URL 을 전부 여기에 맞춘다.
  trailingSlash: 'always',

  markdown: {
    // 기본값 shiki는 색을 인라인 스타일로 박아서 CSS 변수로 테마 전환이 안 된다.
    // prism은 .token 클래스만 붙이므로 velog의 토큰→변수 매핑 CSS가 그대로 동작하고
    // 다크모드 전환도 따라온다.
    syntaxHighlight: 'prism',
  },
})
