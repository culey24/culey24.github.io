import React from 'react';
import type { PublicationItem } from '../cvData';

interface PublicationsProps {
  publications: PublicationItem[];
}

export const Publications: React.FC<PublicationsProps> = ({ publications }) => {
  return (
    <section className="cv-section" id="publications-section">
      <h2 className="section-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="title-icon">
          <path d="M4 19.5V15a2 2 0 0 1 2-2h14" />
          <path d="M20 15v7H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h14v11" />
          <path d="M12 6h5" />
          <path d="M12 10h5" />
        </svg>
        <span>Publications</span>
      </h2>

      <div className="publications-list">
        {publications.map((pub, idx) => (
          <div key={pub.id || idx} className="publication-item">
            <div className="publication-header">
              <h3 className="publication-title">
                {pub.link ? (
                  <a href={pub.link} target="_blank" rel="noopener noreferrer" className="publication-link">
                    {pub.title}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="external-link-icon no-print">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                ) : (
                  pub.title
                )}
              </h3>
              <span className="publication-date">{pub.date}</span>
            </div>
            <div className="publication-authors">{pub.authors}</div>
            <div className="publication-publisher">{pub.publisher}</div>
            {pub.description && <p className="publication-desc">{pub.description}</p>}
            {pub.link && (
              <div className="publication-print-link print-only">
                Link: {pub.link.replace(/^https?:\/\//, '')}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
