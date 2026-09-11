import React from 'react';
import { STATUS_VALUES, PRIORITY_LEVELS, SAFETY_LEVELS } from '../../../mocks/mockData/cases.js';

export function CaseToolbar({ filters, setFilters }) {
  return (
    <div className="toolbar">
      <input
        type="text"
        placeholder="Search by case ID\u2026"
        value={filters.q}
        onChange={(e) => setFilters({ q: e.target.value })}
      />
      <select value={filters.priority} onChange={(e) => setFilters({ priority: e.target.value })}>
        <option value="">All priorities</option>
        {PRIORITY_LEVELS.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <select value={filters.safety} onChange={(e) => setFilters({ safety: e.target.value })}>
        <option value="">All safety levels</option>
        {SAFETY_LEVELS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <select value={filters.status} onChange={(e) => setFilters({ status: e.target.value })}>
        <option value="">All statuses</option>
        {STATUS_VALUES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
