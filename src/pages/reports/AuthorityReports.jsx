import React from 'react';
import { useReports } from '../../features/reports/hooks/useReports.js';
import { ReportTable } from '../../features/reports/components/ReportTable.jsx';
import { ExportButton } from '../../features/reports/components/ExportButton.jsx';
import { LoadingState } from '../../components/feedback/LoadingState.jsx';
import { ApiErrorView } from '../../components/feedback/ApiErrorView.jsx';

export function AuthorityReports() {
  const { data, status, error, reload } = useReports();

  if (status === 'loading') return <LoadingState label="Loading report summary\u2026" />;
  if (status === 'error') return <ApiErrorView error={error} onRetry={reload} />;
  if (!data) return null;

  return (
    <div>
      <div className="topbar" style={{ marginBottom: 8 }}>
        <div>
          <div className="page-eyebrow">Reports</div>
          <h1 className="page-title" style={{ marginBottom: 4 }}>Authorized Summaries</h1>
        </div>
        <ExportButton rows={data.rows} />
      </div>
      <div className="panel">
        <h2>Summary</h2>
        <p className="panel-sub">
          Structured summary from authorized report data &mdash; export triggers the real
          backend export/audit pipeline in production; this demo exports only the
          summary shown here.
        </p>
        <ReportTable rows={data.rows} />
      </div>
    </div>
  );
}
