# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This is the `frontend` of a Portfolio project, currently an **unmodified Vite + React starter template** (Vite 8, React 19, JavaScript/JSX — not TypeScript). `src/App.jsx` still contains the default Vite landing page. Expect most work here to be greenfield: replacing the starter UI with actual portfolio content rather than refactoring existing features.

Not a git repository at the `frontend/` level — `git` commands will not work unless run from a parent directory.

## Commands

```bash
npm run dev       # Vite dev server with HMR
npm run build     # production build to dist/
npm run preview   # serve the built dist/ locally
npm run lint      # ESLint over the whole repo (flat config)
```

There is no test runner configured. Do not invent `npm test` — it will fail.

## Architecture

Single-page React app, standard Vite layout:

- `index.html` — Vite entry, loads `/src/main.jsx`
- `src/main.jsx` — mounts `<App />` into `#root` inside `<StrictMode>`
- `src/App.jsx` + `src/App.css` — page content and its styles
- `src/index.css` — global styles
- `public/` — static assets served at root (`favicon.svg`, `icons.svg`). Referenced from JSX as absolute paths like `/icons.svg#github-icon` via `<use href>`; do not import these through the module system.
- `src/assets/` — assets imported through the bundler (`import logo from './assets/...'`)

Rule of thumb for assets: **imported** (hashed, bundled) → `src/assets/`; **referenced by absolute URL** (especially SVG sprite sheets) → `public/`.

## ESLint quirk

`eslint.config.js` overrides `no-unused-vars` with `varsIgnorePattern: '^[A-Z_]'`. Unused identifiers starting with a capital letter or underscore (e.g. unused React component imports, constants) won't trigger the rule — only lowercase-starting unused vars do. Don't rely on lint to catch every dead import.
