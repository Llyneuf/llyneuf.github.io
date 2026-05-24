import { projects } from '../data/projects'

function Projects() {
  return (
    <section id="projects" className="projects section">
      <div className="section-heading section-heading--split">
        <div>
          <span className="section-heading__eyebrow">Projects</span>
          <h2>Work, experiments and things in motion</h2>
        </div>
        <p>
          Finished work, prototypes and active directions can live side by side
          here, so progress is visible even while projects are still growing.
        </p>
      </div>

      <div className="projects__grid">
        {projects.map((project, index) => (
          <article className="projects__card" key={project.title}>
            <div className="projects__topline">
              <span className="projects__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="projects__status">{project.status}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <div className="projects__role">
              <span>Role</span>
              <strong>{project.role}</strong>
            </div>
            <div className="tag-list">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="projects__links">
              {project.links.map((link) => (
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
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
