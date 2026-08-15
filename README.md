# pk42ac

LLM 공부하며 남기는 기록. [velog](https://velog.io) 디자인을 따르는 Astro 정적 블로그.

## 로컬에서 보기

```bash
npm install
npm run dev
```

Astro 7부터 개발 서버가 백그라운드로 돈다. 상태 확인과 종료는 이렇게 한다.

```bash
npx astro dev status
npx astro dev logs
npx astro dev stop
```

## 빌드

```bash
npm run build     # dist/ 에 정적 파일 생성
npm run preview   # 빌드 결과를 로컬에서 확인
```

## 글 쓰는 법

`src/content/posts/` 에 마크다운 파일을 하나 만든다. 그게 전부다.

```markdown
---
title: 토크나이저가 한글을 쪼개는 방식
date: 2026-08-20
description: 목록과 검색에 쓰이는 한 줄 요약
---

본문…
```

주소는 파일명에서 나온다 — `tokenizer-korean.md` → `/posts/tokenizer-korean`.
날짜를 주소에 넣지 않으므로 나중에 글을 고쳐도 링크가 그대로다.

## 구조

```
src/
├─ content/posts/     글 (마크다운)
├─ content.config.ts  글 스키마
├─ pages/
│  ├─ index.astro     홈 (글 목록)
│  └─ posts/[id].astro  개별 글
├─ layouts/           공통 레이아웃
└─ styles/
   ├─ velog.css       디자인 토큰 (팔레트 + 역할 토큰)
   └─ markdown.css    본문·코드블록 스타일
```

## 디자인

velog의 오픈소스 저장소([velog-io/velog](https://github.com/velog-io/velog), MIT)의
`apps/web/src/styles/global.css` 에서 토큰 체계를 그대로 가져왔다.

- 원시 팔레트(`--teal0~9`, `--gray0~9`, `--red0~9`)는 `:root` 에
- 역할 토큰(`--bg-page1`, `--text1`, `--primary1` 등)은 `[data-theme]` 별로

색을 직접 쓰지 않고 역할에 매핑해두면 테마 전환이 값 교체로 끝난다.
다크 테마에서는 티얼이 밝아지고(`#12b886` → `#96f2d7`) 버튼 글자색이 반전된다.

지켜야 할 것: 그림자 없음(값 대비로만 층 구분), 티얼은 액션에만,
빨강은 파괴적 동작 전용, 순검정 텍스트 금지.

자세한 명세는 [DESIGN.md](DESIGN.md).
