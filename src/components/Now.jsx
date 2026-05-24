import { now } from '../data/now'

function Now() {
  return (
    <section id="now" className="now section">
      <div className="section-heading section-heading--split">
        <div>
          <span className="section-heading__eyebrow">Now</span>
          <h2>What is happening right now</h2>
        </div>
        <p>{now.intro}</p>
      </div>

      <div className="now__grid">
        {now.items.map((item) => (
          <article className="now__item" key={item.title}>
            <span>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <p className="now__updated">Updated {now.updated}</p>
    </section>
  )
}

export default Now
