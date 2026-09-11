import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth.js';

const NAV_ITEMS = [
  { to: '/authority/dashboard', label: 'Dashboard', icon: '\u25A6' },
  { to: '/authority/cases', label: 'Cases', icon: '\u2630' },
  { to: '/authority/analytics', label: 'Analytics', icon: '\u25D4' },
  { to: '/authority/reports', label: 'Reports', icon: '\u25A4' },
];

function initials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function AuthoritySidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="brand-row">
        <div className="brand-mark">RH</div>
        <div className="brand-name">RAAHAT AI</div>
      </div>
      <div className="brand-tag">Authority Workspace</div>

      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
      <a href="#" className="nav-item mobile-logout" onClick={(e) => { e.preventDefault(); logout(); }}>
        &#8617; Log out
      </a>

      <div className="nav-spacer" />

      <div className="sidebar-foot">
        <div className="secure-chip">Secure reviewer environment</div>
        <div className="profile-row">
          <div className="avatar">{initials(user.name)}</div>
          <div>
            <div className="pname">{user.name}</div>
            <div className="prole">{user.title || user.role}</div>
          </div>
        </div>
        <button className="logout-btn" onClick={logout}>
          &#8617; Log out
        </button>
      </div>
    </aside>
  );
}
