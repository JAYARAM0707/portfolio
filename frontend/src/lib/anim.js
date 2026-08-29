// Shared animation constants (kept out of component files for fast-refresh).

// Premium easing - used everywhere for a consistent, designed feel.
export const EASE = [0.22, 1, 0.36, 1];
export const EASE_OUT = [0.16, 1, 0.3, 1];

// Stagger helpers - wrap a list in a container, give each child `staggerItem`.
export const staggerContainer = (stagger = 0.09, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// ── Editorial motion vocabulary ─────────────────────────────────────────────
// Varied reveals so not everything just fades up.

// Clip-wipe up - heading emerges from a bottom-anchored mask (editorial).
export const clipUp = {
  hidden: { clipPath: 'inset(0 0 100% 0)', y: 8 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

// Horizontal reveal - content slides + fades in from the left.
export const revealLeft = {
  hidden: { opacity: 0, x: -34 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

// Line-by-line reveal - split text into lines, animate each as a child.
export const lineContainer = (stagger = 0.12, delayChildren = 0.05) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});
export const lineItem = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.85, ease: EASE_OUT } },
};

// Subtle scale-in for media/cards.
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};
