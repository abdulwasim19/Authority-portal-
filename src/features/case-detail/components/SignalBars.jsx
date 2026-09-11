import React from 'react';

// Read-only view of AI support signals for oversight context. This is
// deliberately NOT the Counsellor's "Human Review / Submit Review" workspace
// (that belongs to M5) — Authority sees the same signals for context but
// takes no case-level action here.
const HINTS = {
  Threat: 'Specific threat indicators present',
  Fear: 'Elevated fear response',
  Distress: 'Moderate-to-high distress',
  'Support Gap': 'Limited external support identified',
};

export function SignalBars({ signals }) {
  if (!signals) return null;
  return (
    <div>
      {Object.entries(signals).map(([label, value]) => (
        <div className="signal-block" key={label}>
          <div className="sh"><span>{label}</span><span>{value}</span></div>
          <div className="shint">{HINTS[label] || ''}</div>
          <div className="signal-bar"><div className="signal-fill" style={{ width: `${value}%` }} /></div>
        </div>
      ))}
    </div>
  );
}
