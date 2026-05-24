import { skills } from '../data/services'

function Focus() {
  return (
    <section id="skills" className="focus section">
      <div className="section-heading section-heading--split">
        <div>
          <span className="section-heading__eyebrow">Skills</span>
          <h2>What people can come to me for</h2>
        </div>
        <p>
        </p>
      </div>

      <div className="focus__grid">
        {skills.map((item) => (
          <article className="focus__card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Focus
