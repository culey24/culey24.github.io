import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { defaultCVData } from '../../../../src/cvData';

interface ProjectParams {
  slug: string;
}

export function generateStaticParams(): ProjectParams[] {
  return defaultCVData.projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<ProjectParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = defaultCVData.projects.find((p) => p.slug === slug);
  return {
    title: project ? `${project.title} — Bao Quach` : 'Project — Bao Quach',
    description: project?.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<ProjectParams>;
}) {
  const { slug } = await params;
  const project = defaultCVData.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <section className="section blog-head">
        {project.cover && (
          // eslint-disable-next-line @next/next/no-img-element -- static cover image
          <img className="detail-cover" src={project.cover} alt={`${project.title} cover`} />
        )}
        <div className="proj-meta">
          {project.status && (
            <span className={`badge badge--${project.statusTone ?? 'neutral'}`}>
              {project.status}
            </span>
          )}
          {project.year && <span className="proj-year">{project.year}</span>}
        </div>
        <p className="proj-role">{project.role}</p>
        <h1 className="section-title">{project.title}</h1>
      </section>

      <div className="section">
        <p className="proj-desc">{project.description}</p>

        {project.bullets && project.bullets.length > 0 && (
          <ul className="bullet-list">
            {project.bullets.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
        )}

        {project.technologies.length > 0 && (
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
            <a
              className="btn btn-outline"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
          {project.link && (
            <a
              className="btn btn-primary"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Demo
            </a>
          )}
        </div>

        <p className="back-link">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- static export; plain anchor avoids client-side RSC prefetch */}
          <a href="/projects">← Back to projects</a>
        </p>
      </div>
    </>
  );
}
