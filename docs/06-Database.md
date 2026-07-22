# LifeOS — Database Design

## Introduction

LifeOS uses **PostgreSQL** as its primary relational database and **Prisma ORM** as the data access layer.

The database is designed to support a modular architecture where each feature module owns its own data while sharing a single database instance.

This document describes the current database structure and the design principles that guide future development.

---

# Database Technology

| Technology    | Purpose                      |
| ------------- | ---------------------------- |
| PostgreSQL    | Relational database          |
| Prisma ORM    | Type-safe database access    |
| Prisma Client | Database client              |
| Docker        | Local PostgreSQL development |

---

# Database Architecture

LifeOS currently uses:

- One PostgreSQL database
- One Prisma schema
- One shared PrismaClient
- One database connection pool

Although every module shares the same physical database, each module owns its own tables through the repository layer.

---

# Current Schema

At the time of writing, the database contains a single feature module.

```
Task
```

Additional modules will introduce their own tables as the application grows.

---

# Task Table

The **Task** table stores user tasks.

| Column    | Type     | Nullable | Description       |
| --------- | -------- | -------- | ----------------- |
| id        | Integer  | No       | Primary key       |
| title     | String   | No       | Task title        |
| completed | Boolean  | No       | Completion status |
| dueDate   | DateTime | Yes      | Optional due date |
| priority  | Enum     | Yes      | Task priority     |

---

# Task Entity

```text
Task
──────────────────────────────
id : Int
title : String
completed : Boolean
dueDate : DateTime?
priority : Priority?
```

---

# Priority Enum

The Task module currently supports three priority levels.

| Value  |
| ------ |
| LOW    |
| MEDIUM |
| HIGH   |

The priority field is optional.

---

# Entity Relationship Diagram

Current database model:

```text
+---------------------------+
|          Task             |
+---------------------------+
| id           PK           |
| title                     |
| completed                 |
| dueDate                   |
| priority                  |
+---------------------------+
```

No relationships currently exist because only one entity has been implemented.

---

# Prisma Schema

The current Task model is defined in Prisma.

```prisma
enum Priority {
  LOW
  MEDIUM
  HIGH
}

model Task {
  id        Int       @id @default(autoincrement())
  title     String
  completed Boolean   @default(false)
  dueDate   DateTime?
  priority  Priority?
}
```

Future modules will extend this schema.

---

# Data Ownership

Each feature module owns its own database models.

For example:

```
Task Module
      │
      ▼
Task Table
```

Future modules will own their own tables in the same way.

Examples:

```
Calendar Module
      │
      ▼
CalendarEvent Table

Notes Module
      │
      ▼
Note Table
```

---

# Database Access Rules

Database access follows a strict layered architecture.

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
Prisma Client
   │
   ▼
PostgreSQL
```

Repositories are the only layer permitted to interact directly with Prisma.

Routes and services must never perform database queries.

---

# Prisma Client

LifeOS uses a shared singleton PrismaClient located inside the **core-database** package.

Benefits include:

- Single database connection pool.
- Consistent configuration.
- Reduced resource usage.
- Shared access across modules.

---

# Database Design Principles

The database is designed according to the following principles.

## Normalization

Data should be normalized to reduce duplication.

---

## Clear Ownership

Each table belongs to one module.

Modules should not directly manipulate another module's data.

---

## Type Safety

All database access is performed through Prisma, providing compile-time type checking.

---

## Scalability

The schema is designed to grow incrementally as new modules are added.

New tables should integrate cleanly without requiring changes to existing modules.

---

# Planned Future Tables

As development continues, additional tables are expected.

Examples include:

```
Task
CalendarEvent
Note
Goal
Habit
Project
ProjectTask
User
Notification
Setting
```

The exact schema will evolve as requirements become clearer.

---

# Migrations

Database changes should be managed through Prisma.

Common commands include:

Generate Prisma Client:

```bash
npx prisma generate
```

Push schema changes:

```bash
npx prisma db push
```

Future production environments may use Prisma Migrations instead of `db push`.

---

# Future Improvements

Planned enhancements include:

- User authentication
- Foreign key relationships
- Soft deletes
- Audit timestamps
- Index optimization
- Full-text search
- Database migrations
- Performance tuning

These improvements will be introduced as the application grows.

---

# Summary

LifeOS currently maintains a simple, well-structured database consisting of a single Task entity.

The architecture emphasizes clear ownership, type safety, and modularity. As additional feature modules are implemented, the database will expand while preserving these design principles.
