export const crudOperationStyles = {
  POST: {
    badgeColor: 'green' as const,
    selected: 'border-green-600 bg-green-50',
    idle: 'border-slate-200 bg-white hover:border-slate-300',
  },
  GET: {
    badgeColor: 'blue' as const,
    selected: 'border-blue-600 bg-blue-50',
    idle: 'border-slate-200 bg-white hover:border-slate-300',
  },
  PUT: {
    badgeColor: 'blue' as const,
    selected: 'border-blue-600 bg-blue-50',
    idle: 'border-slate-200 bg-white hover:border-slate-300',
  },
  DELETE: {
    badgeColor: 'red' as const,
    selected: 'border-red-600 bg-red-50',
    idle: 'border-slate-200 bg-white hover:border-slate-300',
  },
} as const;

export type CrudHttpMethod = keyof typeof crudOperationStyles;

export const crudContent = {
  keyConcept: {
    title: 'Key Concept',
    intro:
      'Every CRUD operation follows the same layer pattern. The specific implementation varies, but the architectural flow remains consistent. This predictability makes Express applications easier to understand, test, and maintain.',
    whyLayersTitle: 'Why layers matter:',
    bullets: [
      'Tests can mock each layer independently',
      "Database changes don't affect business logic",
      'Validation logic stays in one place',
    ],
  },
  flowTitle: '📊 Flow Through Layers',
} as const;
