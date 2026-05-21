import React from 'react';
import type { ExperienceItem } from '../cvData';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section className="cv-section" id="experience-section">
      <h2 className="section-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="title-icon">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
        <span>Work Experience</span>
      </h2>

      <div className="timeline">
        {experience.map((item, index) => (
          <div key={item.id || index} className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-dot"></div>
            </div>
            
            <div className="timeline-content">
              <div className="timeline-header">
                <div>
                  <h3 className="job-role">{item.role}</h3>
                  <h4 className="job-company">{item.company}</h4>
                </div>
                <span className="job-duration">{item.duration}</span>
              </div>
              
              {item.description && (
                <p className="job-description">{item.description}</p>
              )}
              
              {item.bullets && item.bullets.length > 0 && (
                <ul className="job-bullets">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
