import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getUiText } from '../data/i18n'
import { getDevlogPosts } from '../data/devlogContent'
import MarkdownContent from './MarkdownContent'

function BlogPreview({ language }) {
  const t = getUiText(language)
  const posts = useMemo(() => getDevlogPosts(language), [language])
  const [featuredPost, ...sidePosts] = posts
  const [selectedPost, setSelectedPost] = useState(null)
  const scrollPositionRef = useRef(0)
  const getTypeClassName = (type) => type.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const lockPageScroll = useCallback(() => {
    document.body.classList.add('is-modal-open')
    document.documentElement.classList.add('is-modal-open')
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPositionRef.current}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
  }, [])

  const unlockPageScroll = useCallback(() => {
    const scrollPosition = scrollPositionRef.current

    document.body.classList.remove('is-modal-open')
    document.documentElement.classList.remove('is-modal-open')
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.width = ''
    window.scrollTo({ top: scrollPosition, left: 0, behavior: 'instant' })
  }, [])

  const handleClosePost = useCallback(() => {
    setSelectedPost(null)
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)

    window.requestAnimationFrame(() => {
      unlockPageScroll()
    })
  }, [unlockPageScroll])

  useEffect(() => {
    const openPostFromHash = () => {
      const slug = window.location.hash.replace('#devlog-', '')
      const matchedPost = posts.find((post) => post.slug === slug)

      if (matchedPost) {
        scrollPositionRef.current = window.scrollY
        setSelectedPost(matchedPost)
      }
    }

    openPostFromHash()
    window.addEventListener('hashchange', openPostFromHash)

    return () => window.removeEventListener('hashchange', openPostFromHash)
  }, [posts])

  useEffect(() => {
    if (!selectedPost) {
      document.body.classList.remove('is-modal-open')
      document.documentElement.classList.remove('is-modal-open')
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClosePost()
      }
    }

    lockPageScroll()
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClosePost, lockPageScroll, selectedPost])

  const handleOpenPost = (post) => {
    scrollPositionRef.current = window.scrollY
    setSelectedPost(post)
    window.history.replaceState(null, '', `#devlog-${post.slug}`)
  }

  if (!featuredPost) {
    return null
  }

  return (
    <section id="blog" className="blog section">
      <div className="section-heading">
        <div>
          <span className="section-heading__eyebrow">{t.devlogEyebrow}</span>
          <h2>{t.devlogTitle}</h2>
        </div>
      </div>

      <div className="blog__layout">
        <button
          type="button"
          id={`devlog-${featuredPost.slug}`}
          className="blog__featured"
          data-umami-event={`Devlog ${featuredPost.cardTitle}`}
          onClick={() => handleOpenPost(featuredPost)}
        >
          <img src={featuredPost.cardImage} alt={featuredPost.cardImageAlt} className="blog__featured-image" />
          <span className="blog__latest">{t.devlogLatest}</span>
          <div className="blog__featured-content">
            <div className="blog__meta">
              <span className={`blog__type blog__type--${getTypeClassName(featuredPost.cardType)}`}>
                {featuredPost.cardType}
              </span>
              <span>{featuredPost.date}</span>
            </div>
            <h3>{featuredPost.cardTitle}</h3>
            <p>{featuredPost.cardSummary}</p>
            <span className="blog__read-more">{t.devlogReadMore}</span>
          </div>
        </button>

        <div className="blog__list">
          {sidePosts.map((post) => (
            <button
              type="button"
              id={`devlog-${post.slug}`}
              className="blog__item"
              data-umami-event={`Devlog ${post.cardTitle}`}
              onClick={() => handleOpenPost(post)}
              key={post.slug}
            >
              <img src={post.cardImage} alt={post.cardImageAlt} className="blog__thumb" />
              <div className="blog__item-content">
                <div className="blog__meta">
                  <span className={`blog__type blog__type--${getTypeClassName(post.cardType)}`}>{post.cardType}</span>
                  <span>{post.date}</span>
                </div>
                <h3>{post.cardTitle}</h3>
                <p>{post.cardSummary}</p>
                <span className="blog__read-more">{t.devlogReadMore}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedPost ? (
        <div className="blog-modal" role="presentation" onMouseDown={handleClosePost}>
          <article
            className="blog-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="devlog-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="blog-modal__close"
              aria-label={t.devlogClose}
              onClick={handleClosePost}
            >
              {t.devlogClose}
            </button>
            <div className="blog-modal__media">
              <img src={selectedPost.pageImage} alt={selectedPost.pageImageAlt} className="blog-modal__image" />
              <div className="blog-modal__media-content">
                <div className="blog__meta">
                  <span>{selectedPost.pageType}</span>
                  <span>{selectedPost.date}</span>
                </div>
                <h3 id="devlog-modal-title">{selectedPost.pageTitle}</h3>
              </div>
            </div>
            <div className="blog-modal__content">
              <MarkdownContent source={selectedPost.pageMarkdown} />
            </div>
          </article>
        </div>
      ) : null}
    </section>
  )
}

export default BlogPreview
