import React from 'react';
import PropTypes from 'prop-types';
import {
  HomeIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  ShoppingBagIcon,
  ClockIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  ChartBarIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/solid';

/**
 * Mapeamento de ícones para fallback quando imagem não carregar
 */
const iconMap = {
  home: HomeIcon,
  currency: CurrencyDollarIcon,
  building: BuildingOfficeIcon,
  map: MapPinIcon,
  store: ShoppingBagIcon,
  clock: ClockIcon,
  calendar: CalendarIcon,
  check: CheckCircleIcon,
  x: XCircleIcon,
  user: UserIcon,
  trending: ChartBarIcon,
  dots: EllipsisHorizontalIcon,
};

/**
 * Componente StepCard - Card clicável para opções
 * Com imagem, label, estados visuais e animações
 */
function StepCard({ option, isSelected = false, isDisabled = false, onClick }) {
  const [imageError, setImageError] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const IconComponent = option.icon ? iconMap[option.icon] : null;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick(option.value);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isDisabled}
      className={`
        relative
        bg-white
        rounded-xl
        sm:rounded-2xl
        p-2
        sm:p-3
        md:p-4
        w-full
        h-full
        min-h-[120px]
        sm:min-h-[140px]
        md:min-h-[160px]
        flex
        flex-col
        items-center
        justify-center
        transition-all
        duration-300
        ease-out
        transform
        border-2
        cursor-pointer
        shadow-md
        sm:shadow-lg
        animate-scaleIn
        ${
          isSelected
            ? 'border-blue-500 bg-blue-50 scale-105 shadow-xl ring-2 sm:ring-4 ring-blue-200'
            : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
        }
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      style={{
        transform: (() => {
          if (isHovered && !isDisabled && !isSelected) {
            return 'scale(1.02) translateY(-2px)';
          }
          if (isSelected) {
            return 'scale(1.05)';
          }
          return 'scale(1)';
        })(),
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Indicador de seleção */}
      {isSelected && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
          <div className="bg-blue-500 rounded-full p-1 sm:p-1.5">
            <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
        </div>
      )}

      {/* Imagem ou Ícone */}
      <div className="mb-1.5 sm:mb-2 md:mb-3 flex items-center justify-center h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16">
        {(() => {
          if (!imageError && option.image) {
            return (
              <img
                src={option.image}
                alt={option.label}
                onError={handleImageError}
                className="h-full w-full object-contain"
              />
            );
          }
          if (IconComponent) {
            return (
              <IconComponent className="h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 text-blue-500" />
            );
          }
          return <span className="text-lg sm:text-xl md:text-2xl">?</span>;
        })()}
      </div>

      {/* Label */}
      <span
        className={`
          text-xs
          sm:text-sm
          md:text-base
          font-semibold
          text-center
          transition-colors
          duration-200
          px-1
          ${isSelected ? 'text-blue-700' : 'text-gray-800'}
        `}
      >
        {option.label}
      </span>

      {/* Efeito de brilho ao selecionar */}
      {isSelected && (
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-400/20 to-transparent pointer-events-none" />
      )}
    </button>
  );
}

StepCard.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    image: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

StepCard.defaultProps = {
  isSelected: false,
  isDisabled: false,
};

export default StepCard;
