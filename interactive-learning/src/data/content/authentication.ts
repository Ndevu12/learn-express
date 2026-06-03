export const authenticationContent = {
  intro:
    'Registration and login in the Taskflow React UI call the auth API. Passwords are hashed on the server; the UI receives a JWT and AuthContext persists it for later task requests.',
  runnable: {
    title: 'Run API + React UI',
    body: 'Start task-with-auth (port 4000) then task-with-auth-ui (port 5173). See auth-mongo module or day-4-auth-and-security/auth/README.md for demo accounts and env files.',
    paths: {
      api: 'day-4-auth-and-security/auth/task-with-auth/',
      ui: 'day-4-auth-and-security/auth/task-with-auth-ui/',
    },
  },
  sidebarKeyPoint: {
    title: 'Summary',
    body: 'Each step passes data to the next. Security is maintained by hashing passwords and signing tokens.',
  },
  stepsOverviewTitle: 'All steps',
  fieldLabels: {
    input: 'Input',
    output: 'Output',
    action: 'Action',
    compare: 'Comparison',
    payload: 'Payload',
    response: 'Response',
    security: 'Security note',
    code: 'Code',
  },
  keyTakeaways: {
    title: 'Key takeaways',
    items: [
      'Passwords are never stored plain-text; they are hashed with bcrypt',
      'JWT tokens prove identity; they are signed but not encrypted',
      'Login issues a token the React app sends on later requests (Authorization: Bearer)',
      'Permission checks are covered in Protected routes and RBAC',
    ],
  },
} as const;
