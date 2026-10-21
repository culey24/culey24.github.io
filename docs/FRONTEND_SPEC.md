# FRONTEND SPEC
## WEBSITE CÁ NHÂN QUÁCH GIA BẢO — quachgiabao.com

> **Phạm vi:** cấu trúc giao diện, layout shell, điều hướng Header, thanh tìm kiếm, các khối trang chủ và các trang riêng.
> **Tham chiếu:** [SPECIFICATION.md](SPECIFICATION.md) (overview, tech stack, route map, data model, changelog) · [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) (**contract** màu/hover/focus/motion — bắt buộc tuân theo). Quy ước SPEC tham khảo dự án `quynh-anh`.

---

## BRAND & ASSETS

- **Avatar cá nhân:** [`public/myself.jpg`](../public/myself.jpg) — dùng cho hero portrait (trang chủ) và khối About.
- **Logo HCMUT:** [`public/01_logobachkhoasang.png`](../public/01_logobachkhoasang.png) *(nền sáng)* / [`public/01_logobachkhoatoi.png`](../public/01_logobachkhoatoi.png) *(nền tối)* — dùng ở Experience và Education, **đổi theo theme** qua class `.exp-logo-light` / `.exp-logo-dark`.
- **Favicon:** [`public/favicon.svg`](../public/favicon.svg).
- **Ảnh bìa blog mặc định:** [`public/images/blog-default.svg`](../public/images/blog-default.svg) — fallback khi bài viết không có `cover`.
- **Icon xã hội/liên hệ:** SVG inline trong [`src/components/icons.tsx`](../src/components/icons.tsx) (`GithubIcon`, `LinkedinIcon`, `MailIcon`, `GlobeIcon`, `MapPinIcon`, `FileIcon`).

---

## 0. NGUYÊN TẮC CHUNG

- **Framework:** Next.js 16 App Router, static export (`output: 'export'`) — không server runtime, không fetch dữ liệu lúc chạy.
- **Route group `(hub)`:** mọi trang dùng chung Header + Footer (`app/(hub)/layout.tsx`). Trang `/cv` **nằm ngoài** nhóm này (không navbar/footer, để in).
- **Điều hướng:** dùng thẻ `<a>` thường thay vì `next/link` (static export không cần RSC prefetch). Các section trên trang chủ là anchor `#id`.
- **Nguồn dữ liệu UI:** `defaultCVData` trong [`src/cvData.ts`](../src/cvData.ts) — import tĩnh. Blog đọc từ `content/blog/*.md` tại build.
- **Ngôn ngữ nội dung:** hiện **monolingual (tiếng Anh)**; không có i18n/VI-EN.
- **Theme:** dark mode qua `data-theme` trên `<html>` + script no-flash trong `app/layout.tsx`; hook `useTheme()`.
- **In ấn:** class `.no-print` / `.print-only`; khối `@media print` riêng cho hub và cho `/cv`.

---

## 1. LAYOUT SHELL

### 1.1 Header (`.navbar`, sticky, `.no-print`)
`src/components/Header.tsx` — client component. Bố cục 1 hàng:

```
[ Brand: tên ]   [ Nav links ]   [ Search ]   [ Theme toggle ]   [ ☰ (mobile) ]
```

- **Brand:** tên từ `personalInfo.name`, trỏ về `/`.
- **Nav links:** xem §2.
- **Search:** xem §3.
- **Theme toggle:** đổi light/dark qua `useTheme()`.
- **Hamburger (mobile):** mở/đóng menu dọc; đóng bằng `Esc`; có `aria-expanded`/`aria-controls`.

### 1.2 Footer (`.footer`)
Social icons (GitHub, LinkedIn, Website, link `/cv`) + `© {năm} {tên}` + "Built with Next.js".

---

## 2. HEADER — ĐIỀU HƯỚNG

**Danh sách mục:**

| Nhãn hiển thị | Trỏ tới | Ghi chú |
| :--- | :--- | :--- |
| **About Me** | `/#about` | anchor trang chủ |
| **Projects** | `/projects` | trang danh sách đầy đủ |
| **Publications** | `/publications` | trang danh sách đầy đủ |
| **Blog** | `/blogs` | trang blog |
| **Contact** | `/contact` | **trang riêng** (v0.4.0) |

