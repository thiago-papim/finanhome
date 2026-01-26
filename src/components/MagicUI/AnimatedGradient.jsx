import React from 'react';
import PropTypes from 'prop-types';

function AnimatedGradient({ children, className = '' }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background:
          'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
      }}
    >
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      {children}
    </div>
  );
}

AnimatedGradient.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AnimatedGradient.defaultProps = {
  className: '',
};

export default AnimatedGradient;
