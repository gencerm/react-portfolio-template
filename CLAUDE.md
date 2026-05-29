# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start development server (localhost:3000)
yarn build      # Production build
yarn start      # Start production server (run after build)
yarn lint       # ESLint check
```

No test suite is configured in this project.

## Architecture

### Content is data-driven
All site text and structure (name, taglines, projects, services, social links, about paragraph, resume) lives in `data/portfolio.json`. Pages import this file directly — changing content means editing this JSON, not touching React components. The `/edit` route provides a browser GUI for this file, but **only works in development mode** (`NODE_ENV === "development"`).

### Pages → Components → Data flow
- `pages/_app.js` wraps every page in `next-themes` `ThemeProvider` (dark mode)
- `pages/index.js` is the home page; it reads from `data/portfolio.json` and composes `Header`, `WorkCard`, `ServiceCard`, `Footer`, `Socials`, `Cursor` components
- `pages/resume.js` and `pages/blog/` follow the same pattern
- Components live in `components/<ComponentName>/index.js`

### Blog system
Blog posts are Markdown files in `_posts/*.md` with gray-matter frontmatter (`title`, `date`, `tagline`, `preview`, `image`). They are read at build time via `utils/api.js` using `getStaticProps` — there is no database. Creating/deleting posts via `/api/blog` writes/removes `.md` files on disk (dev only). `showBlog: true` in `portfolio.json` controls whether the blog is visible; setting it to `false` redirects `/blog` to `/`.

### Dev-only API routes
`pages/api/portfolio.js` (POST) — overwrites `data/portfolio.json` from the `/edit` UI.  
`pages/api/blog/index.js` (POST/DELETE) — creates/deletes files in `_posts/`.  
Both are gated with `process.env.NODE_ENV === "development"` and do nothing in production.

### Styling
- Tailwind CSS with custom breakpoints: `mob` (375px), `tablet` (768px), `laptop` (1024px), `desktop` (1280px), `laptopl` (1440px) — use these instead of Tailwind's default `sm/md/lg/xl`
- Dark mode uses the `class` strategy; `dark:` variants apply when `next-themes` adds `class="dark"` to `<html>`
- Global styles and gradient decorations: `styles/globals.css`
- Font: Hind (Google Fonts, imported in `globals.css`)
- Custom colors/theme extensions go in `tailwind.config.js` under `theme.extend`

### Animations
GSAP `stagger()` (from `animations/index.js`) runs on page load via `useIsomorphicLayoutEffect` (a wrapper in `utils/index.js` that uses `useLayoutEffect` client-side and `useEffect` server-side to avoid SSR mismatches).

## My Intentions for This Fork
- Stack stays the same: Next.js, React, Tailwind CSS
- Content will be updated via `data/portfolio.json` (name, projects, services, etc.)
- Some UI components will be redesigned — ask before refactoring existing components
- Blog feature: [keep / remove — karar ver]

[INACTIVE] ## Design Changes Planned
- [ ] Color palette: [buraya yaz veya "TBD"]
- [ ] Typography: keeping Hind or [alternative]
- [ ] Layout changes in: [örn. Header, WorkCard]
- Preserve existing GSAP animations unless I explicitly say otherwise

## Teaching Mode

The user is a backend/sysadmin professional learning React and Next.js through this project. Every code change is also a learning opportunity. Apply the following always:

- **Explain before or alongside every change** — not after. The user should understand *what*, *where*, and *why* before moving on.
- **Use backend/sysadmin analogies** where helpful. Examples:
  - `useEffect` → like a cron job that runs after the page mounts
  - `useState` → like a variable in memory that triggers a re-render when changed
  - `getStaticProps` → like pre-rendering a response at build time, not per-request
  - `portfolio.json` → like an app config file
  - `pages/` → like a routing layer
- **Label the concept being taught** when introducing it. Example: *"Ne öğreniyoruz: CSS 3D flip"* or *"Concept: lifting state up"*
- **Keep explanations short and concrete** — 2-4 sentences max per concept. No walls of text.
- **Never just dump code** without context. Even a one-line change deserves a sentence explaining why it goes there.
- **Preferred language:** Turkish for explanations, English for code and technical terms.

## Rules
- Use the custom Tailwind breakpoints (`mob`, `tablet`, `laptop`, `desktop`, `laptopl`) — never use `sm/md/lg/xl`
- Dark mode via `dark:` variants only — no inline style for theming
- Components go in `components/<ComponentName>/index.js` — keep existing structure
- Do not touch `pages/api/` routes unless I ask
- If a change affects `data/portfolio.json` schema, warn me first
- No new dependencies without asking