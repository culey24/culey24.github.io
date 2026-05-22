import type { CVContent } from '../cvData';
import { Experience } from './Experience';
import { Projects } from './Projects';
import { Publications } from './Publications';
import { Skills } from './Skills';

interface OverviewProps {
  data: CVContent;
}

export function Overview({ data }: OverviewProps) {
  const { summary, education, awards, languages, experience, projects, publications, skills } = data;

  return (
    <>
      <div className="cv-col-left">
        {/* Summary Section */}
        <section className="cv-section" id="summary-section">
          <h2 className="section-title">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="title-icon"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>About Me</span>
          </h2>
          <p className="summary-text">{summary}</p>
        </section>

        {/* Education Section */}
        {education && education.length > 0 && (
          <section className="cv-section" id="education-section">
            <h2 className="section-title">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="title-icon"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
              <span>Education</span>
            </h2>
            <div className="education-list">
              {education.map((edu) => (
                <div key={edu.id} className="edu-item">
                  <div className="edu-header">
                    <span className="edu-school">{edu.school}</span>
                    <span className="edu-duration">{edu.duration}</span>
                  </div>
                  <div className="edu-degree">{edu.degree}</div>
                  {edu.details && (
                    <div className="edu-details">{edu.details}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Honors & Awards Section */}
        {awards && awards.length > 0 && (
          <section className="cv-section" id="awards-section">
            <h2 className="section-title">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="title-icon"
              >
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
              <span>Honors & Awards</span>
            </h2>
            <div className="awards-list">
              {awards.map((award) => (
                <div key={award.id} className="award-item">
                  <div className="award-header">
                    <span className="award-title">{award.title}</span>
                    <span className="award-date">{award.date}</span>
                  </div>
                  {award.issuer && (
                    <div className="award-issuer">{award.issuer}</div>
                  )}
                  {award.details && (
                    <div className="award-details">{award.details}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages Section */}
        {languages && languages.length > 0 && (
          <section className="cv-section" id="languages-section">
            <h2 className="section-title">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="title-icon"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>Languages</span>
            </h2>
            <div className="lang-list">
              {languages.map((lItem) => (
                <div key={lItem.id} className="lang-list-item">
                  <span className="lang-name">{lItem.name}</span>
                  <span className="lang-level">{lItem.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="cv-col-right">
        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <Experience experience={experience} />
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <Projects projects={projects} />
        )}

        {/* Publications Section */}
        {publications && publications.length > 0 && (
          <Publications publications={publications} />
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <Skills skills={skills} />
        )}
      </div>
    </>
  );
}
