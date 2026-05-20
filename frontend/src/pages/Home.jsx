import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Prism from '../components/Prism';
import PhoneMockup from '../components/PhoneMockup';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-navy min-h-screen text-slate-lightest overflow-x-hidden"
    >
      <Navbar />

      <main>
        {/* =========================== HERO =========================== */}
        <section
          id="home"
          className="relative overflow-hidden min-h-screen flex items-center pt-24 pb-24 sm:pt-28 sm:pb-28"
        >
          {/* Prism — 3D WebGL background accent */}
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <Prism
              animationType="rotate"
              timeScale={0.3}
              height={3.5}
              baseWidth={5.5}
              scale={4.5}
              hueShift={0}
              colorFrequency={0.8}
              noise={0.25}
              glow={0.8}
              bloom={0.9}
              suspendWhenOffscreen
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
              {/* Status pill */}
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           bg-accent/10 border border-accent/40 mb-5 sm:mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-accent">
                  Available for Work
                </span>
              </motion.span>

              {/* Role as the headline — two-line, big like the reference */}
              <h1 className="font-display font-extrabold text-slate-lightest text-[2.5rem] sm:text-6xl md:text-7xl lg:text-7xl xl:text-[5.5rem] leading-[1] tracking-tight mb-3 sm:mb-4">
                Mobile App<br />
                <span className="text-accent">Developer</span>
              </h1>

              {/* Specialty subtitle */}
              <p className="font-mono text-sm sm:text-base text-slate-light mb-5 sm:mb-6">
                React Native · iOS · Android · AI Integration
              </p>

              <p className="text-slate-light text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-7 leading-relaxed">
                Building production-grade React Native apps with{' '}
                <span className="text-accent font-semibold">GPT-4</span>{' '}
                integrations and real-time modules at{' '}
                <span className="text-slate-lightest font-semibold">Revolution Labs</span>.
              </p>

              {/* Tech badges — small inline */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-7">
                {['React Native', 'React.js', 'JavaScript', 'Python', 'Tailwind', 'SQL'].map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.5 + i * 0.06 }}
                    className="px-2.5 py-1 rounded-md text-[0.7rem] sm:text-xs font-mono
                               bg-navy-light border border-slate-dark/40
                               text-slate-light hover:border-accent hover:text-accent
                               transition-colors duration-300"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

            </motion.div>

            {/* RIGHT COLUMN — 3D phone mockup */}
            <div className="order-1 lg:order-2 flex items-center justify-center relative">
              <PhoneMockup />
            </div>
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
    </motion.div>
  );
}

export default Home;
