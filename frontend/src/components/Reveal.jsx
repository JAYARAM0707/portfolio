import { motion } from 'framer-motion';
import { EASE } from '../lib/anim';

// Reveal - fade + rise as the element scrolls into view.
// Usage: <Reveal><h2>…</h2></Reveal>  or  <Reveal delay={0.1} className="…">…</Reveal>
export function Reveal({
  children,
  delay = 0,
  y = 26,
  duration = 0.6,
  className = '',
  once = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
