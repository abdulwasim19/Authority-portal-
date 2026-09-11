import React from 'react';

export function MetricCard({ label, value, sub }) {
  return (
    <div className="metric-card">
      <div className="m-label">{label}</div>
      <div className="m-value">{value}</div>
      <div className="m-delta">{sub}</div>
    </div>
  );
}
