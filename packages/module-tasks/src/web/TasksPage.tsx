'use client';

import { useEffect, useState } from 'react';

type Task = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | null;
};

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  // Load the current task list once, when the component first mounts.
  // NOTE: the API URL is hardcoded for now — a real config/env story for
  // this is a known simplification, not a permanent decision.
  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data as Task[]));
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const res = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const newTask = (await res.json()) as Task;
    setTasks((current) => [...current, newTask]);
    setTitle('');
  }

  return (
    <div>
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
