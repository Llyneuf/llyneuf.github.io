import { posts } from '../data/posts'

function BlogPreview() {
  return (
    <section id="blog" className="blog section">
      <div className="section-heading section-heading--split">
        <div>
          <span className="section-heading__eyebrow">Blog</span>
          <h2>Devlog and notes</h2>
        </div>
        <p>
          A future place for short updates about projects, stream plans,
          experiments and things I learn while building.
        </p>
      </div>

      <div className="blog__list">
        {posts.map((post) => (
          <article className="blog__item" key={post.title}>
            <div className="blog__meta">
              <span>{post.type}</span>
              <span>{post.date}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BlogPreview
