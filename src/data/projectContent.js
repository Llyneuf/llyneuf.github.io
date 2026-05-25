const projectContentFiles = import.meta.glob('../content/projects/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

export const projectContent = Object.fromEntries(
  Object.entries(projectContentFiles).map(([path, content]) => {
    const slug = path.match(/\/([^/]+)\.md$/)?.[1]

    return [slug, content.trim()]
  }),
)
