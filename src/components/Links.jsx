import { profile } from '../data/profile'

const iconPaths = {
  Twitch:
    'M5 4h14v10l-4 4h-3l-3 3v-3H5V4Zm3 3v8h3v-2h2.5L16 10.5V7H8Zm2 1.5h1.5V12H10V8.5Zm4 0h1.5V12H14V8.5Z',
  Telegram:
    'M20 5 3.8 11.6c-.8.3-.8 1.4.1 1.7l4.1 1.3 1.7 5c.3.8 1.4.9 1.8.2l2.3-3.5 4.2 3.1c.7.5 1.6.1 1.8-.8L22 6.2c.2-.9-.9-1.6-2-.9ZM9 13.8l8.6-5.3-6.7 7.1-.3 2.1L9 13.8Z',
  GitHub:
    'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5 0-1.1.4-2 1.1-2.8-.1-.3-.5-1.3.1-2.8 0 0 .9-.3 2.9 1.1a9.8 9.8 0 0 1 5.2 0c2-1.4 2.9-1.1 2.9-1.1.6 1.5.2 2.5.1 2.8.7.8 1.1 1.7 1.1 2.8 0 3.9-2.4 4.7-4.7 5 .4.3.8 1 .8 2v2.6c0 .3.2.6.8.5A10 10 0 0 0 12 2Z',
  YouTube:
    'M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.8 4 12 4 12 4s-3.8 0-6.7.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2 9 2 10.9v1.7c0 1.9.4 3.7.4 3.7s.2 1.5.8 2.1c.8.8 1.9.8 2.4.9 1.8.2 6.4.2 6.4.2s3.8 0 6.7-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.4-1.8.4-3.7v-1.7c0-1.9-.4-3.7-.4-3.7ZM10 14.8V8.7l5.2 3.1L10 14.8Z',
}

function Links() {
  return (
    <section id="links" className="links section">
      <div className="section-heading">
        <span className="section-heading__eyebrow">Links</span>
        <h2>My Links</h2>
      </div>

      <div className="links__grid">
        {profile.socials.map((link) => (
          <a
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            className={link.featured ? 'links__item links__item--featured' : 'links__item'}
            style={{ '--link-accent': link.accent }}
            data-umami-event={`Links ${link.label}`}
            key={link.label}
          >
            <span className="links__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path d={iconPaths[link.label]} />
              </svg>
            </span>
            <span>
              <span className="links__label">{link.label}</span>
              <span className="links__value">{link.value}</span>
              <span className="links__description">{link.description}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Links
