// frontend/src/components/CinematicIntro.jsx
//
// CinematicIntro (splash only)
// ─────────────────────────────────────────────────────────────
// Shows a splash screen with avatar + name + "Start" button.
// Clicking Start:
//   1. Dispatches an "intro-start" window event (in the same user-gesture
//      call stack) so the <VideoHero> in the page can begin playing WITH AUDIO.
//   2. Fades the splash out and calls onComplete() to reveal the page.
//
// The actual video now lives in <VideoHero> as the first section of the page,
// so the user can scroll past it (audio keeps playing) and scroll back to replay.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/profile";

export default function CinematicIntro({ onComplete }) {
  const [visible, setVisible] = useState(true);

  const handleStart = () => {
    // Make sure we're focused on the video at the very top.
    window.scrollTo(0, 0);
    // Fire synchronously within the click so the browser treats the
    // subsequent video.play() (in VideoHero) as user-initiated → audio allowed.
    window.dispatchEvent(new Event("intro-start"));
    setVisible(false);
    setTimeout(() => onComplete?.(), 650);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        >
          <FloatingParticles />
          <div className="absolute inset-0 bg-gradient-to-br from-sky-950/40 via-black to-black" />

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-8 rounded-full overflow-hidden
                         border-2 border-sky-400 shadow-2xl shadow-sky-500/50"
            >
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-10"
            >
              {profile.name}
            </motion.h1>

            {/* Start button — outline that fills left→right on hover */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStart}
              className="group relative overflow-hidden rounded-full border-2 border-sky-400
                         px-12 py-4 font-medium tracking-widest uppercase text-sm
                         text-sky-300 hover:text-black
                         [transition:color_700ms_cubic-bezier(0.65,0,0.35,1)]"
            >
              <span className="absolute inset-0 bg-sky-400 origin-left scale-x-0
                               group-hover:scale-x-100
                               [transition:transform_700ms_cubic-bezier(0.65,0,0.35,1)]" />
              <span className="relative z-10">Start</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// FloatingParticles — ambient particles. Pure CSS + framer-motion.
// ─────────────────────────────────────────────────────────────
function FloatingParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: (i * 37) % 100,
      top: (i * 53) % 100,
      size: (i % 3) + 1,
      delay: i % 5,
      duration: 6 + (i % 4),
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-sky-300/40"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.size}px`, height: `${p.size}px` }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
