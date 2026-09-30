import type { PublicationItem } from '../cvData';

interface PublicationsProps {
  publications: PublicationItem[];
}

const myName = 'Bao G. Quach';

export function Publications({ publications }: PublicationsProps) {
  return (
    <ol className="pub-list formal-pub-list">
      {publications.map((pub, idx) => {
        const authors = pub.authors.split(',').map((author) => author.trim());
        return (
          <li key={pub.id} className="card pub-item">
            <p className="pub-title-row">
              <span className="pub-num">[{idx + 1}]</span>
              {pub.link ? (
                <a
                  className="pub-title"
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {pub.title}
                </a>
              ) : (
                <span className="pub-title">{pub.title}</span>
              )}
            </p>

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

            <p className="pub-meta">
              {pub.publisher}, {pub.date}.
            </p>

            {pub.description && <p className="pub-desc">{pub.description}</p>}

            {pub.link && (
              <a
                className="btn btn-outline pub-visit"
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit publication
                <span aria-hidden="true">→</span>
              </a>
            )}

            {pub.link && (
              <div className="print-only">
                <span>Link: {pub.link.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}