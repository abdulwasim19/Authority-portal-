import React from 'react';
import { KpiCard } from './KpiCard.jsx';

export function HighPriorityCasesCard({ value }) {
  return <KpiCard tone="high" icon="\u2691" label="High Priority" value={value} sub="Awaiting reviewer action" />;
}
