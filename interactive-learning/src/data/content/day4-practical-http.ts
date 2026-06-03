import {
  day2AxiosInstallNote,
  day4AxiosAuthorizedTasks,
  day4AxiosLogin,
  day4FetchAuthorizedTasks,
  day4FetchLogin,
  day4FetchUnauthorizedTasks,
  day4StatusCodesNote,
  type PracticalSection,
} from './http-client-examples';

export const practicalHttpContent = {
  intro:
    'The Taskflow React app hides fetch and axios behind components and AuthContext. Here you call the same auth API directly: public login, then protected routes with a Bearer token. Use the browser console (fetch) or a small Node script (axios).',
  workflowTitle: 'Three steps every protected call follows',
  workflowSteps: [
    'POST /auth/login with email and password — public, no token (port 4000).',
    'Copy token from the JSON response and paste it into the authorized snippets.',
    'GET /tasks with Authorization: Bearer <token> — same header shape the React app sends.',
  ],
  compareTitle: 'Match what the React app does',
  compareBody:
    'Open DevTools → Network on task-with-auth-ui after login. Compare method, URL, headers, and body to these snippets. Missing or wrong tokens return 401; valid identity but wrong role can return 403.',
  runnable: {
    title: 'Run the API',
    steps: [
      'cd day-4-auth-and-security/auth/task-with-auth',
      'npm run dev — API on http://localhost:4000',
      'Optional: cd ../task-with-auth-ui && npm run dev for the React UI',
      'Paste snippets below in the browser console or a Node file with axios installed',
    ],
    demoAccounts: 'user@learn-express.test / user123 (also admin@learn-express.test / admin123)',
    apiPath: 'day-4-auth-and-security/auth/task-with-auth',
    uiPath: 'day-4-auth-and-security/auth/task-with-auth-ui',
  },
} as const;

/** Panel config for PracticalRequestPanel — reuses snippet strings from http-client-examples. */
export const day4PracticalHttpSection: PracticalSection = {
  title: 'Practical: login then call protected routes',
  intro:
    'Register or login is public. Task routes need Authorization: Bearer <token>. Store the token from login, then attach it on every protected request.',
  prerequisites:
    'From day-4-auth-and-security/auth/task-with-auth/: npm run dev (port 4000). Demo: user@learn-express.test / user123',
  tabs: [
    {
      id: 'fetch',
      label: 'Try it: fetch',
      blocks: [
        { title: 'POST /auth/login — get a token', code: day4FetchLogin },
        { title: 'GET /tasks — with token', code: day4FetchAuthorizedTasks },
        { title: 'GET /tasks — without token (401)', code: day4FetchUnauthorizedTasks },
      ],
    },
    {
      id: 'axios',
      label: 'Try it: axios',
      note: day2AxiosInstallNote,
      blocks: [
        { title: 'POST /auth/login', code: day4AxiosLogin },
        { title: 'GET /tasks — with token', code: day4AxiosAuthorizedTasks },
      ],
    },
  ],
  footnote: day4StatusCodesNote,
};
