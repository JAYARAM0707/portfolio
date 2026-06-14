import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';
import { Reveal } from '../components/Reveal';
import { EASE } from '../lib/anim';

// Add / edit your roles here — the timeline scales automatically.
const EXPERIENCE = [
  {
    role: 'Software Engineer — React Native',
    company: 'Revolution Labs Pvt. Ltd.',
    type: 'Full-time',
    date: 'Mar 2025 – Present',
    location: 'Bengaluru, India',
    current: true,
    bullets: [
      'Shipped 3+ production-grade mobile apps to the App Store & Play Store with React Native',
      'Built 5+ core modules — real-time VoIP calling, email sync, and calendar integration',
      'Translated 40+ high-fidelity Figma designs into pixel-perfect, responsive screens',
      'Integrated GPT-4 and AI-IVR systems for automated messaging & voice interactions',
    ],
    tech: ['React Native', 'Redux Toolkit', 'GPT-4', 'VoIP', 'iOS', 'Android'],
  },
  {
    role: 'Full Stack Web Development Intern',
    company: 'Bharath Intern',
    type: 'Internship',
    date: '2024',
    location: 'Remote',
    bullets: [
      'Built responsive web interfaces with HTML, CSS, and JavaScript',
      'Practiced full-stack fundamentals and REST API integration on real projects',
    ],
    tech: ['JavaScript', 'HTML5', 'CSS3', 'REST APIs'],
  },
];

function Experience() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 60%'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });

  return (
    <section
      id="experience"
      className="relative section-padding container-max py-24 md:py-32"
    >
      <SectionBackground variant="diagonal" />

      <Reveal className="mb-12 md:mb-16">
        <p className="eyebrow">Experience</p>
      </Reveal>

      {/* Timeline */}
      <div ref={trackRef} className="relative max-w-3xl mx-auto">
        {/* Track (background line) */}
        <div className="absolute left-3 top-1 bottom-1 w-px bg-slate-dark/40" />
        {/* Filled line — grows with scroll */}
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-3 top-1 bottom-1 w-px bg-accent origin-top shadow-[0_0_10px_rgba(56,189,248,0.7)]"
        />

        <div className="space-y-8 sm:space-y-10">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="relative pl-10 sm:pl-12">
              {/* Node */}
              <span className="absolute left-3 -translate-x-1/2 top-2 flex items-center justify-center">
                {exp.current && (
                  <span className="absolute h-4 w-4 rounded-full bg-accent opacity-60 animate-ping" />
                )}
                <span className="relative h-3.5 w-3.5 rounded-full border-2 border-accent bg-navy" />
              </span>

              {/* Card */}
              <Reveal delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="group relative bg-navy-light border border-slate-dark/30 rounded-xl
                             overflow-hidden hover:border-accent transition-colors duration-300
                             hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]"
                >
                  {/* accent top bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent" />

                  <div className="p-5 sm:p-7">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-display font-bold text-slate-lightest">
                          {exp.role}
                        </h3>
                        <p className="text-sm sm:text-base text-accent font-mono mt-0.5">
                          {exp.company}
                        </p>
                        <p className="text-xs text-slate font-mono mt-0.5">{exp.location}</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end shrink-0">
                        <span className="bg-navy border border-accent/40 text-accent text-[0.65rem] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full">
                          {exp.type}
                        </span>
                        <span className="text-xs text-slate-light font-mono mt-1.5">{exp.date}</span>
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul className="mt-4 sm:mt-5 space-y-2">
                      {exp.bullets.map((b, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.15 + j * 0.08, ease: EASE }}
                          className="flex gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          <span className="text-sm text-slate-light leading-relaxed">{b}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tech chips */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="bg-navy border border-slate-dark/40 rounded-md px-2.5 py-1
                                     text-[0.7rem] font-mono text-slate-light
                                     group-hover:border-accent/40 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
