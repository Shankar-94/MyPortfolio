export interface SkillBar {
  label: string;
  percentage: number;
}

export interface SkillCategory {
  title: string;
  skills: SkillBar[];
}

export interface Project {
  meta: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

export interface ExperienceItem {
  date: string;
  location: string;
  title: string;
  description: string;
}

export interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

export type Theme = 'light' | 'dark';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}
