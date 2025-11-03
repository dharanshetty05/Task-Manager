'use client';

import { motion } from 'framer-motion';
import { Check, Trash2, Pencil, X } from 'lucide-react';
import { useState } from 'react';

export default function TaskItem({ task, onToggleComplete, onDelete, onUpdateTitle }) {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(task.title);
	const canSave = title.trim() && title.trim() !== task.title;

	function startEdit() {
		setTitle(task.title);
		setIsEditing(true);
	}

	function cancelEdit() {
		setTitle(task.title);
		setIsEditing(false);
	}

	async function saveEdit() {
		if (!canSave) {
			setIsEditing(false);
			return;
		}
		await onUpdateTitle(task._id, title.trim());
		setIsEditing(false);
	}

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

				{isEditing ? (
					<input
						autoFocus
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') saveEdit();
							if (e.key === 'Escape') cancelEdit();
						}}
						onBlur={saveEdit}
						className="flex-1 text-sm md:text-base text-gray-800 border border-gray-200 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
					/>
				) : (
					<span
						className={`flex-1 text-sm md:text-base text-gray-800 break-words ${
							task.completed
								? 'line-through text-gray-400 opacity-60'
								: ''
						}`}
					>
						{task.title}
					</span>
				)}

				{!isEditing ? (
					<button
						onClick={startEdit}
						className="flex-shrink-0 p-1.5 md:p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200 active:scale-95"
						aria-label="Edit task"
					>
						<Pencil size={16} className="md:w-[18px] md:h-[18px]" />
					</button>
				) : (
					<div className="flex items-center gap-1">
						<button
							onClick={saveEdit}
							disabled={!canSave}
							className="flex-shrink-0 p-1.5 md:p-2 text-green-600 disabled:text-gray-300 hover:bg-green-50 rounded-lg transition-colors duration-200 active:scale-95"
							aria-label="Save task"
						>
							<Check size={16} />
						</button>
						<button
							onClick={cancelEdit}
							className="flex-shrink-0 p-1.5 md:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 active:scale-95"
							aria-label="Cancel edit"
						>
							<X size={16} />
						</button>
					</div>
				)}

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

