import type {
  SkillCategory,
  Project,
  ExperienceItem,
  StatItem,
  Certification,
  Milestone,
  LineageStage,
} from '../types';

/** Career start (joined Accenture, Jan 2024). Experience is calculated from this. */
const CAREER_START = new Date(2024, 0, 1);

/** Whole years plus one decimal, rounded DOWN so the "+" is always true. */
const yearsSince = (start: Date): number => {
  const years = (Date.now() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return Math.floor(years * 10) / 10;
};

/** Small Palantir emblem shown next to Palantir-related items (set via `logo`). */
const PALANTIR_LOGO = '/palantir-emblem-mark.png';

/**
 * Build Log helper: the first `completed` milestones are marked done.
 * To record progress, just raise the number (and update `updated`).
 */
const steps = (completed: number, labels: string[]): Milestone[] =>
  labels.map((label, i) => ({ label, done: i < completed }));

/** "How I build on Foundry" lineage diagram, left to right. */
export const LINEAGE_STAGES: LineageStage[] = [
  {
    title: 'Sources',
    caption: 'Raw data lands untouched',
    items: ['CSV exports', 'APIs', 'Reference data'],
  },
  {
    title: 'Pipelines',
    caption: 'Code Repositories',
    items: ['PySpark transforms', 'Unit tests', 'Data expectations'],
  },
  {
    title: 'Ontology',
    caption: 'The operational model',
    items: ['Object types', 'Links', 'Actions'],
  },
  {
    title: 'Applications',
    caption: 'Where decisions happen',
    items: ['Workshop', 'Slate', 'OSDK (React + TS)'],
  },
];

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

/** Locations shown in the hero "Open to Palantir Foundry roles" line. */
export const AVAILABILITY = ['Bengaluru', 'Europe', 'Australia', 'USA'];

export const TYPED_PHRASES = [
  'builds operational applications on Palantir Foundry.',
  'models real-world operations in the Foundry Ontology.',
  'builds data pipelines in Foundry Code Repositories.',
  'turns engineering data into Workshop apps people use.',
];

export const HERO_STACK_ITEMS = [
  'Palantir Foundry · Ontology · Workshop · Slate',
  'Pipelines · Code Repositories · Data Modeling',
  'Python · TypeScript · React · C# · REST APIs',
];

/**
 * Certifications — to add a new one:
 *   1. Put the file in public/certificates/ (PDF, PNG or JPG).
 *   2. Add an entry below. `file` and `image` paths start with /certificates/.
 * Every entry is also shown as a badge in the hero section. Newest first.
 */
export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Palantir Associate AI Engineer',
    issuer: 'Palantir Technologies',
    logo: PALANTIR_LOGO,
    verifyUrl: 'https://verify.skilljar.com/c/2rk5pwnnhg88',
    skills: ['AIP', 'LLMs in Foundry', 'Ontology', 'AI Engineering'],
  },
  {
    title: 'Palantir Associate Application Developer',
    issuer: 'Palantir Technologies',
    logo: PALANTIR_LOGO,
    verifyUrl: 'https://verify.skilljar.com/c/cy4vd8286ngq',
    skills: ['Foundry', 'Ontology', 'Workshop', 'Application Development'],
  },
];

