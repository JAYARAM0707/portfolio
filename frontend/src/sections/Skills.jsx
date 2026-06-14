import { motion } from 'framer-motion';
import { Smartphone, Code2, Sparkles, Wrench } from 'lucide-react';
import SectionBackground from '../components/SectionBackground';
import SpotlightCard from '../components/SpotlightCard';

// Each skill: { name, slug } → logo from cdn.simpleicons.org/<slug>
const CATEGORIES = [
  {
    Icon: Smartphone,
    title: 'Mobile Development',
    skills: [
      { name: 'React Native', slug: 'react' },
      { name: 'iOS', slug: 'apple' },
      { name: 'Android', slug: 'android' },
      { name: 'React Navigation', slug: 'reactrouter' },
    ],
  },
  {
    Icon: Code2,
    title: 'Languages',
    skills: [
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'Python', slug: 'python' },
      { name: 'MySQL', slug: 'mysql' },
      { name: 'HTML5', slug: 'html5' },
      { name: 'CSS3', slug: 'css3' },
    ],
  },
  {
    Icon: Sparkles,
    title: 'AI & Backend',
    skills: [
      { name: 'OpenAI', slug: 'openai' },
      { name: 'Firebase', slug: 'firebase' },
      { name: 'REST APIs', slug: 'fastapi' },
      { name: 'Redux', slug: 'redux' },
    ],
  },
  {
    Icon: Wrench,
    title: 'Tools & Workflow',
    skills: [
      { name: 'Git', slug: 'git' },
      { name: 'GitHub', slug: 'github' },
      { name: 'Figma', slug: 'figma' },
      { name: 'Tailwind', slug: 'tailwindcss' },
      { name: 'VS Code', slug: 'visualstudiocode' },
    ],
  },
];

// Twinkling star particles that appear when a card is hovered.
const STAR_FIELD = [
  { top: '12%', left: '18%', size: 9,  delay: 0 },
  { top: '22%', left: '78%', size: 7,  delay: 0.3 },
  { top: '45%', left: '12%', size: 6,  delay: 0.6 },
  { top: '58%', left: '88%', size: 8,  delay: 0.2 },
  { top: '72%', left: '30%', size: 6,  delay: 0.5 },
  { top: '82%', left: '68%', size: 9,  delay: 0.8 },
  { top: '34%', left: '50%', size: 5,  delay: 1.0 },
  { top: '90%', left: '15%', size: 7,  delay: 0.4 },
];

function HoverStars() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
      {STAR_FIELD.map((s, i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4], rotate: [0, 90, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          style={{ top: s.top, left: s.left, fontSize: `${s.size}px` }}
          className="absolute text-accent leading-none drop-shadow-[0_0_4px_rgba(56,189,248,0.8)]"
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}

function Skills() {
  return (
    <section
      id="skills"
      className="relative section-padding container-max py-24 md:py-32"
    >
      <SectionBackground orbOpacity={0.22} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-10 md:mb-12"
      >
        <p className="eyebrow">Skills</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((cat, i) => (
          <SpotlightCard
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="group bg-navy-light border border-slate-dark/30 rounded-2xl p-6
                       hover:border-accent transition-all duration-300
                       hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]"
          >
            <HoverStars />

            {/* Category header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-lg bg-accent/10 border border-accent/20
                              flex items-center justify-center text-accent
                              group-hover:bg-accent/20 transition-colors">
                <cat.Icon size={20} />
              </div>
              <h3 className="text-base md:text-lg font-display font-bold text-slate-lightest">
                {cat.title}
              </h3>
            </div>

            {/* Logo + label rows */}
            <ul className="space-y-2.5">
              {cat.skills.map((skill, j) => (
                <motion.li
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 + j * 0.06 }}
                  whileHover={{ x: 4 }}
                  className="group/skill flex items-center gap-2.5 cursor-default"
                >
                  <span className="w-7 h-7 rounded-md bg-navy border border-slate-dark/40
                                   flex items-center justify-center p-1 shrink-0
                                   transition-all duration-300
                                   group-hover/skill:border-accent
                                   group-hover/skill:scale-110
                                   group-hover/skill:shadow-[0_0_12px_rgba(56,189,248,0.5)]">
                    <img
                      src={`https://cdn.simpleicons.org/${skill.slug}`}
                      alt={skill.name}
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </span>
                  <span className="text-sm font-mono text-slate-light transition-colors duration-300 group-hover/skill:text-accent">
                    {skill.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

export default Skills;
