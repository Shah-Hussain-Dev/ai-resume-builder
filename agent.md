# Backend Agent Guide

## Overview
This document outlines the **best practices** for building and maintaining a **Node.js Express** backend within this project. It serves as a reference for contributors and as a checklist for new features or refactors.

## 1. Project Structure
```
src/
├─ controllers/      # Request handling logic
├─ routes/           # Express routers, grouped by domain
├─ services/         # Business logic, reusable across controllers
├─ models/           # Database schemas / ORM models
├─ middlewares/      # Reusable request/response middleware
├─ utils/            # Helper functions and utilities
├─ config/           # Configuration (dotenv, env validation)
└─ app.ts            # Express app setup

tests/               # Unit / integration tests
```

## 2. Coding Conventions
- **Language**: TypeScript (`.ts`). Enable `strict` mode in `tsconfig.json`.
- **Linting**: Use `eslint` with the **Airbnb** style guide and `prettier` for formatting. Run `npm run lint` in CI.
- **Naming**:
  - Files & folders: `kebab-case`.
  - Classes / Interfaces: `PascalCase`.
  - Functions & variables: `camelCase`.
- **Error Handling**: Throw custom error classes extending `Error` with an `httpStatus` property. Centralise handling in an error‑handling middleware.
- **Async/Await**: Prefer `async/await`; wrap route handlers with a helper to forward rejections to the error middleware.

## 3. Security
- **Helmet**: Set HTTP headers (`npm i helmet`).
- **Rate Limiting**: Use `express-rate-limit` on public endpoints.
- **CORS**: Configure restrictive origins via `cors` middleware.
- **Input Validation**: Validate request bodies/params with **Zod** or **Joi** and reject invalid payloads before reaching business logic.
- **Environment Secrets**: Load via `dotenv` and validate schema on startup (e.g., `zod` config schema).
- **SQL/NoSQL Injection**: Use parameterised queries / ORM built‑in safeguards.

## 4. Testing
- **Framework**: Jest + Supertest for integration tests.
- **Coverage**: Minimum 80 % line coverage (`npm run test:coverage`).
- **Test Structure**:
  - Unit tests for pure functions/services.
  - Integration tests for routes, utilizing an in‑memory DB or test containers.
- **CI**: Run tests, lint and type‑check on each PR.

## 5. Performance & Scalability
- **Compression**: `compression` middleware for response gzip.
- **Caching**: Use `node-cache` or Redis for frequently accessed data.
- **Database Connections**: Use a connection pool; close on process exit.
- **Graceful Shutdown**: Listen for `SIGTERM`/`SIGINT`, stop accepting new requests, finish ongoing ones, then close DB connections.

## 6. Logging & Monitoring
- **Logging**: `pino` or `winston` with structured JSON logs. Include request ID (`cls-hooked` or `async‑hooks`).
- **Tracing**: Optional OpenTelemetry for distributed tracing.
- **Health Checks**: `/health` endpoint returning `{ status: "ok" }` and checking DB connectivity.

## 7. Documentation
- **API Docs**: Swagger/OpenAPI (`swagger-ui-express`). Keep the spec in `docs/openapi.yaml` and generate from route annotations where possible.
- **README**: Include setup, run, test, and deployment instructions.
- **Changelog**: Follow **Keep a Changelog** format.

## 8. Deployment
- **Docker**: Multi‑stage Dockerfile – build stage with `npm ci` and run stage with `node --es-module-specifier-resolution=node dist/app.js`.
- **Environment Variables**: Do not hard‑code values. Use `process.env` with defaults validated at startup.
- **Zero‑Downtime Deploy**: Use a process manager like **PM2** or **Docker rolling updates**.

## 9. Version Control
- **Branching**: Feature branches off `main`. PR must pass CI checks.
- **Commit Messages**: Follow **Conventional Commits** (e.g., `feat: add user registration`).
- **Git Hooks**: `pre-commit` runs lint + format; `pre-push` runs tests.

---
*This guide is intended to evolve with the project. Update it when new conventions or tools are adopted.*