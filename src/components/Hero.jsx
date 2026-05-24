import { profile } from '../data/profile'

function Hero() {
  return (
    <section className="hero section">
      <div className="hero__content">
        <div className="hero__text">
          <span className="hero__eyebrow">{profile.shortRole}</span>

          <h1>{profile.name}</h1>

          <p className="hero__headline">{profile.headline}</p>

          <p className="hero__description">{profile.intro}</p>

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

          <div className="hero__quick">
            <span>Web interfaces</span>
            <span>VTuber identity</span>
            <span>Creative experiments</span>
          </div>
        </div>

        <div className="hero__visual" aria-label="Llyneuf visual identity">
          <img src="/title.png" alt="Llyneuf logo" className="hero__title-image" />
          <div className="hero__character-frame">
            <img
              src="/character.png"
              alt="Llyneuf character"
              className="hero__image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
