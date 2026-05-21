import React, { useState } from 'react';
import type { SkillCategory } from '../cvData';

interface SkillsProps {
  skills: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [search, setSearch] = useState('');

  const filteredSkills = skills.map(category => {
    const items = category.items.filter(item =>
      item.toLowerCase().includes(search.toLowerCase())
    );
    return { ...category, items };
  }).filter(category => category.items.length > 0);

  return (
    <section className="cv-section" id="skills-section">
      <div className="section-header-row">
        <h2 className="section-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="title-icon">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span>Skills</span>
        </h2>
        
        <div className="search-container no-print">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="skills-search-input"
          />
        </div>
      </div>

      <div className="skills-grid">
        {filteredSkills.map((category) => (
          <div key={category.id} className="skills-category-card">
            <h3 className="category-title">{category.name}</h3>
            <div className="skills-tags-container">
              {category.items.map((skill, sIdx) => (
                <span key={sIdx} className="skill-badge-item">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
        {filteredSkills.length === 0 && (
          <p className="no-results">
            No matching skills found.
          </p>
        )}
      </div>
    </section>
  );
};
