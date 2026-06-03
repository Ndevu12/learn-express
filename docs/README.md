# Documentation

## Public (published with the repo)

| Document | Audience | Content |
|----------|----------|---------|
| [CURRICULUM.md](./CURRICULUM.md) | Instructors, learners | **Following the Request** — four-day spine, projects per day, glossary |
| [../README.md](../README.md) | Everyone | **Mission**, getting started, **repository map**, links to runnable projects |

Start with the [root README](../README.md) for navigation and setup. Use [CURRICULUM.md](./CURRICULUM.md) for day-by-day teaching structure.

## Internal (local only — not committed)

Maintainers and agents use **`docs/internal/`** for:

- **ANALYSIS.md** — current state, gaps, code issues  
- **IMPLEMENTATION-PLAN.md** — work packages, parallel lanes, merge order  

That folder is in `.gitignore`. Copy it from a teammate or regenerate locally; do not expect it on the remote.

**Separation rule:** Curriculum = *what we teach*. Analysis = *what is wrong today*. Implementation plan = *how we fix it in parallel*. Only curriculum + root README ship to learners.
