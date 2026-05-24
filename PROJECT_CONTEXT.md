# Llyneuf Site Project Context

## Current State

This repository is the personal site for Llyneuf:

- Live site: https://llyneuf.github.io/
- Repo: https://github.com/Llyneuf/llyneuf.github.io
- Stack: React + Vite
- Hosting: GitHub Pages
- Deployment: GitHub Actions builds `main` and publishes `dist` to `gh-pages`

The current approved homepage direction:

- First screen is a clean title screen using `public/title.png`.
- No text or buttons should appear on the title screen.
- The explanatory intro with buttons appears below after scrolling.
- The site is intended as a personal hub: personality, projects, services/orders, links, Twitch, contact, and future blog/devlog.

## Important Workflow Preference

For visual/design changes, do not push immediately.

Preferred loop:

1. Make local changes.
2. Run checks.
3. Show screenshots.
4. Wait for explicit approval.
5. Commit and push only after approval.

The user disliked fully autonomous visual changes. Ask before committing or deploying design decisions.

## Useful Commands

```bash
npm run dev
npm run lint
npm run build
```

Manual deploy still exists:

```bash
npm run deploy
```

But normal publishing should happen through GitHub Actions after pushing to `main`.

## Recent Relevant Commits

- `394e46d Keep title screen clean` - approved clean title screen.
- `9dd0f4d Restore title-led hero` - intermediate title-led hero, superseded by clean title screen.
- `e1f88ba Turn site into personal hub` - major restructure into personal hub.
- `6857978 Add automatic Pages deployment` - GitHub Actions deploy setup.

## Content Structure

Editable content lives mostly in:

- `src/data/profile.js` - name, role, story, socials.
- `src/data/projects.js` - project cards.
- `src/data/services.js` - skills and order/service cards.
- `src/data/posts.js` - blog/devlog preview entries.

Main UI components:

- `src/components/Hero.jsx` - title screen and intro below it.
- `src/components/Identity.jsx` - about/personality section.
- `src/components/Focus.jsx` - skills.
- `src/components/Projects.jsx` - projects.
- `src/components/Services.jsx` - orders/requests.
- `src/components/BlogPreview.jsx` - future blog/devlog preview.
- `src/components/Links.jsx` - social links, especially Twitch.
- `src/components/Contact.jsx` - contact CTA.

Main styling:

- `src/styles/main.css`
- `src/index.css`

## Design Notes

The site should feel like a personal creative hub, not a generic portfolio template.

Priorities:

- Preserve the Llyneuf visual identity.
- Twitch should be easy to find.
- Projects and capabilities should be clear after the title screen.
- Avoid putting UI/cards/text on top of the title image.
- Keep the title screen clean and atmospheric.
- Below the title screen, make it clear what Llyneuf can do and how to contact/order.

## Next Ideas

Possible next tasks:

- Rewrite copy in a more personal voice.
- Add real project entries and screenshots.
- Add real social links beyond Twitch/Telegram/GitHub/email.
- Improve mobile layout of the title screen.
- Add a proper blog/devlog system later, possibly from Markdown files.
- Add a real form later through Formspree, Vercel, or VPS backend.
