import React, { createContext, useMemo, useState, useCallback } from 'react';
import { login as loginRequest } from '../../features/auth/services/authApi.js';

// Session is kept in memory only for this MVP pass (no localStorage/cookies
// yet) — a page refresh logs the user out. Real persistence (httpOnly
// session cookie vs token storage) should be decided with M3/M1 before
// this goes further, per the project's "no sensitive data in browser
// storage" security baseline.
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { username, role, name, title }
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const login = useCallback(async (username, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const data = await loginRequest(username, password);
      setUser(data);
      return data;
    } catch (err) {
      setAuthError(err.message || 'Login failed.');
      throw err;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, authLoading, authError, login, logout }),
    [user, authLoading, authError, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
