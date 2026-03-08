# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:5173)
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

## Architecture

Single-page React marketing site for MatchdayOS — a SaaS platform for grassroots football club administration.

**Stack**: React 19, Vite 7, Tailwind CSS 4 (using `@tailwindcss/vite` plugin — no `tailwind.config.js` file; config lives in `src/index.css` via `@theme`).

**Page structure** (rendered in order by `App.jsx`):
Navbar → Hero → Problem → Solution → Features → Pricing → EarlyAccess → Footer

All sections are in `src/components/`. There is no routing — it's a single-page site with anchor links for navigation (`#features`, `#pricing`, `#early-access`).

## Design System

Defined in `src/index.css` using Tailwind `@theme` directive:

- **Primary**: `navy` (#0F2744), `navy-light`, `navy-dark`
- **Accent**: `accent` (#43B047), `accent-dark`, `accent-light`
- **Surfaces**: `surface` (#f8fafb), `surface-raised` (white)
- **Borders**: `border` (#e8ecf0), `border-subtle` (#f0f2f4)
- **Font**: Inter (self-hosted WOFF2 files in `public/fonts/`, `@font-face` declarations in `index.css`)

Custom CSS utilities in `index.css`: `.bg-grid`, `.glow-accent`, `.glow-navy`, `.text-gradient`, `.card-hover`, `.border-glow`, `.btn-press`.

## Key Conventions

- Use Tailwind 4 canonical class names (e.g. `bg-white/4` not `bg-white/[0.04]`, `bg-linear-to-r` not `bg-gradient-to-r`, `shrink-0` not `flex-shrink-0`).
- Brand assets are in `src/assets/` (logo-icon.png, logo-full.png, hero-image.webp). Static files (favicon, OG image) are in `public/`.
- The EarlyAccess component contains a form that POSTs JSON to `FORM_ENDPOINT` (configurable constant at top of file, currently `/api/early-access`).
## API (Azure Functions)

The `api/` directory contains Azure Functions (Node.js, v2 runtime) deployed as managed functions on Azure Static Web Apps.

- **`api/early-access/`** — POST endpoint for early access form. Validates input, stores lead in Azure Table Storage (`EarlyAccessLeads` table), sends email notification via Azure Communication Services.
- Rate limiting (in-memory, per-IP, 5 req/min), duplicate email protection (1 min cooldown), 8KB payload limit.
- Environment variables: `STORAGE_CONNECTION_STRING`, `ACS_EMAIL_CONNECTION_STRING`, `ACS_EMAIL_FROM`, `ACS_EMAIL_TO`.

## Security

- Security headers configured in `staticwebapp.config.json` (CSP, X-Frame-Options, etc.).
- No external CDN dependencies — fonts are self-hosted, no third-party scripts.
- `.env` files excluded via `.gitignore`.
