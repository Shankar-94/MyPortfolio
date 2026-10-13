import { useState, useEffect, useRef } from 'react';

export const useSkillBar = (percentage: number): [string, React.RefObject<HTMLDivElement>] => {
  const [width, setWidth] = useState('0%');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setWidth(`${percentage}%`);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(`${percentage}%`);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [percentage]);

  return [width, ref];
};
