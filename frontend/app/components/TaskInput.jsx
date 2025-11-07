'use client';

import { Option, Plus } from 'lucide-react';
import { useActionState, useState } from 'react';

const CATEGORIES = ['Work', 'Personal', 'Growth'];
const PRIORITIES = ['Low', 'Medium', 'High'];

export default function TaskInput({ newTask, setNewTask, onAddTask }) {
  const [category, setCategory] = useState('Personal');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newTask.trim()) return;
    
    onAddTask({ 
      title: newTask, category, priority, dueDate: dueDate || null, notes: notes.trim(),
    });
    setCategory('Personal');
    setPriority('Medium');
    setDueDate('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-8 space-y-3 bg-white rounded-xl shadow-md border border-gray-100 p-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          className="flex-1 px-3 md:px-4 py-3 text-gray-700 placeholder-gray-400 outline-none text-sm md:text-base border border-gray-200 rounded-lg"
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

        <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)} className='sm:w-32 px-3 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500'>
              {PRIORITIES.map((p) => (
                <option key={p} value="{p}">
                  {p}
                </option>
              ))}
          </select>
      </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} className='sm:w-1/3 px-3 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500' />

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className='flex-1 px-3 py-3 text-sm text-gray-700 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 resize-none'
            rows={2}
          />          
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
        >
          <Plus size={18} className="md:w-5 md:h-5" />
          <span className="hidden sm:inline">Add Task</span>
          <span className="sm:hidden">Add</span>
        </button>
    </form>
  );
}

