import React, { useState } from 'react';
import { useStepper } from '../../hooks/useStepper';
import StepOptions from './StepOptions';
import StepSlider from './StepSlider';
import StepNavigation from './StepNavigation';
import StepperSummary from './StepperSummary';

/**
 * Componente StepperContainer - Container principal do stepper
 * Orquestra todos os componentes e gerencia o fluxo completo
 */
/* eslint-disable react/prop-types, react/function-component-definition */
const StepperContainer = ({ initialCreditType = null }) => {
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
    updateResponse,
    reset,
  } = useStepper(initialCreditType);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Handler para seleção de opção (com avanço automático)
  const handleOptionSelect = (value) => {
    if (currentStepData) {
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
        }, 1000); // Delay de 1 segundo para mostrar feedback visual
      }
    }
  };

  // Handler para mudança de slider
  const handleSliderChange = (value) => {
    if (currentStepData) {
      updateResponse(currentStepData.id, value);
    }
  };

  // Handler para avançar
  const handleNext = () => {
    if (nextStep()) {
      // Scroll para topo ao avançar
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handler para voltar
  const handleBack = () => {
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
      const payload = {
        tipoCredito: responses['tipo-credito'],
        timestamp: new Date().toISOString(),
        ...responses,
      };

      // Aqui você faria a chamada para a API
      // TODO: Implementar chamada real para API
      // const response = await fetch('/api/simulacao', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mostrar resumo
      setShowSummary(true);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Erro ao enviar simulação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Se mostrar resumo, exibir componente de resumo
  if (showSummary) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <StepperSummary
          steps={steps}
          responses={responses}
          creditType={responses['tipo-credito']}
        />
        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              setShowSummary(false);
              reset();
            }}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Nova Simulação
          </button>
          <button
            type="button"
            onClick={handleFinish}
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            Enviar Simulação
          </button>
        </div>
      </div>
    );
  }

  // Se não houver step atual, mostrar loading
  if (!currentStepData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Indicador de progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            {progress}%
          </div>
          <div className="text-gray-300 text-sm">
            Passo {currentStep + 1} de {steps.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card principal do step */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6 animate-fadeIn">
        {/* Título e descrição */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {currentStepData.label}
          </h2>
          {currentStepData.description && (
            <p className="text-lg text-gray-600">{currentStepData.description}</p>
          )}
        </div>

        {/* Conteúdo do step baseado no tipo */}
        {currentStepData.type === 'options' && (
          <StepOptions
            step={currentStepData}
            selectedValue={currentResponse}
            onSelect={handleOptionSelect}
            error={null}
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
          />
        )}

        {/* Navegação - Sempre mostrar botão voltar, avançar apenas quando necessário */}
        <StepNavigation
          isFirstStep={isFirstStep}
          isLastStep={shouldShowFinishButton}
          canGoNext={canGoNext}
          canGoBack={!isFirstStep}
          onNext={handleNext}
          onBack={handleBack}
          onFinish={handleFinish}
          isLoading={isSubmitting}
          showNextButton={shouldShowNextButton || shouldShowFinishButton}
        />
      </div>

      {/* Indicador de steps completos */}
      {isLastStep && canGoNext && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-700 font-medium">
            ✓ Todas as informações foram preenchidas. Você pode finalizar a simulação.
          </p>
        </div>
      )}
    </div>
  );
};

export default StepperContainer;
