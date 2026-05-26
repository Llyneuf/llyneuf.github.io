import ReactMarkdown from 'react-markdown'

function isExternalUrl(href) {
  return /^https?:\/\//i.test(href)
}

function MarkdownContent({ source }) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        components={{
          a({ href = '', children, ...props }) {
            if (isExternalUrl(href)) {
              return (
                <a href={href} target="_blank" rel="noreferrer" {...props}>
                  {children}
                </a>
              )
            }

            return (
              <a href={href} {...props}>
                {children}
              </a>
            )
          },
          img({ alt = '', ...props }) {
            return <img alt={alt} loading="lazy" {...props} />
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownContent
