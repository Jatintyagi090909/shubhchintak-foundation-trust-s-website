import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="spinner-overlay"></div>
      <div className="spinner-wrapper">
        <div className="spinner-border" role="status" style={{
          color: '#fd5c28',
          width: '3rem',
          height: '3rem'
        }}>
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-2">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
