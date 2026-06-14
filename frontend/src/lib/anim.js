// Shared animation constants (kept out of component files for fast-refresh).

// Premium easing — used everywhere for a consistent, designed feel.
export const EASE = [0.22, 1, 0.36, 1];

// Stagger helpers — wrap a list in a container, give each child `staggerItem`.
export const staggerContainer = (stagger = 0.09, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
