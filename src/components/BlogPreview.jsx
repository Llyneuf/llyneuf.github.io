import { useCallback, useEffect, useRef, useState } from 'react'
import { posts } from '../data/posts'

function BlogPreview() {
  const [featuredPost, ...sidePosts] = posts
  const [selectedPost, setSelectedPost] = useState(null)
  const scrollPositionRef = useRef(0)

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
  }, [])

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

  return (
    <section id="blog" className="blog section">
      <div className="section-heading">
        <div>
          <span className="section-heading__eyebrow">Devlog</span>
          <h2>Latest news</h2>
        </div>
      </div>

      <div className="blog__layout">
        <button
          type="button"
          id={`devlog-${featuredPost.slug}`}
          className="blog__featured"
          data-umami-event={`Devlog ${featuredPost.title}`}
          onClick={() => handleOpenPost(featuredPost)}
        >
          <img src={featuredPost.image} alt="" className="blog__featured-image" />
          <div className="blog__featured-content">
            <div className="blog__meta">
              <span>{featuredPost.type}</span>
              <span>{featuredPost.date}</span>
            </div>
            <h3>{featuredPost.title}</h3>
            <p>{featuredPost.summary}</p>
            <span className="blog__read-more">Read update</span>
          </div>
        </button>

        <div className="blog__list">
          {sidePosts.map((post) => (
            <button
              type="button"
              id={`devlog-${post.slug}`}
              className="blog__item"
              data-umami-event={`Devlog ${post.title}`}
              onClick={() => handleOpenPost(post)}
              key={post.title}
            >
              <img src={post.image} alt="" className="blog__thumb" />
              <div className="blog__item-content">
                <div className="blog__meta">
                  <span>{post.type}</span>
                  <span>{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <span className="blog__read-more">Read update</span>
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
              aria-label="Close devlog post"
              onClick={handleClosePost}
            >
              Close
            </button>
            <div className="blog-modal__media">
              <img src={selectedPost.image} alt="" className="blog-modal__image" />
              <div className="blog-modal__media-content">
                <div className="blog__meta">
                  <span>{selectedPost.type}</span>
                  <span>{selectedPost.date}</span>
                </div>
                <h3 id="devlog-modal-title">{selectedPost.title}</h3>
              </div>
            </div>
            <div className="blog-modal__content">
              {selectedPost.content.map((block) => {
                if (block.type === 'image') {
                  return (
                    <figure className="blog-modal__figure" key={`${block.src}-${block.caption}`}>
                      <img src={block.src} alt={block.alt} />
                      {block.caption ? <figcaption>{block.caption}</figcaption> : null}
                    </figure>
                  )
                }

                return <p key={block.value}>{block.value}</p>
              })}
            </div>
          </article>
        </div>
      ) : null}
    </section>
  )
}

export default BlogPreview
