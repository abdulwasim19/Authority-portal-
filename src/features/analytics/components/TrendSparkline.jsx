import React from 'react';

export function TrendSparkline({ points, color = 'var(--critical)' }) {
  const w = 280, h = 60, pad = 6;
  const vals = points.map((p) => p.value);
  const max = Math.max(...vals), min = Math.min(...vals);
  const range = Math.max(1, max - min);
  const stepX = (w - pad * 2) / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = pad + i * stepX;
    const y = h - pad - ((p.value - min) / range) * (h - pad * 2);
    return [x, y];
  });
  const path = coords.map((c, i) => (i === 0 ? 'M' : 'L') + c[0].toFixed(1) + ',' + c[1].toFixed(1)).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={path} fill="none" stroke={color} strokeWidth="2" />
      {coords.map((c, i) => (
        <circle key={i} cx={c[0].toFixed(1)} cy={c[1].toFixed(1)} r="2.5" fill={color} />
      ))}
    </svg>
  );
}
