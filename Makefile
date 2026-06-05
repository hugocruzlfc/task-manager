# ====================== VARIABLES ======================
DC = docker compose
BACKEND_DIR = backend
FRONTEND_DIR = frontend

# ====================== HELP ======================
help: ## Muestra los comandos disponibles
	@echo "Comandos disponibles:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ====================== INSTALACIÓN ======================
install: ## Instala todas las dependencias
	pnpm install
	cd $(FRONTEND_DIR) && pnpm install
	cd $(BACKEND_DIR) && pnpm install

# ====================== DOCKER ======================
up: ## Levanta todos los servicios (recrea si es necesario)
	$(DC) up -d --force-recreate

up-build: ## Levanta los servicios reconstruyendo las imágenes
	$(DC) up -d --build --force-recreate

up-db: ## Solo levanta PostgreSQL y Redis
	$(DC) up -d --force-recreate postgres redis

down: ## Detiene todos los servicios
	$(DC) down

down-volumes: ## Detiene y elimina los volúmenes (¡cuidado! borra la DB)
	$(DC) down -v

logs: ## Ver logs de todos los servicios
	$(DC) logs -f

logs-db: ## Ver logs solo de PostgreSQL
	$(DC) logs -f postgres

logs-app: ## Ver logs de la aplicación NestJS
	$(DC) logs -f backend  # cambia "backend" por el nombre de tu servicio

# ====================== PRISMA ======================
migrate: ## Ejecuta migraciones de Prisma
	cd $(BACKEND_DIR) && pnpm prisma migrate dev

migrate-prod: ## Migraciones en producción (sin dev)
	cd $(BACKEND_DIR) && pnpm prisma migrate deploy

migrate-reset: ## Resetea la base de datos (¡cuidado!)
	cd $(BACKEND_DIR) && pnpm prisma migrate reset

db-push: ## Sincroniza schema sin migraciones (útil en desarrollo temprano)
	cd $(BACKEND_DIR) && pnpm prisma db push

studio: ## Abre Prisma Studio
	cd $(BACKEND_DIR) && pnpm prisma studio

seed: ## Ejecuta el seed de datos
	cd $(BACKEND_DIR) && pnpm prisma db seed

# ====================== DESARROLLO ======================
dev: ## Inicia el entorno completo (Docker + frontend + backend)
	$(DC) up -d postgres redis
	cd $(BACKEND_DIR) && pnpm dev & \
	cd $(FRONTEND_DIR) && pnpm dev

dev-backend: ## Solo backend en modo desarrollo
	cd $(BACKEND_DIR) && pnpm dev

dev-frontend: ## Solo frontend en modo desarrollo
	cd $(FRONTEND_DIR) && pnpm dev

# ====================== CALIDAD ======================
test: ## Ejecuta tests del backend
	cd $(BACKEND_DIR) && pnpm test

test-watch: ## Tests en modo watch
	cd $(BACKEND_DIR) && pnpm test --watch

lint: ## Lint del backend y frontend
	cd $(BACKEND_DIR) && pnpm lint
	cd $(FRONTEND_DIR) && pnpm lint

# ====================== LIMPIEZA ======================
clean: ## Limpia dependencias y builds
	rm -rf node_modules
	rm -rf $(FRONTEND_DIR)/node_modules
	rm -rf $(BACKEND_DIR)/node_modules
	rm -rf $(BACKEND_DIR)/dist

prisma-generate: ## Regenera el cliente de Prisma
	cd $(BACKEND_DIR) && pnpm prisma generate