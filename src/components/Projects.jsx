import { projects } from '../data/projects'

function Projects() {
  return (
    <section id="projects" className="projects section">
      <div className="section-heading">
        <div>
          <span className="section-heading__eyebrow">Projects</span>
          <h2>My Projects</h2>
        </div>
      </div>

      <div className="projects__grid">
        {projects.map((project, index) => {
          const projectLinks = project.links.filter((link) => link.href)

          return (
            <article className="projects__card" id={`project-${project.slug}`} key={project.title}>
              {project.image ? (
                <img src={project.image} alt={project.imageAlt} className="projects__image" />
              ) : (
                <div className="projects__image projects__image--placeholder" aria-hidden="true">
                  <span>{project.title}</span>
                </div>
              )}
              <div className="projects__topline">
                <span className="projects__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="projects__status">{project.status}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <p className="projects__progress">{project.progress}</p>
              {project.details?.length > 0 && (
                <ul className="projects__details">
                  {project.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {projectLinks.length > 0 && (
                <div className="projects__links">
                  {projectLinks.map((link) => (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      data-umami-event={`Project ${project.title} ${link.label}`}
                      key={link.href}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Projects
