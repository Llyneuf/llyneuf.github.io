import { useEffect, useState } from 'react'

function IntroTitle() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="intro-title">
      <div
        className="intro-title__inner"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <div className="intro-title__stage">
          <div className="intro-title__glow" aria-hidden />
          <div className="intro-title__glow intro-title__glow--soft" aria-hidden />
          <img
            src="/title.png"
            alt="Llyneuf character"
            className="intro-title__character"
          />
        </div>
      </div>
    </section>
  )
}

export default IntroTitle