import { motion } from 'framer-motion';
import { Home, User, Briefcase, Mail, Search, Bell } from 'lucide-react';
import { profile } from '../data/profile';

// Floating language logos around the phone — same stack shown in the atom.
const FLOATING_TECH = [
  { name: 'React',        slug: 'react',       color: '61DAFB', pos: '-top-4 -left-8 sm:-left-12' },
  { name: 'JavaScript',   slug: 'javascript',  color: 'F7DF1E', pos: 'top-1/3 -right-8 sm:-right-12' },
  { name: 'Python',       slug: 'python',      color: '3776AB', pos: '-bottom-4 -left-6 sm:-left-10' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '06B6D4', pos: 'bottom-1/4 -right-6 sm:-right-10' },
];

// Project cards inside the phone screen — auto-scroll like a real feed.
const PROJECTS_IN_APP = [
  { title: 'Yolo & Bolo',  tag: 'React Native',  accent: 'bg-accent' },
  { title: 'Callvarse',    tag: 'VoIP · iOS',    accent: 'bg-accent/70' },
  { title: 'YoloAi',       tag: 'GPT-4 · Chat',  accent: 'bg-accent' },
  { title: 'Portfolio',    tag: 'React · Vite',  accent: 'bg-accent/70' },
];

// Mini message rows that look like notifications inside the phone
const MESSAGES = [
  { from: 'GitHub',   text: 'PR #42 merged ✓',     time: '2m' },
  { from: 'Vercel',   text: 'Build succeeded',     time: '5m' },
  { from: 'Slack',    text: 'New message · Team',  time: '12m' },
  { from: 'Linear',   text: '3 issues assigned',   time: '1h' },
];

function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{ perspective: 1200 }}
      className="relative w-56 h-[26rem] sm:w-64 sm:h-[28rem] md:w-72 md:h-[32rem] mx-auto"
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
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-navy rounded-full z-20 flex items-center justify-end pr-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
        </div>

        {/* SCREEN — theme-inverted: always shows the OPPOSITE of the page theme.
            Light page → dark mobile UI. Dark page → light mobile UI. */}
        <div className="theme-inverted absolute inset-3 rounded-[2rem] bg-navy overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-1.5 pb-1 text-[0.55rem] font-mono text-slate-light">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="text-[0.5rem]">●●●●</span>
              <span>5G</span>
              <span>🔋</span>
            </span>
          </div>

          {/* Header — avatar + name + bell */}
          <div className="px-4 pt-3 pb-2 flex items-center gap-2.5 border-b border-slate-dark/30">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-9 h-9 rounded-full border border-accent shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-[0.55rem] text-slate-light">Welcome back,</div>
              <div className="text-xs font-bold text-slate-lightest truncate">
                {profile.shortName} 👋
              </div>
            </div>
            <div className="relative w-7 h-7 rounded-lg bg-navy-light flex items-center justify-center">
              <Bell size={12} className="text-slate-light" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-accent" />
            </div>
          </div>

          {/* Search bar */}
          <div className="px-4 mt-3">
            <div className="flex items-center gap-2 h-7 bg-navy-light border border-slate-dark/40 rounded-lg px-2.5">
              <Search size={10} className="text-slate" />
              <span className="text-[0.55rem] font-mono text-slate">Search projects…</span>
            </div>
          </div>

          {/* Section label */}
          <div className="px-4 mt-3 flex items-center justify-between">
            <span className="text-[0.55rem] font-mono text-accent uppercase tracking-widest">
              My Projects
            </span>
            <span className="text-[0.55rem] text-slate">See all</span>
          </div>

          {/* Scrolling project list */}
          <div className="relative mx-4 mt-1.5 h-24 sm:h-28 overflow-hidden rounded-lg">
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-navy to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-navy to-transparent z-10 pointer-events-none" />
            <motion.div
              animate={{ y: ['0%', '-50%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="space-y-1.5"
            >
              {[...PROJECTS_IN_APP, ...PROJECTS_IN_APP].map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-navy-light border border-slate-dark/30 rounded-lg px-2 py-1.5"
                >
                  <div className={`w-7 h-7 rounded-md ${p.accent} shrink-0 flex items-center justify-center`}>
                    <span className="text-[0.55rem] font-bold text-navy">
                      {p.title[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.6rem] font-semibold text-slate-lightest truncate">
                      {p.title}
                    </div>
                    <div className="text-[0.5rem] font-mono text-slate truncate">
                      {p.tag}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Section label */}
          <div className="px-4 mt-2 flex items-center justify-between">
            <span className="text-[0.55rem] font-mono text-accent uppercase tracking-widest">
              Activity
            </span>
          </div>

          {/* Scrolling messages */}
          <div className="relative mx-4 mt-1.5 flex-1 overflow-hidden rounded-lg">
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-navy to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-navy to-transparent z-10 pointer-events-none" />
            <motion.div
              animate={{ y: ['0%', '-50%'] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="space-y-1.5"
            >
              {[...MESSAGES, ...MESSAGES].map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-navy-light border border-slate-dark/30 rounded-lg px-2 py-1.5"
                >
                  <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 shrink-0 flex items-center justify-center">
                    <span className="text-[0.5rem] font-bold text-accent">
                      {m.from[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.55rem] font-semibold text-slate-lightest">
                        {m.from}
                      </span>
                      <span className="text-[0.5rem] text-slate">{m.time}</span>
                    </div>
                    <div className="text-[0.5rem] text-slate-light truncate">
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom nav bar */}
          <div className="mx-4 mb-3 mt-2 bg-navy-light/90 backdrop-blur border border-slate-dark/40 rounded-2xl flex items-center justify-around py-2">
            <Home size={14} className="text-accent" />
            <User size={14} className="text-slate-light" />
            <Briefcase size={14} className="text-slate-light" />
            <Mail size={14} className="text-slate-light" />
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute -left-0.5 top-24 w-1 h-8 bg-slate-dark/60 rounded-l" />
        <div className="absolute -left-0.5 top-36 w-1 h-12 bg-slate-dark/60 rounded-l" />
        <div className="absolute -right-0.5 top-32 w-1 h-16 bg-slate-dark/60 rounded-r" />
      </motion.div>

      {/* Tiny twinkling sparkles around the phone */}
      {[
        { top: '5%',   left: '-12%', d: 1.6 },
        { top: '20%',  left: '108%', d: 1.8 },
        { top: '55%',  left: '-15%', d: 2.0 },
        { top: '70%',  left: '110%', d: 1.5 },
        { top: '90%',  left: '12%',  d: 1.7 },
        { top: '40%',  left: '105%', d: 1.9 },
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
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: 0.6 + i * 0.15 },
            scale: { duration: 0.5, delay: 0.6 + i * 0.15 },
            y: { duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 },
          }}
          whileHover={{ scale: 1.2 }}
          title={tech.name}
          className={`absolute ${tech.pos} w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14
                      rounded-xl bg-navy-light border border-accent/40 shadow-lg p-2
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
