# LifeOS — Software Architecture

## Introduction

LifeOS is designed using a **Modular Monolith Architecture**. The application is deployed as a single system while internally separating features into independent modules with clearly defined boundaries.

The goal of this architecture is to provide the simplicity of a monolithic application while maintaining the organization, scalability, and maintainability of a modular system.

The architecture is intentionally designed before implementing features to establish consistent development patterns and reduce future technical debt.

---

# Architectural Principles

The architecture is built around the following principles:

- High cohesion within each module.
- Loose coupling between modules.
- Clear separation of responsibilities.
- Single responsibility at every layer.
- Explicit dependency rules.
- Reusable shared infrastructure.
- Platform-first design.
- Simplicity over unnecessary complexity.

---

# Why a Modular Monolith?

A modular monolith provides many of the organizational benefits of microservices without introducing the operational complexity.

Benefits include:

- Single deployment.
- Simple local development.
- Single database.
- Easier debugging.
- Lower infrastructure costs.
- Faster feature development.
- Clear module boundaries.
- Ability to migrate individual modules to microservices in the future if justified.

Microservices are intentionally deferred until there is clear evidence that a module requires independent deployment or scaling.

---

# High-Level Architecture

```text
                    +----------------------+
                    |      Next.js Web     |
                    +----------+-----------+
                               |
                         REST API (HTTP)
                               |
                    +----------v-----------+
                    |      Express API     |
                    +----------+-----------+
                               |
                     Module Facades
                               |
     +-------------+-----------+-----------+-------------+
     |             |                       |             |
+----v----+  +-----v-----+          +------v------+ +----v----+
| Tasks   |  | Calendar  |          | Notes       | | Goals   |
+----+----+  +-----+-----+          +------+------+-+----+----+
     |               |                        |           |
 Repository      Repository              Repository  Repository
     |               |                        |           |
     +---------------+-----------+------------+-----------+
                                 |
                         Prisma Client
                                 |
                           PostgreSQL
```

---

# Core Platform

The Core Platform provides shared infrastructure used by every module.

Core responsibilities include:

- Application shell.
- Authentication.
- Database connection.
- Shared UI components.
- Configuration.
- Module loader.
- Dashboard framework.
- Shared types.
- Application startup.

The Core Platform does **not** contain feature-specific business logic.

---

# Feature Modules

Each feature is implemented as an independent module.

Examples include:

- Tasks
- Calendar
- Notes
- Goals
- Habits
- Projects

Each module owns:

- Database models
- Business rules
- API routes
- UI
- Validation
- Repository
- Service layer

Modules should never directly manipulate another module's internal implementation.

---

# Module Structure

Every module follows the same internal structure.

```text
packages/
└── module-example/
    ├── server/
    │   ├── repository.ts
    │   ├── service.ts
    │   └── routes.ts
    │
    ├── web/
    │   └── ExamplePage.tsx
    │
    └── shared/
        └── schemas.ts
```

Using a consistent structure reduces onboarding time and makes modules easier to understand.

---

# Module Boundaries

Each module exposes **one public entry point** (a facade).

Other modules interact only through this public API.

Modules may never import another module's internal files directly.

This rule ensures that implementation details remain private and modules can evolve independently.

---

# Layered Architecture

Each request follows a predictable path:

```text
HTTP Request
      │
      ▼
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
      │
      ▼
PostgreSQL
```

Each layer has a single responsibility:

### Routes

- Handle HTTP requests.
- Validate input.
- Return HTTP responses.
- Delegate work to services.

Routes contain no business logic.

---

### Services

Services implement business rules.

Examples:

- Completing a task.
- Applying validation beyond schema checks.
- Coordinating multiple repositories.
- Enforcing business constraints.

---

### Repositories

Repositories are responsible for all database access.

Repositories are the **only** place where Prisma is used.

This abstraction allows the data layer to change without affecting business logic.

---

### Database

PostgreSQL stores all application data.

Prisma provides type-safe database access through a singleton PrismaClient shared across the application.

---

# Shared Contracts

Each module contains a `shared` directory.

This directory stores:

- Zod schemas.
- Shared types.
- Request contracts.
- Response contracts.

These schemas provide:

- Runtime validation.
- Compile-time TypeScript types.
- Consistent API contracts.
- Reuse between frontend and backend.

The shared directory acts as the single source of truth for data exchanged across the HTTP boundary.

---

# Dashboard Architecture

The Dashboard is part of the Core Platform.

It does not own business data.

Instead, it requests information from feature modules.

Examples:

- Tasks provide today's tasks.
- Calendar provides today's events.
- Goals provide progress.
- Habits provide streaks.

This keeps the Dashboard lightweight and prevents duplication of business logic.

---

# Extension Points

Rather than modifying the Core Platform whenever a new feature is added, modules contribute through predefined extension points.

Examples include:

- Sidebar navigation.
- Dashboard widgets.
- Settings pages.
- Search providers.

This design allows new modules to integrate with minimal changes to existing code.

---

# API Design

Communication between the frontend and backend uses a REST API.

Reasons for this choice include:

- Technology independence.
- Easy mobile application support.
- Clear HTTP contracts.
- Simplicity.
- Industry familiarity.

Validation is performed using Zod before requests reach business logic.

---

# Database Strategy

LifeOS uses:

- One PostgreSQL database.
- One Prisma schema.
- One shared PrismaClient.

Although modules share the same physical database, ownership is maintained through repository boundaries.

A module may only access its own models through its own repository layer.

---

# Scalability

The architecture is designed to evolve over time.

Possible future enhancements include:

- Authentication.
- Background workers.
- Notifications.
- File storage.
- Caching.
- Independent services for high-demand modules.

Because modules are already isolated, extracting a module into a microservice would require minimal architectural changes.

---

# Architectural Goals

This architecture aims to achieve:

- Maintainability.
- Scalability.
- Testability.
- Consistency.
- Reusability.
- Developer productivity.
- Long-term flexibility.

---

# Summary

LifeOS is intentionally designed as a modular monolith to balance simplicity with scalability.

By enforcing strict module boundaries, consistent layering, shared contracts, and reusable infrastructure, the architecture provides a solid foundation for long-term growth while remaining approachable for development and maintenance.
