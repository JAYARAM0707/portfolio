import { motion } from 'framer-motion';
import { Star, Sparkles, ArrowUpRight, Lock } from 'lucide-react';
import { projects } from '../data/projects';

const GITHUB_URL = 'https://github.com/JAYARAM0707';

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative max-w-5xl mx-auto bg-navy-light border border-slate-dark/30 rounded-2xl
                 overflow-hidden hover:border-accent transition-all duration-500
                 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
    >
      {/* Red gradient top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent" />

      <div className="p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            {project.featured && (
              <span className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/40
                               text-accent text-xs font-mono uppercase tracking-wider px-3 py-1
                               rounded-full mb-4">
                <Star size={12} className="fill-accent" />
                Featured
              </span>
            )}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold
                           text-slate-lightest leading-tight">
              {project.title}
            </h3>
            <p className="text-base sm:text-lg text-slate-light mt-2">
              {project.tagline}
            </p>
            {project.company && (
              <p className="text-sm text-slate mt-1 font-mono">
                @ {project.company}
              </p>
            )}
          </div>

          {/* Right meta — visible at lg+ */}
          <div className="hidden lg:flex flex-col items-end gap-2 shrink-0">
            <span className="bg-navy border border-accent/40 px-3 py-1.5 rounded-full
                             text-xs font-mono text-slate-lightest flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              {project.status}
            </span>
            {project.repoVisibility === 'private' && (
              <span className="flex items-center gap-1.5 text-xs text-slate font-mono">
                <Lock size={12} />
                Private Repo
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="mt-6 sm:mt-8 text-sm sm:text-base text-slate-light leading-relaxed max-w-3xl">
          {project.description}
        </p>

        {/* Contributions */}
        <div className="mt-8">
          <p className="eyebrow mb-4">My Contributions</p>
          <ul className="space-y-3">
            {project.contributions.map((c, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span className="text-sm sm:text-base text-slate-light leading-relaxed">
                  {c}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tech chips */}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: 0.6 + i * 0.04,
                type: 'spring',
                stiffness: 220,
              }}
              className="bg-navy border border-slate-dark/40 rounded-md px-3 py-1.5
                         text-xs font-mono text-slate-light
                         hover:border-accent hover:text-accent transition-colors duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="section-padding container-max py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 md:mb-16"
      >
        <p className="eyebrow mb-3">Projects</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-lightest">
          Featured work I've <span className="text-accent">shipped</span>
        </h2>
      </motion.div>

      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}

      {/* "More coming soon" placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="max-w-3xl mx-auto mt-12 bg-navy-light/50 border-2 border-dashed
                   border-slate-dark/40 rounded-xl p-6 sm:p-8 text-center
                   hover:border-accent/40 transition-colors"
      >
        <Sparkles size={32} className="text-accent/60 mx-auto mb-3" />
        <h3 className="font-display font-bold text-xl text-slate-lightest mb-2">
          More projects coming soon
        </h3>
        <p className="text-sm text-slate max-w-md mx-auto">
          Currently building open-source experiments and documenting my
          learning journey on GitHub. Check back for new projects.
        </p>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-lg
                     border border-accent text-accent font-mono text-sm
                     hover:bg-accent/10 transition-colors duration-300"
        >
          View My GitHub
          <ArrowUpRight size={16} />
        </a>
      </motion.div>
    </section>
  );
}

export default Projects;
