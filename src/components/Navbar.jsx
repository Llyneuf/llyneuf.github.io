function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href="#" className="navbar__logo">Llyneuf</a>

        <nav className="navbar__nav">
          <a href="#about">About</a>
          <a href="#focus">Focus</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar