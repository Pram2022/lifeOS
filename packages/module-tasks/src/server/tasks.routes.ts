import { Router } from 'express';
import { createTaskSchema, updateTaskSchema } from '../shared/tasks.schema.js';
import { listTasks, addTask, updateTaskById, deleteTaskById, TaskNotFoundError } from './tasks.service.js';

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
    res.status(422).json({ error: { message: 'Invalid task data' } });
    return;
  }

  const task = await addTask(result.data);
  res.status(201).json(task);
});

tasksRouter.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: { message: 'Task id must be a number' } });
    return;
  }

  const result = updateTaskSchema.safeParse(req.body);
  if (!result.success) {
    res.status(422).json({ error: { message: 'Invalid task data' } });
    return;
  }

  try {
    const task = await updateTaskById(id, result.data);
    res.json(task);
  } catch (err) {
    if (err instanceof TaskNotFoundError) {
      res.status(404).json({ error: { message: err.message } });
      return;
    }
    throw err;
  }
});
tasksRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: { message: 'Task id must be a number' } });
    return;
  }

  try {
    await deleteTaskById(id);
    res.status(204).send();
  } catch (err) {
    if (err instanceof TaskNotFoundError) {
      res.status(404).json({ error: { message: err.message } });
      return;
    }
    throw err;
  }
});

