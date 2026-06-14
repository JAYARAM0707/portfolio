import { motion } from 'framer-motion';
import { Smartphone, Sparkles, Radio, Code2 } from 'lucide-react';
import SectionBackground from '../components/SectionBackground';
import SpotlightCard from '../components/SpotlightCard';
import { Github, Linkedin, Instagram } from '../components/SocialIcons';
import { profile } from '../data/profile';

const HIGHLIGHTS = [
  {
    Icon: Smartphone,
    title: 'Mobile Development',
    desc: 'Cross-platform iOS & Android apps with React Native, shipped to production.',
  },
  {
    Icon: Sparkles,
    title: 'AI Integration',
    desc: 'GPT-4 APIs and AI-IVR systems for intelligent, automated experiences.',
  },
  {
    Icon: Radio,
    title: 'Real-time Systems',
    desc: 'VoIP calling, email sync, push notifications and calendar modules.',
  },
  {
    Icon: Code2,
    title: 'Clean Engineering',
    desc: 'Pixel-perfect Figma-to-code, Redux state management, smooth UX.',
  },
];

const KEYWORDS = [
  'Mobile Developer',
  'React Native',
  'iOS',
  'Android',
  'JavaScript',
  'Python',
  'SQL',
  'AI Integration',
  'GPT-4',
  'VoIP',
  'Redux Toolkit',
  'Figma to Code',
  'Problem Solver',
];

// Bio as words, with accent flags. Each word brightens in sequence (reading focus).
const BIO_WORDS = [
  ['Mobile', 1], ['App', 1], ['Developer', 1], ['with', 0], ['1+', 1], ['year', 1],
  ['building', 0], ['production-grade', 0], ['iOS', 0], ['&', 0], ['Android', 0],
  ['apps', 0], ['in', 0], ['React', 1], ['Native.', 1],
  ['At', 0], ['Revolution', 1], ['Labs', 1], ['I', 0], ['ship', 0], ['real', 0],
  ['apps,', 0], ['integrate', 0], ['GPT-4,', 1], ['and', 0], ['build', 0],
  ['real-time', 0], ['VoIP', 0], ['&', 0], ['calendar', 0], ['features', 0],
  ['with', 0], ['pixel-perfect', 0], ['UI.', 0],
  ['I', 0], ['translate', 0], ['complex', 0], ['Figma', 0], ['designs', 0],
  ['into', 0], ['responsive', 0], ['screens', 0], ['and', 0], ['care', 0],
  ['about', 0], ['clean,', 0], ['maintainable', 0], ['code.', 0],
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};
const wordVariants = {
  hidden: { opacity: 0.15 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
};

const socials = [
  { name: 'GitHub', href: profile.social.github, Icon: Github },
  { name: 'LinkedIn', href: profile.social.linkedin, Icon: Linkedin },
  { name: 'Instagram', href: profile.social.instagram, Icon: Instagram },
];

function About() {
  return (
    <section
      id="about"
      className="relative section-padding container-max py-24 md:py-32"
    >
      <SectionBackground />

      <div className="grid grid-cols-1 lg:grid-cols-[18rem_minmax(0,1fr)] gap-10 lg:gap-14 items-center">

        {/* LEFT — portrait + signature + socials */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center lg:items-start"
        >
          <div className="relative w-60 h-80 sm:w-72 sm:h-[26rem] rounded-3xl overflow-hidden
                          border border-slate-dark/40 bg-navy-light shadow-2xl shadow-accent/10">
            <img
              src={profile.photo || profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2 mt-5">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="w-10 h-10 rounded-lg bg-navy-light border border-slate-dark/40
                           flex items-center justify-center text-slate-light
                           hover:text-accent hover:border-accent transition-colors duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — who I am + keywords + bold bio */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="min-w-0"
        >
          <p className="eyebrow mb-4">Who I Am</p>

          {/* Keyword tags — single-line horizontal marquee */}
          <div className="relative overflow-hidden mb-6 w-full">
            {/* edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="flex items-center gap-3 w-max whitespace-nowrap"
            >
              {[...KEYWORDS, ...KEYWORDS].map((k, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span className="text-[0.7rem] sm:text-xs font-mono uppercase tracking-wider text-slate">
                    {k}
                  </span>
                  <span className="text-accent/50 text-xs">·</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Big bold bio — words brighten one after another (reading focus) */}
          <motion.p
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-lg sm:text-xl md:text-2xl font-display font-bold leading-relaxed flex flex-wrap gap-x-[0.3em]"
          >
            {BIO_WORDS.map(([word, accent], i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className={accent ? 'text-accent' : 'text-slate-lightest'}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Education line */}
          <p className="mt-6 text-sm font-mono text-slate">
            🎓 B.Tech CSE · Presidency University, Bengaluru · 8.01 CGPA
          </p>
        </motion.div>
      </div>

      {/* What I do — highlight cards (fills the section) */}
      <div className="mt-14 md:mt-20">
        <p className="eyebrow mb-6 text-center lg:text-left">What I Do</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {HIGHLIGHTS.map((h, i) => (
            <SpotlightCard
              key={h.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-navy-light border border-slate-dark/30 rounded-xl p-5 sm:p-6
                         hover:border-accent transition-all duration-300
                         hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]"
            >
              <div className="w-11 h-11 rounded-lg bg-accent/10 border border-accent/20
                              flex items-center justify-center text-accent mb-4
                              group-hover:bg-accent/20 transition-colors">
                <h.Icon size={20} />
              </div>
              <h3 className="text-base md:text-lg font-display font-bold text-slate-lightest mb-1.5">
                {h.title}
              </h3>
              <p className="text-sm text-slate leading-relaxed">{h.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
