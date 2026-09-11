import React from 'react';

export function ReportTable({ rows }) {
  return (
    <div className="table-wrap">
      <table className="report">
        <thead>
          <tr><th>Period</th><th>Total</th><th>Resolved</th><th>High Risk</th><th>Avg. Resolution</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.period}>
              <td>{r.period}</td><td>{r.total}</td><td>{r.resolved}</td><td>{r.highRisk}</td><td>{r.avgResolutionDays}d</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
