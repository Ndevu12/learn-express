/** Copy-paste HTTP client snippets — ports match this repo (5000 Day 1, 4000 task/auth APIs). */

export const API_BASE = {
  day1Express: 'http://localhost:5000',
  taskApi: 'http://localhost:4000',
} as const;

/* ── Day 1 — public requests (expressapp.js on port 5000) ── */

export const day1FetchGetHome = `// Browser DevTools console (or any JS environment with fetch)
// Prerequisite: node expressapp.js  →  http://localhost:5000

const response = await fetch("${API_BASE.day1Express}/");
const text = await response.text();

console.log(response.status); // 200
console.log(text);            // "Hello home"`;

export const day1FetchPostRoot = `// POST with no JSON body — expressapp.js responds with plain text
const response = await fetch("${API_BASE.day1Express}/", {
  method: "POST",
});

const text = await response.text();
console.log(response.status); // 200
console.log(text);            // "This is a post."`;

export const day1FetchPostJson = `// Pattern you'll use every day: POST + JSON headers + body
// (Day 1 expressapp.js does not parse JSON yet — this shows the client shape)

const response = await fetch("${API_BASE.day1Express}/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ message: "Hello from fetch" }),
});

console.log(response.status);
console.log(await response.text());`;

/* ── Day 2 — public CRUD (task-api on port 4000, no auth) ── */

export const day2FetchGetTasks = `// Prerequisite: cd day-2-structured-api/task-api && npm run dev

const response = await fetch("${API_BASE.taskApi}/tasks");
const tasks = await response.json();

console.log(response.status); // 200
console.log(tasks);`;

export const day2FetchPostTask = `const response = await fetch("${API_BASE.taskApi}/tasks", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Learn Express layers",
    priority: 3,
    deadline: "2026-12-31",
  }),
});

const task = await response.json();
console.log(response.status); // 201
console.log(task);`;

export const day2AxiosGetTasks = `// Node script: npm install axios
import axios from "axios";

const { data, status } = await axios.get("${API_BASE.taskApi}/tasks");
console.log(status); // 200
console.log(data);`;

export const day2AxiosPostTask = `import axios from "axios";

const { data, status } = await axios.post("${API_BASE.taskApi}/tasks", {
  title: "Learn Express layers",
  priority: 3,
  deadline: "2026-12-31",
});
console.log(status); // 201
console.log(data);`;

export const day2AxiosInstallNote =
  'For Node scripts: run npm install axios once in your project folder. In the browser console, use fetch (built in) — no install needed.';

/* ── Day 4 — auth API (task-with-auth on port 4000) ── */

export const day4FetchLogin = `// Public — no token required
// Prerequisite: task-with-auth API running on port 4000

const loginRes = await fetch("${API_BASE.taskApi}/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@learn-express.test",
    password: "user123",
  }),
});

const { token } = await loginRes.json();
console.log(loginRes.status); // 200
console.log(token);           // save this for the next request`;

export const day4FetchAuthorizedTasks = `// Authorized — send the token from login
const token = "PASTE_TOKEN_FROM_LOGIN";

const response = await fetch("${API_BASE.taskApi}/tasks", {
  headers: {
    Authorization: \`Bearer \${token}\`,
  },
});

const tasks = await response.json();
console.log(response.status); // 200
console.log(tasks);`;

export const day4FetchUnauthorizedTasks = `// Missing token → 401 Unauthorized (authentication failed)
const response = await fetch("${API_BASE.taskApi}/tasks");
console.log(response.status); // 401
console.log(await response.json());`;

export const day4AxiosLogin = `import axios from "axios";

const { data, status } = await axios.post("${API_BASE.taskApi}/auth/login", {
  email: "user@learn-express.test",
  password: "user123",
});
console.log(status); // 200
const token = data.token;`;

export const day4AxiosAuthorizedTasks = `import axios from "axios";

const token = "PASTE_TOKEN_FROM_LOGIN";

const { data, status } = await axios.get("${API_BASE.taskApi}/tasks", {
  headers: { Authorization: \`Bearer \${token}\` },
});
console.log(status); // 200
console.log(data);`;

export const day4StatusCodesNote =
  '401 Unauthorized = no token, bad token, or expired token (who are you?). 403 Forbidden = valid token but not allowed for this action (e.g. wrong role). The Taskflow React app sends the same Authorization header — check DevTools → Network to compare.';

/* ── Section configs for PracticalRequestPanel ── */

export interface PracticalCodeBlock {
  title?: string;
  code: string;
  language?: 'javascript' | 'http';
}

export interface PracticalClientTab {
  id: 'fetch' | 'axios';
  label: string;
  blocks: PracticalCodeBlock[];
  note?: string;
}

export interface PracticalSection {
  title: string;
  intro: string;
  prerequisites?: string;
  tabs: PracticalClientTab[];
  footnote?: string;
}

export const day1PracticalSection: PracticalSection = {
  title: 'Practical: call the API',
  intro:
    'Before React or layers, call the server directly. Start expressapp.js, then paste these snippets in the browser DevTools console.',
  prerequisites: 'From day-1-http-and-express/: node expressapp.js (port 5000)',
  tabs: [
    {
      id: 'fetch',
      label: 'Try it: fetch',
      blocks: [
        { title: 'GET / — read the home route', code: day1FetchGetHome },
        { title: 'POST / — send a request', code: day1FetchPostRoot },
        { title: 'POST with JSON (client pattern)', code: day1FetchPostJson },
      ],
    },
  ],
  footnote:
    'Every API call is method + URL + optional headers + optional body. response.json() or response.text() reads the body.',
};

export const day2CrudPracticalSection: PracticalSection = {
  title: 'Practical: CRUD without the UI',
  intro:
    'The Taskflow React app wraps these calls in components. Here is the same HTTP, one request at a time. No auth on Day 2.',
  prerequisites: 'From day-2-structured-api/task-api/: npm run dev (port 4000)',
  tabs: [
    {
      id: 'fetch',
      label: 'Try it: fetch',
      blocks: [
        { title: 'GET /tasks — list all', code: day2FetchGetTasks },
        { title: 'POST /tasks — create', code: day2FetchPostTask },
      ],
    },
    {
      id: 'axios',
      label: 'Try it: axios',
      note: day2AxiosInstallNote,
      blocks: [
        { title: 'GET /tasks', code: day2AxiosGetTasks },
        { title: 'POST /tasks', code: day2AxiosPostTask },
      ],
    },
  ],
};

