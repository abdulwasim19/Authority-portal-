import { apiClient } from '../../../services/apiClient.js';
import { mockGetCaseDetail } from '../../../mocks/handlers.js';

export async function getCaseDetail(role, id) {
  if (apiClient.USE_MOCKS) return mockGetCaseDetail(role, id);

  // Real contract (confirm with M3):
  // GET /authority/cases/:id -> full oversight record, 404 if out of scope
  return apiClient.request(`/authority/cases/${id}`);
}
