import { useEffect, useState } from 'react';

// Returns the id of whichever section is currently most-visible.
// rootMargin trims the top ~30% so the active state flips slightly *before*
// a section reaches the top of the viewport — feels more natural.
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0]);
  const idsKey = ids.join('|');

  useEffect(() => {
    if (!ids.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return activeId;
}
