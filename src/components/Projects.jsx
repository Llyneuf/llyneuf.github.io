import { projects } from '../data/projects'
import { getUiText } from '../data/i18n'
import { getProjectCard } from '../data/projectView'

function Projects({ hub = false, language, basePath }) {
  const t = getUiText(language)

  return (
    <section id="projects" className={hub ? 'projects projects--hub section' : 'projects section'}>
      <div className="section-heading">
        <div>
          {hub ? <a href={`${basePath}/`} className="projects__home-link">{t.backToHomepage}</a> : null}
          {!hub ? <span className="section-heading__eyebrow">{t.projectsEyebrow}</span> : null}
          <h2>{hub ? t.allProjects : t.myProjects}</h2>
          {hub ? (
            <p>
              {t.projectsHubDescription}
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
          const card = getProjectCard(project, language)
          const projectLinks = project.links.filter((link) => link.href)
          const projectHref = `${basePath}/projects/${project.slug}`

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
              key={project.slug}
            >
              {card.image ? (
                <img src={card.image} alt={card.imageAlt} className="projects__image" />
              ) : (
                <div className="projects__image projects__image--placeholder" aria-hidden="true">
                  <span>{card.title}</span>
                </div>
              )}
              <div className="projects__topline">
                <span className="projects__index">{String(index + 1).padStart(2, '0')}</span>
                {card.status && <span className="projects__status">{card.status}</span>}
              </div>
              <h3>{card.title}</h3>
              {card.summary && <p>{card.summary}</p>}
              {card.progress && <p className="projects__progress">{card.progress}</p>}
              {card.details.length > 0 && (
                <ul className="projects__details">
                  {card.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
              {card.tags.length > 0 && (
                <div className="tag-list">
                  {card.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
              {projectLinks.length > 0 && (
                <div className="projects__links">
                  {projectLinks.map((link) => (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      data-umami-event={`Project ${card.title} ${link.label}`}
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
                data-umami-event={`Project ${card.title} Open Page`}
                onClick={(event) => event.stopPropagation()}
              >
                {t.openProject}
              </a>
            </article>
          )
        })}
      </div>

      {!hub ? (
        <div className="projects__all">
          <a href={`${basePath}/projects`} className="button button--secondary" data-umami-event="Projects All Projects">
            {t.allProjects}
          </a>
        </div>
      ) : null}
    </section>
  )
}

export default Projects
