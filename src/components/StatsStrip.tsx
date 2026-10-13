import { useScrollReveal } from '../hooks/useScrollReveal';
import { StatCounter } from './StatCounter';
import { STATS } from '../data';

export const StatsStrip = () => {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="stats-strip animate-target">
      {STATS.map((stat) => (
        <StatCounter key={stat.label} stat={stat} />
      ))}
    </div>
  );
};
