function Projects() {
  const projects = [
    {
      title: 'VTuber Identity',
      description: 'Visual identity, character presentation and personal branding direction.',
    },
    {
      title: '3D Character Work',
      description: 'Stylized character creation, experimentation and digital presence design.',
    },
    {
      title: 'Creative Web',
      description: 'Personal web experiences, portfolio layouts and interactive presentation.',
    },
  ]

  return (
    <section id="projects" className="projects section">
      <div className="section-heading">
        <span className="section-heading__eyebrow">Projects</span>
        <h2>Selected Work</h2>
      </div>

      <div className="projects__grid">
        {projects.map((project, index) => (
          <article className="projects__card" key={index}>
            <span className="projects__index">0{index + 1}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects