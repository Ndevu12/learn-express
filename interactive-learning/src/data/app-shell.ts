export interface FooterResource {
  label: string;
  href: string;
}

export const appShell = {
  header: {
    sessionTitle: 'Session 4: Authentication & Security',
    fallbackSubtitle: 'Interactive learning',
    menuButtonLabel: 'Modules',
    closeMenuLabel: 'Close module menu',
  },
  hero: {
    badge: 'Learn Express · Interactive Module',
    title: 'Build secure Express APIs',
    description:
      'Work through authentication, JWTs, authorization, and RBAC with interactive visualizations and real code examples—at your own pace, module by module.',
  },
  footer: {
    conceptsTitle: 'Concepts covered',
    concepts: ['401 vs 403', 'JWT', 'Hashing', 'Auth', 'RBAC', 'Protected routes'] as const,
    resourcesTitle: 'Resources',
    resources: [
      { label: 'Express.js', href: 'https://expressjs.com/' },
      { label: 'JWT.io', href: 'https://jwt.io/' },
      { label: 'Node.js', href: 'https://nodejs.org/' },
      { label: 'OWASP', href: 'https://owasp.org/www-community/attacks/csrf' },
    ] satisfies FooterResource[],
    aboutTitle: 'About',
    aboutDescription: 'Production-ready authentication patterns for Express',
    aboutBody:
      'Use the sidebar to jump between topics, or follow Next to complete the full learning path in order.',
    copyright: '© 2026 Learn Express',
  },
} as const;
