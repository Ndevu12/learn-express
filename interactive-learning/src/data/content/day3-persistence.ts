import type { LabeledItem } from '../types';

export const persistenceContent = {
  intro:
    'Day 2 keeps tasks in an in-memory array at the repository layer. That is fine for learning structure — until you restart the server and every task disappears. Persistence means data survives process restarts. Maya still uses the same Taskflow React UI; only what happens behind the API changes.',
  contrastTitle: 'In-memory vs persistent storage',
  inMemory: {
    label: 'Day 2 — in-memory repository',
    points: [
      'export let tasks = [] in the repository',
      'Fast and simple for teaching layers',
      'Data lost on restart or deploy',
      'Single process owns the array',
    ],
  },
  persistent: {
    label: 'Day 3 — MongoDB at the repository layer',
    points: [
      'Same routes, controllers, and services',
      'Repository talks to MongoDB via Mongoose',
      'Data survives restarts',
      'Multiple app instances can share one database',
    ],
  },
  sameStack: {
    title: 'Same request path, different storage',
    body: 'React (Taskflow UI) → Route → Controller → Service → Repository → storage. Only the last hop changes: array vs MongoDB. Controllers should not know which one you use.',
  } satisfies LabeledItem,
  whenToPersist: {
    title: 'When you need a database',
    items: [
      'Users expect data to remain after logout or redeploy',
      'You run more than one server instance',
      'You need queries, indexes, or transactions',
      'You are building anything beyond a classroom demo',
    ],
  },
  runnable: {
    title: 'Compare side by side',
    body: 'Run task-api on 4000 and task-mongo on 4001. Create tasks in each, restart both servers — only Mongo keeps your data.',
    paths: ['../day-2-structured-api/task-api/', '../day-3-persistence/task-mongo/'],
  },
} as const;
