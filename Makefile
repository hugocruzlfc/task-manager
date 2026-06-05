install:
	pnpm install
	cd frontend && pnpm install
	cd backend && pnpm install

up:
	docker compose up -d

down:
	docker compose down

migrate:
	cd backend && pnpm prisma migrate dev

seed:
	cd backend && pnpm prisma db seed

dev:
	pnpm dev

test:
	cd backend && pnpm test