import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import Aurora from './Aurora';

const DURATION_MS = 2500;

// 3D rotating cube with brand-coloured faces
function Cube3D() {
  const SIZE = 64; // px per side
  const half = SIZE / 2;
  const faces = [
    { label: '⚛', transform: `translateZ(${half}px)` },
    { label: 'JS', transform: `rotateY(180deg) translateZ(${half}px)` },
    { label: 'TS', transform: `rotateY(90deg) translateZ(${half}px)` },
    { label: 'PY', transform: `rotateY(-90deg) translateZ(${half}px)` },
    { label: '< >', transform: `rotateX(90deg) translateZ(${half}px)` },
    { label: 'MJ', transform: `rotateX(-90deg) translateZ(${half}px)` },
  ];

  return (
    <div style={{ perspective: '600px' }} className="mx-auto mb-8 sm:mb-10">
      <motion.div
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          transformStyle: 'preserve-3d',
          width: SIZE,
          height: SIZE,
        }}
        className="relative mx-auto"
      >
        {faces.map((f, i) => (
          <div
            key={i}
            style={{ transform: f.transform, width: SIZE, height: SIZE }}
            className="absolute inset-0 flex items-center justify-center
                       bg-accent/15 border-2 border-accent rounded-lg
                       font-mono font-bold text-accent text-base
                       backdrop-blur-sm shadow-[0_0_18px_rgba(56,189,248,0.4)]"
          >
            {f.label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function PreloaderIntro({ onComplete }) {
  const [done, setDone] = useState(false);

  const progress = useMotionValue(0);
  const widthValue = useTransform(progress, (v) => `${v}%`);
  const percentRef = useRef(null);

  useEffect(() => {
    const unsub = progress.on('change', (latest) => {
      if (percentRef.current) percentRef.current.textContent = `${Math.round(latest)}%`;
    });
    return unsub;
  }, [progress]);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: DURATION_MS / 1000,
      ease: 'linear',
      onComplete: () => {
        setTimeout(() => setDone(true), 300);
        setTimeout(() => onComplete?.(), 900);
      },
    });
    return () => controls.stop();
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy"
        >
          <Aurora />

          {/* Floating sparkle particles scattered around */}
          {[
            { top: '12%', left: '10%', d: 1.4 },
            { top: '20%', left: '88%', d: 1.7 },
            { top: '35%', left: '15%', d: 1.5 },
            { top: '50%', left: '92%', d: 1.9 },
            { top: '65%', left: '8%', d: 1.6 },
            { top: '75%', left: '85%', d: 1.4 },
            { top: '30%', left: '50%', d: 2.1 },
            { top: '85%', left: '45%', d: 1.8 },
            { top: '15%', left: '60%', d: 1.5 },
            { top: '60%', left: '40%', d: 1.7 },
            { top: '45%', left: '70%', d: 1.9 },
            { top: '90%', left: '70%', d: 1.5 },
          ].map((p, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{
                duration: p.d,
                repeat: Infinity,
                delay: (i * 0.18) % 2,
                ease: 'easeInOut',
              }}
              style={{ top: p.top, left: p.left }}
              className="absolute w-1 h-1 rounded-full bg-accent
                         shadow-[0_0_10px_rgba(56,189,248,1)] pointer-events-none"
            />
          ))}

          <div className="relative z-10 text-center px-6">
            {/* 3D rotating cube */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Cube3D />
            </motion.div>

            {/* Welcome text — two lines */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-slate-lightest mb-2"
            >
              Welcome To My
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-accent mb-10"
            >
              Portfolio Website
            </motion.h2>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="w-[20rem] sm:w-[28rem] md:w-[34rem] lg:w-[40rem] max-w-[90vw] mx-auto"
            >
              <div className="h-5 sm:h-6 bg-slate-dark/40 rounded-full overflow-hidden border-2 border-accent/30">
                <motion.div
                  style={{ width: widthValue }}
                  className="h-full bg-accent rounded-full shadow-[0_0_18px_rgba(56,189,248,1)]"
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-xs sm:text-sm">
                <span className="text-slate uppercase tracking-widest">Loading</span>
                <span ref={percentRef} className="text-accent font-semibold">0%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PreloaderIntro;
