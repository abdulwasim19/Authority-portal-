import { apiClient } from '../../../services/apiClient.js';
import { mockLogin } from '../../../mocks/handlers.js';

export async function login(username, password) {
  if (apiClient.USE_MOCKS) return mockLogin(username, password);

  // Real contract (confirm exact route/shape with M3):
  // POST /auth/login { username, password } -> { username, role, name, title, token }
  return apiClient.request('/auth/login', { method: 'POST', body: { username, password } });
}
