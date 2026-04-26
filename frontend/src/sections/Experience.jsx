import { motion } from 'framer-motion';

const bullets = [
  'Shipped 3+ production-grade mobile applications to App Store and Play Store using React Native',
  'Built 5+ core modules including real-time VoIP calling, email sync, and calendar integration',
  'Translated 40+ high-fidelity Figma designs into responsive, pixel-perfect mobile screens',
  'Integrated GPT-4 API and AI-IVR systems for automated messaging and voice interactions',
  'Optimized state management and UI performance for smooth cross-platform experiences',
];

const techChips = ['React Native', 'Redux Toolkit', 'GPT-4 API', 'VoIP', 'iOS', 'Android', 'Figma'];

function Experience() {
  return (
    <section
      id="experience"
      className="section-padding container-max py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 md:mb-16"
      >
        <p className="eyebrow mb-3">Experience</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-lightest">
          Where I've been <span className="text-accent">working</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="relative max-w-4xl mx-auto bg-navy-light border border-slate-dark/30 rounded-xl
                   overflow-hidden hover:border-accent transition-all duration-500
                   hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
      >
        {/* Red gradient top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent" />

        <div className="p-6 sm:p-8 md:p-10">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-lightest">
                Software Engineer
              </h3>
              <p className="text-base text-slate-light mt-1">
                Revolution Labs Pvt. Ltd.
              </p>
            </div>

            <div className="flex flex-col items-start sm:items-end">
              <span className="bg-navy border border-accent/40 text-accent text-xs font-mono px-3 py-1 rounded-full">
                Full-time
              </span>
              <span className="text-sm text-slate-light font-mono mt-2">
                Mar 2025 – Present
              </span>
            </div>
          </div>

          {/* Bullets */}
          <ul className="mt-6 sm:mt-8 space-y-3">
            {bullets.map((bullet, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span className="text-sm sm:text-base text-slate-light leading-relaxed">
                  {bullet}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Tech chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {techChips.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: 0.8 + i * 0.05,
                  type: 'spring',
                  stiffness: 200,
                }}
                className="bg-navy border border-slate-dark/40 rounded-md px-3 py-1.5
                           text-xs font-mono text-slate-light
                           hover:border-accent hover:text-accent transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Experience;
