export type ModuleId =
  | 'architecture'
  | 'lifecycle'
  | 'authconcepts'
  | 'authentication'
  | 'jwt'
  | 'protected'
  | 'rbac'
  | 'endtoend'
  | 'crud'
  | 'validation'
  | 'errors'
  | 'middleware';

export type ModuleSection = 'fundamentals' | 'auth' | 'advanced';

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
  fundamentals: {
    label: 'Fundamentals',
    color: 'text-blue-700',
    activeBg: 'bg-blue-50',
    activeBorder: 'border-blue-600',
  },
  auth: {
    label: 'Authentication & Security',
    color: 'text-violet-700',
    activeBg: 'bg-violet-50',
    activeBorder: 'border-violet-600',
  },
  advanced: {
    label: 'Advanced Topics',
    color: 'text-emerald-700',
    activeBg: 'bg-emerald-50',
    activeBorder: 'border-emerald-600',
  },
};

export const learningModules: LearningModule[] = [
  {
    id: 'architecture',
    label: 'Architecture',
    shortLabel: 'Architecture',
    section: 'fundamentals',
    description: 'Layered Express app structure',
  },
  {
    id: 'lifecycle',
    label: 'Request Lifecycle',
    shortLabel: 'Lifecycle',
    section: 'fundamentals',
    description: 'How a request moves through the stack',
  },
  {
    id: 'authconcepts',
    label: 'Auth vs Authorization',
    shortLabel: 'Auth/Authz',
    section: 'auth',
    description: 'Who are you? vs what may you do? — 401 vs 403',
  },
  {
    id: 'authentication',
    label: 'Authentication',
    shortLabel: 'Auth',
    section: 'auth',
    description: 'Identity: register, login, hash passwords, issue JWT',
  },
  {
    id: 'jwt',
    label: 'JWT Tokens',
    shortLabel: 'JWT',
    section: 'auth',
    description: 'Token format and verification (authentication)',
  },
  {
    id: 'protected',
    label: 'Protected Routes',
    shortLabel: 'Protected',
    section: 'auth',
    description: 'Middleware guards and access scenarios',
  },
  {
    id: 'rbac',
    label: 'RBAC',
    shortLabel: 'RBAC',
    section: 'auth',
    description: 'Permissions by role (authorization)',
  },
  {
    id: 'endtoend',
    label: 'End-to-End',
    shortLabel: 'E2E',
    section: 'auth',
    description: 'Full secure request flow',
  },
  {
    id: 'crud',
    label: 'CRUD Operations',
    shortLabel: 'CRUD',
    section: 'advanced',
    description: 'Create, read, update, delete patterns',
  },
  {
    id: 'validation',
    label: 'Validation',
    shortLabel: 'Validation',
    section: 'advanced',
    description: 'Input validation and sanitization',
  },
  {
    id: 'errors',
    label: 'Error Handling',
    shortLabel: 'Errors',
    section: 'advanced',
    description: 'Consistent API error responses',
  },
  {
    id: 'middleware',
    label: 'Middleware',
    shortLabel: 'Middleware',
    section: 'advanced',
    description: 'Pipeline order and responsibilities',
  },
];

const sectionOrder: ModuleSection[] = ['fundamentals', 'auth', 'advanced'];

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

export { sectionOrder };
