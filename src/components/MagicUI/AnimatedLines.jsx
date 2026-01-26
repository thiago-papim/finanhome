import React from 'react';
import PropTypes from 'prop-types';

function AnimatedLines({ className = '', direction = 'horizontal' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none opacity-5 ${className} overflow-hidden`}>
      {direction === 'horizontal' ? (
        <div
          className="w-full h-full"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(59, 130, 246, 0.3) 2px,
              rgba(59, 130, 246, 0.3) 4px
            )`,
            animation: 'lineMove 15s linear infinite',
          }}
        />
      ) : (
        <div
          className="w-full h-full"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(59, 130, 246, 0.3) 2px,
              rgba(59, 130, 246, 0.3) 4px
            )`,
            animation: 'lineMove 15s linear infinite',
          }}
        />
      )}
      <style>
        {`
          @keyframes lineMove {
            0% { transform: translateY(0); }
            100% { transform: translateY(20px); }
          }
        `}
      </style>
    </div>
  );
}

AnimatedLines.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
};

AnimatedLines.defaultProps = {
  className: '',
  direction: 'horizontal',
};

export default AnimatedLines;
