import { apiClient } from '../../../services/apiClient.js';
import { mockGetCases } from '../../../mocks/handlers.js';

export async function getCases(role, filters) {
  if (apiClient.USE_MOCKS) return mockGetCases(role, filters);

  // Real contract (confirm with M3):
  // GET /authority/cases?q=&status=&priority=&safety=&page=&pageSize=
  // -> { rows: [{id, priority, safety, signals, confidence, status, counsellor, updatedAt}], totalItems, totalPages, page }
  const params = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '' && v != null))
  );
  return apiClient.request(`/authority/cases?${params.toString()}`);
}
