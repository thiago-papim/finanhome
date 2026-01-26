import React from 'react';
import PropTypes from 'prop-types';

function AnimatedBorder({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 rounded-2xl opacity-75"
        style={{
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
          backgroundSize: '200% 200%',
          animation: 'borderRotate 3s linear infinite',
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative bg-slate-900/90 rounded-2xl p-6">{children}</div>
      <style>
        {`
          @keyframes borderRotate {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
        `}
      </style>
    </div>
  );
}

AnimatedBorder.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AnimatedBorder.defaultProps = {
  className: '',
};

export default AnimatedBorder;
