import { motion } from 'framer-motion';
import { Award, Code2, Briefcase, Download, ArrowRight } from 'lucide-react';
import AnimatedNumber from '../components/AnimatedNumber';
import SpotlightCard from '../components/SpotlightCard';
import SectionBackground from '../components/SectionBackground';
import { ChatbotBubble } from '../components/SectionMockup';
import { profile } from '../data/profile';

const STATS = [
  {
    Icon: Code2,
    value: 3,
    suffix: '+',
    label: 'Total Projects',
    sub: 'Production apps shipped to App Store & Play Store',
  },
  {
    Icon: Award,
    value: 3,
    suffix: '',
    label: 'Certificates',
    sub: 'Professional skills validated',
  },
  {
    Icon: Briefcase,
    value: 1,
    suffix: '+',
    label: 'Years of Experience',
    sub: 'Continuous learning journey',
  },
];

function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden section-padding container-max py-24 md:py-32"
    >
      <SectionBackground />
      <ChatbotBubble style={{ top: '12%', right: '10%' }} className="hidden md:block" />

      {/* Heading + subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-accent mb-3">
          About Me
        </h2>
        <p className="text-sm sm:text-base text-slate font-mono">
          ⌨ Transforming ideas into digital experiences ⌨
        </p>
      </motion.div>

      {/* Two-column: bio left, portrait right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT — bio + CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow mb-3">Hello, I'm</p>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-lightest leading-tight mb-5">
            {profile.name}
          </h3>

          <div className="space-y-4 text-slate-light text-base md:text-lg leading-relaxed mb-7">
            <p>
              A passionate{' '}
              <span className="text-slate-lightest font-semibold">Mobile App Developer</span>{' '}
              specialising in{' '}
              <span className="text-accent font-semibold">React Native</span>, with hands-on
              experience building production-grade iOS and Android apps. I love turning
              complex Figma designs into seamless, pixel-perfect mobile screens.
            </p>
            <p>
              Currently at{' '}
              <span className="text-slate-lightest font-semibold">Revolution Labs</span>,
              I build VoIP calling, email, calendar modules and real-time features —
              combining clean architecture with smooth UX.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="/resume.pdf" download className="btn-primary">
              <Download size={16} />
              Download CV
            </a>
            <a href="#projects" className="btn-outline">
              View Projects
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        {/* RIGHT — clean large portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Soft pulsing glow */}
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-4 rounded-full bg-accent/25 blur-3xl pointer-events-none"
            />
            {/* Dashed outer ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-accent/30 pointer-events-none" />
            {/* Inner soft ring */}
            <div className="absolute inset-3 rounded-full border border-accent/20 pointer-events-none" />
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-6 rounded-full overflow-hidden border-2 border-accent
                         bg-navy-light shadow-[0_0_60px_rgba(56,189,248,0.45)]"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Three stat cards — full-width row below */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {STATS.map((stat, i) => (
          <SpotlightCard
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="group bg-navy-light border border-slate-dark/30 rounded-xl
                       p-5 sm:p-6 hover:border-accent transition-all duration-300
                       hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-lg bg-accent/10 border border-accent/30
                              flex items-center justify-center text-accent
                              group-hover:bg-accent/20 transition-colors">
                <stat.Icon size={20} />
              </div>
              <div className="text-3xl md:text-4xl font-display font-extrabold text-accent">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-light mb-1">
              {stat.label}
            </p>
            <p className="text-sm text-slate leading-relaxed">
              {stat.sub}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

export default About;
