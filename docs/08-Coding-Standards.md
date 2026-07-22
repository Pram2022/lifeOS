# LifeOS — Coding Standards

## Introduction

This document defines the coding standards used throughout the LifeOS project.

The goal is to create a codebase that is:

- Consistent
- Readable
- Maintainable
- Predictable
- Easy to review
- Easy to extend

These standards apply to every application, package, and feature module within the repository.

---

# Core Principles

When writing code, always prioritize:

- Readability over cleverness.
- Simplicity over complexity.
- Consistency over personal preference.
- Maintainability over short-term convenience.

Code is written primarily for people to read, not for computers to execute.

---

# General Guidelines

Always:

- Write descriptive names.
- Keep functions focused.
- Keep files small.
- Follow the established architecture.
- Remove unused code.
- Avoid duplication.
- Prefer composition over inheritance.
- Keep business logic separate from infrastructure.

---

# Naming Conventions

## Variables

Use camelCase.

Good:

```typescript
const taskTitle = 'Buy groceries';
const completedTasks = [];
```

Avoid:

```typescript
const TaskTitle = '';
const task_title = '';
```

---

## Functions

Use camelCase and name functions as actions.

Good:

```typescript
createTask();
updateTask();
deleteTask();
findAllTasks();
```

---

## Components

React components use PascalCase.

```text
TasksPage.tsx
TaskCard.tsx
Sidebar.tsx
Dashboard.tsx
```

---

## Types

Interfaces, types, and enums use PascalCase.

```typescript
interface Task {}

type TaskResponse = {};

enum Priority {}
```

---

## Constants

Use UPPER_SNAKE_CASE for application-wide constants.

```typescript
const MAX_TASKS = 100;
```

---

# File Naming

Use clear and consistent file names. Server-layer files are prefixed with the module name (e.g. `tasks.`), so a file's origin stays unambiguous in an editor tab or search result once many modules exist side by side.

Examples:

```text
tasks.repository.ts
tasks.service.ts
tasks.routes.ts
tasks.schema.ts
index.ts
TasksPage.tsx
```

Avoid vague names such as:

```text
helpers.ts
utils2.ts
temp.ts
misc.ts
```

Files should describe exactly what they contain.

---

# Folder Naming

Folders use lowercase.

Examples:

```text
server/
web/
shared/
components/
hooks/
```

---

# Function Design

Functions should have one responsibility.

Good:

```text
createTask()
```

Avoid:

```text
createTaskAndSendEmailAndUpdateDashboard()
```

If a function name becomes long, it probably has too many responsibilities.

---

# Function Size

Prefer small functions.

As a general guideline:

- 10–30 lines is ideal.
- Split large functions into smaller ones when they become difficult to understand.

---

# Comments

Write code that is self-explanatory whenever possible.

Use comments to explain:

- Why something is done.
- Architectural decisions.
- Complex algorithms.
- Temporary workarounds.

Avoid comments that simply repeat what the code already says.

Bad:

```typescript
// Increment i
i++;
```

Better:

```typescript
// Prevent duplicate processing when multiple requests arrive simultaneously.
```

---

# TypeScript

Always prefer explicit types where they improve readability.

Avoid using:

```typescript
any;
```

Instead use:

- interfaces
- types
- generics
- unions

Strong typing helps catch errors during development.

---

# Error Handling

Handle expected errors gracefully.

Do not ignore exceptions.

Prefer meaningful error messages over generic failures.

Example:

```text
Task not found.
```

Instead of:

```text
Unknown error.
```

---

# Async Code

Use async/await.

Preferred:

```typescript
const tasks = await repository.findAll();
```

Avoid unnecessary Promise chains.

```typescript
repository.findAll().then(...)
```

unless they provide a clear advantage.

---

# Layer Responsibilities

Every layer has one responsibility.

## Routes

Responsible for:

- HTTP requests
- Validation
- Responses

Should not contain business logic.

---

## Services

Responsible for:

- Business rules
- Application logic

Should not communicate directly with Prisma.

---

## Repositories

Responsible for:

- Database access

Repositories are the only layer allowed to use Prisma.

---

## Components

Responsible for:

- Rendering UI
- Handling user interaction

Business rules belong on the backend whenever appropriate.

---

# Module Boundaries

Feature modules must remain independent.

Do not import another module's internal files.

Allowed:

```
module-tasks
        │
        ▼
core-database
```

Not allowed:

```
module-tasks
        │
        ▼
module-calendar/server/repository.ts
```

Modules communicate only through their public interfaces.

---

# Imports

Group imports logically.

Example:

```typescript
// External libraries

import { Router } from 'express';

// Core packages

import { prisma } from 'core-database';

// Local files

import { taskService } from './service';
```

Keep imports organized and remove unused imports.

---

# Formatting

Formatting is handled automatically using Prettier.

Do not manually format code differently from the project standard.

Always format code before committing.

---

# Git Practices

Prefer small, focused commits.

Good:

```
Add Task repository
```

Better than:

```
Lots of changes
```

Each commit should represent one logical change.

---

# Documentation

Public functions and architectural decisions should be documented when appropriate.

When making significant architectural decisions, update the relevant documentation inside the `/docs` directory.

Documentation is considered part of the codebase.

---

# Code Reviews

When reviewing code, check for:

- Correctness
- Simplicity
- Readability
- Consistency
- Architecture compliance
- Naming
- Error handling
- Testability

Code reviews should improve the code, not simply approve changes.

---

# Development Philosophy

Before writing code, ask:

- Does this belong in this layer?
- Is there already a reusable solution?
- Can this be made simpler?
- Will another developer understand this in six months?
- Does it follow the existing architecture?

If the answer to any question is "no," reconsider the implementation.

---

# Summary

The LifeOS coding standards exist to keep the project consistent as it grows.

Following these standards helps maintain a clean architecture, reduces technical debt, and ensures that every feature module feels like a natural part of the same system rather than a collection of unrelated code.
