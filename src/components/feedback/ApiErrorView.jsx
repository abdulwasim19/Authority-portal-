import React from 'react';
import { Unauthorized } from '../../pages/errors/Unauthorized.jsx';
import { NotFound } from '../../pages/errors/NotFound.jsx';
import { ErrorState } from './ErrorState.jsx';

export function ApiErrorView({ error, onRetry }) {
  if (error && error.status === 403) return <Unauthorized />;
  if (error && error.status === 404) return <NotFound message={error.message} />;
  return <ErrorState message={error && error.message} onRetry={onRetry} />;
}
