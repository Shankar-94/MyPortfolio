import { useSkillBar } from '../hooks/useSkillBar';
import type { SkillBar as SkillBarType } from '../types';

interface SkillBarProps {
  skill: SkillBarType;
}

export const SkillBar = ({ skill }: SkillBarProps) => {
  const [width, ref] = useSkillBar(skill.percentage);

  return (
    <div className="skill-bar">
      <div className="skill-bar__label">
        <span>{skill.label}</span>
        <span className="skill-bar__pct">{skill.percentage}%</span>
      </div>
      <div ref={ref} className="skill-bar__track">
        <div className="skill-bar__fill" style={{ width }} />
      </div>
    </div>
  );
};
