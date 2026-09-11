import React from 'react';

export function ProgressBlock({ label, pct }) {
  return (
    <div className="progress-block">
      <div className="ph"><span>{label}</span><span>{pct}%</span></div>
      <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
    </div>
  );
}
