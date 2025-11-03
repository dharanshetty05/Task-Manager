'use client';

import { useRouter } from 'next/navigation';
import { clearToken, getToken } from '../lib/api';

export default function Navbar() {
	const router = useRouter();
	const isAuthed = typeof window !== 'undefined' && !!getToken();

	function handleLogout() {
		clearToken();
		router.replace('/login');
	}

	return (
		<nav className="w-full bg-white/80 backdrop-blur border-b border-gray-100">
			<div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
				<a href="/dashboard" className="flex items-center gap-2">
					<span className="text-xl">📋</span>
					<span className="font-semibold text-gray-800">Task Manager</span>
				</a>
				<div className="flex items-center gap-3">
					<a href="/dashboard" className="text-gray-700 hover:text-gray-900 text-sm">Dashboard</a>
					{isAuthed && (
						<button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700">Logout</button>
					)}
				</div>
			</div>
		</nav>
	);
}
