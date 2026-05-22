import React, { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

export function Navbar({ currentTab, onTabChange, isDark, setIsDark }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'workspace', label: 'Workspace' }
  ];

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    setDropdownOpen(false);
    window.print();
  };

  return (
    <nav className="sticky-navbar no-print">
      <div className="navbar-container">
        {/* Navigation Tabs */}
        <div className="navbar-tabs">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`#/${tab.id === 'overview' ? '' : tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`navbar-tab-item ${currentTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </a>
          ))}
        </div>

        {/* Action Group */}
        <div className="navbar-actions">
          {/* CV Dropdown */}
          <div className="cv-dropdown-wrapper" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="navbar-btn cv-btn"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <span>CV</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`arrow-icon ${dropdownOpen ? 'rotated' : ''}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="cv-dropdown-menu">
                <a
                  href="#/cv"
                  onClick={() => {
                    onTabChange('cv');
                    setDropdownOpen(false);
                  }}
                  className="dropdown-item"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                  </svg>
                  Harvard Academic CV
                </a>
                <button onClick={handlePrint} className="dropdown-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                  Print / Save PDF
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="navbar-btn theme-btn"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
