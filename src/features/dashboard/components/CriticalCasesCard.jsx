import React from 'react';
import { KpiCard } from './KpiCard.jsx';

export function CriticalCasesCard({ value }) {
  return <KpiCard tone="critical" icon="\u26A0" label="Critical" value={value} sub="Requires immediate attention" />;
}
