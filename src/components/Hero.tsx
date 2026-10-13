import { useTyping } from '../hooks/useTyping';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { TYPED_PHRASES, HERO_STACK_ITEMS } from '../data';

export const Hero = () => {
  const typedText = useTyping(TYPED_PHRASES);
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="hero"
      className="section hero animate-target"
      aria-labelledby="hero-title"
    >
      <div className="hero__content">
        <p className="hero__eyebrow">Frontend Engineer · React &amp; TypeScript · Open to opportunities</p>
        <p className="hero__location">Europe · India</p>
        <h1 id="hero-title" className="hero__title">
          Shankar B Puthani
          <br />
          <span className="hero__typed" aria-live="polite">
            {typedText}
          </span>
          <span className="hero__cursor" aria-hidden="true">
            |
          </span>
        </h1>
        <p className="hero__subtitle">
          Engineering Services Analyst at Accenture, delivering aviation inspection platforms,
          automation tools, and data dashboards using React, TypeScript, Python, C#, and Palantir.
        </p>
        <div className="hero__actions">
          <a href="#projects" className="btn btn--primary">
            View projects
          </a>
          <a href="#contact" className="btn btn--ghost">
            Contact me
          </a>
          <a href="/shankar-cv.pdf" download className="btn btn--ghost">
            Download CV
          </a>
        </div>
        <div className="hero__meta">
          <div className="hero__tag">Engineering Services Analyst · Accenture</div>
          <div className="hero__tag">React · TypeScript · Python · C# · Palantir</div>
        </div>
      </div>

      <div className="hero__panel" aria-hidden="true">
        <div className="hero-card">
          <div className="hero-card__header">
            <span className="hero-card__dot" />
            <span className="hero-card__dot" />
            <span className="hero-card__dot" />
          </div>
          <div className="hero-card__body">
            <p className="hero-card__label">CURRENT STACK</p>
            <ul className="hero-card__list">
              {HERO_STACK_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
