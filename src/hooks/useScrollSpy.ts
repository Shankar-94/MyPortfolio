import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[]): string => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const trigger = window.innerHeight * 0.4;
      let current = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= trigger) {
          current = id;
        }
      }

      // Near-bottom fallback: when the page can't scroll far enough for bottom
      // sections to cross the trigger, activate the last visible section instead
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 80;

      if (nearBottom) {
        for (const id of [...sectionIds].reverse()) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top < window.innerHeight) {
            current = id;
            break;
          }
        }
      }

      if (current) setActiveId(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds]);

  return activeId;
};
