import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../auth/hooks/useAuth.js';
import { getCaseDetail } from '../services/caseDetailApi.js';

export function useCaseDetail(id) {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await getCaseDetail(user.role, id);
      setData(res);
      setStatus('ready');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, [user.role, id]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, status, error, reload: load };
}
