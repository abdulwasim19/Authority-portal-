import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth.js';

export function Unauthorized() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="center-page">
      <div className="code">403 &middot; UNAUTHORIZED</div>
      <h1>You don't have access to this view</h1>
      <p>
        Your account role (<b>{user ? user.role : 'guest'}</b>) is not permitted to view the
        Authority Portal. This decision is enforced by the backend (M3) &mdash; the frontend
        route only reflects it, it doesn't decide it.
      </p>
      <button
        className="btn-primary"
        style={{ width: 'auto', padding: '10px 20px' }}
        onClick={() => { logout(); navigate('/login'); }}
      >
        Back to login
      </button>
    </div>
  );
}
