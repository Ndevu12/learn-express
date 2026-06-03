# Day 4 — Authentication & security (runnable projects)

**Curriculum:** [docs/CURRICULUM.md](../../docs/CURRICULUM.md) · **Day index:** [../README.md](../README.md)

Companion implementations for the [interactive-learning](../../interactive-learning/) module — **Express API** plus **Taskflow React frontend** (`task-with-auth-ui`). Run the **API first**, then the **UI**.

## Quick start

```bash
# Terminal 1 — Auth API (port 4000)
cd day-4-auth-and-security/auth/task-with-auth
cp .env.example .env   # optional
npm install
npm run dev

# Terminal 2 — Auth UI (port 5173)
cd day-4-auth-and-security/auth/task-with-auth-ui
cp .env.example .env   # optional
npm install
npm run dev
```

Open **http://localhost:5173** and sign in with a demo account (seeded on first API start).

## Demo accounts

| Role  | Email                     | Password  |
|-------|---------------------------|-----------|
| User  | `user@learn-express.test` | `user123` |
| Admin | `admin@learn-express.test`| `admin123`|

Admins see **all tasks**; users see only their own. Deleting another user’s task returns **403** (authorization), not 404.

## Auth API (`task-with-auth`)

**Stack:** Express 5, JWT, bcrypt, CORS, rate limiting, in-memory stores (learning only).

### Endpoints

| Method | Path            | Auth     | Description              |
|--------|-----------------|----------|--------------------------|
| GET    | `/`             | Public   | Health + pointer         |
| POST   | `/auth/register`| Public   | Create account (role: user) |
| POST   | `/auth/login`   | Public   | Login, returns JWT       |
| GET    | `/auth/me`      | Bearer   | Current user from token    |
| GET    | `/tasks`        | Bearer   | List tasks (scoped by role) |
| POST   | `/tasks`        | Bearer   | Create task              |
| GET    | `/tasks/:id`    | Bearer   | Get one task             |
| PUT    | `/tasks/:id`    | Bearer   | Update (owner or admin)    |
| DELETE | `/tasks/:id`    | Bearer   | Delete (owner or admin)  |

### Error responses (shared with the UI)

Failed requests return JSON the frontend displays as-is:

```json
{
  "success": false,
  "message": "A task with the same title already exists.",
  "code": "DUPLICATE_TITLE",
  "fields": { "title": "You already have a task with this title" }
}
```

| Code | HTTP | Meaning |
|------|------|---------|
| `DUPLICATE_TITLE` | 409 | Same task title for this user |
| `DUPLICATE_EMAIL` | 409 | Email already registered |
| `VALIDATION_ERROR` | 400 | Missing or invalid input |
| `FORBIDDEN` | 403 | Not allowed for this role/owner |
| `INVALID_CREDENTIALS` | 401 | Wrong email or password |

### Status codes (aligned with interactive module)

- **401** — Missing or invalid/expired token (authentication)
- **403** — Valid identity but not allowed on this resource (authorization)
- **400 / 409 / 404 / 500** — Validation, conflicts, not found, server errors

### Environment (`task-with-auth/.env`)

| Variable       | Default                  | Purpose                    |
|----------------|--------------------------|----------------------------|
| `PORT`         | `4000`                   | API port                   |
| `CORS_ORIGIN`  | `http://localhost:5173`  | Allowed browser origin     |
| `JWT_SECRET`   | dev default              | Sign/verify tokens         |

## Auth UI (`task-with-auth-ui`)

**Stack:** React 18, Vite, React Router, Tailwind.

After login, the app has two tabs:

### Tasks (`/app/tasks`)

Normal task manager actions (no API jargon):

- Add a task
- Refresh the list
- **View** — task details modal
- **Edit** — edit modal with validation errors from the API
- **Delete** — with confirmation

### API docs (`/app/docs`)

Separate reference and **API explorer** for learners (raw JSON, endpoint table, error format). POST/PUT/DELETE for tasks are exercised on the Tasks tab, not in the explorer.

- Stores JWT in `localStorage`
- Restores session via `GET /auth/me` on load
- Redirects to login on **401** from task endpoints

### Environment (`task-with-auth-ui/.env`)

| Variable        | Default                  | Purpose              |
|-----------------|--------------------------|----------------------|
| `VITE_API_URL`  | `http://localhost:4000`  | API base URL         |

**Optional:** set `VITE_API_URL=/api` to use the Vite dev proxy (see `vite.config.js`) and avoid CORS during local dev.

## Project layout

```
auth/
├── README.md                 # This file
├── task-with-auth/           # Express API
│   ├── app.js
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/       # authenticateToken, authorizeRole
│       ├── repositories/
│       ├── routes/
│       ├── seed/             # Demo users
│       └── services/
└── task-with-auth-ui/        # React SPA
    └── src/
        ├── lib/api.js        # Shared fetch + errors
        ├── context/
        └── components/
```

## Notes for learners

- Data is **in-memory** — restarting the API clears users and tasks (demo users are re-seeded).
- `authorizeRole` is exported for RBAC exercises; task routes use **resource ownership** checks in services/controllers.
- Match this API when editing examples in `interactive-learning/src/data/examples.ts`.

## Related

- Interactive module: [interactive-learning/README.md](../../interactive-learning/README.md)
- Unauthenticated task API (Day 2b): [task-api](../../day-2-structured-api/task-api/README.md)
- MongoDB task API (Day 3): [task-mongo](../../day-3-persistence/task-mongo/README.md)
