import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

function Hero() {
  const [scrollLag, setScrollLag] = useState(0)

  useEffect(() => {
    let frameId = 0

    const updateScrollLag = () => {
      frameId = 0
      setScrollLag(Math.min(window.scrollY * 0.12, 80))
    }

    const handleScroll = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateScrollLag)
      }
    }

    updateScrollLag()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return (
    <>
      <section className="hero-title section" aria-label="Llyneuf">
        <img
          src="/title.png"
          alt="Llyneuf"
          className="hero-title__image"
          style={{ '--hero-lag': `${scrollLag}px` }}
        />
      </section>

      <section id="about" className="hero-intro section">
        <div className="hero__text">
          <span className="hero__eyebrow">{profile.shortRole}</span>

          <h1>{profile.name}</h1>

          <p className="hero__headline">{profile.headline}</p>

          <div className="hero__description">
            <p>{profile.intro}</p>
            {profile.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="hero__actions">
            <div className="hero__buttons">
              <a href="#projects" className="button button--primary" data-umami-event="Hero View Projects">
                View Projects
              </a>
              <a
                href="https://www.twitch.tv/llyneuf"
                target="_blank"
                rel="noreferrer"
                className="button button--secondary"
                data-umami-event="Hero Twitch"
              >
                Twitch Channel
              </a>
              <a href="#contact" className="button button--ghost" data-umami-event="Hero Order Request">
                Contact me
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
