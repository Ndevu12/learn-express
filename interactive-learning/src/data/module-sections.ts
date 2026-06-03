import type { ModuleId } from './modules';
import type { ModuleSectionHeader } from './types';

export const moduleSections: Record<ModuleId, ModuleSectionHeader> = {
  day1story: {
    title: 'A request arrives',
    description:
      'Maya adds a task in the Taskflow React app; the SPA sends POST /tasks with JSON.',
  },
  httprequest: {
    title: 'HTTP and the request',
    description: 'Method, URL, headers, and body — what the React client sends before Express or a database enters the picture.',
  },
  nodeserver: {
    title: 'Node native server',
    description: 'Manual routing with http.createServer — tied to day-1-http-and-express/nodeserver.js.',
  },
  expressroutes: {
    title: 'First Express routes',
    description: 'app.get and app.post with req and res — tied to expressapp.js on port 5000.',
  },
  architecture: {
    title: 'Production architecture',
    description: 'React (Taskflow UI) through routes, middleware, controllers, services, and data access.',
  },
  lifecycle: {
    title: 'Request lifecycle',
    description: 'From React fetch() through middleware, handlers, and response.',
  },
  authconcepts: {
    title: 'Authentication vs authorization',
    description:
      'Learn the difference before implementation: identity (401) versus permissions (403), and the order they run on every protected request.',
  },
  authentication: {
    title: 'Authentication flow',
    description: 'Taskflow React login → API: registration, hashing, JWT (who are you?).',
  },
  jwt: {
    title: 'JWT structure and lifecycle',
    description: 'How tokens carry identity claims and how the server verifies them on each request.',
  },
  protected: {
    title: 'Protected routes',
    description: 'Interactive scenarios: token checks, permission checks, and realistic API responses.',
  },
  rbac: {
    title: 'Role-based access control',
    description: 'Authorize actions by role after the user is authenticated (what may you do?).',
  },
  endtoend: {
    title: 'End-to-end secure flow',
    description: 'task-with-auth-ui: login, AuthContext, Tasks/Docs tabs, API + React together.',
  },
  crud: {
    title: 'CRUD through the stack',
    description: 'Taskflow UI actions → API: create, read, update, and delete through each layer.',
  },
  validation: {
    title: 'Request validation',
    description: 'Validate and reject bad input before it reaches business logic.',
  },
  errors: {
    title: 'Error handling',
    description: 'Propagate errors safely and return consistent HTTP responses.',
  },
  middleware: {
    title: 'Middleware pipeline',
    description: 'Order, purpose, and behavior of middleware in the request chain.',
  },
  persistence: {
    title: 'Why persistence?',
    description: 'Same React UI; in-memory task-api vs MongoDB data that survives restart.',
  },
  mongodb: {
    title: 'MongoDB and connection',
    description: 'Persistence behind the API — Maya still sees the same Taskflow UI.',
  },
  mongorepo: {
    title: 'Repository with Mongo',
    description: 'Same repository interface and React fetch calls; async Mongoose underneath.',
  },
  authmongo: {
    title: 'Auth API backed by MongoDB',
    description: 'Run auth API (4000) + React UI (5173); users and user-scoped tasks collections.',
  },
  practicalhttp: {
    title: 'Call the API: fetch & axios',
    description:
      'Hands-on snippets: login on port 4000, Bearer token on GET /tasks, fetch vs axios, 401 vs 403.',
  },
};

export function getModuleSection(id: ModuleId): ModuleSectionHeader {
  return moduleSections[id];
}
