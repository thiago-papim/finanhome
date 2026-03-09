import React, { useState } from 'react';
import PropTypes from 'prop-types';
import emailjs from '@emailjs/browser';
import {
  CheckCircleIcon,
  HomeIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid';
import { emailjs as emailjsConfig, isEmailjsConfigured } from '../../config/env';

/**
 * Componente StepperSummary - Resumo visual completo das respostas
 * Exibe todas as respostas com ícones e formatação
 */
function StepperSummary({ steps, responses, creditType, onBack, onEditStep, onSubmit }) {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
  });

  const [formErrors, setFormErrors] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
  });

  const [isSending, setIsSending] = useState(false);

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

  // Validação de CPF
  const validateCPF = (cpf) => {
    const cleanCPF = cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11) return false;

    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

    // Validar dígitos verificadores
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i += 1) {
      sum += parseInt(cleanCPF.substring(i - 1, i), 10) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10), 10)) return false;

    sum = 0;
    for (let i = 1; i <= 10; i += 1) {
      sum += parseInt(cleanCPF.substring(i - 1, i), 10) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11), 10)) return false;

    return true;
  };

  // Validação de email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validação de telefone (formato brasileiro)
  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  // Formatar CPF
  const formatCPF = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 11) {
      return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  // Formatar telefone
  const formatPhone = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 10) {
      return cleanValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    if (cleanValue.length <= 11) {
      return cleanValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  // Validar campo individual
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'nome':
        if (!value.trim()) {
          error = 'Nome é obrigatório';
        } else if (value.trim().length < 3) {
          error = 'Nome deve ter pelo menos 3 caracteres';
        }
        break;
      case 'cpf':
        if (!value.trim()) {
          error = 'CPF é obrigatório';
        } else if (!validateCPF(value)) {
          error = 'CPF inválido';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email é obrigatório';
        } else if (!validateEmail(value)) {
          error = 'Email inválido';
        }
        break;
      case 'telefone':
        if (!value.trim()) {
          error = 'Telefone é obrigatório';
        } else if (!validatePhone(value)) {
          error = 'Telefone inválido';
        }
        break;
      default:
        break;
    }

    return error;
  };

  // Handler de mudança nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatar CPF e telefone
    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'telefone') {
      formattedValue = formatPhone(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Validar campo em tempo real
    const error = validateField(name, formattedValue);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Verificar se o formulário está válido
  const isFormValid = () => {
    return (
      formData.nome.trim() &&
      formData.cpf.trim() &&
      formData.email.trim() &&
      formData.telefone.trim() &&
      !formErrors.nome &&
      !formErrors.cpf &&
      !formErrors.email &&
      !formErrors.telefone &&
      validateCPF(formData.cpf) &&
      validateEmail(formData.email) &&
      validatePhone(formData.telefone)
    );
  };

  // Handler de envio (envia por EmailJS e redireciona para simulador de parcelas)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid() || isSending) return;

    setIsSending(true);
    try {
      const nome = formData.nome.trim();
      const cpf = formData.cpf.replace(/\D/g, '');
      const telefone = formData.telefone.replace(/\D/g, '');
      const email = formData.email.trim();

      const stepsTexto = steps
        .map((step) => {
          const resposta = getFormattedResponse(step, responses[step.id]);
          return `${step.label}: ${resposta}`;
        })
        .filter((linha) => linha)
        .join('\n');

      const submissionData = {
        dadosPessoais: { nome, cpf, email, telefone },
        simulacao: {
          tipoCredito: creditType,
          respostas: responses,
          steps: steps.map((step) => ({
            id: step.id,
            label: step.label,
            resposta: getFormattedResponse(step, responses[step.id]),
          })),
        },
        timestamp: new Date().toISOString(),
      };

      if (isEmailjsConfigured()) {
        try {
          await emailjs.send(
            emailjsConfig.serviceId,
            emailjsConfig.templateId,
            { nome, cpf, telefone, email, steps: stepsTexto },
            emailjsConfig.publicKey,
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('Falha ao enviar email:', err);
        }
      }

      if (typeof onSubmit === 'function') {
        onSubmit(submissionData);
      }
    } finally {
      setIsSending(false);
    }
  };

  // Handler para editar step específico
  const handleEditStep = (stepIndex) => {
    if (onEditStep) {
      onEditStep(stepIndex);
    }
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Cabeçalho */}
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300 mb-1 sm:mb-2">
          Resumo da Simulação
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Revise todas as informações antes de enviar
        </p>
      </div>

      {/* Resumo compacto */}
      <div className="grid gap-2 sm:gap-3">
        {steps.map((step, index) => {
          const response = responses[step.id];
          if (!response) return null;

          const IconComponent = getStepIcon(step);
          const formattedResponse = getFormattedResponse(step, response);

          return (
            <div
              key={step.id}
              className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-sm"
            >
              <div className="flex items-center gap-3">
                {/* Ícone */}
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 rounded-full p-2">
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-500 mb-0.5 truncate">
                    {step.label}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">
                    {formattedResponse}
                  </p>
                </div>

                {/* Botão de editar */}
                {onEditStep && (
                  <button
                    type="button"
                    onClick={() => handleEditStep(index)}
                    className="flex-shrink-0 text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium transition-colors"
                  >
                    Editar
                  </button>
                )}

                {/* Indicador de check */}
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Formulário de dados pessoais */}
      <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 border-2 border-gray-200 shadow-md">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Dados Pessoais</h3>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-500 mb-1">
              Nome Completo *
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  formErrors.nome
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Digite seu nome completo"
                aria-describedby={formErrors.nome ? 'nome-error' : undefined}
                aria-label="Nome Completo"
              />
            </label>
            {formErrors.nome && (
              <p id="nome-error" className="mt-1 text-xs text-red-600">
                {formErrors.nome}
              </p>
            )}
          </div>

          {/* CPF */}
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
              CPF *
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                maxLength={14}
                className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  formErrors.cpf
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="000.000.000-00"
                aria-describedby={formErrors.cpf ? 'cpf-error' : undefined}
                aria-label="CPF"
              />
            </label>
            {formErrors.cpf && (
              <p id="cpf-error" className="mt-1 text-xs text-red-600">
                {formErrors.cpf}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  formErrors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="seu@email.com"
                aria-describedby={formErrors.email ? 'email-error' : undefined}
                aria-label="Email"
              />
            </label>
            {formErrors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-600">
                {formErrors.email}
              </p>
            )}
          </div>

          {/* Telefone */}
          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone *
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                maxLength={15}
                className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  formErrors.telefone
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="(00) 00000-0000"
                aria-describedby={formErrors.telefone ? 'telefone-error' : undefined}
                aria-label="Telefone"
              />
            </label>
            {formErrors.telefone && (
              <p id="telefone-error" className="mt-1 text-xs text-red-600">
                {formErrors.telefone}
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Botões de ação */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Botão Voltar */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            ← Voltar para Editar
          </button>
        )}

        {/* Botão Enviar */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid() || isSending}
          className={`w-full sm:flex-1 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
            isFormValid() && !isSending
              ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isSending ? (
            <>
              <ArrowPathIcon className="h-5 w-5 animate-spin flex-shrink-0" aria-hidden />
              <span>Enviando...</span>
            </>
          ) : (
            'Enviar Simulação'
          )}
        </button>
      </div>

      {/* Informação adicional */}
      <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs sm:text-sm text-blue-800">
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
  onBack: PropTypes.func,
  onEditStep: PropTypes.func,
  onSubmit: PropTypes.func,
};

StepperSummary.defaultProps = {
  creditType: null,
  onBack: null,
  onEditStep: null,
  onSubmit: null,
};

export default StepperSummary;
