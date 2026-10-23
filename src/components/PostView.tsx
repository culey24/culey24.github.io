'use client';

import { Markdown } from './Markdown';
import type { BlogPost, BlogPostData } from '../lib/blog';

interface PostViewProps {
  post: BlogPostData;
  prev?: BlogPost;
  next?: BlogPost;
}

export function PostView({ post, prev, next }: PostViewProps) {
  return (
    <article className="post-article">
      <header className="post-header">
        <div className="blog-meta">
          <span>{post.date}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </div>
        {post.series && (
          <p className="post-series">Series: {post.series}</p>
        )}
        <h1 className="post-title">{post.title}</h1>
        {post.tags.length > 0 && (
          <div className="blog-tags">
            {post.tags.map((tag) => (
              <a key={tag} className="tag" href={`/tags/#${tag}`}>
                #{tag}
              </a>
            ))}
          </div>
        )}
      </header>

      {post.toc.length > 0 && (
        <nav className="post-toc" aria-label="Contents">
          <p className="post-toc-title">Contents</p>
          <ul>
            {post.toc.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: (item.depth - 2) * 14 }}
              >
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="post-body">
        <Markdown>{post.content}</Markdown>
      </div>

      {(prev || next) && (
        <nav className="post-nav" aria-label="Post navigation">
          {next && (
            <a href={`/blogs/${next.slug}/`} className="post-nav-link">
              <span>Newer</span>
              <strong>{next.title}</strong>
            </a>
          )}
          {prev && (
            <a href={`/blogs/${prev.slug}/`} className="post-nav-link post-nav-next">
              <span>Older</span>
              <strong>{prev.title}</strong>
            </a>
          )}
        </nav>
      )}

      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- static export */}
      <a className="post-back" href="/blogs/">
        ← Back to blog
      </a>
    </article>
  );
}