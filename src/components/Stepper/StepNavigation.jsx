import React from 'react';

import PropTypes from 'prop-types';

/**
 * Componente StepNavigation - Navegação entre steps
 * Botões de voltar, avançar e pular para finalização
 */
function StepNavigation({
  isFirstStep,
  isLastStep,
  canGoNext,
  canGoBack,
  onNext,
  onBack,
  onFinish,
  isLoading = false,
  showNextButton = true, // Por padrão mostra, mas pode ser controlado
}) {
  const getButtonClassName = () => {
    if (!canGoNext || isLoading) {
      return 'bg-gray-400 cursor-not-allowed';
    }
    if (isLastStep) {
      return 'bg-green-600 hover:bg-green-700 hover:shadow-xl';
    }
    return 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl';
  };

  const getButtonText = () => {
    if (isLoading) {
      return (
        <span className="flex items-center gap-1.5 sm:gap-2">
          <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-sm sm:text-base">Processando...</span>
        </span>
      );
    }
    if (isLastStep) {
      return <span className="text-sm sm:text-base">✓ Finalizar Simulação</span>;
    }
    return <span className="text-sm sm:text-base">Avançar →</span>;
  };

  return (
    <div
      className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200 ${
        !showNextButton && !isFirstStep ? 'justify-start' : 'justify-between items-center'
      }`}
    >
      {/* Botão Voltar - Sempre visível (exceto no primeiro step) */}
      {!isFirstStep && (
        <button
          type="button"
          onClick={onBack}
          disabled={!canGoBack || isLoading}
          className={`
            w-full
            sm:w-auto
            px-4
            sm:px-5
            md:px-6
            py-2
            sm:py-2.5
            md:py-3
            rounded-lg
            text-sm
            sm:text-base
            font-semibold
            transition-all
            duration-200
            ${
              !canGoBack || isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          ← Voltar
        </button>
      )}

      {/* Botão Avançar ou Finalizar - Só aparece quando showNextButton=true ou último step */}
      {(showNextButton || isLastStep) && (
        <button
          type="button"
          onClick={isLastStep ? onFinish : onNext}
          disabled={!canGoNext || isLoading}
          className={`w-full sm:w-auto px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-md sm:shadow-lg ${getButtonClassName()}`}
        >
          {getButtonText()}
        </button>
      )}
    </div>
  );
}

StepNavigation.propTypes = {
  isFirstStep: PropTypes.bool.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  canGoNext: PropTypes.bool.isRequired,
  canGoBack: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  showNextButton: PropTypes.bool,
};

StepNavigation.defaultProps = {
  isLoading: false,
  showNextButton: true,
};

export default StepNavigation;
