# Marni Jayaram — Portfolio

> **Built with [Claude Code](https://claude.com/claude-code)** — the entire frontend (animations, design system, components, sections) was designed and coded in a pair-programming session with Anthropic's Claude.

[![Built with Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-7c3aed?style=for-the-badge&logo=anthropic&logoColor=white)](https://claude.com/claude-code)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A personal full-stack portfolio showcasing my work as a **Mobile App Developer** (React Native · iOS · Android · AI integration).

---

## 🤖 Built with Claude Code

This portfolio was built using **Anthropic's Claude Code** — an AI coding assistant.
Every component, animation, design decision, and polish pass was iterated through
natural-language conversation with Claude, then committed as I went.

Highlights of the AI-assisted workflow:

- 🎨 **Design system** (typography, colors, spacing, shadows) tuned through dozens of iterations
- ✨ **Animations** — preloader with rotating 3D cube, scrolling phone-app UI, MagicBento card grid, Prism WebGL backdrop, page transitions
- 💡 **Theme-inverted phone screen** — site in light mode shows a dark mobile UI inside the phone, and vice versa
- 🔧 **Refactors** — DRY'd profile data, color palette swaps, layout reshuffles all done conversationally
- 📝 **Code quality** — ESLint passes, build clean, no dead imports

Total session output: ~30 files of React/JSX, fully typed-prop-component architecture, custom hooks (`useTheme`, `useScrollSpy`), and integrations of React-Bits-inspired components (MagicBento, Prism, TiltedCard, SpotlightCard).

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite 8
- Tailwind CSS 3 (custom design tokens, CSS-var-driven theme)
- React Router 7
- Framer Motion (page transitions, scroll spy, micro-animations)
- Lenis (smooth scroll)
- GSAP (MagicBento particles)
- OGL (Prism WebGL backdrop)
- Lucide React (icons)

**Backend** *(in progress)*
- Python + FastAPI
- MongoDB (Motor async driver)
- OpenAI GPT-4 API (planned AI chatbot)

**Deployment** *(planned)*
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 📁 Project Structure

```
portfolio/
├── frontend/          React + Vite app
│   ├── src/
│   │   ├── components/   Reusable: Navbar, Footer, MagicBento, Prism, PhoneMockup, etc.
│   │   ├── data/         profile.js, projects.js (single source of truth)
│   │   ├── hooks/        useTheme, useScrollSpy
│   │   ├── pages/        Home, ProjectDetail, NotFound
│   │   └── sections/     About, Skills, Experience, Projects, Contact
│   └── public/         favicon.svg, og-image.svg
└── backend/           FastAPI server (in development)
```

---

## 🚀 Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
```

### Build for production

```bash
cd frontend
npm run build
npm run preview
```

### Backend

Stage 2 — coming soon.

---

## ✨ Featured frontend touches

- **Theme system** — CSS variables flip on a `.dark` class. A single `.theme-inverted` scope flips the variables again so the phone mockup always shows the opposite theme of the page.
- **Preloader** — animated 3D rotating cube + sparkles + sync'd progress bar (driven by a single MotionValue so width and `%` text never drift apart).
- **MagicBento Skills** — 6-card asymmetric grid with cursor spotlight, particle bloom, 3D tilt, magnetism, click ripple.
- **Prism backdrop** — WebGL 3D pyramid via OGL behind the hero, paused when offscreen.
- **AnimatedNumber** — stat count-ups using `useMotionValue` + DOM textContent subscription (robust across framer-motion versions).
- **Scroll spy** — IntersectionObserver-based active-link highlighting in the navbar.
- **Reduced motion** — global CSS media query disables animations + Lenis smooth scroll for users who prefer it.

---

## 👤 Author

**Marni Jayaram**
- 📍 Bangalore, India
- 💼 Software Engineer @ Revolution Labs
- 🧠 React Native · iOS · Android · AI Integration
- 📧 marnijayaram0707@gmail.com

---

## 📄 License

Personal project. Code is open for reference; assets and content are © Marni Jayaram.
