// Central API client. Every feature service (authApi.js, casesApi.js,
// analyticsApi.js, ...) goes through this file — never calls fetch()
// directly. That keeps auth headers, base URL, and error shape in one
// place, matching the pattern used by M4 and M5.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';
const USE_MOCKS = String(import.meta.env.VITE_USE_MOCKS) !== 'false';

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Real request path. Wired up now so switching VITE_USE_MOCKS=false is a
// one-line change once M3's contract is confirmed — no component changes
// needed, because components only ever talk to the feature *Api.js files.
async function request(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    // no body / non-JSON response
  }

  if (!res.ok) {
    throw new ApiError(res.status, payload?.message || `Request failed (${res.status})`);
  }
  return payload;
}

export const apiClient = { request, ApiError, USE_MOCKS };
