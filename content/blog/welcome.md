---
title: "Welcome to my blog"
date: "2026-09-30"
tags: ["introduction", "nextjs"]
excerpt: "Đây là bài viết mẫu để nắm định dạng Markdown. Xóa file này và tạo các bài của bạn trong content/blog/."
---

# Welcome

Đây là **bài viết mẫu** giúp bạn nắm định dạng blog. Mỗi bài là một file `.md` trong `content/blog/`.

## Định dạng hỗ trợ

- **In đậm** và *in nghiêng*
- `code inline`
- Danh sách (ul/ol)
- [Liên kết](https://example.com)

```ts
export function hello() {
  return 'world';
}
```

## Công thức toán (KaTeX)

Inline: hàm sigmoid $\sigma(x) = \frac{1}{1 + e^{-x}}$.

Công thức riêng dòng:

$$
L = -\frac{1}{N}\sum_{i=1}^{N} \left[ y_i \log \hat{y}_i + (1 - y_i) \log (1 - \hat{y}_i) \right]
$$

## Chèn ảnh vào bài viết

Chèn ảnh bằng cú pháp Markdown thông thường. File ảnh đặt trong `public/images/` và tham chiếu đường dẫn gốc `/images/...`:

```md
![Mô tả ảnh](/images/blog-default.svg)
```

![Mô tả ảnh](/images/blog-default.svg)

## Mục lục tự động

Tiêu đề `##`/`###` sẽ tự sinh **Contents** đầu bài và anchor để trỏ tới.

## Frontmatter

```yaml
---
title: "Tiêu đề"
date: "2026-09-30"      # YYYY-MM-DD
tags: ["tag-a", "tag-b"]
excerpt: "Tóm tắt (tùy chọn)"
series: "Tên chuỗi bài"  # tùy chọn — nhóm thành series
order: 1                  # tùy chọn — vị trí trong series
cover: "/images/post.png" # tùy chọn — ảnh bìa trên card
---
```

Tạo file `.md` mới trong `content/blog/` là bài tự xuất hiện ở `/blogs` (và `/tags`). Muốn gỡ bài mẫu: xóa `content/blog/welcome.md`.