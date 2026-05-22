import type { BlogPost } from '../cvData';

interface BlogProps {
  posts: BlogPost[];
}

export function Blog({ posts }: BlogProps) {
  return (
    <div className="blog-container">
      <div className="section-header-row">
        <h2 className="section-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="title-icon">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span>Blog & Articles</span>
        </h2>
      </div>

      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.id} className="blog-card">
            <div className="blog-meta">
              <span className="blog-date">{post.date}</span>
              <span className="blog-meta-dot">•</span>
              <span className="blog-read-time">{post.readTime}</span>
            </div>
            
            <h3 className="blog-title">{post.title}</h3>
            
            <p className="blog-excerpt">{post.excerpt}</p>
            
            <div className="blog-tags">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="blog-tag">#{tag}</span>
              ))}
            </div>

            {post.link && (
              <a href={post.link} target="_blank" rel="noopener noreferrer" className="blog-read-more">
                Read Article
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
