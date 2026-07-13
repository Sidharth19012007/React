import React from 'react';

interface ErrorDisplayProps {
  error?: unknown;
  onRetry?: () => void;
}

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  let message = 'An error occurred while fetching data.';
  
  if (error && typeof error === 'object') {
    if ('error' in error) message = String((error as { error: string }).error);
    else if ('message' in error) message = String((error as { message: string }).message);
  }

  return (
    <div data-testid="error-display" style={{ padding: '1rem', border: '1px solid red', borderRadius: '4px', margin: '1rem 0' }}>
      <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>
      {onRetry && (
        <button type="button" data-testid="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}