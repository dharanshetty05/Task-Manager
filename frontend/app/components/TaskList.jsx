'use client';

import { AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggleComplete, onDelete, onUpdateTitle }) {
	return (
		<div className="w-full max-w-2xl">
			<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 md:p-4 lg:p-6">
				<div className="max-h-[60vh] overflow-y-auto pr-1 md:pr-2 space-y-2 md:space-y-3 custom-scrollbar">
					<AnimatePresence mode="popLayout">
						{tasks.map((task) => (
							<TaskItem
								key={task._id}
								task={task}
								onToggleComplete={onToggleComplete}
								onDelete={onDelete}
								onUpdateTitle={onUpdateTitle}
							/>
						))}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}

