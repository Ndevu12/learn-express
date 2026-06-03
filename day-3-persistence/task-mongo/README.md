# Task API with MongoDB — Day 3

**Curriculum:** [docs/CURRICULUM.md](../../docs/CURRICULUM.md) (Day 3 — persistent storage)

Same layered API as [task-api](../../day-2-structured-api/task-api/README.md) (routes → controllers → services → repository), but tasks are stored in **MongoDB** and survive server restarts.

| | `task-api` (Day 2b) | `task-mongo` (Day 3) |
|---|------------------|------------------------|
| Storage | In-memory array | MongoDB via Mongoose |
| Port | 4000 | **4001** (default) |
| Config | Hard-coded port | `config/db.js` + `.env` |
| Repository | Sync, array mutations | Async, Mongoose queries |
| Auth | None | None |

Everything above the repository (routes, controllers, services, validation, status codes) matches `task-api`.

## Prerequisites

- Node.js 18+
- MongoDB 6+ (local Docker or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## MongoDB setup

### Option A — Docker (local)

```bash
docker run -d --name learn-express-mongo \
  -p 27017:27017 \
  mongo:7
```

Connection string:

```text
mongodb://127.0.0.1:27017/learn-express-tasks
```

### Option B — MongoDB Atlas

1. Create a free cluster and database user.
2. Allow your IP in **Network Access**.
3. Copy the connection string (replace `<password>` and database name if needed), e.g.:

```text
mongodb+srv://USER:PASSWORD@cluster0.example.mongodb.net/learn-express-tasks
```

## Run

```bash
npm install
cp .env.example .env
# Edit .env — set MONGODB_URI (and PORT if needed)
npm run dev
```

Base URL: `http://localhost:4001/tasks`

## Verify persistence

1. `POST` a task (see curl below).
2. Stop the server (`Ctrl+C`).
3. Start again with `npm run dev`.
4. `GET /tasks` — the task should still be there.

## API smoke tests (curl)

```bash
# Create
curl -s -X POST http://localhost:4001/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn MongoDB","priority":3,"deadline":"2026-12-31"}'

# List (note the id from create response)
curl -s http://localhost:4001/tasks

# Get by id
curl -s http://localhost:4001/tasks/REPLACE_ID

# Update
curl -s -X PUT http://localhost:4001/tasks/REPLACE_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn MongoDB (updated)","priority":4,"deadline":"2026-12-31"}'

# Duplicate title → 409
curl -s -X POST http://localhost:4001/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn MongoDB","priority":1,"deadline":"2026-06-01"}'

# Delete
curl -s -X DELETE http://localhost:4001/tasks/REPLACE_ID
```

## Project layout (Day 3 additions)

```text
task-mongo/
├── config/db.js          # MongoDB connection
├── src/models/Task.js    # Mongoose schema
├── src/repositories/     # Only layer that talks to the database
├── app.js                # Loads .env, connects DB, starts server
└── .env.example
```
