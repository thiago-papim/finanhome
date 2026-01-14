import { useState, useCallback, useMemo } from 'react';
import { getStepsByCreditType } from '../components/Stepper/stepper.config';

/**
 * Hook customizado para gerenciar o estado do stepper
 * Centraliza toda a lógica de navegação, validação e dados
 */
const useStepper = (initialCreditType = null) => {
  const [currentStep, setCurrentStep] = useState(initialCreditType ? 1 : 0);
  const [creditType, setCreditType] = useState(initialCreditType);
  const [responses, setResponses] = useState(
    initialCreditType ? { 'tipo-credito': initialCreditType } : {},
  );
  const [errors, setErrors] = useState({});

  // Obter steps baseado no tipo de crédito
  const steps = useMemo(() => {
    if (!creditType) {
      return getStepsByCreditType(null);
    }
    return getStepsByCreditType(creditType);
  }, [creditType]);

  // Verificar se o step atual está completo
  const isStepComplete = useCallback(
    (stepIndex) => {
      const step = steps[stepIndex];
      if (!step) return false;

      const response = responses[step.id];

      if (step.required && !response) return false;

      if (step.type === 'slider') {
        if (!response || response === 0) return false;

        // Validação de mínimo
        if (step.validation?.min && response < step.validation.min) {
          return false;
        }

        // Validação de dependência (ex: crédito não pode ser maior que X% do imóvel)
        if (step.validation?.dependsOn) {
          const dependentValue = responses[step.validation.dependsOn];
          if (!dependentValue) return false;

          const maxValue = (dependentValue * step.validation.maxPercent) / 100;
          if (response > maxValue) return false;
        }
      }

      return true;
    },
    [steps, responses],
  );

  // Validar step atual
  const validateCurrentStep = useCallback(() => {
    const step = steps[currentStep];
    if (!step) return true;

    const response = responses[step.id];
    const newErrors = {};

    if (step.required && !response) {
      newErrors[step.id] = 'Este campo é obrigatório';
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return false;
    }

    if (step.type === 'slider') {
      // Validação de mínimo
      if (step.validation?.min && response < step.validation.min) {
        newErrors[step.id] = step.validation.message || 'Valor abaixo do mínimo permitido';
        setErrors((prev) => ({ ...prev, ...newErrors }));
        return false;
      }

      // Validação de dependência
      if (step.validation?.dependsOn) {
        const dependentValue = responses[step.validation.dependsOn];
        if (dependentValue) {
          const maxValue = (dependentValue * step.validation.maxPercent) / 100;
          if (response > maxValue) {
            newErrors[step.id] = step.validation.message || 'Valor acima do permitido';
            setErrors((prev) => ({ ...prev, ...newErrors }));
            return false;
          }
        }
      }
    }

    // Limpar erro se válido
    if (newErrors[step.id]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[step.id];
        return updated;
      });
    }

    return true;
  }, [currentStep, steps, responses]);

  // Avançar para próximo step
  const nextStep = useCallback(
    (skipValidation = false) => {
      // Para steps de opção, pular validação (sempre válidos quando selecionados)
      const step = steps[currentStep];
      const shouldValidate = !skipValidation && step?.type !== 'options';

      if (shouldValidate && !validateCurrentStep()) {
        return false;
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        return true;
      }

      return false;
    },
    [currentStep, steps, validateCurrentStep],
  );

  // Voltar para step anterior
  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      return true;
    }
    return false;
  }, [currentStep]);

  // Ir para step específico (apenas se já foi preenchido)
  const goToStep = useCallback(
    (stepIndex) => {
      if (stepIndex < 0 || stepIndex >= steps.length) return false;

      // Permitir ir para steps já preenchidos
      let canGo = true;
      for (let i = 0; i < stepIndex; i += 1) {
        if (!isStepComplete(i)) {
          canGo = false;
          break;
        }
      }

      if (canGo) {
        setCurrentStep(stepIndex);
        return true;
      }

      return false;
    },
    [steps.length, isStepComplete],
  );

  // Atualizar resposta do step atual
  const updateResponse = useCallback((stepId, value) => {
    setResponses((prev) => ({
      ...prev,
      [stepId]: value,
    }));

    // Limpar erro ao atualizar
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[stepId];
      return updated;
    });

    // Se for o primeiro step (tipo de crédito), atualizar creditType
    if (stepId === 'tipo-credito') {
      setCreditType(value);
      // Resetar respostas anteriores se mudar o tipo
      setResponses({ [stepId]: value });
      setCurrentStep(1);
    }
  }, []);

  // Resetar stepper
  const reset = useCallback(() => {
    setCurrentStep(0);
    setCreditType(null);
    setResponses({});
    setErrors({});
  }, []);

  // Verificar se todos os steps estão completos
  const isAllStepsComplete = useMemo(() => {
    return steps.every((step, index) => isStepComplete(index));
  }, [steps, isStepComplete]);

  // Calcular progresso
  const progress = useMemo(() => {
    if (steps.length === 0) return 0;

    // Se não há tipo de crédito selecionado, calcular progresso baseado em estimativa
    // Assumindo que após selecionar o tipo, haverá aproximadamente 8-9 steps adicionais
    if (!creditType) {
      // Primeiro step de um total estimado de ~10 steps (1 inicial + ~9 após seleção)
      const estimatedTotalSteps = 10;
      return Math.round(((currentStep + 1) / estimatedTotalSteps) * 100);
    }

    // Quando há tipo de crédito, calcular normalmente
    return Math.round(((currentStep + 1) / steps.length) * 100);
  }, [currentStep, steps.length, creditType]);

  // Verificar se é o último step
  const isLastStep = useMemo(() => {
    // Se não há tipo de crédito, nunca é o último step (ainda precisa selecionar)
    if (!creditType) return false;
    return currentStep === steps.length - 1;
  }, [currentStep, steps.length, creditType]);

  // Verificar se é o primeiro step
  const isFirstStep = useMemo(() => {
    return currentStep === 0;
  }, [currentStep]);

  return {
    // Estado
    currentStep,
    creditType,
    steps,
    responses,
    errors,

    // Ações
    nextStep,
    previousStep,
    goToStep,
    updateResponse,
    reset,

    // Validações
    isStepComplete,
    validateCurrentStep,
    isAllStepsComplete,

    // Helpers
    progress,
    isLastStep,
    isFirstStep,
    currentStepData: steps[currentStep],
  };
};

export default useStepper;
