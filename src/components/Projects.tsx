import type { ProjectItem } from '../cvData';

interface ProjectsProps {
  projects: ProjectItem[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <div className="card-grid proj-grid">
      {projects.map((project) => (
        <article key={project.id} className="card proj-card card--link">
          {project.cover && (
            // eslint-disable-next-line @next/next/no-img-element -- static cover image
            <img
              className="proj-cover"
              src={project.cover}
              alt={`${project.title} cover`}
              loading="lazy"
            />
          )}
          {project.status && (
            <div className="proj-meta">
              <span className={`badge badge--${project.statusTone ?? 'neutral'}`}>
                {project.status}
              </span>
            </div>
          )}
          <p className="proj-role">{project.role}</p>
          <h3 className="proj-title">{project.title}</h3>
          <p className="proj-desc">{project.summary}</p>
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
            <div className="proj-links-left">
              {project.year && <span className="proj-year">{project.year}</span>}
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
            <a className="detail-link" href={`/projects/${project.slug}`}>
              View detail <span aria-hidden="true">→</span>
            </a>
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
