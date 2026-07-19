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

export type CreateTaskRequest = z.infer<typeof createTaskSchema>;