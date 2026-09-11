import React from 'react';

export function LoadingState({ label = 'Loading\u2026' }) {
  return (
    <div className="panel">
      <div className="skeleton skeleton--title" />
      <div className="skeleton skeleton--body" />
      <div className="loading-label">{label}</div>
    </div>
  );
}
