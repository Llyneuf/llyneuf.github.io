---
cardTitle: My Personal Site
cardStatus: Active
cardSummary: A personal web hub for identity, projects, streams, links, contact and devlog notes.
cardProgress: Public v1 is live on the custom domain. Current work is polish, clearer content and better project context.
cardImage: /project_site.png
cardImageAlt: Screenshot of Llyneuf's current personal website
cardTags:
  - React
  - Vite
  - GitHub Pages
  - Personal brand
cardDetails:
  - React + Vite site deployed through GitHub Pages.
  - Custom domain, social previews, sitemap, analytics and devlog are already connected.
  - Next: richer project entries, better mobile checks and more real updates.
pageTitle: My Personal Site
pageStatus: Active
pageSummary: A personal web hub for identity, projects, streams, links, contact and devlog notes.
pageProgress: Public v1 is live on the custom domain. Current work is polish, clearer content and better project context.
pageImage: /project_site.png
pageImageAlt: Screenshot of Llyneuf's current personal website
pageTags:
  - React
  - Vite
  - GitHub Pages
  - Personal brand
---

## Overview

This site is my public home base: a place for projects, devlog notes, stream links, contact points and small experiments that are too connected to keep scattered across different platforms.

The goal is not to make a huge portfolio site. The goal is to make a **clean personal hub** that can grow slowly: one new project page, one devlog entry, one better screenshot, one clearer link at a time.

Right now the site already works as a static GitHub Pages project, but the structure is being shaped so it can stay pleasant to edit later. Short project cards live in `src/data/projects.js`, while longer project texts live as markdown files in `src/content/projects`.

## What The Site Does

- Shows the main identity and visual direction on the homepage.
- Collects active, paused and completed projects in one project hub.
- Gives each project its own shareable page.
- Keeps devlog entries separate from project descriptions.
- Links out to important platforms without turning the page into a social link dump.
- Has a custom `404.html` page for broken or future URLs.

## Current Structure

The project is split into two kinds of content.

**Structured data** lives in `src/data`. This is best for repeatable fields like project titles, slugs, statuses, tags, preview images and external links.

**Long-form text** lives in markdown. This is best for writing naturally: paragraphs, notes, context, installation steps, or project thoughts that should not be squeezed into a small card.

For example, the card on the homepage can stay short:

- title
- status
- summary
- short progress note
- a few compact card details

The full project page can then be more expressive:

- overview
- current focus
- technical notes
- future plans
- useful links
- editing notes

## Why Markdown

Markdown makes the site easier to maintain because project pages can be written like normal notes instead of code.

That means I can edit project text in **Obsidian**, keep the writing readable, and still let the site render it as part of the project page.

The current renderer supports the basics that are useful for this site:

- `##`, `###` and `####` headings
- normal paragraphs
- bullet lists
- **bold text**
- `inline code`
- links like [GitHub repository](https://github.com/Llyneuf/llyneuf.github.io)
- horizontal separators using `---`

---

## Design Direction

The site should feel personal, dark, soft and slightly theatrical, but still readable. It is not meant to look like a corporate dashboard or a generic landing page.

The most important visual anchors are:

- the Llyneuf name
- the character artwork
- dark backgrounds with soft contrast
- cyan labels for structure
- pink accents for calls to action
- compact cards for projects and devlog entries

The design is still evolving, but the direction is already clearer than the first version: fewer placeholder blocks, more real content, and more pages that can be shared directly.

## Technical Notes

The site currently uses:

- **React** for components.
- **Vite** for local development and production builds.
- **GitHub Pages** for hosting.
- A custom domain: [llyneuf.xyz](https://llyneuf.xyz/).
- Static data files for repeatable site content.
- Markdown files for longer project text.

There is no backend yet. That is intentional: the site should stay simple while the content and structure are still changing.

## What Is Already Done

- Homepage sections for hero, about, projects, devlog, links and contact.
- Project hub at `/#/projects`.
- Individual project pages at routes like `/#/projects/personal-site`.
- Previous and next navigation between project pages.
- Custom 404 page for GitHub Pages.
- Mobile fixes for the 404 page after real phone testing.
- Project cards that can open the full project page by clicking the card.
- Markdown-based project text for easier future editing.

## What Comes Next

The next useful improvements are mostly about content quality.

- Replace weak or mismatched project preview images.
- Bring all project images closer to a consistent `16:9` format.
- Write fuller project pages for Ninette, Warudo Horror Room and Peripeteia.
- Add more devlog posts with actual progress screenshots.
- Polish mobile layouts for project pages and project hub.

After that, the site can move toward a nicer editing workflow. The strongest path is probably to keep using Obsidian for writing and let the site pull from markdown files during build.

## Editing Notes

This file is meant to be an example of how future project pages can be written.

Use paragraphs when the project needs explanation. Use lists when the reader needs scanning. Use `inline code` for paths, filenames and technical names. Use **bold** only for emphasis, not for every important word.

If a page starts feeling too long, split it into sections with `##` headings. If a section starts feeling too dense, use a short bullet list.
