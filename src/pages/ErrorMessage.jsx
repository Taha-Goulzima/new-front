import React from 'react';

function ErrorMessage({ error }) {
  return error ? (
    <div className="mt-2 text-danger" style={{ fontSize: '14px' }}>
      {error}
    </div>
  ) : null;
}

export default ErrorMessage;
