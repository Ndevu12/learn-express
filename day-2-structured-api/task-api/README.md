# Task API — Day 2b

**Curriculum:** [docs/CURRICULUM.md](../../docs/CURRICULUM.md) (Day 2 — structured application)

In-memory task CRUD on port **4000**. Same REST shape as Day 3 [task-mongo](../../day-3-persistence/task-mongo/README.md), but data lives in an array inside the repository and is lost on restart.

**Prerequisite:** skim [express-basics](../express-basics/README.md) (Day 2a — routes + controllers only).

## Run

```bash
npm install
npm run dev
```

Base URL: `http://localhost:4000/tasks`

## Architecture

```text
Client → Route → Controller → Service → Repository (in-memory) → Response
```

| Layer | Folder |
|-------|--------|
| Routes | `src/routes/taskRoutes.js` |
| Controllers | `src/controllers/taskControllers.js` |
| Services | `src/services/taskServices.js` |
| Repository | `src/repositories/taskRepository.js` |

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/tasks` | Create task |
| GET | `/tasks` | List all tasks |
| GET | `/tasks/:id` | Get one task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

**Body fields:** `title` (string), `priority` (1–5), `deadline` (date string). Duplicate titles return **409**.

## CRUD examples (curl)

```bash
# Create
curl -s -X POST http://localhost:4000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Express layers","priority":3,"deadline":"2026-12-31"}'

# List all
curl -s http://localhost:4000/tasks

# Get by id (replace REPLACE_ID from create/list response)
curl -s http://localhost:4000/tasks/REPLACE_ID

# Update
curl -s -X PUT http://localhost:4000/tasks/REPLACE_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Express layers (updated)","priority":4,"deadline":"2026-12-31"}'

# Duplicate title → 409
curl -s -X POST http://localhost:4000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Express layers","priority":1,"deadline":"2026-06-01"}'

# Delete
curl -s -X DELETE http://localhost:4000/tasks/REPLACE_ID
```

## Validation quick checks

```bash
# Missing fields → 400
curl -s -X POST http://localhost:4000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Incomplete"}'

# Priority out of range → 400
curl -s -X POST http://localhost:4000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Bad priority","priority":9,"deadline":"2026-12-31"}'
```

## Next

- **Day 3:** [task-mongo](../../day-3-persistence/task-mongo/README.md) — same API, MongoDB on port **4001**  
- **Day 4:** [auth](../../day-4-auth-and-security/auth/README.md) — JWT, roles, protected routes  
- **Interactive:** [interactive-learning](../../interactive-learning/)