**Thay đổi (v0.2.0):** rút gọn nav từ `About Me · Experience · Education · Publications · Projects · Achievements · Contact · Blog` xuống **About Me · Projects · Publications · Blog · Contact**.

> **Chốt (v0.3.0):** *Experience*, *Education*, *Achievements* **vẫn giữ nguyên** là section trên trang chủ, chỉ **bỏ khỏi nav**. Header *Projects*/*Publications* trỏ thẳng trang đầy đủ.
> **Chốt (v0.4.0):** mục *Contact* trỏ **`/contact`** (trang riêng) thay cho anchor `/#contact`.

**Ghi chú ý định code:** nav khai báo trong mảng `navItems` (`Header.tsx`) dạng `{ label, href }` — hỗn hợp anchor (`/#about`) và route (`/projects`). Thêm/bớt mục chỉ cần sửa mảng này.

---

## 3. THANH TÌM KIẾM (SEARCH BAR & MODAL OVERLAY)

`src/components/Search.tsx` — tìm kiếm **tĩnh, client-side** trên `defaultCVData` (không gọi mạng).

### 3.1 Trigger trên Header
- Header chỉ hiển thị **nút trigger** thu gọn (`.search-trigger`): icon kính lúp + nhãn "Search…". Không phải ô input thật.

### 3.2 Modal overlay (đã triển khai)
- Click trigger → mở **modal** (render qua `createPortal` vào `document.body` để thoát containing block do `backdrop-filter` của `.navbar` tạo): **backdrop tối mờ** + panel căn trên.
- **Đóng:** nút **✕**, phím `Esc`, hoặc click ra ngoài (backdrop).
- **Khóa cuộn `body`** khi mở; **auto focus** ô nhập.
- Kết quả chia **3 nhóm**: `About` (skills, research interests), `Research` (projects, publications, experience, awards) và `Blog` (bài viết + tag); tối đa **8**; dedupe theo `href|label`.
- **Nguồn dữ liệu blog:** `app/(hub)/layout.tsx` (server component) đọc `getAllPosts()` lúc build, map `{slug, title, excerpt, tags}` rồi truyền `posts` qua `Header` → `Search` (client không đọc được `fs`).
- **Empty state** (chưa gõ): dải **chip từ khóa** gợi ý + **quick links** tới `/projects`, `/publications`, `/blogs`.
- **Active typing:** lọc theo `label`/`subtitle` (không phân biệt hoa thường).
- **Mobile (≤ 640px):** panel **fullscreen** (tránh bàn phím ảo che kết quả).

### Wireframe Desktop
```text
+---------------------------------------------------------------------------+
|  🔍 [ Tìm kỹ năng, dự án, công bố... ]                            [ ✕ Đóng ] |
+---------------------------------------------------------------------------+
|  [ ABOUT ]                                [ RESEARCH ]                     |
|  • Machine Learning                       • BKHome Chatbot                 |
|  • Natural Language Processing            • Towards Cost-Effective Voice…  |
|  • PyTorch                                • URA research lab               |
+---------------------------------------------------------------------------+
```

> **Đã triển khai (v0.5.0).** Chip gợi ý & quick links hiện khai báo **tĩnh** trong `Search.tsx`; có thể chuyển sang dữ liệu động sau.

---

## 4. TRANG CHỦ (Home hub — `/`)

`app/(hub)/page.tsx` — một trang one-page gồm các section theo thứ tự:

| # | Section | id | Component / nguồn |
| :- | :--- | :--- | :--- |
| 1 | Hero | — | split copy + framed portrait + terminal |
| 2 | About Me | `about` | `summary`, `allSkills`, `languages` |
| 3 | Experience | `experience` | [`Experience.tsx`](../src/components/Experience.tsx) |
| 4 | Education | `education` | render inline (logo light/dark) |
| 5 | Publications | `publications` | [`Publications.tsx`](../src/components/Publications.tsx) — "View detail" mỗi item (v0.8.0) |
| 6 | Featured Projects | `projects` | [`Projects.tsx`](../src/components/Projects.tsx) — tên đổi từ "Projects" (v0.8.0) |
| 7 | Achievements | `achievements` | render inline — nút **"Certificate"** (→ PDF trong `public/certificates/`) + link **"Paper"** (DOI) (v0.9.1) |
| 8 | Featured Blogs | `blogs` | [`BlogCard.tsx`](../src/components/BlogCard.tsx) — 3 bài mới nhất (v0.8.0) |
| 9 | Get in Touch (CTA) | `contact` | CTA ngắn → `/contact` (v0.5.0) |

> **Ghi chú (v0.6.0):** khối **About không còn ảnh** — avatar chỉ hiển thị ở **Hero** (tránh lặp ảnh).

> **Đa dạng layout (v0.7.0):** trước đây Education/Projects/Achievements dùng chung `.card` + `.card-grid` nên bị lặp "khung vuông + thông tin". Nay phân biệt:
> - **Experience** & **Education** → `.timeline` (chấm + đường dọc, không khung).
> - **Publications** → danh sách đánh số `[n]` (`Publications.tsx`).
> - **Projects** → `.card-grid` (thẻ) — giữ nguyên.
> - **Achievements** → `.award-list` (danh sách gọn, phân cách bằng đường kẻ, không khung).

### 4.5 "See more" & "View detail" (v0.2.0 · chốt v0.8.0)

- Trang chủ hiển thị **bản xem trước tối đa 3 item** cho mỗi section (`PREVIEW_LIMIT` trong `app/(hub)/page.tsx`).
- **"See more →"** ở hàng tiêu đề là **text link** (`.section-more`, cỡ `--text-md`), **luôn hiển thị**, dẫn tới trang danh sách `/projects` / `/publications`. Divider của `.section-head` thuộc cả hàng nên link **không đè** lên đường kẻ ([DESIGN_SYSTEM §7](DESIGN_SYSTEM.md)).
- **"View detail →"** là **text link** (`.detail-link`) trên **từng item**, đặt **góc dưới bên phải** card, cùng hàng và align giữa với nhóm nút bên trái (`.proj-links` / `.pub-actions`) → trang chi tiết `/projects/{slug}` / `/publications/{slug}`.
- **Đổi tên:** section *Projects* → **Featured Projects**; *Publications* giữ nguyên tên.
- **Featured Blogs** (v0.8.0): 3 bài mới nhất + "View detail →" tới `/blogs`; **ẩn section** nếu chưa có bài.
- **Màu/hover** của mọi text link tuân theo [DESIGN_SYSTEM §5.A](DESIGN_SYSTEM.md) (`accent` → `accent-2` + gạch chân).

---

## 5. TRANG PROJECTS — `/projects`

- **Mục đích:** liệt kê **toàn bộ** `defaultCVData.projects`.
- **Card:** **cover image** (`.proj-cover`), badge trạng thái (nếu có), role, tiêu đề, **summary** (chỉ tóm tắt — v0.11.0), tech tags, rồi hàng cuối: **năm** + GitHub/Demo ở trái và **"View detail →"** ở phải.
- **Whole-card link** (v0.11.0): nhấn bất kỳ đâu trên card (vùng không phải chữ) → mở trang chi tiết (`.card--link`); nút GitHub/Demo vẫn bấm riêng được ([DESIGN_SYSTEM §5.I](DESIGN_SYSTEM.md)).
- **Lọc theo công nghệ** (v0.10.0): `ProjectsExplorer` (client) — dãy `.filter-chip` (All + các tech), chọn chip để lọc; rỗng → thông báo.
- **Trang chi tiết `/projects/{slug}`** (v0.11.0): **breadcrumb `Projects › {title}`** → **tiêu đề** (`--` cỡ lớn) → hàng meta (**role** + badge trạng thái + năm) → **cover** → **summary** → **nội dung markdown** (`.detail-body`) → tech tags → GitHub/Demo → "← Back to projects". `generateStaticParams` + `dynamicParams = false`.
- **Trạng thái rỗng:** thông báo khi chưa có project.
- **Mở rộng (đề xuất):** ghim project nổi bật; tìm kiếm.

## 6. TRANG PUBLICATIONS — `/publications`

- **Mục đích:** liệt kê **toàn bộ** `defaultCVData.publications`, **nhóm theo năm** (v0.10.0; tiêu đề năm dùng `.blog-series-title`).
- **Nội dung mỗi item:** dùng lại thẻ `Publications.tsx` (danh sách đánh số, in đậm tên tác giả chính qua `myName`), nút **"Visit publication"** + **"Certificate"** (PDF, nếu có), link thô `.print-only`, + **"View detail →"** ở góc phải dưới.
- **Trang chi tiết `/publications/{slug}`** (`app/(hub)/publications/[slug]/page.tsx`): tiêu đề, authors (in đậm tác giả chính), publisher/date, mô tả, hàng hành động "Visit publication" + "Certificate", link "← Back to publications". `generateStaticParams` + `dynamicParams = false`.
- **Mở rộng (đề xuất):** lọc/sắp xếp theo năm; trích dẫn (BibTeX).

---

## 7. BLOG — `/blogs`, `/blogs/[slug]`, `/tags`

- `/blogs`: gom theo `series` + nhóm "Notes" + sidebar "Latest". `/blogs/[slug]`: render Markdown (GFM + KaTeX), TOC tự sinh, prev/next **trong cùng series**. `/tags`: tag cloud + danh sách theo tag.
- Chi tiết pipeline xem [SPECIFICATION §5](SPECIFICATION.md).
- **Không có "See more" ở Blog** — nav mục *Blog* đã trỏ thẳng `/blogs`.

---

## 8. TRANG LIÊN HỆ (CONTACT) — `/contact` *(mới, v0.4.0)*

- **Route riêng** (trước đây chỉ là section `#contact` trên trang chủ). Header mục *Contact* trỏ `/contact`.
- **Nội dung:** tiêu đề **"Get in Touch"** + component dùng chung [`Contact.tsx`](../src/components/Contact.tsx):
  - Khối `.contact-block`: đoạn mời liên hệ + nút **Email me** (`mailto:`).
  - Khối `.contact-grid` (contact rows): **Email**, **Email (HCMUT)**, **GitHub**, **LinkedIn**, **Website**, **Location** (link Google Maps). Mỗi row có icon + nhãn + giá trị; link ngoài mở tab mới.
- **Tái sử dụng:** `Contact.tsx` là component dùng chung, hiển thị **đầy đủ** trong trang `/contact`.
- **Chưa có form gửi dữ liệu** (đúng kiến trúc static, không backend) — mọi liên hệ qua `mailto:` / link ngoài.
- **Trang chủ (v0.5.0):** khối liên hệ **rút gọn thành CTA** — lời mời ngắn + nút **Email me** + **Contact page →** trỏ `/contact`. Thông tin đầy đủ chỉ nằm ở `/contact`.

---

## 9. CV PAGE — `/cv`

`app/cv/page.tsx` → [`HarvardCV.tsx`](../src/components/HarvardCV.tsx). Không dùng Header/Footer; có thanh hành động (Print/Save PDF + Back to Hub), ẩn khi in. Chi tiết in ấn xem [SPECIFICATION §7](SPECIFICATION.md).

---

## 10. UI BEHAVIOUR

- **Anchor & điều hướng:** link cùng trang dùng `/#id`; đóng mobile menu khi click.
- **Search:** chỉ chạy client-side; không gọi mạng.
- **Print:** Header/Footer/action bar đều `.no-print`; section tránh ngắt trang.
- **Responsive:** hamburger cho màn hình hẹp; grid card tự co theo breakpoint.

---

## 11. HỆ THỐNG COMPONENT (ý định trong code)

| Component | Vai trò / ý định |
| :--- | :--- |
| `Header` | Navbar + Search + theme toggle + hamburger (nhận `posts` cho search) |
| `Search` | Tìm kiếm tĩnh trên `defaultCVData` (modal overlay §3) |
| `Contact` | Khối liên hệ đầy đủ cho trang `/contact` (trang chủ dùng CTA ngắn) |
| `Experience` | Card kinh nghiệm (logo light/dark) |
| `Projects` | Card dự án (tech tags, link GitHub/Demo) |
| `Publications` | Danh sách publication (đánh số, in đậm tác giả) |
| `HarvardCV` | Tài liệu CV in được |
| `BlogCard` / `PostView` | Card blog / render bài + TOC + prev-next |
| `icons` | Factory `makeIcon` + bộ icon SVG inline |
