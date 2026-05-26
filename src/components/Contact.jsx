import { getUiText } from '../data/i18n'
import { profile } from '../data/profile'

function Contact({ language }) {
  const t = getUiText(language)

  return (
    <section id="contact" className="contact section">
      <div className="contact__panel">
        <div>
          <span className="section-heading__eyebrow">{t.contactEyebrow}</span>
          <h2>{t.contactTitle}</h2>
          <p>
            {t.contactText}
          </p>
        </div>

        <div className="contact__actions">
          <a
            href="https://t.me/llyneuf_vt"
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
            data-umami-event="Contact Telegram"
          >
            Telegram
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="button button--secondary"
            data-umami-event="Contact Email"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
