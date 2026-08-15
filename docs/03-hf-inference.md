# 3. HuggingFace 모델 다운로드 & 추론

## 한 줄 요약

<!-- transformers로 모델을 받아서 돌리는 흐름을 한 문장으로 -->

## 핵심

<!--
채울 거리:
- `from_pretrained()`가 실제로 하는 일 — 뭘 어디서 받아오는지
- 캐시 위치: ~/.cache/huggingface/hub (윈도우는 C:\Users\<이름>\.cache\...)
  한 번 받으면 재사용된다. 용량 관리 필요
- 리포지토리 구성 파일: config.json / model.safetensors / tokenizer.json
- AutoModel vs AutoModelForCausalLM vs pipeline() — 추상화 층위가 다르다
- torch_dtype(float16/bfloat16), device_map="auto"
- generate() 파라미터: max_new_tokens, temperature, top_p, top_k, do_sample
  → do_sample=False면 temperature를 줘도 무시된다
- 채팅 모델은 apply_chat_template()을 거쳐야 제 성능이 나온다
- gated 모델(라이선스 동의 필요)과 토큰 로그인
-->

```python
# 실제로 돌려본 코드
```

## 헷갈렸던 것

<!--
예: pipeline()과 직접 generate()의 결과가 다르게 나왔던 이유,
    모델은 받았는데 OOM이 났던 상황 등
-->
