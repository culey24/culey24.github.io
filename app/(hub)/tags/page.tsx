import { getAllPosts, type BlogPostData } from '../../../src/lib/blog';

export default function TagsPage() {
  const posts = getAllPosts();

  const tagMap = new Map<string, BlogPostData[]>();
  for (const post of posts) {
    for (const tag of post.tags) {
      const list = tagMap.get(tag) ?? [];
      list.push(post);
      tagMap.set(tag, list);
    }
  }
  const tags = Array.from(tagMap.entries()).sort((a, b) => b[1].length - a[1].length);

  return (
    <>
      <section className="section blog-head">
        <h1 className="section-title">Tags</h1>
        <p className="blog-lede">All topics tagged across posts.</p>
      </section>

      {tags.length === 0 ? (
        <div className="blog-empty">
          <p className="blog-empty-text">No tags yet.</p>
        </div>
      ) : (
        <>
          <div className="tags-cloud">
            {tags.map(([tag, items]) => (
              <a key={tag} href={`#${tag}`} className="tag tags-cloud-item">
                #{tag}
                <span className="tags-count">{items.length}</span>
              </a>
            ))}
          </div>

          {tags.map(([tag, items]) => (
            <section key={tag} id={tag} className="section tags-group">
              <h2 className="blog-series-title">#{tag}</h2>
              <ul className="tags-post-list">
                {items.map((post) => (
                  <li key={post.slug}>
                    <a href={`/blogs/${post.slug}`}>{post.title}</a>
                    <span className="tags-post-date">{post.date}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </>
      )}
    </>
  );
}