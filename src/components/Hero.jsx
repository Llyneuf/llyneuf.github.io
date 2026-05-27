import { useEffect, useState } from 'react'
import { getUiText } from '../data/i18n'

function Hero({ language, basePath }) {
  const t = getUiText(language)
  const [scrollLag, setScrollLag] = useState(0)
  const [titleImageFailed, setTitleImageFailed] = useState(false)

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
        {titleImageFailed ? (
          <h1 className="hero-title__fallback">Llyneuf</h1>
        ) : (
          <img
            src="/title.png"
            alt="Llyneuf"
            className="hero-title__image"
            style={{ '--hero-lag': `${scrollLag}px` }}
            onError={() => setTitleImageFailed(true)}
          />
        )}
      </section>

      <section id="about" className="hero-intro section">
        <div className="hero__text">
          <span className="hero__eyebrow">{t.heroRole}</span>

          <h1>Llyneuf</h1>

          <p className="hero__headline">{t.heroHeadline}</p>

          <div className="hero__description">
            <p>{t.heroIntro}</p>
            {t.heroStory.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="hero__actions">
            <div className="hero__buttons">
              <a href={`${basePath}/#projects`} className="button button--primary" data-umami-event="Hero View Projects">
                {t.viewProjects}
              </a>
              <a
                href="https://www.twitch.tv/llyneuf"
                target="_blank"
                rel="noreferrer"
                className="button button--secondary"
                data-umami-event="Hero Twitch"
              >
                {t.twitchChannel}
              </a>
              <a href={`${basePath}/#contact`} className="button button--ghost" data-umami-event="Hero Order Request">
                {t.contactMe}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
