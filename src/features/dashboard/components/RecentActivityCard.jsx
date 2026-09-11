import React from 'react';

export function RecentActivityCard({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="panel">
        <h2>Recent Activity</h2>
        <div className="empty-state">No recent activity.</div>
      </div>
    );
  }
  return (
    <div className="panel">
      <h2>Recent Activity</h2>
      <p className="panel-sub">Latest status changes across authorized cases</p>
      {items.map((a, i) => (
        <div className="activity-row" key={i}>
          <span className="txt">{a.text}</span>
          <span className="time">{a.time}</span>
        </div>
      ))}
    </div>
  );
}
