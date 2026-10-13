import { useState, useEffect, useRef } from 'react';

export const useTyping = (phrases: string[]): string => {
  const [displayText, setDisplayText] = useState('');
  const stateRef = useRef({ phraseIdx: 0, charIdx: 0, isDeleting: false });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(phrases[0]);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const state = stateRef.current;
      const phrase = phrases[state.phraseIdx];

      if (state.isDeleting) {
        state.charIdx--;
      } else {
        state.charIdx++;
      }

      setDisplayText(phrase.slice(0, state.charIdx));

      let delay = state.isDeleting ? 38 : 68;

      if (!state.isDeleting && state.charIdx === phrase.length) {
        delay = 2200;
        state.isDeleting = true;
      } else if (state.isDeleting && state.charIdx === 0) {
        state.isDeleting = false;
        state.phraseIdx = (state.phraseIdx + 1) % phrases.length;
        delay = 380;
      }

      timeoutId = setTimeout(tick, delay);
    };

    timeoutId = setTimeout(tick, 600);
    return () => clearTimeout(timeoutId);
  }, [phrases]);

  return displayText;
};
