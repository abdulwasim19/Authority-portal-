import React from 'react';
import { KpiCard } from './KpiCard.jsx';

export function FollowUpCasesCard({ value }) {
  return <KpiCard tone="followup" icon="\u2665" label="Follow-up Required" value={value} sub="Needs continued support" />;
}
