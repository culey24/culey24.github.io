'use client';

import Image from 'next/image';
import type { ComponentType } from 'react';
import { defaultCVData } from '../../src/cvData';
import { Experience } from '../../src/components/Experience';
import { Publications } from '../../src/components/Publications';
import { Projects } from '../../src/components/Projects';
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  MailIcon,
  PhoneIcon,
  ZaloIcon,
  GlobeIcon,
  MapPinIcon,
  type IconProps,
} from '../../src/components/icons';

interface SocialLink {
  label: string;
  href: string;
  Icon: ComponentType<IconProps>;
}

interface ContactRow {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  Icon: ComponentType<IconProps>;
}

export default function HomePage() {
  const { personalInfo, summary, education, languages, skills } = defaultCVData;
  const publications = defaultCVData.publications ?? [];

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
      personalInfo.facebook && {
        label: 'Facebook',
        href: personalInfo.facebook,
        Icon: FacebookIcon,
      },
      { label: 'Email', href: `mailto:${personalInfo.email}`, Icon: MailIcon },
    ] as Array<SocialLink | false>
  ).filter((s): s is SocialLink => Boolean(s));

  const allSkills = skills.flatMap((cat) => cat.items);

  const telHref = `tel:${personalInfo.phone.replace(/[^+\d]/g, '')}`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    personalInfo.location,
  )}`;

  const contactRows = (
    [
      { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, Icon: MailIcon },
      { label: 'Phone', value: personalInfo.phone, href: telHref, Icon: PhoneIcon },
      personalInfo.zalo && {
        label: 'Zalo',
        value: personalInfo.zalo.replace(/^https?:\/\//, ''),
        href: personalInfo.zalo,
        external: true,
        Icon: ZaloIcon,
      },
      {
        label: 'GitHub',
        value: personalInfo.github.replace(/^https?:\/\//, ''),
        href: personalInfo.github,
        external: true,
        Icon: GithubIcon,
      },
      {
        label: 'LinkedIn',
        value: 'Quách Gia Bảo',
        href: personalInfo.linkedin,
        external: true,
        Icon: LinkedinIcon,
      },
      personalInfo.facebook && {
        label: 'Facebook',
        value: personalInfo.facebook.replace(/^https?:\/\//, ''),
        href: personalInfo.facebook,
        external: true,
        Icon: FacebookIcon,
      },
      {
        label: 'Website',
        value: personalInfo.website.replace(/^https?:\/\//, ''),
        href: personalInfo.website,
        external: true,
        Icon: GlobeIcon,
      },
      {
        label: 'Location',
        value: personalInfo.location,
        href: mapsHref,
        external: true,
        Icon: MapPinIcon,
      },
    ] as Array<ContactRow | false>
  ).filter((r): r is ContactRow => Boolean(r));

  return (
    <>
      {/* Hero — split screen + framed portrait & terminal */}
      <section className="section hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-badge">{personalInfo.title}</span>
            <h1 className="hero-name">{personalInfo.name}</h1>
            <p className="hero-desc">{summary}</p>
            <div className="hero-actions">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- same-page anchor, static export */}
              <a className="btn btn-primary" href="/#projects">
                View Projects
              </a>
              <a className="btn btn-ghost" href="/cv">
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
        <div className="about-row">
          {personalInfo.photo && (
            <Image
              className="about-photo"
              src={personalInfo.photo}
              alt={personalInfo.name}
              width={144}
              height={144}
            />
          )}
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
        <div className="card-grid ed-grid">
          {education.map((edu) => (
            <article key={edu.id} className="card edu-card">
              <p className="card-date">{edu.duration}</p>
              <h3 className="edu-degree">{edu.degree}</h3>
              <p className="edu-school">{edu.school}</p>
              {edu.gpa && <p className="edu-gpa">GPA: {edu.gpa}</p>}
              {edu.details && !edu.gpa && <p className="edu-gpa">{edu.details}</p>}
            </article>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="section">
        <h2 className="section-title">Publications</h2>
        <Publications publications={publications} />
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <h2 className="section-title">Projects</h2>
        <Projects projects={defaultCVData.projects} />
      </section>

      {/* Achievements */}
      <section id="achievements" className="section">
        <h2 className="section-title">Achievements</h2>
        <div className="card-grid award-grid">
          {(defaultCVData.awards ?? []).map((award) => (
            <article key={award.id} className="card award-card">
              <p className="card-date">{award.date}</p>
              <h3 className="award-title">{award.title}</h3>
              {award.issuer && <p className="award-issuer">{award.issuer}</p>}
              {award.details && <p className="award-desc">{award.details}</p>}
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section">
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-block">
          <p className="contact-text">
            My inbox is always open. Whether you have a question or just want to say hi,
            I&apos;ll try my best to get back to you!
          </p>
          <a className="btn btn-primary" href={`mailto:${personalInfo.email}`}>
            Email me
          </a>
        </div>
        <div className="contact-grid">
          {contactRows.map((row) => {
            const inner = (
              <>
                <row.Icon size={20} />
                <span className="contact-row-label">{row.label}</span>
                <span className="contact-row-value">{row.value}</span>
              </>
            );
            return row.href ? (
              <a
                key={row.label}
                className="contact-row"
                href={row.href}
                {...(row.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {inner}
              </a>
            ) : (
              <div key={row.label} className="contact-row">
                {inner}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}