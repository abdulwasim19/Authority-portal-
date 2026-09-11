// Pre-aggregated mock data. This is the important part to imitate faithfully:
// in the real system, M3 computes these numbers server-side from
// authorized data. The frontend (M6) must NEVER derive these from raw
// case records client-side — that's the whole point of this file existing
// separately from mockData/cases.js.

import { mockCases, RISK_LEVELS, PRIORITY_LEVELS, STATUS_VALUES, relTime } from './cases.js';

function count(pred) {
  return mockCases.filter(pred).length;
}

export function buildDashboard() {
  const needsAttention = mockCases
    .filter((c) => c.priority === 'Critical' || c.priority === 'High' || c.status === 'Follow-up' || c.status === 'Escalated')
    .sort((a, b) => b.updatedAt - a.updatedAt);

  return {
    criticalCases: count((c) => c.priority === 'Critical'),
    highPriorityCases: count((c) => c.priority === 'High'),
    moderateCases: count((c) => c.priority === 'Moderate'),
    followUpCases: count((c) => c.status === 'Follow-up'),
    totalCases: mockCases.length,
    resolvedCases: count((c) => c.status === 'Resolved'),
    needsAttentionCount: needsAttention.length,
    spotlight: needsAttention[0]
      ? {
          id: needsAttention[0].id,
          priority: needsAttention[0].priority,
          safety: needsAttention[0].safety,
          signals: needsAttention[0].signals,
          confidence: needsAttention[0].confidence,
          status: needsAttention[0].status,
        }
      : null,
    priorityQueue: needsAttention.slice(0, 6).map((c) => ({
      id: c.id,
      priority: c.priority,
      safety: c.safety,
      signals: c.signals,
      confidence: c.confidence,
      status: c.status,
      counsellor: c.counsellor,
      updatedAt: relTime(c.updatedAt),
    })),
    recentActivity: mockCases
      .slice()
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, 6)
      .map((c) => ({ text: `${c.id} moved to "${c.status}"`, time: relTime(c.updatedAt) })),
  };
}

function distribution(field, levels) {
  const out = {};
  levels.forEach((k) => (out[k] = 0));
  mockCases.forEach((c) => {
    out[c[field]]++;
  });
  return out;
}

function seedRand(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
function trend(base, seed) {
  const rnd = seedRand(seed);
  let v = base;
  return ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'].map((label) => {
    v = Math.max(0, v + Math.round((rnd() - 0.45) * 6));
    return { label, value: v };
  });
}

export function buildAnalytics() {
  return {
    riskDistribution: distribution('risk', RISK_LEVELS),
    statusDistribution: distribution('status', STATUS_VALUES),
    priorityDistribution: distribution('priority', PRIORITY_LEVELS),
    riskTrend: trend(10, 7),
    assessmentTrend: trend(8, 11),
    interventionTrend: trend(6, 13),
    followUpTrend: trend(5, 17),
  };
}

export function buildReports() {
  const dash = buildDashboard();
  const risk = distribution('risk', RISK_LEVELS);
  return {
    rows: [
      { period: 'Last 7 days', total: 12, resolved: 4, highRisk: 3, avgResolutionDays: 4.2 },
      { period: 'Last 30 days', total: dash.totalCases, resolved: dash.resolvedCases, highRisk: risk.High, avgResolutionDays: 5.6 },
    ],
  };
}
