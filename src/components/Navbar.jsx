import { getUiText } from '../data/i18n'
import { useState } from 'react'

function Navbar({ language, basePath, currentLanguagePath }) {
  const t = getUiText(language)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const languageOptions = ['ru', 'en', 'es']
  const languageTargetPath = currentLanguagePath === '/' ? '/' : currentLanguagePath

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href={`${basePath}/`} className="navbar__logo">Llyneuf</a>

        <button
          type="button"
          className={`navbar__mobile-toggle${mobileMenuOpen ? ' is-open' : ''}`}
          aria-label="Open navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
        >
          <span />
        </button>

        <nav className="navbar__nav">
          <a href={`${basePath}/#about`}>{t.navAbout}</a>
          <a href={`${basePath}/#blog`}>{t.navBlog}</a>
          <a href={`${basePath}/projects`}>{t.navProjects}</a>
          <a href={`${basePath}/#links`}>{t.navLinks}</a>
          <a href={`${basePath}/#contact`}>{t.navContact}</a>
          <span className="navbar__languages" aria-label="Language switcher">
            {languageOptions.map((item) => (
              <a
                href={`/${item}${languageTargetPath}`}
                className={item === language ? 'is-active' : ''}
                aria-current={item === language ? 'page' : undefined}
                key={item}
              >
                {item.toUpperCase()}
              </a>
            ))}
          </span>
        </nav>

        <span className="navbar__mobile-languages" aria-label="Language switcher">
          {languageOptions.map((item) => (
            <a
              href={`/${item}${languageTargetPath}`}
              className={item === language ? 'is-active' : ''}
              aria-current={item === language ? 'page' : undefined}
              key={item}
            >
              {item.toUpperCase()}
            </a>
          ))}
        </span>
      </div>

      {mobileMenuOpen ? (
        <nav className="navbar__mobile-menu">
          <a href={`${basePath}/#about`} onClick={() => setMobileMenuOpen(false)}>{t.navAbout}</a>
          <a href={`${basePath}/#blog`} onClick={() => setMobileMenuOpen(false)}>{t.navBlog}</a>
          <a href={`${basePath}/projects`} onClick={() => setMobileMenuOpen(false)}>{t.navProjects}</a>
          <a href={`${basePath}/#links`} onClick={() => setMobileMenuOpen(false)}>{t.navLinks}</a>
          <a href={`${basePath}/#contact`} onClick={() => setMobileMenuOpen(false)}>{t.navContact}</a>
        </nav>
      ) : null}
    </header>
  )
}

export default Navbar