export const STATS: StatItem[] = [
  { target: yearsSince(CAREER_START), suffix: '+', label: 'Years Experience' },
  { target: 6, suffix: '+', label: 'Projects Delivered' },
  { target: 10, suffix: '+', label: 'Technologies' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Palantir Foundry',
    logo: PALANTIR_LOGO,
    skills: [
      { label: 'Ontology Modeling', percentage: 80 },
      { label: 'Workshop Applications', percentage: 80 },
      { label: 'Pipelines & Code Repositories', percentage: 75 },
      { label: 'Slate Dashboards', percentage: 82 },
    ],
  },
  {
    title: 'Data & Integration',
    skills: [
      { label: 'Python', percentage: 85 },
      { label: 'Data Modeling', percentage: 80 },
      { label: 'Data Validation & Processing', percentage: 85 },
      { label: 'REST API Integration', percentage: 80 },
    ],
  },
  {
    title: 'Application Development',
    skills: [
      { label: 'TypeScript', percentage: 85 },
      { label: 'React', percentage: 88 },
      { label: 'C# / .NET Automation', percentage: 78 },
      { label: 'Git / GitHub', percentage: 88 },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    meta: 'Accenture · Palantir Foundry · Featured',
    logo: PALANTIR_LOGO,
    title: 'Palantir Foundry Operational Solutions',
    description:
      'Built solutions on Palantir Foundry to make aviation operations data usable for decision-making. Developed data pipelines in Code Repositories to ingest and transform source data, modeled it as Ontology object types and links, and delivered Workshop applications and Slate dashboards that put operational data in front of the teams that act on it.',
    tags: ['Palantir Foundry', 'Ontology', 'Workshop', 'Code Repositories', 'Pipelines', 'Slate'],
  },
  // ── Personal Foundry projects (in progress) ─────────────────────────────
  // Build guide: docs/palantir-project-plans.md
  // When one is finished: remove `status`, update the description to past
  // tense, and add sourceUrl / liveUrl (e.g. GitHub repo or demo video).
  {
    meta: 'Personal project · Palantir Foundry',
    logo: PALANTIR_LOGO,
    title: 'Aviation Defect Intelligence Ontology',
    status: 'in-progress',
    description:
      'Building an end-to-end Foundry solution on public FAA Service Difficulty Reports: PySpark pipelines in Code Repositories clean and link defect, aircraft, and part data into an Ontology, and a Workshop triage app lets engineers filter recurring defects and assign, escalate, or close them through Ontology Actions.',
    tags: ['Foundry', 'Ontology', 'Actions', 'Workshop', 'PySpark', 'Code Repositories'],
    updated: 'Nov 2026',
    milestones: steps(1, [
      'Plan & design',
      'Data ingested',
      'Pipelines + tests',
      'Ontology objects & links',
      'Actions',
      'Workshop app',
      'Demo & write-up',
    ]),
  },
  {
    meta: 'Personal project · Palantir Foundry + OSDK',
    logo: PALANTIR_LOGO,
    title: 'Fleet Inspection Companion (OSDK App)',
    status: 'in-progress',
    description:
      'Building a React and TypeScript web app on the Palantir Ontology SDK (OSDK) that reads aircraft and defect objects from Foundry and writes inspection findings back through Ontology Actions, with OAuth sign-in and a mobile-friendly inspection workflow.',
    tags: ['OSDK', 'TypeScript', 'React', 'Ontology', 'OAuth'],
    updated: 'Nov 2026',
    milestones: steps(1, [
      'Plan & design',
      'Inspection object & Action',
      'OSDK app + OAuth',
      'Fleet & aircraft views',
      'Inspection writeback',
      'Demo & write-up',
    ]),
  },
  {
    meta: 'Personal project · Palantir Foundry',
    logo: PALANTIR_LOGO,
    title: 'Engineering Data Validation Pipeline',
    status: 'in-progress',
    description:
      'Building a rule-based validation pipeline in Foundry Code Repositories that checks engineering part and drawing-set data, routes failing records to an exceptions dataset with data expectations and unit tests, and surfaces them in a Workshop review inbox where users can resolve each exception.',
    tags: ['Foundry', 'Python Transforms', 'Data Expectations', 'Unit Testing', 'Workshop'],
    updated: 'Nov 2026',
    milestones: steps(1, [
      'Plan & design',
      'Synthetic data',
      'Rules + unit tests',
      'Data expectations',
      'Exceptions Ontology',
      'Review inbox app',
      'Demo & write-up',
    ]),
  },
  {
    meta: 'Personal project · Palantir Foundry',
    logo: PALANTIR_LOGO,
    title: 'Flight Delay Operations Cockpit',
    status: 'in-progress',
    description:
      'Building an operations view on US BTS on-time performance data: incremental pipelines aggregate millions of flight records, the Ontology models flights, airports, and carriers, and a Workshop cockpit shows delay hotspots, root-cause breakdowns, and drill-downs from airport to individual flight.',
    tags: ['Foundry', 'Incremental Pipelines', 'Ontology', 'Workshop', 'Data Modeling'],
    updated: 'Nov 2026',
    milestones: steps(1, [
      'Plan & design',
      'Incremental ingest',
      'Aggregations',
      'Ontology',
      'Workshop cockpit',
      'Demo & write-up',
    ]),
  },
  // ── Professional work ───────────────────────────────────────────────────
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
    meta: 'Accenture · Engineering',
    title: 'NOVO Screenshot Automation Tool',
    description:
      'Python desktop automation tool that uses OCR and computer vision to extract structured engineering data from screenshots and images. Built an automated pipeline covering image preprocessing, Part/DS/Assembly/CA code extraction, batch processing, data summarization, and formatted Excel report generation.',
    tags: ['Python', 'OpenCV', 'EasyOCR', 'Tkinter', 'OpenPyXL', 'Pillow'],
  },
  {
    meta: 'Accenture · Engineering',
    title: 'ACPNG Automation',
    description:
      'Automation solution to simplify repetitive engineering validation and data-processing activities. Collects, processes, validates, and presents engineering information through a structured workflow, reducing manual effort for users. Contributed to automation logic, data handling, validation workflows, and structured result generation.',
    tags: ['C# .net', 'Automation', 'Data Processing'],
  },
  {
    meta: 'Accenture · Engineering',
    title: 'CSS Switcher',
    description:
      'Component preview and export platform that lets users switch between Airbus and Accenture CSS themes and instantly compare how UI components render under each design system. Auto-generates a searchable component catalogue from project folders with support for code inspection, copying, PNG/SVG downloads, bulk ZIP export, and Draw.io library generation.',
    tags: ['Python', 'JavaScript', 'HTML', 'CSS', 'BeautifulSoup', 'JSZip', 'html2canvas'],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    date: 'Jan 2024 — Present',
    location: 'Accenture / Bengaluru',
    title: 'Engineering Services Analyst',
    description:
      'Deliver data and application solutions for the aviation domain, with a growing focus on Palantir Foundry. On Foundry, built pipelines in Code Repositories, modeled operational data in the Ontology, and developed Workshop applications and Slate dashboards to support decision-making. Alongside this, built the Aircraft Operations Insights Dashboard (React, TypeScript, Python Flask) with RBAC, image annotation, and REST API integration; engineered C#-based automation tools (APSNG, ACPNG) for aircraft engineering data validation and Excel reporting; and created the NOVO Screenshot Automation Tool using Python, OpenCV, and EasyOCR for OCR-based data extraction.',
  },
];
