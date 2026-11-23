import { useMemo, useState } from 'react';
import { PROJECTS } from '../data';
import { BrandMark } from './BrandMark';

/** Merge tag spellings so one technology is counted once. */
const TAG_ALIASES: Record<string, string> = {
  'Palantir Foundry': 'Foundry',
  'C# .net': 'C# / .NET',
  'REST API': 'REST APIs',
  'Python Flask': 'Python',
  'Python Transforms': 'Python',
  'Incremental Pipelines': 'Pipelines',
  'Excel Automation': 'Automation',
};

/** Technologies that get the Palantir emblem beside their label. */
const PALANTIR_TECH = new Set([
  'Foundry', 'Ontology', 'Workshop', 'Slate', 'Code Repositories',
  'Pipelines', 'Actions', 'OSDK', 'Data Expectations',
]);

const PALANTIR_LOGO = '/palantir-emblem-mark.png';
const MAX_ROWS = 12;

interface TechRow {
  name: string;
  delivered: number;
  inProgress: number;
  total: number;
  projects: { title: string; inProgress: boolean }[];
}

const useTechUsage = (): TechRow[] =>
  useMemo(() => {
    const map = new Map<string, TechRow>();
    for (const project of PROJECTS) {
      const inProgress = project.status === 'in-progress';
      const seen = new Set<string>();
      for (const tag of project.tags) {
        const name = TAG_ALIASES[tag] ?? tag;
        if (seen.has(name)) continue; // count each project once per tech
        seen.add(name);
        const row = map.get(name) ?? { name, delivered: 0, inProgress: 0, total: 0, projects: [] };
        if (inProgress) row.inProgress++;
        else row.delivered++;
        row.total++;
        row.projects.push({ title: project.title, inProgress });
        map.set(name, row);
      }
    }
    return [...map.values()]
      .filter((r) => r.total > 1)
      .sort((a, b) => b.total - a.total || b.delivered - a.delivered || a.name.localeCompare(b.name))
      .slice(0, MAX_ROWS);
  }, []);

export const TechUsageChart = () => {
  const rows = useTechUsage();
  const [active, setActive] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false);

  if (rows.length === 0) return null;

  const max = Math.max(...rows.map((r) => r.total));
  const ticks = Array.from({ length: max + 1 }, (_, i) => i);
  const pct = (n: number) => `${(n / max) * 100}%`;

  return (
    <article className="card tech-chart" aria-labelledby="tech-chart-title">
      <div className="tech-chart__header">
        <div>
          <h3 id="tech-chart-title" className="card__title tech-chart__title">
            Technologies across my projects
          </h3>
          <p className="tech-chart__sub">Number of projects using each technology</p>
        </div>
        <div className="tech-chart__controls">
          <ul className="tech-chart__legend" aria-label="Legend">
            <li><span className="tech-chart__swatch tech-chart__swatch--delivered" />Delivered</li>
            <li><span className="tech-chart__swatch tech-chart__swatch--progress" />In progress</li>
          </ul>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            aria-pressed={showTable}
            onClick={() => setShowTable((s) => !s)}
          >
            {showTable ? 'View as chart' : 'View as table'}
          </button>
        </div>
      </div>

      {showTable ? (
        <div className="tech-chart__table-wrap">
          <table className="tech-chart__table">
            <thead>
              <tr>
                <th scope="col">Technology</th>
                <th scope="col">Delivered</th>
                <th scope="col">In progress</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <th scope="row">{r.name}</th>
                  <td>{r.delivered}</td>
                  <td>{r.inProgress}</td>
                  <td>{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="tech-chart__plot" role="list">
          {rows.map((r) => (
            <div
              key={r.name}
              role="listitem"
              tabIndex={0}
              className={`tech-chart__row${active === r.name ? ' is-active' : ''}${
                active && active !== r.name ? ' is-dimmed' : ''
              }`}
              aria-label={`${r.name}: ${r.delivered} delivered, ${r.inProgress} in progress`}
              onMouseEnter={() => setActive(r.name)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(r.name)}
              onBlur={() => setActive(null)}
            >
              <span className="tech-chart__label">
                {PALANTIR_TECH.has(r.name) && <BrandMark src={PALANTIR_LOGO} size="sm" />}
                {r.name}
              </span>
              <span className="tech-chart__track">
                {ticks.map((t) => (
                  <span key={t} className="tech-chart__grid" style={{ left: pct(t) }} aria-hidden="true" />
                ))}
                <span className="tech-chart__bar" style={{ width: pct(r.total) }} aria-hidden="true">
                  {r.delivered > 0 && (
                    <span className="tech-chart__seg tech-chart__seg--delivered" style={{ flexGrow: r.delivered }} />
                  )}
                  {r.inProgress > 0 && (
                    <span className="tech-chart__seg tech-chart__seg--progress" style={{ flexGrow: r.inProgress }} />
                  )}
                </span>
                <span className="tech-chart__value" style={{ left: pct(r.total) }} aria-hidden="true">
                  {r.total}
                </span>
                {active === r.name && (
                  <span className="tech-chart__tooltip" role="tooltip">
                    <strong>{r.name}</strong>
                    <span>
                      {r.delivered} delivered · {r.inProgress} in progress
                    </span>
                    <span className="tech-chart__tooltip-list">
                      {r.projects.map((p) => (
                        <span key={p.title}>
                          <span
                            className={`tech-chart__swatch tech-chart__swatch--${p.inProgress ? 'progress' : 'delivered'}`}
                          />
                          {p.title}
                        </span>
                      ))}
                    </span>
                  </span>
                )}
              </span>
            </div>
          ))}
          <div className="tech-chart__axis" aria-hidden="true">
            <span />
            <span className="tech-chart__axis-track">
              {ticks.map((t) => (
                <span key={t} className="tech-chart__tick" style={{ left: pct(t) }}>
                  {t}
                </span>
              ))}
            </span>
          </div>
        </div>
      )}
    </article>
  );
};
