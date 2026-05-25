import { posts } from '../data/posts'

function BlogPreview() {
  const [featuredPost, ...sidePosts] = posts

  return (
    <section id="blog" className="blog section">
      <div className="section-heading">
        <div>
          <span className="section-heading__eyebrow">Devlog</span>
          <h2>Latest news</h2>
        </div>
      </div>

      <div className="blog__layout">
        <a
          href={`#devlog-${featuredPost.slug}`}
          id={`devlog-${featuredPost.slug}`}
          className="blog__featured"
          data-umami-event={`Devlog ${featuredPost.title}`}
        >
          <img src={featuredPost.image} alt="" className="blog__featured-image" />
          <div className="blog__featured-content">
            <div className="blog__meta">
              <span>{featuredPost.type}</span>
              <span>{featuredPost.date}</span>
            </div>
            <h3>{featuredPost.title}</h3>
            <p>{featuredPost.summary}</p>
            <span className="blog__read-more">Read update</span>
          </div>
        </a>

        <div className="blog__list">
          {sidePosts.map((post) => (
            <a
              href={`#devlog-${post.slug}`}
              id={`devlog-${post.slug}`}
              className="blog__item"
              data-umami-event={`Devlog ${post.title}`}
              key={post.title}
            >
              <img src={post.image} alt="" className="blog__thumb" />
              <div className="blog__item-content">
                <div className="blog__meta">
                  <span>{post.type}</span>
                  <span>{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <span className="blog__read-more">Read update</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogPreview
