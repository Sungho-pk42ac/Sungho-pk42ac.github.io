# boxfish

LLM 공부 정리본. MkDocs Material 문서 사이트로 관리한다.

## 로컬에서 보기

```bash
pip install -r requirements.txt
mkdocs serve
```

`http://127.0.0.1:8000` 접속. 파일을 저장하면 브라우저가 자동으로 새로고침된다.

## 배포

```bash
mkdocs gh-deploy
```

빌드해서 `gh-pages` 브랜치에 푸시까지 한 번에 한다. GitHub 리모트가 연결되어 있어야 하고,
레포 Settings → Pages에서 소스를 `gh-pages` 브랜치로 지정하면 사이트가 뜬다.

## 챕터 추가하는 법

1. `_template.md`를 `docs/06-something.md`로 복사
2. `mkdocs.yml`의 `nav:`에 한 줄 추가

```yaml
  - "6. 제목": 06-something.md
```

순서를 바꾸고 싶으면 파일명은 그대로 두고 `nav:` 줄만 위아래로 옮긴다.

## 작성 규칙

- 챕터 하나 = `docs/` 안의 md 하나. 섹션은 **한 줄 요약 / 핵심 / 헷갈렸던 것** 3개 고정.
- `헷갈렸던 것`을 비워두지 않는다. 6개월 뒤에 제일 값나가는 섹션이다.
- 짧은 코드는 md 코드블록에 인라인으로 넣는다(복사 버튼이 자동으로 붙는다).
- 실제로 돌리는 스크립트가 생기면 그때 `examples/04-tokenizer.py`처럼 챕터 번호를 맞춰 추가한다.
- 안 돌아가는 코드는 커밋하지 않는다.
