import type { LabeledItem } from '../types';

export const nodeServerContent = {
  intro:
    'Maya\'s POST /tasks from the Taskflow React app reaches the server layer — a process listening on a port, with no framework yet. Node.js ships with the http module. You listen on a port, inspect req.url and req.method, and call res.end() yourself. This is how routing worked before frameworks — and why Express feels like a relief.',
  conceptsTitle: 'What the server layer does',
  concepts: [
    {
      id: 'createServer',
      title: 'createServer callback',
      body: 'Every incoming connection runs your handler with (req, res). You branch on url and method manually.',
    },
    {
      id: 'routing',
      title: 'Manual routing',
      body: 'if/else chains match paths like / and about. A typo in the URL string means the route never matches.',
    },
    {
      id: 'status',
      title: 'Status codes by hand',
      body: 'Set res.statusCode = 404 before res.end() when no route matches.',
    },
    {
      id: 'listen',
      title: 'listen(port)',
      body: 'The server binds to a port (8000 in the sample) and logs when it is ready.',
    },
  ],
  painPointsTitle: 'Why this gets tedious',
  painPoints: [
    'No built-in JSON body parser — you read streams yourself',
    'Repeated logic across similar routes',
    'No standard middleware pipeline',
    'Easy to miss edge cases (trailing slashes, method case)',
  ],
  runnable: {
    title: 'Run nodeserver.js',
    steps: [
      'cd day-1-http-and-express',
      'node nodeserver.js',
      'curl http://localhost:8000/ and http://localhost:8000/about',
    ],
  },
  contrast: {
    title: 'Express replaces the boilerplate',
    body: 'The route layer adds app.get and app.post — same req/res objects, but path matching is declarative instead of manual if/else. That is the next module.',
  } satisfies LabeledItem,
} as const;
