import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function MetricsBar({ metrics, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-slate-800/30 backdrop-blur-sm border-y border-slate-700/50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease ${index * 0.1}s`,
              }}
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-slate-400">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

MetricsBar.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  className: PropTypes.string,
};

MetricsBar.defaultProps = {
  className: '',
};

export default MetricsBar;
