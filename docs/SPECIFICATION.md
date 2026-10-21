# ĐẶC TẢ DỰ ÁN (PROJECT SPECIFICATION)
## WEBSITE CÁ NHÂN QUÁCH GIA BẢO — quachgiabao.com

> **Tầm nhìn:** Hồ sơ cá nhân tương tác cho một sinh viên Khoa học Máy tính — gồm **CV tương tác**, **trang CV in được (Harvard style)** và **blog kỹ thuật Markdown** — triển khai **hoàn toàn tĩnh** trên GitHub Pages, chi phí vận hành bằng 0.

---

## 1. TỔNG QUAN HỆ THỐNG

- **Chủ thể:** Quách Gia Bảo (culey24) — sinh viên CS tại HCMUT.
- **Tên miền:** `quachgiabao.com` (cấu hình qua `public/CNAME`).
- **Bề mặt chính:**

| Bề mặt | URL | Mô tả |
| :--- | :--- | :--- |
| **Hub** | `/` | Trang one-page: hero, about, experience, education, publications, projects, achievements, contact |
| **CV** | `/cv` | Trang CV in được, tối ưu `@media print` → xuất PDF |
| **Blog** | `/blogs`, `/blogs/{slug}`, `/tags` | Blog Markdown (KaTeX, TOC, series, tag) |

- **Đặc tính:** không backend, không runtime server, không fetch dữ liệu lúc chạy. CV là hằng số build-time; blog đọc file lúc build.

---

## 2. CÔNG NGHỆ ÁP DỤNG (TECH STACK)

| Thành phần | Công nghệ | Ghi chú |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) + React 19 | React Compiler bật; static export |
| **Ngôn ngữ** | TypeScript (strict) | `moduleResolution: bundler`, alias `@/*` |
| **Xuất build** | `output: 'export'`, `distDir: 'dist'`, `trailingSlash: true` | `images.unoptimized: true` bắt buộc cho export |
| **Styling** | CSS thuần trong `src/index.css` | CSS variables + `data-theme`; không framework CSS runtime |
| **Blog** | `gray-matter`, `react-markdown`, `remark-gfm`, `remark-math`, `rehype-katex`, `rehype-slug`, `github-slugger` | |
| **Font** | Inter qua `next/font/google` | |
| **Package manager** | Yarn 1.x | `yarn.lock`; CI dùng `--frozen-lockfile` |
| **Deploy** | GitHub Actions → GitHub Pages | `.github/workflows/deploy.yml` |

> **Đánh giá (đã bàn):** giữ **Next.js**. Dự án **đã dùng React + TS**; câu hỏi "chuyển sang Vite" chỉ đổi *build tool*, không đổi React, và sẽ mất SSG per-route (SEO/no-JS) + phải tự dựng lại pipeline blog build-time. Không cần thiết cho use case CV + blog tĩnh.

---

## 3. BẢN ĐỒ ROUTE (ROUTING MAP)

| # | Route | Trang | Spec | Index |
| :-- | :--- | :--- | :--- | :---: |
| 1 | `/` | Trang chủ (hub) | [FRONTEND_SPEC §4](FRONTEND_SPEC.md) | ✅ |
| 2 | `/projects` | Danh sách dự án | [FRONTEND_SPEC §5](FRONTEND_SPEC.md) | ✅ |
| 3 | `/projects/{slug}` | Chi tiết dự án *(mới)* | [FRONTEND_SPEC §5](FRONTEND_SPEC.md) | ✅ |
| 4 | `/publications` | Danh sách công bố | [FRONTEND_SPEC §6](FRONTEND_SPEC.md) | ✅ |
| 5 | `/publications/{slug}` | Chi tiết công bố *(mới)* | [FRONTEND_SPEC §6](FRONTEND_SPEC.md) | ✅ |
| 6 | `/blogs` | Danh sách blog | [FRONTEND_SPEC §7](FRONTEND_SPEC.md) | ✅ |
| 7 | `/blogs/{slug}` | Chi tiết bài viết | [FRONTEND_SPEC §7](FRONTEND_SPEC.md) | ✅ |
| 8 | `/tags` | Tag cloud | [FRONTEND_SPEC §7](FRONTEND_SPEC.md) | ✅ |
| 9 | `/contact` | Liên hệ | [FRONTEND_SPEC §8](FRONTEND_SPEC.md) | ✅ |
| 10 | `/cv` | CV in được (Harvard) | [FRONTEND_SPEC §9](FRONTEND_SPEC.md) | ✅ |
| 11 | `*` | 404 | Next mặc định | ❌ |

