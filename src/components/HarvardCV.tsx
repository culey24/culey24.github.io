import type { CVContent } from '../cvData';

interface HarvardCVProps {
  data: CVContent;
}

export function HarvardCV({ data }: HarvardCVProps) {
  const { personalInfo, education, experience, projects, publications, awards, skills, languages } = data;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="harvard-cv-wrapper">
      {/* Floating Action Bar (Hidden in Print) */}
      <div className="harvard-cv-actions no-print">
        <button onClick={handlePrint} className="harvard-print-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          Print / Save PDF
        </button>
        <a href="/" className="harvard-back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Hub
        </a>
      </div>

      {/* CV Document Container */}
      <div className="harvard-cv-document">
        {/* Header Block */}
        <header className="harvard-header">
          <h1 className="harvard-name">{personalInfo.name.toUpperCase()}</h1>
          <div className="harvard-contact">
            <span>{personalInfo.location}</span>
            <span>•</span>
            <span>{personalInfo.phone}</span>
            <span>•</span>
            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
          </div>
          <div className="harvard-links">
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer">Website</a>
            <span>•</span>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <span>•</span>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            {personalInfo.facebook && (
              <>
                <span>•</span>
                <a href={personalInfo.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              </>
            )}
          </div>
        </header>

        {/* Education Section */}
        {education && education.length > 0 && (
          <section className="harvard-section">
            <h2 className="harvard-section-title">EDUCATION</h2>
            <div className="harvard-section-divider"></div>
            {education.map((edu) => (
              <div key={edu.id} className="harvard-item">
                <div className="harvard-item-row">
                  <span className="harvard-item-bold">{edu.school}</span>
                  <span className="harvard-item-right">{edu.duration}</span>
                </div>
                <div className="harvard-item-row">
                  <span className="harvard-item-italic">{edu.degree}</span>
                  <span className="harvard-item-right">{personalInfo.location.split(',')[0]}</span>
                </div>
                {edu.details && (
                  <p className="harvard-details-text">{edu.details}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Research & Publications Section */}
        {publications && publications.length > 0 && (
          <section className="harvard-section">
            <h2 className="harvard-section-title">RESEARCH & PUBLICATIONS</h2>
            <div className="harvard-section-divider"></div>
            {publications.map((pub) => (
              <div key={pub.id} className="harvard-item harvard-publication-item">
                <p className="harvard-pub-citation">
                  <span className="harvard-pub-authors">{pub.authors}</span>. 
                  <span className="harvard-pub-title"> "{pub.title}."</span> 
                  <span className="harvard-pub-publisher"> {pub.publisher}</span>, 
                  <span className="harvard-pub-date"> {pub.date}</span>.
                  {pub.link && (
                    <span className="harvard-pub-link-label"> Link: <a href={pub.link} target="_blank" rel="noopener noreferrer" className="harvard-pub-link">{pub.link}</a></span>
                  )}
                </p>
                {pub.description && (
                  <p className="harvard-details-text harvard-pub-desc">{pub.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <section className="harvard-section">
            <h2 className="harvard-section-title">EXPERIENCE</h2>
            <div className="harvard-section-divider"></div>
            {experience.map((exp) => (
              <div key={exp.id} className="harvard-item">
                <div className="harvard-item-row">
                  <span className="harvard-item-bold">{exp.company}</span>
                  <span className="harvard-item-right">{exp.duration}</span>
                </div>
                <div className="harvard-item-row">
                  <span className="harvard-item-italic">{exp.role}</span>
                  <span className="harvard-item-right">{personalInfo.location.split(',')[0]}</span>
                </div>
                {exp.description && (
                  <p className="harvard-details-text">{exp.description}</p>
                )}
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="harvard-bullets">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="harvard-section">
            <h2 className="harvard-section-title">PROJECTS</h2>
            <div className="harvard-section-divider"></div>
            {projects.map((proj) => (
              <div key={proj.id} className="harvard-item">
                <div className="harvard-item-row">
                  <span className="harvard-item-bold">
                    {proj.title}
                    {proj.link && (
                      <span className="harvard-proj-links no-print">
                        {" "}(<a href={proj.link} target="_blank" rel="noopener noreferrer">Demo</a>
                        {proj.github && (
                          <> | <a href={proj.github} target="_blank" rel="noopener noreferrer">GitHub</a></>
                        )}
                        )
                      </span>
                    )}
                  </span>
                  <span className="harvard-item-right">{proj.role}</span>
                </div>
                <p className="harvard-details-text">{proj.description}</p>
                <p className="harvard-details-text harvard-tech-used">
                  <strong>Technologies:</strong> {proj.technologies.join(', ')}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Honors & Awards Section */}
        {awards && awards.length > 0 && (
          <section className="harvard-section">
            <h2 className="harvard-section-title">HONORS & AWARDS</h2>
            <div className="harvard-section-divider"></div>
            {awards.map((award) => (
              <div key={award.id} className="harvard-item">
                <div className="harvard-item-row">
                  <span className="harvard-item-bold">{award.title}</span>
                  <span className="harvard-item-right">{award.date}</span>
                </div>
                <div className="harvard-item-row">
                  <span className="harvard-item-italic">{award.issuer}</span>
                </div>
                {award.details && (
                  <p className="harvard-details-text">{award.details}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills & Languages Section */}
        <section className="harvard-section">
          <h2 className="harvard-section-title">SKILLS & LANGUAGES</h2>
          <div className="harvard-section-divider"></div>
          <div className="harvard-skills-grid">
            {skills.map((category) => (
              <div key={category.id} className="harvard-skills-line">
                <strong>{category.name}:</strong> {category.items.join(', ')}
              </div>
            ))}
            {languages && languages.length > 0 && (
              <div className="harvard-skills-line">
                <strong>Languages:</strong> {languages.map(l => `${l.name} (${l.level})`).join(', ')}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
