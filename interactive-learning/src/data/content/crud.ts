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
      'Every CRUD operation starts in the Taskflow React UI (Add task, View, Edit, Delete) and follows the same layer pattern on the API. The UI action maps to fetch(); the architectural flow through Route → Controller → Service → Repository stays consistent.',
    whyLayersTitle: 'Why layers matter:',
    bullets: [
      'Tests can mock each layer independently',
      "Database changes don't affect business logic",
      'Validation logic stays in one place',
    ],
  },
  flowTitle: '📊 Flow Through Layers',
} as const;
