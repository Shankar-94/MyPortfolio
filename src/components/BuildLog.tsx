import { useScrollReveal } from '../hooks/useScrollReveal';
import { useSkillBar } from '../hooks/useSkillBar';
import { PROJECTS } from '../data';
import type { Project } from '../types';

const BuildLogRow = ({ project }: { project: Project }) => {
  const milestones = project.milestones ?? [];
  const doneCount = milestones.filter((m) => m.done).length;
  const pct = milestones.length ? Math.round((doneCount / milestones.length) * 100) : 0;
  const [width, barRef] = useSkillBar(pct);
  const nextIdx = milestones.findIndex((m) => !m.done);

  return (
    <article className="card build-log__row">
      <div className="build-log__head">
        <h3 className="card__title build-log__title">{project.title}</h3>
        <span className="build-log__pct">
          {doneCount}/{milestones.length} · {pct}%
        </span>
      </div>

      <div
        ref={barRef}
        className="skill-bar__track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${project.title} progress`}
      >
        <div className="skill-bar__fill" style={{ width }} />
      </div>

      <ol className="build-log__steps">
        {milestones.map((m, i) => (
          <li
            key={m.label}
            className={`build-log__step${m.done ? ' is-done' : ''}${i === nextIdx ? ' is-next' : ''}`}
          >
            <span className="build-log__dot" aria-hidden="true">
              {m.done ? '✓' : i + 1}
            </span>
            <span>
              {m.label}
              <span className="visually-hidden">
                {m.done ? ' (done)' : i === nextIdx ? ' (in progress)' : ' (to do)'}
              </span>
            </span>
          </li>
        ))}
      </ol>

      {project.updated && (
        <p className="build-log__updated">Last updated {project.updated}</p>
      )}
    </article>
  );
};

export const BuildLog = () => {
  const ref = useScrollReveal<HTMLElement>();
  const tracked = PROJECTS.filter((p) => p.milestones && p.milestones.length > 0);

  if (tracked.length === 0) return null;

  return (
    <section
      ref={ref}
      id="build-log"
      className="section animate-target"
      aria-labelledby="build-log-title"
    >
      <header className="section__header">
        <h2 id="build-log-title" className="section__title">
          Build Log
        </h2>
        <p className="section__kicker">Live progress on the Foundry projects I&apos;m building.</p>
      </header>
      <div className="build-log">
        {tracked.map((project) => (
          <BuildLogRow key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};
