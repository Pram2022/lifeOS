'use client';

import type { Priority, Task } from '../shared/tasks.schema.js';

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onUpdate: (
    id: number,
    changes: { priority?: Priority | null; dueDate?: string | null },
  ) => void;
  onDelete: (id: number) => void;
};

export function TaskItem({
  task,
  onToggle,
  onUpdate,
  onDelete,
}: TaskItemProps) {
  function handleDeleteClick() {
    const confirmed = window.confirm(
      `Delete "${task.title}"? This cannot be undone.`,
    );
    if (confirmed) {
      onDelete(task.id);
    }
  }

  return (
    <li className="flex items-center gap-3 border-b border-zinc-200 py-3">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="h-4 w-4"
      />
      <span
        className={`flex-1 ${task.completed ? 'text-zinc-400 line-through' : ''}`}
      >
        {task.title}
      </span>
      <select
        value={task.priority ?? ''}
        onChange={(e) =>
          onUpdate(task.id, {
            priority:
              e.target.value === '' ? null : (e.target.value as Priority),
          })
        }
        className="rounded border border-zinc-300 px-2 py-1 text-sm"
      >
        <option value="">No priority</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <input
        type="date"
        value={task.dueDate ? task.dueDate.slice(0, 10) : ''}
        onChange={(e) =>
          onUpdate(task.id, {
            dueDate: e.target.value === '' ? null : e.target.value,
          })
        }
        className="rounded border border-zinc-300 px-2 py-1 text-sm"
      />
      <button
        onClick={handleDeleteClick}
        className="text-sm text-red-600 hover:underline"
      >
        Delete
      </button>
    </li>
  );
}
