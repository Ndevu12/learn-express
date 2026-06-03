/** Maps API routes to how learners exercise them in this UI. */
export const API_ENDPOINTS = [
  { method: 'GET', path: '/', auth: false, ui: 'API docs → Explorer' },
  { method: 'POST', path: '/auth/register', auth: false, ui: 'Register page' },
  { method: 'POST', path: '/auth/login', auth: false, ui: 'Login page' },
  { method: 'GET', path: '/auth/me', auth: true, ui: 'API docs → Explorer' },
  { method: 'GET', path: '/tasks', auth: true, ui: 'Tasks → list & Refresh' },
  { method: 'POST', path: '/tasks', auth: true, ui: 'Tasks → Add task' },
  { method: 'GET', path: '/tasks/:id', auth: true, ui: 'Tasks → View' },
  { method: 'PUT', path: '/tasks/:id', auth: true, ui: 'Tasks → Edit' },
  { method: 'DELETE', path: '/tasks/:id', auth: true, ui: 'Tasks → Delete' },
]
