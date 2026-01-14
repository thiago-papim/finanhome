import React, { useState } from 'react';
import { HomeIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import StepperContainer from '../Stepper/StepperContainer';

/**
 * Componente PontoUm - Tela inicial de seleção do tipo de crédito
 * Integrado com o novo sistema de stepper
 */
export default function PontoUm() {
  const [showStepper, setShowStepper] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    // Pequeno delay para animação suave
    setTimeout(() => {
      setShowStepper(true);
    }, 300);
  };

  const cards = [
    {
      icon: <HomeIcon className="h-24 w-24 text-blue-500" />,
      label: 'Imobiliário',
      value: 'financiamento',
    },
    {
      icon: <CurrencyDollarIcon className="h-24 w-24 text-blue-500" />,
      label: 'Crédito com Garantia',
      value: 'home-equity',
    },
  ];

  if (showStepper) {
    return (
      <div className="flex w-full justify-center items-start min-h-screen pt-8 pb-20 animate-fadeIn">
        <StepperContainer initialCreditType={selectedOption} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      {/* Indicador de progresso */}
      <div className="absolute top-6 left-6 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
        1%
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-4xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-500 mb-6 animate-fadeIn">
          Vamos começar!
        </h1>
        <p className="text-2xl md:text-3xl text-gray-300 mb-16 font-medium">
          Qual tipo de modalidade de crédito você busca?
        </p>

        {/* Cards de opções */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {cards.map((card) => (
            <button
              key={card.value}
              onClick={() => handleOptionSelect(card.value)}
              className={`
                relative bg-gray-100 rounded-2xl p-8 md:p-12 
                w-full md:w-80 h-64 md:h-72
                flex flex-col items-center justify-center
                transition-all duration-300 transform
                hover:scale-105 hover:shadow-2xl
                ${selectedOption === card.value ? 'ring-4 ring-blue-500 scale-105' : ''}
                group cursor-pointer
              `}
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <span className="text-xl md:text-2xl font-semibold text-gray-800">{card.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
