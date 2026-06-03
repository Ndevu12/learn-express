# Express Basics — Day 2a

**Curriculum:** [docs/CURRICULUM.md](../../docs/CURRICULUM.md) (Day 2 — structured application)

Minimal Express app that teaches **Route → Controller** only. User data lives in an in-memory array inside `userController.js`; there is no database or service/repository layer.

## Quick start

```bash
npm install
npm run dev
```

Server runs at `http://localhost:5000`.

## Project layout

| File | Role |
|------|------|
| `app.js` | Express app, CORS, mounts `/users` routes |
| `userRoutes.js` | Route definitions (HTTP method + path → controller) |
| `userController.js` | Request handlers and in-memory user data |
| `data.js` | Standalone destructuring demo — **not** used by the API |

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Home page text |
| GET | `/users` | All users → `{ "users": [...] }` |
| GET | `/users/:id` | One user by numeric id → `{ "user": {...} }` or 404 |
| GET | `/users/search?name=...` | Exact case-insensitive name match → `{ "users": [...] }` |
| GET | `/users/new` | Placeholder stub response |
| POST | `/users` | Placeholder stub response (does not persist data) |

### Examples

```bash
curl http://localhost:5000/users
curl http://localhost:5000/users/1
curl "http://localhost:5000/users/search?name=Alice%20Johnson"
```

## What this project teaches

- Separating **routes** from **controllers**
- REST-style URL design for a users resource
- Returning JSON from controller handlers

For full layering (services, repositories, validation, task CRUD), continue to [task-api](../task-api/README.md) (Day 2b).

## Sample user roles

The in-memory users include `admin`, `manager`, and `user` roles to foreshadow authorization topics on Day 4.
