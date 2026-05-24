function Hero() {
    return (
      <section className="hero section">
        <div className="hero__content">
          <div className="hero__text">
            <span className="hero__eyebrow">Digital Creator / VTuber / Developer</span>
  
            <h1>Llyneuf</h1>
  
            <p className="hero__description">
              Building soft-tech worlds through code, motion, 3D and virtual identity.
            </p>
  
            <div className="hero__buttons">
              <a href="#projects" className="button button--primary">View Projects</a>
              <a
                href="https://www.twitch.tv/llyneuf"
                target="_blank"
                rel="noreferrer"
                className="button button--secondary"
              >
                Watch Stream
              </a>
            </div>
          </div>
  
          <div className="hero__visual">
            <div className="hero__glow"></div>
            <div className="hero__character">
              <div className="hero__character-frame">
                <img
                  src="/character.png"
                  alt="Llyneuf character"
                  className="hero__image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default Hero