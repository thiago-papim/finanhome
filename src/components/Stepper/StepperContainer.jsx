import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useStepper from '../../hooks/useStepper';
import StepOptions from './StepOptions';
import StepSlider from './StepSlider';
import StepNavigation from './StepNavigation';
import StepperSummary from './StepperSummary';

/**
 * Componente StepperContainer - Container principal do stepper
 * Orquestra todos os componentes e gerencia o fluxo completo
 */
function StepperContainer({ initialCreditType = null, onFormSubmitSuccess }) {
  const {
    currentStep,
    steps,
    responses,
    errors,
    currentStepData,
    progress,
    isFirstStep,
    isLastStep,
    isStepComplete,
    creditType,
    nextStep,
    previousStep,
    goToStep,
    updateResponse,
  } = useStepper(initialCreditType);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Resetar isProcessing quando o step mudar (após transição completa)
  useEffect(() => {
    // Pequeno delay para garantir que a transição visual foi concluída
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [currentStep]);

  // Handler para seleção de opção (com avanço automático)
  const handleOptionSelect = (value) => {
    // Bloquear todas as ações imediatamente
    if (isProcessing) {
      return;
    }

    if (currentStepData) {
      // Ativar estado de processamento IMEDIATAMENTE
      setIsProcessing(true);

      // Limpar erro imediatamente antes de atualizar (evita flash de erro)
      // Atualizar resposta imediatamente (isso já limpa o erro)
      updateResponse(currentStepData.id, value);

      // Avançar automaticamente após selecionar (exceto no último step)
      // Delay de 1 segundo para mostrar mensagem "✓ Opção selecionada"
      if (!isLastStep) {
        setTimeout(() => {
          // Avançar diretamente sem validação para opções (sempre válidas quando selecionadas)
          // O updateResponse já atualizou o estado e limpou o erro
          nextStep(true); // skipValidation = true para steps de opção
          window.scrollTo({ top: 0, behavior: 'smooth' });
          // Desativar processamento após a transição
          setIsProcessing(false);
        }, 1000); // Delay de 1 segundo para mostrar feedback visual
      } else {
        // Se for o último step, desativar processamento imediatamente
        setIsProcessing(false);
      }
    }
  };

  // Handler para mudança de slider
  const handleSliderChange = (value) => {
    // Bloquear mudanças durante processamento
    if (isProcessing) {
      return;
    }
    if (currentStepData) {
      updateResponse(currentStepData.id, value);
    }
  };

  // Handler para avançar
  const handleNext = () => {
    // Bloquear durante processamento
    if (isProcessing) {
      return;
    }
    if (nextStep()) {
      // Scroll para topo ao avançar
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handler para voltar
  const handleBack = () => {
    // Bloquear durante processamento
    if (isProcessing) {
      return;
    }
    if (previousStep()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handler para finalizar
  const handleFinish = async () => {
    if (!isStepComplete(currentStep)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar payload para API
      // TODO: Implementar chamada real para API
      // const payload = {
      //   tipoCredito: responses['tipo-credito'],
      //   timestamp: new Date().toISOString(),
      //   ...responses,
      // };
      // const response = await fetch('/api/simulacao', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });

      // Simular delay de API
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1500);
      });

      // Mostrar resumo
      setShowSummary(true);
    } catch (error) {
      // Usar window.alert para evitar erro de lint, mas manter funcionalidade
      // eslint-disable-next-line no-alert
      window.alert('Erro ao enviar simulação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler para voltar do resumo para o último step
  const handleBackFromSummary = () => {
    setShowSummary(false);
    // Voltar para o último step
    if (steps.length > 0) {
      goToStep(steps.length - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handler para editar step específico do resumo
  const handleEditStepFromSummary = (stepIndex) => {
    setShowSummary(false);
    goToStep(stepIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Se mostrar resumo, exibir componente de resumo
  if (showSummary) {
    return (
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <StepperSummary
          steps={steps}
          responses={responses}
          creditType={responses['tipo-credito']}
          onBack={handleBackFromSummary}
          onEditStep={handleEditStepFromSummary}
          onSubmit={onFormSubmitSuccess}
        />
      </div>
    );
  }

  // Se não houver step atual, mostrar loading
  if (!currentStepData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  const currentResponse = responses[currentStepData.id];
  // Para steps de opção, não mostrar erro (avanço é automático)
  // Para steps de slider/input, mostrar erro apenas se tentou avançar sem preencher
  const currentError = currentStepData.type === 'options' ? null : errors[currentStepData.id];
  const canGoNext = isStepComplete(currentStep);

  // Determinar se o botão Avançar deve ser exibido
  // Só aparece para steps que requerem ação manual (slider, input)
  // Steps de opções avançam automaticamente ao clicar
  // O botão de finalizar só aparece se for realmente o último step E houver tipo de crédito
  const shouldShowNextButton =
    currentStepData.type === 'slider' || currentStepData.type === 'input';
  const shouldShowFinishButton = isLastStep && creditType && canGoNext;

  // Obter valor dependente para slider (se houver)
  let dependentValue = null;
  let maxPercent = null;
  if (currentStepData.type === 'slider' && currentStepData.validation?.dependsOn) {
    dependentValue = responses[currentStepData.validation.dependsOn];
    maxPercent = currentStepData.validation.maxPercent;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      {/* Indicador de progresso */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="bg-blue-500 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg text-xs sm:text-sm font-semibold">
            {progress}%
          </div>
          <div className="text-gray-300 text-xs sm:text-sm">
            Passo {currentStep + 1} de {steps.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
          <div
            className="bg-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card principal do step */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-6 lg:p-8 mb-4 sm:mb-5 md:mb-6 animate-fadeIn">
        {/* Título e descrição */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
            {currentStepData.label}
          </h2>
          {currentStepData.description && (
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              {currentStepData.description}
            </p>
          )}
        </div>

        {/* Conteúdo do step baseado no tipo */}
        {currentStepData.type === 'options' && (
          <StepOptions
            step={currentStepData}
            selectedValue={currentResponse}
            onSelect={handleOptionSelect}
            error={null}
            isProcessing={isProcessing}
          />
        )}

        {currentStepData.type === 'slider' && (
          <StepSlider
            step={currentStepData}
            value={currentResponse}
            onChange={handleSliderChange}
            error={currentError}
            dependentValue={dependentValue}
            maxPercent={maxPercent}
            isProcessing={isProcessing}
          />
        )}

        {/* Navegação - Sempre mostrar botão voltar, avançar apenas quando necessário */}
        <StepNavigation
          isFirstStep={isFirstStep}
          isLastStep={shouldShowFinishButton}
          canGoNext={canGoNext && !isProcessing}
          canGoBack={!isFirstStep && !isProcessing}
          onNext={handleNext}
          onBack={handleBack}
          onFinish={handleFinish}
          isLoading={isSubmitting || isProcessing}
          showNextButton={shouldShowNextButton || shouldShowFinishButton}
        />
      </div>

      {/* Indicador de steps completos */}
      {isLastStep && canGoNext && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 text-center">
          <p className="text-green-700 text-sm sm:text-base font-medium">
            ✓ Todas as informações foram preenchidas. Você pode finalizar a simulação.
          </p>
        </div>
      )}
    </div>
  );
}

StepperContainer.propTypes = {
  initialCreditType: PropTypes.string,
  onFormSubmitSuccess: PropTypes.func,
};

StepperContainer.defaultProps = {
  initialCreditType: null,
  onFormSubmitSuccess: null,
};

export default StepperContainer;
