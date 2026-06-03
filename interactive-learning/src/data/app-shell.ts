export interface FooterResource {
  label: string;
  href: string;
}

export const appShell = {
  header: {
    sessionTitle: 'Learn Express — Taskflow',
    fallbackSubtitle: 'Task management API',
    menuButtonLabel: 'Modules',
    closeMenuLabel: 'Close module menu',
  },
  hero: {
    badge: 'Learn Express · Taskflow',
    title: 'Maya clicks Add task',
    description:
      'Maya is on the Taskflow team, shipping a task management product. In the Taskflow web app (React), she types "Deploy v2 to staging" and clicks Add task — the SPA sends POST /tasks with JSON. Follow that one request through the layers: client, server, route, controller, and beyond.',
  },
  footer: {
    conceptsTitle: 'Concepts covered',
    concepts: ['HTTP request', 'Layered API', 'MongoDB', 'CRUD', 'Middleware', 'JWT', 'RBAC'] as const,
    resourcesTitle: 'Resources',
    resources: [
      { label: 'Express.js', href: 'https://expressjs.com/' },
      { label: 'JWT.io', href: 'https://jwt.io/' },
      { label: 'Node.js', href: 'https://nodejs.org/' },
      { label: 'OWASP', href: 'https://owasp.org/www-community/attacks/csrf' },
    ] satisfies FooterResource[],
    aboutTitle: 'About',
    aboutDescription: 'Interactive modules for the Taskflow API',
    aboutBody:
      'Each module walks through one layer of the same POST /tasks request — from the Taskflow React UI through the API to persisted, authenticated tasks.',
    copyright: '© 2026 Learn Express',
  },
} as const;
