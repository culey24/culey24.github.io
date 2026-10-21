import { defaultCVData } from '../../../src/cvData';
import { Publications } from '../../../src/components/Publications';

function yearOf(date: string): string {
  const match = /(\d{4})/.exec(date);
  return match ? match[1] : date;
}

export default function PublicationsPage() {
  const publications = defaultCVData.publications ?? [];

  const byYear = new Map<string, typeof publications>();
  for (const pub of publications) {
    const year = yearOf(pub.date);
    const list = byYear.get(year) ?? [];
    list.push(pub);
    byYear.set(year, list);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => (a < b ? 1 : -1));

  return (
    <>
      <section className="section blog-head">
        <h1 className="section-title">Publications</h1>
      </section>

      {publications.length === 0 ? (
        <div className="blog-empty">
          <p className="blog-empty-text">No publications yet.</p>
        </div>
      ) : (
        years.map((year) => (
          <section key={year} className="section">
            <h2 className="blog-series-title">{year}</h2>
            <Publications publications={byYear.get(year) ?? []} />
          </section>
        ))
      )}
    </>
  );
}
