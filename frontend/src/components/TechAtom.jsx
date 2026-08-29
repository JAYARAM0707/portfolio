import { motion } from 'framer-motion';
import { profile } from '../data/profile';

// Atom-style 2-orbit composition. Avatar is the nucleus.
// Languages I actually work with - React.js + React Native share the React logo.
const ORBIT_OUTER = [
  { name: 'React',      slug: 'react',      color: '61DAFB' },  // React.js + React Native
  { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
  { name: 'Python',     slug: 'python',     color: '3776AB' },
  { name: 'HTML5',      slug: 'html5',      color: 'E34F26' },
];

const ORBIT_INNER = [
  { name: 'CSS3',         slug: 'css3',         color: '1572B6' },
  { name: 'Tailwind CSS', slug: 'tailwindcss',  color: '06B6D4' },
  { name: 'MySQL',        slug: 'mysql',        color: '4479A1' },  // SQL
];

const OUTER_DURATION = 26;
const INNER_DURATION = 20;

function TechAtom() {
  return (
    <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem] mx-auto">
      {/* Soft pulsing aura */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-6 rounded-full bg-accent/25 blur-3xl pointer-events-none"
      />

      {/* Outer orbit guide ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-accent/20 pointer-events-none" />

      {/* Inner orbit guide ring - tilted */}
      <div
        className="absolute inset-10 sm:inset-12 md:inset-14 rounded-full border border-dashed border-accent/15 pointer-events-none"
        style={{ transform: 'rotate(35deg)' }}
      />

      {/* OUTER ORBIT - clockwise */}
      {ORBIT_OUTER.map((tech, i) => {
        const startAngle = (360 / ORBIT_OUTER.length) * i;
        return (
          <motion.div
            key={`outer-${tech.slug}`}
            initial={{ rotate: startAngle }}
            animate={{ rotate: startAngle + 360 }}
            transition={{ duration: OUTER_DURATION, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ rotate: -startAngle }}
                animate={{ rotate: -startAngle - 360 }}
                transition={{ duration: OUTER_DURATION, repeat: Infinity, ease: 'linear' }}
                whileHover={{ scale: 1.25 }}
                title={tech.name}
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl
                           bg-navy-light border border-slate-dark/40 shadow-lg
                           p-2 pointer-events-auto cursor-pointer
                           transition-shadow hover:shadow-[0_0_20px_rgba(56,189,248,0.6)]"
              >
                <img
                  src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                  alt={tech.name}
                  className="w-full h-full"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
        );
      })}

      {/* INNER ORBIT - tilted plane, counter-clockwise */}
      <div
        className="absolute inset-10 sm:inset-12 md:inset-14"
        style={{ transform: 'rotate(35deg)' }}
      >
        {ORBIT_INNER.map((tech, i) => {
          const startAngle = (360 / ORBIT_INNER.length) * i;
          return (
            <motion.div
              key={`inner-${tech.slug}`}
              initial={{ rotate: startAngle }}
              animate={{ rotate: startAngle - 360 }}
              transition={{ duration: INNER_DURATION, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  initial={{ rotate: -startAngle - 35 }}
                  animate={{ rotate: -startAngle - 35 + 360 }}
                  transition={{ duration: INNER_DURATION, repeat: Infinity, ease: 'linear' }}
                  whileHover={{ scale: 1.25 }}
                  title={tech.name}
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl
                             bg-navy-light border border-slate-dark/40 shadow-lg
                             p-1.5 sm:p-2 pointer-events-auto cursor-pointer
                             transition-shadow hover:shadow-[0_0_18px_rgba(56,189,248,0.5)]"
                >
                  <img
                    src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                    alt={tech.name}
                    className="w-full h-full"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Avatar - nucleus */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute inset-16 sm:inset-20 md:inset-24 rounded-full overflow-hidden
                   border-2 border-accent bg-navy-light
                   shadow-[0_0_50px_rgba(56,189,248,0.5)]"
      >
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Floating "Available" pill */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 sm:bottom-8 right-2 sm:right-4 bg-navy-light border border-accent/40 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2 shadow-lg"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-xs sm:text-sm font-medium text-slate-lightest">Available</span>
      </motion.div>
    </div>
  );
}

export default TechAtom;
