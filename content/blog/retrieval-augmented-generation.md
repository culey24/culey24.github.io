---
title: "RAG thực dụng: những điểm hay hỏng trong pipeline"
date: "2026-11-09"
tags: ["nlp", "rag", "llm"]
excerpt: "Chunking, embedding, retrieval và đánh giá: kiểm tra từng khâu thay vì chỉ đổ lỗi cho LLM."
series: "NLP căn bản"
order: 2
cover: "/images/rag-pipeline.svg"
---

**Retrieval-Augmented Generation** cho LLM truy cập tài liệu bên ngoài lúc suy luận: truy xuất đoạn liên quan, đưa vào prompt, rồi sinh câu trả lời. Phần lớn lỗi trong thực tế nằm ở khâu truy xuất, không phải ở mô hình sinh.

## Pipeline

1. **Ingest**: tách tài liệu thành các chunk.
2. **Embed**: mã hóa chunk thành vector, lưu vào vector store.
3. **Retrieve**: mã hóa câu hỏi, lấy top-$k$ chunk gần nhất.
4. **Generate**: ghép ngữ cảnh vào prompt và sinh câu trả lời.

## Các điểm hay hỏng

### Chunking

- Chunk quá dài làm loãng tín hiệu, quá ngắn mất ngữ cảnh.
- Tách theo cấu trúc (heading, đoạn) thường tốt hơn cắt cố định theo số ký tự.
- Dùng overlap nhỏ để không cắt đứt ý.

### Embedding và ngôn ngữ

Mô hình embedding chủ yếu huấn luyện trên tiếng Anh có thể kém với tiếng Việt. Hãy thử một mô hình đa ngữ và so sánh trên dữ liệu của bạn thay vì tin vào bảng xếp hạng chung.

### Retrieval

- Kết hợp **BM25 + vector** (hybrid) thường vững hơn chỉ dùng vector, nhất là với tên riêng và mã định danh.
- Thêm bước **rerank** bằng cross-encoder cho top 20–50 kết quả.

## Đánh giá tách riêng từng khâu

| Khâu | Câu hỏi | Chỉ số gợi ý |
|---|---|---|
| Retrieval | Đoạn đúng có nằm trong top-$k$? | Recall@k, MRR |
| Generation | Câu trả lời bám ngữ cảnh? | Faithfulness, đánh giá thủ công |

Một bộ 50–100 câu hỏi có đáp án và đoạn nguồn đã gắn nhãn là đủ để phát hiện hầu hết hồi quy.

```python
def recall_at_k(retrieved_ids, gold_ids, k=5):
    return len(set(retrieved_ids[:k]) & set(gold_ids)) / len(gold_ids)
```

## Kết luận

Hãy đo retrieval trước. Nếu đoạn đúng không có trong ngữ cảnh, thay LLM mạnh hơn cũng không cứu được câu trả lời.

Bài trước: [Self-attention](/blogs/attention-is-all-you-need/).
