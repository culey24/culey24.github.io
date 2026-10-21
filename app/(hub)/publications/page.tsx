import { defaultCVData } from '../../../src/cvData';
import { Publications } from '../../../src/components/Publications';

export default function PublicationsPage() {
  const publications = defaultCVData.publications ?? [];

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
        <div className="section">
          <Publications publications={publications} />
        </div>
      )}
    </>
  );
}
