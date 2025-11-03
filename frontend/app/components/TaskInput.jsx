'use client';

import { Plus } from 'lucide-react';

export default function TaskInput({ newTask, setNewTask, onAddTask }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-8">
      <div className="flex gap-2 shadow-lg rounded-xl overflow-hidden bg-white">
        <input
          type="text"
          className="flex-1 px-3 md:px-4 py-3 text-gray-700 placeholder-gray-400 outline-none text-sm md:text-base"
          placeholder="Enter your next task…"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 md:px-6 py-3 font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center gap-1 md:gap-2 whitespace-nowrap active:scale-95"
        >
          <Plus size={18} className="md:w-5 md:h-5" />
          <span className="hidden sm:inline">Add Task</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </form>
  );
}

