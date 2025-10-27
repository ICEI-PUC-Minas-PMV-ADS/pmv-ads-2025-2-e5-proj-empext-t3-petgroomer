// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

function getAccessToken() {
  return typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : null;
}
function setAccessToken(token: string) {
  if (typeof window !== 'undefined') sessionStorage.setItem('access_token', token);
}

export async function apiFetch<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAccessToken();
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include', // necessário pro cookie httpOnly (refresh)
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status !== 401) {
    if (!res.ok) throw await normalizeErr(res);
    return res.json();
  }

  // 401: tenta refresh
  const refreshed = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!refreshed.ok) throw await normalizeErr(refreshed);
  const data = await refreshed.json();
  if (data?.access) setAccessToken(data.access);

  // tenta novamente a chamada original
  const retry = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      Authorization: `Bearer ${data.access}`,
    },
  });
  if (!retry.ok) throw await normalizeErr(retry);
  return retry.json();
}

async function normalizeErr(res: Response) {
  let body: any = {};
  try { body = await res.json(); } catch {}
  const msg = Array.isArray(body?.message) ? body.message[0] : body?.message || res.statusText;
  return new Error(msg);
}

export async function apiLogout() {
  await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
    window.dispatchEvent(new Event('auth:changed'));
    try { new BroadcastChannel('auth').postMessage('ok'); } catch {}
  }
}
