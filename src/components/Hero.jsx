import { profile } from '../data/profile'

function Hero() {
  return (
    <section className="hero section">
      <div className="hero__brand">
        <img src="/title.png" alt="Llyneuf" className="hero__brand-image" />
      </div>

      <div className="hero__content">
        <div className="hero__text">
          <span className="hero__eyebrow">{profile.shortRole}</span>

          <h1 className="sr-only">{profile.name}</h1>

          <p className="hero__headline">{profile.headline}</p>

          <p className="hero__description">{profile.intro}</p>

          <div className="hero__actions">
            <div className="hero__buttons">
              <a href="#projects" className="button button--primary">View Projects</a>
              <a
                href="https://www.twitch.tv/llyneuf"
                target="_blank"
                rel="noreferrer"
                className="button button--secondary"
              >
                Twitch Channel
              </a>
              <a href="#services" className="button button--ghost">Order / Request</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
