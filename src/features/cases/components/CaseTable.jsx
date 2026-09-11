import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PriorityTag, SafetyTag, StatusPill, SignalChips, ConfidenceBar } from '../../../components/common/Badge.jsx';
import { EmptyState } from '../../../components/feedback/EmptyState.jsx';

export function CaseTable({ rows }) {
  const navigate = useNavigate();

  if (!rows || rows.length === 0) {
    return (
      <EmptyState
        icon="\uD83D\uDD0D"
        title={<>No cases match these filters.</>}
        hint="Try clearing search or filters."
      />
    );
  }

  return (
    <div className="table-wrap">
      <table className="cases">
        <thead>
          <tr>
            <th>Case</th>
            <th>Priority</th>
            <th>Safety</th>
            <th>Key Signals</th>
            <th>Confidence</th>
            <th>Status</th>
            <th>Updated</th>
            <th>Reviewer</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.id} className="rowlink" onClick={() => navigate(`/authority/cases/${c.id}`)}>
              <td className="id-link">{c.id}</td>
              <td><PriorityTag value={c.priority} /></td>
              <td><SafetyTag value={c.safety} /></td>
              <td><SignalChips signals={c.signals} /></td>
              <td><ConfidenceBar value={c.confidence} /></td>
              <td><StatusPill value={c.status} /></td>
              <td>{c.updatedAt}</td>
              <td>{c.counsellor}</td>
              <td><span className="review-link">Review &rarr;</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
