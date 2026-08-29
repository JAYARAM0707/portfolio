import { useEffect, useRef } from 'react';
import { animate, useInView, useMotionValue } from 'framer-motion';

function AnimatedNumber({ value, suffix = '', duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const count = useMotionValue(0);

  // Update DOM text directly on each MotionValue tick - works across framer-motion versions.
  useEffect(() => {
    const unsub = count.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
    });
    return unsub;
  }, [count, suffix]);

  // Kick off the count-up once the element scrolls into view.
  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration, ease: 'easeOut' });
    return () => controls.stop();
  }, [inView, value, duration, count]);

  return <span ref={ref}>{`0${suffix}`}</span>;
}

export default AnimatedNumber;
