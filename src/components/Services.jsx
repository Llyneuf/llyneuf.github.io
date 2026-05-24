import { profile } from '../data/profile'
import { services } from '../data/services'

const briefBody = encodeURIComponent(
  'Hi, Llyneuf.\n\nI want to request a project.\n\nProject type:\nGoal:\nDeadline:\nBudget:\nLinks or references:\n\nMessage:\n'
)

function Services() {
  return (
    <section id="services" className="services section">
      <div className="section-heading section-heading--split">
        <div>
          <span className="section-heading__eyebrow">Orders</span>
          <h2>Requests and collaboration</h2>
        </div>
        <p>
          A simple place for people to understand what they can ask for before
          sending a message.
        </p>
      </div>

      <div className="services__layout">
        <div className="services__grid">
          {services.map((service) => (
            <article className="services__card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>

        <aside className="services__brief">
          <span className="services__brief-label">Quick brief</span>
          <h3>Need something like this?</h3>
          <p>
            Send a short request with the idea, deadline, budget range and any
            references. Telegram is fastest, email is better for a longer brief.
          </p>
          <div className="services__brief-actions">
            <a href="https://t.me/llyneuf" target="_blank" rel="noreferrer" className="button button--primary">
              Message on Telegram
            </a>
            <a
              href={`mailto:${profile.email}?subject=Project%20request&body=${briefBody}`}
              className="button button--secondary"
            >
              Email a Brief
            </a>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Services
