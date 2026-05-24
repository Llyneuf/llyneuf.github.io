function Identity() {
  return (
    <section id="about" className="identity section">
      <div className="section-heading">
        <span className="section-heading__eyebrow">Identity</span>
        <h2>Character Profile</h2>
      </div>

      <div className="identity__grid">
        <div className="identity__card">
          <div className="identity__row">
            <span className="identity__label">Name</span>
            <span className="identity__value">Llyneuf</span>
          </div>

          <div className="identity__row">
            <span className="identity__label">Role</span>
            <span className="identity__value">Digital Creator</span>
          </div>

          <div className="identity__row">
            <span className="identity__label">Focus</span>
            <span className="identity__value">VTubing / Motion / 3D / Code</span>
          </div>

          <div className="identity__row">
            <span className="identity__label">Status</span>
            <span className="identity__value">Building visual and interactive experiences</span>
          </div>
        </div>

        <div className="identity__text">
          <p>
            I work at the intersection of creativity and technology —
            creating visuals, motion, interactive systems and a digital identity
            that ties everything together.
          </p>

          <p>
            My work lives somewhere between streaming, design, 3D and code,
            shaped into a single soft-tech world.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Identity