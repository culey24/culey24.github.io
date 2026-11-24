---
title: "Quy trình Git gọn nhẹ cho nhóm nhỏ"
date: "2026-10-20"
tags: ["git", "engineering", "workflow"]
excerpt: "Trunk-based, commit nhỏ, Conventional Commits và PR ngắn: một quy trình dễ giữ lâu dài."
cover: "/images/git-workflow.svg"
---

Nhóm nhỏ không cần GitFlow đầy đủ. Một quy trình đơn giản, ít ngoại lệ sẽ được tuân thủ lâu hơn.

## Nguyên tắc

- `main` luôn ở trạng thái build được.
- Nhánh ngắn hạn (vài giờ đến vài ngày), tách từ `main`, gộp lại bằng PR.
- Mỗi PR làm **một việc** và đủ nhỏ để review trong vài phút.

## Đặt tên nhánh và commit

Dùng [Conventional Commits](https://www.conventionalcommits.org/) để lịch sử dễ đọc và có thể sinh changelog tự động:

```text
feat(blog): add series navigation
fix(seo): use trailing-slash canonical URLs
docs: document theme tokens
chore(deps): bump next
```

## Quy trình một thay đổi

```bash
git switch -c feat/search-shortcut
# sửa code, commit nhỏ
git fetch origin && git rebase origin/main
git push -u origin feat/search-shortcut
```

Sau khi PR được duyệt, dùng **squash merge** để mỗi PR là một commit trên `main`.

## Việc nên tự động hóa

- Lint và type-check trong CI cho mọi PR.
- Chặn push trực tiếp lên `main`.
- Mẫu mô tả PR: mục đích, cách kiểm tra, ảnh chụp nếu đổi giao diện.

## Khi nào nên đổi quy trình

Khi nhiều người cùng bảo trì nhiều phiên bản song song, bạn mới cần nhánh `release/*`. Trước đó, thêm quy tắc chỉ làm tăng ma sát.
