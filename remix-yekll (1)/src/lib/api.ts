export const getStoredAuthToken = (): string | null => {
  try {
    return localStorage.getItem('ym_auth_token');
  } catch {
    return null;
  }
};

export const apiFetch = async (url: string, init?: RequestInit): Promise<Response> => {
  try {
    const token = getStoredAuthToken();
    const headers = new Headers(init?.headers || {});
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return await fetch(url, { ...init, headers });
  } catch (err) {
    console.warn('API fetch warning:', err);
    return new Response(JSON.stringify({ error: 'Error de conexión con el servidor.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
