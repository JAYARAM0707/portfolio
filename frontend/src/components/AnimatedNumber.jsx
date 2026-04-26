import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';

function AnimatedNumber({ value, suffix = '', duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration, ease: 'easeOut' });
      return () => controls.stop();
    }
  }, [inView, value, duration, count]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default AnimatedNumber;
