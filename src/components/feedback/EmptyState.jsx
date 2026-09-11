import React from 'react';

export function EmptyState({ icon = '\u2014', title, hint }) {
  return (
    <div className="panel empty-state">
      <div className="empty-state__icon">{icon}</div>
      {title}
      {hint && <div className="empty-state__hint">{hint}</div>}
    </div>
  );
}
