import { apiClient } from '../../../services/apiClient.js';
import { mockGetDashboard } from '../../../mocks/handlers.js';

export async function getDashboard(role) {
  if (apiClient.USE_MOCKS) return mockGetDashboard(role);

  // Real contract (confirm with M3):
  // GET /authority/dashboard -> { totalCases, activeCases, pendingCases,
  //   resolvedCases, priorityCases, recentActivity: [{text, time}] }
  return apiClient.request('/authority/dashboard');
}
