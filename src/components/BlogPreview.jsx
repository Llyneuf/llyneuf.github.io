import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getUiText } from '../data/i18n'
import { getDevlogPosts } from '../data/devlogContent'
import MarkdownContent from './MarkdownContent'

function BlogPreview({ language, basePath = '', hub = false, limit, showArchiveLink = false }) {
  const t = getUiText(language)
  const allPosts = useMemo(() => getDevlogPosts(language), [language])
  const posts = limit ? allPosts.slice(0, limit) : allPosts
  const [featuredPost, ...sidePosts] = posts
  const [selectedPostSlug, setSelectedPostSlug] = useState(null)
  const [activePostSlug, setActivePostSlug] = useState(null)
  const scrollPositionRef = useRef(0)
  const modalRef = useRef(null)
  const postRefs = useRef({})
  const skipNextAutoScrollRef = useRef(false)
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
    setSelectedPostSlug(null)
    setActivePostSlug(null)
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)

    window.requestAnimationFrame(() => {
      unlockPageScroll()
    })
  }, [unlockPageScroll])

  useEffect(() => {
    const openPostFromHash = () => {
      const slug = window.location.hash.replace('#devlog-', '')
      const matchedPost = allPosts.find((post) => post.slug === slug)

      if (matchedPost) {
        scrollPositionRef.current = window.scrollY
        setSelectedPostSlug(matchedPost.slug)
        setActivePostSlug(matchedPost.slug)
      }
    }

    openPostFromHash()
    window.addEventListener('hashchange', openPostFromHash)

    return () => window.removeEventListener('hashchange', openPostFromHash)
  }, [allPosts])

  useEffect(() => {
    if (!selectedPostSlug) {
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
  }, [handleClosePost, lockPageScroll, selectedPostSlug])

  useEffect(() => {
    if (!selectedPostSlug) {
      return
    }

    if (skipNextAutoScrollRef.current) {
      skipNextAutoScrollRef.current = false
      return
    }

    window.requestAnimationFrame(() => {
      postRefs.current[selectedPostSlug]?.scrollIntoView({ block: 'start' })
    })
  }, [selectedPostSlug])

  useEffect(() => {
    if (!selectedPostSlug) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target.id.startsWith('devlog-modal-')) {
          setActivePostSlug(visibleEntry.target.id.replace('devlog-modal-', ''))
        }
      },
      {
        root: null,
        threshold: [0.35, 0.55, 0.75],
      },
    )

    allPosts.forEach((post) => {
      const element = postRefs.current[post.slug]

      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [allPosts, selectedPostSlug])

  const handleOpenPost = (post) => {
    scrollPositionRef.current = window.scrollY
    setSelectedPostSlug(post.slug)
    setActivePostSlug(post.slug)
    window.history.replaceState(null, '', `#devlog-${post.slug}`)
  }

  const smoothScrollToPost = (slug) => {
    const modal = modalRef.current
    const target = postRefs.current[slug]

    if (!modal || !target) {
      return
    }

    const start = modal.scrollTop
    const targetTop = target.getBoundingClientRect().top - modal.getBoundingClientRect().top + modal.scrollTop
    const distance = targetTop - start
    const duration = 520
    const startTime = performance.now()
    const easeInOut = (value) =>
      value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1)
      modal.scrollTop = start + distance * easeInOut(progress)

      if (progress < 1) {
        window.requestAnimationFrame(animate)
      }
    }

    window.requestAnimationFrame(animate)
  }

  const getCurrentPostSlug = () => {
    const viewportMiddle = window.innerHeight / 2
    const visiblePost = allPosts
      .map((post) => {
        const rect = postRefs.current[post.slug]?.getBoundingClientRect()

        return rect
          ? {
              slug: post.slug,
              distance: Math.abs(rect.top + rect.height / 2 - viewportMiddle),
            }
          : null
      })
      .filter(Boolean)
      .sort((a, b) => a.distance - b.distance)[0]

    return visiblePost?.slug ?? activePostSlug ?? selectedPostSlug
  }

  const handleJumpPost = (direction) => {
    const currentIndex = allPosts.findIndex((post) => post.slug === getCurrentPostSlug())
    const nextIndex = currentIndex + direction
    const nextPost = allPosts[nextIndex]

    if (!nextPost) {
      return
    }

    skipNextAutoScrollRef.current = true
    setSelectedPostSlug(nextPost.slug)
    setActivePostSlug(nextPost.slug)
    window.history.replaceState(null, '', `#devlog-${nextPost.slug}`)
    smoothScrollToPost(nextPost.slug)
  }

  if (!featuredPost) {
    return null
  }

  return (
    <section id="blog" className={hub ? 'blog projects--hub section' : 'blog section'}>
      <div className="section-heading">
        <div>
          {hub ? <a href={`${basePath}/`} className="projects__home-link">{t.backToHomepage}</a> : null}
          {!hub ? <span className="section-heading__eyebrow">{t.devlogEyebrow}</span> : null}
          <h2>{hub ? t.devlogHubTitle : t.devlogTitle}</h2>
          {hub ? <p>{t.devlogHubDescription}</p> : null}
        </div>
      </div>

      {hub ? (
        <div className="projects__hub-chibi-row" aria-hidden="true">
          <img src="/projects_chibi.png" alt="" className="projects__hub-chibi" />
        </div>
      ) : null}

      <div className={hub ? 'blog__grid' : 'blog__layout'}>
        <button
          type="button"
          id={`devlog-${featuredPost.slug}`}
          className={hub ? 'blog__item' : 'blog__featured'}
          data-umami-event={`Devlog ${featuredPost.cardTitle}`}
          onClick={() => handleOpenPost(featuredPost)}
        >
          <img
            src={featuredPost.cardImage}
            alt={featuredPost.cardImageAlt}
            className={hub ? 'blog__thumb' : 'blog__featured-image'}
          />
          {!hub ? <span className="blog__latest">{t.devlogLatest}</span> : null}
          <div className={hub ? 'blog__item-content' : 'blog__featured-content'}>
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

        <div className={hub ? 'blog__grid-list' : 'blog__list'}>
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

      {showArchiveLink ? (
        <div className="section-actions">
          <a className="button button--secondary" href={`${basePath}/devlog`}>
            {t.allDevlogs}
          </a>
        </div>
      ) : null}

      {selectedPostSlug ? (
        <div className="blog-modal" role="presentation" ref={modalRef} onMouseDown={handleClosePost}>
          <div
            className="blog-modal__dialog blog-modal__dialog--feed"
            role="dialog"
            aria-modal="true"
            aria-labelledby="devlog-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="blog-modal__controls">
              <button type="button" aria-label={t.devlogClose} onClick={handleClosePost}>
                ×
              </button>
              <button type="button" aria-label={t.devlogPreviousPost} onClick={() => handleJumpPost(-1)}>
                ↑
              </button>
              <button type="button" aria-label={t.devlogNextPost} onClick={() => handleJumpPost(1)}>
                ↓
              </button>
            </div>

            <div className="blog-modal__feed" onMouseDown={handleClosePost}>
              {allPosts.map((post) => (
                <article
                  className="blog-modal__post"
                  id={`devlog-modal-${post.slug}`}
                  onMouseDown={(event) => event.stopPropagation()}
                  ref={(element) => {
                    postRefs.current[post.slug] = element
                  }}
                  key={post.slug}
                >
                  <div className="blog-modal__media">
                    <img src={post.pageImage} alt={post.pageImageAlt} className="blog-modal__image" />
                    <div className="blog-modal__media-content">
                      <div className="blog__meta">
                        <span>{post.pageType}</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 id={post.slug === selectedPostSlug ? 'devlog-modal-title' : undefined}>{post.pageTitle}</h3>
                    </div>
                  </div>
                  <div className="blog-modal__content">
                    <MarkdownContent source={post.pageMarkdown} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default BlogPreview
