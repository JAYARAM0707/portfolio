import { motion } from 'framer-motion';

// Each icon: { Icon, top?, left?, right?, bottom?, size?, rotate? }
// Positions are CSS string values (e.g. '10%', '-2rem').
function SectionBackground({
  icons = [],
  orbs = true,
  orbOpacity = 0.3,
}) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden -z-0"
    >
      {/* Two subtle drifting orbs for ambient depth */}
      {orbs && (
        <div style={{ opacity: orbOpacity }} className="absolute inset-0">
          <motion.div
            animate={{ x: [-40, 40, -40], y: [-25, 25, -25], scale: [1, 1.1, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-accent/30 blur-3xl"
          />
          <motion.div
            animate={{ x: [40, -40, 40], y: [25, -25, 25], scale: [1, 1.15, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[10%] right-[5%] w-[28rem] h-[28rem] rounded-full bg-accent/20 blur-3xl"
          />
        </div>
      )}

      {/* Themed floating icons - bob + slow rotate */}
      {icons.map((it, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: it.opacity ?? 0.18,
            scale: 1,
            y: [0, -25, 0],
            rotate: it.spin ? [0, 360] : [0, 12, -12, 0],
          }}
          transition={{
            opacity: { duration: 1, delay: i * 0.15 },
            scale: { duration: 0.6, delay: i * 0.15 },
            y: {
              duration: 5 + i * 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            },
            rotate: {
              duration: it.spin ? 30 + i * 3 : 9 + i,
              repeat: Infinity,
              ease: it.spin ? 'linear' : 'easeInOut',
            },
          }}
          style={{
            top: it.top,
            left: it.left,
            right: it.right,
            bottom: it.bottom,
          }}
          className="absolute text-accent"
        >
          <it.Icon size={it.size ?? 72} strokeWidth={it.stroke ?? 1.2} />
        </motion.div>
      ))}
    </div>
  );
}

export default SectionBackground;
