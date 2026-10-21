import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { defaultCVData } from '../../../../src/cvData';

interface PublicationParams {
  slug: string;
}

const myName = 'Bao G. Quach';

export function generateStaticParams(): PublicationParams[] {
  return (defaultCVData.publications ?? []).map((pub) => ({ slug: pub.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<PublicationParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pub = (defaultCVData.publications ?? []).find((p) => p.slug === slug);
  return {
    title: pub ? `${pub.title} — Bao Quach` : 'Publication — Bao Quach',
    description: pub?.description,
  };
}

export default async function PublicationDetailPage({
  params,
}: {
  params: Promise<PublicationParams>;
}) {
  const { slug } = await params;
  const pub = (defaultCVData.publications ?? []).find((p) => p.slug === slug);
  if (!pub) notFound();

  const authors = pub.authors.split(',').map((author) => author.trim());

  return (
    <>
      <section className="section blog-head">
        <p className="pub-meta">
          {pub.publisher}, {pub.date}.
        </p>
        <h1 className="section-title">{pub.title}</h1>
      </section>

      <div className="section">
        <p className="pub-authors">
          {authors.map((author, i) =>
            author.includes(myName) ? (
              <strong key={`${author}-${i}`} className="pub-author-me">
                {author}
                {i < authors.length - 1 ? ', ' : '.'}
              </strong>
            ) : (
              <span key={`${author}-${i}`}>
                {author}
                {i < authors.length - 1 ? ', ' : '.'}
              </span>
            ),
          )}
        </p>

        {pub.description && <p className="pub-desc">{pub.description}</p>}

        {pub.link && (
          <p>
            <a
              className="btn btn-outline"
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit publication
            </a>
          </p>
        )}

        <p className="back-link">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- static export; plain anchor avoids client-side RSC prefetch */}
          <a href="/publications">← Back to publications</a>
        </p>
      </div>
    </>
  );
}
