'use client';

import { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './tasksApi.js';
import { TaskItem } from './TaskItem.js';
import type { Priority, Task } from '../shared/tasks.schema.js';

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .finally(() => setIsLoading(false));
  }, []);

  // Every mutating action goes through this: clears any previous error,
  // runs the action, and if it throws (tasksApi throws real Errors on
  // failed requests), shows the message instead of crashing the page.
  async function withErrorHandling(action: () => Promise<void>) {
    setError(null);
    try {
      await action();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await withErrorHandling(async () => {
      const newTask = await createTask({ title });
      setTasks((current) => [...current, newTask]);
      setTitle('');
    });
  }

  async function handleUpdate(
    id: number,
    changes: Partial<{
      completed: boolean;
      priority: Priority | null;
      dueDate: string | null;
    }>,
  ) {
    await withErrorHandling(async () => {
      const updated = await updateTask(id, changes);
      setTasks((current) => current.map((t) => (t.id === id ? updated : t)));
    });
  }

  async function handleToggle(id: number) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    handleUpdate(id, { completed: !task.completed });
  }

  async function handleDelete(id: number) {
    await withErrorHandling(async () => {
      await deleteTask(id);
      setTasks((current) => current.filter((t) => t.id !== id));
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tasks</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title"
          className="flex-1 rounded border border-zinc-300 px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
        >
          Add
        </button>
      </form>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {isLoading ? (
        <p className="mt-6 text-zinc-500">Loading tasks…</p>
      ) : tasks.length === 0 ? (
        <p className="mt-6 text-zinc-500">
          No tasks yet. Add one above to get started.
        </p>
      ) : (
        <ul className="mt-6">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
