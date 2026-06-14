import { motion } from 'framer-motion';
import { Home, User, Briefcase, Mail, Search, Bell } from 'lucide-react';
import { profile } from '../data/profile';

// Floating language logos around the phone.
const FLOATING_TECH = [
  { name: 'React',        slug: 'react',       color: '61DAFB', pos: '-top-4 -left-8 sm:-left-12' },
  { name: 'JavaScript',   slug: 'javascript',  color: 'F7DF1E', pos: 'top-1/3 -right-8 sm:-right-12' },
  { name: 'Python',       slug: 'python',      color: '3776AB', pos: '-bottom-4 -left-6 sm:-left-10' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '06B6D4', pos: 'bottom-1/4 -right-6 sm:-right-10' },
];

// Generic "what I do" rows — no company/product names (safe to display).
const APP_WORK = [
  { title: 'Mobile Development', tag: 'React Native · iOS · Android', accent: 'bg-accent' },
  { title: 'AI Integration',     tag: 'GPT-4 · Smart features',       accent: 'bg-accent/70' },
  { title: 'Real-time Systems',  tag: 'VoIP · Notifications',         accent: 'bg-accent' },
  { title: 'Web Apps',           tag: 'React · Tailwind',             accent: 'bg-accent/70' },
];

// Tech chips for the phone's "stack" strip.
const APP_STACK = ['React Native', 'JavaScript', 'Python', 'Tailwind', 'SQL'];

