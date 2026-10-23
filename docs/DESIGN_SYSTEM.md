# DESIGN SYSTEM
## WEBSITE CÁ NHÂN QUÁCH GIA BẢO — quachgiabao.com

> **Mục đích:** định nghĩa **hợp đồng (contract)** cho màu, typography, spacing, motion và **trạng thái tương tác** — để mọi component đồng bộ effect. Mọi component **mới hoặc chỉnh sửa** phải tuân theo tài liệu này.
> **Nguồn sự thật:** token nằm ở `:root` / `[data-theme='dark']` trong [`src/index.css`](../src/index.css).
> **Tham chiếu:** [SPECIFICATION.md](SPECIFICATION.md) · [FRONTEND_SPEC.md](FRONTEND_SPEC.md).

---

## 1. TOKEN MÀU

| Token | Light | Dark | Dùng cho |
| :--- | :--- | :--- | :--- |
| `--color-paper` | `#eaedf0` | `#18191a` | nền trang |
| `--color-paper-2` | `#f8f9fa` | `#212529` | nền card / chip / ô nhập |
| `--color-paper-3` | `#e2e6ea` | `#2b3036` | nền hover / sâu hơn |
| `--color-ink` | `#343a40` | `#e4e6eb` | chữ chính, tiêu đề |
| `--color-ink-2` | `#6c757d` | `#b0b3b8` | chữ phụ (body mặc định) |
| `--color-ink-3` | `#8b959e` | `#8d9196` | chữ mờ (meta, ghi chú) |
| `--color-rule` | `#d7dde3` | `#343a40` | viền, divider |
| `--color-accent` | `#007bff` | `#6ea8fe` | **màu nhấn** (link, nút) |
| `--color-accent-2` | `#0056b3` | `#9ec5fe` | nhấn đậm (**trạng thái hover**) |
| `--color-accent-alt` | `#7c3aed` | `#c4b5fd` | nhấn phụ (secondary accent) |
| `--color-success` | `#15803d` | `#4ade80` | trạng thái tích cực |
| `--color-warning` | `#b45309` | `#fbbf24` | trạng thái đang làm / cảnh báo |
| `--color-danger` | `#dc2626` | `#f87171` | lỗi / nguy hiểm |
| `--color-info` | `= accent` | `= accent` | thông tin |
| `--color-link` | `= accent` | `= accent` | alias màu link |
| `--color-focus` | `= accent` | `= accent` | outline focus |
| `--color-accent-light` | `rgba(0,123,255,.1)` | `rgba(110,168,254,.16)` | nền hover nhạt |
| `--color-solid*` | ink/white | ink/paper | nút primary |

> **v0.10.0 — mở rộng palette:** giữ xanh làm primary, thêm **secondary accent** + **semantic** (success/warning/danger/info). Accent ở dark đổi từ trắng `#ffffff` → xanh nhạt `#6ea8fe` để dark mode cũng có màu.

**Quy tắc:** không hardcode mã màu trong component — luôn dùng token. Màu nhấn **chỉ** dùng cho link/hành động, không dùng làm màu chữ nội dung.

---

## 2. TYPOGRAPHY

- Font: **Inter** (`--font-display` / `--font-body`), fallback system-ui.
- Thang: `--text-xs .75` · `--text-sm .875` · `--text-md 1` · `--text-lg 1.125` · `--text-xl 1.375` · `--text-2xl 2` (rem).
- Heading: weight `600`, `letter-spacing: -0.02em`, `line-height: 1.15`.
- Body: `line-height: 1.6`, mặc định `color: var(--color-ink-2)`.

---

## 3. SPACING · SHAPE · ELEVATION

- Space: `--space-3xs .25` … `--space-2xl 4.5` (rem).
- Radius: `--radius-sm 6px` (nút, ô nhập) · `--radius-card 14px` (card, panel).
- Vòng tròn: pill `999px` (chip/tag, avatar).
- Shadow: `--shadow-sm` · `--shadow-md` (hover card) · `--shadow-lg` (panel/modal/portrait).

---

## 4. MOTION

- `--dur: 160ms`, `--ease-out: cubic-bezier(.16,1,.3,1)`.
- **Mọi transition dùng 2 token này** (`transition: <prop> var(--dur) var(--ease-out)`).
- Chỉ transition các thuộc tính rẻ: `color`, `border-color`, `background-color`, `box-shadow`. Không animate layout (`width/height/margin`).
- Ngoại lệ: trang `/cv` (Harvard CV) có motion riêng — không thuộc contract này.

---

## 5. CONTRACT TRẠNG THÁI TƯƠNG TÁC

> Tất cả phần tử tương tác có **đúng 3 trạng thái**: default · hover · focus-visible (cộng `active` khi cần).

### A. Text link — `.section-more`, `.detail-link`, `.read-more`, `.pub-title`
| Trạng thái | Quy tắc |
| :--- | :--- |
| default | `color: var(--color-accent)`, `font-weight: 600`, không gạch chân |
| hover | `color: var(--color-accent-2)` **+ `text-decoration: underline`** |
| focus-visible | `outline: 2px solid var(--color-focus); outline-offset: 2px` |
| transition | `color var(--dur) var(--ease-out)` |
| cỡ chữ | `.section-more` = `--text-md`; `.detail-link`/`.read-more` = `--text-sm` |

