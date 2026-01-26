import React from 'react';
import PropTypes from 'prop-types';

function SectionDivider({ className = '' }) {
  return (
    <div className={`relative py-16 ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          style={{
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
            animation: 'dividerGlow 3s ease-in-out infinite',
          }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-2 h-2 rounded-full bg-blue-500"
          style={{
            animation: 'dividerPulse 2s ease-in-out infinite',
          }}
        />
      </div>
      <style>
        {`
          @keyframes dividerGlow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
          @keyframes dividerPulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(2); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

SectionDivider.propTypes = {
  className: PropTypes.string,
};

SectionDivider.defaultProps = {
  className: '',
};

export default SectionDivider;
