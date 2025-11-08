'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import EmptyState from '../components/EmptyState';
import { authFetch, getToken } from '../lib/api';

export default function DashboardPage() {
	const [filter, setFilter] = useState('All');
	const router = useRouter();
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [sortOption, setSortOption] = useState('Newest');
	const [showCompleted, setShowCompleted] = useState('All');

	useEffect(() => {
		const token = getToken();
		if (!token) {
			router.replace('/login');
			return;
		}
		fetchTasks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function fetchTasks() {
		setLoading(true);
		setError('');
		try {
			const res = await authFetch('/tasks', { method: 'GET' });
			if (res.status === 401) {
				router.replace('/login');
				return;
			}
			const data = await res.json();
			setTasks(Array.isArray(data) ? data : []);
		} catch (e) {
			setError('Failed to load tasks.');
		} finally {
			setLoading(false);
		}
	}

	async function addTask({ title, category, priority, dueDate, notes }) {
		if (!title.trim()) return;
		setSubmitting(true);
		setError('');
		try {
			const res = await authFetch('/tasks', {
				method: 'POST',
				body: JSON.stringify({ title, category, priority, dueDate, notes })
			});
			if (!res.ok) throw new Error('Failed to create task');
			const data = await res.json();
			setTasks(prev => [...prev, data]);
			setNewTask('');
		} catch (e) {
			setError(e.message || 'Failed to create task');
		} finally {
			setSubmitting(false);
		}
	}

	async function toggleComplete(id, completed) {
		try {
			await authFetch(`/tasks/${id}`, {
				method: 'PUT',
				body: JSON.stringify({ completed: !completed })
			});
			setTasks(prev => prev.map(t => (t._id === id ? { ...t, completed: !completed } : t)));
		} catch (e) {
			setError('Failed to update task');
		}
	}

	async function updateTitle(id, title, category) {
		try {
			const bodyPayload = category ? { title, category } : { title };
			const res = await authFetch(`/tasks/${id}`, {
				method: 'PUT',
				body: JSON.stringify({ bodyPayload })
			});
			if (!res.ok)	throw new Error('Failed to update task');

			setTasks(prev => prev.map(t => (t._id === id ? { 
				...t, 
				title: title ?? t.title,
				...(category ? { category } : {})
				 } : t)));
		} catch (e) {
			setError('Failed to update task');
		}
	}

	async function deleteTask(id) {
		try {
			await authFetch(`/tasks/${id}`, { method: 'DELETE' });
			setTasks(prev => prev.filter(t => t._id !== id));
		} catch (e) {
			setError('Failed to delete task');
		}
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<main className="flex flex-col items-center px-4 py-6 md:px-6 md:py-10">
				<div className="w-full max-w-4xl">
					<Header />

					<div className="flex justify-center">
						<TaskInput newTask={newTask} setNewTask={setNewTask} onAddTask={addTask} />
					</div>

					{error && (
						<div className="w-full max-w-2xl mx-auto mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
							{error}
						</div>
					)}

					{loading ? (
						<div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">Loading tasks…</div>
					) : tasks.length === 0 ? (
						<EmptyState />
					) : (
						<>
							{/* Sorting and Completion Filter */}
							<div className='flex flex-wrap justify-center gap-3 mb-4'>
								{/* Sorting dropdown */}
								<select
									value={sortOption}
									onChange={(e) => setSortOption(e.target.value)}
									className='px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500'>
										<option value="Newest">🕒 Newest first</option>
										<option value="Oldest">Oldest first</option>
										<option value="DueSoon">📅 Due soonest</option>
										<option value="Priority">🔥 Priority (High first)</option>
								</select>

								{/* Completed / Pending Filter */}
								<select
									value={showCompleted}
									onChange={(e) => setShowCompleted(e.target.value)}
									className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500"
								>
									<option value="All">All Tasks</option>
									<option value="Pending">Pending Only</option>
									<option value="Completed">Completed Only</option>
								</select>
							</div>
							<div className="flex justify-center gap-3 mb-4">
								{['All', 'Work', 'Personal', 'Growth'].map((cat) => (
								<button
									key={cat}
									onClick={() => setFilter(cat)}
									className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
									filter === cat
										? 'bg-indigo-600 text-white border-indigo-600'
										: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
									}`}
								>
									{cat}
								</button>
								))}
							</div>

							<TaskList
								tasks={
								(() => {
									let visibleTasks =
									filter === 'All'
										? tasks
										: tasks.filter((t) => t.category === filter);

											// Filter by completion
											if (showCompleted === 'Pending') {
											visibleTasks = visibleTasks.filter((t) => !t.completed);
											} else if (showCompleted === 'Completed') {
											visibleTasks = visibleTasks.filter((t) => t.completed);
											}

											// Sort tasks
											if (sortOption === 'Newest') {
											visibleTasks.sort(
												(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
											);
											} else if (sortOption === 'Oldest') {
											visibleTasks.sort(
												(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
											);
											} else if (sortOption === 'DueSoon') {
											visibleTasks.sort((a, b) => {
												if (!a.dueDate) return 1;
												if (!b.dueDate) return -1;
												return new Date(a.dueDate) - new Date(b.dueDate);
											});
											} else if (sortOption === 'Priority') {
											const priorityRank = { High: 1, Medium: 2, Low: 3 };
											visibleTasks.sort(
												(a, b) =>
												(priorityRank[a.priority] || 4) - (priorityRank[b.priority] || 4)
											);
											}

											return visibleTasks;
										})()
								}
								onToggleComplete={toggleComplete}
								onDelete={deleteTask}
								onUpdateTitle={updateTitle}
							/>
						</>

					)}
				</div>
			</main>
		</div>
	);
}
