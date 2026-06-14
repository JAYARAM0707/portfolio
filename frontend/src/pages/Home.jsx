import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Briefcase, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Prism from '../components/Prism';
import PhoneMockup from '../components/PhoneMockup';
import AnimatedNumber from '../components/AnimatedNumber';
import VideoHero from '../components/VideoHero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';

function Home() {
  // Navbar stays hidden while the video intro fills the screen; it appears
  // once the user scrolls ~60% past the video section.
  const [pastIntro, setPastIntro] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastIntro(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-navy min-h-screen text-slate-lightest overflow-x-hidden"
    >
      <Navbar forceHidden={!pastIntro} />

      <main>
        {/* Section 0 — cinematic video intro (scroll past to enter the site) */}
        <VideoHero />

        {/* =========================== HERO =========================== */}
        <section
          id="home"
          className="relative overflow-hidden min-h-screen flex items-center pt-24 pb-12 sm:pt-28 sm:pb-16"
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

            {/* LEFT COLUMN — text (always first, incl. mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="order-1 text-center lg:text-left"
            >
              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-sm sm:text-base text-accent mb-2"
              >
                Hi, I'm
              </motion.p>

              {/* Name — the hero of the hero */}
              <h1 className="font-display font-extrabold text-slate-lightest text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.5rem] leading-[1] tracking-tight mb-2 sm:mb-3">
                Marni{' '}
                <span className="text-accent">Jayaram</span>
              </h1>

              {/* Role */}
              <p className="font-display font-bold text-lg sm:text-2xl md:text-3xl text-slate-light mb-3 sm:mb-4">
                Mobile App Developer
              </p>

              {/* Two separate availability banners (like the reference) */}
              <div className="flex flex-col sm:flex-row items-stretch justify-center lg:justify-start gap-3 mb-5 sm:mb-6 max-w-xl mx-auto lg:mx-0">
                {/* Banner 1 — freelance & full-time */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex-1 text-left bg-navy-light/80 backdrop-blur-sm
                             border border-slate-dark/40 rounded-xl p-4 shadow-lg shadow-accent/5"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Briefcase size={15} className="text-accent shrink-0" />
                    <span className="text-sm font-semibold text-slate-lightest">Freelance &amp; Full-time</span>
                  </div>
                  <p className="text-xs font-mono text-slate leading-relaxed">
                    Open to new opportunities and collaborations.
                  </p>
                </motion.div>

                {/* Banner 2 — available + location */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex-1 text-left bg-navy-light/80 backdrop-blur-sm
                             border border-accent/30 rounded-xl p-4 shadow-lg shadow-accent/10"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    <span className="text-sm font-semibold text-slate-lightest">Available for work</span>
                  </div>
                  <p className="flex items-center gap-1.5 text-xs font-mono text-slate">
                    <Globe size={12} className="text-accent shrink-0" />
                    India · Worldwide
                  </p>
                </motion.div>
              </div>

              <p className="text-slate-light text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-4 sm:mb-5 leading-relaxed">
                Building production-grade React Native apps with{' '}
                <span className="text-accent font-semibold">GPT-4</span>{' '}
                integrations and real-time modules at{' '}
                <span className="text-slate-lightest font-semibold">Revolution Labs</span>.
              </p>

              {/* Tech badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-5 sm:mb-7">
                {['React Native', 'React.js', 'JavaScript', 'Python', 'Tailwind', 'SQL'].map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                    className="px-2.5 py-1 rounded-md text-[0.7rem] sm:text-xs font-mono
                               bg-navy-light border border-slate-dark/40
                               text-slate-light hover:border-accent hover:text-accent
                               transition-colors duration-300"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6 sm:mb-9">
                <a href="#projects" className="btn-primary">
                  View Projects
                  <ArrowRight size={16} />
                </a>
                <a href="/resume.pdf" download className="btn-outline">
                  <Download size={16} />
                  Download CV
                </a>
              </div>

              {/* Compact stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md mx-auto lg:mx-0">
                {[
                  { value: 1, suffix: '+', label: 'Years Experience' },
                  { value: 3, suffix: '+', label: 'Projects Shipped' },
                  { value: 10, suffix: '+', label: 'Technologies' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-accent">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[0.7rem] sm:text-xs text-slate mt-1 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>

            {/* RIGHT COLUMN — 3D phone mockup (visible on mobile + desktop) */}
            <div className="order-2 flex items-center justify-center relative">
              <PhoneMockup />
            </div>
          </div>
          </div>

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
