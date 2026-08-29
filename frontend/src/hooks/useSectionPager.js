import { useEffect } from 'react';

// Full-page section pager (fullPage.js style).
// One scroll/swipe = move to the next/previous full section, which slides in
// as a whole. Tall sections (taller than the viewport) can be scrolled THROUGH
// first; only once you reach their edge does the next scroll page onward.
//
// Works on desktop (wheel) and mobile (touch). Disabled for reduced-motion.
export function useSectionPager(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const getSections = () =>
      Array.from(document.querySelectorAll('section[id]'));

    let animating = false;
    let touchStartY = 0;
    const EDGE = 6; // px tolerance for "at top/bottom of a section"

    const currentIndex = (sections) => {
      const mid = window.scrollY + window.innerHeight / 2;
      let idx = 0;
      sections.forEach((s, i) => {
        if (s.offsetTop <= mid) idx = i;
      });
      return idx;
    };

    const lock = () => {
      animating = true;
      setTimeout(() => { animating = false; }, 850);
    };

    // Returns true if it paged (caller should preventDefault), false to allow
    // normal scrolling within a tall section.
    const page = (dir) => {
      const sections = getSections();
      if (!sections.length) return false;
      const idx = currentIndex(sections);
      const cur = sections[idx];
      const y = window.scrollY;
      const curTop = cur.offsetTop;
      const curBottom = curTop + cur.offsetHeight;

      if (dir > 0) {
        // Scrolling down - only page when we're at the bottom of the current section
        const atBottom = y + window.innerHeight >= curBottom - EDGE;
        if (!atBottom) return false;
        const next = sections[idx + 1];
        if (!next) return false;
        lock();
        next.scrollIntoView({ behavior: 'smooth' });
        return true;
      } else {
        // Scrolling up - only page when we're at the top of the current section
        const atTop = y <= curTop + EDGE;
        if (!atTop) return false;
        const prev = sections[idx - 1];
        if (!prev) return false;
        lock();
        prev.scrollIntoView({ behavior: 'smooth' });
        return true;
      }
    };

    const onWheel = (e) => {
      if (animating) { e.preventDefault(); return; }
      if (Math.abs(e.deltaY) < 4) return;
      if (page(Math.sign(e.deltaY))) e.preventDefault();
    };

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (animating) { e.preventDefault(); return; }
      const dy = touchStartY - e.touches[0].clientY; // >0 = swipe up = scroll down
      if (Math.abs(dy) < 40) return;
      if (page(Math.sign(dy))) {
        e.preventDefault();
        touchStartY = e.touches[0].clientY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [enabled]);
}
