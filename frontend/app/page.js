'use client';

import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks from backend
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  // Add new task
  const addTask = async () => {
    if(!newTask.trim()) return;
    const res = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask }),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
    setNewTask('');
  };

  // Toggle complete
  const toggleComplete =  async (id, completed) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !completed } : t)));
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      <div className="flex mb-6">
        <input
          className="border p-2 rounded-l-md w-64 outline-none"
          placeholder="Enter new task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2 w-80">
        {tasks.map(task => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-white p-3 rounded-md shadow"
          >
            <span
              onClick={() => toggleComplete(task.id, task.completed)}
              className={`cursor-pointer ${
                task.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
