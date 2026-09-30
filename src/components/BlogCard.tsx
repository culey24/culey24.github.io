import type { BlogPost } from '../lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const cover = post.cover || '/images/blog-default.svg';

  return (
    <article className="card blog-card">
      {/* eslint-disable-next-line @next/next/no-img-element -- covers are static/localized images */}
      <img src={cover} alt="" className="blog-cover" loading="lazy" />
      <div className="blog-meta">
        <span>{post.date}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readTime}</span>
      </div>
      <h2 className="blog-title">
        {post.link ? (
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            {post.title}
          </a>
        ) : (
          <a href={`/blogs/${post.slug}`}>{post.title}</a>
        )}
      </h2>
      <p className="blog-excerpt">{post.excerpt}</p>
      <div className="blog-tags">
        {post.tags.map((tag) => (
          <a key={tag} className="tag" href={`/tags#${tag}`}>
            #{tag}
          </a>
        ))}
      </div>
      {!post.link && (
        <a className="read-more" href={`/blogs/${post.slug}`}>
          Read more →
        </a>
      )}
    </article>
  );
}