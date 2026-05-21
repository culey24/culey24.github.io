import { useState, useEffect } from 'react';
import type { CVContent } from './cvData';
import { defaultCVData } from './cvData';
import { Header } from './components/Header';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Publications } from './components/Publications';
import { Skills } from './components/Skills';

function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      return localTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const currentContent: CVContent = defaultCVData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="cv-container">
        <Header
          info={currentContent.personalInfo}
          isDark={isDark}
          setIsDark={setIsDark}
          onPrint={handlePrint}
        />

        <main className="cv-body">
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
              <p className="summary-text">{currentContent.summary}</p>
            </section>

            {/* Education Section */}
            {currentContent.education && currentContent.education.length > 0 && (
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
                  {currentContent.education.map((edu) => (
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
            {currentContent.awards && currentContent.awards.length > 0 && (
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
                  {currentContent.awards.map((award) => (
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
            {currentContent.languages && currentContent.languages.length > 0 && (
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
                  {currentContent.languages.map((lItem) => (
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
            {currentContent.experience && currentContent.experience.length > 0 && (
              <Experience experience={currentContent.experience} />
            )}

            {/* Projects Section */}
            {currentContent.projects && currentContent.projects.length > 0 && (
              <Projects projects={currentContent.projects} />
            )}

            {/* Publications Section */}
            {currentContent.publications && currentContent.publications.length > 0 && (
              <Publications publications={currentContent.publications} />
            )}

            {/* Skills Section */}
            {currentContent.skills && currentContent.skills.length > 0 && (
              <Skills skills={currentContent.skills} />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
