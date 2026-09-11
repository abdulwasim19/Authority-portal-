import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/authority/cases', label: 'Review case queue' },
  { to: '/authority/analytics', label: 'Open analytics' },
  { to: '/authority/reports', label: 'View reports' },
];

export function QuickNavigation() {
  return (
    <div className="panel">
      <h2>Quick Navigation</h2>
      <p className="panel-sub">Jump to a section</p>
      <div className="quicknav">
        {LINKS.map((l) => (
          <Link to={l.to} key={l.to}>
            <span>{l.label}</span>
            <span className="arrow">&rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
