import { prisma } from 'core-database';
import type { CreateTaskRequest } from '../shared/tasks.schema.ts';

export async function findAllTasks() {
  return prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createTask(input: CreateTaskRequest) {
  return prisma.task.create({
    data: {
      title: input.title,
      ...(input.dueDate !== undefined && { dueDate: input.dueDate }),
      ...(input.priority !== undefined && { priority: input.priority }),
    },
  });
}
