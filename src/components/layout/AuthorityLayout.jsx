import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthoritySidebar } from './AuthoritySidebar.jsx';
import { useAuth } from '../../features/auth/hooks/useAuth.js';

function todayLabel() {
  return new Date().toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
}

export function AuthorityLayout() {
  const { user } = useAuth();
  return (
    <div className="shell">
      <AuthoritySidebar />
      <main className="main">
        <div className="topbar">
          <div className="topbar-greet">
            <div className="g-avatar">&#128100;</div>
            <div>
              <h1>Good morning, {user?.name?.split(' ')[0] || 'Authority'}</h1>
              <div className="g-sub">Oversight view — authorized cases only</div>
            </div>
          </div>
          <div className="topbar-meta">
            <div className="env-badge">Secure authority environment</div>
            <div>Today &middot; {todayLabel()}</div>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
