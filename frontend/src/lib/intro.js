// Intro visibility helper - kept separate from the component file so the
// component module only exports React components (fast-refresh requirement).

export const INTRO_STORAGE_KEY = "marni-intro-watched";

// Always show the cinematic intro on every page load / refresh.
export function shouldShowIntro() {
  return true;
}
