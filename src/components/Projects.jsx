import { projects } from '../data/projects'

function Projects({ hub = false }) {
  return (
    <section id="projects" className={hub ? 'projects projects--hub section' : 'projects section'}>
      <div className="section-heading">
        <div>
          {hub ? <a href="/" className="projects__home-link">Back to homepage</a> : null}
          {!hub ? <span className="section-heading__eyebrow">Projects</span> : null}
          <h2>{hub ? 'All Projects' : 'My Projects'}</h2>
          {hub ? (
            <p>
              A full overview of active work, concepts and stored project directions.
            </p>
          ) : null}
        </div>
      </div>

      {hub ? (
        <div className="projects__hub-chibi-row" aria-hidden="true">
          <img src="/projects_chibi.png" alt="" className="projects__hub-chibi" />
        </div>
      ) : null}

      <div className="projects__grid">
        {projects.map((project, index) => {
          const projectLinks = project.links.filter((link) => link.href)
          const projectHref = `/#/projects/${project.slug}`
          const cardDetails = project.cardDetails ?? project.details ?? []

          const handleOpenProject = () => {
            window.location.href = projectHref
          }

          const handleProjectKeyDown = (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              handleOpenProject()
            }
          }

          return (
            <article
              className="projects__card"
              id={`project-${project.slug}`}
              role="link"
              tabIndex={0}
              onClick={handleOpenProject}
              onKeyDown={handleProjectKeyDown}
              key={project.title}
            >
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
              {cardDetails.length > 0 && (
                <ul className="projects__details">
                  {cardDetails.map((detail) => (
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
                      onClick={(event) => event.stopPropagation()}
                      key={link.href}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
              <a
                href={projectHref}
                className="projects__open"
                data-umami-event={`Project ${project.title} Open Page`}
                onClick={(event) => event.stopPropagation()}
              >
                Open project
              </a>
            </article>
          )
        })}
      </div>

      {!hub ? (
        <div className="projects__all">
          <a href="/#/projects" className="button button--secondary" data-umami-event="Projects All Projects">
            All projects
          </a>
        </div>
      ) : null}
    </section>
  )
}

export default Projects
