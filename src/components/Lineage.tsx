import { Fragment } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { LINEAGE_STAGES } from '../data';

export const Lineage = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="how-i-build"
      className="section animate-target"
      aria-labelledby="how-i-build-title"
    >
      <header className="section__header">
        <h2 id="how-i-build-title" className="section__title">
          How I Build on Foundry
        </h2>
        <p className="section__kicker">From raw data to decisions, one governed flow.</p>
      </header>

      <ol className="lineage" aria-label="Foundry data flow">
        {LINEAGE_STAGES.map((stage, i) => (
          <Fragment key={stage.title}>
            {i > 0 && (
              <li className="lineage__edge" aria-hidden="true">
                <span className="lineage__flow" />
              </li>
            )}
            <li className="lineage__node">
              <span className="lineage__step">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="lineage__title">{stage.title}</h3>
              <p className="lineage__caption">{stage.caption}</p>
              <ul className="lineage__items">
                {stage.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          </Fragment>
        ))}
      </ol>

      <p className="lineage__loop">
        <span aria-hidden="true">↺</span> Decisions made in apps write back to the Ontology
        through Actions, so the next decision starts from current data.
      </p>
    </section>
  );
};
