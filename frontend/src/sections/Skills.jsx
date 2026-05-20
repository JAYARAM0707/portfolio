import { motion } from 'framer-motion';
import { Smartphone, Code2, Wrench, Database, Palette, Globe } from 'lucide-react';
import MagicBento from '../components/MagicBento';
import SectionBackground from '../components/SectionBackground';
import { CodeWindow } from '../components/SectionMockup';

// Skills shaped for MagicBento — 6 cards form the asymmetric bento grid.
const SKILL_CARDS = [
  {
    Icon: Smartphone,
    label: 'Mobile',
    title: 'Mobile Development',
    description: 'React Native · iOS · Android · React Navigation · Figma-to-Code',
  },
  {
    Icon: Globe,
    label: 'Frontend',
    title: 'Frontend & Web',
    description: 'React.js · HTML5 · CSS3 · Tailwind CSS · Responsive UI',
  },
  {
    Icon: Code2,
    label: 'Languages',
    title: 'Languages',
    description: 'JavaScript (ES6+) · Python · SQL · HTML · CSS',
  },
  {
    Icon: Database,
    label: 'State & APIs',
    title: 'State & APIs',
    description: 'Redux Toolkit · Axios · REST API Integration · Firebase',
  },
  {
    Icon: Palette,
    label: 'Real-time',
    title: 'Real-time Systems',
    description: 'VoIP Calling · Push Notifications · Audio · File Uploads',
  },
  {
    Icon: Wrench,
    label: 'Tools',
    title: 'Tools & Workflow',
    description: 'Git · GitHub · Flipper · React Native Debugger · Agile',
  },
];

function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden section-padding container-max py-24 md:py-32"
    >
      <SectionBackground orbOpacity={0.22} />
      <CodeWindow style={{ top: '10%', right: '8%' }} className="hidden md:block" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 md:mb-16"
      >
        <p className="eyebrow mb-3">Skills</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-lightest">
          What I work with <span className="text-accent">daily</span>
        </h2>
      </motion.div>

      <MagicBento
        cards={SKILL_CARDS}
        enableStars
        enableSpotlight
        enableBorderGlow
        enableTilt
        enableMagnetism
        clickEffect
        glowColor="56, 189, 248"
        particleCount={10}
      />
    </section>
  );
}

export default Skills;
