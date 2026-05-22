import React from 'react';
import type { ProjectItem } from '../cvData';

interface ProjectsProps {
  projects: ProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="cv-section" id="projects-section">
      <h2 className="section-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="title-icon">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m10 15 5-3-5-3v6z" />
        </svg>
        <span>Featured Projects</span>
      </h2>

      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div key={project.id || idx} className="project-card">
            <div className="project-card-header">
              <h3 className="project-title">{project.title}</h3>
              <div className="project-links no-print">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-icon"
                    title="View Source on GitHub"
                    aria-label="GitHub repository"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    </svg>
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-icon"
                    title="View Live Demo"
                    aria-label="Live demo link"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
            
            <h4 className="project-role">{project.role}</h4>
            <p className="project-desc">{project.description}</p>
            
            {project.bullets && project.bullets.length > 0 && (
              <ul className="job-bullets" style={{ marginTop: '4px', marginBottom: '12px' }}>
                {project.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            )}
            
            {project.technologies && project.technologies.length > 0 && (
              <div className="project-tech">
                {project.technologies.map((tech, tIdx) => (
                  <span key={tIdx} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="project-print-links print-only">
              {project.github && <span>GitHub: {project.github.replace(/^https?:\/\//, '')}</span>}
              {project.link && <span>Demo: {project.link.replace(/^https?:\/\//, '')}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
