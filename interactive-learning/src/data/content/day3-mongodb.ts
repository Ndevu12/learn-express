import type { LabeledItem } from '../types';

export const mongodbContent = {
  intro:
    'MongoDB becomes document storage at the repository layer, with Mongoose as the ODM. Connection and schema live at the edges; the rest of the app still speaks in tasks and IDs. The React app still sends the same POST /tasks — persistence is invisible to Maya at the UI.',
  setupTitle: 'Connection and environment',
  setupSteps: [
    {
      id: 'env',
      title: '.env',
      body: 'MONGODB_URI points at a local or Atlas cluster. Copy .env.example and never commit secrets.',
    },
    {
      id: 'connect',
      title: 'config/db.js',
      body: 'connectDB(uri) calls mongoose.connect. Fail fast on connection errors so the API does not serve half-broken requests.',
    },
    {
      id: 'boot',
      title: 'app.js startup',
      body: 'Connect to Mongo before app.listen. Order matters: database first, then HTTP.',
    },
  ],
  schemaTitle: 'Task schema (Mongoose)',
  schemaPoints: [
    'id — numeric business id (same shape as Day 2)',
    'title, priority, deadline, createdAt',
    'Schema validation at the database boundary',
  ],
  collectionsTitle: 'Collections in Taskflow',
  collections: [
    { name: 'tasks', day: 'Day 3', purpose: 'Task CRUD persisted in MongoDB' },
    { name: 'users', day: 'Day 4 (concept)', purpose: 'Registered accounts for auth' },
    { name: 'tasks + userId', day: 'Day 4 (concept)', purpose: 'Tasks scoped to the authenticated user' },
  ],
  principle: {
    title: 'Repository stays the boundary',
    body: 'Mongoose models live behind the repository. Services still call createTaskRepository — they never import mongoose directly.',
  } satisfies LabeledItem,
  runnable: {
    title: 'Run task-mongo',
    steps: [
      'cd day-3-persistence/task-mongo',
      'cp .env.example .env and set MONGODB_URI',
      'npm install && npm run dev',
      'API on http://localhost:4001',
    ],
  },
} as const;
