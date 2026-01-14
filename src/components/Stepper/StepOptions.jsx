import React from 'react';
import StepCard from './StepCard';

/**
 * Componente StepOptions - Renderiza opções em grid
 * Gerencia seleção e validação
 */
/* eslint-disable react/prop-types, react/function-component-definition */
const StepOptions = ({ step, selectedValue, onSelect, error }) => {
  const handleSelect = (value) => {
    if (onSelect) {
      onSelect(value);
    }
  };

  // Determinar layout baseado no número de opções
  const getGridClass = () => {
    const count = step.options?.length || 0;
    if (count === 2) return 'grid-cols-1 md:grid-cols-2 gap-6';
    if (count === 3) return 'grid-cols-1 md:grid-cols-3 gap-6';
    if (count === 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';
    if (count === 5) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
  };

  if (!step.options || step.options.length === 0) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>Nenhuma opção disponível para este step.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Grid de opções */}
      <div className={`grid ${getGridClass()}`}>
        {step.options.map((option) => (
          <StepCard
            key={option.value}
            option={option}
            isSelected={selectedValue === option.value}
            onClick={handleSelect}
          />
        ))}
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Indicador de seleção */}
      {selectedValue && !error && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm">
            ✓ Opção selecionada:{' '}
            <strong>{step.options.find((opt) => opt.value === selectedValue)?.label}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default StepOptions;
