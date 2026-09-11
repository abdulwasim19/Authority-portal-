import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../auth/hooks/useAuth.js';
import { getReports } from '../services/reportsApi.js';

export function useReports() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await getReports(user.role);
      setData(res);
      setStatus('ready');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, [user.role]);

  useEffect(() => { load(); }, [load]);

  return { data, status, error, reload: load };
}
