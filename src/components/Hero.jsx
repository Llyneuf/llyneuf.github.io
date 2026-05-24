import { profile } from '../data/profile'

function Hero() {
  return (
    <>
      <section className="hero-title section" aria-label="Llyneuf">
        <img src="/title.png" alt="Llyneuf" className="hero-title__image" />
      </section>

      <section className="hero-intro section">
        <div className="hero__text">
          <span className="hero__eyebrow">{profile.shortRole}</span>

          <h1>{profile.name}</h1>

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
      </section>
    </>
  )
}

export default Hero
