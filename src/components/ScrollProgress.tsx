import { useScrollProgress } from '../hooks/useScrollProgress';

export const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div
      className="scroll-progress"
      id="scroll-progress"
      aria-hidden="true"
      style={{ width: `${progress}%` }}
    />
  );
};
