import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { defaultCVData } from '../../../../src/cvData';
import { Markdown } from '../../../../src/components/Markdown';

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
    description: project?.summary,
    alternates: { canonical: `/projects/${slug}/` },
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
    <article className="section detail">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- static export; plain anchor avoids client-side RSC prefetch */}
        <a href="/projects/">Projects</a>
        <span className="breadcrumb-sep" aria-hidden="true">
          ›
        </span>
        <span className="breadcrumb-current" aria-current="page">
          {project.title}
        </span>
      </nav>

      <h1 className="detail-title">{project.title}</h1>

      <div className="detail-meta">
        <span className="detail-role">{project.role}</span>
        {project.status && (
          <span className={`badge badge--${project.statusTone ?? 'neutral'}`}>
            {project.status}
          </span>
        )}
        {project.year && <span className="detail-year">{project.year}</span>}
      </div>

      {project.cover && (
        // eslint-disable-next-line @next/next/no-img-element -- static cover image
        <img className="detail-cover" src={project.cover} alt={`${project.title} cover`} />
      )}

      <p className="detail-summary">{project.summary}</p>

      {project.content && (
        <div className="post-body detail-body">
          <Markdown>{project.content}</Markdown>
        </div>
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

      {(project.github || project.link) && (
        <div className="action-row">
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
      )}

      <p className="back-link">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- static export; plain anchor avoids client-side RSC prefetch */}
        <a href="/projects/">← Back to projects</a>
      </p>
    </article>
  );
}
