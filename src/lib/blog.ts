import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';

export interface TocItem {
  id: string;
  depth: number;
  text: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  series?: string;
  order?: number;
  cover?: string;
  link?: string;
}

export interface BlogPostData extends BlogPost {
  content: string;
  toc: TocItem[];
}

const blogDir = path.join(process.cwd(), 'content', 'blog');

function readTimeOf(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function stripMarkdown(src: string): string {
  return src
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`~\[\]()!-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractToc(src: string): TocItem[] {
  const slugs = new GithubSlugger();
  const toc: TocItem[] = [];
  const lines = src.split('\n');
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;
    const depth = match[1].length;
    const text = match[2].replace(/[*_`]/g, '').trim();
    toc.push({ id: slugs.slug(text), depth, text });
  }
  return toc;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: string): BlogPostData {
  const file = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(file)) throw new Error(`Blog post not found: ${slug}`);
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const excerpt =
    (data.excerpt as string | undefined)?.trim() ||
    stripMarkdown(content).slice(0, 160) ||
    slug;

  return {
    slug,
    title: (data.title as string) || slug,
    excerpt,
    date: (data.date as string) || '',
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    series: data.series as string | undefined,
    order: typeof data.order === 'number' ? data.order : undefined,
    cover: data.cover as string | undefined,
    readTime: readTimeOf(content),
    content,
    toc: extractToc(content),
  };
}

export function getAllPosts(): BlogPostData[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => {
      const aSeries = a.series ?? '';
      const bSeries = b.series ?? '';
      if (aSeries !== bSeries) return aSeries < bSeries ? -1 : 1;
      const oa = a.order ?? Number.MAX_SAFE_INTEGER;
      const ob = b.order ?? Number.MAX_SAFE_INTEGER;
      if (oa !== ob) return oa - ob;
      return a.date < b.date ? 1 : -1;
    });
}

// Metadata only (used by client-side blog explorer) — strips body + toc.
export function getAllPostsMeta(): BlogPost[] {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    readTime: post.readTime,
    tags: post.tags,
    series: post.series,
    order: post.order,
    cover: post.cover,
    link: post.link,
  }));
}

export function getPostNeighbors(
  slug: string,
): { prev?: BlogPost; next?: BlogPost } {
  const posts = getAllPosts();
  const post = getPostBySlug(slug);
  const pool = post.series
    ? posts.filter((p) => p.series === post.series)
    : posts.filter((p) => !p.series);
  const idx = pool.findIndex((p) => p.slug === slug);
  return {
    prev: idx < pool.length - 1 ? pool[idx + 1] : undefined,
    next: idx > 0 ? pool[idx - 1] : undefined,
  };
}