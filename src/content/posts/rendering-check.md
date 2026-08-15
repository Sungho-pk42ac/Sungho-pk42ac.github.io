---
title: 렌더링 확인용 글
date: 2026-08-16
description: 슬라이스 1의 렌더링 경로를 검증하기 위한 임시 글. 디자인 검수가 끝나면 지운다.
---

이 글은 마크다운이 HTML로 제대로 변환되는지, velog 토큰이 실제로 먹는지 확인하려고 넣은 임시 글이다. 슬라이스 6(디자인 검수)이 끝나면 지운다.

## 문단과 강조

본문 기본 색은 `--text1`, 배경은 `--bg-page1`이다. **굵게**와 *기울임*, 그리고 [링크](https://velog.io)가 각각 어떻게 보이는지 확인한다. 링크는 `--primary1` 티얼이어야 한다.

한글이 길어질 때 줄바꿈이 단어 중간에서 끊기지 않는지도 같이 본다. 어절 단위로 끊겨야 읽기가 편하다.

## 목록

- 첫째 항목
- 둘째 항목
  - 중첩된 항목
- 셋째 항목

1. 순서 있는 첫째
2. 순서 있는 둘째

## 코드

인라인 코드는 `AutoTokenizer.from_pretrained()`처럼 배경이 깔려야 한다.

```python
from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
tokens = tokenizer("토크나이저가 한글을 어떻게 쪼개는지 본다")

print(tokens["input_ids"])
print(tokenizer.convert_ids_to_tokens(tokens["input_ids"]))
```

```css
:root {
  --teal6: #12b886;
}
```

키워드·문자열·주석·함수 색이 서로 달라야 Prism 매핑이 제대로 붙은 것이다.

## 인용

> 인용문은 왼쪽에 선이 붙고 글자색이 한 단계 흐려진다.

## 표

| 토큰 | 라이트 | 다크 |
|---|---|---|
| `--bg-page1` | `#f8f9fa` | `#121212` |
| `--text1` | `#212529` | `#ececec` |
| `--primary1` | `#12b886` | `#96f2d7` |

---

여기까지 정상이면 슬라이스 1은 통과다.
