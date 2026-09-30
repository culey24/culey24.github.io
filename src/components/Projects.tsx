import type { ProjectItem } from '../cvData';

interface ProjectsProps {
  projects: ProjectItem[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <div className="card-grid proj-grid">
      {projects.map((project) => (
        <article key={project.id} className="card proj-card">
          <p className="proj-role">{project.role}</p>
          <h3 className="proj-title">{project.title}</h3>
          <p className="proj-desc">{project.description}</p>
          {project.bullets && project.bullets.length > 0 && (
            <ul className="bullet-list">
              {project.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          )}
          {project.technologies && project.technologies.length > 0 && (
            <div className="proj-tech">
              {project.technologies.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          )}
          <div className="proj-links">
            {project.github && (
              <a className="btn btn-outline" href={project.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {project.link && (
              <a className="btn btn-primary" href={project.link} target="_blank" rel="noopener noreferrer">
                Demo
              </a>
            )}
          </div>
          <div className="print-only">
            {project.github && <span>GitHub: {project.github.replace(/^https?:\/\//, '')}</span>}
            {project.link && <span>Demo: {project.link.replace(/^https?:\/\//, '')}</span>}
          </div>
        </article>
      ))}
    </div>
  );
}