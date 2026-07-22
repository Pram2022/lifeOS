# LifeOS — Development Guide

## Introduction

This guide explains how to set up the LifeOS development environment on a new machine.

Following these steps will install all required software, configure the project, and start both the backend and frontend applications.

---

# Prerequisites

Before cloning the repository, install the following software.

## Required Software

| Software           | Purpose              |
| ------------------ | -------------------- |
| Node.js (LTS)      | JavaScript runtime   |
| npm                | Package manager      |
| Git                | Version control      |
| Docker Desktop     | PostgreSQL container |
| Visual Studio Code | Code editor          |

---

# Clone the Repository

Clone the project from GitHub.

```bash
git clone <repository-url>
```

Enter the project directory.

```bash
cd LifeOS
```

---

# Install Dependencies

Install all workspace dependencies from the project root.

```bash
npm install
```

This installs dependencies for every application and package in the workspace.

---

# Start PostgreSQL

LifeOS uses PostgreSQL running inside Docker.

Start the database container.

```bash
docker start lifeos-postgres
```

Verify the container is running.

```bash
docker ps
```

---

# Configure Environment Variables

The project currently uses an environment file located inside the **core-database** package.

```
packages/
└── core-database/
    └── .env
```

Example:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/lifeos"
```

> **Note:** The environment file may move to the project root in a future version.

---

# Generate Prisma Client

Navigate to the database package.

```bash
cd packages/core-database
```

Generate the Prisma Client.

```bash
npx prisma generate
```

Return to the project root.

```bash
cd ../..
```

---

# Apply Database Schema

Push the Prisma schema to PostgreSQL.

```bash
npx prisma db push
```

If the schema already exists, Prisma will update it.

---

# Run the Backend

From the project root:

```bash
npm run dev --workspace=apps/api
```

The Express API should start successfully.

Default address:

```
http://localhost:3001
```

---

# Run the Frontend

Open a second terminal.

From the project root:

```bash
npm run dev --workspace=apps/web
```

The Next.js application will start.

Default address:

```
http://localhost:3000
```

---

# Verify the Installation

Open the browser.

```
http://localhost:3000
```

Navigate to:

```
/tasks
```

You should be able to:

- View tasks
- Create tasks
- Store tasks in PostgreSQL

If these actions work correctly, the development environment has been successfully configured.

---

# Project Scripts

## Install Dependencies

```bash
npm install
```

---

## Run Backend

```bash
npm run dev --workspace=apps/api
```

---

## Run Frontend

```bash
npm run dev --workspace=apps/web
```

---

## Build Backend

```bash
npm run build --workspace=apps/api
```

---

## Build Frontend

```bash
npm run build --workspace=apps/web
```

---

## Format Code

```bash
npm run format
```

---

# Development Workflow

A typical development workflow is:

1. Pull the latest changes.
2. Start the PostgreSQL container.
3. Start the backend.
4. Start the frontend.
5. Implement a feature.
6. Test the application.
7. Commit changes.
8. Push to GitHub.

---

# Troubleshooting

## Backend won't start

Check:

- PostgreSQL container is running.
- DATABASE_URL is correct.
- Prisma Client has been generated.

---

## Database connection failed

Verify:

- Docker is running.
- PostgreSQL container exists.
- Correct port is being used.

---

## Prisma errors

Regenerate the Prisma Client.

```bash
npx prisma generate
```

If necessary, push the schema again.

```bash
npx prisma db push
```

---

## Frontend cannot reach API

Verify:

- Backend is running.
- API is listening on port 3001.
- CORS is configured correctly.
- Frontend is using the correct API URL.

---

## TypeScript errors

Ensure dependencies are installed.

```bash
npm install
```

If required, rebuild the affected workspace.

---

# Development Principles

While contributing to LifeOS:

- Keep applications lightweight.
- Place business logic inside feature modules.
- Maintain strict module boundaries.
- Follow the layered architecture.
- Validate API requests using Zod.
- Avoid unnecessary complexity.
- Write clean, readable code.

---

# Summary

Following this guide will produce a fully functional local development environment with:

- PostgreSQL
- Prisma
- Express API
- Next.js frontend
- npm Workspaces
- Docker

Once configured, new feature modules can be developed and integrated into the platform using the project's established architecture.
