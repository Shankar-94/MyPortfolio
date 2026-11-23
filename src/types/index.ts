export interface SkillBar {
  label: string;
  percentage: number;
}

export interface SkillCategory {
  title: string;
  /** Optional logo image under /public, shown next to the title. */
  logo?: string;
  skills: SkillBar[];
}

export interface Project {
  meta: string;
  /** Optional logo image under /public, shown in the card corner. */
  logo?: string;
  title: string;
  description: string;
  tags: string[];
  /** Shows an "In progress" badge. Remove when the project is finished. */
  status?: 'in-progress';
  liveUrl?: string;
  sourceUrl?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  /** Optional issuer logo under /public. */
  logo?: string;
  /** e.g. 'Nov 2026'. Omit if you don't want a date shown. */
  date?: string;
  /** Path under /public, e.g. '/certificates/my-cert.pdf' (PDF or image). */
  file?: string;
  /** Optional preview image under /public, e.g. '/certificates/my-cert.png'. */
  image?: string;
  /** Optional public verification link (e.g. Credly badge URL). */
  verifyUrl?: string;
  skills?: string[];
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
