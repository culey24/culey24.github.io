import type { ExperienceItem } from '../cvData';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export function Experience({ experience }: ExperienceProps) {
  return (
    <div className="fexp-list">
      {experience.map((item) => (
        <article key={item.id} className="exp-item">
          {item.logo && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element -- light-theme logo */}
              <img
                src={item.logo}
                className="exp-logo exp-logo-light"
                alt={`${item.company} logo`}
                loading="lazy"
              />
              {item.logoDark && (
                // eslint-disable-next-line @next/next/no-img-element -- dark-theme logo
                <img
                  src={item.logoDark}
                  className="exp-logo exp-logo-dark"
                  alt=""
                  loading="lazy"
                />
              )}
            </>
          )}
          <div className="exp-main">
            <div className="exp-head">
              <h3 className="exp-role">{item.role}</h3>
              <span className="exp-duration">{item.duration}</span>
            </div>
            <p className="exp-company">{item.company}</p>
            {item.description && <p className="exp-desc">{item.description}</p>}
            {item.bullets && item.bullets.length > 0 && (
              <ul className="bullet-list">
                {item.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}