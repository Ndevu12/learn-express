# Data layer

All learning content and copy live here. UI components under `src/components` only render state and import from this folder.

## Layout

| File / folder | Responsibility |
|---------------|----------------|
| `modules.ts` | Navigation: module list, sections, progress helpers |
| `module-sections.ts` | Per-module `Section` headers (title, description, icon) |
| `app-shell.ts` | App chrome: header, hero, footer |
| `examples.ts` | Interactive datasets (flows, code samples, scenarios) |
| `content/` | Module-specific UI copy not tied to `examples.ts` |
| `types.ts` | Shared content TypeScript types |
| `index.ts` | Barrel re-exports |

## Usage

```ts
import { getModuleSection, architectureLayers } from '@/data';
import { jwtExplorerContent } from '@/data/content/jwt';
```

Do not define arrays, labels, or code snippets inside `.tsx` module components.
