'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

const CATEGORIES = ['Work', 'Personal', 'Growth'];

export default function TaskInput({ newTask, setNewTask, onAddTask }) {
  const [category, setCategory] = useState('Personal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newTask.trim()) return;
    onAddTask({ title: newTask, category });
    setCategory('Personal');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-8">
      <div className="flex flex-col sm:flex-row gap-2 shadow-lg rounded-xl overflow-hidden bg-white p-2 sm:p-0">
        <input
          type="text"
          className="flex-1 px-3 md:px-4 py-3 text-gray-700 placeholder-gray-400 outline-none text-sm md:text-base rounded-lg sm:rounded-none"
          placeholder="Enter your next task…"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="sm:w-40 px-3 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg sm:rounded-none outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 md:px-6 py-3 font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 rounded-lg sm:rounded-none active:scale-95"
        >
          <Plus size={18} className="md:w-5 md:h-5" />
          <span className="hidden sm:inline">Add Task</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </form>
  );
}

