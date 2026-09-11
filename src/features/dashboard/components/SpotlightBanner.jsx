import React from 'react';
import { useNavigate } from 'react-router-dom';

export function SpotlightBanner({ spotlight }) {
  if (!spotlight) return null;
  return (
    <div className="spotlight">
      <div>
        <div className="sp-label">What needs your attention</div>
        <div className="sp-case">
          {spotlight.id}
          <span className="tag tag-critical" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>{spotlight.priority}</span>
        </div>
        <div className="sp-tags">
          {spotlight.signals?.join(' \u00B7 ')} &middot; AI confidence {spotlight.confidence}% &middot; {spotlight.status}
        </div>
      </div>
      <SpotlightButton id={spotlight.id} />
    </div>
  );
}

function SpotlightButton({ id }) {
  const navigate = useNavigate();
  return (
    <button className="sp-btn" onClick={() => navigate(`/authority/cases/${id}`)}>
      Review case &rarr;
    </button>
  );
}
