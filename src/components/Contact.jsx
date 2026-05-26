import { getUiText } from '../data/i18n'
import { profile } from '../data/profile'
import { useState } from 'react'

function Contact({ language }) {
  const t = getUiText(language)
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 900)
  }

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
          <button
            type="button"
            className={`button button--secondary contact__copy-button${copied ? ' is-copied' : ''}`}
            data-umami-event="Contact Email"
            onClick={handleCopyEmail}
            aria-label={copied ? t.emailCopied : t.copyEmail}
          >
            {t.copyEmail}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Contact
