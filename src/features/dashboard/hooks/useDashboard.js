import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../auth/hooks/useAuth.js';
import { getDashboard } from '../services/dashboardApi.js';

export function useDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await getDashboard(user.role);
      setData(res);
      setStatus('ready');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, [user.role]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, status, error, reload: load };
}
