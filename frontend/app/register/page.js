'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE, setToken } from '../lib/api';

export default function RegisterPage() {
	const router = useRouter();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		setError('');
		setLoading(true);
		try {
			const res = await fetch(`${API_BASE}/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password }),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data?.message || 'Registration failed');
			if (data?.token) setToken(data.token);
			router.replace('/dashboard');
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
				<div className="text-center mb-6">
					<div className="text-4xl mb-2">📋</div>
					<h1 className="text-2xl font-bold text-gray-800">Create your account</h1>
					<p className="text-gray-500 text-sm">Join Task Manager</p>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Jane Doe"
							className="w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							className="w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							className="w-full rounded-lg border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							required
						/>
					</div>
					{error && (
						<p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-2">{error}</p>
					)}
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold rounded-lg py-2.5 transition-colors"
					>
						{loading ? 'Creating account…' : 'Create account'}
					</button>
				</form>
				<p className="text-center text-sm text-gray-600 mt-4">
					Already have an account?{' '}
					<a href="/login" className="text-indigo-600 hover:underline">Sign in</a>
				</p>
			</div>
		</main>
	);
}
