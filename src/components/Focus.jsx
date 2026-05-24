function Focus() {
  const focusItems = [
    {
      title: 'Development',
      description: 'Web interfaces, interactive systems and creative coding.'
    },
    {
      title: 'Motion Design',
      description: 'Animated visuals, transitions, rhythm and presentation.'
    },
    {
      title: '3D / Digital Art',
      description: 'Characters, assets, stylized forms and visual experimentation.'
    },
    {
      title: 'VTubing / Streaming',
      description: 'Live content, virtual identity and creator presence.'
    }
  ]

  return (
    <section id="focus" className="focus section">
      <div className="section-heading">
        <span className="section-heading__eyebrow">Focus</span>
        <h2>What I Do</h2>
      </div>

      <div className="focus__grid">
        {focusItems.map((item, index) => (
          <article className="focus__card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Focus