import { getAllPosts, type BlogPostData } from '../../../src/lib/blog';
import { BlogCard } from '../../../src/components/BlogCard';

export default function BlogsPage() {
  const posts = getAllPosts();

  const seriesMap = new Map<string, BlogPostData[]>();
  const standalone: BlogPostData[] = [];
  for (const post of posts) {
    if (post.series) {
      const list = seriesMap.get(post.series) ?? [];
      list.push(post);
      seriesMap.set(post.series, list);
    } else {
      standalone.push(post);
    }
  }

  const latest = [...posts]
    .filter((post) => !post.link)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);

  return (
    <>
      <section className="section blog-head">
        <h1 className="section-title">Blog</h1>
      </section>

      <div className="blog-layout">
        <div className="blog-main">
          {posts.length === 0 ? (
            <div className="blog-empty">
              <p className="blog-empty-text">Posts coming soon.</p>
            </div>
          ) : (
            <>
              {Array.from(seriesMap.entries()).map(([series, list]) => (
                <section key={series} className="section blog-series">
                  <h2 className="blog-series-title">{series}</h2>
                  <div className="blog-grid">
                    {list.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                </section>
              ))}
              {standalone.length > 0 && (
                <section className="section blog-series">
                  {seriesMap.size > 0 && <h2 className="blog-series-title">Notes</h2>}
                  <div className="blog-grid">
                    {standalone.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>

        {latest.length > 0 && (
          <aside className="blog-side">
            <h3 className="blog-side-title">Latest</h3>
            <ul className="blog-side-list">
              {latest.map((post) => (
                <li key={post.slug}>
                  <a href={`/blogs/${post.slug}`}>{post.title}</a>
                  <span className="blog-side-date">{post.date}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </>
  );
}