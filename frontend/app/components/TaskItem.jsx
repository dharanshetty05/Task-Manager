'use client';

import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';

export default function TaskItem({ task, onToggleComplete, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={() => onToggleComplete(task._id, task.completed)}
          className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 active:scale-95 ${
            task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {task.completed && <Check size={14} className="md:w-4 md:h-4 text-white" />}
        </button>
        <span
          className={`flex-1 text-sm md:text-base text-gray-800 break-words ${
            task.completed
              ? 'line-through text-gray-400 opacity-60'
              : ''
          }`}
        >
          {task.title}
        </span>
        <button
          onClick={() => onDelete(task._id)}
          className="flex-shrink-0 p-1.5 md:p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 active:scale-95"
          aria-label="Delete task"
        >
          <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
        </button>
      </div>
    </motion.div>
  );
}

