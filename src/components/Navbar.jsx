import { getUiText } from '../data/i18n'

function Navbar({ language, basePath, currentLanguagePath }) {
  const t = getUiText(language)
  const languageOptions = ['ru', 'en', 'es']
  const languageTargetPath = currentLanguagePath === '/' ? '/' : currentLanguagePath

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href={`${basePath}/`} className="navbar__logo">Llyneuf</a>

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
    </header>
  )
}

export default Navbar
