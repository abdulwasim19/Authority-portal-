import { apiClient } from '../../../services/apiClient.js';
import { mockGetAnalytics } from '../../../mocks/handlers.js';

export async function getAnalytics(role) {
  if (apiClient.USE_MOCKS) return mockGetAnalytics(role);

  // Real contract (confirm with M3):
  // GET /authority/analytics -> pre-aggregated distributions + trends only.
  // Never fetch raw case records here and compute stats client-side.
  return apiClient.request('/authority/analytics');
}
