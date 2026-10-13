import { useScrollReveal } from '../hooks/useScrollReveal';
import { EXPERIENCE } from '../data';

export const Experience = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="experience"
      className="section animate-target"
      aria-labelledby="experience-title"
    >
      <header className="section__header">
        <h2 id="experience-title" className="section__title">
          Experience
        </h2>
        <p className="section__kicker">Roles where I applied engineering services at scale.</p>
      </header>
      <div className="timeline">
        {EXPERIENCE.map((item) => (
          <article key={item.title} className="timeline-item">
            <div className="timeline-item__side">
              <div className="timeline-item__date">{item.date}</div>
              <div className="timeline-item__location">{item.location}</div>
            </div>
            <div className="timeline-item__body">
              <h3 className="timeline-item__title">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
