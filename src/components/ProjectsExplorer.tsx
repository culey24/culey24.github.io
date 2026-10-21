'use client';

import { useState } from 'react';
import type { ProjectItem } from '../cvData';
import { Projects } from './Projects';

const ALL = 'All';

export function ProjectsExplorer({ projects }: { projects: ProjectItem[] }) {
  const [active, setActive] = useState(ALL);

  const technologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies)),
  ).sort((a, b) => a.localeCompare(b));

  const filtered =
    active === ALL ? projects : projects.filter((p) => p.technologies.includes(active));

  return (
    <>
      <div className="filter-chips" role="group" aria-label="Filter projects by technology">
        {[ALL, ...technologies].map((tech) => (
          <button
            key={tech}
            type="button"
            className={`filter-chip${active === tech ? ' is-active' : ''}`}
            aria-pressed={active === tech}
            onClick={() => setActive(tech)}
          >
            {tech}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="blog-empty">
          <p className="blog-empty-text">No projects for this technology.</p>
        </div>
      ) : (
        <Projects projects={filtered} />
      )}
    </>
  );
}
