---
title: "Self-attention trong Transformer: hiểu từ công thức"
date: "2026-11-02"
tags: ["nlp", "transformer", "deep-learning"]
excerpt: "Scaled dot-product attention làm gì, vì sao phải chia cho căn bậc hai của d_k, và multi-head giúp được gì."
series: "NLP căn bản"
order: 1
cover: "/images/transformer-attention.svg"
---

Transformer (Vaswani et al., 2017) thay thế RNN bằng cơ chế **self-attention**: mỗi token tự quyết định nó cần "nhìn" vào những token nào trong cùng câu.

## Q, K, V

Với ma trận embedding đầu vào $X$, ta tạo ba phép chiếu tuyến tính:

$$
Q = XW_Q,\quad K = XW_K,\quad V = XW_V
$$

- **Query**: token đang hỏi "tôi cần thông tin gì?"
- **Key**: token đóng vai "tôi chứa thông tin gì?"
- **Value**: nội dung thực sự được lấy đi.

## Scaled dot-product attention

$$
\mathrm{Attention}(Q,K,V) = \mathrm{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

Tích $QK^\top$ cho điểm tương đồng giữa mọi cặp token. Softmax biến điểm thành trọng số cộng lại bằng 1, rồi lấy trung bình có trọng số của $V$.

### Vì sao chia cho $\sqrt{d_k}$?

Nếu các phần tử của $q$ và $k$ độc lập, kỳ vọng 0, phương sai 1 thì tích vô hướng có phương sai $d_k$. Khi $d_k$ lớn, điểm số có độ lớn lớn, softmax bão hòa (gần one-hot) và gradient rất nhỏ. Chia cho $\sqrt{d_k}$ đưa phương sai về 1.

## Multi-head attention

Thay vì một phép attention, ta chạy $h$ phép song song trên các không gian con nhỏ hơn rồi nối kết quả:

$$
\mathrm{MultiHead}(X) = \mathrm{Concat}(\mathrm{head}_1,\dots,\mathrm{head}_h)W_O
$$

Mỗi head có thể học một kiểu quan hệ khác nhau (cú pháp, đồng tham chiếu, vị trí lân cận...), dù thực tế không phải head nào cũng diễn giải được.

## Cài đặt tối giản

```python
import torch
import torch.nn.functional as F

def attention(q, k, v, mask=None):
    d_k = q.size(-1)
    scores = q @ k.transpose(-2, -1) / d_k ** 0.5
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float("-inf"))
    return F.softmax(scores, dim=-1) @ v
```

## Độ phức tạp

Ma trận điểm có kích thước $n \times n$ nên chi phí thời gian và bộ nhớ là $O(n^2)$ theo độ dài chuỗi. Đây là lý do các biến thể như FlashAttention (tối ưu truy cập bộ nhớ) và sparse attention ra đời.

## Đọc thêm

- Vaswani et al., *Attention Is All You Need*, NeurIPS 2017.
- Bài kế tiếp trong series: [RAG](/blogs/retrieval-augmented-generation/).
