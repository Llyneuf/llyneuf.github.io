import { projects } from '../data/projects'
import { getUiText } from '../data/i18n'
import { getProjectPage } from '../data/projectView'
import MarkdownContent from './MarkdownContent'

function ProjectPage({ slug, language, basePath }) {
  const t = getUiText(language)
  const project = projects.find((item) => item.slug === slug)
  const projectIndex = projects.findIndex((item) => item.slug === slug)
  const previousProject = projectIndex > -1 ? projects[(projectIndex - 1 + projects.length) % projects.length] : null
  const nextProject = projectIndex > -1 ? projects[(projectIndex + 1) % projects.length] : null

  const projectNav = previousProject && nextProject ? (
    <nav className="project-page__pager" aria-label="Project navigation">
      <a href={`${basePath}/projects/${previousProject.slug}`} className="project-page__pager-link">
        <span>{t.previous}</span>
        <span className="project-page__pager-title">
          <strong aria-hidden="true">{'\u2190'}</strong>
          {getProjectPage(previousProject, language).title}
        </span>
      </a>
      <a href={`${basePath}/projects/${nextProject.slug}`} className="project-page__pager-link project-page__pager-link--next">
        <span>{t.next}</span>
        <span className="project-page__pager-title">
          {getProjectPage(nextProject, language).title}
          <strong aria-hidden="true">{'\u2192'}</strong>
        </span>
      </a>
    </nav>
  ) : null

  if (!project) {
    return (
      <main className="project-page section">
        <a href={`${basePath}/projects`} className="project-page__back">{t.backToProjects}</a>
        <p className="project-page__eyebrow">{t.projectNotFound}</p>
        <h1>{t.lostProject}</h1>
        <p className="project-page__lead">
          {t.lostProjectText}
        </p>
      </main>
    )
  }

  const projectLinks = project.links.filter((link) => link.href)
  const page = getProjectPage(project, language)
  const pageDescription = page.markdown ? [] : (project.pageDescription ?? [])
  const pageDetails = page.markdown ? [] : (project.pageDetails ?? project.details ?? [])
  const hasProjectNotes = Boolean(page.markdown) || pageDescription.length > 0 || pageDetails.length > 0

  return (
    <main className="project-page section">
      <a href={`${basePath}/projects`} className="project-page__back">{t.backToProjects}</a>
      {projectNav}

      <header className="project-page__hero">
        <div className="project-page__copy">
          {page.status && <p className="project-page__eyebrow">{page.status}</p>}
          <h1>{page.title}</h1>
          {page.summary && <p className="project-page__lead">{page.summary}</p>}
          {page.progress && <p className="project-page__progress">{page.progress}</p>}

          {page.tags.length > 0 && (
            <div className="tag-list">
              {page.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        {page.image ? (
          <img src={page.image} alt={page.imageAlt} className="project-page__image" />
        ) : !page.hasImageOverride ? (
          <div className="project-page__image project-page__image--placeholder" aria-hidden="true">
            <span>{page.title}</span>
          </div>
        ) : null}
      </header>

      {hasProjectNotes && (
        <section className="project-page__section">
          {page.markdown ? (
            <MarkdownContent source={page.markdown} />
          ) : pageDescription.length > 0 && (
            <div className="project-page__description">
              {pageDescription.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
          {pageDetails.length > 0 && (
            <ul className="project-page__notes">
              {pageDetails.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {projectLinks.length > 0 && (
        <section className="project-page__section">
          <p className="project-page__eyebrow">{t.links}</p>
          <div className="project-page__links">
            {projectLinks.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" className="button button--secondary" key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </section>
      )}

      {projectNav}
    </main>
  )
}

export default ProjectPage
