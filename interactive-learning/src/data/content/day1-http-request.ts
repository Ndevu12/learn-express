import type { LabeledItem } from '../types';

export const httpRequestContent = {
  intro:
    'Maya\'s POST /tasks has left the Taskflow React app — now you look at what it carries. Every backend starts with one idea: the client layer (here, the browser running the React SPA) sends an HTTP request, and the server sends back a response. Before Express or databases, you need to see what actually travels over the wire.',
  partsTitle: 'Parts of an HTTP request',
  parts: [
    {
      id: 'method',
      name: 'Method',
      description: 'What the client wants to do with the resource.',
      examples: ['GET — read data', 'POST — create or submit', 'PUT — replace', 'DELETE — remove'],
    },
    {
      id: 'url',
      name: 'URL',
      description: 'Which resource the client is targeting, including path and optional query string.',
      examples: ['GET /tasks', 'GET /tasks/42', 'POST /auth/login'],
    },
    {
      id: 'headers',
      name: 'Headers',
      description: 'Metadata about the request: content type, authorization, accepted formats.',
      examples: ['Content-Type: application/json', 'Authorization: Bearer <token>', 'Accept: application/json'],
    },
    {
      id: 'body',
      name: 'Body',
      description: 'Optional payload, usually JSON for APIs. Common on POST and PUT.',
      examples: ['{ "title": "Learn HTTP", "priority": 1 }', 'Empty on GET and DELETE'],
    },
  ],
  sampleRequest: {
    title: 'Sample POST request',
    code: `POST /tasks HTTP/1.1
Host: localhost:4000
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

{
  "title": "Review Day 1",
  "priority": 2,
  "deadline": "2026-06-10"
}`,
  },
  responseTitle: 'The response mirrors the idea',
  responsePoints: [
    'Status line — e.g. 201 Created or 404 Not Found',
    'Response headers — e.g. Content-Type: application/json',
    'Response body — JSON, text, or empty',
  ],
  practicalLink: {
    title: 'Start here: call the API with fetch',
    body: 'Scroll to **Practical: call the API** below — paste GET and POST snippets in the browser console while expressapp.js runs on port 5000.',
  },
  runnable: {
    title: 'Try it locally',
    body: 'Day 1 runnable projects live in day-1-http-and-express/. Start with nodeserver.js (native HTTP) and expressapp.js (minimal Express on port 5000).',
    path: '../day-1-http-and-express/',
  },
  principle: {
    title: 'Same request, deeper stack',
    body: 'The same POST /tasks from the React app will pick up routes, controllers, services, and a database — but every layer still speaks HTTP. On Day 4 you will run the full Taskflow UI against the auth API; for now, picture the React app waiting for a response.',
  } satisfies LabeledItem,
} as const;
