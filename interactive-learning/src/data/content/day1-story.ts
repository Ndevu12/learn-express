import type { FlowDiagramStep } from '../types';

export const day1StoryContent = {
  opening:
    'Maya works on Taskflow — a task management product her team ships for internal use. The Taskflow web app (React) is open on her laptop. She types "Deploy v2 to staging" into the new-task field and clicks Add task.',
  body:
    'A loading spinner appears beside the field. In that instant the React SPA sends POST /tasks with JSON — no database, no login screen yet. Just an HTTP request crossing the network toward a server that will answer with a status code and a body. Today the path is short; more layers join the same request over the coming days.',
  flowTitle: 'Where Maya\'s request goes today',
  flowSteps: [
    {
      title: 'React (Taskflow UI)',
      color: 'blue' as const,
      description: 'Client layer — browser runs the Taskflow React SPA; Add task triggers POST /tasks',
    },
    {
      title: 'Server',
      color: 'slate' as const,
      description: 'Listens on a port and receives the request',
    },
    {
      title: 'Response',
      color: 'slate' as const,
      description: '201 Created — task saved, spinner clears',
    },
  ] satisfies FlowDiagramStep[],
  flowTease:
    'Route, controller, service, repository, database — those hops come later. Day 1 starts with the request leaving the React app and coming back as a response.',
  pullQuote: 'Add task',
  logLine:
    'POST /tasks HTTP/1.1\nContent-Type: application/json\n\n{"title":"Deploy v2 to staging"}',
  closing:
    'The request is in flight. In the next module, name every part of it — method, URL, headers, body. Tomorrow the same POST will match a route and land in a controller.',
  practicalHint: {
    title: 'Try it yourself first',
    body: 'You do not need the Taskflow UI to learn HTTP. In the **HTTP request** module, use fetch against http://localhost:5000 while expressapp.js is running — then compare what you sent with Maya\'s POST /tasks log above.',
  },
};
