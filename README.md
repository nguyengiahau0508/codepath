# CodePath

Modern full‑stack web application scaffold with a NestJS backend, Angular frontend, MariaDB, Redis, BullMQ queues, TypeORM migrations, and Docker Compose for local development.

![Node](https://img.shields.io/badge/Node-20.x-43853D?logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-11.x-E0234E?logo=nestjs&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-21.x-DD0031?logo=angular&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-11.x-003545?logo=mariadb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-7.x-DC382D?logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Quick Start](#quick-start)
	- [Prerequisites](#prerequisites)
	- [Environment Variables](#environment-variables)
	- [Run with Docker](#run-with-docker)
	- [Run locally (without Docker)](#run-locally-without-docker)
- [Backend](#backend)
	- [Scripts](#backend-scripts)
	- [Database & Migrations](#database--migrations)
	- [Testing](#backend-testing)
- [Frontend](#frontend)
	- [Scripts](#frontend-scripts)
	- [Testing](#frontend-testing)
- [Development](#development)
	- [Lint & Format](#lint--format)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

This monorepo contains a server built with NestJS and a client built with Angular. It uses MariaDB for persistence, Redis for queues and caching, and BullMQ for background job processing (e.g., code judging or analytics). TypeORM manages schema migrations. Docker Compose is provided for a smooth local environment, including database and Redis services.

## Tech Stack

- Backend: NestJS 11, TypeScript, TypeORM, BullMQ
- Frontend: Angular 21, TypeScript
- Datastores: MariaDB 11, Redis 7
- Runtime: Node.js 20
- Tooling: Jest (backend), Vitest (frontend), ESLint, Prettier
- Containerization: Docker Compose

## Repository Structure

```
codepath/
├─ docker-compose.yml
├─ init.sql
├─ backend/
│  ├─ Dockerfile
│  ├─ package.json
│  ├─ src/
│  │  ├─ config/ (env validation, database config)
│  │  ├─ infrastructure/ (queue, redis, storage, sandbox)
│  │  ├─ modules/ (feature modules: identity, judge, problem, etc.)
│  │  └─ typeorm.datasource.ts
│  └─ migrations/
└─ frontend/
	 ├─ Dockerfile
	 ├─ package.json
	 └─ src/
```

## Quick Start

### Prerequisites

- Node.js 20+
- npm 11+
- Docker Desktop (latest) with Docker Compose

### Environment Variables

The backend validates required variables via Joi. Create a `.env` file in the repository root (used by Docker Compose) and/or in `backend/` when running locally. Minimum example:

```
# App ports on host
BACKEND_PORT=3000
FRONTEND_PORT=4200

# MariaDB
DB_HOST=mariadb         # use 'mariadb' inside Docker; 'localhost' outside
DB_PORT=3306
DB_NAME=codepath_db
DB_USER=codepath_user
DB_PASSWORD=@Giahau2004

# Redis
REDIS_HOST=redis        # use 'redis' inside Docker; 'localhost' outside
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT secrets
JWT_ACCESS_SECRET=changeme_access
JWT_REFRESH_SECRET=changeme_refresh
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Optional: override .env file selection
# ENV_FILE=.env.development
```

Notes:
- `env.validation.ts` requires `DB_*`, `REDIS_*`, and JWT secrets.
- When running without Docker, set `DB_HOST=localhost` and `REDIS_HOST=localhost` if you start those services on your machine.

### Run with Docker

1. Create `.env` in repo root with variables above.
2. Build and start all services:

```bash
docker compose up -d --build
```

Services:
- Backend available at `http://localhost:${BACKEND_PORT}` (default 3000)
- Frontend available at `http://localhost:${FRONTEND_PORT}` (default 4200)
- MariaDB `localhost:3306`, Redis `localhost:6379`

The `backend-migrate` service runs TypeORM migrations before starting the API.

### Run locally (without Docker)

Start MariaDB and Redis yourself, then:

Backend:

```bash
cd backend
npm install
# Ensure .env is set in backend/ or use ENV_FILE
npm run db:migrate
npm run start:dev
```

Frontend:

```bash
cd frontend
npm install
npm start
# open http://localhost:4200
```

## Backend

### Backend Scripts

- `start`: start NestJS
- `start:dev`: start with watch mode
- `start:prod`: run compiled dist
- `build`: compile TypeScript to `dist/`
- `migration:generate`: generate a new migration
- `migration:run` / `db:migrate`: apply migrations
- `migration:revert`: rollback last migration
- `test`, `test:e2e`, `test:cov`: Jest test workflows
- `lint`, `format`: ESLint and Prettier

### Database & Migrations

- Database: MariaDB via TypeORM; configuration read from environment.
- Migrations sources: `src/migrations/*.ts` and `dist/migrations/*.js`.
- `init.sql` seeds the database/user for the MariaDB container.

Relevant config:
- `src/typeorm.datasource.ts` defines the DataSource used by TypeORM CLI.
- `src/config/env.validation.ts` defines required environment vars.
- `src/config/database.config.ts` provides Nest TypeORM module options.

### Backend Testing

Run tests:

```bash
cd backend
npm run test        # unit
npm run test:e2e    # e2e
npm run test:cov    # coverage
```

## Frontend

### Frontend Scripts

- `start`: Angular dev server (served on `http://localhost:4200`)
- `build`: production build to `dist/`
- `test`: unit tests via Vitest
- `watch`: dev build watch mode

### Frontend Testing

```bash
cd frontend
npm run test
```

## Development

### Lint & Format

- Backend:

```bash
cd backend
npm run lint
npm run format
```

- Frontend: Prettier config is included; linting can be added via Angular ESLint if desired.

## Deployment

For containerized deployment, build images and run your orchestrator of choice:

```bash
# Build images
docker compose build

# Start services
docker compose up -d
```

Adjust environment variables and image tags for production. In production, ensure `NODE_ENV=production` and secure JWT secrets.

## Troubleshooting

- Migrations don’t run: confirm the backend `ENV_FILE` or `.env` is loaded and DB is reachable.
- Redis connection errors: verify `REDIS_HOST` and `REDIS_PORT` values (`redis` in Docker network).
- Frontend cannot reach backend: check CORS and the base API URL used by the frontend; by default, the API is on `http://localhost:3000`.
- Windows Docker file watching: frontend uses `--poll`, backend mounts `src/`; ensure file sharing is enabled in Docker Desktop.

## Contributing

1. Fork and create a feature branch.
2. Follow existing code style (ESLint/Prettier).
3. Add tests where applicable.
4. Submit a pull request with a clear description.

## License

This repository currently uses an unlicensed/proprietary setup (`backend/package.json` declares `UNLICENSED`). If you intend to open source, add a suitable LICENSE file and update package metadata.

