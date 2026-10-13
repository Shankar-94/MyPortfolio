import { useScrollReveal } from '../hooks/useScrollReveal';

export const About = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="about"
      className="section animate-target"
      aria-labelledby="about-title"
    >
      <header className="section__header">
        <h2 id="about-title" className="section__title">
          About
        </h2>
        <p className="section__kicker">Who I am &amp; how I think about engineering.</p>
      </header>
      <div className="section__body section__body--split">
        <div className="about__text">
          <p>
            I am Shankar B Puthani, an Engineering Services Analyst at Accenture, Bengaluru.
            Since joining in January 2024, I have built and delivered solutions across the
            aviation domain — from inspection and defect management platforms to engineering
            data validation tools and operational dashboards.
          </p>
          <p>
            My work spans React, TypeScript, Python, C#, and Palantir Slate, with a focus
            on automation, clean interfaces, and tools that genuinely reduce manual effort
            for the people using them. I care about writing maintainable code, integrating
            APIs reliably, and shipping things that work in production.
          </p>
        </div>
        <div className="about__photo-wrap">
          <img
            src="/Media.jpeg"
            alt="Shankar B Puthani"
            className="about__photo"
          />
        </div>
      </div>
    </section>
  );
};
