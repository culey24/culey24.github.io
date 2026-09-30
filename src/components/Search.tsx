'use client';

import { useMemo, useState } from 'react';
import { defaultCVData } from '../cvData';

interface Hit {
  label: string;
  subtitle?: string;
  href: string;
  group: 'about' | 'research';
}

const groupLabels: Record<Hit['group'], string> = {
  about: 'About',
  research: 'Research',
};

export function Search() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const index = useMemo<Hit[]>(() => {
    const hits: Hit[] = [];
    for (const cat of defaultCVData.skills) {
      for (const item of cat.items) hits.push({ label: item, href: '/', group: 'about' });
    }
    for (const interest of defaultCVData.researchInterests) {
      hits.push({ label: interest, href: '/', group: 'about' });
    }
    for (const proj of defaultCVData.projects) {
      hits.push({ label: proj.title, href: '/', group: 'research', subtitle: proj.description });
    }
    for (const pub of defaultCVData.publications ?? []) {
      hits.push({ label: pub.title, href: '/', group: 'research', subtitle: pub.authors });
    }
    for (const exp of defaultCVData.experience) {
      hits.push({ label: exp.role, href: '/', group: 'research', subtitle: exp.company });
    }
    for (const award of defaultCVData.awards ?? []) {
      hits.push({ label: award.title, href: '/', group: 'research' });
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
  }, []);

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
    ['about', 'research'] as const
  )
    .map((key) => ({ key, hits: results.filter((r) => r.group === key) }))
    .filter((g) => g.hits.length > 0);

  return (
    <div
      className="search no-print"
      onFocus={() => setOpen(true)}
      onBlur={() => setTimeout(() => setOpen(false), 150)}
    >
      <input
        type="text"
        className="search-input"
        placeholder="Search…"
        aria-label="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
        }}
      />
      {open && query.trim() && (
        <div className="search-dropdown">
          {groups.length === 0 && <p className="search-empty">No results found.</p>}
          {groups.map((group) => (
            <div key={group.key} className="search-group">
              <p className="search-group-label">{groupLabels[group.key]}</p>
              {group.hits.map((hit) => (
                <a key={hit.href + hit.label} href={hit.href} className="search-hit">
                  <span className="search-hit-label">{hit.label}</span>
                  {hit.subtitle && <span className="search-hit-sub">{hit.subtitle}</span>}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}