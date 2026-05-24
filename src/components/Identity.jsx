import { profile } from '../data/profile'

function Identity() {
  return (
    <section id="about" className="identity section">
      <div className="section-heading">
        <span className="section-heading__eyebrow">About</span>
        <h2>Person behind the projects</h2>
      </div>

      <div className="identity__grid">
        <div className="identity__card">
          {profile.facts.map((fact) => (
            <div className="identity__row" key={fact.label}>
              <span className="identity__label">{fact.label}</span>
              <span className="identity__value">{fact.value}</span>
            </div>
          ))}
        </div>

        <div className="identity__text">
          {profile.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Identity
