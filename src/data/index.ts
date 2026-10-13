import type { SkillCategory, Project, ExperienceItem, StatItem } from '../types';

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export const TYPED_PHRASES = [
  'builds scalable React & TypeScript applications.',
  'automates workflows with Python & C#.',
  'delivers operational insights on Palantir.',
  'crafts responsive, accessible interfaces.',
];

export const HERO_STACK_ITEMS = [
  'React · TypeScript · Python · C# · .NET',
  'Palantir Foundry & Slate · REST APIs · Excel Automation',
  'OpenCV · EasyOCR · Computer Vision · Data Processing',
];

export const STATS: StatItem[] = [
  { target: 2.7, suffix: '+', label: 'Years Experience' },
  { target: 6, suffix: '+', label: 'Projects Delivered' },
  { target: 10, suffix: '+', label: 'Technologies' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend & Apps',
    skills: [
      { label: 'React', percentage: 90 },
      { label: 'TypeScript', percentage: 85 },
      { label: 'Component UI', percentage: 88 },
      { label: 'State Management', percentage: 80 },
    ],
  },
  {
    title: 'System Design',
    skills: [
      { label: 'Architecture', percentage: 78 },
      { label: 'API Design', percentage: 75 },
      { label: 'Data Modeling', percentage: 80 },
      { label: 'Documentation', percentage: 85 },
    ],
  },
  {
    title: 'Platforms & Tools',
    skills: [
      { label: 'Palantir', percentage: 82 },
      { label: 'Git / GitHub', percentage: 88 },
      { label: 'CI/CD', percentage: 70 },
      { label: 'Monitoring', percentage: 72 },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    meta: 'Oct 2025 — Sept 2026 · Featured',
    title: 'Aircraft Operations Insights Dashboard',
    description:
      'Aircraft inspection and defect management platform built with React, TypeScript, and Python Flask. Delivered inspection workflows, image annotation, attachment management, REST API integration, and role-based access control (RBAC) with a focus on reusable components and responsive design.',
    tags: ['React', 'TypeScript', 'Python Flask', 'RBAC', 'REST API'],
  },
  {
    meta: 'Accenture · Engineering · Featured',
    title: 'APSNG Automation',
    description:
      'Automation solution to reduce manual effort in validating aircraft engineering data. Processes Part Numbers and Drawing Set (DS) information, performs rule-based validations including alternate DS checks, and generates structured Excel reports to surface discrepancies clearly. Contributed to validation logic, API-based data extraction, data processing, and automated report generation.',
    tags: ['C# .net', 'REST APIs', 'Excel Automation', 'Data Processing'],
  },
  {
    meta: 'Accenture · Engineering · Featured',
    title: 'ACPNG Automation',
    description:
      'Automation solution to simplify repetitive engineering validation and data-processing activities. Collects, processes, validates, and presents engineering information through a structured workflow, reducing manual effort for users. Contributed to automation logic, data handling, validation workflows, and structured result generation.',
    tags: ['C# .net', 'Automation', 'Data Processing'],
  },
  {
    meta: 'Accenture · Engineering · Featured',
    title: 'NOVO Screenshot Automation Tool',
    description:
      'Python desktop automation tool that uses OCR and computer vision to extract structured engineering data from screenshots and images. Built an automated pipeline covering image preprocessing, Part/DS/Assembly/CA code extraction, batch processing, data summarization, and formatted Excel report generation.',
    tags: ['Python', 'OpenCV', 'EasyOCR', 'Tkinter', 'OpenPyXL', 'Pillow'],
  },
  {
    meta: 'Accenture · Engineering',
    title: 'CSS Switcher',
    description:
      'Component preview and export platform that lets users switch between Airbus and Accenture CSS themes and instantly compare how UI components render under each design system. Auto-generates a searchable component catalogue from project folders with support for code inspection, copying, PNG/SVG downloads, bulk ZIP export, and Draw.io library generation.',
    tags: ['Python', 'JavaScript', 'HTML', 'CSS', 'BeautifulSoup', 'JSZip', 'html2canvas'],
  },
  {
    meta: 'Accenture · Engineering',
    title: 'Palantir Slate Dashboards',
    description:
      'Developed interactive Slate dashboards on the Palantir platform to surface operational data and support decision-making. Focused on data modeling, widget configuration, and connecting data pipelines to user-facing views.',
    tags: ['Palantir', 'Slate', 'Data Modeling', 'Dashboards'],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    date: 'Jan 2024 — Present',
    location: 'Accenture / Bengaluru',
    title: 'Engineering Services Analyst',
    description:
      'Built and delivered multiple engineering solutions across the aviation domain. Developed the Aircraft Operations Insights Dashboard — an inspection and defect management platform using React, TypeScript, and Python Flask with RBAC, image annotation, and REST API integration. Engineered C#-based automation tools (APSNG, ACPNG) for aircraft engineering data validation and Excel report generation. Created the NOVO Screenshot Automation Tool using Python, OpenCV, and EasyOCR for OCR-based data extraction from images. Built the CSS Switcher — a component preview platform supporting Airbus and Accenture design systems. Developed Palantir Slate dashboards to surface operational data and support decision-making.',
  },
];
