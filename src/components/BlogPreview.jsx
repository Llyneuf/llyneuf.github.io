import { posts } from '../data/posts'

function BlogPreview() {
  const [featuredPost, ...sidePosts] = posts

  return (
    <section id="blog" className="blog section">
      <div className="section-heading section-heading--split">
        <div>
          <span className="section-heading__eyebrow">Devlog</span>
          <h2>Latest updates</h2>
        </div>
        <p>
          Short notes about site updates, stream plans, creative experiments
          and the small steps that move the Llyneuf project forward.
        </p>
      </div>

      <div className="blog__layout">
        <article className="blog__featured">
          <img src={featuredPost.image} alt="" className="blog__featured-image" />
          <div className="blog__featured-content">
            <div className="blog__meta">
              <span>{featuredPost.type}</span>
              <span>{featuredPost.date}</span>
            </div>
            <h3>{featuredPost.title}</h3>
            <p>{featuredPost.summary}</p>
          </div>
        </article>

        <div className="blog__list">
          {sidePosts.map((post) => (
            <article className="blog__item" key={post.title}>
              <img src={post.image} alt="" className="blog__thumb" />
              <div className="blog__item-content">
                <div className="blog__meta">
                  <span>{post.type}</span>
                  <span>{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogPreview
