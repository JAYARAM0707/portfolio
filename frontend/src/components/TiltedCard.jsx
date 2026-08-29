import { forwardRef, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// React-Bits-inspired 3D tilt - rotates on cursor position with spring physics.
// Wraps any element; pass-through framer-motion props (initial, whileInView, etc).
const TiltedCard = forwardRef(function TiltedCard(
  { children, className = '', maxTilt = 8, ...motionProps },
  ref
) {
  const innerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 200, damping: 22 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 22 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e) => {
    if (!innerRef.current) return;
    const rect = innerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={(node) => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
});

export default TiltedCard;
