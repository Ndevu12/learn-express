import type { LabeledItem, TabOption } from '../types';

export const rbacModuleContent = {
  defaultRoleIndex: 1,
  tabs: [
    { id: 'roles', label: 'Roles & Permissions' },
    { id: 'implementation', label: 'Implementation' },
    { id: 'security', label: 'Frontend vs Backend' },
  ] satisfies TabOption<'roles' | 'implementation' | 'security'>[],
  rolesTab: {
    selectRolePrompt: 'Select a role to view permissions:',
    permissionsTitle: 'Permissions',
    endpointsTitle: 'Accessible endpoints',
    allRolesTitle: 'All roles',
    matrixTitle: 'Permission matrix',
    matrixEndpointHeader: 'Endpoint',
  },
  roleHierarchy: {
    title: 'Role Hierarchy',
    hierarchy: 'Admin > User > Guest',
    note: 'Higher roles have more permissions',
  },
  implementationTab: {
    prompt: 'How to implement RBAC:',
  },
  permissionMatrixEndpoints: [
    'POST /auth/register',
    'POST /auth/login',
    'GET /tasks',
    'POST /tasks',
    'DELETE /tasks/:id',
    'GET /admin/users',
    'DELETE /admin/users/:id',
  ],
  securityMistakes: {
    title: 'Common Security Mistakes',
    items: [
      {
        title: 'Frontend-Only Authorization',
        body: "Hiding a button doesn't protect the API. Always verify on backend.",
      },
      {
        title: 'Storing Sensitive Data in JWT',
        body: "JWT can be decoded by anyone. Don't store passwords, credit cards, etc.",
      },
      {
        title: 'Hardcoding Secret Keys',
        body: 'Use environment variables for JWT_SECRET. Never commit to git.',
      },
      {
        title: 'Skipping Token Expiration',
        body: 'Set reasonable expiry times (e.g., 7 days). Implement token refresh.',
      },
      {
        title: 'Not Using HTTPS',
        body: 'Tokens in Authorization header can be intercepted over HTTP.',
      },
    ] satisfies LabeledItem[],
  },
  securityBestPractices: {
    title: 'Security Best Practices',
    items: [
      'Always validate authorization on the server, every request',
      'Use HttpOnly cookies or secure localStorage for tokens',
      'Implement token refresh mechanism for better security',
      'Audit log sensitive operations (deletes, role changes, etc.)',
      'Use strong, random JWT secret keys (minimum 32 characters)',
      'Implement rate limiting on auth endpoints',
      'Always use HTTPS in production',
    ],
  },
} as const;
