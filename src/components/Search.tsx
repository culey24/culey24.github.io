'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { defaultCVData } from '../cvData';
import { SearchIcon } from './icons';

export interface SearchPost {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
}

interface Hit {
  label: string;
  subtitle?: string;
  href: string;
  group: 'about' | 'research' | 'blog';
}

const groupLabels: Record<Hit['group'], string> = {
  about: 'About',
  research: 'Research',
  blog: 'Blog',
};

const suggestions = [
  'Machine Learning',
  'PyTorch',
  'TypeScript',
  'BKHome Chatbot',
  'Voice Cloning',
];

const quickLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Publications', href: '/publications' },
  { label: 'Blog', href: '/blogs' },
];

export function Search({ posts }: { posts: SearchPost[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const index = useMemo<Hit[]>(() => {
    const hits: Hit[] = [];
    for (const cat of defaultCVData.skills) {
      for (const item of cat.items) hits.push({ label: item, href: '/', group: 'about' });
    }
    for (const interest of defaultCVData.researchInterests) {
      hits.push({ label: interest, href: '/', group: 'about' });
    }
    for (const proj of defaultCVData.projects) {
      hits.push({ label: proj.title, href: '/projects', group: 'research', subtitle: proj.description });
    }
    for (const pub of defaultCVData.publications ?? []) {
      hits.push({ label: pub.title, href: '/publications', group: 'research', subtitle: pub.authors });
    }
    for (const exp of defaultCVData.experience) {
      hits.push({ label: exp.role, href: '/', group: 'research', subtitle: exp.company });
    }
    for (const award of defaultCVData.awards ?? []) {
      hits.push({ label: award.title, href: '/', group: 'research' });
    }
    for (const post of posts) {
      hits.push({ label: post.title, href: `/blogs/${post.slug}`, group: 'blog', subtitle: post.excerpt });
      for (const tag of post.tags) {
        hits.push({ label: tag, href: `/tags#${tag}`, group: 'blog', subtitle: 'Tag' });
      }
    }
    // Dedupe (same href + label can legitimately appear in several lists, e.g. "Generative AI")
    const seen = new Set<string>();
    const deduped: Hit[] = [];
    for (const hit of hits) {
      const key = `${hit.href}|${hit.label}`;
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(hit);
      }
    }
    return deduped;
  }, [posts]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter(
        (hit) =>
          hit.label.toLowerCase().includes(q) ||
          (hit.subtitle ?? '').toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query, index]);

  const groups: Array<{ key: Hit['group']; hits: Hit[] }> = (
    ['about', 'research', 'blog'] as const
  )
    .map((key) => ({ key, hits: results.filter((r) => r.group === key) }))
    .filter((g) => g.hits.length > 0);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const openModal = () => {
    setQuery('');
    setOpen(true);
  };

  const modal =
    open &&
    createPortal(
      <div className="search-modal no-print" role="dialog" aria-modal="true" aria-label="Search">
        <div className="search-backdrop" onClick={() => setOpen(false)} />
        <div className="search-panel">
          <div className="search-panel-head">
            <SearchIcon size={18} />
            <input
              ref={inputRef}
              type="text"
              className="search-panel-input"
              placeholder="Search skills, projects, publications…"
              aria-label="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button
              type="button"
              className="search-close"
              onClick={() => setOpen(false)}
              aria-label="Close search"
            >
              ✕
            </button>
          </div>

          <div className="search-panel-body">
            {query.trim() === '' ? (
              <>
                <div className="search-chips">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="search-chip"
                      onClick={() => setQuery(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <div className="search-quick">
                  {quickLinks.map((link) => (
                    <a
                      key={link.href}
                      className="search-hit"
                      href={link.href}
                      onClick={() => setOpen(false)}
                    >
                      <span className="search-hit-label">{link.label}</span>
                    </a>
                  ))}
                </div>
              </>
            ) : groups.length === 0 ? (
              <p className="search-empty">No results found.</p>
            ) : (
              groups.map((group) => (
                <div key={group.key} className="search-group">
                  <p className="search-group-label">{groupLabels[group.key]}</p>
                  {group.hits.map((hit) => (
                    <a
                      key={hit.href + hit.label}
                      href={hit.href}
                      className="search-hit"
                      onClick={() => setOpen(false)}
                    >
                      <span className="search-hit-label">{hit.label}</span>
                      {hit.subtitle && <span className="search-hit-sub">{hit.subtitle}</span>}
                    </a>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <div className="search no-print">
      <button
        type="button"
        className="search-trigger"
        onClick={openModal}
        aria-label="Open search"
      >
        <SearchIcon size={16} />
        <span>Search…</span>
      </button>
      {modal}
    </div>
  );
}
