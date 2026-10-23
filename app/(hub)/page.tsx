import Image from 'next/image';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import { defaultCVData } from '../../src/cvData';
import { getAllPosts } from '../../src/lib/blog';
import { BlogCard } from '../../src/components/BlogCard';
import { Experience } from '../../src/components/Experience';
import { Publications } from '../../src/components/Publications';
import { Projects } from '../../src/components/Projects';
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  type IconProps,
} from '../../src/components/icons';

const PREVIEW_LIMIT = 3;

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

interface SocialLink {
  label: string;
  href: string;
  Icon: ComponentType<IconProps>;
}

export default function HomePage() {
  const { personalInfo, summary, education, languages, skills } = defaultCVData;
  const publications = defaultCVData.publications ?? [];
  const projects = defaultCVData.projects;
  const pubPreview = publications.slice(0, PREVIEW_LIMIT);
  const projPreview = projects.slice(0, PREVIEW_LIMIT);
  const featuredPosts = [...getAllPosts()]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  const socials = (
    [
      personalInfo.github && {
        label: 'GitHub',
        href: personalInfo.github,
        Icon: GithubIcon,
      },
      personalInfo.linkedin && {
        label: 'LinkedIn',
        href: personalInfo.linkedin,
        Icon: LinkedinIcon,
      },
      { label: 'Email', href: `mailto:${personalInfo.email}`, Icon: MailIcon },
    ] as Array<SocialLink | false>
  ).filter((s): s is SocialLink => Boolean(s));

  const allSkills = skills.flatMap((cat) => cat.items);

  return (
    <>
      {/* Hero — split screen + framed portrait & terminal */}
      <section className="section hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-intro">Hello, I&apos;m</p>
            <h1 className="hero-name">{personalInfo.name}</h1>
            <p className="hero-desc">{summary}</p>
            <div className="hero-actions">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- same-page anchor, static export */}
              <a className="btn btn-primary" href="/#projects">
                View Projects
              </a>
              <a className="btn btn-ghost" href="/cv/">
                Curriculum Vitae
              </a>
            </div>
            <ul className="social-row">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    className="social-icon"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <s.Icon size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-visual">
            <div className="hero-portrait">
              {personalInfo.photo && (
                <Image
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  fill
                  sizes="(max-width: 900px) 82vw, 420px"
                  className="hero-portrait-img"
                  priority
                />
              )}
            </div>
            <div className="hero-terminal" aria-hidden="true">
              <div className="terminal-header">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span className="terminal-title">quachgiabao — zsh</span>
              </div>
              <div className="terminal-body">
                <p>
                  <span className="t-prompt">quachgiabao:~$</span> whoami
                </p>
                <p className="t-out">&gt; I dont know</p>
                <p>
                  <span className="t-prompt">quachgiabao:~$</span> status
                </p>
                <p className="t-out">&gt; Who is json</p>
                <p>
                  <span className="t-prompt">quachgiabao:~$</span>
                  <span className="t-caret" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <h2 className="section-title">About Me</h2>
        <div className="about-body">
          <p>{summary}</p>
          <p className="about-skills-intro">
            Here are a few technologies I&apos;ve been working with recently:
          </p>
          <div className="tag-row">
            {allSkills.map((skill) => (
              <span key={skill} className="tag">
                {skill}
              </span>
            ))}
          </div>
          <h3 className="about-subhead">Languages</h3>
          <ul className="lang-list-horiz">
            {languages.map((lang) => (
              <li key={lang.id}>
                <strong>{lang.name}</strong>
                <span aria-hidden="true"> — </span>
                <span>{lang.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section">
        <h2 className="section-title">Experience</h2>
        <Experience experience={defaultCVData.experience} />
      </section>

      {/* Education */}
      <section id="education" className="section">
        <h2 className="section-title">Education</h2>
        <ol className="timeline">
          {education.map((edu) => (
            <li key={edu.id} className="timeline-item">
              <div className="timeline-content">
                {edu.logo && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element -- light-theme logo */}
                    <img
                      src={edu.logo}
                      className="exp-logo exp-logo-light"
                      alt={`${edu.school} logo`}
                      loading="lazy"
                    />
                    {edu.logoDark && (
                      // eslint-disable-next-line @next/next/no-img-element -- dark-theme logo
                      <img
                        src={edu.logoDark}
                        className="exp-logo exp-logo-dark"
                        alt=""
                        loading="lazy"
                      />
                    )}
                  </>
                )}
                <div className="edu-main">
                  <div className="exp-head">
                    <h3 className="edu-degree">{edu.degree}</h3>
                    <span className="exp-duration">{edu.duration}</span>
                  </div>
                  <p className="edu-school">{edu.school}</p>
                  {edu.gpa && <p className="edu-gpa">GPA: {edu.gpa}</p>}
                  {edu.details && <p className="edu-gpa">{edu.details}</p>}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Publications */}
      <section id="publications" className="section">
        <div className="section-head">
          <h2 className="section-title">Publications</h2>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- static export; plain anchor avoids client-side RSC prefetch */}
          <a className="section-more" href="/publications/">
            See more <span aria-hidden="true">→</span>
          </a>
        </div>
        <Publications publications={pubPreview} />
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div className="section-head">
          <h2 className="section-title">Featured Projects</h2>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- static export; plain anchor avoids client-side RSC prefetch */}
          <a className="section-more" href="/projects/">
            See more <span aria-hidden="true">→</span>
          </a>
        </div>
        <Projects projects={projPreview} />
      </section>

      {/* Achievements */}
      <section id="achievements" className="section">
        <h2 className="section-title">Achievements</h2>
        <ul className="award-list">
          {(defaultCVData.awards ?? []).map((award) => (
            <li key={award.id} className="award-item">
              <div className="award-head">
                <h3 className="award-title">{award.title}</h3>
                <span className="award-date">{award.date}</span>
              </div>
              {award.issuer && <p className="award-issuer">{award.issuer}</p>}
              {award.details && <p className="award-desc">{award.details}</p>}
              {(award.certificate || award.proof) && (
                <div className="action-row">
                  {award.certificate && (
                    <a
                      className="btn btn-outline"
                      href={award.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Certificate
                    </a>
                  )}
                  {award.proof && (
                    <a
                      className="detail-link"
                      href={award.proof}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Paper <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Featured Blogs */}
      {featuredPosts.length > 0 && (
        <section id="blogs" className="section">
          <div className="section-head">
            <h2 className="section-title">Featured Blogs</h2>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- static export; plain anchor avoids client-side RSC prefetch */}
            <a className="section-more" href="/blogs/">
              View detail <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="blog-grid">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="section">
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-block">
          <p className="contact-text">
            My inbox is always open. Whether you have a question or just want to say hi,
            I&apos;ll try my best to get back to you!
          </p>
          <div className="contact-actions">
            <a className="btn btn-primary" href={`mailto:${personalInfo.email}`}>
              Email me
            </a>
            <a className="btn btn-ghost" href="/contact/">
              Contact page <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}