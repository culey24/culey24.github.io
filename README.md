# quachgiabao.com

Personal website for **Quách Gia Bảo** — an interactive CV plus a Markdown blog, built with Next.js 16 (App Router) and exported as a fully static site for GitHub Pages.

See [`docs/SPECIFICATION.md`](./docs/SPECIFICATION.md) for the full technical specification (architecture, data model, blog pipeline, theming, build/deploy) and [`docs/FRONTEND_SPEC.md`](./docs/FRONTEND_SPEC.md) for the UI/navigation spec.

## Surfaces

| Route | Description |
| --- | --- |
| `/` | One-page portfolio hub: hero, about, experience, education, publications, projects, achievements, contact |
| `/cv` | CV rendered as a PDF with `@react-pdf/renderer` (view + download) |
| `/blogs`, `/blogs/<slug>`, `/tags` | Markdown blog with KaTeX math, auto table of contents, series grouping, and tags |

## Features

- **Dark mode** — auto-detected from system settings with a manual toggle. A pre-paint inline script (`app/layout.tsx`) avoids the flash of wrong theme; the choice persists in `localStorage`.
- **Static search** — client-side search over skills, research interests, projects, publications, experience, and awards. No backend.
- **Markdown blog** — posts are `.md` files in `content/blog/`. Supports GFM, KaTeX math (`$...$` / `$$...$$`), auto heading anchors + TOC, cover images, per-post series/order grouping with prev/next navigation, and a tag cloud at `/tags`.
- **CV PDF** — `/cv` renders the CV with `@react-pdf/renderer` (A4) and offers a **Download PDF** button, so the exported file has no browser header/footer. The hub keeps `@media print` styles.

## Tech Stack

- **Next.js 16** (App Router) + **React 19**, React Compiler enabled
- **TypeScript** (strict)
- Static export (`output: 'export'`, `distDir: 'dist'`, `trailingSlash: true`)
- Plain CSS with custom properties in `src/index.css` (no CSS framework)
- Blog: `gray-matter`, `react-markdown`, `remark-gfm`, `remark-math`, `rehype-katex`, `rehype-slug`, `github-slugger`

## Getting Started

Requires [Node.js](https://nodejs.org/) 22+ and [Yarn](https://yarnpkg.com/) 1.x.

```bash
yarn install
```

Run the dev server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
yarn build
```

Emits a static site into `dist/`. Preview it locally with:

```bash
yarn preview
```

## Lint

```bash
yarn lint
```

## Project Structure

```
app/                  Next.js App Router routes
  (hub)/              Portfolio hub + blog (shares Header/footer)
  cv/                 CV page (react-pdf viewer + download)
src/
  cvData.ts           Types + defaultCVData (the single source of CV content)
  index.css           All styling, including print rules
  useTheme.ts         Theme hook (data-theme + localStorage)
  lib/blog.ts         Blog loader for content/blog/*.md
  components/         UI components
content/blog/         Markdown posts
public/               Static assets (CNAME, images, favicon)
docs/                 Project specs (SPECIFICATION.md, FRONTEND_SPEC.md)
```

## Content

- **CV data** lives in `src/cvData.ts` (`defaultCVData`). Update it there; both the hub and `/cv` read from it.
- **Blog posts** are Markdown files in `content/blog/`. Add a file and it appears automatically at `/blogs` and `/tags`.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. The custom domain is set via `public/CNAME` (`quachgiabao.com`).
