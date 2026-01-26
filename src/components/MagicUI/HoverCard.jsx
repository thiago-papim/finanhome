import React from 'react';
import PropTypes from 'prop-types';

function HoverCard({ children, className = '', glowColor = 'blue' }) {
  const glowColors = {
    blue: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]',
    emerald: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]',
    purple: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]',
  };

  return (
    <div
      className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:border-slate-600 ${glowColors[glowColor]} ${className}`}
    >
      {children}
    </div>
  );
}

HoverCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  glowColor: PropTypes.oneOf(['blue', 'emerald', 'purple']),
};

HoverCard.defaultProps = {
  className: '',
  glowColor: 'blue',
};

export default HoverCard;
