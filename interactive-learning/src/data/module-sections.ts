import type { ModuleId } from './modules';
import type { ModuleSectionHeader } from './types';

export const moduleSections: Record<ModuleId, ModuleSectionHeader> = {
  architecture: {
    title: 'Production architecture',
    description: 'How layered Express applications separate routing, middleware, controllers, services, and data access.',
  },
  lifecycle: {
    title: 'Request lifecycle',
    description: 'Follow a single HTTP request from arrival through middleware, handlers, and response.',
  },
  authconcepts: {
    title: 'Authentication vs authorization',
    description:
      'Learn the difference before implementation: identity (401) versus permissions (403), and the order they run on every protected request.',
  },
  authentication: {
    title: 'Authentication flow',
    description: 'Prove identity: registration, login, password hashing, and issuing a JWT (who are you?).',
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
    description: 'Login, token storage, authenticated requests, authorization, and response.',
  },
  crud: {
    title: 'CRUD through the stack',
    description: 'How create, read, update, and delete operations move through each layer.',
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
};

export function getModuleSection(id: ModuleId): ModuleSectionHeader {
  return moduleSections[id];
}