**Quy ước URL:** path segment **tiếng Anh**, lowercase, `-` phân tách. Blog dùng slug từ tên file Markdown. `trailingSlash: true`.

> **Cập nhật (v0.8.0):** đã có **trang chi tiết theo item** `/projects/{slug}`, `/publications/{slug}` (`generateStaticParams` + `dynamicParams = false`) — trước đây chỉ có trang danh sách ([FRONTEND_SPEC §4.5](FRONTEND_SPEC.md)).

---

## 4. MÔ HÌNH DỮ LIỆU (DATA MODEL)

### 4.1 CV — `src/cvData.ts`
Nguồn dữ liệu **duy nhất**: hằng `defaultCVData: CVContent`. Interfaces: `PersonalInfo`, `ExperienceItem`, `ProjectItem`, `SkillCategory`, `EducationItem`, `LanguageItem`, `PublicationItem`, `AwardItem`, `CVContent`.

Ghi chú schema:
- `publications` và `awards` là collection optional (consumer dùng `?? []`).
- `PersonalInfo.title`, `.phone`, `.facebook`, `.zalo` **đã khai báo nhưng chưa render**.
- Đã bổ sung trường **`slug`** trên `ProjectItem`/`PublicationItem` (v0.8.0) cho trang chi tiết.
- `AwardItem.certificate` (v0.9.1): đường dẫn PDF trong `public/certificates/` — nút **Certificate** dùng trường này; `proof` giữ vai trò DOI (link "Paper").
- `ProjectItem` thêm `cover?`, `year?`, `status?`, `statusTone?` (v0.10.0) — ảnh bìa + badge trạng thái.
- `ProjectItem`: tách `description` → **`summary`** (luôn hiển thị) + **`content?`** (markdown, chỉ ở trang chi tiết) (v0.11.0); `bullets` giữ cho bản in CV.
- `PublicationItem.certificate?` (v0.10.0) — PDF chứng nhận (vd MIWAI 2025).

### 4.2 Blog frontmatter — `content/blog/*.md`
`title`, `date` (YYYY-MM-DD), `tags[]`, `excerpt?`, `series?`, `order?`, `cover?`, `link?` (link ngoài).

---

## 5. BLOG

- Loader: [`src/lib/blog.ts`](../src/lib/blog.ts) — `getAllSlugs`, `getPostBySlug`, `getAllPosts` (sort series → order → date), `getPostNeighbors` (prev/next trong cùng series).
- `readTime` = số từ ÷ 200; `excerpt` fallback strip Markdown 160 ký tự; `toc` quét `##`/`###` qua `github-slugger`.
- Thêm file `.md` → tự xuất hiện ở `/blogs` và `/tags`.

---

## 6. TRẠNG THÁI & ĐIỂM CHƯA KHỚP

### README cũ (đã sửa ở v0.1.0)
README trước đây mô tả một app **Vite/React** và 3 tính năng **không tồn tại** (Bilingual VI/EN, Live Customizer edit mode, Import/Export JSON) cùng dev URL `5173`, build "with Vite". Đã viết lại cho khớp Next.js.

### Còn tồn đọng
- `PersonalInfo.title/.phone/.facebook/.zalo` chưa render.
- `.gitignore` bỏ qua `dist`, nhưng `dist/` đang tồn tại trong working tree (artifact build cục bộ).
- Dữ liệu CV: 1 kinh nghiệm, 1 dự án, 1 publication (đã bỏ bullet placeholder "Still in development...").

---

## 7. IN / XUẤT PDF

