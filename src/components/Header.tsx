'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../useTheme';
import { defaultCVData } from '../cvData';
import { Search } from './Search';

const sections = [
  { id: 'about', label: 'About Me' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export function Header() {
  const { isDark, setIsDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="navbar no-print">
      <div className="navbar-inner">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- static export; plain anchor avoids client-side RSC prefetch */}
        <a href="/" className="navbar-brand">
          {defaultCVData.personalInfo.name}
        </a>

        <nav
          id="primary-navigation"
          className={`navbar-links${menuOpen ? ' is-open' : ''}`}
          aria-label="Primary"
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`/#${s.id}`}
              className="navbar-link"
              onClick={() => setMenuOpen(false)}
            >
              {s.label}
            </a>
          ))}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- static export; plain anchor avoids client-side RSC prefetch */}
          <a href="/blogs" className="navbar-link" onClick={() => setMenuOpen(false)}>
            Blog
          </a>
        </nav>

        <Search />

        <div className="navbar-controls">
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setIsDark(!isDark)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            suppressHydrationWarning
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
          <button
            type="button"
            className="navbar-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="navbar-toggle-bar" />
            <span className="navbar-toggle-bar" />
            <span className="navbar-toggle-bar" />
          </button>
        </div>
      </div>
    </header>
  );
}
