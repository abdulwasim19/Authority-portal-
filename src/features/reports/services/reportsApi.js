import { apiClient } from '../../../services/apiClient.js';
import { mockGetReports } from '../../../mocks/handlers.js';

export async function getReports(role) {
  if (apiClient.USE_MOCKS) return mockGetReports(role);

  // Real contract (confirm with M3):
  // GET /authority/reports -> authorized structured summary rows.
  // The real export/audit pipeline lives on the backend, not here.
  return apiClient.request('/authority/reports');
}
