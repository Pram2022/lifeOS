# LifeOS — API Standards

## Introduction

LifeOS exposes its backend functionality through a REST API built with Express and TypeScript.

The API is designed to be:

- Simple
- Consistent
- Predictable
- Technology independent
- Reusable by both the web application and future mobile applications

Every feature module exposes its functionality through HTTP endpoints while following the standards described in this document.

---

# API Design Principles

The API follows these core principles:

- RESTful design
- Stateless communication
- JSON request and response bodies
- Consistent naming conventions
- Proper HTTP status codes
- Request validation using Zod
- Clear separation between transport and business logic

---

# Base URL

Development:

```
http://localhost:3001
```

Future production URLs will depend on the deployment environment.

---

# Resource Naming

Resources should always use plural nouns.

Good examples:

```
/tasks
/projects
/calendar
/notes
/goals
```

Avoid:

```
/task
/getTasks
/createTask
```

HTTP methods already describe the action.

---

# HTTP Methods

The API follows standard REST conventions.

| Method | Purpose                      |
| ------ | ---------------------------- |
| GET    | Retrieve data                |
| POST   | Create data                  |
| PUT    | Replace an existing resource |
| PATCH  | Partially update a resource  |
| DELETE | Delete a resource            |

---

# Example Endpoints

Retrieve all tasks

```
GET /tasks
```

Retrieve a specific task

```
GET /tasks/:id
```

Create a task

```
POST /tasks
```

Update a task

```
PATCH /tasks/:id
```

Delete a task

```
DELETE /tasks/:id
```

---

# Request Format

Request bodies should always use JSON.

Example:

```json
{
  "title": "Complete documentation",
  "priority": "HIGH"
}
```

---

# Response Format

Successful responses should also return JSON.

Example:

```json
{
  "id": 1,
  "title": "Complete documentation",
  "completed": false,
  "priority": "HIGH"
}
```

Responses should be predictable and easy for clients to consume.

---

# HTTP Status Codes

Use appropriate HTTP status codes.

| Status                    | Meaning                       |
| ------------------------- | ----------------------------- |
| 200 OK                    | Request successful            |
| 201 Created               | Resource created              |
| 204 No Content            | Resource deleted successfully |
| 400 Bad Request           | Invalid request               |
| 401 Unauthorized          | Authentication required       |
| 403 Forbidden             | Access denied                 |
| 404 Not Found             | Resource does not exist       |
| 409 Conflict              | Business rule conflict        |
| 422 Unprocessable Entity  | Validation failed             |
| 500 Internal Server Error | Unexpected server error       |

---

# Request Validation

Every incoming request should be validated before reaching business logic.

Validation is performed using Zod.

Benefits include:

- Runtime safety
- Better error messages
- Shared frontend/backend contracts
- Strong TypeScript types

Routes should never assume incoming data is valid.

---

# Error Responses

Errors should be returned in a consistent format.

Example:

```json
{
  "error": {
    "message": "Task title is required"
  }
}
```

Future versions may include additional fields such as:

- error code
- validation details
- request ID
- timestamp

---

# Route Responsibilities

Routes are responsible for:

- Receiving HTTP requests
- Validating input
- Calling the service layer
- Returning HTTP responses

Routes should **not** contain business logic.

---

# Service Responsibilities

Services are responsible for:

- Business rules
- Application logic
- Coordinating repositories
- Preparing data for responses

Services should not know anything about HTTP.

---

# Repository Responsibilities

Repositories are responsible for:

- Database queries
- Creating records
- Updating records
- Deleting records

Repositories are the only layer allowed to communicate with Prisma.

---

# API Versioning

The current API is unversioned.

Future versions may adopt a versioning strategy such as:

```
/api/v1/tasks
```

Versioning will be introduced only when necessary to avoid breaking existing clients.

---

# Authentication

Authentication has not yet been implemented.

Future endpoints may require:

```
Authorization: Bearer <JWT Token>
```

Authentication will be handled before requests reach feature modules.

---

# Pagination

Endpoints returning large collections should support pagination.

Example:

```
GET /tasks?page=1&limit=20
```

Future modules should follow the same pattern.

---

# Filtering

Collection endpoints may support filtering.

Example:

```
GET /tasks?completed=true
```

---

# Sorting

Sorting should use query parameters.

Example:

```
GET /tasks?sort=dueDate
```

---

# Searching

Search functionality should also use query parameters.

Example:

```
GET /tasks?search=documentation
```

---

# API Consistency

Every module should expose endpoints using the same conventions.

For example:

```
GET    /notes
POST   /notes

GET    /projects
POST   /projects

GET    /calendar
POST   /calendar
```

Developers should not have to learn a different API style for each module.

---

# Cross-Origin Resource Sharing (CORS)

During development, the API allows requests from the Next.js frontend.

Future production deployments should configure CORS more restrictively based on deployment requirements.

---

# Future Enhancements

As LifeOS evolves, the API may include:

- Authentication
- Authorization
- Rate limiting
- Request logging
- API documentation
- OpenAPI/Swagger
- File uploads
- WebSockets
- Background jobs

These features will be introduced without changing the overall API design philosophy.

---

# Summary

The LifeOS API follows a consistent REST architecture designed to be simple, predictable, and reusable.

By standardizing endpoint naming, HTTP methods, request validation, response formats, and layering, every feature module exposes an API that is easy to understand, maintain, and extend.