- **`/cv` → PDF (chính):** CV được dựng bằng **`@react-pdf/renderer`** (`src/pdf/CvDocument.tsx`), xem trước + tải qua `CvPdfViewer` (client-only, `ssr: false`). File PDF do trình duyệt sinh nên **không dính header/footer của trình duyệt**, kiểm soát được A4/1 trang.
- **Hub (in trang):** class `.no-print` / `.print-only` + khối `@media print` cho hub trong `src/index.css` (ẩn chrome, ép trắng-đen, tránh ngắt card).
- (*Đã bỏ* khối print + component HTML CV cũ.)

---

## 8. BUILD & DEPLOY

1. Dev: `yarn dev` → `next dev` (cổng **3000**).
2. Build: `yarn build` → `next build` (static) → `dist/`.
3. Preview: `yarn preview` (`npx serve dist`). Lint: `yarn lint`.
4. Deploy: push `main` → Actions (Node 22) → `yarn install --frozen-lockfile` → `yarn build` → upload `./dist` → GitHub Pages.

---

## 9. HỆ THỐNG TÀI LIỆU DỰ ÁN (DOCUMENTATION INDEX)

**Nền tảng & kỹ thuật:**
* [docs/SPECIFICATION.md](SPECIFICATION.md): Tài liệu này — overview, tech stack, route map, data model, build/deploy, changelog.

**Giao diện & trang:**
* [docs/FRONTEND_SPEC.md](FRONTEND_SPEC.md): Layout shell, Header/điều hướng, thanh tìm kiếm, các section trang chủ, trang Projects/Publications, blog, CV, UI behaviour, hệ thống component.
* [docs/DESIGN_SYSTEM.md](DESIGN_SYSTEM.md): Token màu/typography/spacing/motion + **contract trạng thái tương tác** (text link, button, card, chip) — bắt buộc tuân theo khi thêm component.

**Khác:**
* [README.md](../README.md): giới thiệu, cài đặt, chạy, build.

---

## 10. NHẬT KÝ THAY ĐỔI (CHANGELOG)

### [v0.13.2] - 2026-10-21
* **CV — typography & sửa lỗi trình bày:**
  * Thêm **Source Serif 4** cho tên + tiêu đề mục (Inter giữ cho nội dung) — nhúng vào PDF.
  * **Sửa lỗi chồng chữ**: dòng contact đè lên `QUACH GIA BAO` do dòng tên thiếu `lineHeight` → đặt `lineHeight`/margin tường minh (verify bằng `pdftotext -bbox`: tên kết thúc y≈56.0, contact bắt đầu y≈57.8).
  * **Publication tách thành các hàng**: tên bài báo → tác giả (**in đậm tên mình**) → `Springer, Singapore, Nov 22, 2025. [DOI]` → summary.
  * Tăng cỡ chữ/khoảng cách để lấp trang cân đối — vẫn **1 trang A4** (~792/812pt).
* Kèm: link Demo BKHome Chatbot → `https://cse.hcmut.edu.vn/en/chatbot`.

### [v0.13.1] - 2026-10-21
* **CV — nhúng font:** `CvDocument` dùng **Inter** (Regular/Bold/Italic) và **nhúng thẳng vào PDF** (file `.ttf` ở `public/fonts/`) thay cho base-14 Helvetica **không nhúng** — khắc phục lỗi font hiển thị tuỳ viewer. PDF vẫn **1 trang A4**, text vẫn trích xuất/copy được ([SPECIFICATION §7](SPECIFICATION.md)).
* **Project link:** BKHome Chatbot → **`https://cse.hcmut.edu.vn/en/chatbot`** ([§4](SPECIFICATION.md)).

