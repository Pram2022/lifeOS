import { createTask, findAllTasks } from './tasks.repository.js';
import type { Priority } from 'core-database';
import type { CreateTaskRequest } from '../shared/tasks.schema.ts';


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
