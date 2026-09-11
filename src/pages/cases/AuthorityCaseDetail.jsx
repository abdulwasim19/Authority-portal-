import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCaseDetail } from '../../features/case-detail/hooks/useCaseDetail.js';
import { SignalBars } from '../../features/case-detail/components/SignalBars.jsx';
import { ProgressBlock } from '../../features/case-detail/components/ProgressBlock.jsx';
import { CaseTimelineView } from '../../features/case-detail/components/CaseTimelineView.jsx';
import { PriorityTag, SafetyTag, StatusPill } from '../../components/common/Badge.jsx';
import { LoadingState } from '../../components/feedback/LoadingState.jsx';
import { ApiErrorView } from '../../components/feedback/ApiErrorView.jsx';

export function AuthorityCaseDetail() {
  const { id } = useParams();
  const { data: c, status, error, reload } = useCaseDetail(id);

  if (status === 'loading') return <LoadingState label="Loading case review\u2026" />;
  if (status === 'error') return <ApiErrorView error={error} onRetry={reload} />;
  if (!c) return null;

  return (
    <div>
      <Link to="/authority/cases" className="back-link">&larr; Back to cases</Link>

      <div className="detail-head">
        <div>
          <div className="page-eyebrow">Case Review</div>
          <h1 className="page-title" style={{ marginBottom: 4 }}>{c.id}</h1>
          <div className="page-sub" style={{ marginBottom: 0 }}>
            Submitted {c.createdAt} &middot; Updated {c.updatedAt} &middot; Reviewer {c.counsellor}
          </div>
          <div className="badges">
            <PriorityTag value={c.priority} />
            <SafetyTag value={c.safety} />
            <StatusPill value={c.status} />
          </div>
        </div>
      </div>

      <div className="oversight-banner">
        Oversight view only. This shows permitted case progress and the same AI support
        signals your counsellor sees for context &mdash; the review decision itself
        stays with the assigned counsellor in the Counsellor Portal.
      </div>

      <div className="grid-2">
        <div>
          <div className="panel">
            <h2>Case Information</h2>
            <div className="info-grid">
              <div className="item"><div className="k">Assigned Counsellor</div><div className="v">{c.counsellor}</div></div>
              <div className="item"><div className="k">Operational Priority</div><div className="v">{c.priority}</div></div>
              <div className="item"><div className="k">AI Confidence</div><div className="v">{c.confidence}%</div></div>
            </div>
          </div>

          <div className="panel">
            <h2>AI Support Signals</h2>
            <p className="panel-sub">Prioritization aids, not a diagnosis. Human review remains the decision layer.</p>
            <SignalBars signals={c.signalScores} />
          </div>

          <div className="panel">
            <h2>Progress</h2>
            <ProgressBlock label="Assessment" pct={c.assessmentProgress} />
            <ProgressBlock label="Intervention" pct={c.interventionProgress} />
            <ProgressBlock label="Follow-up" pct={c.followUpProgress} />
          </div>
        </div>

        <div className="panel">
          <h2>Case Timeline</h2>
          <CaseTimelineView timeline={c.timeline} />
        </div>
      </div>
    </div>
  );
}
