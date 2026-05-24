import { profile } from '../data/profile'

function Identity() {
  return (
    <section id="about" className="identity section">
      <div className="identity__panel">
        <div className="identity__intro">
          <span className="section-heading__eyebrow">About</span>
          <h2>Digital presence, streams and small worlds.</h2>
          <p>
            I use this place as a base for the things I make: game ideas,
            VTuber identity, web experiments, devlog notes and links that should
            feel like one coherent direction instead of scattered profiles.
          </p>
        </div>

        <div className="identity__facts">
          {profile.facts.map((fact) => (
            <div className="identity__row" key={fact.label}>
              <span className="identity__label">{fact.label}</span>
              <span className="identity__value">{fact.value}</span>
            </div>
          ))}
        </div>

        <div className="identity__story">
          {profile.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Identity
