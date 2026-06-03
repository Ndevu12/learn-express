export const authenticationContent = {
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
      'Login issues a token the client sends on later requests',
      'Permission checks are covered in Protected routes and RBAC',
    ],
  },
} as const;
