import { profile } from '../data/profile'

function Links() {
  return (
    <section id="links" className="links section">
      <div className="section-heading">
        <span className="section-heading__eyebrow">Links</span>
        <h2>Where to find me</h2>
      </div>

      <div className="links__grid">
        {profile.socials.map((link) => (
          <a
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            className={link.featured ? 'links__item links__item--featured' : 'links__item'}
            key={link.label}
          >
            <span className="links__label">{link.label}</span>
            <span className="links__value">{link.value}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Links
