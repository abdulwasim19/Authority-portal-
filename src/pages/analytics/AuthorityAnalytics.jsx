import React from 'react';
import { useAnalytics } from '../../features/analytics/hooks/useAnalytics.js';
import { DistributionBars } from '../../features/analytics/components/DistributionBars.jsx';
import { TrendSparkline } from '../../features/analytics/components/TrendSparkline.jsx';
import { MetricCard } from '../../features/analytics/components/MetricCard.jsx';
import { LoadingState } from '../../components/feedback/LoadingState.jsx';
import { ApiErrorView } from '../../components/feedback/ApiErrorView.jsx';

export function AuthorityAnalytics() {
  const { data: a, status, error, reload } = useAnalytics();

  if (status === 'loading') return <LoadingState label="Fetching authorized aggregates\u2026" />;
  if (status === 'error') return <ApiErrorView error={error} onRetry={reload} />;
  if (!a) return null;

  const totalRisk = Object.values(a.riskDistribution).reduce((s, v) => s + v, 0);
  const highPct = totalRisk ? Math.round((a.riskDistribution.High / totalRisk) * 100) : 0;

  return (
    <div>
      <div className="page-eyebrow">Analytics</div>
      <h1 className="page-title">Support Review Analytics</h1>
      <p className="page-sub">Approved aggregate data only &mdash; no raw case records are used to compute these numbers here.</p>

      <div className="metric-row">
        <MetricCard label="High-risk share" value={`${highPct}%`} sub="of all authorized cases" />
        <MetricCard label="Resolved" value={a.statusDistribution.Resolved} sub="cases closed" />
        <MetricCard label="Follow-up in progress" value={a.statusDistribution['Follow-up']} sub="active follow-ups" />
      </div>

      <div className="analytics-grid">
        <div className="panel">
          <h2>Risk Distribution</h2>
          <p className="panel-sub">Per approved AI risk categories</p>
          <DistributionBars dist={a.riskDistribution} />
        </div>
        <div className="panel">
          <h2>Status Distribution</h2>
          <p className="panel-sub">Per backend-defined status values</p>
          <DistributionBars dist={a.statusDistribution} />
        </div>
        <div className="panel">
          <h2>Priority Distribution</h2>
          <p className="panel-sub">Operational priority, independent of risk</p>
          <DistributionBars dist={a.priorityDistribution} />
        </div>
        <div className="panel">
          <h2>Risk Trend</h2>
          <p className="panel-sub">High-risk case count, last 6 weeks</p>
          <TrendSparkline points={a.riskTrend} />
          <div className="disclaimer">
            Descriptive trend only &mdash; e.g. "high-risk cases changed by N over this period."
            No causal claims are inferred without evidence.
          </div>
        </div>
      </div>
    </div>
  );
}
