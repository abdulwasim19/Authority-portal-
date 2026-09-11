import React from 'react';
import { useDashboard } from '../../features/dashboard/hooks/useDashboard.js';
import { CriticalCasesCard } from '../../features/dashboard/components/CriticalCasesCard.jsx';
import { HighPriorityCasesCard } from '../../features/dashboard/components/HighPriorityCasesCard.jsx';
import { ModerateCasesCard } from '../../features/dashboard/components/ModerateCasesCard.jsx';
import { FollowUpCasesCard } from '../../features/dashboard/components/FollowUpCasesCard.jsx';
import { SpotlightBanner } from '../../features/dashboard/components/SpotlightBanner.jsx';
import { PriorityQueue } from '../../features/dashboard/components/PriorityQueue.jsx';
import { RecentActivityCard } from '../../features/dashboard/components/RecentActivityCard.jsx';
import { QuickNavigation } from '../../features/dashboard/components/QuickNavigation.jsx';
import { LoadingState } from '../../components/feedback/LoadingState.jsx';
import { ApiErrorView } from '../../components/feedback/ApiErrorView.jsx';

export function AuthorityDashboard() {
  const { data, status, error, reload } = useDashboard();

  if (status === 'loading') return <LoadingState label="Fetching dashboard totals from backend\u2026" />;
  if (status === 'error') return <ApiErrorView error={error} onRetry={reload} />;
  if (!data) return null;

  return (
    <div>
      <h1 className="page-title">Support Review Dashboard</h1>
      <p className="page-sub">Backend signals highlight what needs attention. Your judgement brings the right support.</p>

      <div className="kpi-grid">
        <CriticalCasesCard value={data.criticalCases} />
        <HighPriorityCasesCard value={data.highPriorityCases} />
        <ModerateCasesCard value={data.moderateCases} />
        <FollowUpCasesCard value={data.followUpCases} />
      </div>

      <SpotlightBanner spotlight={data.spotlight} />

      <div className="grid-2">
        <div>
          <PriorityQueue rows={data.priorityQueue} />
        </div>
        <div>
          <div className="panel">
            <h2>Today's Review</h2>
            <div className="activity-row"><span>Total authorized cases</span><span>{data.totalCases}</span></div>
            <div className="activity-row"><span>Resolved</span><span>{data.resolvedCases}</span></div>
            <div className="activity-row"><span>Needs attention</span><span>{data.needsAttentionCount}</span></div>
          </div>
          <RecentActivityCard items={data.recentActivity} />
          <QuickNavigation />
        </div>
      </div>
    </div>
  );
}
