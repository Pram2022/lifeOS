import { prisma } from 'core-database';
import type { CreateTaskRequest, UpdateTaskRequest } from '../shared/tasks.schema.js';


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
export async function findTaskById(id: number) {
  return prisma.task.findUnique({ where: { id } });
}

export async function updateTask(id: number, input: UpdateTaskRequest) {
  return prisma.task.update({
    where: { id },
    data: {
      ...(input.title !== undefined && { title: input.title }),
      ...(input.completed !== undefined && { completed: input.completed }),
      ...(input.dueDate !== undefined && { dueDate: input.dueDate }),
      ...(input.priority !== undefined && { priority: input.priority }),
    },
  });
}
export async function deleteTask(id: number) {
  return prisma.task.delete({ where: { id } });
}

