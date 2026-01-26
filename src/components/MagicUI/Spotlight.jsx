import React from 'react';
import PropTypes from 'prop-types';

function Spotlight({ children, className = '', intensity = 'medium' }) {
  const intensities = {
    low: 'opacity-20',
    medium: 'opacity-40',
    high: 'opacity-60',
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute inset-0 bg-gradient-radial from-blue-500/30 via-transparent to-transparent ${intensities[intensity]} pointer-events-none`}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3), transparent 70%)',
        }}
      />
      {children}
    </div>
  );
}

Spotlight.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  intensity: PropTypes.oneOf(['low', 'medium', 'high']),
};

Spotlight.defaultProps = {
  className: '',
  intensity: 'medium',
};

export default Spotlight;
