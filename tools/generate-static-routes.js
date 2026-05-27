import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const distDir = join(projectRoot, 'dist')
const sitemapPath = join(distDir, 'sitemap.xml')
const indexPath = join(distDir, 'index.html')
const siteOrigin = 'https://llyneuf.xyz'

const sitemap = readFileSync(sitemapPath, 'utf8')
const indexHtml = readFileSync(indexPath, 'utf8')
const routePaths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((match) => match[1])
  .filter((url) => url.startsWith(siteOrigin))
  .map((url) => new URL(url).pathname)
  .filter((pathname) => pathname !== '/')

routePaths.forEach((pathname) => {
  const routeDir = join(distDir, pathname.replace(/^\/+|\/+$/g, ''))

  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), indexHtml)
})

console.log(`Generated ${routePaths.length} static route entries.`)
