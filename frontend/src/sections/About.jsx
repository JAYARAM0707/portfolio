import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from '../components/SocialIcons';
import { profile } from '../data/profile';
import { EASE_OUT } from '../lib/anim';

const KEYWORDS = [
  'React Native', 'iOS', 'Android', 'JavaScript', 'Python', 'Redux Toolkit',
  'Firebase', 'VoIP', 'REST APIs', 'Figma to Code', 'Clean Architecture',
];

// Bio as words, with accent flags - each brightens in sequence (reading focus).
const BIO_WORDS = [
  ['Mobile', 1], ['App', 1], ['Developer', 1], ['with', 0], ['1+', 1], ['year', 1],
  ['building', 0], ['production-grade', 0], ['iOS', 0], ['&', 0], ['Android', 0],
  ['apps', 0], ['in', 0], ['React', 1], ['Native.', 1], ['At', 0], ['Revolution', 1],
  ['Labs', 1], ['I', 0], ['ship', 0], ['real', 0], ['apps,', 0], ['integrate', 0],
  ['GPT-4,', 1], ['and', 0], ['build', 0], ['real-time', 0], ['VoIP', 0], ['&', 0],
  ['calendar', 0], ['features', 0], ['with', 0], ['pixel-perfect', 0], ['UI.', 0],
  ['I', 0], ['care', 0], ['about', 0], ['clean,', 0], ['maintainable', 0], ['code.', 0],
];

const FACTS = [
  { label: 'Experience', value: '1+ Years' },
  { label: 'Education', value: 'B.Tech CSE' },
  { label: 'Location', value: 'Bengaluru' },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.035 } } };
const wordVariants = {
  hidden: { opacity: 0.16 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
};

const socials = [
  { name: 'GitHub', href: profile.social.github, Icon: Github },
  { name: 'LinkedIn', href: profile.social.linkedin, Icon: Linkedin },
  { name: 'Instagram', href: profile.social.instagram, Icon: Instagram },
];

function About() {
  return (
    <section id="about" className="relative section-padding container-max py-24 lg:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-[20rem_minmax(0,1fr)] gap-12 lg:gap-16 items-center">

        {/* LEFT - portrait + socials + facts */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="mx-auto lg:mx-0 w-full max-w-xs"
        >
          <div className="relative group">
            {/* offset accent frame */}
            <div aria-hidden className="absolute -inset-2.5 rounded-3xl border border-accent/25 translate-x-3 translate-y-3
                                        transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-dark/40 bg-navy-light shadow-2xl shadow-accent/10">
              <img src={profile.photo || profile.avatar} alt={profile.name}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-5">
            {socials.map(({ name, href, Icon }) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}
                 className="w-10 h-10 rounded-lg bg-navy-light border border-slate-dark/40 flex items-center justify-center
                            text-slate-light hover:text-accent hover:border-accent hover:-translate-y-0.5 transition-all duration-300">
                <Icon size={18} />
              </a>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-dark/30 pt-5">
            {FACTS.map((f) => (
              <div key={f.label}>
                <div className="text-sm sm:text-base font-display font-semibold text-slate-lightest leading-tight">{f.value}</div>
                <div className="font-mono text-[0.6rem] uppercase tracking-wider text-slate mt-1">{f.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT - who I am + keywords + reading bio */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
          className="min-w-0"
        >
          <p className="eyebrow mb-5">
            <span className="text-slate-dark mr-2">02</span> Who I Am
          </p>

          {/* Keyword marquee */}
          <div className="relative overflow-hidden mb-8 w-full">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="flex items-center gap-3 w-max whitespace-nowrap"
            >
              {[...KEYWORDS, ...KEYWORDS].map((k, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate">{k}</span>
                  <span className="text-accent/50 text-xs">✦</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Reading-focus bio */}
          <motion.p
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-xl sm:text-2xl md:text-[1.7rem] font-display font-semibold leading-snug flex flex-wrap gap-x-[0.28em] gap-y-1"
          >
            {BIO_WORDS.map(([word, accent], i) => (
              <motion.span key={i} variants={wordVariants}
                           className={accent ? 'text-accent' : 'text-slate-lightest'}>
                {word}
              </motion.span>
            ))}
          </motion.p>

          <p className="mt-8 text-sm font-mono text-slate">
            🎓 B.Tech CSE · Presidency University, Bengaluru · 8.01 CGPA
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
