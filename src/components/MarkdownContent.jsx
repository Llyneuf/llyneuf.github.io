function parseInline(text) {
  const parts = []
  const tokenPattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
  let lastIndex = 0
  let match

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]

    if (token.startsWith('`')) {
      parts.push(<code key={`${token}-${match.index}`}>{token.slice(1, -1)}</code>)
    } else if (token.startsWith('**')) {
      parts.push(<strong key={`${token}-${match.index}`}>{token.slice(2, -2)}</strong>)
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        parts.push(
          <a href={linkMatch[2]} target="_blank" rel="noreferrer" key={`${token}-${match.index}`}>
            {linkMatch[1]}
          </a>,
        )
      }
    }

    lastIndex = match.index + token.length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

function flushParagraph(blocks, paragraph) {
  if (paragraph.length === 0) {
    return
  }

  blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
  paragraph.length = 0
}

function markdownToBlocks(markdown) {
  const blocks = []
  const paragraph = []
  const lines = markdown.split(/\r?\n/)

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim()

    if (!line) {
      flushParagraph(blocks, paragraph)
      continue
    }

    if (line === '---') {
      flushParagraph(blocks, paragraph)
      blocks.push({ type: 'rule' })
      continue
    }

    const headingMatch = line.match(/^(#{2,4})\s+(.+)$/)
    if (headingMatch) {
      flushParagraph(blocks, paragraph)
      blocks.push({ type: `h${headingMatch[1].length}`, text: headingMatch[2] })
      continue
    }

    const listMatch = line.match(/^[-*]\s+(.+)$/)
    if (listMatch) {
      flushParagraph(blocks, paragraph)
      const previousBlock = blocks[blocks.length - 1]

      if (previousBlock?.type === 'list') {
        previousBlock.items.push(listMatch[1])
      } else {
        blocks.push({ type: 'list', items: [listMatch[1]] })
      }
      continue
    }

    paragraph.push(line)
  }

  flushParagraph(blocks, paragraph)
  return blocks
}

function MarkdownContent({ source }) {
  const blocks = markdownToBlocks(source)

  return (
    <div className="markdown-content">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`

        if (block.type === 'h2') {
          return <h2 key={key}>{parseInline(block.text)}</h2>
        }

        if (block.type === 'h3') {
          return <h3 key={key}>{parseInline(block.text)}</h3>
        }

        if (block.type === 'h4') {
          return <h4 key={key}>{parseInline(block.text)}</h4>
        }

        if (block.type === 'list') {
          return (
            <ul key={key}>
              {block.items.map((item) => (
                <li key={item}>{parseInline(item)}</li>
              ))}
            </ul>
          )
        }

        if (block.type === 'rule') {
          return <hr key={key} />
        }

        return <p key={key}>{parseInline(block.text)}</p>
      })}
    </div>
  )
}

export default MarkdownContent
