'use client';

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

  return (
    <header className="navbar no-print">
      <div className="navbar-inner">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- static export; plain anchor avoids client-side RSC prefetch */}
        <a href="/" className="navbar-brand">
          {defaultCVData.personalInfo.name}
        </a>

        <nav className="navbar-links" aria-label="Primary">
          {sections.map((s) => (
            <a key={s.id} href={`/#${s.id}`} className="navbar-link">
              {s.label}
            </a>
          ))}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- static export; plain anchor avoids client-side RSC prefetch */}
          <a href="/blogs" className="navbar-link">
            Blog
          </a>
        </nav>

        <div className="navbar-controls">
          <Search />
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setIsDark(!isDark)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            suppressHydrationWarning
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </header>
  );
}