import React from 'react';
import { CaseTable } from '../../cases/components/CaseTable.jsx';

export function PriorityQueue({ rows }) {
  return (
    <div className="panel">
      <h2>Priority Queue</h2>
      <p className="panel-sub">Cases requiring reviewer attention.</p>
      <CaseTable rows={rows} />
    </div>
  );
}
