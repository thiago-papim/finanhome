import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Slider } from '@mui/material';

/**
 * Componente StepSlider - Slider avançado para valores monetários
 * Com formatação, validação e feedback visual
 */
function StepSlider({
  step,
  value,
  onChange,
  error,
  dependentValue,
  maxPercent,
  isProcessing = false,
}) {
  // Valor padrão inicial
  const defaultValue = step.min || 50000;

  // Ref para rastrear qual step já foi inicializado
  const initializedStepRef = React.useRef(null);

  // Estado controlado - sempre sincronizar com prop value ou usar defaultValue
  const [displayValue, setDisplayValue] = useState(value || defaultValue);
  const [inputValue, setInputValue] = useState('');

  // Calcular valor máximo baseado em dependência
  const maxValue = React.useMemo(() => {
    if (dependentValue && maxPercent) {
      return Math.floor((dependentValue * maxPercent) / 100);
    }
    return step.max || 10000000;
  }, [dependentValue, maxPercent, step.max]);

  // Formatar valor para exibição
  const formatCurrency = React.useCallback((val) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  }, []);

  // Parsear valor do input
  const parseInputValue = (str) => {
    const cleaned = str.replace(/[^\d]/g, '');
    return parseInt(cleaned, 10) || 0;
  };

  // CRÍTICO: Sincronizar valor quando step mudar ou value mudar
  // Isso garante que o slider sempre reflita o valor correto do estado
  // Nunca reutilizar valor de step anterior
  useEffect(() => {
    // Verificar se mudou de step
    const stepChanged = initializedStepRef.current !== step.id;

    if (stepChanged) {
      // Resetar ref para o novo step
      initializedStepRef.current = step.id;

      // Se não houver valor salvo para este step, inicializar com defaultValue
      if ((value === undefined || value === null || value === 0) && onChange) {
        // Inicializar com valor padrão
        onChange(defaultValue);
        setDisplayValue(defaultValue);
        setInputValue(formatCurrency(defaultValue));
        return; // Sair cedo para evitar atualização dupla
      }
    }

    // Determinar valor a exibir: usar valor salvo se existir, senão usar defaultValue
    const newValue = value !== undefined && value !== null && value > 0 ? value : defaultValue;

    // Sempre atualizar estado local para refletir valor correto
    setDisplayValue(newValue);
    setInputValue(formatCurrency(newValue));
  }, [step.id, value, defaultValue, formatCurrency, onChange]); // Incluir step.id como dependência CRÍTICA

  // Handler para slider
  const handleSliderChange = (event, newValue) => {
    // Bloquear mudanças durante processamento
    if (isProcessing) {
      return;
    }
    const clampedValue = Math.max(step.min || 0, Math.min(newValue, maxValue));
    setDisplayValue(clampedValue);
    setInputValue(formatCurrency(clampedValue));
    if (onChange) {
      onChange(clampedValue);
    }
  };

  // Handler para input
  const handleInputChange = (event) => {
    // Bloquear mudanças durante processamento
    if (isProcessing) {
      return;
    }
    const rawValue = event.target.value;
    setInputValue(rawValue);
    const parsedValue = parseInputValue(rawValue);
    const clampedValue = Math.max(step.min || 0, Math.min(parsedValue, maxValue));
    setDisplayValue(clampedValue);
    if (onChange) {
      onChange(clampedValue);
    }
  };

  // Handler para blur do input (garantir formatação)
  const handleInputBlur = () => {
    setInputValue(formatCurrency(displayValue));
  };

  return (
    <div className="w-full space-y-6">
      {/* Input de texto */}
      <div className="w-full">
        <TextField
          fullWidth
          variant="outlined"
          label={step.label}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={!!error}
          disabled={isProcessing}
          helperText={
            error ||
            `Mínimo: ${formatCurrency(step.min || 0)} | Máximo: ${formatCurrency(maxValue)}`
          }
          InputProps={{
            startAdornment: <span className="mr-2 text-gray-500">R$</span>,
          }}
          className="bg-white"
        />
      </div>

      {/* Slider */}
      <div className="px-2">
        <Slider
          value={displayValue}
          onChange={handleSliderChange}
          min={step.min || 0}
          max={maxValue}
          step={step.step || 10000}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency}
          disabled={isProcessing}
          sx={{
            color: '#3b82f6',
            height: 8,
            '& .MuiSlider-thumb': {
              width: 24,
              height: 24,
              backgroundColor: '#fff',
              border: '2px solid #3b82f6',
              '&:hover': {
                boxShadow: '0 0 0 8px rgba(59, 130, 246, 0.16)',
              },
            },
            '& .MuiSlider-track': {
              height: 8,
            },
            '& .MuiSlider-rail': {
              height: 8,
              opacity: 0.3,
            },
          }}
        />
      </div>

      {/* Informações adicionais */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>Valor mínimo: {formatCurrency(step.min || 0)}</span>
        <span>Valor máximo: {formatCurrency(maxValue)}</span>
      </div>

      {/* Mensagem de erro destacada */}
      {error && (
        <div className="mt-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Valor atual formatado */}
      {displayValue > 0 && !error && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 text-sm">
            Valor selecionado: <strong className="text-lg">{formatCurrency(displayValue)}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

StepSlider.propTypes = {
  step: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
  }).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  dependentValue: PropTypes.number,
  maxPercent: PropTypes.number,
  isProcessing: PropTypes.bool,
};

StepSlider.defaultProps = {
  value: null,
  error: null,
  dependentValue: null,
  maxPercent: null,
  isProcessing: false,
};

export default StepSlider;
