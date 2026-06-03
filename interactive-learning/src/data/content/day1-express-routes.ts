import type { LabeledItem } from '../types';

export const expressRoutesContent = {
  intro:
    'Maya\'s POST /tasks from the Taskflow React app will soon match a named route instead of a long if/else chain. Express wraps Node’s http server at the route layer — you register handlers per HTTP method and path, and Express handles matching so you focus on req and res.',
  highlightsTitle: 'Express route essentials',
  highlights: [
    {
      id: 'app',
      title: 'const app = express()',
      body: 'Creates the application instance that holds routes and middleware.',
    },
    {
      id: 'get',
      title: 'app.get(path, handler)',
      body: 'Runs when method is GET and path matches. res.send() sets body and default Content-Type.',
    },
    {
      id: 'post',
      title: 'app.post(path, handler)',
      body: 'Same pattern for POST. Handler receives (req, res) — names are convention, not magic.',
    },
    {
      id: 'listen',
      title: 'app.listen(port)',
      body: 'Starts the server. Default sample uses port 5000.',
    },
  ],
  reqResTitle: 'req and res in one glance',
  reqRes: {
    req: ['req.method', 'req.url / req.path', 'req.headers', 'req.body (after express.json())'],
    res: ['res.status(code)', 'res.json(obj)', 'res.send(text)', 'res.end()'],
  },
  nextSteps: {
    title: 'Where this leads',
    body: 'Day 2 adds controller, service, and repository layers behind the route — the same React app will call task-api on port 4000. Day 1 goal: see that Express is still HTTP — just with better ergonomics.',
  } satisfies LabeledItem,
  runnable: {
    title: 'Run expressapp.js',
    steps: [
      'cd day-1-http-and-express',
      'node expressapp.js',
      'curl http://localhost:5000/ and curl -X POST http://localhost:5000/',
    ],
  },
} as const;
