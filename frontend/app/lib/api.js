export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000/api';

export function getToken() {
	try {
		return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
	} catch {
		return null;
	}
}

export function setToken(token) {
	try {
		if (typeof window !== 'undefined') localStorage.setItem('token', token);
	} catch {}
}

export function clearToken() {
	try {
		if (typeof window !== 'undefined') localStorage.removeItem('token');
	} catch {}
}

export async function authFetch(path, options = {}) {
	const token = getToken();
	const headers = {
		'Content-Type': 'application/json',
		...(options.headers || {}),
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};
	const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
	return res;
}