function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{ perspective: 1200 }}
      className="relative w-44 h-[23rem] sm:w-52 sm:h-[27rem] md:w-60 md:h-[31rem] lg:w-72 lg:h-[34rem] mx-auto my-2"
    >
      {/* Soft accent glow behind the phone */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-4 rounded-[3rem] bg-accent/25 blur-3xl pointer-events-none"
      />

      {/* Phone — continuous gentle 3D rotation */}
      <motion.div
        animate={{ rotateY: [-15, 15, -15], y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ rotateY: 0, scale: 1.04 }}
        style={{ transformStyle: 'preserve-3d', rotateX: 6 }}
        className="relative w-full h-full rounded-[2.5rem] bg-gradient-to-br
                   from-navy-lightest to-navy-light border-2 border-slate-dark/50
                   shadow-2xl shadow-accent/10 cursor-pointer"
      >
        {/* Dynamic island / notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 bg-navy rounded-full z-20 flex items-center justify-end pr-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
        </div>

        {/* SCREEN — theme-inverted: shows the OPPOSITE of the page theme.
            This is a generic mini "portfolio app" — no company/product data. */}
        <div className="theme-inverted absolute inset-2.5 sm:inset-3 rounded-[1.7rem] sm:rounded-[2rem] bg-navy overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="flex items-center justify-between px-4 pt-1.5 pb-1 text-[0.5rem] sm:text-[0.55rem] font-mono text-slate-light">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="text-[0.45rem]">●●●●</span>
              <span>5G</span>
            </span>
          </div>

          {/* Header — avatar + name + role */}
          <div className="px-3 sm:px-4 pt-2 pb-2 flex items-center gap-2 border-b border-slate-dark/30">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-accent shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-[0.55rem] sm:text-xs font-bold text-slate-lightest truncate">
                {profile.name}
              </div>
              <div className="text-[0.45rem] sm:text-[0.55rem] font-mono text-accent truncate">
                Mobile Developer
              </div>
            </div>
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-navy-light flex items-center justify-center shrink-0">
              <Bell size={11} className="text-slate-light" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-accent" />
            </div>
          </div>

          {/* Search bar */}
          <div className="px-3 sm:px-4 mt-2.5">
            <div className="flex items-center gap-2 h-6 sm:h-7 bg-navy-light border border-slate-dark/40 rounded-lg px-2">
              <Search size={10} className="text-slate shrink-0" />
              <span className="text-[0.5rem] sm:text-[0.55rem] font-mono text-slate truncate">Search…</span>
            </div>
          </div>

          {/* Section label */}
          <div className="px-3 sm:px-4 mt-2.5 mb-1">
            <span className="text-[0.5rem] sm:text-[0.55rem] font-mono text-accent uppercase tracking-widest">
              What I Build
            </span>
          </div>

          {/* Auto-scrolling capability cards */}
          <div className="relative mx-3 sm:mx-4 flex-1 overflow-hidden rounded-lg">
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-navy to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-navy to-transparent z-10 pointer-events-none" />
            <motion.div
              animate={{ y: ['0%', '-50%'] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
              className="space-y-1.5"
            >
              {[...APP_WORK, ...APP_WORK].map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-navy-light border border-slate-dark/30 rounded-lg px-2 py-1.5"
                >
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md ${p.accent} shrink-0 flex items-center justify-center`}>
                    <span className="text-[0.5rem] sm:text-[0.55rem] font-bold text-navy">
                      {p.title[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.55rem] sm:text-[0.6rem] font-semibold text-slate-lightest truncate">
                      {p.title}
                    </div>
                    <div className="text-[0.45rem] sm:text-[0.5rem] font-mono text-slate truncate">
                      {p.tag}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Tech stack chips */}
          <div className="px-3 sm:px-4 mt-2">
            <div className="flex flex-wrap gap-1">
              {APP_STACK.map((t) => (
                <span
                  key={t}
                  className="px-1.5 py-0.5 rounded text-[0.4rem] sm:text-[0.45rem] font-mono
                             bg-accent/10 border border-accent/30 text-accent"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom nav bar */}
          <div className="mx-3 sm:mx-4 mb-2.5 mt-2 bg-navy-light/90 backdrop-blur border border-slate-dark/40 rounded-2xl flex items-center justify-around py-1.5 sm:py-2">
            <Home size={13} className="text-accent" />
            <User size={13} className="text-slate-light" />
            <Briefcase size={13} className="text-slate-light" />
            <Mail size={13} className="text-slate-light" />
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute -left-0.5 top-24 w-1 h-8 bg-slate-dark/60 rounded-l" />
        <div className="absolute -left-0.5 top-36 w-1 h-12 bg-slate-dark/60 rounded-l" />
        <div className="absolute -right-0.5 top-32 w-1 h-16 bg-slate-dark/60 rounded-r" />
      </motion.div>

      {/* Tiny twinkling sparkles around the phone */}
      {[
        { top: '5%',  left: '-12%', d: 1.6 },
        { top: '20%', left: '108%', d: 1.8 },
        { top: '55%', left: '-15%', d: 2.0 },
        { top: '70%', left: '110%', d: 1.5 },
        { top: '90%', left: '12%',  d: 1.7 },
        { top: '40%', left: '105%', d: 1.9 },
      ].map((s, i) => (
        <motion.span
          key={`spark-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: s.d, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
          style={{ top: s.top, left: s.left }}
          className="absolute w-1 h-1 rounded-full bg-accent
                     shadow-[0_0_8px_rgba(56,189,248,1)] pointer-events-none z-0"
        />
      ))}

      {/* Floating tech logo badges around the phone */}
      {FLOATING_TECH.map((tech, i) => (
        <motion.div
          key={tech.slug}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.6 + i * 0.15 },
            scale: { duration: 0.5, delay: 0.6 + i * 0.15 },
            y: { duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 },
          }}
          whileHover={{ scale: 1.2 }}
          title={tech.name}
          className={`absolute ${tech.pos} w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14
                      rounded-xl bg-navy-light border border-accent/40 shadow-lg p-1.5 sm:p-2
                      cursor-pointer pointer-events-auto z-10
                      hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-shadow`}
        >
          <img
            src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
            alt={tech.name}
            className="w-full h-full"
            loading="lazy"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default PhoneMockup;
