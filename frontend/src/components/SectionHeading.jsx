import { motion } from 'framer-motion';
import { EASE_OUT } from '../lib/anim';

// SectionHeading - the shared editorial header used by every section.
// A mono eyebrow (index + accent tick) above an oversized Fraunces statement
// that clip-wipes up on scroll, with an optional supporting line.
export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className={`eyebrow mb-5 ${centered ? 'justify-center' : ''}`}
      >
        {index && <span className="text-slate-dark not-italic mr-1">{index}</span>}
        {eyebrow}
      </motion.p>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: '110%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="display-title text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] pb-[0.06em]"
        >
          {title}
        </motion.h2>
      </div>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
          className={`mt-5 text-base sm:text-lg text-slate-light leading-relaxed max-w-2xl
                      ${centered ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
