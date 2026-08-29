import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Lock, ArrowUpRight } from 'lucide-react';
import { Github } from '../components/SocialIcons';
import { projects } from '../data/projects';
import { EASE_OUT } from '../lib/anim';

const GITHUB_URL = 'https://github.com/JAYARAM0707';

/* ── Panel content (pure JSX - no hooks) ─────────────────────────────────── */
function PanelContent({ project, index }) {
  return (
    <div className="w-full container-max section-padding relative">
      {/* Giant ghost index */}
      <span
        aria-hidden
        className="ghost-word hidden lg:block right-2 top-1/2 -translate-y-1/2 text-[20rem] xl:text-[26rem]"
      >
        0{index + 1}
      </span>

      <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT - identity */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10
                             px-3 py-1 text-xs font-mono uppercase tracking-wider text-accent">
              {project.featured && '★ '}{project.status}
            </span>
            {project.repoVisibility === 'private' && (
              <span className="flex items-center gap-1.5 text-xs font-mono text-slate">
                <Lock size={11} /> Private repo
              </span>
            )}
          </div>

          <h3 className="font-display font-black uppercase leading-[0.9] tracking-tight text-slate-lightest
                         text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
            {project.title}
          </h3>

          <p className="mt-5 text-lg sm:text-xl text-accent max-w-xl">{project.tagline}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Live Demo <ArrowUpRight size={16} />
              </a>
            )}
            <a href={project.repoUrl || GITHUB_URL} target="_blank" rel="noreferrer" className="btn-outline">
              <Github size={16} /> {project.repoVisibility === 'private' ? 'GitHub' : 'View Code'}
            </a>
          </div>
        </div>

        {/* RIGHT - detail */}
        <div className="lg:col-span-5">
          <p className="text-sm sm:text-base text-slate-light leading-relaxed">
            {project.description}
          </p>

          <ul className="mt-6 space-y-2.5">
            {project.contributions.map((c, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-light leading-relaxed">
                <span className="mt-2 h-1 w-1 rounded-full bg-accent shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-md border border-slate-dark/40 px-2.5 py-1 text-[0.7rem] font-mono text-slate">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Desktop pinned deck - scroll drives the active panel, AnimatePresence
      slides between them (robust: no out-of-range scroll transforms). ─────── */
function ProjectsDeck() {
  const ref = useRef(null);
  const n = projects.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const idx = Math.min(n - 1, Math.max(0, Math.floor(v * n - 1e-6)));
      setActive((prev) => (prev === idx ? prev : idx));
    });
    return () => unsub();
  }, [scrollYProgress, n]);

  // Progress bar width - input & output both within [0,1] (WAAPI-safe).
  const barScaleX = useTransform(scrollYProgress, [0, 1], [1 / n, 1]);

  const project = projects[active];

  return (
    <div ref={ref} style={{ height: `${n * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* ambient depth */}
        <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-40 mask-fade-edges" />
        <div aria-hidden className="absolute top-1/4 -right-20 w-[42rem] h-[42rem] rounded-full bg-accent/10 blur-[140px] pointer-events-none" />

        {/* header row - reserved top zone so panel content never overlaps it */}
        <div className="absolute top-0 inset-x-0 z-30 container-max section-padding pt-24 flex items-center justify-between">
          <span className="eyebrow">Selected Work</span>
          <span className="font-mono text-sm text-slate tracking-widest">
            <span className="text-accent">0{active + 1}</span>
            <span className="text-slate-dark"> / 0{n}</span>
          </span>
        </div>

        {/* active panel - inset below the header, above the progress bar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="absolute inset-x-0 top-32 bottom-12 z-10 flex items-center"
          >
            <PanelContent project={project} index={active} />
          </motion.div>
        </AnimatePresence>

        {/* progress bar */}
        <div className="absolute bottom-0 inset-x-0 z-20 h-[3px] bg-slate-dark/25">
          <motion.div style={{ scaleX: barScaleX }} className="h-full bg-accent origin-left" />
        </div>
      </div>
    </div>
  );
}

/* ── Mobile / tablet - clean stacked cards ───────────────────────────────── */
function ProjectsMobile() {
  return (
    <div className="section-padding container-max py-20">
      <p className="eyebrow mb-4">Selected Work</p>
      <h2 className="font-display font-black uppercase tracking-tight leading-[0.9] text-4xl sm:text-5xl text-slate-lightest mb-10">
        Featured <span className="text-outline">work</span>
      </h2>

      <div className="space-y-6">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_OUT }}
            className="rounded-2xl border border-slate-dark/40 bg-navy-light/40 p-6 sm:p-7"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10
                               px-3 py-1 text-[0.7rem] font-mono uppercase tracking-wider text-accent">
                {project.status}
              </span>
              <span className="font-display text-3xl font-light text-accent/25">0{i + 1}</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-slate-lightest leading-tight">{project.title}</h3>
            <p className="text-accent mt-1.5">{project.tagline}</p>
            <p className="mt-4 text-sm text-slate-light leading-relaxed">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="rounded-md border border-slate-dark/40 px-2.5 py-1 text-[0.7rem] font-mono text-slate">
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer"
        className="group mt-8 inline-flex items-center gap-2 font-mono text-sm text-slate-light hover:text-accent transition-colors"
      >
        More on GitHub
        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative">
      <div className="hidden lg:block">
        <ProjectsDeck />
      </div>
      <div className="lg:hidden">
        <ProjectsMobile />
      </div>
    </section>
  );
}

export default Projects;
