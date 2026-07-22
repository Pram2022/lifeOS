# LifeOS — Architecture Decision Log

## Introduction

This document records significant architectural and technical decisions made throughout the LifeOS project.

Its purpose is to explain **why** a decision was made, not simply **what** was implemented.

Understanding the reasoning behind past decisions helps maintain consistency, prevents repeated discussions, and provides valuable context for future contributors.

---

# Decision Record Format

Each architectural decision follows the same format:

- Decision
- Date
- Context
- Options Considered
- Decision
- Rationale
- Consequences

---

# ADR-001

## Title

Use a Modular Monolith Architecture

### Date

July 2026

### Context

LifeOS is expected to grow into a large productivity platform containing many independent features such as Tasks, Calendar, Notes, Goals, Habits, Projects, and more.

The architecture needed to support long-term growth without introducing unnecessary complexity during the early stages of development.

### Options Considered

- Traditional Monolith
- Modular Monolith
- Microservices

### Decision

Use a **Modular Monolith**.

### Rationale

A modular monolith provides:

- Simpler development
- Single deployment
- Easier debugging
- Lower infrastructure costs
- Clear module boundaries

while avoiding the operational overhead of microservices.

### Consequences

Positive

- Faster development
- Easier testing
- Easier onboarding
- Better maintainability

Negative

- Entire application is deployed together.

Microservices remain a future option if real scalability requirements emerge.

---

# ADR-002

## Title

Use Next.js for the Frontend

### Date

July 2026

### Context

The project originally considered a standard React application.

### Options Considered

- React (Vite)
- Next.js

### Decision

Use **Next.js (App Router)**.

### Rationale

Next.js provides:

- Modern React architecture
- Excellent developer experience
- File-based routing
- Strong TypeScript support
- Production-ready tooling

It also provides valuable industry experience.

### Consequences

Positive

- Better project structure
- Modern development workflow
- Strong ecosystem

Negative

- Slightly steeper learning curve compared to plain React.

---

# ADR-003

## Title

Use Express for the Backend

### Date

July 2026

### Context

The backend required a lightweight REST framework.

### Options Considered

- Express
- NestJS
- Fastify

### Decision

Use **Express**.

### Rationale

Express keeps the architecture explicit.

Instead of relying heavily on framework conventions, the project implements repository, service, and routing layers manually to better understand the underlying architecture.

### Consequences

Positive

- Simple
- Flexible
- Educational
- Industry proven

Negative

- More boilerplate than opinionated frameworks.

---

# ADR-004

## Title

Use PostgreSQL with Prisma

### Date

July 2026

### Context

LifeOS requires a relational database capable of supporting future growth.

### Options Considered

- PostgreSQL
- SQLite
- Firebase

### Decision

Use **PostgreSQL** with **Prisma ORM**.

### Rationale

PostgreSQL provides a robust relational database suitable for complex applications.

Prisma offers:

- Type safety
- Strong developer experience
- Schema management
- Automatic client generation

### Consequences

Positive

- Reliable database
- Excellent TypeScript support
- Easy schema evolution

Negative

- Slightly more setup than lightweight databases.

---

# ADR-005

## Title

Use REST APIs

### Date

July 2026

### Context

The frontend and backend required a communication protocol.

### Options Considered

- REST
- GraphQL
- tRPC

### Decision

Use **REST**.

### Rationale

REST provides:

- Simplicity
- Industry familiarity
- Technology independence
- Easy mobile application support

Using REST keeps the backend reusable by future clients such as React Native.

### Consequences

Positive

- Platform independent
- Easy to debug
- Well understood

Negative

- Slightly more boilerplate than tRPC.

---

# ADR-006

## Title

Use Zod for Shared Validation

### Date

July 2026

### Context

Request validation was required at the HTTP boundary.

### Options Considered

- Manual validation
- Joi
- Zod

### Decision

Use **Zod**.

### Rationale

Zod provides:

- Runtime validation
- TypeScript type inference
- Shared contracts between frontend and backend

This eliminates duplication while improving type safety.

### Consequences

Positive

- Strong API contracts
- Better error messages
- Reduced duplication

Negative

- Additional dependency.

---

# ADR-007

## Title

Use npm Workspaces

### Date

July 2026

### Context

LifeOS consists of multiple applications and shared packages.

### Options Considered

- Multiple repositories
- Monorepo
- pnpm
- npm Workspaces

### Decision

Use **npm Workspaces**.

### Rationale

npm Workspaces allow:

- Shared dependencies
- Shared packages
- Single repository
- Simple tooling

without introducing additional package managers.

### Consequences

Positive

- Easier dependency management
- Simpler development workflow
- Better code sharing

Negative

- Developers must understand workspace concepts.

---

# ADR-008

## Title

Layered Architecture

### Date

July 2026

### Context

Business logic needed to remain independent from infrastructure.

### Decision

Every request follows:

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

### Rationale

Separating responsibilities makes the code easier to understand, test, and maintain.

### Consequences

Positive

- Cleaner code
- Better separation of concerns
- Easier testing

Negative

- More files for small features.

---

# ADR-009

## Title

Repository Owns Database Access

### Date

July 2026

### Context

Without clear ownership, Prisma usage could spread throughout the codebase.

### Decision

Repositories are the **only** layer allowed to communicate directly with Prisma.

### Rationale

This isolates database access and prevents business logic from becoming tightly coupled to the ORM.

### Consequences

Positive

- Cleaner architecture
- Easier maintenance
- Better abstraction

Negative

- Additional abstraction layer.

---

# Future Decisions

This document will continue to grow as important architectural decisions are made.

Examples include:

- Authentication strategy
- Authorization model
- Module loader
- Dashboard extension system
- Notifications
- Background jobs
- Docker Compose
- AWS deployment
- CI/CD pipeline
- Mobile architecture

---

# Summary

Architectural decisions are intentionally documented so that future contributors understand the reasoning behind the project.

Whenever a significant technical decision affects the long-term direction of LifeOS, a new Architecture Decision Record (ADR) should be added to this document.
