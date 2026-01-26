import React from 'react';
import PropTypes from 'prop-types';

function BentoGrid({ children, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {children}
    </div>
  );
}

BentoGrid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

BentoGrid.defaultProps = {
  className: '',
};

export default BentoGrid;
