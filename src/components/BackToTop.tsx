import { useState, useEffect } from 'react';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sync = () => setIsVisible(window.scrollY > 320);
    window.addEventListener('scroll', sync, { passive: true });
    sync();
    return () => window.removeEventListener('scroll', sync);
  }, []);

  return (
    <button
      className={`back-top${isVisible ? ' is-visible' : ''}`}
      id="back-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  );
};
