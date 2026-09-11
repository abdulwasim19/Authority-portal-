import React from 'react';

export function ErrorState({ message, onRetry }) {
  return (
    <div className="panel">
      <h2>Something went wrong</h2>
      <p className="panel-sub">{message || 'The request failed. Please try again.'}</p>
      {onRetry && (
        <button className="btn-secondary" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
