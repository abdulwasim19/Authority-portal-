import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth.js';

const FEATURES = [
  { cls: 'a', icon: '\u25D4', title: 'Oversight Signals', sub: 'System-wide risk and priority view' },
  { cls: 'b', icon: '\u2630', title: 'Case Oversight', sub: 'Authorized progress, not raw records' },
  { cls: 'c', icon: '\u25A4', title: 'Aggregate Analytics', sub: 'Approved backend data only' },
  { cls: 'd', icon: '\u2665', title: 'Real Impact', sub: 'Safer people, stronger communities' },
];

export function Login() {
  const { login, authLoading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const user = await login(username, password);
      navigate(user.role === 'authority' ? '/authority/dashboard' : '/unauthorized');
    } catch (err) {
      setError(err.message || 'Login failed.');
    }
  }

  return (
    <div className="login-shell">
      <div className="login-hero">
        <div className="brand-row">
          <div className="brand-mark">RH</div>
          <div>
            <div className="brand-name">RAAHAT AI</div>
            <div className="brand-tag">Authority Workspace</div>
          </div>
        </div>
        <h1>Better Oversight.
          <br />Safer Tomorrows.</h1>
        <p className="lede">
          Authorized system-wide oversight for RAAHAT authorities &mdash; review case
          progress, monitor priority work, and act only on backend-approved data.
        </p>
        <div className="feature-row">
          {FEATURES.map((f) => (
            <div className="feature" key={f.title}>
              <div className={`ico ${f.cls}`}>{f.icon}</div>
              <div className="ftitle">{f.title}</div>
              <div className="fsub">{f.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="login-panel">
        <div className="login-card">
          <div className="eyebrow">Welcome back</div>
          <h2>Authority Login</h2>
          <p className="sub">Access system-wide oversight, priority review and analytics.</p>

          {error && <div className="login-err">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="u">Username</label>
              <input id="u" type="text" autoComplete="username" placeholder="authority1"
                value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="p">Password</label>
              <input id="p" type="password" autoComplete="current-password" placeholder="********"
                value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="btn-primary" type="submit" disabled={authLoading}>
              {authLoading ? 'Signing in\u2026' : 'Sign In'}
            </button>
          </form>

          <div className="login-hint">
            Demo accounts (RBAC testing) &mdash; password <b>raahat</b> for all:<br />
            <b>authority1</b> &mdash; Authority (has access)<br />
            <b>victim1</b> &mdash; Victim (blocked)<br />
            <b>counsellor1</b> &mdash; Counsellor (blocked)
          </div>
        </div>
      </div>
    </div>
  );
}
