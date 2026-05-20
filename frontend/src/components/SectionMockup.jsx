import { motion } from 'framer-motion';
import { Bot, FolderGit2 } from 'lucide-react';

// Shared 3D-floating wrapper: perspective tilt + slow drift + bob.
// All mockups feel like they're suspended in 3D space.
function FloatingFrame({ children, style, className = '', dur = 7, tilt = 8 }) {
  return (
    <motion.div
      style={{ ...style, perspective: 1200 }}
      className={`absolute pointer-events-none ${className}`}
    >
      <motion.div
        animate={{
          rotateY: [-tilt, tilt, -tilt],
          rotateX: [tilt / 2, -tilt / 2, tilt / 2],
          y: [0, -14, 0],
        }}
        transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="origin-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// AI chatbot bubble — 3D-tilted
export function ChatbotBubble({ style, className = '' }) {
  return (
    <FloatingFrame style={style} className={`opacity-55 ${className}`} dur={6}>
      <div className="bg-navy-light border border-accent/40 rounded-2xl rounded-tl-sm p-3 backdrop-blur-sm shadow-2xl shadow-accent/20 w-[200px]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
            <Bot size={12} className="text-accent" />
          </div>
          <span className="text-[0.65rem] font-mono text-accent font-semibold">AI Assistant</span>
          <span className="ml-auto relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 rounded-full bg-slate-light/40 w-[140px]" />
          <div className="h-1.5 rounded-full bg-slate-light/40 w-[100px]" />
          <div className="h-1.5 rounded-full bg-accent/50 w-[80px]" />
        </div>
      </div>
    </FloatingFrame>
  );
}

// Code editor window — 3D-tilted
export function CodeWindow({ style, className = '' }) {
  return (
    <FloatingFrame style={style} className={`opacity-55 ${className}`} dur={7}>
      <div className="bg-navy-light border border-accent/30 rounded-lg backdrop-blur-sm shadow-2xl shadow-accent/20 w-[200px] overflow-hidden">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-slate-dark/40 bg-navy/70">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 rounded-full bg-green-500/80" />
          <span className="ml-auto text-[0.55rem] font-mono text-slate">App.jsx</span>
        </div>
        <div className="p-2.5 space-y-1 font-mono text-[0.6rem]">
          <div className="flex gap-1.5">
            <span className="text-accent/90">const</span>
            <span className="text-slate-light">app</span>
            <span className="text-slate">=</span>
            <span className="text-accent/80">() =&gt;</span>
          </div>
          <div className="pl-4 text-slate-light">
            <span className="text-accent/80">return</span> &lt;Mobile /&gt;
          </div>
          <div className="text-slate">// React Native</div>
          <div className="h-1.5 rounded-full bg-accent/50 w-[60px] mt-1" />
        </div>
      </div>
    </FloatingFrame>
  );
}

// Terminal output — 3D-tilted
export function TerminalWindow({ style, className = '' }) {
  return (
    <FloatingFrame style={style} className={`opacity-55 ${className}`} dur={7.5}>
      <div className="bg-navy-light border border-accent/30 rounded-lg backdrop-blur-sm shadow-2xl shadow-accent/20 w-[210px] overflow-hidden">
        <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-slate-dark/40 bg-navy/70">
          <FolderGit2 size={10} className="text-accent" />
          <span className="text-[0.55rem] font-mono text-slate">~/portfolio</span>
        </div>
        <div className="p-2.5 space-y-1 font-mono text-[0.6rem]">
          <div className="text-slate-light">
            <span className="text-accent">$</span> npm run build
          </div>
          <div className="text-slate">✓ 2151 modules transformed</div>
          <div className="text-green-400/90">✓ built in 3.78s</div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-accent">$</span>
            <span className="inline-block w-1.5 h-2.5 bg-accent animate-pulse" />
          </div>
        </div>
      </div>
    </FloatingFrame>
  );
}

// Message/notification card — 3D-tilted
export function MessageCard({ style, className = '', name = 'GitHub', text = 'PR #42 merged ✓' }) {
  return (
    <FloatingFrame style={style} className={`opacity-55 ${className}`} dur={6.5}>
      <div className="bg-navy-light border border-accent/30 rounded-xl backdrop-blur-sm shadow-2xl shadow-accent/20 p-2.5 w-[200px]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0">
            <span className="text-[0.55rem] font-bold text-accent">{name[0]}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[0.6rem] font-semibold text-slate-lightest">{name}</span>
              <span className="text-[0.5rem] text-slate">now</span>
            </div>
            <div className="text-[0.55rem] text-slate-light truncate">{text}</div>
          </div>
        </div>
      </div>
    </FloatingFrame>
  );
}

// 🆕 Mini 3D phone with app-grid screen — drifts and tilts in 3D
export function Mini3DPhone({ style, className = '' }) {
  return (
    <FloatingFrame style={style} className={`opacity-50 ${className}`} dur={8} tilt={12}>
      <div className="relative w-[100px] h-[180px] bg-gradient-to-br from-navy-lightest to-navy-light border border-accent/40 rounded-[1.2rem] shadow-2xl shadow-accent/20 p-1.5">
        {/* Notch */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-navy rounded-full z-10" />
        {/* Screen */}
        <div className="absolute inset-1.5 rounded-[1rem] bg-navy overflow-hidden">
          {/* Status row */}
          <div className="flex justify-between px-2 pt-1 text-[0.4rem] font-mono text-slate-light">
            <span>9:41</span><span>5G</span>
          </div>
          {/* App grid */}
          <div className="grid grid-cols-3 gap-1 px-2 pt-3">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-md ${i % 3 === 0 ? 'bg-accent/70' : i % 2 === 0 ? 'bg-accent/30' : 'bg-navy-light border border-slate-dark/50'}`}
              />
            ))}
          </div>
          {/* Home indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-slate-light/60 rounded-full" />
        </div>
      </div>
    </FloatingFrame>
  );
}

// 🆕 3D rotating cube with content on faces — sci-fi tech vibe
export function Floating3DCube({ style, size = 120, className = '' }) {
  const half = size / 2;
  const faces = [
    { t: `translateZ(${half}px)`,                            label: 'JS' },
    { t: `rotateY(180deg) translateZ(${half}px)`,            label: 'PY' },
    { t: `rotateY(90deg) translateZ(${half}px)`,             label: '⚛' },
    { t: `rotateY(-90deg) translateZ(${half}px)`,            label: '< >' },
    { t: `rotateX(90deg) translateZ(${half}px)`,             label: 'MJ' },
    { t: `rotateX(-90deg) translateZ(${half}px)`,            label: 'SQL' },
  ];
  return (
    <div
      aria-hidden
      style={{ ...style, perspective: 800 }}
      className={`absolute pointer-events-none opacity-50 ${className}`}
    >
      <motion.div
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{
          rotateX: { duration: 20, repeat: Infinity, ease: 'linear' },
          rotateY: { duration: 26, repeat: Infinity, ease: 'linear' },
        }}
        style={{ transformStyle: 'preserve-3d', width: size, height: size, position: 'relative' }}
      >
        {faces.map((f, i) => (
          <div
            key={i}
            style={{ transform: f.t, width: size, height: size }}
            className="absolute inset-0 flex items-center justify-center
                       bg-accent/[0.08] border-2 border-accent/40 rounded-lg
                       font-mono font-bold text-accent text-base
                       backdrop-blur-sm shadow-[0_0_20px_rgba(56,189,248,0.3)]"
          >
            {f.label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// 🆕 Tilted "app card stack" — represents project stack/architecture
export function CardStack3D({ style, className = '' }) {
  return (
    <FloatingFrame style={style} className={`opacity-55 ${className}`} dur={9} tilt={6}>
      <div className="relative w-[160px] h-[100px]" style={{ transformStyle: 'preserve-3d' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{ transform: `translateZ(${i * -12}px) translateY(${i * 8}px) translateX(${i * 6}px)` }}
            className="absolute inset-0 bg-navy-light border border-accent/40 rounded-lg
                       shadow-xl shadow-accent/10 backdrop-blur-sm flex flex-col gap-1.5 p-2"
          >
            <div className="h-2 rounded-full bg-accent/60 w-3/4" />
            <div className="h-1 rounded-full bg-slate-dark/50 w-1/2" />
            <div className="grid grid-cols-2 gap-1 mt-auto">
              <div className="h-3 bg-accent/30 rounded" />
              <div className="h-3 bg-slate-dark/40 rounded" />
            </div>
          </div>
        ))}
      </div>
    </FloatingFrame>
  );
}
