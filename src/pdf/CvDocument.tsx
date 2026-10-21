'use no memo';

import { Document, Page, Text, View, Link, StyleSheet, Font } from '@react-pdf/renderer';
import type { CVContent } from '../cvData';

interface CvDocumentProps {
  data: CVContent;
}

Font.register({
  family: 'Inter',
  fonts: [
    { src: '/fonts/Inter-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Inter-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/Inter-Italic.ttf', fontWeight: 400, fontStyle: 'italic' },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingVertical: 30,
    paddingHorizontal: 38,
    fontSize: 8.6,
    fontFamily: 'Inter',
    color: '#111827',
    lineHeight: 1.35,
  },
  name: {
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: 0.6,
    textAlign: 'center',
    color: '#111827',
  },
  contactLine: {
    fontSize: 8.6,
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 3,
  },
  link: {
    color: '#1a56db',
    textDecoration: 'none',
  },
  section: {
    marginTop: 9,
  },
  sectionTitle: {
    fontSize: 9.6,
    fontWeight: 700,
    letterSpacing: 0.7,
    color: '#111827',
  },
  divider: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#111827',
    marginTop: 2,
    marginBottom: 4,
  },
  item: {
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: 700,
    color: '#111827',
  },
  italic: {
    fontStyle: 'italic',
    color: '#4b5563',
  },
  muted: {
    fontSize: 8.6,
    color: '#4b5563',
  },
  right: {
    fontSize: 8.6,
    color: '#4b5563',
    textAlign: 'right',
  },
  bulletRow: {
    flexDirection: 'row',
    marginTop: 1,
  },
  bulletDot: {
    width: 9,
    fontSize: 8.6,
    color: '#4b5563',
  },
  bulletText: {
    flexGrow: 1,
    flexBasis: 0,
    fontSize: 8.6,
    color: '#4b5563',
  },
});

export function CvDocument({ data }: CvDocumentProps) {
  const {
    personalInfo,
    summary,
    education,
    experience,
    projects,
    publications,
    awards,
    skills,
    languages,
  } = data;

  const city = personalInfo.location.split(',')[0];

  return (
    <Document title="Quach Gia Bao — CV" author={personalInfo.name}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{personalInfo.name.toUpperCase()}</Text>
        <Text style={styles.contactLine}>
          {personalInfo.location} · {personalInfo.email}
          {personalInfo.emailAlt ? ` · ${personalInfo.emailAlt}` : ''}
        </Text>
        <Text style={styles.contactLine}>
          <Link src={personalInfo.website} style={styles.link}>
            Website
          </Link>
          {'  ·  '}
          <Link src={personalInfo.github} style={styles.link}>
            GitHub
          </Link>
          {'  ·  '}
          <Link src={personalInfo.linkedin} style={styles.link}>
            LinkedIn
          </Link>
        </Text>

        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SUMMARY</Text>
            <View style={styles.divider} />
            <Text style={styles.muted}>{summary}</Text>
          </View>
        )}

        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <View style={styles.divider} />
            {education.map((edu) => (
              <View key={edu.id} style={styles.item}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{edu.school}</Text>
                  <Text style={styles.right}>{edu.duration}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.italic}>{edu.degree}</Text>
                  <Text style={styles.right}>{city}</Text>
                </View>
                {edu.gpa && <Text style={styles.muted}>GPA: {edu.gpa}</Text>}
                {edu.details && <Text style={styles.muted}>{edu.details}</Text>}
              </View>
            ))}
          </View>
        )}

        {publications && publications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>RESEARCH &amp; PUBLICATIONS</Text>
            <View style={styles.divider} />
            {publications.map((pub) => (
              <View key={pub.id} style={styles.item}>
                <Text style={styles.muted}>
                  {pub.authors}. &quot;{pub.title}.&quot; {pub.publisher}, {pub.date}.
                  {pub.link ? (
                    <>
                      {' '}
                      [<Link src={pub.link} style={styles.link}>
                        DOI
                      </Link>
                      ]
                    </>
                  ) : null}
                </Text>
                {pub.description && <Text style={styles.muted}>{pub.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EXPERIENCE</Text>
            <View style={styles.divider} />
            {experience.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{exp.company}</Text>
                  <Text style={styles.right}>{exp.duration}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.italic}>{exp.role}</Text>
                  <Text style={styles.right}>{city}</Text>
                </View>
                {exp.description && <Text style={styles.muted}>{exp.description}</Text>}
                {exp.bullets?.map((bullet, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROJECTS</Text>
            <View style={styles.divider} />
            {projects.map((proj) => (
              <View key={proj.id} style={styles.item}>
                <View style={styles.row}>
                  <Text style={styles.bold}>
                    {proj.title}
                    {proj.link || proj.github ? ' (' : ''}
                    {proj.link ? (
                      <Link src={proj.link} style={styles.link}>
                        Demo
                      </Link>
                    ) : null}
                    {proj.link && proj.github ? ' | ' : ''}
                    {proj.github ? (
                      <Link src={proj.github} style={styles.link}>
                        GitHub
                      </Link>
                    ) : null}
                    {proj.link || proj.github ? ')' : ''}
                  </Text>
                  <Text style={styles.right}>{proj.role}</Text>
                </View>
                <Text style={styles.muted}>{proj.summary}</Text>
                {proj.bullets?.map((bullet, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
                {proj.technologies?.length > 0 && (
                  <Text style={styles.muted}>
                    <Text style={styles.bold}>Technologies:</Text> {proj.technologies.join(', ')}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {awards && awards.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>HONORS &amp; AWARDS</Text>
            <View style={styles.divider} />
            {awards.map((award) => (
              <View key={award.id} style={styles.item}>
                <View style={styles.row}>
                  <Text style={styles.bold}>{award.title}</Text>
                  <Text style={styles.right}>{award.date}</Text>
                </View>
                {award.issuer && <Text style={styles.italic}>{award.issuer}</Text>}
                {award.details && <Text style={styles.muted}>{award.details}</Text>}
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILLS &amp; LANGUAGES</Text>
          <View style={styles.divider} />
          {skills.map((category) => (
            <Text key={category.id} style={styles.muted}>
              <Text style={styles.bold}>{category.name}:</Text> {category.items.join(', ')}
            </Text>
          ))}
          {languages?.length > 0 && (
            <Text style={styles.muted}>
              <Text style={styles.bold}>Languages:</Text>{' '}
              {languages.map((l) => `${l.name} (${l.level})`).join(', ')}
            </Text>
          )}
        </View>
      </Page>
    </Document>
  );
}
