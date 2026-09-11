import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound({ message }) {
  return (
    <div className="center-page">
      <div className="code">404 &middot; NOT FOUND</div>
      <h1>Nothing here</h1>
      <p>{message || "This record doesn't exist, or isn't in your authorized scope."}</p>
      <Link to="/authority/dashboard" className="btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '10px 20px' }}>
        Back to dashboard
      </Link>
    </div>
  );
}
