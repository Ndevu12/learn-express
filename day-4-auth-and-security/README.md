# Day 4 — Authentication and security

**Curriculum:** [docs/CURRICULUM.md](../docs/CURRICULUM.md) (Day 4 — *Trust & authorization*)

Runnable API and React UI live under **`auth/`**. Interactive walkthroughs (JWT, RBAC, protected routes) are in [interactive-learning](../interactive-learning/).

## Runnable projects

| Project | Path | Port |
|---------|------|------|
| Auth API | [auth/task-with-auth](auth/task-with-auth/) | 4000 |
| Auth UI | [auth/task-with-auth-ui](auth/task-with-auth-ui/) | 5173 |

**Setup, demo users, endpoints, and curl-style flows:** [auth/README.md](auth/README.md)

## Request path (conceptual)

Client → **Authentication** (who are you?) → **Authorization** (may you do this?) → application layers → data store → response.

- **401** — not authenticated (missing/invalid token)  
- **403** — authenticated but not allowed (e.g. delete someone else’s task)

## Related days

- **Day 2b** (no auth): [task-api](../day-2-structured-api/task-api/README.md)  
- **Day 3** (persistence, no auth): [task-mongo](../day-3-persistence/task-mongo/README.md)
