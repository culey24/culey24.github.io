import type { PublicationItem } from '../cvData';

interface PublicationsProps {
  publications: PublicationItem[];
}

export function Publications({ publications }: PublicationsProps) {
  return (
    <ol className="pub-list">
      {publications.map((pub, idx) => (
        <li key={pub.id} className="card pub-item">
          <p className="pub-cite">
            <span className="pub-num">[{idx + 1}]</span>
            <span className="pub-authors">{pub.authors}.</span>{' '}
            {pub.link ? (
              <a className="pub-title" href={pub.link} target="_blank" rel="noopener noreferrer">
                &quot;{pub.title}.&quot;
              </a>
            ) : (
              <span className="pub-title">&quot;{pub.title}.&quot;</span>
            )}{' '}
            <span className="pub-meta">
              {pub.publisher}, {pub.date}.
            </span>
          </p>
          {pub.description && <p className="pub-desc">{pub.description}</p>}
          {pub.link && (
            <div className="print-only">
              <span>Link: {pub.link.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}