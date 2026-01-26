import React from 'react';
import PropTypes from 'prop-types';

function ShinyButton({ children, onClick, className = '', variant = 'primary' }) {
  const baseClasses =
    'relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 focus:ring-blue-500 shadow-lg shadow-blue-500/50',
    secondary:
      'bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 hover:from-slate-800 hover:via-slate-900 hover:to-slate-700 focus:ring-slate-500 shadow-lg shadow-slate-500/50',
    success:
      'bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-800 focus:ring-emerald-500 shadow-lg shadow-emerald-500/50',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transform: 'translateX(-100%)',
          animation: 'shimmer 2s infinite',
        }}
      />
      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </button>
  );
}

ShinyButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success']),
};

ShinyButton.defaultProps = {
  onClick: () => {},
  className: '',
  variant: 'primary',
};

export default ShinyButton;
