import React from 'react';

const COLOR_MAP = {
  High: 'var(--critical)', Critical: 'var(--critical)',
  Medium: 'var(--high)', Moderate: 'var(--high)',
  Low: 'var(--low)',
  Pending: 'var(--high)', Active: '#3D5A80', 'Follow-up': 'var(--brand)', Escalated: 'var(--critical)', Resolved: 'var(--low)',
};

export function DistributionBars({ dist }) {
  const max = Math.max(1, ...Object.values(dist));
  return (
    <div>
      {Object.entries(dist).map(([k, v]) => (
        <div className="bar-row" key={k}>
          <div className="bl">{k}</div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(v / max) * 100}%`, background: COLOR_MAP[k] || 'var(--brand)' }} />
          </div>
          <div className="bv">{v}</div>
        </div>
      ))}
    </div>
  );
}
