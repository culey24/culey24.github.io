# Interactive CV Website (`culey24.github.io`)

This repository contains a professional, interactive, and bilingual CV website designed for deployment to GitHub Pages. It features a modern, clean, responsive design with full dark-mode support and optimized print styling for exporting to PDF.

## Features

1. **Bilingual Support (VI / EN)**: Easily toggle between Vietnamese and English versions of your resume with a single click.
2. **Premium Dark Mode**: Responsive styling supporting dark mode (auto-detected from system settings, with a manual toggle override).
3. **Live Customizer (Edit Mode)**:
   - Edit your name, contact information, profile summary, work experience, projects, skills, education, and language proficiencies in real-time directly on the page.
   - All changes are immediately reflected in the preview and auto-saved to your browser's `localStorage` so you don't lose progress.
4. **Import/Export JSON**:
   - Download your complete CV configuration as a JSON file.
   - Import a previously saved JSON file to load your details instantly on other devices.
   - Reset to the default template anytime.
5. **Print & PDF Export**: Optimized print stylesheet to produce a clean, professional, compact A4 layout when printing or saving as a PDF via the browser.

## Getting Started

### Prerequisites

You need [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed on your machine.

### Installation

```bash
yarn install
```

### Run Locally

Start the development server:

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

Compile the TypeScript files and bundle the application with Vite:

```bash
yarn build
```

The output will be placed in the `dist/` directory, which is ready to be hosted on GitHub Pages or any static website hosting provider.