### B. Button — `.btn` + `.btn-primary` / `.btn-outline` / `.btn-ghost`
| Biến thể | default | hover |
| :--- | :--- | :--- |
| `.btn-primary` | nền `accent`, chữ `solid-ink`, viền `accent` | nền & viền `accent-2` |
| `.btn-outline` | trong suốt, chữ `link`, viền `rule` | viền `accent` |
| `.btn-ghost` | trong suốt, chữ `ink`, viền `rule` | viền `accent`, chữ `link` |

- transition: `background-color, border-color, color` (2 token).
- focus-visible: outline 2px như trên.

### C. Card — `.card`
- default: nền `paper-2`, viền `rule`, `radius-card`.
- hover: viền `ink-3` + `--shadow-md`.
- transition: `box-shadow, border-color`.

### D. Chip / Tag — `.tag`
- default: nền `paper-2`, viền `rule`, pill, chữ `ink-2`.
- **interactive** (`a.tag`): hover → viền `accent` + chữ `accent-2`; transition `border-color, color`.
- **non-interactive** (`span.tag`, ví dụ tag kỹ năng ở About): **tĩnh, không hover** — chip không click được thì không giả lập tương tác.

### E. Nav link — `.navbar-link`
- default `ink-2`; hover `ink`; transition `color`.

### F. Icon tròn — `.social-icon`
- default: viền `rule`; hover: chữ `link`, viền `accent`, nền `color-accent-light`.

### G. Badge — `.badge` (+ `--info` / `--success` / `--warning`)
- Pill nhỏ, chữ `--text-xs`, weight 600; màu lấy từ tone (`color-mix` 12–45% với semantic token).
- Dùng cho trạng thái: vd project *"In development"* → `.badge--warning`.

### H. Filter chip — `.filter-chip`
- Button dạng chip (như `.tag`); hover viền `accent` + chữ `accent-2`; `.is-active` → nền `accent`, chữ `solid-ink`.

### I. Whole-card link — `.card--link`
- Card `position: relative`; link "View detail" giãn phủ toàn card qua `::after { inset: 0 }` → nhấn **bất kỳ đâu** (vùng không phải chữ) mở trang chi tiết.
- Các link/button khác trong card (`a:not(.detail-link)`, `button`) đặt `position: relative; z-index: 1` để **vẫn bấm được** (GitHub / Demo / Visit publication / Certificate / tiêu đề publication).
- Hover toàn card kích hoạt trạng thái hover của text link (đổi màu + gạch chân).

### J. Back-to-top — `.back-to-top`
- Nút tròn **44×44px**, cố định góc dưới-phải (`right/bottom: clamp(12px, 3vw, 28px)`), `z-index: 60`.
- Ẩn mặc định (`opacity: 0; visibility: hidden; translateY(8px)`); hiện khi `.is-visible` (scrollY > 320).
- Hover: viền `accent`, chữ `link`; focus-visible: outline 2px.
- Tôn trọng `prefers-reduced-motion` (dùng `behavior: 'auto'` khi giảm chuyển động).

---

## 6. QUY TẮC PHÂN VAI (tránh lệch màu/kiểu)

1. **Một hành động chính** trong khối → `.btn-primary`; hành động phụ → `.btn-outline`.
2. **"Xem thêm / chi tiết"** (điều hướng trong dòng tiêu đề hoặc trong card) → **text link** (nhóm A), **luôn** cùng màu `accent`, hover `accent-2` + gạch chân. Không tự đặt màu khác.
3. Trong card: **nhóm nút chính ở trái**, **text link phụ ở phải**, cùng một hàng và `align-items: center` (`.proj-links`, `.pub-actions`).
4. Không trộn text link với nút trong cùng một cụm hành động nếu cùng vai trò.

---

## 7. DIVIDER CỦA SECTION

- Khối `.section-head` (tiêu đề + link "See more") vẽ **đường kẻ dưới cho cả hàng** (`border-bottom` trên `.section-head`), thanh nhấn `accent` dài `48px` ở trái (`.section-head::after`).
- Tiêu đề bên trong **bỏ** `border-bottom`/`::after` riêng; link nằm **trên** đường kẻ (có `padding-bottom`), **không đè** lên divider.
- Tiêu đề section **không** dùng `.section-head` (About, Experience, Education, Achievements, Contact) giữ kiểu `.section-title` mặc định (kẻ + thanh nhấn gắn với tiêu đề).

---

## 8. ACCESSIBILITY

- Mọi phần tử tương tác **bắt buộc** có `:focus-visible` (outline 2px `accent`, offset 2px).
- Vùng chạm trên mobile ≥ **44×44px**.
- Không dùng màu làm phương tiện truyền tải thông tin duy nhất (kèm text/icon).

---

## 9. CHECKLIST KHI THÊM COMPONENT

- [ ] Màu lấy từ token, không hardcode.
- [ ] Có đủ default / hover / focus-visible.
- [ ] Transition dùng `--dur` + `--ease-out`.
- [ ] Phân vai đúng §6 (link hay button, vị trí trong card).
- [ ] Tuân thủ divider §7 nếu nằm trong section có tiêu đề + link.
