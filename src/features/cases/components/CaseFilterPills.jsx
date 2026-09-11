import React from 'react';

const PILLS = [
  { key: '', label: 'All cases' },
  { key: 'needs-review', label: 'Needs review' },
  { key: 'critical', label: 'Critical' },
  { key: 'high-priority', label: 'High priority' },
  { key: 'safety-elevated', label: 'Safety elevated' },
  { key: 'follow-up', label: 'Follow-up required' },
  { key: 'resolved', label: 'Resolved' },
];

export function CaseFilterPills({ active, onChange }) {
  return (
    <div className="pill-row">
      {PILLS.map((p) => (
        <button
          key={p.key || 'all'}
          className={`pill${active === p.key ? ' active' : ''}`}
          onClick={() => onChange(p.key)}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
