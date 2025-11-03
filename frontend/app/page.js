'use client';

import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import EmptyState from "./components/EmptyState";

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
    console.log("Add button clicked");
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
    setTasks(tasks.map(t => (t._id === id ? { ...t, completed: !completed } : t)));
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-6 md:px-6 md:py-10">
      <div className="w-full max-w-4xl">
        <Header />
        
        <div className="flex justify-center">
          <TaskInput 
            newTask={newTask}
            setNewTask={setNewTask}
            onAddTask={addTask}
          />
        </div>

        <div className="flex justify-center">
          {tasks.length === 0 ? (
            <EmptyState />
          ) : (
            <TaskList 
              tasks={tasks}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
            />
          )}
        </div>
      </div>
    </main>
  );
}
