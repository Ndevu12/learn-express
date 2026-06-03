# Day 1 — HTTP and Express

**Curriculum:** [docs/CURRICULUM.md](../docs/CURRICULUM.md) (Day 1 — *The request arrives*)

Before project folders or layers, you run two small scripts side by side: native Node `http`, then minimal Express. The goal is to see what Express removes from your day-to-day code (routing, headers, JSON).

## Files in this folder

| File | What it teaches |
|------|-----------------|
| `nodeserver.js` | Manual routing with `http.createServer` |
| `expressapp.js` | Same ideas with `app.get` / `app.post` and `req` / `res` |

## Run

From this directory (or pass the file path from the repo root):

```bash
# Native HTTP (default port in file — check console output)
node nodeserver.js

# Minimal Express on port 5000
node expressapp.js
```

Open another terminal and try:

```bash
curl http://localhost:5000/
curl -X POST http://localhost:5000/
```

For `nodeserver.js`, read the `listen` port in the file and hit the routes it defines (`/`, `about`, etc.).

## What to notice

1. **Routing** — `nodeserver.js` uses `if (url === … && method === …)`; Express maps method + path to handlers.
2. **Response helpers** — Express `res.send` / `res.json` vs manual `res.writeHead` + `res.end`.
3. **No layers yet** — one file, one callback per route. Day 2 adds routes, controllers, services, and repositories.

## Next

- **Day 2a:** [express-basics](../day-2-structured-api/express-basics/README.md) — routes + controllers  
- **Day 2b:** [task-api](../day-2-structured-api/task-api/README.md) — full layered CRUD (in-memory)  
- **Interactive modules:** [interactive-learning](../interactive-learning/)
