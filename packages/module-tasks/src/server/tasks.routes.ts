import { Router } from 'express';
import { listTasks, addTask } from './tasks.service.ts';
import { createTaskSchema } from '../shared/tasks.schema.ts';

export const tasksRouter = Router();

tasksRouter.get('/', async (req, res) => {
  const tasks = await listTasks();
  res.json(tasks);
});

tasksRouter.post('/', async (req, res) => {
  // Validate the incoming request body at runtime — this is the actual
  // HTTP boundary, so we can't trust the shape of req.body just because
  // TypeScript compiled cleanly.
  const result = createTaskSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() });
    return;
  }

  const task = await addTask(result.data);
  res.status(201).json(task);
});
