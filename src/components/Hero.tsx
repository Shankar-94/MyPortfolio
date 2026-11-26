import { useTyping } from '../hooks/useTyping';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { TYPED_PHRASES, HERO_STACK_ITEMS, CERTIFICATIONS, AVAILABILITY } from '../data';
import { BrandMark } from './BrandMark';

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
        <p className="hero__eyebrow">Palantir Foundry Developer · Ontology · Workshop · Pipelines</p>
        <p className="hero__location">
          <span className="hero__status-dot" aria-hidden="true" />
          Open to Palantir Foundry roles · {AVAILABILITY.join(' · ')}
        </p>
        <h1 id="hero-title" className="hero__title">
          Shankar B Puthani
          <span className="visually-hidden">, Palantir Foundry Developer</span>
          <br />
          <span className="hero__typed" aria-hidden="true">
            {typedText}
          </span>
          <span className="hero__cursor" aria-hidden="true">
            |
          </span>
        </h1>
        <p className="hero__subtitle">
          Palantir-certified developer at Accenture, building Foundry pipelines, Ontology models,
          and Workshop applications that turn aviation engineering data into operational decisions.
        </p>
        <div className="hero__actions">
          <a href="#projects" className="btn btn--primary">
            View projects
          </a>
          <a href="#contact" className="btn btn--ghost">
            Contact me
          </a>
          <a href="/ShankarCV.pdf" download="Shankar-B-Puthani-CV.pdf" className="btn btn--ghost">
            Download CV
          </a>
        </div>
        <div className="hero__meta">
          {CERTIFICATIONS.map((cert) => (
            <a key={cert.title} href="#certifications" className="hero__tag hero__tag--brand">
              {cert.logo ? <BrandMark src={cert.logo} size="sm" /> : '✓ '}
              {cert.title}
            </a>
          ))}
          <div className="hero__tag">Engineering Services Analyst · Accenture</div>
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
