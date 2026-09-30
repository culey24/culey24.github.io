'use client';

import type { ComponentType } from 'react';
import { defaultCVData } from '../../src/cvData';
import { Header } from '../../src/components/Header';
import { GithubIcon, LinkedinIcon, FacebookIcon, GlobeIcon, FileIcon, type IconProps } from '../../src/components/icons';

interface SocialLink {
  label: string;
  href: string;
  Icon: ComponentType<IconProps>;
}

export default function HubLayout({ children }: { children: React.ReactNode }) {
  const { personalInfo } = defaultCVData;

  const socials = (
    [
      personalInfo.github && { label: 'GitHub', href: personalInfo.github, Icon: GithubIcon },
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
      personalInfo.website && {
        label: personalInfo.website.replace(/^https?:\/\//, ''),
        href: personalInfo.website,
        Icon: GlobeIcon,
      },
    ] as Array<SocialLink | false>
  ).filter((s): s is SocialLink => Boolean(s));

  return (
    <div className="page">
      <Header />
      {children}
      <footer className="footer">
        <ul className="social-row social-row-footer">
          {socials.map((s) => (
            <li key={s.href}>
              <a
                className="social-icon"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
              >
                <s.Icon size={18} />
              </a>
            </li>
          ))}
          <li>
            <a className="social-icon" href="/cv" aria-label="CV" title="CV">
              <FileIcon size={18} />
            </a>
          </li>
        </ul>
        <span>
          © {new Date().getFullYear()} {personalInfo.name}
        </span>
        <span className="footer-meta">Built with Next.js</span>
      </footer>
    </div>
  );
}