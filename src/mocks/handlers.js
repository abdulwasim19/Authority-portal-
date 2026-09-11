import { apiClient } from '../services/apiClient.js';
import { mockUsers } from './mockData/auth.js';
import { mockCases, relTime } from './mockData/cases.js';
import { buildDashboard, buildAnalytics, buildReports } from './mockData/aggregates.js';

const NET_DELAY = 260;

function ok(data) {
  return new Promise((resolve) => setTimeout(() => resolve(data), NET_DELAY));
}
function fail(status, message) {
  return new Promise((_, reject) => setTimeout(() => reject(new apiClient.ApiError(status, message)), NET_DELAY));
}

export function mockLogin(username, password) {
  const u = mockUsers[username];
  if (!u || u.password !== password) return fail(401, 'Invalid username or password.');
  return ok({ username, role: u.role, name: u.name, title: u.title });
}

export function mockGetDashboard(role) {
  if (role !== 'authority') return fail(403, 'Not authorized for the authority dashboard.');
  return ok(buildDashboard());
}

const PILL_FILTERS = {
  'needs-review': (c) => c.status === 'Pending' || c.status === 'Active',
  critical: (c) => c.priority === 'Critical',
  'high-priority': (c) => c.priority === 'High',
  'safety-elevated': (c) => c.safety === 'Safety Elevated',
  'follow-up': (c) => c.status === 'Follow-up',
  resolved: (c) => c.status === 'Resolved',
};

export function mockGetCases(role, { q = '', status = '', priority = '', safety = '', pill = '', page = 1, pageSize = 8 } = {}) {
  if (role !== 'authority') return fail(403, 'Not authorized.');
  let rows = mockCases;
  if (q) rows = rows.filter((c) => c.id.toLowerCase().includes(q.toLowerCase()));
  if (status) rows = rows.filter((c) => c.status === status);
  if (priority) rows = rows.filter((c) => c.priority === priority);
  if (safety) rows = rows.filter((c) => c.safety === safety);
  if (pill && PILL_FILTERS[pill]) rows = rows.filter(PILL_FILTERS[pill]);

  const totalItems = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const start = (page - 1) * pageSize;
  const pageRows = rows.slice(start, start + pageSize).map((c) => ({
    id: c.id,
    priority: c.priority,
    safety: c.safety,
    signals: c.signals,
    confidence: c.confidence,
    status: c.status,
    counsellor: c.counsellor,
    updatedAt: relTime(c.updatedAt),
  }));
  return ok({ rows: pageRows, totalItems, totalPages, page });
}

export function mockGetCaseDetail(role, id) {
  if (role !== 'authority') return fail(403, 'Not authorized.');
  const c = mockCases.find((x) => x.id === id);
  if (!c) return fail(404, 'Case not found or not within your authorized scope.');
  return ok({
    id: c.id,
    risk: c.risk,
    priority: c.priority,
    safety: c.safety,
    confidence: c.confidence,
    signals: c.signals,
    signalScores: c.signalScores,
    status: c.status,
    counsellor: c.counsellor,
    createdAt: c.createdAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    updatedAt: relTime(c.updatedAt),
    assessmentProgress: c.assessmentProgress,
    interventionProgress: c.interventionProgress,
    followUpProgress: c.followUpProgress,
    timeline: c.timeline,
  });
}

export function mockGetAnalytics(role) {
  if (role !== 'authority') return fail(403, 'Not authorized.');
  return ok(buildAnalytics());
}

export function mockGetReports(role) {
  if (role !== 'authority') return fail(403, 'Not authorized.');
  return ok(buildReports());
}
