import type { ComponentType } from 'react';
import { defaultCVData } from '../cvData';
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  GlobeIcon,
  MapPinIcon,
  type IconProps,
} from './icons';

interface ContactRow {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  Icon: ComponentType<IconProps>;
}

export function Contact() {
  const { personalInfo } = defaultCVData;

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    personalInfo.location,
  )}`;

  const emailRows: ContactRow[] = [personalInfo.email, personalInfo.emailAlt]
    .filter((value): value is string => Boolean(value))
    .map((address, index) => ({
      label: index === 0 ? 'Email' : 'Email (HCMUT)',
      value: address,
      href: `mailto:${address}`,
      Icon: MailIcon,
    }));

  const contactRows = (
    [
      ...emailRows,
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
    </>
  );
}
