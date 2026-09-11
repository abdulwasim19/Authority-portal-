import React from 'react';

export function CaseTimelineView({ timeline }) {
  if (!timeline || timeline.length === 0) return <div className="empty-state">No timeline events yet.</div>;
  return (
    <div className="timeline">
      {timeline.map((t, i) => (
        <div className="timeline-item" key={i}>
          <div className="tdate">{t.date}</div>
          <div className="tlabel">{t.label}</div>
        </div>
      ))}
    </div>
  );
}
