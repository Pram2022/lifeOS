# LifeOS — Module Development Guide

## Introduction

Every feature in LifeOS is implemented as an independent **feature module**.

Modules encapsulate everything related to a single business domain, including:

- Business logic
- API routes
- Database access
- User interface
- Shared contracts

Following a consistent module structure keeps the codebase predictable, maintainable, and easy to extend.

---

# Module Philosophy

A module should represent one business domain.

Examples include:

- Tasks
- Calendar
- Notes
- Goals
- Habits
- Projects

Each module owns its own logic and should not rely on another module's internal implementation.

---

# Creating a New Module

Every new module is created inside the `packages` directory.

Example:

```text
packages/
└── module-calendar/
```

Each module follows the same internal structure.

```text
module-calendar/
│
├── src/
│   ├── server/
│   ├── shared/
│   └── web/
│
├── dist/
├── package.json
└── tsconfig.json
```

Using a consistent structure makes every module immediately familiar to developers.

---

# Module Responsibilities

A module owns:

- Database models
- Business rules
- API endpoints
- User interface
- Validation schemas
- Shared contracts

A module should never contain unrelated functionality.

---

# Server Layer

The server layer contains the backend implementation.

```text
src/
└── server/
    ├── tasks.repository.ts
    ├── tasks.service.ts
    └── tasks.routes.ts
```

Files are prefixed with the module name (`tasks.` here) so their origin is unambiguous once many modules exist side by side.

---

# Repository

The repository is responsible for all database operations.

Responsibilities include:

- Reading data.
- Creating records.
- Updating records.
- Deleting records.

Repositories are the **only** place where Prisma may be used.

Example responsibilities:

- `findAll()`
- `findById()`
- `create()`
- `update()`
- `delete()`

Repositories should never contain business rules.

---

# Service

The service layer contains business logic.

Responsibilities include:

- Applying business rules.
- Coordinating repositories.
- Validating business constraints.
- Preparing data for routes.

Services should not know anything about HTTP.

---

# Routes

Routes expose the module through the REST API.

Responsibilities include:

- Handling HTTP requests.
- Validating request data.
- Returning HTTP responses.
- Calling services.

Routes should remain small and contain no business logic.

---

# Shared Layer

The shared layer contains code used by both the frontend and backend.

```text
src/
└── shared/
```

Typical contents include:

- Zod schemas
- Request types
- Response types
- Shared interfaces

The shared layer acts as the module's public contract.

---

# Web Layer

The web layer contains the frontend implementation.

```text
src/
└── web/
```

Typical contents include:

- Page components
- UI components
- API calls
- User interactions

Frontend code should communicate only with the REST API.

It should never access the database directly.

---

# Module Boundaries

Modules must remain independent.

Allowed:

```
Task Module
      │
      ▼
Core Database
```

Not allowed:

```
Task Module
      │
      ▼
Calendar Repository
```

A module must never import another module's internal files.

Communication between modules should occur through public APIs only.

---

# Dependency Rules

Allowed dependencies:

- Core packages
- Shared libraries
- External npm packages

Forbidden dependencies:

- Another module's repository
- Another module's service
- Another module's database models
- Another module's internal files

---

# Validation

Every HTTP request should be validated using Zod.

Validation occurs before business logic executes.

Benefits include:

- Runtime safety.
- Consistent API contracts.
- Shared frontend/backend types.

---

# Database Access

Database access follows this path.

```
Route
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
Prisma
```

No other layer may communicate directly with Prisma.

---

# Public API

Every module should expose only its public interface.

Example:

```text
module-tasks/
│
├── src/
└── index.ts
```

The public entry point exports only what other applications need.

Internal implementation remains private.

---

# Folder Naming

Use consistent naming across every module.

Examples:

```
tasks.repository.ts
tasks.service.ts
tasks.routes.ts
tasks.schema.ts
TasksPage.tsx
```

Consistency improves readability and onboarding.

---

# Coding Principles

When developing a module:

- Keep files focused.
- Follow the layered architecture.
- Avoid duplicated logic.
- Prefer composition over inheritance.
- Keep functions small.
- Write descriptive names.
- Keep responsibilities separated.

---

# Checklist for New Modules

Before considering a module complete, verify that it includes:

- Database model (if required)
- Repository
- Service
- Routes
- Shared schemas
- Frontend page
- API integration
- Validation
- Documentation

---

# Example: Tasks Module

The Tasks module is the reference implementation for all future modules.

It demonstrates:

- Layered architecture
- Repository pattern
- REST API integration
- Shared Zod schemas
- Next.js frontend
- Prisma integration

Future modules should follow the same development pattern unless a documented architectural decision requires otherwise.

---

# Future Enhancements

As LifeOS grows, modules may also contribute:

- Dashboard widgets
- Sidebar navigation
- Global search providers
- Notifications
- Settings pages
- Background jobs

These extension points will be provided by the Core Platform while preserving module independence.

---

# Summary

Feature modules are the building blocks of LifeOS.

By following a consistent structure, strict dependency rules, and a layered architecture, modules remain independent, reusable, and easy to maintain as the platform grows.

Every new module should look and behave like the existing Tasks module, ensuring consistency across the entire codebase.
