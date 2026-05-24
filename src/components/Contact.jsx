function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="section-heading">
        <span className="section-heading__eyebrow">Contact</span>
        <h2>Let’s Connect</h2>
      </div>

      <div className="contact__simple">
        <a href="mailto:llyneuftwitch@yandex.ru" className="contact__item">
          <span className="contact__label">Email</span>
          <span className="contact__value">llyneuftwitch@yandex.ru</span>
        </a>

        <a
          href="https://t.me/llyneuf"
          target="_blank"
          rel="noreferrer"
          className="contact__item"
        >
          <span className="contact__label">Telegram</span>
          <span className="contact__value">@llyneuf</span>
        </a>

        <a
          href="https://www.twitch.tv/llyneuf"
          target="_blank"
          rel="noreferrer"
          className="contact__item"
        >
          <span className="contact__label">Twitch</span>
          <span className="contact__value">llyneuf</span>
        </a>
      </div>
    </section>
  )
}

export default Contact