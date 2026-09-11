import React from 'react';

// Shared visual primitive behind CriticalCasesCard / HighPriorityCasesCard /
// etc. Each named card is a thin wrapper so the component tree still
// matches the spec's file-per-metric structure, without duplicating markup.
export function KpiCard({ tone, icon, label, value, sub }) {
  return (
    <div className={`kpi-card tone-${tone}`}>
      <div className="kpi-top">
        <div className="kpi-icon">{icon}</div>
      </div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-sub">{sub}</div>
    </div>
  );
}
