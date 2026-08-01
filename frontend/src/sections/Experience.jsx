import { motion } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';
import { Reveal } from '../components/Reveal';
import { EASE } from '../lib/anim';

// Add / edit roles here — keep bullets short so the section stays one screen.
const EXPERIENCE = [
  {
    role: 'Software Engineer — React Native',
    company: 'Revolution Labs Pvt. Ltd.',
    type: 'Full-time',
    date: 'Mar 2025 – Present',
    current: true,
    bullets: [
      'Shipped 3+ production apps to App Store & Play Store with React Native',
      'Integrated GPT-4 / AI-IVR and built real-time VoIP, email & calendar modules',
    ],
    tech: ['React Native', 'Redux', 'GPT-4', 'VoIP'],
  },
  {
    role: 'Full Stack Web Development Intern',
    company: 'Bharath Intern',
    type: 'Internship',
    date: '2024',
    bullets: [
      'Built responsive web interfaces with HTML, CSS & JavaScript',
      'Practiced full-stack fundamentals and REST API integration',
    ],
    tech: ['JavaScript', 'HTML5', 'CSS3', 'REST APIs'],
  },
];

function Card({ exp }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="group relative bg-navy-light border border-slate-dark/30 rounded-xl overflow-hidden
                 hover:border-accent transition-colors duration-300
                 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)] text-left"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-display font-bold text-slate-lightest leading-tight">
              {exp.role}
            </h3>
            <p className="text-sm text-accent font-mono mt-0.5">{exp.company}</p>
          </div>
          <span className="bg-navy border border-accent/40 text-accent text-[0.6rem] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0">
            {exp.type}
          </span>
        </div>
        <p className="text-xs text-slate font-mono mt-1">{exp.date}</p>

        <ul className="mt-3 space-y-1.5">
          {exp.bullets.map((b, j) => (
            <li key={j} className="flex gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
              <span className="text-sm text-slate-light leading-snug">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {exp.tech.map((t) => (
            <span key={t} className="bg-navy border border-slate-dark/40 rounded px-2 py-0.5 text-[0.65rem] font-mono text-slate-light">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      className="relative section-padding container-max min-h-screen lg:min-h-full lg:h-full flex flex-col justify-center py-20 lg:py-6"
    >
      <SectionBackground variant="diagonal" />

      <Reveal className="mb-5 lg:mb-7">
        <p className="eyebrow">Experience</p>
      </Reveal>

      <div className="relative max-w-4xl mx-auto w-full">
        {/* Timeline line — left on mobile, centered on desktop. Draws in on view. */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE }}
          className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-0.5
                     bg-accent origin-top shadow-[0_0_10px_rgba(56,189,248,0.7)]"
        />

        <div className="space-y-8 lg:space-y-10">
          {EXPERIENCE.map((exp, i) => {
            const leftSide = i % 2 === 0;
            return (
              <div key={i} className="relative">
                {/* Node */}
                <span className="absolute left-4 lg:left-1/2 -translate-x-1/2 top-3 z-10 flex items-center justify-center">
                  {exp.current && (
                    <span className="absolute h-4 w-4 rounded-full bg-accent opacity-60 animate-ping" />
                  )}
                  <span className="relative h-3.5 w-3.5 rounded-full border-2 border-accent bg-navy" />
                </span>

                {/* Card — mobile: right of left line; desktop: alternating sides */}
                <div
                  className={`pl-10 lg:pl-0 lg:w-1/2 ${
                    leftSide
                      ? 'lg:pr-10 lg:mr-auto'
                      : 'lg:pl-10 lg:ml-auto'
                  }`}
                >
                  <Reveal delay={i * 0.05}>
                    <Card exp={exp} />
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Experience;
