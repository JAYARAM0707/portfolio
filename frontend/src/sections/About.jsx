import { motion } from 'framer-motion';
import SectionBackground from '../components/SectionBackground';
import { Github, Linkedin, Instagram } from '../components/SocialIcons';
import { profile } from '../data/profile';

const KEYWORDS = [
  'Mobile Developer', 'React Native', 'iOS', 'Android', 'JavaScript',
  'Python', 'SQL', 'AI Integration', 'GPT-4', 'VoIP', 'Redux Toolkit',
  'Figma to Code', 'Problem Solver',
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
  ['I', 0], ['turn', 0], ['complex', 0], ['Figma', 0], ['designs', 0],
  ['into', 0], ['responsive', 0], ['screens', 0], ['and', 0], ['care', 0],
  ['about', 0], ['clean,', 0], ['maintainable', 0], ['code.', 0],
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
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
      className="relative section-padding container-max min-h-screen lg:min-h-full lg:h-full flex flex-col justify-center py-20 lg:py-6"
    >
      <SectionBackground />

      <div className="grid grid-cols-1 lg:grid-cols-[18rem_minmax(0,1fr)] gap-8 lg:gap-14 items-center">

        {/* LEFT — portrait + socials */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center lg:items-start"
        >
          <div className="relative w-56 h-72 sm:w-64 sm:h-[24rem] rounded-3xl overflow-hidden
                          border border-slate-dark/40 bg-navy-light shadow-2xl shadow-accent/10">
            <img
              src={profile.photo || profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

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

          {/* Keyword marquee */}
          <div className="relative overflow-hidden mb-6 w-full">
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

          {/* Reading-focus bio */}
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
    </section>
  );
}

export default About;
