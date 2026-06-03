import type { LabeledItem } from '../types';

export const authMongoContent = {
  intro:
    'Day 4 adds identity and permissions on top of the same layered stack. The Taskflow React UI (task-with-auth-ui) handles login, JWT in AuthContext, protected routes, Tasks tab, and API Docs tab. Auth API + Mongo means users and tasks live in collections instead of in-memory arrays — the flow is unchanged, the storage is production-shaped.',
  flowTitle: 'Authenticated request with Mongo',
  flowSteps: [
    {
      title: 'React (Taskflow UI)',
      color: 'blue' as const,
      description: 'LoginForm → AuthContext (localStorage) → ProtectedRoute → Tasks / Docs tabs',
    },
    {
      title: 'Auth middleware',
      color: 'blue' as const,
      description: 'Verify token, attach req.user (id, role)',
    },
    {
      title: 'Controller / Service',
      color: 'slate' as const,
      description: 'Business rules; pass userId into repository calls',
    },
    {
      title: 'Repositories',
      color: 'slate' as const,
      description: 'userRepository → users collection; taskRepository → tasks with userId',
    },
    {
      title: 'MongoDB',
      color: 'green' as const,
      description: 'Persistent users and user-scoped tasks',
    },
  ],
  collectionsTitle: 'Two collections, one idea',
  collections: [
    {
      name: 'users',
      fields: 'email, passwordHash, role, createdAt',
      access: 'Auth routes: register, login, profile',
    },
    {
      name: 'tasks',
      fields: 'id, title, priority, deadline, userId, createdAt',
      access: 'Protected task routes filter by userId (or admin sees all)',
    },
  ],
  dayBridge: {
    title: 'Day 3 → Day 4',
    body: 'Day 3 taught Mongo for tasks only. Day 4 adds a users collection and ties each task to userId. JWT proves identity; the repository enforces ownership in queries.',
  } satisfies LabeledItem,
  demoNote: {
    title: 'Runnable auth project',
    body: 'The reference auth API (task-with-auth) uses in-memory stores for simplicity. Conceptually it is the same stack with Mongo at the repository layer. Optional env-driven Mongo backends can be added without changing route contracts.',
  } satisfies LabeledItem,
  envOptional: {
    title: 'Optional Mongo demo (future / local)',
    vars: [
      'MONGODB_URI — same cluster as Day 3',
      'JWT_SECRET — signing key for tokens',
      'USE_MONGO=true — feature flag to swap in-memory repos for Mongoose (when enabled in your fork)',
    ],
  },
  practical: {
    title: 'Practical: verify with fetch or axios',
    body: 'Start the auth API on port 4000. POST /auth/login, save token, GET /tasks with Authorization header. The React UI does the same — use DevTools → Network to compare, or run the copy-paste snippets in **Call the API: fetch & axios** (next module).',
  },
  runnable: {
    title: 'Run API + React UI together',
    steps: [
      'Terminal 1: cd day-4-auth-and-security/auth/task-with-auth && npm install && npm run dev (API on port 4000)',
      'Terminal 2: cd day-4-auth-and-security/auth/task-with-auth-ui && npm install && npm run dev (React UI on port 5173)',
      'Open http://localhost:5173 — sign in (demo users seeded on first API start)',
      'Tasks tab: CRUD with JWT; API Docs tab: endpoint reference and explorer',
      'Reload the page — session restores via GET /auth/me when a token is in localStorage',
    ],
    demoAccounts: 'user@learn-express.test / user123 · admin@learn-express.test / admin123',
  },
  paths: {
    authApi: '../day-4-auth-and-security/auth/task-with-auth/',
    authUi: '../day-4-auth-and-security/auth/task-with-auth-ui/',
    taskMongo: '../day-3-persistence/task-mongo/',
  },
} as const;
