import { motion } from 'framer-motion';

// React-Bits-inspired Aurora - slow-rotating conic gradients with heavy blur.
// Pure CSS + framer-motion (no WebGL). Follows the theme via `var(--accent)`.
function Aurora({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-1/2 opacity-60"
        style={{
          background:
            'conic-gradient(from 0deg, ' +
            'transparent 0deg, ' +
            'rgb(var(--accent) / 0.45) 90deg, ' +
            'transparent 180deg, ' +
            'rgb(var(--accent-hover) / 0.45) 270deg, ' +
            'transparent 360deg)',
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-1/2 opacity-50"
        style={{
          background:
            'conic-gradient(from 180deg, ' +
            'transparent 0deg, ' +
            'rgb(var(--accent) / 0.35) 120deg, ' +
            'transparent 240deg, ' +
            'rgb(var(--accent) / 0.35) 300deg, ' +
            'transparent 360deg)',
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
}

export default Aurora;
