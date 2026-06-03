# Curriculum — Following the Request

Public reference for instructors and learners. Describes **what we teach** and **which projects to run** — not internal fix lists or delivery schedules.

For repository navigation and how to start each project, see the [root README](../README.md).

---

## Mission

Learn Express teaches backend development by **following one HTTP request** as it moves through deeper layers over four days. Students see *why* Express exists (Day 1), *how* apps are structured (Day 2), *where* data persists (Day 3), and *who* is allowed to act (Day 4).

---

## The four days (request flow)

| Day | Theme | Request path (conceptual) |
|-----|--------|---------------------------|
| **1** | The request arrives | Client → Server → Response |
| **2** | Structured application | Client → Route → Controller → Service → Repository (in-memory) → Response |
| **3** | Persistent storage | Same stack → Repository → **MongoDB** → Response |
| **4** | Trust & authorization | Client → Authentication → Authorization → Application → Database → Response |

### Day 1 — The request arrives

**Topics:** HTTP, Node.js `http`, Express basics (`app.get` / `app.post`, `req` / `res`).

**Runnable:** [day-1-http-and-express/](../day-1-http-and-express/README.md)

- `nodeserver.js` — native HTTP, manual routing
- `expressapp.js` — minimal Express (port 5000)

**Try it:** curl or browser `fetch` against port 5000 (Day 1) or `fetch`/`axios` against port 4000 (Days 2–4). Interactive modules include copy-paste **Practical: call the API** panels.

**Goal:** Compare manual servers with Express before any project folders.

---

### Day 2 — Structured application (two projects)

**Topics:** Routes, controllers, services, middleware, validation, errors, REST, in-memory repository (not a real database yet).

**Step A —** [day-2-structured-api/express-basics/](../day-2-structured-api/express-basics/README.md)

- Client → **Route** → **Controller** → Response  
- Users API, roles in sample data (foreshadows Day 4)

**Step B —** [day-2-structured-api/task-api/](../day-2-structured-api/task-api/README.md)

- Full layering: routes, controllers, services, repositories (in-memory)  
- Task CRUD, Morgan, CORS, JSON body parsing  
- Validation and HTTP status codes in controllers  

**Teaching order:** Run and study **express-basics** first, then **task-api**. Same *request*, more layers in the second project.

**Interactive topics (Day 2):** Architecture, request lifecycle, CRUD, middleware, validation, error handling — see [interactive-learning](../interactive-learning/).

---

### Day 3 — Persistent storage

**Topics:** MongoDB, Mongoose (or equivalent), repository as the database boundary, environment configuration, data that **survives restart**.

**Runnable:** [day-3-persistence/task-mongo/](../day-3-persistence/task-mongo/README.md) — same API shape as **task-api**, persistence via MongoDB instead of in-memory arrays.

**Teaching contrast:** Day 2 **task-api** = structure; Day 3 **task-mongo** = same request path, real database at the end.

---

### Day 4 — Authentication & authorization

**Topics:** bcrypt, JWT, 401 vs 403, RBAC, protected routes, rate limiting, frontend auth flow.

**Runnable:**

- API: [day-4-auth-and-security/auth/task-with-auth](../day-4-auth-and-security/auth/task-with-auth/)
- UI: [day-4-auth-and-security/auth/task-with-auth-ui](../day-4-auth-and-security/auth/task-with-auth-ui/)
- Guide: [day-4-auth-and-security/auth/README.md](../day-4-auth-and-security/auth/README.md)
- Day index: [day-4-auth-and-security/README.md](../day-4-auth-and-security/README.md)

**Interactive topics (Day 4):** Auth vs authorization, authentication flow, JWT, protected routes, RBAC, end-to-end — see [interactive-learning](../interactive-learning/).

---

## Teaching tree

| Day | Path | Guide |
|-----|------|--------|
| 1 | `day-1-http-and-express/` | [README](../day-1-http-and-express/README.md) |
| 2a | `day-2-structured-api/express-basics/` | [README](../day-2-structured-api/express-basics/README.md) |
| 2b | `day-2-structured-api/task-api/` | [README](../day-2-structured-api/task-api/README.md) |
| 3 | `day-3-persistence/task-mongo/` | [README](../day-3-persistence/task-mongo/README.md) |
| 4 | `day-4-auth-and-security/auth/` | [README](../day-4-auth-and-security/auth/README.md) |
| All | `interactive-learning/` | Unchanged; modules grouped by day in the app |

---

## Ports (default)

| Project | Port |
|---------|------|
| `day-1-http-and-express/expressapp.js` | 5000 |
| `express-basics` | 5000 |
| `task-api` | 4000 |
| `task-mongo` | **4001** (runs beside task-api) |
| Auth API | 4000 |
| Auth UI | 5173 |
| Interactive learning | Vite default (see project config) |

---

## Glossary

| Term | Meaning |
|------|---------|
| **Following the Request** | One request, deeper layers each day |
| **Repository** | Only layer that knows how data is stored |
| **Day 2a / 2b** | express-basics, then task-api |

---

## Legacy naming

Older docs may say “Session 3” (production API / interactive fundamentals) or “Session 4” (auth). They map to **Day 2b** and **Day 4** in this curriculum.

**Former paths (one release):** `nodeserver.js` and `expressapp.js` at repo root → `day-1-http-and-express/`; `expressBasics/` → `day-2-structured-api/express-basics/`; `task/` → `day-2-structured-api/task-api/`; `task-mongo/` → `day-3-persistence/task-mongo/`; `auth/` → `day-4-auth-and-security/auth/`.

---

*Public curriculum document. Internal analysis and implementation tracking live in `docs/internal/` (not published).*
