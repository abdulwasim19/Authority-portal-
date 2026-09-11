import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '../../auth/hooks/useAuth.js';
import { getCases } from '../services/casesApi.js';

const DEFAULT_FILTERS = { q: '', status: '', priority: '', safety: '', pill: '', page: 1, pageSize: 8 };

export function useCases() {
  const { user } = useAuth();
  const [filters, setFiltersState] = useState(DEFAULT_FILTERS);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const load = useCallback(async (f) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await getCases(user.role, f);
      setResult(res);
      setStatus('ready');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, [user.role]);

  useEffect(() => {
    load(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const setFilters = useCallback((patch) => {
    setFiltersState((prev) => ({ ...prev, ...patch, page: patch.page ?? 1 }));
  }, []);

  const setPage = useCallback((page) => {
    setFiltersState((prev) => ({ ...prev, page }));
  }, []);

  return useMemo(
    () => ({ filters, setFilters, setPage, result, status, error, reload: () => load(filters) }),
    [filters, setFilters, setPage, result, status, error, load]
  );
}
