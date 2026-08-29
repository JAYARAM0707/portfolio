import { motion } from 'framer-motion';
import { Smartphone, Boxes, Code2, Wrench } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { EASE_OUT } from '../lib/anim';

// Categories mirror the resume's "Core Technical Skills" exactly.
const CATEGORIES = [
  {
    Icon: Smartphone,
    title: 'Mobile Development',
    skills: [
      { name: 'React Native', slug: 'react' },
      { name: 'Redux Toolkit', slug: 'redux' },
      { name: 'React Navigation', slug: 'reactrouter' },
      { name: 'Firebase', slug: 'firebase' },
      { name: 'Android', slug: 'android' },
      { name: 'iOS', slug: 'apple' },
      { name: 'Figma-to-Code', slug: 'figma' },
    ],
  },
  {
    Icon: Boxes,
    title: 'State & APIs',
    skills: [
      { name: 'Redux Toolkit', slug: 'redux' },
      { name: 'Axios', slug: 'axios' },
      { name: 'REST APIs' },
    ],
  },
  {
    Icon: Code2,
    title: 'Languages',
    skills: [
      { name: 'JavaScript (ES6+)', slug: 'javascript' },
      { name: 'Python', slug: 'python' },
      { name: 'HTML5', slug: 'html5' },
      { name: 'CSS3', slug: 'css3' },
    ],
  },
  {
    Icon: Wrench,
    title: 'Tools & Libraries',
    skills: [
      { name: 'Git', slug: 'git' },
      { name: 'GitHub', slug: 'github' },
      { name: 'Android Studio', slug: 'androidstudio' },
      { name: 'Xcode', slug: 'xcode' },
      { name: 'RN Debugger' },
    ],
  },
];

// Flattened + de-duped logos for the marquee strip.
const MARQUEE = (() => {
  const seen = new Set();
  const out = [];
  for (const c of CATEGORIES) {
    for (const s of c.skills) {
      if (s.slug && !seen.has(s.slug)) {
        seen.add(s.slug);
        out.push(s);
      }
    }
  }
  return out;
})();

// Twinkling stars revealed on card hover.
const STARS = [
  { top: '14%', left: '20%', d: 0 }, { top: '24%', left: '82%', d: 0.3 },
  { top: '62%', left: '12%', d: 0.6 }, { top: '76%', left: '72%', d: 0.2 },
  { top: '44%', left: '52%', d: 0.5 }, { top: '86%', left: '32%', d: 0.8 },
];

function HoverStars() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4], rotate: [0, 90, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: s.d, ease: 'easeInOut' }}
          style={{ top: s.top, left: s.left }}
          className="absolute text-accent text-sm leading-none drop-shadow-[0_0_5px_rgba(56,189,248,0.9)]"
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}

function SkillChip({ skill }) {
  return (
    <span className="group/chip inline-flex items-center gap-2 rounded-lg border border-slate-dark/40 bg-navy
                     px-3 py-1.5 text-sm font-mono text-slate-light
                     hover:border-accent hover:text-accent transition-colors duration-300">
      {skill.slug ? (
        <img
          src={`https://cdn.simpleicons.org/${skill.slug}`}
          alt=""
          aria-hidden
          className="w-4 h-4 opacity-80 group-hover/chip:opacity-100 transition-opacity"
          loading="lazy"
        />
      ) : (
        <span className="w-4 h-4 rounded-[3px] bg-accent/15 border border-accent/30 text-[0.5rem]
                         font-bold text-accent flex items-center justify-center">
          {skill.name[0]}
        </span>
      )}
      {skill.name}
    </span>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 lg:py-28">
      <div className="section-padding container-max">
        <SectionHeading
          index="03"
          eyebrow="Skills"
          title={<>The <span className="italic font-light text-accent">arsenal</span></>}
          description="The tools and technologies I reach for to ship production-grade mobile apps."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_OUT }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-dark/40 bg-navy-light/40
                         p-6 sm:p-7 transition-colors duration-300 hover:border-accent/60
                         hover:shadow-[0_0_35px_-6px_rgba(56,189,248,0.28)]"
            >
              <HoverStars />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20
                                    flex items-center justify-center text-accent
                                    group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                      <cat.Icon size={20} />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl text-slate-lightest">{cat.title}</h3>
                  </div>
                  <span className="font-mono text-xs text-slate-dark">0{i + 1}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <SkillChip key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-width tech marquee - fills the section with quiet motion */}
      <div className="relative mt-16 py-6 border-y border-slate-dark/25">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-navy to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-navy to-transparent pointer-events-none" />
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-12 w-max"
        >
          {[...MARQUEE, ...MARQUEE].map((s, i) => (
            <span key={i} className="flex items-center gap-3 shrink-0 opacity-60 hover:opacity-100 transition-opacity">
              <img src={`https://cdn.simpleicons.org/${s.slug}`} alt="" aria-hidden className="w-6 h-6" loading="lazy" />
              <span className="font-mono text-sm text-slate-light whitespace-nowrap">{s.name}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
