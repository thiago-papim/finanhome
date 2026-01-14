import React from 'react';
import PropTypes from 'prop-types';
import {
  CheckCircleIcon,
  HomeIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserIcon,
} from '@heroicons/react/24/solid';

/**
 * Componente StepperSummary - Resumo visual completo das respostas
 * Exibe todas as respostas com ícones e formatação
 */
function StepperSummary({ steps, responses, creditType }) {
  // Formatar valor monetário
  const formatCurrency = (value) => {
    if (typeof value !== 'number') return value;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Obter label formatado da resposta
  const getFormattedResponse = (step, response) => {
    if (step.type === 'slider') {
      return formatCurrency(response);
    }

    if (step.type === 'options') {
      const option = step.options?.find((opt) => opt.value === response);
      return option?.label || response;
    }

    return response;
  };

  // Obter ícone do step
  const getStepIcon = (step) => {
    if (step.id === 'tipo-credito') {
      return creditType === 'financiamento' ? HomeIcon : CurrencyDollarIcon;
    }
    if (step.id.includes('imovel') || step.id.includes('garantia')) {
      return HomeIcon;
    }
    if (step.id.includes('prazo') || step.id.includes('meses')) {
      return ClockIcon;
    }
    if (step.id.includes('valor')) {
      return CurrencyDollarIcon;
    }
    if (step.id.includes('pessoa')) {
      return UserIcon;
    }
    return CheckCircleIcon;
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Resumo da Simulação</h2>
        <p className="text-gray-600">Revise todas as informações antes de enviar</p>
      </div>

      <div className="grid gap-4">
        {steps.map((step) => {
          const response = responses[step.id];
          if (!response) return null;

          const IconComponent = getStepIcon(step);
          const formattedResponse = getFormattedResponse(step, response);

          return (
            <div
              key={step.id}
              className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-md"
            >
              <div className="flex items-start gap-4">
                {/* Ícone */}
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 rounded-full p-3">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">{step.label}</h3>
                  <p className="text-xl font-bold text-gray-800">{formattedResponse}</p>
                  {step.description && (
                    <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                  )}
                </div>

                {/* Indicador de check */}
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Informação adicional */}
      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Próximos passos:</strong> Após enviar, nossa equipe entrará em contato em até 24
          horas para dar continuidade ao seu processo de crédito.
        </p>
      </div>
    </div>
  );
}

StepperSummary.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
      type: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
  responses: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    .isRequired,
  creditType: PropTypes.string,
};

StepperSummary.defaultProps = {
  creditType: null,
};

export default StepperSummary;
