import { motion } from 'framer-motion';
import { Smartphone, Sparkles, Phone, Zap } from 'lucide-react';

const capabilities = [
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Cross-platform iOS & Android apps built with React Native and Redux Toolkit.',
  },
  {
    icon: Sparkles,
    title: 'AI Integration',
    description: 'Implementing GPT-4 APIs and AI-powered IVR systems for intelligent interactions.',
  },
  {
    icon: Phone,
    title: 'Real-Time Systems',
    description: 'VoIP calling, email sync, and calendar modules used in production.',
  },
  {
    icon: Zap,
    title: 'Full-Stack Journey',
    description: 'Actively learning Python + FastAPI to grow into end-to-end engineering.',
  },
];

const techStack = [
  'React Native', 'JavaScript', 'TypeScript', 'Redux Toolkit',
  'REST APIs', 'GPT-4 API', 'VoIP', 'Firebase', 'Git', 'Figma to Code',
];

function About() {
  return (
    <section
      id="about"
      className="section-padding container-max py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="eyebrow mb-3">About</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-lightest">
          Mobile engineer building <span className="text-accent">intelligent</span> experiences
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* LEFT: Bio + Tech Stack */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-5 text-slate-light text-base md:text-lg leading-relaxed">
            <p>
              I'm a Software Engineer specializing in{' '}
              <span className="text-slate-lightest font-semibold">React Native</span>,
              with over a year of hands-on experience building and deploying high-performance
              mobile applications for iOS and Android. I focus on turning complex Figma designs
              into seamless, production-ready apps that users actually enjoy.
            </p>
            <p>
              Currently at{' '}
              <span className="text-slate-lightest font-semibold">Revolution Labs</span>,
              I develop scalable communication and productivity tools — integrating{' '}
              <span className="text-accent font-semibold">GPT-4</span> for AI-powered features,
              building real-time VoIP calling, email sync, and calendar modules. I care deeply
              about clean architecture, smooth UX, and the intersection of mobile + AI.
            </p>
          </div>

          <div className="mt-10">
            <p className="eyebrow mb-4">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-mono
                             bg-navy-light border border-slate-dark/40
                             text-slate-light hover:border-accent hover:text-accent
                             transition-colors duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Capability Cards (2x2 grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-navy-light border border-slate-dark/30 rounded-xl
                         p-5 sm:p-6 hover:border-accent transition-all duration-300
                         hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4
                              group-hover:bg-accent/20 transition-colors duration-300">
                <cap.icon size={24} className="text-accent" />
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold text-slate-lightest mb-2">
                {cap.title}
              </h3>
              <p className="text-sm text-slate leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default About;
