import React from 'react';

export function Pagination({ page, totalPages, totalItems, onPage }) {
  return (
    <div className="pagination">
      <div>Page {page} of {totalPages} &middot; {totalItems} case{totalItems === 1 ? '' : 's'}</div>
      <div className="pg-btns">
        <button disabled={page <= 1} onClick={() => onPage(page - 1)}>&larr; Prev</button>
        <button disabled={page >= totalPages} onClick={() => onPage(page + 1)}>Next &rarr;</button>
      </div>
    </div>
  );
}
