# LifeOS — Folder Structure

## Introduction

LifeOS is organized as a **monorepo** using **npm Workspaces**. This allows multiple applications and shared packages to live inside a single repository while remaining logically separated.

The project is divided into three main areas:

- **apps/** – Deployable applications.
- **packages/** – Shared infrastructure and feature modules.
- **docs/** – Project documentation.

This structure promotes code reuse, clear ownership, and maintainability as the project grows.

---

# Current Repository Structure

```text
LifeOS/
│
├── apps/
│   ├── api/
│   └── web/
│
├── docs/
│
├── packages/
│   ├── core-database/
│   └── module-tasks/
│
├── node_modules/
│
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
├── .prettierrc
└── .prettierignore
```

---

# apps/

The **apps** directory contains the deployable applications.

Applications are responsible for presenting the user interface or exposing backend services. They consume functionality provided by packages but do not contain feature-specific business logic.

Current applications are:

- API
- Web

Future applications may include:

- Mobile application
- Background worker
- Admin portal

---

# apps/api

The API application provides the backend for LifeOS.

Responsibilities include:

- Starting the Express server.
- Registering feature module routes.
- Configuring middleware.
- Handling HTTP requests.
- Exposing the REST API.

The API acts as the entry point to the backend while delegating business logic to feature modules.

---

# apps/web

The web application is built using **Next.js**.

Responsibilities include:

- Rendering the user interface.
- Client-side routing.
- Calling the REST API.
- Displaying data returned by feature modules.

The web application should remain lightweight, with feature logic implemented inside modules whenever possible.

---

# docs/

The **docs** folder contains all project documentation.

Current documents include:

- Project Overview
- Architecture
- Folder Structure
- Development Guide
- Module Development Guide
- Database
- API Standards
- Coding Standards
- Decision Log
- Roadmap
- Known Issues

Documentation evolves alongside the project and serves as a reference for future development.

---

# packages/

The **packages** directory contains reusable code shared across the entire project.

Packages are divided into two categories:

- Core packages
- Feature modules

---

# core-database

The `core-database` package provides the shared database infrastructure.

Current responsibilities include:

- Prisma configuration.
- Prisma schema.
- Database connection.
- PrismaClient singleton.

Current structure:

```text
core-database/
│
├── prisma/
├── src/
├── dist/
├── package.json
└── tsconfig.json
```

This package contains no business logic and is shared by all feature modules.

---

# module-tasks

The Tasks module is the first complete feature module.

It owns everything related to task management, including:

- Task business logic.
- Database operations.
- API routes.
- User interface.
- Validation schemas.

Current structure:

```text
module-tasks/
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

---

# src/server

The backend implementation of the module.

Current responsibilities include:

- Repository
- Service
- Routes

Each file has a single responsibility.

### Repository

Responsible for all database communication.

Only repositories interact directly with Prisma.

### Service

Contains business logic.

Routes call services instead of directly accessing repositories.

### Routes

Handle HTTP requests and responses.

Routes validate incoming requests before delegating work to the service layer.

---

# src/shared

Contains code shared between the frontend and backend.

Current responsibilities include:

- Zod schemas.
- Shared request types.
- Shared response types.

The shared folder acts as the single source of truth for API contracts.

---

# src/web

Contains the frontend implementation for the module.

Current contents include:

- TasksPage.tsx
- index.ts

Responsibilities include:

- Rendering the UI.
- Fetching data from the REST API.
- Handling user interactions.

---

# Root Files

## package.json

Defines:

- npm Workspaces.
- Shared scripts.
- Root dependencies.

---

## package-lock.json

Locks dependency versions to ensure every developer installs the same package versions.

---

## README.md

Provides an overview of the project and acts as the entry point for the repository.

---

## .gitignore

Specifies files and folders excluded from Git.

Examples include:

- node_modules
- dist
- environment files

---

## .prettierrc

Defines project-wide formatting rules.

---

## .prettierignore

Specifies files that should not be formatted automatically.

---

# Dependency Direction

The project follows a one-way dependency flow.

```text
Applications
      │
      ▼
Feature Modules
      │
      ▼
Core Packages
```

This keeps dependencies predictable and avoids circular references.

Feature modules should never depend on applications, and applications should remain thin by delegating business logic to modules.

---

# Future Growth

As LifeOS grows, new feature modules will be added alongside the existing Tasks module.

Examples include:

```text
packages/
├── core-database/
├── module-tasks/
├── module-calendar/
├── module-notes/
├── module-goals/
├── module-habits/
└── module-projects/
```

The existing folder structure is designed so new modules can be added without reorganizing the repository.

---

# Summary

The LifeOS repository is intentionally organized into deployable applications, shared infrastructure, and independent feature modules.

This structure keeps responsibilities clearly separated, makes the codebase easier to navigate, and provides a scalable foundation for future development.
