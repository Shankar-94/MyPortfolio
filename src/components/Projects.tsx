import { useScrollReveal } from '../hooks/useScrollReveal';
import { PROJECTS } from '../data';

export const Projects = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="projects"
      className="section animate-target"
      aria-labelledby="projects-title"
    >
      <header className="section__header">
        <h2 id="projects-title" className="section__title">
          Projects
        </h2>
        <p className="section__kicker">Selected work that reflects my engineering focus.</p>
      </header>
      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <article key={project.title} className="card card--project">
            <div className="card__meta">{project.meta}</div>
            <h3 className="card__title">{project.title}</h3>
            <p className="card__text">{project.description}</p>
            <ul className="pill-list pill-list--tight">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {(project.liveUrl || project.sourceUrl) && (
              <div className="card__actions">
                {project.liveUrl && (
                  <a href={project.liveUrl} className="btn btn--ghost btn--sm">
                    Live site
                  </a>
                )}
                {project.sourceUrl && (
                  <a href={project.sourceUrl} className="btn btn--ghost btn--sm">
                    Source
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
