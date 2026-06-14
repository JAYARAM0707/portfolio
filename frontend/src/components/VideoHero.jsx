// frontend/src/components/VideoHero.jsx
//
// VideoHero — the cinematic video as the FIRST section of the page.
//
// Behaviour:
//   - Starts playing (with audio) when the splash fires the "intro-start" event.
//   - User can scroll down into the site; the video keeps playing in the
//     background (we never pause on scroll) — audio continues until it ends.
//   - When the video ends, audio stops naturally and a Replay button appears.
//   - Scrolling back to the top shows the video again; play/replay/mute controls
//     let the user watch and listen again.

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ChevronDown } from "lucide-react";

export default function VideoHero() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [ended, setEnded] = useState(false);

  // Begin playback (with sound) the moment the splash dispatches "intro-start".
  useEffect(() => {
    const start = () => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = false;
      setIsMuted(false);
      v.currentTime = 0;
      v.play().catch(() => {
        // Autoplay-with-sound blocked → fall back to muted playback.
        v.muted = true;
        setIsMuted(true);
        v.play().catch(() => {});
      });
    };
    window.addEventListener("intro-start", start);
    return () => window.removeEventListener("intro-start", start);
  }, []);

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

  return (
    <section id="intro" className="relative h-screen w-full bg-black overflow-hidden">
      <video
        ref={videoRef}
        src="/portfolio-intro.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setEnded(true);
          setIsPlaying(false);
        }}
      />

      {/* Cinematic grading */}
      <div className="pointer-events-none absolute inset-0 bg-radial-vignette" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />

      {/* Center play button — appears when the video has ended / is paused */}
      {(ended || !isPlaying) && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          onClick={ended ? replay : togglePlay}
          aria-label={ended ? "Play again" : "Play"}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
                     w-20 h-20 sm:w-24 sm:h-24 rounded-full
                     bg-white/10 backdrop-blur-md border border-white/30
                     text-white flex items-center justify-center
                     hover:bg-sky-500 hover:border-sky-400 hover:scale-110
                     transition-all duration-300 shadow-2xl shadow-sky-500/20"
        >
          <Play size={34} className="ml-1" />
        </motion.button>
      )}

      {/* Name + role title — vertically centered, left-aligned */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20">
        <span className="block text-[0.6rem] sm:text-xs font-mono uppercase tracking-[0.3em] text-sky-300 mb-3">
          Software Engineer
        </span>
        <h2 className="font-display font-extrabold text-white leading-[0.95] tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
          Marni<br />Jayaram
        </h2>
        <p className="mt-4 text-xs sm:text-sm md:text-base font-mono text-white/60 tracking-wider">
          React Native · iOS · Android · AI Integration
        </p>
      </div>

      {/* Bottom-right — pause (while playing) + mute toggle */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex items-center gap-2 z-20">
        {isPlaying && !ended && (
          <button
            onClick={togglePlay}
            aria-label="Pause"
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15
                       text-white/80 hover:bg-white/20 hover:text-white flex items-center justify-center transition-all"
          >
            <Pause size={16} />
          </button>
        )}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15
                     text-white/80 hover:bg-white/20 hover:text-white flex items-center justify-center transition-all"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* Scroll-down hint */}
      <a
        href="#home"
        aria-label="Scroll to portfolio"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors"
      >
        <span className="text-[0.6rem] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex"
        >
          <ChevronDown size={20} />
        </motion.span>
      </a>
    </section>
  );
}
