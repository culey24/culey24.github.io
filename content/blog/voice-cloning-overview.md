---
title: "Voice cloning: tổng quan kiến trúc và chi phí"
date: "2026-11-16"
tags: ["speech", "tts", "deep-learning"]
excerpt: "Các thành phần chính của hệ thống TTS hiện đại và những đòn bẩy để giảm chi phí khi triển khai."
cover: "/images/voice-cloning.svg"
---

Voice cloning là tổng hợp giọng nói (TTS) mà giọng đầu ra bắt chước một người nói cụ thể từ một lượng nhỏ âm thanh mẫu. Bài này tóm tắt cấu trúc phổ biến, không đi vào một hệ thống riêng nào.

## Các thành phần

1. **Speaker encoder**: nén đoạn âm thanh mẫu thành vector đặc trưng người nói (speaker embedding).
2. **Acoustic model**: nhận văn bản (hoặc phoneme) cùng speaker embedding, sinh biểu diễn âm thanh như mel-spectrogram hoặc token âm thanh rời rạc.
3. **Vocoder / codec decoder**: chuyển biểu diễn đó thành waveform.

Nhiều hệ thống gần đây gộp bước 2 và 3 bằng mô hình ngôn ngữ trên token của neural audio codec, rồi giải mã ra âm thanh.

## Dữ liệu và chất lượng

- Âm thanh mẫu sạch, ít nhiễu và ít vang quan trọng hơn là dài.
- Chuẩn hóa văn bản (số, ngày, viết tắt) ảnh hưởng lớn tới độ tự nhiên, đặc biệt với tiếng Việt.
- Chỉ số tham khảo: MOS (đánh giá chủ quan), độ tương đồng người nói và tỉ lệ lỗi từ khi chạy ASR trên âm thanh sinh ra.

## Giảm chi phí suy luận

| Đòn bẩy | Ý tưởng |
|---|---|
| Lượng tử hóa | Giảm độ chính xác trọng số (FP16, INT8) để giảm bộ nhớ và độ trễ |
| Streaming | Sinh và phát theo từng đoạn để giảm thời gian chờ đầu tiên |
| Batching | Gộp nhiều yêu cầu để tận dụng GPU |
| Cache | Lưu speaker embedding, không mã hóa lại mỗi lần |
| Mô hình nhỏ hơn | Chưng cất (distillation) từ mô hình lớn |

## Lưu ý đạo đức

Mô phỏng giọng người thật cần **sự đồng ý rõ ràng** của chủ giọng, và nên có cơ chế gắn nhãn hoặc watermark cho âm thanh tổng hợp để hạn chế lạm dụng.
