# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Main app (from repo root)
npm run dev        # Start Vite dev server
npm run build      # Production build → dist/
npm run lint       # ESLint
npm run preview    # Preview production build locally

# Sanity Studio (from /studio/)
cd studio && npm run dev    # Start Sanity Studio at localhost:3333
cd studio && npm run build  # Build Studio
cd studio && npm run deploy # Deploy Studio to Sanity's CDN
```

## Architecture

This is a **React 19 + Vite** business website with **Sanity CMS** for content management, deployed to Netlify.

### Data Flow

`App.jsx` is the single data-fetching layer. It queries Sanity via GROQ on mount and passes data down as props:
- `galleryItems` → `<Gallery />`
- `reviews` → `<Reviews />`

The Sanity client is configured in `src/sanityClient.js` (projectId: `7vgbicbo`, dataset: `production`, `useCdn: false`).

### Component Structure (`src/`)

| Component | Purpose |
|---|---|
| `App.jsx` | Root; fetches Sanity data, composes page sections |
| `Navbar.jsx` | Responsive nav with mobile menu |
| `Hero.jsx` | Landing hero section |
| `AboutUs.jsx` | Company info section |
| `Services.jsx` | Service panels (Commercial/Residential/Industrial/Emergency) with hover/scroll effects |
| `Gallery.jsx` | Image grid from Sanity, uses `@sanity/image-url` for URL building |
| `Reviews.jsx` | Customer testimonials from Sanity |
| `Footer.jsx` | Footer with contact/social links |

### Sanity CMS (`studio/`)

Schemas in `studio/schemaTypes/`:
- **`gallery`** — document with `title`, `order` (number), and `images[]` (array of `galleryImage` references)
- **`galleryImage`** — document with `alt` (string) and `image` (with hotspot enabled)
- **`review`** — document with `reviewText`, `reviewerName`, and `order` (number)

Studio is a separate npm workspace under `/studio/`. Always `cd studio` before running studio commands.

### Styling

Tailwind CSS 4 via `@tailwindcss/postcss`. Fonts (Alexandria, Karantina) are loaded via Google Fonts in `index.html`. No `tailwind.config.js` — Tailwind 4 reads config from CSS directly.

### Deployment

Netlify: build command `npm run build`, publishes `dist/`. SPA fallback redirect (`/* → /index.html`) is set in `netlify.toml`. Node 22 is pinned.

## Key Notes

- The main app uses **JSX** (not TSX); only the Sanity Studio uses TypeScript.
- Sanity credentials are currently hardcoded in `src/sanityClient.js` — no `.env` file required to run locally.
- Static image assets (WebP) live in `src/assets/`.
- The `documentation.md` in the repo root is a dev log tracking feature implementation dates — not specs.
