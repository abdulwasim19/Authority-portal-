import React from 'react';
import { useCases } from '../../features/cases/hooks/useCases.js';
import { CaseFilterPills } from '../../features/cases/components/CaseFilterPills.jsx';
import { CaseToolbar } from '../../features/cases/components/CaseToolbar.jsx';
import { CaseTable } from '../../features/cases/components/CaseTable.jsx';
import { Pagination } from '../../features/cases/components/Pagination.jsx';
import { LoadingState } from '../../components/feedback/LoadingState.jsx';
import { ApiErrorView } from '../../components/feedback/ApiErrorView.jsx';

export function AuthorityCases() {
  const { filters, setFilters, setPage, result, status, error, reload } = useCases();

  return (
    <div>
      <div className="page-eyebrow">Case Management</div>
      <h1 className="page-title">Cases</h1>
      <p className="page-sub">Review and oversee authorized cases.</p>

      <CaseFilterPills active={filters.pill} onChange={(pill) => setFilters({ pill })} />
      <CaseToolbar filters={filters} setFilters={setFilters} />

      {status === 'loading' && <LoadingState label="Loading cases\u2026" />}
      {status === 'error' && <ApiErrorView error={error} onRetry={reload} />}
      {status === 'ready' && result && (
        <>
          <CaseTable rows={result.rows} />
          {result.rows.length > 0 && (
            <Pagination page={result.page} totalPages={result.totalPages} totalItems={result.totalItems} onPage={setPage} />
          )}
        </>
      )}
    </div>
  );
}
