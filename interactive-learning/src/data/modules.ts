export type ModuleId =
  | 'day1story'
  | 'httprequest'
  | 'nodeserver'
  | 'expressroutes'
  | 'architecture'
  | 'lifecycle'
  | 'persistence'
  | 'mongodb'
  | 'mongorepo'
  | 'authconcepts'
  | 'authentication'
  | 'jwt'
  | 'protected'
  | 'rbac'
  | 'endtoend'
  | 'authmongo'
  | 'practicalhttp'
  | 'crud'
  | 'validation'
  | 'errors'
  | 'middleware';

export type ModuleSection = 'day1' | 'day2' | 'day3' | 'day4';

export interface LearningModule {
  id: ModuleId;
  label: string;
  shortLabel: string;
  section: ModuleSection;
  description: string;
}

export const sectionMeta: Record<
  ModuleSection,
  { label: string; color: string; activeBg: string; activeBorder: string }
> = {
  day1: {
    label: 'Day 1 — The request arrives',
    color: 'text-amber-700',
    activeBg: 'bg-amber-50',
    activeBorder: 'border-amber-600',
  },
  day2: {
    label: 'Day 2 — Structured application',
    color: 'text-blue-700',
    activeBg: 'bg-blue-50',
    activeBorder: 'border-blue-600',
  },
  day3: {
    label: 'Day 3 — Persistent storage',
    color: 'text-emerald-700',
    activeBg: 'bg-emerald-50',
    activeBorder: 'border-emerald-600',
  },
  day4: {
    label: 'Day 4 — Trust & authorization',
    color: 'text-violet-700',
    activeBg: 'bg-violet-50',
    activeBorder: 'border-violet-600',
  },
};

/** Curriculum order: Day 1 → 2 → 3 → 4 modules in sidebar and pagination. */
export const learningModules: LearningModule[] = [
  {
    id: 'day1story',
    label: 'A Request Arrives',
    shortLabel: 'Opening',
    section: 'day1',
    description: 'Maya clicks Add task in the React app; POST /tasks leaves the client layer',
  },
  {
    id: 'httprequest',
    label: 'HTTP & the Request',
    shortLabel: 'HTTP',
    section: 'day1',
    description: 'Method, URL, headers, and body',
  },
  {
    id: 'nodeserver',
    label: 'Node Native Server',
    shortLabel: 'Node HTTP',
    section: 'day1',
    description: 'Manual routing with the http module',
  },
  {
    id: 'expressroutes',
    label: 'First Express Routes',
    shortLabel: 'Express',
    section: 'day1',
    description: 'app.get, app.post, req and res',
  },
  {
    id: 'architecture',
    label: 'Architecture',
    shortLabel: 'Architecture',
    section: 'day2',
    description: 'Layered Express app structure',
  },
  {
    id: 'lifecycle',
    label: 'Request Lifecycle',
    shortLabel: 'Lifecycle',
    section: 'day2',
    description: 'How a request moves through the stack',
  },
  {
    id: 'crud',
    label: 'CRUD Operations',
    shortLabel: 'CRUD',
    section: 'day2',
    description: 'Create, read, update, delete patterns',
  },
  {
    id: 'middleware',
    label: 'Middleware',
    shortLabel: 'Middleware',
    section: 'day2',
    description: 'Pipeline order and responsibilities',
  },
  {
    id: 'validation',
    label: 'Validation',
    shortLabel: 'Validation',
    section: 'day2',
    description: 'Input validation and sanitization',
  },
  {
    id: 'errors',
    label: 'Error Handling',
    shortLabel: 'Errors',
    section: 'day2',
    description: 'Consistent API error responses',
  },
  {
    id: 'persistence',
    label: 'Why Persistence?',
    shortLabel: 'Persistence',
    section: 'day3',
    description: 'In-memory vs data that survives restart',
  },
  {
    id: 'mongodb',
    label: 'MongoDB & Connection',
    shortLabel: 'MongoDB',
    section: 'day3',
    description: 'Env, Mongoose, and task-mongo setup',
  },
  {
    id: 'mongorepo',
    label: 'Repository with Mongo',
    shortLabel: 'Mongo Repo',
    section: 'day3',
    description: 'Same interface, MongoDB implementation',
  },
  {
    id: 'authconcepts',
    label: 'Auth vs Authorization',
    shortLabel: 'Auth/Authz',
    section: 'day4',
    description: 'Who are you? vs what may you do? — 401 vs 403',
  },
  {
    id: 'authentication',
    label: 'Authentication',
    shortLabel: 'Auth',
    section: 'day4',
    description: 'Identity: register, login, hash passwords, issue JWT',
  },
  {
    id: 'jwt',
    label: 'JWT Tokens',
    shortLabel: 'JWT',
    section: 'day4',
    description: 'Token format and verification (authentication)',
  },
  {
    id: 'protected',
    label: 'Protected Routes',
    shortLabel: 'Protected',
    section: 'day4',
    description: 'Middleware guards and access scenarios',
  },
  {
    id: 'rbac',
    label: 'RBAC',
    shortLabel: 'RBAC',
    section: 'day4',
    description: 'Permissions by role (authorization)',
  },
  {
    id: 'endtoend',
    label: 'End-to-End',
    shortLabel: 'E2E',
    section: 'day4',
    description: 'Full secure request flow',
  },
  {
    id: 'authmongo',
    label: 'Auth + MongoDB',
    shortLabel: 'Auth Mongo',
    section: 'day4',
    description: 'Users and tasks collections; Day 3 → Day 4',
  },
  {
    id: 'practicalhttp',
    label: 'Call the API: fetch & axios',
    shortLabel: 'fetch/axios',
    section: 'day4',
    description: 'Copy-paste login and protected requests against port 4000',
  },
];

const sectionOrder: ModuleSection[] = ['day1', 'day2', 'day3', 'day4'];

export function getModuleIndex(id: ModuleId): number {
  return learningModules.findIndex((m) => m.id === id);
}

export function getAdjacentModule(id: ModuleId, direction: 'prev' | 'next'): LearningModule | null {
  const index = getModuleIndex(id);
  if (index === -1) return null;
  const nextIndex = direction === 'next' ? index + 1 : index - 1;
  return learningModules[nextIndex] ?? null;
}

export function modulesBySection(section: ModuleSection): LearningModule[] {
  return learningModules.filter((m) => m.section === section);
}

export function getFirstModuleInSection(section: ModuleSection): LearningModule {
  const modules = modulesBySection(section);
  return modules[0]!;
}

export function getModuleIndexInSection(id: ModuleId): number {
  const module = learningModules.find((m) => m.id === id);
  if (!module) return -1;
  return modulesBySection(module.section).findIndex((m) => m.id === id);
}

/** Prev/next within the same curriculum day only. */
export function getAdjacentModuleInSection(
  id: ModuleId,
  direction: 'prev' | 'next'
): LearningModule | null {
  const current = learningModules.find((m) => m.id === id);
  if (!current) return null;
  const dayModules = modulesBySection(current.section);
  const index = dayModules.findIndex((m) => m.id === id);
  if (index === -1) return null;
  const nextIndex = direction === 'next' ? index + 1 : index - 1;
  return dayModules[nextIndex] ?? null;
}

export { sectionOrder };
