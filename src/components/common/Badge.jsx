import React from 'react';

const PRIORITY_CLASS = { Critical: 'tag-critical', High: 'tag-high', Moderate: 'tag-moderate', Low: 'tag-low' };
const SAFETY_CLASS = { 'Safety Elevated': 'tag-safety-elevated', Standard: 'tag-safety-standard', 'Low Risk': 'tag-safety-low' };
const STATUS_CLASS = { 'Follow-up': 'followup', Escalated: 'escalated', Resolved: 'resolved' };

export function PriorityTag({ value }) {
  return <span className={`tag ${PRIORITY_CLASS[value] || 'tag-moderate'}`}>{value}</span>;
}

export function SafetyTag({ value }) {
  return <span className={`tag ${SAFETY_CLASS[value] || 'tag-safety-standard'}`}>{value}</span>;
}

export function StatusPill({ value }) {
  const extra = STATUS_CLASS[value] || '';
  return <span className={`status-pill ${extra}`}>{value}</span>;
}

export function SignalChips({ signals }) {
  if (!signals || signals.length === 0) return null;
  return (
    <>
      {signals.map((s) => (
        <span className="signal-chip" key={s}>
          {s}
        </span>
      ))}
    </>
  );
}

export function ConfidenceBar({ value }) {
  const color = value >= 80 ? 'var(--critical)' : value >= 60 ? 'var(--high)' : 'var(--moderate)';
  return (
    <div className="confidence-cell">
      <div className="confidence-bar">
        <div className="confidence-fill" style={{ width: `${value}%`, background: color }} />
      </div>
      <span>{value}%</span>
    </div>
  );
}
