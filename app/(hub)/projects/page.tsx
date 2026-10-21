import { defaultCVData } from '../../../src/cvData';
import { ProjectsExplorer } from '../../../src/components/ProjectsExplorer';

export default function ProjectsPage() {
  const projects = defaultCVData.projects;

  return (
    <>
      <section className="section blog-head">
        <h1 className="section-title">Projects</h1>
      </section>

      {projects.length === 0 ? (
        <div className="blog-empty">
          <p className="blog-empty-text">No projects yet.</p>
        </div>
      ) : (
        <div className="section">
          <ProjectsExplorer projects={projects} />
        </div>
      )}
    </>
  );
}
