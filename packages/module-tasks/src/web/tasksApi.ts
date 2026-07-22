import type { Task } from '../shared/tasks.schema.js';

// Hardcoded for local development — see docs/11-Known-Issues.md
// ("API Configuration") for the plan to make this environment-specific.
const API_BASE = 'http://localhost:3001';

// Every API call goes through this: confirms the response actually
// succeeded, and turns a failed request into a real thrown Error carrying
// the server's actual message (matching the { error: { message } } shape
// every route returns), instead of letting callers accidentally treat an
// error body as real data.
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message ?? 'Something went wrong');
  }
  if (res.status === 204) {
    return undefined as T;
  }
  return res.json();
}

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE}/tasks`);
  return handleResponse(res);
}

export async function createTask(input: {
  title: string;
  dueDate?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return handleResponse(res);
}

export async function updateTask(
  id: number,
  input: Partial<{
    title: string;
    completed: boolean;
    dueDate: string | null;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | null;
  }>,
): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return handleResponse(res);
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
  return handleResponse(res);
}
