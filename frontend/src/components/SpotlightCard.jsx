import { forwardRef, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// React-Bits-inspired cursor spotlight. A soft accent-colored radial gradient
// follows the mouse inside the card, fading in on enter / out on leave.
// Drop-in replacement for a motion.div - accepts the same props + className.
const SpotlightCard = forwardRef(function SpotlightCard(
  { children, className = '', spotlightSize = 260, ...motionProps },
  ref
) {
  const innerRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!innerRef.current) return;
    const rect = innerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={(node) => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
      {...motionProps}
    >
      {/* Spotlight overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(circle ${spotlightSize}px at ${pos.x}px ${pos.y}px, rgb(var(--accent) / 0.18), transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
});

export default SpotlightCard;