### [v0.13.0] - 2026-10-19
* **CV → PDF bằng `@react-pdf/renderer`:** thay HTML CV bằng `src/pdf/CvDocument.tsx` + `CvPdfViewer.tsx` (client-only); `/cv` có nút **Download PDF**. PDF sinh trong trình duyệt nên **không dính header/footer**, kiểm soát A4. Bỏ `HarvardCV.tsx` + CSS `.harvard-*` và các alias token cũ ([SPECIFICATION §7](SPECIFICATION.md)).
* **Nội dung CV (theo góp ý):** Experience → role **Student Researcher**, org **Unlimited AI Research Lab (URA) — HCMUT**, bỏ lặp "from 2024 to present"; Education **GPA: 3.9 / 4.0** + **Expected graduation: 2028**; đồng bộ tên trường; bỏ **"Still in development..."**; viết lại bullets dự án theo **action verbs**; Publication in **`[DOI]`** thay URL dài ([§4](SPECIFICATION.md)).
* **Sửa bug token:** `.social-icon:hover` dùng `--color-accent-light` (token chưa tồn tại) → thêm token `--color-accent-light` cho light/dark, hover nền đã hoạt động.

### [v0.12.0] - 2026-10-19
* **Card project — bố cục hàng nút:** tách **hàng meta** (badge trạng thái + năm) thành **một hàng riêng ngay trên hàng nút**; **ẩn tech tags ở entry** (chỉ còn ở trang chi tiết) để tối ưu chiều dọc; **mở rộng grid** (`.card-grid` min `340px → 420px`). Nhờ đó **GitHub/Demo và "View detail →" luôn cùng hàng và thẳng hàng** ở mọi kích thước (trước đây hàng quá chật nên bị co/wrap gây lệch) ([FRONTEND_SPEC §5](FRONTEND_SPEC.md)).

### [v0.11.0] - 2026-10-19
* **Project — tách nội dung:** `ProjectItem.description` → **`summary`** (tóm tắt) + **`content`** (markdown chi tiết). Entry ở trang chủ và trang chi tiết chỉ hiển thị **summary** trước; nội dung markdown chỉ ở trang chi tiết ([SPECIFICATION §4](SPECIFICATION.md)). Thêm component `Markdown` dùng chung (PostView cũng dùng lại).
* **Card project:** đưa **năm** xuống hàng cuối (trước nút GitHub/Demo); **whole-card link** — nhấn vùng trống trên card mở trang chi tiết ([DESIGN_SYSTEM §5.I](DESIGN_SYSTEM.md)).
* **Trang chi tiết project:** **breadcrumb `Projects › {title}`**, **tên dự án lên đầu**, role/status/năm xuống dưới tên, cover, summary, nội dung markdown; **nâng cỡ chữ tổng thể** ([FRONTEND_SPEC §5](FRONTEND_SPEC.md)). Trang chi tiết publication đồng bộ breadcrumb + tiêu đề lớn.

### [v0.10.0] - 2026-10-19
* **Palette mở rộng (giữ xanh primary):** thêm `--color-accent-alt` (secondary), `--color-success/warning/danger/info`; accent dark đổi `#ffffff` → `#6ea8fe` để dark mode có màu; cập nhật [DESIGN_SYSTEM §1](DESIGN_SYSTEM.md).
* **Projects:** thêm **cover image** + **badge trạng thái** (`statusTone`) + **năm**; trang `/projects` có **lọc theo công nghệ** (`ProjectsExplorer` + `.filter-chip`); trang chi tiết có cover lớn ([FRONTEND_SPEC §5](FRONTEND_SPEC.md)).
* **Publications:** **nhóm theo năm** ở `/publications`; thêm trường `certificate` — nút **Certificate** (vd file MIWAI 2025) trên card và trang chi tiết ([FRONTEND_SPEC §6](FRONTEND_SPEC.md)).

### [v0.9.1] - 2026-10-19
* **Certificate có đích:** thêm trường `AwardItem.certificate`; copy chứng nhận vào `public/certificates/` (`osts-2025-first-prize.pdf`, `miwai-2025.pdf`); nút **Certificate** của giải *First Prize OSTS 2025* giờ mở **PDF**, DOI chuyển thành link **"Paper"** ([FRONTEND_SPEC §4](FRONTEND_SPEC.md)). *(File `miwai-2025.pdf` chưa gắn vào mục nào — chờ chốt.)*

