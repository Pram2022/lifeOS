import {
  createTask,
  findAllTasks,
  findTaskById,
  updateTask,
    deleteTask,
} from './tasks.repository.js';
import type { Priority } from 'core-database';
import type { CreateTaskRequest, UpdateTaskRequest } from '../shared/tasks.schema.js';

// The service layer holds business logic that goes beyond simple data
// access. There isn't any real business logic for Tasks yet — these
// functions just delegate to the repository — and that's fine. Rules get
// added here as they're actually needed. What matters today is that
// routes only ever call this layer, never the repository directly.

export async function listTasks() {
  return findAllTasks();
}


export async function addTask(input: CreateTaskRequest) {
  return createTask(input);
}
export class TaskNotFoundError extends Error {
  constructor(id: number) {
    super(`Task ${id} not found`);
    this.name = 'TaskNotFoundError';
  }
}

export async function updateTaskById(id: number, input: UpdateTaskRequest) {
  const existing = await findTaskById(id);
  if (!existing) {
    throw new TaskNotFoundError(id);
  }
  return updateTask(id, input);
}
export async function deleteTaskById(id: number) {
  const existing = await findTaskById(id);
  if (!existing) {
    throw new TaskNotFoundError(id);
  }
  return deleteTask(id);
}
