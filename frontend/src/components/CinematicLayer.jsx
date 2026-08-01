import { useEffect, useRef } from 'react';

// CinematicLayer — lightweight floating bokeh particles on a transparent canvas.
// Sky-blue + white glowing dots, additive blending, slow sine-wave drift, and
// subtle mouse parallax. Pure 2D canvas (no Three.js); a single rAF loop with
// full cleanup, density scaled to viewport, and reduced-motion respected.
export default function CinematicLayer({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // sky-400, white, sky-500 — matches the site's sky-blue accent.
    const COLORS = ['56,189,248', '255,255,255', '14,165,233'];

    let width = 0;
    let height = 0;
    let particles = [];

    const makeParticles = () => {
      const count = Math.min(Math.round((width * height) / 26000), 90);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.5 + Math.random() * 5,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        baseAlpha: 0.12 + Math.random() * 0.4,
        ampX: 10 + Math.random() * 40,
        ampY: 10 + Math.random() * 40,
        spX: 0.0003 + Math.random() * 0.0006,
        spY: 0.0003 + Math.random() * 0.0006,
        phX: Math.random() * Math.PI * 2,
        phY: Math.random() * Math.PI * 2,
        depth: 0.3 + Math.random() * 0.7, // parallax strength
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeParticles();
    };

    let mx = 0, my = 0, tmx = 0, tmy = 0; // smoothed + target mouse (-1..1)
    const onMove = (e) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const draw = (t) => {
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter'; // additive glow
      for (const p of particles) {
        const x = p.x + Math.sin(t * p.spX + p.phX) * p.ampX + mx * 30 * p.depth;
        const y = p.y + Math.cos(t * p.spY + p.phY) * p.ampY + my * 30 * p.depth;
        const alpha = p.baseAlpha * (0.7 + 0.3 * Math.sin(t * 0.001 + p.phX));
        const rad = p.r * 4;
        const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
        g.addColorStop(0, `rgba(${p.color},${alpha})`);
        g.addColorStop(1, `rgba(${p.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    let raf;
    const loop = (t) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    if (reduce) {
      draw(0); // single static frame
    } else {
      window.addEventListener('mousemove', onMove);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
