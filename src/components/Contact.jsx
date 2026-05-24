import { profile } from '../data/profile'

function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="contact__panel">
        <div>
          <span className="section-heading__eyebrow">Contact</span>
          <h2>Have an idea, question or project?</h2>
          <p>
            The easiest way to reach me is Telegram. For project requests,
            include the goal, deadline, budget range and links to references.
          </p>
        </div>

        <div className="contact__actions">
          <a href="https://t.me/llyneuf" target="_blank" rel="noreferrer" className="button button--primary">
            Telegram
          </a>
          <a href={`mailto:${profile.email}`} className="button button--secondary">
            Email
          </a>
          <a href="https://www.twitch.tv/llyneuf" target="_blank" rel="noreferrer" className="button button--ghost">
            Twitch
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
