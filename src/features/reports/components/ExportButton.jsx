import React from 'react';

function toCsv(rows) {
  const header = 'Period,Total,Resolved,High Risk,Avg Resolution (days)\n';
  const body = rows.map((r) => [r.period, r.total, r.resolved, r.highRisk, r.avgResolutionDays].join(',')).join('\n');
  return header + body;
}

// Export UI only. The real export/audit pipeline and any sensitive-field
// filtering happens on M3's backend in production — this demo exports
// only the already-authorized summary shown on screen.
export function ExportButton({ rows }) {
  function handleExport() {
    const blob = new Blob([toCsv(rows)], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'raahat-authority-report.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
  return <button className="export-btn" onClick={handleExport}>Export CSV</button>;
}
