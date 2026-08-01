import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowRight, Download, Briefcase, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Prism from '../components/Prism';
import PhoneMockup from '../components/PhoneMockup';
import AnimatedNumber from '../components/AnimatedNumber';
import StackSection from '../components/StackSection';
import VideoHero from '../components/VideoHero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';

function Home() {
  // Navbar is hidden by default. It appears WHILE you scroll (past the video),
  // then auto-hides ~2.5s after scrolling stops.
  const [navVisible, setNavVisible] = useState(false);

  // Buttery momentum scrolling (Lenis) — slow, premium, cinematic feel.
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // Let anchor clicks (#home, etc.) use Lenis smooth scroll.
    const onAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length > 1) {
        e.preventDefault();
        lenis.scrollTo(id, { offset: 0 });
      }
    };
    document.addEventListener('click', onAnchor);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onAnchor);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    let hideTimer;
    const onScroll = () => {
      const pastVideo = window.scrollY > window.innerHeight * 0.6;
      if (!pastVideo) {
        setNavVisible(false);
        return;
      }
      setNavVisible(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setNavVisible(false), 2500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-navy min-h-screen text-slate-lightest overflow-x-clip"
    >
      <Navbar forceHidden={!navVisible} />

      <main>
        {/* Section 0 — cinematic video intro (scroll past to enter the site) */}
        <VideoHero />

        {/* =========================== HERO =========================== */}
        <StackSection index={0} number="01" title="Home">
        <section
          id="home"
          className="relative overflow-hidden min-h-screen lg:min-h-full lg:h-full flex items-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:py-6"
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

              {/* Name — single line */}
              <h1 className="font-display font-extrabold text-slate-lightest text-[2rem] sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] leading-[1.05] tracking-tight mb-2 sm:mb-3 whitespace-nowrap">
                Marni <span className="text-accent">Jayaram</span>
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

              {/* Tech badges — single line */}
              <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-1.5 mb-5 sm:mb-7">
                {['React Native', 'JavaScript', 'Python', 'Tailwind', 'SQL'].map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                    className="px-2 py-1 rounded-md text-[0.6rem] sm:text-[0.7rem] font-mono whitespace-nowrap
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
        </StackSection>

        <StackSection index={1} number="02" title="About"><About /></StackSection>
        <StackSection index={2} number="03" title="Skills"><Skills /></StackSection>
        <StackSection index={3} number="04" title="Experience"><Experience /></StackSection>
        <StackSection index={4} number="05" title="Projects"><Projects /></StackSection>
        <StackSection index={5} number="06" title="Contact"><Contact /></StackSection>
      </main>

      <Footer />
    </motion.div>
  );
}

export default Home;
