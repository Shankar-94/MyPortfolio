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
          <p className="about__tagline">
            I turn scattered engineering data into Palantir Foundry applications that people rely on to make decisions.
          </p>
          <p>
            I am Shankar B Puthani, an Engineering Services Analyst at Accenture, Bengaluru,
            certified as both a Palantir Associate Application Developer and a Palantir
            Associate AI Engineer. Since joining in January
            2024, I have delivered data and application solutions across the aviation domain,
            and Palantir Foundry is where I am focusing my career.
          </p>
          <p>
            On Foundry I build the full path from raw data to decision: pipelines in Code
            Repositories, Ontology object types and links that model real operations, and
            Workshop applications and Slate dashboards on top. My background in Python,
            TypeScript, React, and C# automation helps me build Foundry solutions that are
            reliable underneath and easy to use on the surface.
          </p>
        </div>
        <div className="about__photo-wrap">
          <img
            src="/Media.jpeg"
            alt="Shankar B Puthani"
            className="about__photo"
            width={240}
            height={240}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};
