# LifeOS — Project Overview

## Introduction

LifeOS is a personal productivity platform designed to help users organize every aspect of their life from a single application. Instead of relying on multiple disconnected tools for tasks, notes, calendars, goals, habits, and projects, LifeOS brings everything together into one modular system.

The project is being developed as a real-world software engineering project with a strong focus on clean architecture, scalability, maintainability, and professional development practices. Every architectural decision is made deliberately to simulate the standards used in modern software engineering teams.

---

# Project Vision

The vision of LifeOS is to create a flexible platform that grows with its users.

Rather than building a collection of independent pages, LifeOS is designed as a platform where new modules can be added without changing the application's core architecture. Each feature is developed as an independent module with clearly defined boundaries while sharing common infrastructure provided by the platform.

The long-term goal is to support both web and mobile applications using the same backend API.

---

# Objectives

The primary objectives of the project are:

- Build a maintainable, scalable productivity platform.
- Learn professional full-stack software engineering.
- Apply software architecture principles in a real project.
- Create a portfolio-quality application.
- Gain practical experience with modern web technologies.
- Establish a reusable architecture for future modules.

---

# Planned Features

LifeOS is designed to support multiple independent modules, including:

- Dashboard
- Tasks
- Calendar
- Notes
- Goals
- Habits
- Projects
- Journal
- Finance
- Learning Tracker
- Health Tracker
- Notifications
- User Settings

Additional modules can be added in the future without modifying the platform architecture.

---

# Technology Stack

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Backend

- Node.js
- Express
- TypeScript
- REST API

## Database

- PostgreSQL
- Prisma ORM

## Validation

- Zod

## Development Tools

- Docker
- npm Workspaces
- Git
- GitHub
- Visual Studio Code

---

# High-Level Architecture

LifeOS follows a **Modular Monolith Architecture**.

The application is deployed as a single system while internally separating each feature into its own module with strict architectural boundaries.

Each module contains its own:

- Server layer
- Web layer
- Shared contracts
- Business logic
- Data access

Shared infrastructure such as authentication, database access, configuration, UI components, and application shell are owned by the Core Platform.

This approach provides the simplicity of a monolith while maintaining the modularity and maintainability typically associated with larger systems.

---

# Current Project Status

Completed:

- Project architecture designed
- Monorepo established
- Express backend configured
- Next.js frontend configured
- PostgreSQL database running
- Prisma ORM integrated
- Shared database package created
- First feature module (Tasks) implemented
- End-to-end communication verified between frontend, backend, and database

Upcoming:

- Module loader
- Navigation registration
- Dashboard widgets
- Calendar module
- Notes module
- Goals module
- Authentication
- Mobile application

---

# Project Goals

This project is intended to demonstrate practical experience with:

- Software Architecture
- Full-Stack Development
- REST API Design
- Database Design
- Modular Application Design
- TypeScript
- React
- Next.js
- Express
- PostgreSQL
- Prisma
- Docker
- Git
- Professional Software Engineering Practices

---

# Repository Structure

```text
LifeOS/
├── apps/
│   ├── api/
│   └── web/
│
├── packages/
│   ├── core-config/
│   ├── core-database/
│   ├── core-types/
│   └── module-*/
│
├── docs/
│
└── README.md
```

---

# Guiding Principles

The project is guided by the following principles:

- Keep architecture simple but scalable.
- Maintain strict module boundaries.
- Build reusable components.
- Prefer clarity over cleverness.
- Document important architectural decisions.
- Build production-quality software while continuously learning.

---

# Document Purpose

This document provides a high-level overview of the LifeOS project. Detailed information about the architecture, module design, database, API standards, development workflow, and coding conventions can be found in the remaining documents within the `/docs` directory.
