import { posts } from '../data/posts'

function Now() {
  const latestPost = posts[0]

  return (
    <section id="now" className="now section">
      <div className="section-heading section-heading--split">
        <div>
          <span className="section-heading__eyebrow">Latest</span>
          <h2>Latest devlog update</h2>
        </div>
        <p>
          The newest note from the devlog, shown here so the top of the site
          always points to the latest visible progress.
        </p>
      </div>

      <article className="now__item now__item--latest">
        <div className="now__meta">
          <span>{latestPost.type}</span>
          <span>{latestPost.date}</span>
        </div>
        <h3>{latestPost.title}</h3>
        <p>{latestPost.summary}</p>
        <a href="#blog" className="button button--ghost" data-umami-event="Latest Read Devlog">
          Read Devlog
        </a>
      </article>
    </section>
  )
}

export default Now
