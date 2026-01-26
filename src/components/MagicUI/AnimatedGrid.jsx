import React from 'react';
import PropTypes from 'prop-types';

function AnimatedGrid({ className = '', opacity = 'low' }) {
  const opacityClasses = {
    low: 'opacity-10',
    medium: 'opacity-20',
    high: 'opacity-30',
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${opacityClasses[opacity]} ${className} overflow-hidden`}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
        }}
      />
      <style>
        {`
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
        `}
      </style>
    </div>
  );
}

AnimatedGrid.propTypes = {
  className: PropTypes.string,
  opacity: PropTypes.oneOf(['low', 'medium', 'high']),
};

AnimatedGrid.defaultProps = {
  className: '',
  opacity: 'low',
};

export default AnimatedGrid;
