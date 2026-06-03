import type { ModuleId } from '../modules';

export type AuthConceptFocus = 'overview' | 'authentication' | 'authorization';

export const authVsAuthzConcept = {
  title: 'Authentication vs authorization',
  summary:
    'Both are required on protected APIs, but they answer different questions. Authentication runs first; authorization only makes sense once identity is established. The Taskflow React UI may hide screens, but the API enforces 401 and 403.',
  authentication: {
    label: 'Authentication',
    question: 'Who are you?',
    definition:
      'The process of verifying that a user is who they claim to be. The server checks credentials or a signed token and attaches identity (e.g. user id, role) to the request.',
    examples: [
      'Register and log in with email and password',
      'Verify a JWT signature and expiration on each request',
      'Reject missing or invalid tokens before running business logic',
    ],
    statusCode: '401 Unauthorized',
    statusHint: 'No valid identity — the client should log in or refresh credentials.',
    modules: 'Authentication flow, JWT structure & lifecycle',
  },
  authorization: {
    label: 'Authorization',
    question: 'What may you do?',
    definition:
      'The process of deciding whether an authenticated user is allowed to perform a specific action on a resource. Permissions depend on role, ownership, or policy.',
    examples: [
      'Only admins may delete other users',
      'Users may edit their own tasks, not everyone’s',
      'RBAC middleware checks role against required permission',
    ],
    statusCode: '403 Forbidden',
    statusHint: 'Identity is known, but this action is not permitted for that user.',
    modules: 'Protected routes, RBAC, End-to-end flow',
  },
  orderNote: 'Order matters: authenticate first, then authorize. Never return 403 when the real problem is a missing or invalid login.',
  analogy:
    'Think of a building: authentication is showing ID at the entrance; authorization is which rooms your badge lets you enter.',
} as const;

export const authConceptsModuleContent = {
  requestFlow: {
    title: 'On every protected request',
    steps: [
      {
        phase: 'Authentication',
        action: 'Read token from Authorization header',
        failure: '401 Unauthorized',
      },
      {
        phase: 'Authentication',
        action: 'Verify signature, format, and expiration',
        failure: '401 Unauthorized',
      },
      {
        phase: 'Authentication',
        action: 'Attach user identity to the request (e.g. req.user)',
        failure: null,
      },
      {
        phase: 'Authorization',
        action: 'Check role, ownership, or policy for this route',
        failure: '403 Forbidden',
      },
      {
        phase: 'Authorization',
        action: 'Run controller / business logic',
        failure: null,
      },
    ],
  },
  statusComparison: {
    title: '401 vs 403 in practice',
    unauthorized: {
      title: '401 — authentication failed',
      description: 'The server could not establish who is calling. Do not run permission checks yet.',
      code: `POST /tasks
(no Authorization header)

→ 401 Unauthorized
{ "message": "No token provided" }`,
    },
    forbidden: {
      title: '403 — authorization failed',
      description: 'Identity is known, but this user may not perform this action.',
      code: `DELETE /admin/users/123
Authorization: Bearer <valid_user_token>

→ 403 Forbidden
{ "message": "You do not have permission" }`,
    },
  },
  misconceptions: {
    title: 'Common mistakes',
    items: [
      'Using 403 when the client never sent a valid token (should be 401)',
      'Hiding “not logged in” behind 403 to obscure endpoints',
      'Trusting role checks only in the React UI (ProtectedRoute is UX; the API must enforce)',
      'Skipping authorization because the user “has a valid JWT”',
      'Treating authentication and authorization as one middleware with no clear order',
    ],
  },
  learningPath: {
    title: 'What to study next',
    description: 'Work through these modules in order. Each builds on the distinction above.',
    steps: [
      { moduleId: 'authentication' as ModuleId, label: 'Authentication flow', focus: 'Prove identity at login' },
      { moduleId: 'jwt' as ModuleId, label: 'JWT tokens', focus: 'Carry and verify identity on each request' },
      { moduleId: 'protected' as ModuleId, label: 'Protected routes', focus: '401 then 403 on guarded endpoints' },
      { moduleId: 'rbac' as ModuleId, label: 'RBAC', focus: 'Permissions by role' },
      { moduleId: 'endtoend' as ModuleId, label: 'End-to-end', focus: 'Full secure request flow' },
    ],
  },
  keyTakeaways: {
    title: 'Key takeaways',
    items: [
      'Authentication = who; authorization = what they may do',
      'Always authenticate before authorizing',
      '401 means fix login/token; 403 means fix permissions or role',
      'JWT proves identity; RBAC and route guards enforce permissions',
    ],
  },
} as const;
