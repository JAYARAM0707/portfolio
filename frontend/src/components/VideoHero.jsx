// frontend/src/components/VideoHero.jsx
//
// VideoHero - the cinematic video as the FIRST section of the page.
//
// Layers (back → front):
//   1. Blurred, scaled, looping copy of the video → ambient depth
//   2. Sharp foreground video (the talking-head intro, plays once on intro-start)
//   3. CinematicLayer → floating sky-blue bokeh particles
//   4. Cinematic gradient grading
//   5. Landing content (tagline / name / role) with entrance animation
//   6. Glassmorphism controls, "Tap for sound" badge, scroll pulse line
//
// Behaviour: starts (with audio) on the splash "intro-start" event; keeps
// playing while you scroll; on end a center Play/Replay appears.

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import CinematicLayer from "./CinematicLayer";

export default function VideoHero() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [showSoundHint, setShowSoundHint] = useState(false);

  // Begin playback (with sound) the moment the splash dispatches "intro-start".
  useEffect(() => {
    const start = () => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = false;
      setIsMuted(false);
      v.currentTime = 0;
      v.play().catch(() => {
        // Autoplay-with-sound blocked → fall back to muted playback + sound hint.
        v.muted = true;
        setIsMuted(true);
        setShowSoundHint(true);
        v.play().catch(() => {});
      });
    };
    window.addEventListener("intro-start", start);
    return () => window.removeEventListener("intro-start", start);
  }, []);

  // Auto-hide the "Tap for sound" badge a few seconds after it appears.
  useEffect(() => {
    if (!showSoundHint) return;
    const id = setTimeout(() => setShowSoundHint(false), 4500);
    return () => clearTimeout(id);
  }, [showSoundHint]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      setEnded(false);
      v.play();
    } else {
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    setShowSoundHint(false);
  };

  const replay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    setIsMuted(false);
    setEnded(false);
    v.play();
  };

  const scrollToSite = () => {
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  };

  // Staggered entrance for the landing content.
  const container = {
    hidden: {},
    visible: { transition: { delayChildren: 0.3, staggerChildren: 0.18 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.section
      id="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* 1 - Blurred ambient background copy (muted, looping) */}
      <video
        src="/portfolio-intro.mp4"
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl opacity-50"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />

      {/* 2 - Sharp foreground video */}
      <video
        ref={videoRef}
        src="/portfolio-intro.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setEnded(true);
          setIsPlaying(false);
        }}
      />

      {/* 3 - Floating sky-blue bokeh particles */}
      <CinematicLayer />

      {/* 4 - Cinematic grading */}
      <div className="pointer-events-none absolute inset-0 bg-radial-vignette" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />

      {/* Center play button - appears when the video has ended / is paused */}
      {(ended || !isPlaying) && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          onClick={ended ? replay : togglePlay}
          aria-label={ended ? "Play again" : "Play"}
          className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2
                     items-center justify-center rounded-full border border-white/30 bg-white/10
                     text-white shadow-2xl shadow-sky-500/20 backdrop-blur-md transition-all duration-300
                     hover:scale-110 hover:border-sky-400 hover:bg-sky-500 sm:h-24 sm:w-24"
        >
          <Play size={34} className="ml-1" />
        </motion.button>
      )}

      {/* 5 - Landing content with staggered entrance */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20"
      >
        <motion.span
          variants={item}
          className="mb-3 block font-mono text-[0.6rem] uppercase tracking-[0.3em] text-sky-300 sm:text-xs"
        >
          Software Engineer
        </motion.span>
        <motion.h2
          variants={item}
          className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-white
                     sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Marni<br />Jayaram
        </motion.h2>
        <motion.p
          variants={item}
          className="mt-4 font-mono text-xs tracking-wider text-white/60 sm:text-sm md:text-base"
        >
          React Native · iOS · Android · AI Integration
        </motion.p>
      </motion.div>

      {/* 6 - Controls (glassmorphism): pause (while playing) + mute */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 sm:bottom-10 sm:right-10">
        {/* "Tap for sound" badge - pulses while muted, auto-hides */}
        {showSoundHint && (
          <motion.button
            onClick={toggleMute}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="mr-1 flex items-center gap-2 rounded-full border border-white/20 bg-white/10
                       px-3 py-2 font-mono text-[0.65rem] uppercase tracking-wider text-white
                       backdrop-blur-md transition-all hover:bg-white/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
            </span>
            Tap for sound
          </motion.button>
        )}

        {isPlaying && !ended && (
          <button
            onClick={togglePlay}
            aria-label="Pause"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15
                       bg-white/10 text-white/80 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
          >
            <Pause size={16} />
          </button>
        )}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15
                     bg-white/10 text-white/80 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* 5 - Scroll indicator: animated vertical pulse line, click to enter site */}
      <button
        onClick={scrollToSite}
        aria-label="Scroll to portfolio"
        className="group absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2
                   text-white/60 transition-colors hover:text-white"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/20">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-sky-400"
          />
        </span>
      </button>
    </motion.section>
  );
}
