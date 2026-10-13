import { useScrollReveal } from '../hooks/useScrollReveal';
import { SkillBar } from './SkillBar';
import { SKILL_CATEGORIES } from '../data';

export const Skills = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="skills"
      className="section animate-target"
      aria-labelledby="skills-title"
    >
      <header className="section__header">
        <h2 id="skills-title" className="section__title">
          Skills
        </h2>
        <p className="section__kicker">The tools and concepts I use most often.</p>
      </header>
      <div className="skills-grid">
        {SKILL_CATEGORIES.map((category) => (
          <article key={category.title} className="card card--skill">
            <h3 className="card__title">{category.title}</h3>
            <div className="skill-bar-list">
              {category.skills.map((skill) => (
                <SkillBar key={skill.label} skill={skill} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
