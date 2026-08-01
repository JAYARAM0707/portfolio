import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

// StackSection — slow, premium section reveal (matches the prompt's "slow,
// premium, smooth, immersive" motion). Each section gently fades + rises as it
// enters the viewport. No sticky cards, no scroll-snap — just clean cinematic
// scrolling driven by Lenis momentum at the page level.
export default function StackSection({ children, number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 1.1, ease: EASE }}
      className="relative"
    >
      {/* Subtle faded section number */}
      {number && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-4 right-4 sm:right-8 z-0
                     font-display font-extrabold leading-none select-none
                     text-6xl md:text-8xl text-slate-lightest/[0.04]"
        >
          {number}
        </span>
      )}
      {children}
    </motion.div>
  );
}
