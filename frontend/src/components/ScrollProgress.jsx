import { motion, useScroll, useSpring } from 'framer-motion';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-[60] origin-left
                 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
      style={{ scaleX }}
    />
  );
}

export default ScrollProgress;