### [v0.9.0] - 2026-10-19
* **DESIGN SYSTEM (mới):** thêm [docs/DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — token màu/typography/spacing/motion + **contract trạng thái tương tác** cho 2 loại (text link, button) và card/chip/nav; quy tắc phân vai, divider section, accessibility.
* **Đồng bộ effect theo contract:** gộp `.section-more`/`.detail-link`/`.read-more` về cùng quy tắc text link (cùng màu `accent`, hover `accent-2` + gạch chân, có focus-visible); chip `.tag` dạng link có hover, dạng `span` giữ tĩnh; `.pub-title` hover đồng bộ.
* **Divider section:** `.section-head` vẽ đường kẻ cho cả hàng + thanh nhấn 48px; tiêu đề bên trong bỏ kẻ riêng → "See more" **không còn đè divider**; tăng cỡ chữ "See more" lên `--text-md`.
* **Vị trí "View detail":** chuyển vào **góc phải dưới** card project/publication (`.proj-links`/`.pub-actions`), align giữa với nhóm nút trái; nút **"Visit publication" bỏ mũi tên** (cả card và trang chi tiết) ([FRONTEND_SPEC §4.5, §5, §6](FRONTEND_SPEC.md)).

### [v0.8.0] - 2026-10-19
* **Trang chi tiết item:** thêm route **`/projects/{slug}`** và **`/publications/{slug}`** (`generateStaticParams` + `dynamicParams = false`); bổ sung trường **`slug`** vào `ProjectItem`/`PublicationItem` ([SPECIFICATION §3, §4](SPECIFICATION.md)).
* **"See more" & "View detail":** "See more →" ở hàng tiêu đề **luôn hiển thị** (redirect tới `/projects` / `/publications`); thêm **"View detail →" trên từng item** (`.detail-link`) → trang chi tiết ([FRONTEND_SPEC §4.5](FRONTEND_SPEC.md)).
* **Trang chủ:** section **Projects → "Featured Projects"**; thêm section **"Featured Blogs"** (3 bài mới nhất + "View detail → `/blogs`", ẩn nếu chưa có bài); nút Achievements **"Proof" → "Certificate"**; `app/(hub)/page.tsx` chuyển thành **server component** để đọc blog lúc build ([FRONTEND_SPEC §4](FRONTEND_SPEC.md)).

### [v0.7.0] - 2026-10-19
* **Đa dạng layout trang chủ:** **Experience** & **Education** chuyển sang **timeline** (`.timeline`); **Achievements** chuyển sang **danh sách gọn** `.award-list` (bỏ khung card); giữ `.card-grid` cho **Projects** và numbered list cho **Publications** — khắc phục việc Education/Projects/Achievements bị lặp "khung vuông + thông tin" ([FRONTEND_SPEC §4](FRONTEND_SPEC.md)).
* **Dọn kèm:** sửa lỗi class `fexp-list` không có CSS trong `Experience.tsx`; xoá CSS chết `.exp-list`/`.exp-item`/`.edu-card`/`.award-card`/`.card-date`; dọn rule `@media print` cho khớp layout mới.

### [v0.6.0] - 2026-10-19
* **Search — thêm Blog:** index bổ sung **bài viết blog + tag**; `app/(hub)/layout.tsx` chuyển thành **server component** đọc `getAllPosts()` lúc build và truyền `posts` qua `Header` → `Search`; kết quả thêm nhóm **Blog** ([FRONTEND_SPEC §3](FRONTEND_SPEC.md)).
* **Trang chủ — About:** bỏ **ảnh trùng** trong khối About (avatar chỉ còn ở Hero); xoá CSS `.about-row`/`.about-photo` ([FRONTEND_SPEC §4](FRONTEND_SPEC.md)).

### [v0.5.0] - 2026-10-19
* **Search Modal:** Header giờ dùng **nút trigger** mở **modal overlay** (backdrop + panel, `createPortal` vào `body`); khóa cuộn, auto focus, đóng bằng ✕/`Esc`/click ngoài; **empty state** (chip gợi ý + quick links) và kết quả nhóm `About`/`Research`; **fullscreen trên mobile** ([FRONTEND_SPEC §3](FRONTEND_SPEC.md)). Viết lại [`src/components/Search.tsx`](../src/components/Search.tsx); thêm `SearchIcon` và CSS `.search-trigger`/`.search-modal`/`.search-panel`/... (bỏ CSS dropdown cũ).
* **Trang chủ — Liên hệ:** khối "Get in Touch" **rút gọn thành CTA** (Email me + "Contact page →"); thông tin đầy đủ chỉ ở `/contact` ([FRONTEND_SPEC §4, §8](FRONTEND_SPEC.md)).

### [v0.4.0] - 2026-10-19
* **Liên hệ thành trang riêng:** thêm route **`/contact`** (`app/(hub)/contact/page.tsx`); tách khối liên hệ thành component dùng chung [`src/components/Contact.tsx`](../src/components/Contact.tsx); Header mục *Contact* trỏ `/contact` (trước là anchor `/#contact`). Trang chủ vẫn render `<Contact />` trong section `#contact` ([FRONTEND_SPEC §8](FRONTEND_SPEC.md)).
* **SPEC Frontend — bổ sung:** thêm mục **BRAND & ASSETS** và **THANH TÌM KIẾM (Search Bar & Modal Overlay)** — mô tả hiện trạng dropdown + thiết kế mục tiêu modal overlay (tham khảo `quynh-anh`) ([FRONTEND_SPEC §3](FRONTEND_SPEC.md)).
* **Route map:** bổ sung `/contact` ([SPECIFICATION §3](SPECIFICATION.md)).

### [v0.3.0] - 2026-10-19
* **Header — Điều hướng (chốt):** nav trỏ **thẳng** `/projects` và `/publications`. Các section *Experience*, *Education*, *Achievements* **giữ nguyên trên trang chủ**, chỉ bỏ khỏi nav ([FRONTEND_SPEC §2](FRONTEND_SPEC.md)).
* **Projects & Publications — "See more" (chốt):** trang chủ hiển thị **tối đa 3 item/section** (`PREVIEW_LIMIT`); hiện liên kết **"See more →"** khi có nhiều hơn 3, dẫn tới trang danh sách đầy đủ. **Không** có trang chi tiết theo item ([FRONTEND_SPEC §4.5](FRONTEND_SPEC.md)).
* **Triển khai:** thêm `app/(hub)/projects/page.tsx`, `app/(hub)/publications/page.tsx`; CSS `.section-head` / `.section-more` trong `src/index.css`; Header chuyển sang mảng `navItems`.

### [v0.2.0] - 2026-10-19
* **Header — Điều hướng:** Rút gọn nav còn **About Me · Projects · Publications · Blog · Contact** (bỏ Experience, Education, Achievements khỏi nav) ([FRONTEND_SPEC §2](FRONTEND_SPEC.md)).
* **Projects & Publications — "See more":** Thêm liên kết **"See more →"** ở hai section trang chủ, dẫn tới **trang danh sách đầy đủ** `/projects` và `/publications` ([FRONTEND_SPEC §4.5](FRONTEND_SPEC.md)).
* **Route map:** Bổ sung `/projects` và `/publications` ([SPECIFICATION §3](SPECIFICATION.md)).
* **Còn mở:** số phận các section Experience/Education/Achievements; đích của nav Projects/Publications; có trang chi tiết theo item hay không.

### [v0.1.0] - 2026-10-19
* **Khởi tạo tài liệu SPEC:** Tách thành [SPECIFICATION.md](SPECIFICATION.md) (index + changelog) và [FRONTEND_SPEC.md](FRONTEND_SPEC.md), theo quy ước SPEC của dự án tham chiếu.
* **Viết lại [README.md](../README.md):** đồng bộ với Next.js 16 (trước đây mô tả app Vite/React và các tính năng không tồn tại).
* **Dọn dead code:** xoá `getAllPostsMeta()`, icon `FacebookIcon`/`PhoneIcon`/`ZaloIcon`, asset `public/HCMCUT.svg`, `public/icons.svg`.
* **Sửa dead path:** nối `BlogPost.link` từ frontmatter `link` trong `getPostBySlug()`.
