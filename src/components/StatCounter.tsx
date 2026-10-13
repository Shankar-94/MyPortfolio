import { useState, useEffect, useRef } from 'react';
import type { StatItem } from '../types';

interface StatCounterProps {
  stat: StatItem;
}

const AnimatedNumber = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const observed = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const animate = () => {
      const duration = 1100;
      const start = performance.now();
      const isDecimal = target % 1 !== 0;
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const raw = eased * target;
        setCount(isDecimal ? parseFloat(raw.toFixed(1)) : Math.round(raw));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true;
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const display = target % 1 !== 0 ? count.toFixed(1) : count;

  return (
    <span ref={ref} className="stat-item__number">
      {display}
    </span>
  );
};

export const StatCounter = ({ stat }: StatCounterProps) => (
  <div className="stat-item">
    <div className="stat-item__value">
      <AnimatedNumber target={stat.target} />
      <span className="stat-item__suffix">{stat.suffix}</span>
    </div>
    <div className="stat-item__label">{stat.label}</div>
  </div>
);
