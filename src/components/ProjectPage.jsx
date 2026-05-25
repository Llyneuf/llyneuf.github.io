import { projects } from '../data/projects'
import { projectContent } from '../data/projectContent'
import MarkdownContent from './MarkdownContent'

function ProjectPage({ slug }) {
  const project = projects.find((item) => item.slug === slug)
  const projectIndex = projects.findIndex((item) => item.slug === slug)
  const previousProject = projectIndex > -1 ? projects[(projectIndex - 1 + projects.length) % projects.length] : null
  const nextProject = projectIndex > -1 ? projects[(projectIndex + 1) % projects.length] : null

  const projectNav = previousProject && nextProject ? (
    <nav className="project-page__pager" aria-label="Project navigation">
      <a href={`/#/projects/${previousProject.slug}`} className="project-page__pager-link">
        <span>Previous</span>
        <span className="project-page__pager-title">
          <strong aria-hidden="true">{'\u2190'}</strong>
          {previousProject.title}
        </span>
      </a>
      <a href={`/#/projects/${nextProject.slug}`} className="project-page__pager-link project-page__pager-link--next">
        <span>Next</span>
        <span className="project-page__pager-title">
          {nextProject.title}
          <strong aria-hidden="true">{'\u2192'}</strong>
        </span>
      </a>
    </nav>
  ) : null

  if (!project) {
    return (
      <main className="project-page section">
        <a href="/#/projects" className="project-page__back">Back to projects</a>
        <p className="project-page__eyebrow">Project not found</p>
        <h1>Lost project</h1>
        <p className="project-page__lead">
          This project page does not exist yet. The projects overview is still the best place to continue.
        </p>
      </main>
    )
  }

  const projectLinks = project.links.filter((link) => link.href)
  const pageLead = project.pageSummary ?? project.summary
  const pageProgress = project.pageProgress ?? project.progress
  const markdown = projectContent[project.content ?? project.slug]
  const pageDescription = markdown ? [] : (project.pageDescription ?? [])
  const pageDetails = markdown ? [] : (project.pageDetails ?? project.details ?? [])
  const hasProjectNotes = Boolean(markdown) || pageDescription.length > 0 || pageDetails.length > 0

  return (
    <main className="project-page section">
      <a href="/#/projects" className="project-page__back">Back to projects</a>
      {projectNav}

      <header className="project-page__hero">
        <div className="project-page__copy">
          <p className="project-page__eyebrow">{project.status}</p>
          <h1>{project.title}</h1>
          <p className="project-page__lead">{pageLead}</p>
          <p className="project-page__progress">{pageProgress}</p>

          <div className="tag-list">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        {project.image ? (
          <img src={project.image} alt={project.imageAlt} className="project-page__image" />
        ) : (
          <div className="project-page__image project-page__image--placeholder" aria-hidden="true">
            <span>{project.title}</span>
          </div>
        )}
      </header>

      {hasProjectNotes && (
        <section className="project-page__section">
          <p className="project-page__eyebrow">Project notes</p>
          <h2>What matters here</h2>
          {markdown ? (
            <MarkdownContent source={markdown} />
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
          <p className="project-page__eyebrow">Links</p>
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
