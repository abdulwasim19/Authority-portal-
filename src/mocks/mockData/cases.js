// Deterministic mock case data, standing in for M3's database until the
// real Cases API is ready. Delete this whole mocks/ folder once real
// endpoints are wired in — nothing outside mocks/ should import from here
// directly; always go through mocks/handlers.js.

const RISK = ['High', 'Medium', 'Low'];
const PRIORITY = ['Critical', 'High', 'Moderate', 'Low']; // intentionally independent of RISK — never derive one from the other
const SAFETY = ['Safety Elevated', 'Standard', 'Low Risk'];
const STATUS = ['Pending', 'Active', 'Follow-up', 'Escalated', 'Resolved'];
const COUNSELLORS = ['Dr. Meera Iyer', 'Counsellor A', 'Counsellor B', 'Unassigned'];
const SIGNAL_POOL = ['Fear elevated', 'Threat indicated', 'Distress moderate', 'Distress high', 'Support gap', 'Safety elevated', 'Isolation indicated'];

function seedRand(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
const rnd = seedRand(42);
function pick(arr) {
  return arr[Math.floor(rnd() * arr.length)];
}
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}
export function fmtDate(d) {
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
export function relTime(d) {
  const diffMs = Date.now() - d.getTime();
  const h = Math.floor(diffMs / 3.6e6);
  if (h < 1) return 'moments ago';
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function buildCases(count = 46) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const risk = pick(RISK);
    const priority = pick(PRIORITY);
    const status = pick(STATUS);
    const created = daysAgo(2 + Math.floor(rnd() * 40));
    const updated = daysAgo(Math.floor(rnd() * 5));
    const interventionProgress =
      status === 'Pending' ? 0 : status === 'Active' ? Math.floor(30 + rnd() * 50) : status === 'Follow-up' || status === 'Resolved' ? 100 : 0;
    const followUpProgress = status === 'Resolved' ? 100 : status === 'Follow-up' ? Math.floor(20 + rnd() * 60) : 0;

    const timeline = [
      { date: fmtDate(created), label: 'Assessment submitted' },
      { date: fmtDate(daysAgo(Math.max(0, Math.floor((Date.now() - created) / 8.64e7) - 1))), label: 'Risk result generated (AI-assisted)' },
      { date: fmtDate(daysAgo(Math.max(0, Math.floor((Date.now() - created) / 8.64e7) - 2))), label: 'Case created & assignment routed' },
      ...(interventionProgress > 0 ? [{ date: fmtDate(updated), label: 'Intervention in progress' }] : []),
      ...(followUpProgress > 0 ? [{ date: fmtDate(updated), label: 'Follow-up recorded' }] : []),
    ].sort((a, b) => new Date(a.date) - new Date(b.date));

    const signalCount = 1 + Math.floor(rnd() * 3);
    const signals = Array.from(new Set(Array.from({ length: signalCount }, () => pick(SIGNAL_POOL))));
    const signalScores = {
      Threat: Math.round(30 + rnd() * 60),
      Fear: Math.round(30 + rnd() * 60),
      Distress: Math.round(30 + rnd() * 60),
      'Support Gap': Math.round(30 + rnd() * 60),
    };

    out.push({
      id: `RC-${1000 + i}`,
      risk,
      priority,
      safety: pick(SAFETY),
      status,
      confidence: Math.round(45 + rnd() * 50), // AI confidence %, backend-provided
      signals,
      signalScores,
      counsellor: pick(COUNSELLORS),
      createdAt: created,
      updatedAt: updated,
      assessmentProgress: 100,
      interventionProgress,
      followUpProgress,
      timeline,
    });
  }
  return out;
}

export const RISK_LEVELS = RISK;
export const PRIORITY_LEVELS = PRIORITY;
export const SAFETY_LEVELS = SAFETY;
export const STATUS_VALUES = STATUS;
export const mockCases = buildCases();
