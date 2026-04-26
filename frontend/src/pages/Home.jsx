import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedNumber from '../components/AnimatedNumber';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import { profile } from '../data/profile';

const ROTATING_TAGLINES = [
  'mobile experiences',
  'AI integrations',
  'scalable systems',
  'production apps',
];

function Home() {
  const [taglineIdx, setTaglineIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setTaglineIdx((i) => (i + 1) % ROTATING_TAGLINES.length),
      2500
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-navy min-h-screen text-slate-lightest overflow-x-hidden">
      <Navbar />

      <main>
        {/* =========================== HERO =========================== */}
        <section
          id="home"
          className="relative overflow-hidden min-h-screen flex items-center pt-24 pb-24 sm:pt-28 sm:pb-28"
        >
          {/* Drifting gradient orbs — depth behind hero */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[15%] left-[8%] w-72 h-72 rounded-full bg-accent/20 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[15%] right-[8%] w-96 h-96 rounded-full bg-accent/15 blur-3xl"
            />
            <motion.div
              animate={{ x: [-30, 30, -30], y: [0, -25, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-accent/10 blur-3xl"
            />
          </div>

          {/* Content wrapper */}
          <div className="container-max section-padding w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-16 w-full">

            {/* LEFT COLUMN — text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1 text-center lg:text-left"
            >
              <p className="eyebrow mb-3 sm:mb-4">Software Engineer</p>

              <h1 className="font-display font-extrabold text-slate-lightest text-[2.25rem] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-4 sm:mb-5 break-words">
                {profile.shortName}{' '}
                <span className="text-accent">
                  {profile.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>

              {/* Rotating tagline */}
              <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-slate-light mb-5 sm:mb-6 h-[1.4em] flex items-baseline justify-center lg:justify-start gap-2 flex-wrap">
                <span>I build</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_TAGLINES[taglineIdx]}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="inline-block text-accent"
                  >
                    {ROTATING_TAGLINES[taglineIdx]}.
                  </motion.span>
                </AnimatePresence>
              </div>

              <p className="text-slate-light text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
                Software Engineer at{' '}
                <span className="text-slate-lightest font-semibold">Revolution Labs</span>{' '}
                shipping production-grade React Native apps with{' '}
                <span className="text-slate-lightest font-semibold">AI integrations</span>{' '}
                and real-time backend modules.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a href="#projects" className="btn-primary">
                  View Projects
                  <ArrowRight size={16} />
                </a>
                <a href="/resume.pdf" download className="btn-outline">
                  <Download size={16} />
                  Download Resume
                </a>
              </div>

              {/* Stats row — count up when in view */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-10 mt-10 sm:mt-14 max-w-xl mx-auto lg:mx-0">
                {[
                  { value: 1, suffix: '+', label: 'Years Experience' },
                  { value: 10, suffix: '+', label: 'Projects Shipped' },
                  { value: 5, suffix: '+', label: 'Technologies' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-accent">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[0.7rem] sm:text-xs md:text-sm text-slate mt-1 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT COLUMN — portrait with decorative rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 flex items-center justify-center relative"
            >
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] xl:w-96 xl:h-96">
                {/* Soft pulsing aura */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.55, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-4 rounded-full bg-accent/25 blur-3xl pointer-events-none"
                />

                {/* Wireframe sphere — rotates clockwise */}
                <motion.svg
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                  viewBox="-100 -100 200 200"
                  className="absolute inset-0 w-full h-full pointer-events-none text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                >
                  <circle cx="0" cy="0" r="95" opacity="0.45" />
                  {[0, 30, 60, 90, 120, 150].map((rot) => (
                    <ellipse
                      key={`outer-${rot}`}
                      cx="0" cy="0"
                      rx="95" ry="38"
                      opacity="0.5"
                      transform={`rotate(${rot})`}
                    />
                  ))}
                </motion.svg>

                {/* Inner wireframe layer — counter-rotates, dashed */}
                <motion.svg
                  animate={{ rotate: -360 }}
                  transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                  viewBox="-100 -100 200 200"
                  className="absolute inset-0 w-full h-full pointer-events-none text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.4"
                  strokeDasharray="2 3"
                >
                  {[15, 75, 135].map((rot) => (
                    <ellipse
                      key={`inner-${rot}`}
                      cx="0" cy="0"
                      rx="88" ry="22"
                      opacity="0.55"
                      transform={`rotate(${rot})`}
                    />
                  ))}
                </motion.svg>

                {/* Avatar inside a clean red ring with hover scale */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute inset-6 sm:inset-8 rounded-full overflow-hidden
                             border-2 border-accent bg-navy-light
                             shadow-[0_0_50px_rgba(239,68,68,0.5)]"
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
                  className="absolute bottom-0 right-0 sm:-bottom-2 sm:-right-2 bg-navy-light border border-accent/40 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2 shadow-lg"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-lightest">Available</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
          </div>

          {/* Scroll-down indicator */}
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            aria-label="Scroll to next section"
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10
                       flex flex-col items-center gap-1.5 text-slate hover:text-accent
                       transition-colors duration-300"
          >
            <span className="text-[0.65rem] sm:text-xs font-mono uppercase tracking-[0.3em]">
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <ChevronDown size={20} />
            </motion.span>
          </motion.a>
        </section>

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects />

        {/* Contact Section */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
