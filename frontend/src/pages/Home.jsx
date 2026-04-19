import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Navbar from '../components/Navbar';

const AVATAR_URL = 'https://api.dicebear.com/9.x/avataaars/svg?seed=MarniJayaram';

function Home() {
  return (
    <div className="bg-navy min-h-screen text-slate-lightest overflow-x-hidden">
      <Navbar />

      <main>
        {/* =========================== HERO =========================== */}
        <section
          id="home"
          className="min-h-screen flex items-center section-padding container-max pt-24 pb-16 sm:pt-28 sm:pb-20"
        >
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
                Marni{' '}
                <span className="text-accent">Jayaram</span>
              </h1>

              <p className="text-slate-light text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
                Building intelligent mobile experiences with{' '}
                <span className="text-slate-lightest font-semibold">React Native</span>,{' '}
                and{' '}
                <span className="text-slate-lightest font-semibold">AI integration</span>.
                Passionate about shipping polished products that feel effortless to use.
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

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-10 mt-10 sm:mt-14 max-w-xl mx-auto lg:mx-0">
                {[
                  { value: '1+', label: 'Years Experience' },
                  { value: '10+', label: 'Projects Shipped' },
                  { value: '5+', label: 'Technologies' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-accent">
                      {stat.value}
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
                {/* Outer rotating ring (dashed) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-accent/40"
                />
                {/* Middle ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-3 sm:inset-4 rounded-full border border-accent/25"
                />
                {/* Inner solid ring with glow */}
                <div className="absolute inset-6 sm:inset-8 rounded-full border-2 border-accent shadow-[0_0_40px_rgba(239,68,68,0.35)]" />

                {/* Portrait */}
                <div className="absolute inset-8 sm:inset-10 rounded-full overflow-hidden bg-navy-light flex items-center justify-center">
                  <img
                    src={AVATAR_URL}
                    alt="Marni Jayaram"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating "Available" pill */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-0 right-0 sm:-bottom-2 sm:-right-2 bg-navy-light border border-accent/40 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2 shadow-lg"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-lightest">Available</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section placeholders */}
        {[
          { id: 'about', label: 'About Me' },
          { id: 'skills', label: 'Skills' },
          { id: 'experience', label: 'Experience' },
          { id: 'projects', label: 'Projects' },
          { id: 'contact', label: 'Contact' },
        ].map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="min-h-screen flex items-center justify-center section-padding container-max"
          >
            <div className="text-center">
              <p className="eyebrow mb-3">{s.label}</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-lightest">
                Coming next
              </h2>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default Home;
