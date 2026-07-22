import { z } from 'zod';

// The single source of truth for what a "create a task" request must look
// like. The route uses this to validate incoming JSON at runtime; the type
// below is derived from the same schema, so there's no duplication between
// what's validated and what's typed.
export const createTaskSchema = z.object({
  title: z.string().min(1),
  dueDate: z.coerce.date().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
});
// Partial update — every field is optional (PATCH semantics). dueDate and
// priority additionally accept `null` explicitly, to distinguish "leave
// this field alone" (omitted) from "clear this field" (null) from "set it"
// (a real value).
export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  completed: z.boolean().optional(),
  dueDate: z.coerce.date().nullable().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).nullable().optional(),
});
// The shape of a Task as returned by the API — the frontend's view of the
// resource. Defined independently of the Prisma model (which the frontend
// must never depend on directly), even though the shapes currently match.
export type Task = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | null;
  createdAt: string;
  updatedAt: string;
};


export type UpdateTaskRequest = z.infer<typeof updateTaskSchema>;


export type CreateTaskRequest = z.infer<typeof createTaskSchema>;
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

