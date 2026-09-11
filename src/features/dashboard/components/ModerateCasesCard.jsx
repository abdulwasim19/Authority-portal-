import React from 'react';
import { KpiCard } from './KpiCard.jsx';

export function ModerateCasesCard({ value }) {
  return <KpiCard tone="moderate" icon="\u25A4" label="Moderate" value={value} sub="Lower urgency" />;
}
