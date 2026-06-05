<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Frontend Stack

- **Next.js 16** with App Router — all pages go under `app/`. No `pages/` directory.
- **React 19** — Server Components are the default. Use `"use client"` only when necessary (event handlers, hooks, browser APIs).
- **Tailwind CSS v4** — configured via PostCSS (`postcss.config.mjs`). No `tailwind.config.*` file; use CSS variables and `@theme` in `globals.css`.
- **TypeScript** strict mode.

## Commands (run from `frontend/`)

| Task             | Command                            |
| ---------------- | ---------------------------------- |
| Dev server       | `pnpm dev` → http://localhost:3000 |
| Production build | `pnpm build`                       |
| Lint             | `pnpm lint`                        |

## Conventions

- Colocate components inside `app/` using route group folders (e.g., `app/(dashboard)/`).
- Fonts are loaded via `next/font/google` in `app/layout.tsx` — do not add `<link>` tags.
- Images: always use `next/image` with explicit `width`/`height`.
- For the full project setup and backend commands, see the root [AGENTS.md](../AGENTS.md).
