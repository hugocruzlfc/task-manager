# Task Manager — Agent Instructions

Monorepo: **Next.js 16 frontend** + **NestJS 11 backend** + **PostgreSQL 17 + Redis 7** via Docker.  
Package manager: **pnpm** (each package has its own `pnpm-lock.yaml`; this is NOT a pnpm workspace).

## Project Structure

```
/
├── frontend/       # Next.js 16 App Router, React 19, Tailwind CSS v4
├── backend/        # NestJS 11, TypeScript, Prisma ORM
└── docker-compose.yaml  # postgres:17, redis:7
```

## Essential Commands

Run from the **root** using `make` or `pnpm`:

| Task                         | Command                         |
| ---------------------------- | ------------------------------- |
| Install deps (both packages) | `make install`                  |
| Start DB + Redis             | `make up` (or `pnpm db:up`)     |
| Stop DB + Redis              | `make down` (or `pnpm db:down`) |
| Run both servers in dev      | `make dev` (or `pnpm dev`)      |
| Run DB migrations            | `make migrate`                  |
| Seed DB                      | `make seed`                     |
| Run backend tests            | `make test`                     |

Run from **`backend/`** for more granular control — see [backend/README.md](backend/README.md).  
Run from **`frontend/`** for frontend-only dev — see [frontend/README.md](frontend/README.md).

## Backend (NestJS)

- Follow NestJS module/controller/service pattern. Generate new resources with `pnpm nest g resource <name>`.
- Prisma is used for DB access: schema at `backend/prisma/schema.prisma`.
- Run `make migrate` after editing the schema. Run `make seed` to seed initial data.
- Tests: Jest. Unit tests colocated with source (`*.spec.ts`). E2E tests in `backend/test/`.

## Frontend (Next.js)

> **⚠️ Next.js 16 has breaking changes** — APIs and conventions may differ from training data.  
> Read `node_modules/next/dist/docs/` before writing any code. See [frontend/AGENTS.md](frontend/AGENTS.md).

- Uses App Router (`frontend/app/`). No Pages Router.
- Tailwind CSS v4 (PostCSS plugin, not CDN). Config is in `postcss.config.mjs`.
- TypeScript strict mode.

## Dev Environment Requirements

- Docker (for `make up` to start DB and Redis)
- pnpm (install globally: `npm i -g pnpm`)
- Node.js ≥ 20

## Common Pitfalls

- **Always start Docker services first** (`make up`) before running the backend.
- **Install deps per package** (`make install`), not from root (`pnpm install` at root only installs `concurrently`).
- Prisma client must be regenerated after schema changes: `cd backend && pnpm prisma generate`.
